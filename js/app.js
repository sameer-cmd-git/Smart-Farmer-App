// Smart Farming Assistant - Main Application
// Location Services and Core Functionality

class SmartFarmingApp {
    constructor() {
        this.currentLocation = null;
        this.currentLanguage = 'en';
        this.weatherData = null;
        this.soilData = null;
        this.isOnline = navigator.onLine;
        
        // Initialize app
        this.init();
        
        // Karnataka districts with coordinates for API calls
        this.karnatakaDistricts = {
            'bangalore': { name: 'Bangalore Urban', lat: 12.9716, lon: 77.5946 },
            'mysore': { name: 'Mysore', lat: 12.2958, lon: 76.6394 },
            'mandya': { name: 'Mandya', lat: 12.5244, lon: 76.8958 },
            'hassan': { name: 'Hassan', lat: 13.0078, lon: 76.1005 },
            'tumkur': { name: 'Tumkur', lat: 13.3379, lon: 77.1022 },
            'kolar': { name: 'Kolar', lat: 13.1378, lon: 78.1294 },
            'chikkaballapur': { name: 'Chikkaballapur', lat: 13.4355, lon: 77.7264 },
            'ramanagara': { name: 'Ramanagara', lat: 12.7179, lon: 77.2823 },
            'chitradurga': { name: 'Chitradurga', lat: 14.2251, lon: 76.3980 },
            'davanagere': { name: 'Davanagere', lat: 14.4644, lon: 75.9218 },
            'shimoga': { name: 'Shimoga', lat: 13.9299, lon: 75.5681 },
            'chikkamagaluru': { name: 'Chikkamagaluru', lat: 13.3161, lon: 75.7720 },
            'udupi': { name: 'Udupi', lat: 13.3409, lon: 74.7421 },
            'dakshina-kannada': { name: 'Dakshina Kannada', lat: 12.8438, lon: 75.2479 },
            'kodagu': { name: 'Kodagu', lat: 12.3375, lon: 75.8069 },
            'dharwad': { name: 'Dharwad', lat: 15.4589, lon: 75.0078 },
            'haveri': { name: 'Haveri', lat: 14.7951, lon: 75.4065 },
            'uttara-kannada': { name: 'Uttara Kannada', lat: 14.7937, lon: 74.6869 },
            'gadag': { name: 'Gadag', lat: 15.4167, lon: 75.6167 },
            'bagalkot': { name: 'Bagalkot', lat: 16.1875, lon: 75.6919 },
            'vijayapura': { name: 'Vijayapura', lat: 16.8302, lon: 75.7100 },
            'belagavi': { name: 'Belagavi', lat: 15.8497, lon: 74.4977 },
            'bellary': { name: 'Bellary', lat: 15.1394, lon: 76.9214 },
            'koppal': { name: 'Koppal', lat: 15.3505, lon: 76.1544 },
            'raichur': { name: 'Raichur', lat: 16.2120, lon: 77.3439 },
            'kalaburagi': { name: 'Kalaburagi', lat: 17.3297, lon: 76.8343 },
            'bidar': { name: 'Bidar', lat: 17.9104, lon: 77.5199 },
            'yadgir': { name: 'Yadgir', lat: 16.7700, lon: 77.1300 }
        };
    }

    init() {
        this.setupEventListeners();
        this.setupOfflineDetection();
        this.loadStoredData();
        this.setupSeasonButtons();
        
        console.log('Smart Farming Assistant initialized');
    }

    setupEventListeners() {
        // District dropdown change
        document.getElementById('district-select').addEventListener('change', (e) => {
            // no-op besides user intent; location will be fetched on button click
        });

        // Online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
    }

    setupOfflineDetection() {
        this.handleOnlineStatus(navigator.onLine);
    }

    handleOnlineStatus(isOnline) {
        this.isOnline = isOnline;
        const banner = document.getElementById('offline-banner');
        
        if (isOnline) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    }

    setupSeasonButtons() {
        const seasonButtons = document.querySelectorAll('.season-btn');
        
        seasonButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                seasonButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Update crop recommendations
                if (this.currentLocation) {
                    this.loadCropRecommendations(e.target.dataset.season);
                }
            });
        });
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showAlert('Geolocation is not supported by this browser', 'error');
            return;
        }

        this.showLoading(true);

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 600000 // 10 minutes cache
                });
            });

            const { latitude, longitude, accuracy } = position.coords;
            
            // Reverse geocode to get location name
            const locationName = await this.reverseGeocode(latitude, longitude);

            // Auto-detect nearest Karnataka district (for consistent UI + district-based modules)
            const nearest = this.getNearestDistrict(latitude, longitude);
            if (nearest) {
                const districtSelect = document.getElementById('district-select');
                if (districtSelect) districtSelect.value = nearest.key;
            }
            
            this.currentLocation = {
                lat: latitude,
                lon: longitude,
                name: locationName,
                type: 'gps',
                accuracyMeters: accuracy
            };

            this.displayCurrentLocation();
            await this.loadLocationData();

        } catch (error) {
            console.error('Error getting location:', error);
            // Better user-facing errors
            if (error && error.code === 1) {
                this.showAlert('Location permission denied. Please allow location access and try again.', 'error');
            } else if (error && error.code === 2) {
                this.showAlert('Location unavailable. Please turn on GPS and try again.', 'warning');
            } else if (error && error.code === 3) {
                this.showAlert('Location request timed out. Please try again near a window or with better signal.', 'warning');
            } else {
                this.showAlert('Unable to get your location. Please select a district manually.', 'warning');
            }
        } finally {
            this.showLoading(false);
        }
    }

    async reverseGeocode(lat, lon) {
        try {
            // Use OpenWeatherMap reverse geocoding with the real key from WeatherModule
            const owmKey = (window.WeatherModule && window.WeatherModule.API_KEY) || 'YOUR_API_KEY';
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${owmKey}`);
            
            if (!response.ok) {
                throw new Error('Geocoding failed');
            }
            
            const data = await response.json();
            return data[0]?.name || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
            
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        }
    }

    async getLocationData() {
        const district = document.getElementById('district-select').value;

        if (!district) {
            this.showAlert('Please select a district (or use the GPS button).', 'warning');
            return;
        }

        this.showLoading(true);

        try {
            if (district && this.karnatakaDistricts[district]) {
                // Use predefined district coordinates
                const districtData = this.karnatakaDistricts[district];
                this.currentLocation = {
                    lat: districtData.lat,
                    lon: districtData.lon,
                    name: districtData.name,
                    type: 'district'
                };
            } else {
                throw new Error('Invalid input');
            }

            this.displayCurrentLocation();
            await this.loadLocationData();

        } catch (error) {
            console.error('Error getting location data:', error);
            this.showAlert('Unable to get location data. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async geocodePincode(pincode) {
        try {
            // Validate Karnataka PIN code format
            if (!this.isKarnatakaPincode(pincode)) {
                throw new Error('Please enter a valid Karnataka PIN code');
            }

            // Try primary API (Postal API -> areas list) and resolve precisely via OWM ZIP geocoding
            const areas = await this.fetchPostalAreas(pincode);
            if (areas && areas.length) {
                // Render selectable area list for user; wait for user to choose
                this.renderAreaSelection(areas, pincode);
                this.showAlert('Select your area from the list to proceed.', 'info');
                return null;
            }

            // Fallback to local 3-digit map
            return this.getKarnatakaPincodeData(pincode);
            
        } catch (error) {
            console.error('PIN code geocoding error:', error);
            throw new Error(`Invalid PIN code or service unavailable: ${error.message}`);
        }
    }

    // Validate if PIN code belongs to Karnataka
    isKarnatakaPincode(pincode) {
        // Karnataka PIN codes start with specific digits
        const karnatakaPatterns = [
            /^56[0-9]{4}$/, // North Karnataka (560000-569999)
            /^57[0-9]{4}$/, // Central Karnataka (570000-579999) 
            /^58[0-9]{4}$/, // South Karnataka (580000-589999)
            /^59[0-9]{4}$/, // Coastal Karnataka (590000-599999)
        ];
        
        return karnatakaPatterns.some(pattern => pattern.test(pincode));
    }

    // Fetch areas for a PIN code from India Postal API
    async fetchPostalAreas(pincode) {
        try {
            // 1) Try India data.gov.in PIN directory if configured
            const cfg = window.APIConfig && window.APIConfig.getAPIConfig && window.APIConfig.getAPIConfig('indiaDataGov', 'government');
            if (cfg && cfg.apiKey && cfg.apiKey !== 'ADD_YOUR_DATA_GOV_IN_API_KEY' && cfg.postalResourceId && cfg.postalResourceId !== 'SET_RESOURCE_ID') {
                try {
                    const url = `${cfg.baseURL}/${cfg.postalResourceId}?api-key=${cfg.apiKey}&format=json&filters[pincode]=${pincode}`;
                    const dgResp = await fetch(url);
                    if (dgResp.ok) {
                        const dgJson = await dgResp.json();
                        if (dgJson && Array.isArray(dgJson.records) && dgJson.records.length) {
                            const areas = dgJson.records.map(r => ({
                                name: r.office_name || r.officename || r.location || r.office || '',
                                district: r.districtname || r.district || '',
                                state: r.statename || r.state || 'Karnataka',
                                branchType: r.officetype || r.office_type || ''
                            })).filter(a => a.name);
                            if (areas.length) {
                                return areas;
                            }
                        }
                    }
                } catch (dgErr) {
                    console.warn('data.gov.in postal lookup failed', dgErr);
                }
            }

            // 2) Fallback: India Postal API
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
                timeout: 5000 // 5 second timeout
            });
            
            if (!response.ok) {
                throw new Error('Postal API request failed');
            }
            
            const data = await response.json();
            
            if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
                // Use all post offices returned for the PIN (do not filter out — we already validated Karnataka PIN prefix)
                const offices = data[0].PostOffice.map(po => ({
                    name: po.Name,
                    district: po.District,
                    state: po.State,
                    branchType: po.BranchType || ''
                }));
                // If only one office found, enrich with OSM Nominatim results
                if (offices.length < 2) {
                    try {
                        const nomi = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&addressdetails=1`);
                        const places = await nomi.json();
                        const extras = places
                            .filter(p => (p.address && (p.address.state || '').toLowerCase().includes('karnataka')))
                            .map(p => ({
                                name: p.address.village || p.address.suburb || p.address.town || p.address.city || p.display_name.split(',')[0],
                                district: p.address.county || p.address.state_district || offices[0].district,
                                state: 'Karnataka',
                                branchType: ''
                            }));
                        const merged = Array.from(new Map([...offices, ...extras].map(a => [`${a.name}|${a.district}`, a])).values());
                        return merged;
                    } catch (e) {
                        console.warn('Nominatim enrichment failed', e);
                        return offices;
                    }
                }
                return offices;
            } else {
                throw new Error('PIN code not found in postal database');
            }
        } catch (error) {
            console.error('Postal API error:', error);
            return null; // Will trigger fallback method
        }
    }

    // OpenWeatherMap ZIP geocoding for precise lat/lon
    async geocodeWithOWMZip(pincode) {
        const owmKey = (window.WeatherModule && window.WeatherModule.API_KEY) || '';
        if (!owmKey) throw new Error('Missing OpenWeather API key');
        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${pincode},IN&appid=${owmKey}`);
        if (!resp.ok) throw new Error('OWM ZIP geocoding failed');
        const data = await resp.json();
        return {
            lat: data.lat,
            lon: data.lon,
            name: `${data.name} (PIN: ${pincode})`,
            district: data.name,
            state: 'Karnataka'
        };
    }

    // OpenWeatherMap direct geocoding for area + district
    async geocodeAreaWithOWM(areaName, district) {
        const owmKey = (window.WeatherModule && window.WeatherModule.API_KEY) || '';
        if (!owmKey) throw new Error('Missing OpenWeather API key');
        const q = encodeURIComponent(`${areaName}, ${district}, IN`);
        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${owmKey}`);
        if (!resp.ok) throw new Error('OWM direct geocoding failed');
        const arr = await resp.json();
        const best = arr && arr[0];
        if (!best) throw new Error('No geocoding result for area');
        return { lat: best.lat, lon: best.lon };
    }

    // Render a selectable list of areas for the entered PIN code
    renderAreaSelection(areas, pincode) {
        const container = document.getElementById('area-list');
        if (!container) return;
        container.innerHTML = '';

        // Build UI: label + select + apply button

        const label = document.createElement('div');
        label.style.marginBottom = '0.25rem';
        label.style.fontSize = '0.9rem';
        label.textContent = 'Select Area for PIN ' + pincode + ':';
        container.appendChild(label);

        const select = document.createElement('select');
        select.id = 'area-select';
        select.style.width = '100%';
        select.style.padding = '0.5rem';
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select an area';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
        // Sort areas alphabetically and dedupe by name|district
        const unique = Array.from(new Map(areas.map(a => [`${a.name}|${a.district}`, a])).values())
            .sort((a, b) => (a.district + a.name).localeCompare(b.district + b.name));
        unique.forEach(a => {
            const opt = document.createElement('option');
            opt.value = `${a.name}|${a.district}`;
            const suffix = a.branchType ? ` (${a.branchType})` : '';
            opt.textContent = `${a.name}${suffix}, ${a.district}`;
            select.appendChild(opt);
        });
        container.appendChild(select);

        // no defaulting note; explicit user selection is required

        // Update selection only when user confirms with button
        const onAreaSelect = async () => {
            try {
                const value = select.value;
                if (!value) return;
                const [areaName, district] = value.split('|');
                const coords = await this.geocodeAreaWithOWM(areaName, district);
                this.currentLocation = {
                    lat: coords.lat,
                    lon: coords.lon,
                    name: `${areaName}, ${district} (PIN: ${pincode})`,
                    type: 'pincode',
                    pincode
                };
                this.displayCurrentLocation();
                await this.loadLocationData();
            } catch (err) {
                console.error('Area selection geocode error:', err);
            }
        };
        const applyBtn = document.createElement('button');
        applyBtn.className = 'btn btn-primary';
        applyBtn.style.marginTop = '0.5rem';
        applyBtn.innerHTML = '<i class="fas fa-check"></i> Apply Area';
        applyBtn.addEventListener('click', onAreaSelect);
        container.appendChild(applyBtn);
    }

    // Get coordinates based on district name
    getDistrictCoordinates(districtName) {
        // Normalize district name for matching
        const normalizedDistrict = districtName.toLowerCase().replace(/\s+/g, '-');
        
        // Check if we have exact coordinates for this district
        for (const [key, district] of Object.entries(this.karnatakaDistricts)) {
            if (key === normalizedDistrict || 
                district.name.toLowerCase() === districtName.toLowerCase() ||
                district.name.toLowerCase().includes(districtName.toLowerCase().split(' ')[0])) {
                return { lat: district.lat, lon: district.lon };
            }
        }
        
        // Fallback to Karnataka center coordinates
        return { lat: 15.3173, lon: 75.7139 }; // Approximate center of Karnataka
    }

    // Fallback method using local PIN code data
    getKarnatakaPincodeData(pincode) {
        // Comprehensive Karnataka PIN code ranges with precise locations
        const pincodeRanges = {
            // Bangalore Urban (560xxx)
            '560': { name: 'Bangalore Urban', lat: 12.9716, lon: 77.5946, district: 'Bangalore Urban' },
            
            // Chikkaballapur (561xxx)
            '561': { name: 'Chikkaballapur', lat: 13.4355, lon: 77.7264, district: 'Chikkaballapur' },
            
            // Ramanagara (562xxx)
            '562': { name: 'Ramanagara', lat: 12.7179, lon: 77.2823, district: 'Ramanagara' },
            
            // Kolar (563xxx)
            '563': { name: 'Kolar', lat: 13.1378, lon: 78.1294, district: 'Kolar' },
            
            // Mysore (570xxx)
            '570': { name: 'Mysore', lat: 12.2958, lon: 76.6394, district: 'Mysore' },
            
            // Mandya & Kodagu (571xxx)
            '571': { name: 'Mandya', lat: 12.5244, lon: 76.8958, district: 'Mandya' },
            
            // Tumkur (572xxx)
            '572': { name: 'Tumkur', lat: 13.3379, lon: 77.1022, district: 'Tumkur' },
            
            // Hassan (573xxx)
            '573': { name: 'Hassan', lat: 13.0078, lon: 76.1005, district: 'Hassan' },
            
            // Dakshina Kannada - Mangalore (574xxx-575xxx)
            '574': { name: 'Dakshina Kannada', lat: 12.8438, lon: 75.2479, district: 'Dakshina Kannada' },
            '575': { name: 'Dakshina Kannada', lat: 12.8438, lon: 75.2479, district: 'Dakshina Kannada' },
            
            // Udupi (576xxx)
            '576': { name: 'Udupi', lat: 13.3409, lon: 74.7421, district: 'Udupi' },
            
            // Chikkamagaluru & Shimoga (577xxx)
            '577': { name: 'Shimoga', lat: 13.9299, lon: 75.5681, district: 'Shimoga' },
            
            // Davanagere (578xxx)
            '578': { name: 'Davanagere', lat: 14.4644, lon: 75.9218, district: 'Davanagere' },
            
            // Chitradurga (577xxx specific ranges)
            // Using more specific logic below for 577 conflicts
            
            // Dharwad & Hubli (580xxx)
            '580': { name: 'Dharwad', lat: 15.4589, lon: 75.0078, district: 'Dharwad' },
            
            // Uttara Kannada & Haveri (581xxx)
            '581': { name: 'Haveri', lat: 14.7951, lon: 75.4065, district: 'Haveri' },
            
            // Gadag (582xxx)
            '582': { name: 'Gadag', lat: 15.4167, lon: 75.6167, district: 'Gadag' },
            
            // Koppal & Bellary (583xxx)
            '583': { name: 'Bellary', lat: 15.1394, lon: 76.9214, district: 'Bellary' },
            
            // Raichur (584xxx)
            '584': { name: 'Raichur', lat: 16.2120, lon: 77.3439, district: 'Raichur' },
            
            // Kalaburagi, Bidar, Yadgir (585xxx)
            '585': { name: 'Kalaburagi', lat: 17.3297, lon: 76.8343, district: 'Kalaburagi' },
            
            // Bijapur/Vijayapura (586xxx)
            '586': { name: 'Vijayapura', lat: 16.8302, lon: 75.7100, district: 'Vijayapura' },
            
            // Bagalkot (587xxx)
            '587': { name: 'Bagalkot', lat: 16.1875, lon: 75.6919, district: 'Bagalkot' },
            
            // Belagavi/Belgaum (590xxx-591xxx)
            '590': { name: 'Belagavi', lat: 15.8497, lon: 74.4977, district: 'Belagavi' },
            '591': { name: 'Belagavi', lat: 15.8497, lon: 74.4977, district: 'Belagavi' }
        };
        
        // Handle specific PIN code ranges with more precision
        const specificRanges = this.getSpecificPincodeRange(pincode);
        
        const prefix = pincode.substring(0, 3);
        const locationData = pincodeRanges[prefix];
        
        if (locationData) {
            return {
                lat: locationData.lat,
                lon: locationData.lon,
                name: `${locationData.name} (PIN: ${pincode})`,
                district: locationData.district,
                state: 'Karnataka'
            };
        }
        
        // Final fallback - Karnataka center with PIN code
        return {
            lat: 15.3173,
            lon: 75.7139,
            name: `Karnataka (PIN: ${pincode})`,
            district: 'Unknown',
            state: 'Karnataka'
        };
    }

    displayCurrentLocation() {
        const locationElement = document.getElementById('current-location');
        const locationText = document.getElementById('location-text');
        
        if (this.currentLocation) {
            const acc = this.currentLocation.accuracyMeters ? ` (±${Math.round(this.currentLocation.accuracyMeters)}m)` : '';
            const mode = this.currentLocation.type === 'gps' ? 'GPS' : 'District';
            locationText.textContent = `${this.currentLocation.name}${acc} • ${mode}`;
            locationElement.classList.remove('hidden');
            locationElement.classList.add('fade-in');
        }
    }

    async loadLocationData() {
        if (!this.currentLocation) return;

        try {
            // Load weather data
            await this.loadWeatherData();
            
            // Load soil data
            await this.loadSoilData();
            
            // Load crop recommendations for current season
            const currentSeason = this.getCurrentSeason();
            await this.loadCropRecommendations(currentSeason);

            // Store location data for offline use
            this.storeLocationData();

        } catch (error) {
            console.error('Error loading location data:', error);
            this.showAlert('Some data could not be loaded. Please check your connection.', 'warning');
        }
    }

    async loadWeatherData() {
        // This will be implemented in weather.js
        if (window.WeatherModule) {
            await window.WeatherModule.loadWeatherData(this.currentLocation);
        }
    }

    async loadSoilData() {
        // This will be implemented in soil.js
        if (window.SoilModule) {
            await window.SoilModule.loadSoilData(this.currentLocation);
            // SoilModule stores into window.smartFarmingApp.soilData; mirror locally for crop module
            if (window.smartFarmingApp && window.smartFarmingApp.soilData) {
                this.soilData = window.smartFarmingApp.soilData;
            }
        }
    }

    async loadCropRecommendations(season) {
        // This will be implemented in crops.js
        if (window.CropModule) {
            await window.CropModule.loadCropRecommendations(this.currentLocation, season, this.soilData);
        }
    }

    // Find nearest district by distance to district centroids
    getNearestDistrict(lat, lon) {
        const toRad = (d) => (d * Math.PI) / 180;
        const haversineKm = (aLat, aLon, bLat, bLon) => {
            const R = 6371;
            const dLat = toRad(bLat - aLat);
            const dLon = toRad(bLon - aLon);
            const s1 = Math.sin(dLat / 2);
            const s2 = Math.sin(dLon / 2);
            const aa = s1 * s1 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * s2 * s2;
            return 2 * R * Math.asin(Math.min(1, Math.sqrt(aa)));
        };

        let best = null;
        for (const [key, d] of Object.entries(this.karnatakaDistricts)) {
            const dist = haversineKm(lat, lon, d.lat, d.lon);
            if (!best || dist < best.distKm) best = { key, name: d.name, distKm: dist };
        }
        return best;
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1; // 1-12
        
        if (month >= 6 && month <= 10) {
            return 'kharif'; // June-October
        } else if (month >= 11 || month <= 3) {
            return 'rabi'; // November-March
        } else {
            return 'zaid'; // April-May
        }
    }

    storeLocationData() {
        if (this.currentLocation) {
            localStorage.setItem('smartFarming_location', JSON.stringify(this.currentLocation));
            localStorage.setItem('smartFarming_lastUpdate', new Date().toISOString());
        }
    }

    loadStoredData() {
        try {
            const storedLocation = localStorage.getItem('smartFarming_location');
            const lastUpdate = localStorage.getItem('smartFarming_lastUpdate');
            
            if (storedLocation && lastUpdate) {
                const updateTime = new Date(lastUpdate);
                const now = new Date();
                const hoursSinceUpdate = (now - updateTime) / (1000 * 60 * 60);
                
                // Use cached data if less than 6 hours old
                if (hoursSinceUpdate < 6) {
                    this.currentLocation = JSON.parse(storedLocation);
                    this.displayCurrentLocation();
                    
                    // Load cached data modules
                    if (!this.isOnline) {
                        this.loadCachedData();
                    }
                }
            }
        } catch (error) {
            console.error('Error loading stored data:', error);
        }
    }

    loadCachedData() {
        // Load cached weather data
        const cachedWeather = localStorage.getItem('smartFarming_weather');
        if (cachedWeather && window.WeatherModule) {
            window.WeatherModule.displayCachedWeather(JSON.parse(cachedWeather));
        }

        // Load cached soil data
        const cachedSoil = localStorage.getItem('smartFarming_soil');
        if (cachedSoil && window.SoilModule) {
            window.SoilModule.displayCachedSoil(JSON.parse(cachedSoil));
        }

        // Load cached crop data
        const cachedCrops = localStorage.getItem('smartFarming_crops');
        if (cachedCrops && window.CropModule) {
            window.CropModule.displayCachedCrops(JSON.parse(cachedCrops));
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }

    showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${this.getAlertIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add to weather alerts section or create temporary alert
        const alertsContainer = document.getElementById('weather-alerts');
        if (alertsContainer) {
            alertsContainer.appendChild(alert);
            
            // Remove after 5 seconds
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 5000);
        }
    }

    getAlertIcon(type) {
        const icons = {
            info: 'info-circle',
            warning: 'exclamation-triangle',
            error: 'exclamation-circle',
            success: 'check-circle'
        };
        return icons[type] || icons.info;
    }

    // Utility function to check if location is in Karnataka
    isLocationInKarnataka(lat, lon) {
        // Karnataka boundaries (approximate)
        const karnatakaBox = {
            north: 18.45,
            south: 11.30,
            east: 78.59,
            west: 74.05
        };

        return lat >= karnatakaBox.south && 
               lat <= karnatakaBox.north && 
               lon >= karnatakaBox.west && 
               lon <= karnatakaBox.east;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartFarmingApp = new SmartFarmingApp();
});

// Global functions for HTML onclick handlers
function getCurrentLocation() {
    window.smartFarmingApp.getCurrentLocation();
}

function getLocationData() {
    window.smartFarmingApp.getLocationData();
}
