// Weather Module for Smart Farming Assistant
// OpenWeatherMap API Integration with Agricultural Focus

class WeatherModule {
    constructor() {
        // API key resolution order:
        // 1. window.__ENV__ (set by a local env loader like js/env.js for dev)
        // 2. process.env (if using a build tool that injects env vars)
        // 3. fallback placeholder
        this.API_KEY = (typeof window !== 'undefined' && window.__ENV && window.__ENV.OPENWEATHERMAP_API_KEY)
            || (typeof process !== 'undefined' && process.env && process.env.OPENWEATHERMAP_API_KEY)
            || 'YOUR_OPENWEATHERMAP_API_KEY'; // replace in local .env or build env
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        this.ONECALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';
        
        this.weatherIcons = {
            '01d': 'fa-sun',
            '01n': 'fa-moon',
            '02d': 'fa-cloud-sun',
            '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud',
            '03n': 'fa-cloud',
            '04d': 'fa-cloud',
            '04n': 'fa-cloud',
            '09d': 'fa-cloud-rain',
            '09n': 'fa-cloud-rain',
            '10d': 'fa-cloud-rain',
            '10n': 'fa-cloud-rain',
            '11d': 'fa-bolt',
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',
            '50n': 'fa-smog'
        };
    }

    async loadWeatherData(location) {
        if (!location || !this.API_KEY || this.API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
            console.warn('Weather API key not configured');
            this.displayDemoWeatherData(location);
            return;
        }

        try {
            // Load current weather and 5-day forecast
            await Promise.all([
                this.loadCurrentWeather(location),
                this.loadForecast(location),
                this.loadWeatherAlerts(location)
            ]);

            // Cache weather data
            this.cacheWeatherData();

        } catch (error) {
            console.error('Error loading weather data:', error);
            this.displayDemoWeatherData(location);
        }
    }

    async loadCurrentWeather(location) {
        const url = `${this.BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${this.API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        this.displayCurrentWeather(data);
        
        return data;
    }

    async loadForecast(location) {
        const url = `${this.BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${this.API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }

        const data = await response.json();
        this.displayForecast(data);
        
        return data;
    }

    async loadWeatherAlerts(location) {
        try {
            // OneCall API provides weather alerts (requires subscription for some features)
            const url = `${this.ONECALL_URL}?lat=${location.lat}&lon=${location.lon}&exclude=minutely&units=metric&appid=${this.API_KEY}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`OneCall API error: ${response.status}`);
            }

            const data = await response.json();
            this.displayWeatherAlerts(data.alerts || []);
            
            // Generate agricultural alerts based on weather conditions
            this.generateAgriculturalAlerts(data);
            
            return data;
        } catch (error) {
            console.error('Weather alerts error:', error);
            // Generate basic alerts without OneCall API
            this.generateBasicAlerts(location);
        }
    }

    displayCurrentWeather(data) {
        // Update weather dashboard
        document.getElementById('current-temp').textContent = Math.round(data.main.temp);
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind-speed').textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

        // Update weather icon
        const iconCode = data.weather[0].icon;
        const iconClass = this.weatherIcons[iconCode] || 'fa-sun';
        document.getElementById('weather-icon').className = `fas ${iconClass}`;

        // Show weather dashboard
        document.getElementById('weather-dashboard').classList.remove('hidden');
        document.getElementById('weather-dashboard').classList.add('fade-in');
    }

    displayForecast(data) {
        const forecastContainer = document.getElementById('weather-forecast');
        forecastContainer.innerHTML = '';

        // Process 5-day forecast (showing daily data)
        const dailyForecasts = this.processForecastData(data.list);
        
        dailyForecasts.forEach(forecast => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            
            const iconClass = this.weatherIcons[forecast.icon] || 'fa-sun';
            const dayName = new Date(forecast.date).toLocaleDateString('en-US', { 
                weekday: 'short',
                day: 'numeric'
            });

            forecastItem.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="forecast-temp">
                    <span>${Math.round(forecast.temp_max)}°</span>
                    <span style="color: #666;">${Math.round(forecast.temp_min)}°</span>
                </div>
                <div class="forecast-rain" style="font-size: 0.8em; color: #2196f3;">
                    ${forecast.rain}mm
                </div>
            `;

            forecastContainer.appendChild(forecastItem);
        });
    }

    processForecastData(forecastList) {
        const dailyData = {};
        
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            
            if (!dailyData[date]) {
                dailyData[date] = {
                    date: item.dt * 1000,
                    temp_max: item.main.temp_max,
                    temp_min: item.main.temp_min,
                    icon: item.weather[0].icon,
                    rain: (item.rain && item.rain['3h']) ? item.rain['3h'] : 0,
                    description: item.weather[0].description
                };
            } else {
                dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
                dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
                dailyData[date].rain += (item.rain && item.rain['3h']) ? item.rain['3h'] : 0;
            }
        });

        return Object.values(dailyData).slice(0, 5); // Return first 5 days
    }

    displayWeatherAlerts(alerts) {
        const alertsContainer = document.getElementById('weather-alerts');
        
        // Clear existing alerts
        alertsContainer.innerHTML = '';

        if (alerts.length === 0) return;

        alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = 'alert alert-warning';
            
            alertElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>${alert.event}</strong>
                    <p>${alert.description}</p>
                    <small>Valid until: ${new Date(alert.end * 1000).toLocaleString()}</small>
                </div>
            `;

            alertsContainer.appendChild(alertElement);
        });
    }

    generateAgriculturalAlerts(weatherData) {
        const alertsContainer = document.getElementById('weather-alerts');
        const current = weatherData.current;
        const daily = weatherData.daily || [];

        // High temperature alert for crops
        if (current.temp > 35) {
            this.addAlert(alertsContainer, 'warning', 'High Temperature Alert', 
                'Temperature above 35°C can stress crops. Consider additional watering and shade protection.');
        }

        // Heavy rain alert
        const nextDayRain = daily.length > 0 && daily[0].rain ? daily[0].rain : 0;
        if (nextDayRain > 25) {
            this.addAlert(alertsContainer, 'info', 'Heavy Rain Expected', 
                `Expected rainfall: ${nextDayRain.toFixed(1)}mm. Prepare drainage and avoid field activities.`);
        }

        // Low humidity alert
        if (current.humidity < 30) {
            this.addAlert(alertsContainer, 'warning', 'Low Humidity Alert', 
                'Low humidity can cause plant stress. Increase irrigation frequency.');
        }

        // Strong wind alert
        if (current.wind_speed > 10) {
            this.addAlert(alertsContainer, 'info', 'Strong Wind Alert', 
                `Wind speed: ${Math.round(current.wind_speed * 3.6)} km/h. Secure crops and structures.`);
        }

        // Frost alert (if temperature drops below 5°C)
        const minTemp = daily.length > 0 ? daily[0].temp.min : current.temp;
        if (minTemp < 5) {
            this.addAlert(alertsContainer, 'error', 'Frost Warning', 
                'Temperature may drop below 5°C. Protect sensitive crops from frost damage.');
        }

        // Optimal planting conditions
        if (current.temp >= 20 && current.temp <= 30 && current.humidity >= 50 && current.humidity <= 80) {
            this.addAlert(alertsContainer, 'success', 'Optimal Conditions', 
                'Current conditions are ideal for most agricultural activities.');
        }
    }

    generateBasicAlerts(location) {
        // Generate basic alerts when advanced API is not available
        const alertsContainer = document.getElementById('weather-alerts');
        
        // Seasonal alerts for Karnataka
        const month = new Date().getMonth() + 1;
        
        if (month >= 6 && month <= 9) { // Monsoon season
            this.addAlert(alertsContainer, 'info', 'Monsoon Season', 
                'Monitor rainfall closely. Ensure proper drainage in fields and prepare for Kharif crops.');
        } else if (month >= 10 && month <= 2) { // Post-monsoon/Winter
            this.addAlert(alertsContainer, 'info', 'Post-Monsoon Season', 
                'Ideal time for Rabi crops. Monitor soil moisture and plan irrigation accordingly.');
        } else if (month >= 3 && month <= 5) { // Summer
            this.addAlert(alertsContainer, 'warning', 'Summer Season', 
                'High temperatures expected. Increase irrigation frequency and consider heat-resistant crops.');
        }
    }

    addAlert(container, type, title, message) {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type}`;
        
        const iconMap = {
            warning: 'exclamation-triangle',
            error: 'exclamation-circle',
            info: 'info-circle',
            success: 'check-circle'
        };

        alertElement.innerHTML = `
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <div>
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(alertElement);
    }

    displayDemoWeatherData(location) {
        // Display demo data when API is not available
        const demoData = {
            temperature: 28,
            description: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 8,
            forecast: [
                { day: 'Today', icon: 'fa-cloud-sun', max: 30, min: 22, rain: 0 },
                { day: 'Tomorrow', icon: 'fa-cloud-rain', max: 27, min: 20, rain: 12 },
                { day: 'Wed', icon: 'fa-sun', max: 32, min: 24, rain: 0 },
                { day: 'Thu', icon: 'fa-cloud', max: 29, min: 23, rain: 2 },
                { day: 'Fri', icon: 'fa-cloud-rain', max: 26, min: 21, rain: 18 }
            ]
        };

        // Update current weather
        document.getElementById('current-temp').textContent = demoData.temperature;
        document.getElementById('weather-desc').textContent = demoData.description;
        document.getElementById('humidity').textContent = demoData.humidity;
        document.getElementById('wind-speed').textContent = demoData.windSpeed;
        document.getElementById('weather-icon').className = 'fas fa-cloud-sun';

        // Update forecast
        const forecastContainer = document.getElementById('weather-forecast');
        forecastContainer.innerHTML = '';

        demoData.forecast.forEach(forecast => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            
            forecastItem.innerHTML = `
                <div class="forecast-day">${forecast.day}</div>
                <div class="forecast-icon">
                    <i class="fas ${forecast.icon}"></i>
                </div>
                <div class="forecast-temp">
                    <span>${forecast.max}°</span>
                    <span style="color: #666;">${forecast.min}°</span>
                </div>
                <div class="forecast-rain" style="font-size: 0.8em; color: #2196f3;">
                    ${forecast.rain}mm
                </div>
            `;

            forecastContainer.appendChild(forecastItem);
        });

        // Show demo alerts
        this.generateBasicAlerts(location);

        // Show weather dashboard
        document.getElementById('weather-dashboard').classList.remove('hidden');
        document.getElementById('weather-dashboard').classList.add('fade-in');

        // Add demo data notice
        const alertsContainer = document.getElementById('weather-alerts');
        this.addAlert(alertsContainer, 'info', 'Demo Mode', 
            'Showing sample weather data. Configure your API key for live weather updates.');
    }

    displayCachedWeather(cachedData) {
        // Display cached weather data when offline
        if (cachedData.current) {
            document.getElementById('current-temp').textContent = Math.round(cachedData.current.temp);
            document.getElementById('weather-desc').textContent = cachedData.current.description;
            document.getElementById('humidity').textContent = cachedData.current.humidity;
            document.getElementById('wind-speed').textContent = Math.round(cachedData.current.windSpeed);
        }

        if (cachedData.forecast) {
            const forecastContainer = document.getElementById('weather-forecast');
            forecastContainer.innerHTML = '';

            cachedData.forecast.forEach(forecast => {
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                
                forecastItem.innerHTML = `
                    <div class="forecast-day">${forecast.day}</div>
                    <div class="forecast-icon">
                        <i class="fas ${forecast.icon}"></i>
                    </div>
                    <div class="forecast-temp">
                        <span>${forecast.max}°</span>
                        <span style="color: #666;">${forecast.min}°</span>
                    </div>
                `;

                forecastContainer.appendChild(forecastItem);
            });
        }

        // Show weather dashboard
        document.getElementById('weather-dashboard').classList.remove('hidden');

        // Add offline notice
        const alertsContainer = document.getElementById('weather-alerts');
        this.addAlert(alertsContainer, 'info', 'Offline Mode', 
            'Showing cached weather data. Connect to internet for latest updates.');
    }

    cacheWeatherData() {
        // Cache current weather data for offline use
        const currentData = {
            temp: document.getElementById('current-temp').textContent,
            description: document.getElementById('weather-desc').textContent,
            humidity: document.getElementById('humidity').textContent,
            windSpeed: document.getElementById('wind-speed').textContent
        };

        const forecastElements = document.querySelectorAll('.forecast-item');
        const forecastData = Array.from(forecastElements).map(item => ({
            day: item.querySelector('.forecast-day').textContent,
            icon: item.querySelector('.forecast-icon i').className,
            max: item.querySelector('.forecast-temp span:first-child').textContent,
            min: item.querySelector('.forecast-temp span:last-child').textContent
        }));

        const cacheData = {
            current: currentData,
            forecast: forecastData,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('smartFarming_weather', JSON.stringify(cacheData));
    }
}

// Initialize weather module
window.WeatherModule = new WeatherModule();
