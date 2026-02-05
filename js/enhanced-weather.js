// Enhanced Weather Analytics for Smart Farming Assistant
// Integrates Visual Crossing Weather API for advanced agricultural insights

class EnhancedWeatherAnalytics {
    constructor() {
        // Resolve Visual Crossing key from window.__ENV or process.env for local/dev safety
        const resolveKey = (name, fallback = 'demo_mode') => {
            if (typeof window !== 'undefined' && window.__ENV && window.__ENV[name]) return window.__ENV[name];
            if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
            return fallback;
        };

        this.visualCrossingAPI = {
            key: resolveKey('VISUALCROSSING_API_KEY', 'demo_mode'),
            baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
        };
        
        // Agricultural thresholds for Karnataka crops
        this.cropThresholds = {
            temperature: {
                rice: { min: 20, max: 35, optimal: [25, 30] },
                wheat: { min: 10, max: 25, optimal: [15, 22] },
                cotton: { min: 18, max: 40, optimal: [25, 35] },
                sugarcane: { min: 20, max: 38, optimal: [26, 32] },
                groundnut: { min: 20, max: 30, optimal: [22, 28] },
                jowar: { min: 15, max: 40, optimal: [20, 35] },
                ragi: { min: 15, max: 35, optimal: [20, 30] }
            },
            rainfall: {
                rice: { annual: [1000, 2500], critical: 150 },
                wheat: { annual: [300, 750], critical: 50 },
                cotton: { annual: [500, 1250], critical: 100 },
                sugarcane: { annual: [750, 1500], critical: 200 },
                groundnut: { annual: [500, 750], critical: 75 },
                jowar: { annual: [400, 1000], critical: 60 },
                ragi: { annual: [500, 750], critical: 80 }
            }
        };
    }

    // Get enhanced weather data with agricultural insights
    async getEnhancedWeatherData(location, days = 15) {
        try {
            const locationStr = `${location.lat},${location.lon}`;
            const url = `${this.visualCrossingAPI.baseURL}/${locationStr}/${days}days?` +
                       `key=${this.visualCrossingAPI.key}&` +
                       `include=days,hours,alerts&` +
                       `elements=datetime,temp,tempmax,tempmin,humidity,precip,windspeed,pressure,cloudcover,visibility,solarradiation,uvindex&` +
                       `unitGroup=metric`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Visual Crossing API error: ${response.status}`);
            }

            const data = await response.json();
            return this.processEnhancedWeatherData(data, location);

        } catch (error) {
            console.error('Enhanced weather API error:', error);
            return null;
        }
    }

    // Process Visual Crossing data for agricultural insights
    processEnhancedWeatherData(rawData, location) {
        const processedData = {
            location: {
                name: rawData.resolvedAddress,
                coordinates: location,
                timezone: rawData.timezone
            },
            current: this.processCurrentWeather(rawData.days[0]),
            forecast: rawData.days.slice(0, 7).map(day => this.processDayForecast(day)),
            extended: rawData.days.slice(7).map(day => this.processDayForecast(day)),
            agriculturalInsights: this.generateAgriculturalInsights(rawData),
            alerts: rawData.alerts || [],
            summary: rawData.description
        };

        return processedData;
    }

    // Process current weather conditions
    processCurrentWeather(todayData) {
        return {
            temperature: todayData.temp,
            tempMax: todayData.tempmax,
            tempMin: todayData.tempmin,
            humidity: todayData.humidity,
            precipitation: todayData.precip || 0,
            windSpeed: todayData.windspeed,
            pressure: todayData.pressure,
            cloudCover: todayData.cloudcover,
            uvIndex: todayData.uvindex,
            solarRadiation: todayData.solarradiation,
            visibility: todayData.visibility,
            conditions: todayData.conditions,
            description: todayData.description,
            agriculturalRating: this.calculateAgriculturalRating(todayData)
        };
    }

    // Process daily forecast
    processDayForecast(dayData) {
        return {
            date: dayData.datetime,
            tempMax: dayData.tempmax,
            tempMin: dayData.tempmin,
            humidity: dayData.humidity,
            precipitation: dayData.precip || 0,
            precipProbability: dayData.precipprob || 0,
            windSpeed: dayData.windspeed,
            cloudCover: dayData.cloudcover,
            uvIndex: dayData.uvindex,
            solarRadiation: dayData.solarradiation,
            conditions: dayData.conditions,
            agriculturalRating: this.calculateAgriculturalRating(dayData),
            cropSuitability: this.assessCropSuitability(dayData)
        };
    }

    // Calculate agricultural favorability rating (0-100)
    calculateAgriculturalRating(weatherData) {
        let score = 0;
        let factors = 0;

        // Temperature score (0-30 points)
        const temp = weatherData.temp || (weatherData.tempmax + weatherData.tempmin) / 2;
        if (temp >= 20 && temp <= 35) {
            score += 30;
        } else if (temp >= 15 && temp <= 40) {
            score += 20;
        } else {
            score += 10;
        }
        factors++;

        // Humidity score (0-25 points)
        if (weatherData.humidity >= 50 && weatherData.humidity <= 80) {
            score += 25;
        } else if (weatherData.humidity >= 40 && weatherData.humidity <= 90) {
            score += 15;
        } else {
            score += 5;
        }
        factors++;

        // Precipitation score (0-25 points)
        const precip = weatherData.precip || 0;
        if (precip >= 2 && precip <= 15) {
            score += 25;
        } else if (precip >= 1 && precip <= 25) {
            score += 15;
        } else if (precip === 0) {
            score += 10;
        } else {
            score += 5;
        }
        factors++;

        // Wind speed score (0-20 points)
        if (weatherData.windspeed >= 5 && weatherData.windspeed <= 15) {
            score += 20;
        } else if (weatherData.windspeed >= 2 && weatherData.windspeed <= 25) {
            score += 15;
        } else {
            score += 5;
        }
        factors++;

        return Math.round(score);
    }

    // Assess crop suitability for current weather
    assessCropSuitability(weatherData) {
        const suitability = {};
        const avgTemp = (weatherData.tempmax + weatherData.tempmin) / 2;

        Object.keys(this.cropThresholds.temperature).forEach(crop => {
            const tempThreshold = this.cropThresholds.temperature[crop];
            let score = 0;

            // Temperature suitability
            if (avgTemp >= tempThreshold.optimal[0] && avgTemp <= tempThreshold.optimal[1]) {
                score += 50;
            } else if (avgTemp >= tempThreshold.min && avgTemp <= tempThreshold.max) {
                score += 30;
            } else {
                score += 10;
            }

            // Humidity suitability
            if (weatherData.humidity >= 50 && weatherData.humidity <= 80) {
                score += 25;
            } else {
                score += 10;
            }

            // Precipitation consideration
            const precip = weatherData.precip || 0;
            if (precip > 0 && precip <= 20) {
                score += 25;
            } else if (precip === 0) {
                score += 15;
            }

            suitability[crop] = {
                score: Math.min(score, 100),
                rating: score >= 75 ? 'excellent' : score >= 50 ? 'good' : score >= 25 ? 'fair' : 'poor'
            };
        });

        return suitability;
    }

    // Generate comprehensive agricultural insights
    generateAgriculturalInsights(weatherData) {
        const insights = {
            currentConditions: this.analyzeCurrentConditions(weatherData.days[0]),
            weeklyTrend: this.analyzeWeeklyTrend(weatherData.days.slice(0, 7)),
            seasonalOutlook: this.analyzeSeasonalOutlook(weatherData.days),
            recommendations: this.generateRecommendations(weatherData.days),
            alerts: this.generateAgriculturalAlerts(weatherData.days)
        };

        return insights;
    }

    // Analyze current agricultural conditions
    analyzeCurrentConditions(todayData) {
        const conditions = {
            overall: 'favorable',
            details: []
        };

        const temp = todayData.temp;
        const humidity = todayData.humidity;
        const precip = todayData.precip || 0;

        // Temperature analysis
        if (temp < 15) {
            conditions.details.push({
                type: 'warning',
                message: 'Low temperature may stress warm-season crops',
                kannada: 'ಕಡಿಮೆ ತಾಪಮಾನವು ಬೆಚ್ಚನೆಯ ಋತುವಿನ ಬೆಳೆಗಳನ್ನು ಒತ್ತಡಕ್ಕೆ ಒಳಪಡಿಸಬಹುದು'
            });
            conditions.overall = 'caution';
        } else if (temp > 40) {
            conditions.details.push({
                type: 'warning',
                message: 'High temperature - ensure adequate irrigation',
                kannada: 'ಹೆಚ್ಚಿನ ತಾಪಮಾನ - ಸಾಕಷ್ಟು ನೀರಾವರಿ ಖಚಿತಪಡಿಸಿ'
            });
            conditions.overall = 'caution';
        }

        // Humidity analysis
        if (humidity > 85) {
            conditions.details.push({
                type: 'warning',
                message: 'High humidity increases disease risk',
                kannada: 'ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ರೋಗದ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ'
            });
        }

        // Precipitation analysis
        if (precip > 50) {
            conditions.details.push({
                type: 'alert',
                message: 'Heavy rainfall - check drainage systems',
                kannada: 'ಭಾರೀ ಮಳೆ - ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ'
            });
            conditions.overall = 'caution';
        }

        return conditions;
    }

    // Analyze weekly weather trends
    analyzeWeeklyTrend(weekData) {
        const trend = {
            temperatureTrend: 'stable',
            rainfallTotal: 0,
            rainfallDays: 0,
            favorableDays: 0,
            insights: []
        };

        let tempSum = 0;
        let tempTrend = [];

        weekData.forEach((day, index) => {
            const avgTemp = (day.tempmax + day.tempmin) / 2;
            tempSum += avgTemp;
            tempTrend.push(avgTemp);

            if (day.precip > 0) {
                trend.rainfallTotal += day.precip;
                trend.rainfallDays++;
            }

            if (this.calculateAgriculturalRating(day) >= 70) {
                trend.favorableDays++;
            }
        });

        // Determine temperature trend
        const avgTemp = tempSum / weekData.length;
        const firstHalf = tempTrend.slice(0, 3).reduce((a, b) => a + b) / 3;
        const secondHalf = tempTrend.slice(-3).reduce((a, b) => a + b) / 3;

        if (secondHalf > firstHalf + 2) {
            trend.temperatureTrend = 'increasing';
        } else if (secondHalf < firstHalf - 2) {
            trend.temperatureTrend = 'decreasing';
        }

        // Generate insights
        if (trend.rainfallDays >= 4) {
            trend.insights.push({
                type: 'info',
                message: 'Frequent rainfall expected - plan indoor activities',
                kannada: 'ಆಗಾಗ್ಗೆ ಮಳೆ ನಿರೀಕ್ಷೆ - ಒಳಾಂಗಣ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಿ'
            });
        }

        return trend;
    }

    // Analyze seasonal outlook
    analyzeSeasonalOutlook(allDays) {
        const outlook = {
            favorableConditions: 0,
            challengingPeriods: [],
            optimalPlantingDays: [],
            harvestRecommendations: []
        };

        allDays.forEach((day, index) => {
            const rating = this.calculateAgriculturalRating(day);
            
            if (rating >= 75) {
                outlook.favorableConditions++;
                if (index <= 7) {
                    outlook.optimalPlantingDays.push({
                        date: day.datetime,
                        rating: rating,
                        conditions: day.conditions
                    });
                }
            } else if (rating < 40) {
                outlook.challengingPeriods.push({
                    date: day.datetime,
                    rating: rating,
                    conditions: day.conditions,
                    precip: day.precip || 0
                });
            }
        });

        return outlook;
    }

    // Generate farming recommendations
    generateRecommendations(weatherData) {
        const recommendations = {
            immediate: [],
            weekly: [],
            seasonal: []
        };

        const today = weatherData[0];
        const week = weatherData.slice(0, 7);

        // Immediate recommendations (today)
        if (today.precip > 25) {
            recommendations.immediate.push({
                priority: 'high',
                action: 'Postpone spraying operations',
                kannada: 'ಸಿಂಪಣೆ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಮುಂದೂಡಿ',
                reason: 'Heavy rainfall expected'
            });
        }

        if (today.tempmax > 38) {
            recommendations.immediate.push({
                priority: 'high', 
                action: 'Increase irrigation frequency',
                kannada: 'ನೀರಾವರಿ ಆವರ್ತನ ಹೆಚ್ಚಿಸಿ',
                reason: 'High temperature stress'
            });
        }

        // Weekly recommendations
        const weeklyRainfall = week.reduce((sum, day) => sum + (day.precip || 0), 0);
        if (weeklyRainfall < 10) {
            recommendations.weekly.push({
                priority: 'medium',
                action: 'Plan supplemental irrigation',
                kannada: 'ಪೂರಕ ನೀರಾವರಿ ಯೋಜಿಸಿ',
                reason: 'Low rainfall expected this week'
            });
        }

        return recommendations;
    }

    // Generate agricultural alerts
    generateAgriculturalAlerts(weatherData) {
        const alerts = [];
        const today = weatherData[0];
        const tomorrow = weatherData[1];

        // Temperature alerts
        if (today.tempmax > 40) {
            alerts.push({
                type: 'heat',
                severity: 'high',
                title: 'Heat Stress Warning',
                titleKannada: 'ಶಾಖದ ಒತ್ತಡ ಎಚ್ಚರಿಕೆ',
                description: 'Extremely high temperatures may damage crops',
                descriptionKannada: 'ಅತಿ ಹೆಚ್ಚಿನ ತಾಪಮಾನವು ಬೆಳೆಗಳನ್ನು ಹಾನಿಗೊಳಿಸಬಹುದು',
                actions: ['Increase irrigation', 'Provide shade if possible']
            });
        }

        // Rainfall alerts
        if (today.precip > 50) {
            alerts.push({
                type: 'rainfall',
                severity: 'high',
                title: 'Heavy Rainfall Alert',
                titleKannada: 'ಭಾರೀ ಮಳೆಯ ಎಚ್ಚರಿಕೆ',
                description: 'Heavy rainfall may cause waterlogging',
                descriptionKannada: 'ಭಾರೀ ಮಳೆಯು ನೀರು ಕಟ್ಟುವಿಕೆಗೆ ಕಾರಣವಾಗಬಹುದು',
                actions: ['Check drainage systems', 'Avoid field operations']
            });
        }

        // Frost alert
        if (today.tempmin < 5) {
            alerts.push({
                type: 'frost',
                severity: 'high',
                title: 'Frost Warning',
                titleKannada: 'ಹಿಮ ಎಚ್ಚರಿಕೆ',
                description: 'Low temperatures may cause frost damage',
                descriptionKannada: 'ಕಡಿಮೆ ತಾಪಮಾನವು ಹಿಮ ಹಾನಿಗೆ ಕಾರಣವಾಗಬಹುದು',
                actions: ['Protect sensitive crops', 'Cover young plants']
            });
        }

        return alerts;
    }

    // Display enhanced weather insights in the UI
    displayEnhancedWeatherInsights(weatherData) {
        if (!weatherData) return;

        // Update existing weather dashboard with enhanced data
        this.updateWeatherDashboard(weatherData.current);
        
        // Add agricultural insights section
        this.displayAgriculturalInsights(weatherData.agriculturalInsights);
        
        // Update alerts with enhanced information
        this.displayEnhancedAlerts(weatherData.agriculturalInsights.alerts);
        
        // Show extended forecast
        this.displayExtendedForecast(weatherData.extended);
    }

    updateWeatherDashboard(currentWeather) {
        // Update temperature with agricultural rating
        const tempElement = document.getElementById('current-temp');
        if (tempElement) {
            tempElement.innerHTML = `
                ${Math.round(currentWeather.temperature)}°C
                <div style="font-size: 0.7em; opacity: 0.8;">
                    Agricultural Rating: ${currentWeather.agriculturalRating}%
                </div>
            `;
        }

        // Add UV index and solar radiation info
        const detailsElement = document.querySelector('.weather-details');
        if (detailsElement && currentWeather.uvIndex) {
            const uvInfo = document.createElement('span');
            uvInfo.innerHTML = `<i class="fas fa-sun"></i> UV: ${currentWeather.uvIndex}`;
            detailsElement.appendChild(uvInfo);
        }
    }

    displayAgriculturalInsights(insights) {
        const alertsContainer = document.getElementById('weather-alerts');
        if (!alertsContainer) return;

        // Add agricultural insights card
        const insightsCard = document.createElement('div');
        insightsCard.className = 'alert alert-success';
        insightsCard.style.marginTop = '1rem';

        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        insightsCard.innerHTML = `
            <i class="fas fa-seedling"></i>
            <div>
                <strong>${currentLang === 'kn' ? 'ಕೃಷಿ ಒಳನೋಟಗಳು' : 'Agricultural Insights'}</strong>
                <div style="margin-top: 0.5rem;">
                    <div><strong>${currentLang === 'kn' ? 'ಒಟ್ಟಾರೆ ಪರಿಸ್ಥಿತಿ' : 'Overall Conditions'}:</strong> 
                         ${insights.currentConditions.overall}</div>
                    <div><strong>${currentLang === 'kn' ? 'ಅನುಕೂಲ ದಿನಗಳು' : 'Favorable Days'}:</strong> 
                         ${insights.weeklyTrend.favorableDays}/7</div>
                    <div><strong>${currentLang === 'kn' ? 'ವಾರದ ಮಳೆ' : 'Weekly Rainfall'}:</strong> 
                         ${insights.weeklyTrend.rainfallTotal.toFixed(1)}mm</div>
                </div>
            </div>
        `;

        alertsContainer.appendChild(insightsCard);

        // Add recommendations if any
        if (insights.recommendations.immediate.length > 0) {
            const recCard = document.createElement('div');
            recCard.className = 'alert alert-info';
            recCard.style.marginTop = '1rem';

            const recommendations = insights.recommendations.immediate
                .map(rec => `• ${currentLang === 'kn' ? rec.kannada : rec.action}`)
                .join('<br>');

            recCard.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                <div>
                    <strong>${currentLang === 'kn' ? 'ತಕ್ಷಣದ ಶಿಫಾರಸುಗಳು' : 'Immediate Recommendations'}</strong>
                    <div style="margin-top: 0.5rem;">${recommendations}</div>
                </div>
            `;

            alertsContainer.appendChild(recCard);
        }
    }

    displayEnhancedAlerts(alerts) {
        const alertsContainer = document.getElementById('weather-alerts');
        if (!alertsContainer || !alerts.length) return;

        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `alert alert-${alert.severity === 'high' ? 'error' : 'warning'}`;

            const title = currentLang === 'kn' ? alert.titleKannada : alert.title;
            const description = currentLang === 'kn' ? alert.descriptionKannada : alert.description;

            alertElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>${title}</strong>
                    <p>${description}</p>
                    <div style="font-size: 0.9em; margin-top: 0.5rem;">
                        <strong>${currentLang === 'kn' ? 'ಕ್ರಮಗಳು' : 'Actions'}:</strong>
                        ${alert.actions.join(', ')}
                    </div>
                </div>
            `;

            alertsContainer.appendChild(alertElement);
        });
    }

    displayExtendedForecast(extendedData) {
        // Add extended forecast section after the regular forecast
        const forecastContainer = document.getElementById('weather-forecast');
        if (!forecastContainer || !extendedData.length) return;

        const extendedContainer = document.createElement('div');
        extendedContainer.className = 'extended-forecast';
        extendedContainer.style.cssText = `
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        `;

        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        extendedContainer.innerHTML = `
            <h4 style="margin-bottom: 1rem; color: #2e7d32;">
                ${currentLang === 'kn' ? 'ದೀರ್ಘಾವಧಿ ಮುನ್ನೋಟ' : 'Extended Forecast'}
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
                ${extendedData.slice(0, 8).map(day => `
                    <div style="text-align: center; padding: 0.5rem; background: rgba(255,255,255,0.1); border-radius: 4px;">
                        <div style="font-size: 0.8em; margin-bottom: 0.25rem;">
                            ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div style="font-weight: 600; color: #2e7d32;">
                            ${Math.round(day.tempMax)}°/${Math.round(day.tempMin)}°
                        </div>
                        <div style="font-size: 0.7em; color: #666;">
                            ${day.precipitation > 0 ? Math.round(day.precipitation) + 'mm' : ''}
                        </div>
                        <div style="font-size: 0.7em; margin-top: 0.25rem;">
                            Rating: ${day.agriculturalRating}%
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        forecastContainer.parentNode.appendChild(extendedContainer);
    }
}

// Initialize enhanced weather analytics
window.EnhancedWeatherAnalytics = new EnhancedWeatherAnalytics();

// Integration with existing weather module
if (window.WeatherModule) {
    // Extend the existing loadWeatherData function
    const originalLoadWeatherData = window.WeatherModule.loadWeatherData;
    
    window.WeatherModule.loadWeatherData = async function(location) {
        // Load original weather data
        await originalLoadWeatherData.call(this, location);
        
        // Load enhanced analytics
        try {
            const enhancedData = await window.EnhancedWeatherAnalytics.getEnhancedWeatherData(location);
            if (enhancedData) {
                window.EnhancedWeatherAnalytics.displayEnhancedWeatherInsights(enhancedData);
            }
        } catch (error) {
            console.error('Enhanced weather analytics error:', error);
        }
    };
}
