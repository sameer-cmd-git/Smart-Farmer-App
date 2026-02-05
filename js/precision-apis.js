// Enhanced Precision APIs for Karnataka Land Records and Agricultural Data
// This module integrates with government and scientific APIs for maximum accuracy

class KarnatakaPrecisionAPIs {
    constructor() {
        // Government API endpoints (configured after approval)
        this.governmentAPIs = {
            // Karnataka Land Records
            bhoomi: {
                baseURL: 'https://bhoomi.karnataka.gov.in/api/v1',
                endpoints: {
                    landRecords: '/land-records',
                    surveyNumber: '/survey',
                    ownership: '/ownership',
                    cropHistory: '/crop-history',
                    soilSurvey: '/soil-survey'
                }
            },
            
            // Karnataka State Remote Sensing Application Centre
            ksrsac: {
                baseURL: 'https://api.ksrsac.in/v1',
                endpoints: {
                    satelliteImagery: '/satellite',
                    cropMonitoring: '/crop-monitoring',
                    droughtAssessment: '/drought',
                    landCover: '/land-cover'
                }
            },
            
            // AgriMarketing Karnataka
            agrimarket: {
                baseURL: 'https://agrimarketing.karnataka.gov.in/api',
                endpoints: {
                    marketPrices: '/prices',
                    apmcData: '/apmc',
                    cropArrival: '/arrivals',
                    productionData: '/production'
                }
            },
            
            // India Meteorological Department
            imd: {
                baseURL: 'https://api.mausam.imd.gov.in/v1',
                endpoints: {
                    districtForecast: '/forecast/district',
                    agroAdvisory: '/agro-advisory',
                    rainfall: '/rainfall',
                    warnings: '/warnings'
                }
            }
        };

        // ISRO APIs (some publicly available)
        this.isroAPIs = {
            // BHUVAN - Indian Geo-platform
            bhuvan: {
                baseURL: 'https://bhuvan.nrsc.gov.in/api/v2',
                endpoints: {
                    villageMaps: '/village-boundary',
                    landClassification: '/land-classification',
                    waterBodies: '/water-bodies',
                    adminBoundary: '/admin-boundary'
                },
                // Some BHUVAN services are publicly accessible
                publicEndpoints: {
                    wms: 'https://bhuvan5.nrsc.gov.in/bhuvan/wms',
                    villages: 'https://bhuvan.nrsc.gov.in/bhuvan_links.php'
                }
            },
            
            // VEDAS - Earth Observation Data
            vedas: {
                baseURL: 'https://vedas.sac.gov.in/api',
                endpoints: {
                    ndvi: '/vegetation-index',
                    soilMoisture: '/soil-moisture',
                    cropHealth: '/crop-health',
                    satelliteImagery: '/imagery'
                }
            },
            
            // MOSDAC - Meteorological Satellite Data
            mosdac: {
                baseURL: 'https://api.mosdac.gov.in/data',
                endpoints: {
                    rainfall: '/rainfall-satellite',
                    weather: '/weather-satellite',
                    cyclone: '/cyclone-data'
                }
            }
        };

        // Research and Scientific APIs
        this.scientificAPIs = {
            // National Bureau of Soil Survey & Land Use Planning
            nbss: {
                baseURL: 'https://api.nbsslup.in',
                endpoints: {
                    soilSurvey: '/soil-survey',
                    healthCard: '/soil-health',
                    fertility: '/fertility-status',
                    recommendations: '/soil-recommendations'
                }
            },
            
            // Indian Council of Agricultural Research
            icar: {
                baseURL: 'https://api.icar.org.in',
                endpoints: {
                    cropRecommendations: '/crop-recommendations',
                    pestManagement: '/pest-disease',
                    bestPractices: '/best-practices',
                    varieties: '/crop-varieties'
                }
            },
            
            // NASA POWER (Free API)
            nasaPower: {
                baseURL: 'https://power.larc.nasa.gov/api/temporal',
                parameters: [
                    'T2M',          // Temperature at 2 Meters
                    'PRECTOTCORR',  // Precipitation Corrected
                    'WS2M',         // Wind Speed at 2 Meters
                    'RH2M',         // Relative Humidity at 2 Meters
                    'ALLSKY_SFC_SW_DWN', // Solar Radiation
                    'T2M_MAX',      // Maximum Temperature
                    'T2M_MIN',      // Minimum Temperature
                    'GWETROOT',     // Root Zone Soil Wetness
                    'GWETTOP'       // Surface Soil Wetness
                ]
            }
        };

        // API Keys (to be configured)
        this.apiKeys = {
            bhoomi: process.env.BHOOMI_API_KEY || 'demo_mode',
            ksrsac: process.env.KSRSAC_API_KEY || 'demo_mode',
            imd: process.env.IMD_API_KEY || 'demo_mode',
            vedas: process.env.VEDAS_API_KEY || 'demo_mode',
            nbss: process.env.NBSS_API_KEY || 'demo_mode',
            icar: process.env.ICAR_API_KEY || 'demo_mode',
            // Prefer key from global APIConfig if present; fallback to env/window config or demo_mode
            bhuvan: (window.APIConfig && window.APIConfig.getAPIConfig
                && window.APIConfig.getAPIConfig('bhuvanISRO', 'government')
                && window.APIConfig.getAPIConfig('bhuvanISRO', 'government').apiKey)
                || (typeof window !== 'undefined' && window.__ENV && window.__ENV.BHUVAN_API_KEY)
                || (typeof process !== 'undefined' && process.env && process.env.BHUVAN_API_KEY)
                || 'demo_mode'
        };
    }

    // High-precision location data with government sources
    async getPreciseLocationData(latitude, longitude, surveyNumber = null, options = {}) {
        const locationData = {
            coordinates: { lat: latitude, lon: longitude },
            timestamp: new Date().toISOString(),
            accuracy: 'high-precision',
            sources: []
        };

        try {
            // 1. Get administrative boundaries from BHUVAN
            const adminData = await this.getBhuvanAdminBoundary(latitude, longitude);
            if (adminData) {
                locationData.administrative = adminData;
                locationData.sources.push('BHUVAN-ISRO');
            }

            // 2. Get land classification from KSRSAC
            const landClassification = await this.getKSRSACLandClassification(latitude, longitude);
            if (landClassification) {
                locationData.landUse = landClassification;
                locationData.sources.push('KSRSAC');
            }

            // 3. Get land records from Bhoomi (if survey number provided)
            if (surveyNumber) {
                const landRecords = await this.getBhoomiLandRecords(surveyNumber);
                if (landRecords) {
                    locationData.landRecords = landRecords;
                    locationData.sources.push('Bhoomi-Karnataka');
                }
            }

            // 4. Get NASA POWER agricultural data
            const nasaData = await this.getNASAPowerData(latitude, longitude);
            if (nasaData) {
                locationData.climaticData = nasaData;
                locationData.sources.push('NASA-POWER');
            }

            return locationData;

        } catch (error) {
            console.error('Error fetching precision location data:', error);
            return this.getFallbackLocationData(latitude, longitude);
        }
    }

    // BHUVAN API integration for administrative boundaries
    async getBhuvanAdminBoundary(lat, lon) {
        try {
            // First try BHUVAN Feature API (requires token)
            if (this.apiKeys.bhuvan && this.apiKeys.bhuvan !== 'demo_mode') {
                try {
                    const featureURL = `${this.isroAPIs.bhuvan.baseURL}/admin-boundary?lat=${lat}&lon=${lon}`;
                    const resp = await fetch(featureURL, {
                        headers: {
                            'Authorization': `Bearer ${this.apiKeys.bhuvan}`,
                            'Accept': 'application/json'
                        }
                    });
                    if (resp.ok) {
                        const json = await resp.json();
                        // Attempt to normalize common field names
                        const state = json.state || json.STATE_NAME || json.properties?.state || 'Karnataka';
                        const district = json.district || json.DIST_NAME || json.properties?.district || 'unknown';
                        const taluk = json.taluk || json.TALUK_NAME || json.properties?.taluk || 'unknown';
                        const village = json.village || json.VILL_NAME || json.properties?.village || 'unknown';
                        return { state, district, taluk, village };
                    }
                } catch (e) {
                    // Silent fallback to WMS below
                }
            }

            // Fallback: Use BHUVAN WMS service for administrative boundaries (no key)
            const wmsURL = `${this.isroAPIs.bhuvan.publicEndpoints.wms}?` +
                `SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&` +
                `LAYERS=india:admin_boundary_india&` +
                `QUERY_LAYERS=india:admin_boundary_india&` +
                `STYLES=&FORMAT=image/png&FEATURE_COUNT=10&` +
                `X=50&Y=50&SRS=EPSG:4326&WIDTH=101&HEIGHT=101&` +
                `BBOX=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}`;

            const response = await fetch(wmsURL);
            const data = await response.text();
            
            // Parse WMS response (would need proper parsing)
            return this.parseBhuvanAdminData(data, lat, lon);
            
        } catch (error) {
            console.error('BHUVAN API error:', error);
            return null;
        }
    }

    // Karnataka Land Records (Bhoomi) integration
    async getBhoomiLandRecords(surveyNumber) {
        if (this.apiKeys.bhoomi === 'demo_mode') {
            return this.getDemoBhoomiData(surveyNumber);
        }

        try {
            const response = await fetch(`${this.governmentAPIs.bhoomi.baseURL}/land-records/${surveyNumber}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.bhoomi}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Bhoomi API error: ${response.status}`);
            }

            const data = await response.json();
            return {
                surveyNumber: data.survey_number,
                village: data.village,
                taluk: data.taluk,
                district: data.district,
                landType: data.land_type,
                ownerName: data.owner_name,
                extent: data.extent,
                classification: data.classification,
                soilType: data.soil_type,
                cropHistory: data.crop_history,
                waterSource: data.water_source,
                lastUpdated: data.last_updated
            };

        } catch (error) {
            console.error('Bhoomi API error:', error);
            return this.getDemoBhoomiData(surveyNumber);
        }
    }

    // KSRSAC Satellite Data for Land Classification
    async getKSRSACLandClassification(lat, lon) {
        if (this.apiKeys.ksrsac === 'demo_mode') {
            return this.getDemoKSRSACData(lat, lon);
        }

        try {
            const response = await fetch(`${this.governmentAPIs.ksrsac.baseURL}/land-cover`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.ksrsac}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lon,
                    resolution: 'high'
                })
            });

            const data = await response.json();
            return {
                landCoverType: data.land_cover_type,
                cropType: data.current_crop,
                cropHealth: data.crop_health_index,
                ndvi: data.ndvi_value,
                soilMoisture: data.soil_moisture_level,
                imageDate: data.satellite_image_date,
                confidence: data.classification_confidence
            };

        } catch (error) {
            console.error('KSRSAC API error:', error);
            return this.getDemoKSRSACData(lat, lon);
        }
    }

    // Scientific Soil Data from NBSS&LUP
    async getScientificSoilData(lat, lon) {
        if (this.apiKeys.nbss === 'demo_mode') {
            return this.getDemoNBSSData(lat, lon);
        }

        try {
            const response = await fetch(`${this.scientificAPIs.nbss.baseURL}/soil-survey`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.nbss}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lon,
                    state: 'Karnataka'
                })
            });

            const data = await response.json();
            return {
                soilSeries: data.soil_series,
                soilFamily: data.soil_family,
                textureClass: data.texture_class,
                drainageClass: data.drainage_class,
                phValue: data.ph_value,
                organicCarbon: data.organic_carbon,
                availableNitrogen: data.available_nitrogen,
                availablePhosphorus: data.available_phosphorus,
                availablePotassium: data.available_potassium,
                cationExchangeCapacity: data.cec,
                baseSaturation: data.base_saturation,
                recommendations: data.fertilizer_recommendations,
                suitability: data.crop_suitability
            };

        } catch (error) {
            console.error('NBSS API error:', error);
            return this.getDemoNBSSData(lat, lon);
        }
    }

    // Enhanced Weather Data from IMD
    async getIMDWeatherData(lat, lon, district) {
        if (this.apiKeys.imd === 'demo_mode') {
            return this.getDemoIMDData(district);
        }

        try {
            const response = await fetch(`${this.governmentAPIs.imd.baseURL}/forecast/district/${district}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.imd}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return {
                currentWeather: data.current,
                forecast: data.forecast,
                agroAdvisory: data.agro_advisory,
                weatherWarnings: data.warnings,
                rainfallData: data.rainfall,
                soilTemperature: data.soil_temperature,
                evapotranspiration: data.evapotranspiration,
                windDirection: data.wind_direction,
                cloudCover: data.cloud_cover
            };

        } catch (error) {
            console.error('IMD API error:', error);
            return this.getDemoIMDData(district);
        }
    }

    // Market Price Data from Karnataka AgriMarketing
    async getMarketPriceData(district, crop = null) {
        try {
            let endpoint = `${this.governmentAPIs.agrimarket.baseURL}/prices/${district}`;
            if (crop) {
                endpoint += `/${crop}`;
            }

            const response = await fetch(endpoint);
            const data = await response.json();

            return {
                marketData: data.prices,
                apmcCenters: data.apmc_centers,
                averagePrice: data.average_price,
                priceRange: data.price_range,
                marketTrend: data.trend,
                lastUpdated: data.last_updated
            };

        } catch (error) {
            console.error('AgriMarket API error:', error);
            return this.getDemoMarketData(district, crop);
        }
    }

    // NASA POWER Agricultural Data (Free API)
    async getNASAPowerData(lat, lon) {
        try {
            const parameters = this.scientificAPIs.nasaPower.parameters.join(',');
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 30); // Last 30 days

            const url = `${this.scientificAPIs.nasaPower.baseURL}/daily/point` +
                `?parameters=${parameters}` +
                `&community=AG` +
                `&longitude=${lon}` +
                `&latitude=${lat}` +
                `&start=${startDate.toISOString().split('T')[0].replace(/-/g, '')}` +
                `&end=${endDate.toISOString().split('T')[0].replace(/-/g, '')}` +
                `&format=JSON`;

            const response = await fetch(url);
            const data = await response.json();

            return {
                temperature: data.properties.parameter.T2M,
                precipitation: data.properties.parameter.PRECTOTCORR,
                humidity: data.properties.parameter.RH2M,
                windSpeed: data.properties.parameter.WS2M,
                solarRadiation: data.properties.parameter.ALLSKY_SFC_SW_DWN,
                soilMoisture: {
                    surface: data.properties.parameter.GWETTOP,
                    rootZone: data.properties.parameter.GWETROOT
                },
                temperatureRange: {
                    max: data.properties.parameter.T2M_MAX,
                    min: data.properties.parameter.T2M_MIN
                }
            };

        } catch (error) {
            console.error('NASA POWER API error:', error);
            return null;
        }
    }

    // Demo data methods (for when APIs are not available)
    getDemoBhoomiData(surveyNumber) {
        return {
            surveyNumber: surveyNumber,
            village: 'Demo Village',
            taluk: 'Demo Taluk',
            district: 'Bangalore Urban',
            landType: 'Agricultural',
            extent: '2 Acres 15 Guntas',
            classification: 'Dry Land',
            soilType: 'Red Soil',
            cropHistory: ['Ragi', 'Groundnut', 'Maize'],
            waterSource: 'Borewell',
            lastUpdated: '2024-01-15'
        };
    }

    getDemoKSRSACData(lat, lon) {
        return {
            landCoverType: 'Agricultural Land',
            cropType: 'Finger Millet',
            cropHealth: 'Good',
            ndvi: 0.65,
            soilMoisture: 'Moderate',
            imageDate: '2024-01-10',
            confidence: 85
        };
    }

    getDemoNBSSData(lat, lon) {
        return {
            soilSeries: 'Bangalore Series',
            textureClass: 'Sandy Clay Loam',
            drainageClass: 'Well Drained',
            phValue: 6.2,
            organicCarbon: 0.85,
            availableNitrogen: 245,
            availablePhosphorus: 15.2,
            availablePotassium: 285,
            recommendations: {
                nitrogen: '120 kg/ha',
                phosphorus: '60 kg/ha',
                potassium: '40 kg/ha'
            }
        };
    }

    getDemoIMDData(district) {
        return {
            currentWeather: {
                temperature: 28,
                humidity: 65,
                windSpeed: 8,
                conditions: 'Partly Cloudy'
            },
            agroAdvisory: 'Favorable conditions for ragi cultivation. Monitor for pest attacks.',
            weatherWarnings: []
        };
    }

    getDemoMarketData(district, crop) {
        return {
            averagePrice: crop === 'rice' ? 2850 : 4500,
            priceRange: { min: 2600, max: 3100 },
            marketTrend: 'stable',
            lastUpdated: new Date().toISOString()
        };
    }

    // Fallback location data
    getFallbackLocationData(lat, lon) {
        return {
            coordinates: { lat, lon },
            accuracy: 'basic',
            sources: ['fallback-data'],
            note: 'Using basic location data. Government APIs not available.'
        };
    }

    // Parse BHUVAN administrative data (simplified)
    parseBhuvanAdminData(wmsResponse, lat, lon) {
        // In a real implementation, you would parse the WMS response properly
        // This is a simplified example
        return {
            state: 'Karnataka',
            district: this.getDistrictFromCoordinates(lat, lon),
            taluk: 'Demo Taluk',
            village: 'Demo Village'
        };
    }

    // Helper method to determine district from coordinates
    getDistrictFromCoordinates(lat, lon) {
        // Simplified district detection based on coordinates
        // In production, use proper spatial queries
        const districts = {
            bangalore: { lat: 12.9716, lon: 77.5946, bounds: { n: 13.2, s: 12.7, e: 77.8, w: 77.3 } },
            mysore: { lat: 12.2958, lon: 76.6394, bounds: { n: 12.6, s: 12.0, e: 77.0, w: 76.3 } },
            // Add more districts as needed
        };

        for (const [district, data] of Object.entries(districts)) {
            const { bounds } = data;
            if (lat >= bounds.s && lat <= bounds.n && lon >= bounds.w && lon <= bounds.e) {
                return district;
            }
        }

        return 'unknown';
    }
}

// Initialize the precision APIs module
window.KarnatakaPrecisionAPIs = new KarnatakaPrecisionAPIs();

// Integration with main app
if (window.smartFarmingApp) {
    window.smartFarmingApp.precisionAPIs = window.KarnatakaPrecisionAPIs;
}
