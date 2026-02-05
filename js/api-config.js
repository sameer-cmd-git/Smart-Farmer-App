// API Configuration for Live Data
// Replace the API keys below with your actual keys

class APIConfig {
    constructor() {
        // Helper to resolve keys from window.__ENV or process.env (build-time)
        const resolveKey = (name, fallback = 'demo_mode') => {
            if (typeof window !== 'undefined' && window.__ENV && window.__ENV[name]) return window.__ENV[name];
            if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
            return fallback;
        };

        // Weather APIs (Get these first for immediate live data)
        this.weatherAPIs = {
            openWeatherMap: {
                apiKey: resolveKey('OPENWEATHERMAP_API_KEY', 'YOUR_OPENWEATHERMAP_API_KEY'),
                baseURL: 'https://api.openweathermap.org/data/2.5',
                oneCallURL: 'https://api.openweathermap.org/data/3.0/onecall',
                status: 'ACTIVE',
                freeLimit: '1000 calls/day',
                priority: 1
            },

            visualCrossing: {
                apiKey: resolveKey('VISUALCROSSING_API_KEY', 'demo_mode'),
                baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
                status: 'ACTIVE',
                freeLimit: '1000 records/day',
                priority: 3
            },

            nasaPower: {
                apiKey: 'NOT_REQUIRED', // Free API, no key needed
                baseURL: 'https://power.larc.nasa.gov/api/temporal',
                status: 'ACTIVE',
                freeLimit: 'Unlimited',
                priority: 2
            }
        };

        // Government APIs (Apply for these today)
        this.governmentAPIs = {
            karnatakaBhoomi: {
                apiKey: 'PENDING_GOVERNMENT_APPROVAL',
                baseURL: 'https://bhoomi.karnataka.gov.in/api/v1',
                status: 'APPLY_TODAY',
                contact: 'landrecords@karnataka.gov.in',
                timeline: '6-8 weeks',
                priority: 4
            },
            
            agriMarketKarnataka: {
                apiKey: 'PENDING_APPROVAL',
                baseURL: 'https://agrimarketing.karnataka.gov.in/api',
                status: 'APPLY_TODAY',
                contact: 'agrimarketing@karnataka.gov.in',
                timeline: '2-4 weeks',
                priority: 5
            },
            
            imdWeather: {
                apiKey: 'PENDING_APPROVAL',
                baseURL: 'https://api.mausam.imd.gov.in/v1',
                status: 'APPLY_TODAY',
                contact: 'director@imd.gov.in',
                timeline: '4-6 weeks',
                priority: 6
            },
            
            bhuvanISRO: {
                apiKey: resolveKey('BHUVAN_API_KEY', 'demo_mode'),
                baseURL: 'https://bhuvan.nrsc.gov.in/api/v2',
                publicServices: 'https://bhuvan5.nrsc.gov.in/bhuvan/wms',
                status: 'ACTIVE',
                website: 'https://bhuvan.nrsc.gov.in/',
                timeline: 'Active - token configured',
                priority: 7
            },

            // Open Government Data (India) - optional, for accurate PIN directory
            indiaDataGov: {
                apiKey: 'ADD_YOUR_DATA_GOV_IN_API_KEY',
                baseURL: 'https://api.data.gov.in/resource',
                // Set this to the resource id of "All India Pincode Directory" dataset
                postalResourceId: 'SET_RESOURCE_ID',
                status: 'OPTIONAL',
                website: 'https://data.gov.in/',
                timeline: 'Immediate after signup'
            }
        };

        // Scientific/Research APIs
        this.researchAPIs = {
            nbssLup: {
                apiKey: 'RESEARCH_PARTNERSHIP_REQUIRED',
                baseURL: 'https://api.nbsslup.in',
                status: 'RESEARCH_COLLABORATION',
                contact: 'director.nbsslup@icar.gov.in',
                timeline: '8-12 weeks',
                priority: 8
            },
            
            icarData: {
                apiKey: 'PARTNERSHIP_REQUIRED',
                baseURL: 'https://api.icar.org.in',
                status: 'RESEARCH_COLLABORATION',
                contact: 'Research collaboration needed',
                timeline: '8-12 weeks',
                priority: 9
            }
        };
    }

    // Get current API status
    getAPIStatus() {
        const status = {
            immediate: [],
            needKeys: [],
            needApproval: [],
            active: []
        };

        // Check weather APIs
        Object.entries(this.weatherAPIs).forEach(([name, config]) => {
            if (config.status === 'ACTIVE') {
                status.active.push({name, type: 'weather', ...config});
            } else if (config.status === 'REPLACE_WITH_YOUR_KEY') {
                status.needKeys.push({name, type: 'weather', ...config});
            }
        });

        // Check government APIs
        Object.entries(this.governmentAPIs).forEach(([name, config]) => {
            if (config.status === 'APPLY_TODAY' || config.status === 'REGISTER_TODAY') {
                status.needApproval.push({name, type: 'government', ...config});
            }
        });

        return status;
    }

    // Get priority APIs to implement first
    getPriorityAPIs() {
        const allAPIs = [
            ...Object.entries(this.weatherAPIs).map(([name, config]) => ({name, category: 'weather', ...config})),
            ...Object.entries(this.governmentAPIs).map(([name, config]) => ({name, category: 'government', ...config})),
            ...Object.entries(this.researchAPIs).map(([name, config]) => ({name, category: 'research', ...config}))
        ];

        return allAPIs
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 5); // Top 5 priorities
    }

    // Check if an API is ready to use
    isAPIReady(apiName, category) {
        const apis = this[`${category}APIs`];
        if (!apis || !apis[apiName]) return false;

        const config = apis[apiName];
        return config.status === 'ACTIVE' && 
               config.apiKey !== 'YOUR_OPENWEATHERMAP_API_KEY_HERE' &&
               config.apiKey !== 'PENDING_APPROVAL';
    }

    // Get API configuration for integration
    getAPIConfig(apiName, category) {
        const apis = this[`${category}APIs`];
        return apis ? apis[apiName] : null;
    }

    // Update API key
    updateAPIKey(apiName, category, newKey) {
        const apis = this[`${category}APIs`];
        if (apis && apis[apiName]) {
            apis[apiName].apiKey = newKey;
            apis[apiName].status = 'ACTIVE';
            console.log(`✅ ${apiName} API key updated and activated!`);
            return true;
        }
        return false;
    }

    // Get setup instructions
    getSetupInstructions() {
        return {
            immediate: {
                title: "🔥 GET THESE TODAY (5 minutes each)",
                apis: [
                    {
                        name: "OpenWeatherMap",
                        url: "https://openweathermap.org/users/sign_up",
                        steps: [
                            "1. Go to https://openweathermap.org/users/sign_up",
                            "2. Create free account",
                            "3. Verify email",
                            "4. Go to API keys section",
                            "5. Copy your API key",
                            "6. Replace in js/weather.js line 7"
                        ],
                        impact: "Real-time weather data for all Karnataka districts"
                    },
                    {
                        name: "Visual Crossing Weather",
                        url: "https://www.visualcrossing.com/weather-api",
                        steps: [
                            "1. Go to https://www.visualcrossing.com/weather-api",
                            "2. Sign up for free account",
                            "3. Get API key from dashboard",
                            "4. Optional: Enhanced weather analytics"
                        ],
                        impact: "Historical weather data and advanced analytics"
                    },
                    {
                        name: "BHUVAN Registration",
                        url: "https://bhuvan.nrsc.gov.in/",
                        steps: [
                            "1. Go to https://bhuvan.nrsc.gov.in/",
                            "2. Create free account",
                            "3. Access basic mapping services",
                            "4. Some data available immediately"
                        ],
                        impact: "Village boundaries and administrative data"
                    }
                ]
            },
            government: {
                title: "📋 APPLY FOR THESE TODAY (Official Data)",
                apis: [
                    {
                        name: "Karnataka AgriMarket",
                        contact: "agrimarketing@karnataka.gov.in",
                        timeline: "2-4 weeks",
                        impact: "Real APMC market prices"
                    },
                    {
                        name: "IMD Weather",
                        contact: "director@imd.gov.in",
                        timeline: "4-6 weeks", 
                        impact: "Official weather forecasts"
                    },
                    {
                        name: "Karnataka IT Department",
                        contact: "itbt@karnataka.gov.in",
                        timeline: "6-8 weeks",
                        impact: "Land records and government data"
                    }
                ]
            }
        };
    }
}

// Initialize API configuration
window.APIConfig = new APIConfig();

// Log current status
console.log("🔧 API Configuration Loaded");
console.log("📊 Current Status:", window.APIConfig.getAPIStatus());
console.log("⭐ Priority APIs:", window.APIConfig.getPriorityAPIs());
console.log("📝 Setup Instructions:", window.APIConfig.getSetupInstructions());
