// Enhanced Crop Suitability Analyzer for Smart Farming Assistant
// Integrates with Enhanced Weather Analytics for precise crop recommendations

class CropSuitabilityAnalyzer {
    constructor() {
        // Enhanced Karnataka crop database with detailed requirements
        this.cropDatabase = {
            rice: {
                name: { en: 'Rice', kn: 'ಅಕ್ಕಿ' },
                seasons: ['kharif'],
                soilTypes: ['clay', 'clayloam', 'alluvial'],
                temperature: { min: 20, max: 35, optimal: [25, 30] },
                rainfall: { annual: [1000, 2500], critical: 150 },
                humidity: { min: 60, max: 85, optimal: [70, 80] },
                ph: { min: 5.5, max: 7.0, optimal: [6.0, 6.8] },
                growingPeriod: 120,
                plantingMonths: [6, 7, 8],
                harvestMonths: [10, 11, 12],
                waterRequirement: 'high',
                economicValue: 'high',
                marketDemand: 'very-high',
                diseases: ['blast', 'brown-spot', 'bacterial-blight'],
                pests: ['stem-borer', 'leaf-folder', 'brown-plant-hopper']
            },
            wheat: {
                name: { en: 'Wheat', kn: 'ಗೋಧಿ' },
                seasons: ['rabi'],
                soilTypes: ['loam', 'clayloam', 'sandy'],
                temperature: { min: 10, max: 25, optimal: [15, 22] },
                rainfall: { annual: [300, 750], critical: 50 },
                humidity: { min: 40, max: 70, optimal: [50, 65] },
                ph: { min: 6.0, max: 7.5, optimal: [6.5, 7.2] },
                growingPeriod: 100,
                plantingMonths: [11, 12, 1],
                harvestMonths: [3, 4, 5],
                waterRequirement: 'medium',
                economicValue: 'high',
                marketDemand: 'high',
                diseases: ['rust', 'powdery-mildew', 'foot-rot'],
                pests: ['aphid', 'termite', 'army-worm']
            },
            cotton: {
                name: { en: 'Cotton', kn: 'ಹತ್ತಿ' },
                seasons: ['kharif'],
                soilTypes: ['black', 'alluvial', 'sandy'],
                temperature: { min: 18, max: 40, optimal: [25, 35] },
                rainfall: { annual: [500, 1250], critical: 100 },
                humidity: { min: 45, max: 75, optimal: [55, 70] },
                ph: { min: 5.8, max: 8.2, optimal: [6.5, 7.5] },
                growingPeriod: 180,
                plantingMonths: [5, 6, 7],
                harvestMonths: [11, 12, 1],
                waterRequirement: 'high',
                economicValue: 'very-high',
                marketDemand: 'high',
                diseases: ['wilt', 'root-rot', 'leaf-curl'],
                pests: ['bollworm', 'aphid', 'thrips']
            },
            sugarcane: {
                name: { en: 'Sugarcane', kn: 'ಕಬ್ಬು' },
                seasons: ['kharif', 'rabi'],
                soilTypes: ['loam', 'clayloam', 'alluvial'],
                temperature: { min: 20, max: 38, optimal: [26, 32] },
                rainfall: { annual: [750, 1500], critical: 200 },
                humidity: { min: 65, max: 85, optimal: [70, 80] },
                ph: { min: 6.0, max: 7.8, optimal: [6.5, 7.3] },
                growingPeriod: 365,
                plantingMonths: [2, 3, 10, 11],
                harvestMonths: [12, 1, 2, 3],
                waterRequirement: 'very-high',
                economicValue: 'high',
                marketDemand: 'high',
                diseases: ['red-rot', 'smut', 'wilt'],
                pests: ['borer', 'aphid', 'scale-insect']
            },
            groundnut: {
                name: { en: 'Groundnut', kn: 'ಕಡಲೇಕಾಯಿ' },
                seasons: ['kharif', 'rabi'],
                soilTypes: ['sandy', 'loam', 'red'],
                temperature: { min: 20, max: 30, optimal: [22, 28] },
                rainfall: { annual: [500, 750], critical: 75 },
                humidity: { min: 50, max: 75, optimal: [55, 70] },
                ph: { min: 6.0, max: 7.5, optimal: [6.3, 7.0] },
                growingPeriod: 110,
                plantingMonths: [6, 7, 12, 1],
                harvestMonths: [10, 11, 4, 5],
                waterRequirement: 'medium',
                economicValue: 'high',
                marketDemand: 'high',
                diseases: ['tikka-disease', 'rust', 'stem-rot'],
                pests: ['aphid', 'thrips', 'leaf-miner']
            },
            jowar: {
                name: { en: 'Sorghum', kn: 'ಜೋಳ' },
                seasons: ['kharif', 'rabi'],
                soilTypes: ['black', 'loam', 'sandy'],
                temperature: { min: 15, max: 40, optimal: [20, 35] },
                rainfall: { annual: [400, 1000], critical: 60 },
                humidity: { min: 45, max: 75, optimal: [50, 70] },
                ph: { min: 6.0, max: 8.5, optimal: [6.5, 7.8] },
                growingPeriod: 100,
                plantingMonths: [6, 7, 11, 12],
                harvestMonths: [10, 11, 3, 4],
                waterRequirement: 'low',
                economicValue: 'medium',
                marketDemand: 'medium',
                diseases: ['grain-mold', 'charcoal-rot', 'downy-mildew'],
                pests: ['stem-borer', 'aphid', 'shoot-fly']
            },
            ragi: {
                name: { en: 'Finger Millet', kn: 'ರಾಗಿ' },
                seasons: ['kharif'],
                soilTypes: ['red', 'loam', 'sandy'],
                temperature: { min: 15, max: 35, optimal: [20, 30] },
                rainfall: { annual: [500, 750], critical: 80 },
                humidity: { min: 50, max: 80, optimal: [60, 75] },
                ph: { min: 5.0, max: 8.2, optimal: [6.0, 7.5] },
                growingPeriod: 120,
                plantingMonths: [6, 7, 8],
                harvestMonths: [10, 11, 12],
                waterRequirement: 'low',
                economicValue: 'medium',
                marketDemand: 'high',
                diseases: ['blast', 'brown-spot', 'rust'],
                pests: ['stem-borer', 'aphid', 'army-worm']
            },
            maize: {
                name: { en: 'Maize', kn: 'ಮೆಕ್ಕೆ ಜೋಳ' },
                seasons: ['kharif', 'rabi'],
                soilTypes: ['loam', 'sandy', 'alluvial'],
                temperature: { min: 18, max: 35, optimal: [21, 30] },
                rainfall: { annual: [600, 1200], critical: 100 },
                humidity: { min: 50, max: 75, optimal: [55, 70] },
                ph: { min: 6.0, max: 7.5, optimal: [6.2, 7.0] },
                growingPeriod: 90,
                plantingMonths: [6, 7, 11, 12],
                harvestMonths: [9, 10, 2, 3],
                waterRequirement: 'medium',
                economicValue: 'medium',
                marketDemand: 'high',
                diseases: ['blight', 'rust', 'downy-mildew'],
                pests: ['stem-borer', 'fall-army-worm', 'aphid']
            }
        };

        // Current season determination
        this.currentSeason = this.getCurrentSeason();
        this.currentMonth = new Date().getMonth() + 1;
    }

    // Determine current agricultural season
    getCurrentSeason() {
        const month = new Date().getMonth() + 1; // 1-12
        
        if (month >= 6 && month <= 10) {
            return 'kharif';
        } else if (month >= 11 || month <= 3) {
            return 'rabi';
        } else {
            return 'zaid';
        }
    }

    // Analyze crop suitability based on multiple factors
    async analyzeCropSuitability(location, soilData, weatherData) {
        try {
            const analysis = {
                location: location,
                analysisDate: new Date().toISOString(),
                currentSeason: this.currentSeason,
                recommendations: [],
                seasonalAnalysis: {},
                riskAssessment: {},
                marketInsights: {}
            };

            // Get enhanced weather data if available
            let enhancedWeatherData = null;
            if (window.EnhancedWeatherAnalytics) {
                enhancedWeatherData = await window.EnhancedWeatherAnalytics.getEnhancedWeatherData(location);
            }

            // Analyze each crop
            Object.keys(this.cropDatabase).forEach(cropId => {
                const crop = this.cropDatabase[cropId];
                const suitability = this.calculateCropSuitability(
                    crop, 
                    soilData, 
                    weatherData, 
                    enhancedWeatherData,
                    location
                );

                analysis.recommendations.push({
                    cropId: cropId,
                    crop: crop,
                    suitability: suitability,
                    recommendation: this.generateCropRecommendation(crop, suitability),
                    timing: this.getOptimalTiming(crop),
                    risks: this.assessCropRisks(crop, weatherData, enhancedWeatherData),
                    management: this.getCropManagementAdvice(crop, suitability, weatherData)
                });
            });

            // Sort by suitability score
            analysis.recommendations.sort((a, b) => b.suitability.totalScore - a.suitability.totalScore);

            // Generate seasonal analysis
            analysis.seasonalAnalysis = this.generateSeasonalAnalysis(analysis.recommendations);

            return analysis;

        } catch (error) {
            console.error('Crop suitability analysis error:', error);
            return null;
        }
    }

    // Calculate detailed crop suitability score
    calculateCropSuitability(crop, soilData, weatherData, enhancedWeatherData, location) {
        const suitability = {
            totalScore: 0,
            factors: {},
            rating: 'poor',
            confidence: 100
        };

        let totalWeight = 0;

        // Season compatibility (25% weight)
        const seasonScore = crop.seasons.includes(this.currentSeason) ? 100 : 0;
        suitability.factors.season = {
            score: seasonScore,
            weight: 25,
            details: `Current season: ${this.currentSeason}, Suitable seasons: ${crop.seasons.join(', ')}`
        };
        suitability.totalScore += seasonScore * 0.25;
        totalWeight += 25;

        // Soil compatibility (25% weight)
        if (soilData && soilData.type) {
            const soilScore = this.calculateSoilCompatibility(crop, soilData);
            suitability.factors.soil = {
                score: soilScore,
                weight: 25,
                details: `Soil type: ${soilData.type}, pH: ${soilData.ph || 'unknown'}`
            };
            suitability.totalScore += soilScore * 0.25;
            totalWeight += 25;
        }

        // Weather compatibility (30% weight)
        if (weatherData) {
            const weatherScore = this.calculateWeatherCompatibility(crop, weatherData, enhancedWeatherData);
            suitability.factors.weather = {
                score: weatherScore,
                weight: 30,
                details: `Temperature: ${weatherData.temperature || 'unknown'}°C, Humidity: ${weatherData.humidity || 'unknown'}%`
            };
            suitability.totalScore += weatherScore * 0.30;
            totalWeight += 30;
        }

        // Timing compatibility (20% weight)
        const timingScore = this.calculateTimingCompatibility(crop);
        suitability.factors.timing = {
            score: timingScore,
            weight: 20,
            details: `Current month: ${this.currentMonth}, Planting months: ${crop.plantingMonths.join(', ')}`
        };
        suitability.totalScore += timingScore * 0.20;
        totalWeight += 20;

        // Normalize score based on available factors
        if (totalWeight > 0) {
            suitability.totalScore = (suitability.totalScore / totalWeight) * 100;
        }

        // Determine rating
        if (suitability.totalScore >= 80) {
            suitability.rating = 'excellent';
        } else if (suitability.totalScore >= 65) {
            suitability.rating = 'good';
        } else if (suitability.totalScore >= 45) {
            suitability.rating = 'fair';
        } else {
            suitability.rating = 'poor';
        }

        // Calculate confidence based on data availability
        suitability.confidence = Math.min(100, totalWeight);

        return suitability;
    }

    // Calculate soil compatibility score
    calculateSoilCompatibility(crop, soilData) {
        let score = 0;

        // Soil type compatibility
        const soilTypeMatch = crop.soilTypes.some(type => 
            soilData.type.toLowerCase().includes(type) || 
            type.includes(soilData.type.toLowerCase())
        );
        
        if (soilTypeMatch) {
            score += 60;
        } else {
            score += 20;
        }

        // pH compatibility
        if (soilData.ph) {
            const ph = parseFloat(soilData.ph);
            if (ph >= crop.ph.optimal[0] && ph <= crop.ph.optimal[1]) {
                score += 40;
            } else if (ph >= crop.ph.min && ph <= crop.ph.max) {
                score += 25;
            } else {
                score += 5;
            }
        } else {
            score += 20; // Neutral score if pH unknown
        }

        return Math.min(score, 100);
    }

    // Calculate weather compatibility score
    calculateWeatherCompatibility(crop, weatherData, enhancedWeatherData) {
        let score = 0;
        let factors = 0;

        // Use enhanced weather data if available
        const weatherToUse = enhancedWeatherData ? enhancedWeatherData.current : weatherData;

        // Temperature compatibility (40% of weather score)
        if (weatherToUse.temperature !== undefined) {
            const temp = weatherToUse.temperature;
            if (temp >= crop.temperature.optimal[0] && temp <= crop.temperature.optimal[1]) {
                score += 40;
            } else if (temp >= crop.temperature.min && temp <= crop.temperature.max) {
                score += 25;
            } else {
                score += 5;
            }
            factors++;
        }

        // Humidity compatibility (30% of weather score)
        if (weatherToUse.humidity !== undefined) {
            const humidity = weatherToUse.humidity;
            if (humidity >= crop.humidity.optimal[0] && humidity <= crop.humidity.optimal[1]) {
                score += 30;
            } else if (humidity >= crop.humidity.min && humidity <= crop.humidity.max) {
                score += 20;
            } else {
                score += 5;
            }
            factors++;
        }

        // Rainfall compatibility (30% of weather score)
        if (enhancedWeatherData && enhancedWeatherData.agriculturalInsights) {
            const weeklyRainfall = enhancedWeatherData.agriculturalInsights.weeklyTrend.rainfallTotal;
            const expectedWeeklyRainfall = crop.rainfall.critical / 4; // Rough weekly estimate
            
            if (Math.abs(weeklyRainfall - expectedWeeklyRainfall) <= expectedWeeklyRainfall * 0.3) {
                score += 30;
            } else if (Math.abs(weeklyRainfall - expectedWeeklyRainfall) <= expectedWeeklyRainfall * 0.6) {
                score += 20;
            } else {
                score += 10;
            }
            factors++;
        }

        return factors > 0 ? Math.min(score, 100) : 50;
    }

    // Calculate timing compatibility score
    calculateTimingCompatibility(crop) {
        const currentMonth = this.currentMonth;
        
        // Check if current month is suitable for planting
        if (crop.plantingMonths.includes(currentMonth)) {
            return 100;
        }

        // Check if it's close to planting season (within 1 month)
        const closeToplanting = crop.plantingMonths.some(month => {
            const diff = Math.abs(currentMonth - month);
            return diff <= 1 || diff >= 11; // Account for year wrap-around
        });

        if (closeToplanting) {
            return 70;
        }

        // Check if it's harvest season
        if (crop.harvestMonths.includes(currentMonth)) {
            return 30;
        }

        return 10;
    }

    // Generate crop recommendation
    generateCropRecommendation(crop, suitability) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';
        
        const recommendations = {
            en: {
                excellent: `Highly recommended! ${crop.name.en} is perfectly suited for current conditions.`,
                good: `Recommended. ${crop.name.en} should perform well with proper management.`,
                fair: `Consider with caution. ${crop.name.en} may face some challenges.`,
                poor: `Not recommended. ${crop.name.en} is not suitable for current conditions.`
            },
            kn: {
                excellent: `ಹೆಚ್ಚು ಶಿಫಾರಸು! ${crop.name.kn} ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಸೂಕ್ತವಾಗಿದೆ.`,
                good: `ಶಿಫಾರಸು. ${crop.name.kn} ಸರಿಯಾದ ನಿರ್ವಹಣೆಯೊಂದಿಗೆ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.`,
                fair: `ಎಚ್ಚರಿಕೆಯೊಂದಿಗೆ ಪರಿಗಣಿಸಿ. ${crop.name.kn} ಕೆಲವು ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಬಹುದು.`,
                poor: `ಶಿಫಾರಸು ಮಾಡಲಾಗುವುದಿಲ್ಲ. ${crop.name.kn} ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಸೂಕ್ತವಲ್ಲ.`
            }
        };

        return recommendations[currentLang][suitability.rating];
    }

    // Get optimal timing information
    getOptimalTiming(crop) {
        const monthNames = {
            en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            kn: ['ಜನ', 'ಫೆಬ್', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್', 'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ']
        };

        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';
        const names = monthNames[currentLang];

        return {
            planting: crop.plantingMonths.map(m => names[m - 1]),
            harvest: crop.harvestMonths.map(m => names[m - 1]),
            growingPeriod: crop.growingPeriod
        };
    }

    // Assess crop-specific risks
    assessCropRisks(crop, weatherData, enhancedWeatherData) {
        const risks = [];

        // Weather-based risks
        if (enhancedWeatherData && enhancedWeatherData.agriculturalInsights) {
            const insights = enhancedWeatherData.agriculturalInsights;

            // Temperature stress risk
            if (insights.currentConditions.overall === 'caution') {
                risks.push({
                    type: 'weather',
                    level: 'medium',
                    description: 'Weather conditions may cause stress',
                    mitigation: 'Monitor crop closely and adjust irrigation'
                });
            }

            // Disease risk based on humidity
            if (enhancedWeatherData.current.humidity > 85) {
                risks.push({
                    type: 'disease',
                    level: 'high',
                    description: 'High humidity increases disease risk',
                    mitigation: 'Ensure good drainage and air circulation'
                });
            }

            // Drought risk
            if (insights.weeklyTrend.rainfallTotal < crop.rainfall.critical / 4) {
                risks.push({
                    type: 'drought',
                    level: 'medium',
                    description: 'Low rainfall may cause water stress',
                    mitigation: 'Plan supplemental irrigation'
                });
            }
        }

        // Seasonal risks
        if (!crop.seasons.includes(this.currentSeason)) {
            risks.push({
                type: 'timing',
                level: 'high',
                description: 'Not the optimal season for this crop',
                mitigation: 'Consider waiting for appropriate season'
            });
        }

        return risks;
    }

    // Get crop management advice
    getCropManagementAdvice(crop, suitability, weatherData) {
        const advice = {
            irrigation: this.getIrrigationAdvice(crop, weatherData),
            fertilization: this.getFertilizationAdvice(crop, suitability),
            pestManagement: this.getPestManagementAdvice(crop),
            general: this.getGeneralManagementAdvice(crop, suitability)
        };

        return advice;
    }

    // Get irrigation advice
    getIrrigationAdvice(crop, weatherData) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        const advice = {
            en: {
                'very-high': 'Ensure continuous water supply. Monitor soil moisture daily.',
                'high': 'Maintain regular irrigation schedule. Check soil moisture frequently.',
                'medium': 'Moderate irrigation required. Water when soil surface feels dry.',
                'low': 'Minimal irrigation needed. Water only during dry spells.'
            },
            kn: {
                'very-high': 'ನಿರಂತರ ನೀರಿನ ಪೂರೈಕೆಯನ್ನು ಖಚಿತಪಡಿಸಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ದೈನಂದಿನ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
                'high': 'ನಿಯಮಿತ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿಯನ್ನು ನಿರ್ವಹಿಸಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಆಗಾಗ್ಗೆ ಪರಿಶೀಲಿಸಿ.',
                'medium': 'ಮಧ್ಯಮ ನೀರಾವರಿ ಅಗತ್ಯ. ಮಣ್ಣಿನ ಮೇಲ್ಮೈ ಒಣಗಿದಾಗ ನೀರು ಕೊಡಿ.',
                'low': 'ಕನಿಷ್ಠ ನೀರಾವರಿ ಅಗತ್ಯ. ಒಣ ಅವಧಿಯಲ್ಲಿ ಮಾತ್ರ ನೀರು ಕೊಡಿ.'
            }
        };

        return advice[currentLang][crop.waterRequirement] || advice[currentLang]['medium'];
    }

    // Get fertilization advice
    getFertilizationAdvice(crop, suitability) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        if (suitability.rating === 'excellent' || suitability.rating === 'good') {
            return currentLang === 'kn' ? 
                'ಸಂಪೂರ್ಣ NPK ಗೊಬ್ಬರವನ್ನು ಶಿಫಾರಸಿನ ಪ್ರಮಾಣದಲ್ಲಿ ಅನ್ವಯಿಸಿ.' :
                'Apply balanced NPK fertilizer as per recommended dose.';
        } else {
            return currentLang === 'kn' ? 
                'ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ನಂತರ ಗೊಬ್ಬರ ಪ್ರಮಾಣವನ್ನು ನಿರ್ಧರಿಸಿ.' :
                'Determine fertilizer dose after soil testing.';
        }
    }

    // Get pest management advice
    getPestManagementAdvice(crop) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        const commonPests = crop.pests.slice(0, 2).join(', ');
        
        return currentLang === 'kn' ? 
            `${commonPests} ನಂತಹ ಕೀಟಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.` :
            `Monitor regularly for pests like ${commonPests}.`;
    }

    // Get general management advice
    getGeneralManagementAdvice(crop, suitability) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        if (suitability.rating === 'excellent') {
            return currentLang === 'kn' ? 
                'ಅತ್ಯುತ್ತಮ ಪರಿಸ್ಥಿತಿಗಳು. ಗುಣಮಟ್ಟದ ಬೀಜಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಶಿಫಾರಸಿನ ಅಂತರದಲ್ಲಿ ಬಿತ್ತಿ.' :
                'Excellent conditions. Use quality seeds and follow recommended spacing.';
        } else if (suitability.rating === 'good') {
            return currentLang === 'kn' ? 
                'ಒಳ್ಳೆಯ ಪರಿಸ್ಥಿತಿಗಳು. ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ಸೂಕ್ತ ಆರೈಕೆ ತೆಗೆದುಕೊಳ್ಳಿ.' :
                'Good conditions. Monitor regularly and provide appropriate care.';
        } else {
            return currentLang === 'kn' ? 
                'ಸವಾಲಿನ ಪರಿಸ್ಥಿತಿಗಳು. ಇತರ ಬೆಳೆ ಆಯ್ಕೆಗಳನ್ನು ಪರಿಗಣಿಸಿ.' :
                'Challenging conditions. Consider alternative crop options.';
        }
    }

    // Generate seasonal analysis
    generateSeasonalAnalysis(recommendations) {
        const seasonal = {
            currentSeason: {
                suitable: recommendations.filter(r => r.suitability.rating === 'excellent' || r.suitability.rating === 'good'),
                marginal: recommendations.filter(r => r.suitability.rating === 'fair'),
                unsuitable: recommendations.filter(r => r.suitability.rating === 'poor')
            },
            bestCrops: recommendations.slice(0, 3),
            diversificationAdvice: this.generateDiversificationAdvice(recommendations)
        };

        return seasonal;
    }

    // Generate crop diversification advice
    generateDiversificationAdvice(recommendations) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';
        
        const suitableCrops = recommendations.filter(r => 
            r.suitability.rating === 'excellent' || r.suitability.rating === 'good'
        );

        if (suitableCrops.length >= 3) {
            return currentLang === 'kn' ? 
                'ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಬಹು ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯುವುದನ್ನು ಪರಿಗಣಿಸಿ.' :
                'Consider growing multiple crops to reduce risk.';
        } else {
            return currentLang === 'kn' ? 
                'ಸೀಮಿತ ಆಯ್ಕೆಗಳು. ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸುಧಾರಣೆಯ ಮೇಲೆ ಗಮನ ಹರಿಸಿ.' :
                'Limited options. Focus on soil health improvement.';
        }
    }

    // Display enhanced crop suitability analysis
    displayCropSuitabilityAnalysis(analysisData) {
        if (!analysisData) return;

        const container = document.getElementById('crop-recommendations');
        if (!container) return;

        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';

        // Clear existing content
        container.innerHTML = '';

        // Add analysis header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'crop-analysis-header';
        headerDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); padding: 1rem; border-radius: 8px; color: white; margin-bottom: 1rem;">
                <h3 style="margin: 0; margin-bottom: 0.5rem;">
                    ${currentLang === 'kn' ? 'ಬೆಳೆ ಸೂಕ್ತತೆ ವಿಶ್ಲೇ��ಣೆ' : 'Crop Suitability Analysis'}
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem; font-size: 0.9em;">
                    <div><i class="fas fa-calendar"></i> ${currentLang === 'kn' ? 'ಋತು' : 'Season'}: ${analysisData.currentSeason}</div>
                    <div><i class="fas fa-star"></i> ${currentLang === 'kn' ? 'ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆಗಳು' : 'Top Options'}: ${analysisData.seasonalAnalysis.currentSeason.suitable.length}</div>
                </div>
            </div>
        `;
        container.appendChild(headerDiv);

        // Display top recommendations
        const topCrops = analysisData.recommendations.slice(0, 5);
        topCrops.forEach((recommendation, index) => {
            const cropCard = this.createEnhancedCropCard(recommendation, index + 1);
            container.appendChild(cropCard);
        });

        container.classList.remove('hidden');
    }

    // Create enhanced crop recommendation card
    createEnhancedCropCard(recommendation, rank) {
        const currentLang = window.LanguageModule ? window.LanguageModule.getCurrentLanguage() : 'en';
        const crop = recommendation.crop;
        const suitability = recommendation.suitability;

        const cardDiv = document.createElement('div');
        cardDiv.className = `crop-card enhanced-crop-card ${suitability.rating}`;
        
        const ratingColor = {
            excellent: '#4caf50',
            good: '#8bc34a',
            fair: '#ffc107',
            poor: '#f44336'
        };

        const ratingIcon = {
            excellent: 'fa-star',
            good: 'fa-thumbs-up',
            fair: 'fa-exclamation-triangle',
            poor: 'fa-times-circle'
        };

        cardDiv.innerHTML = `
            <div class="crop-header">
                <div class="crop-rank">#${rank}</div>
                <div class="crop-info">
                    <h3>${crop.name[currentLang]}</h3>
                    <div class="crop-season">${crop.seasons.join(', ')} season</div>
                </div>
                <div class="suitability-score" style="background-color: ${ratingColor[suitability.rating]};">
                    <i class="fas ${ratingIcon[suitability.rating]}"></i>
                    <span>${Math.round(suitability.totalScore)}%</span>
                </div>
            </div>
            
            <div class="crop-details">
                <div class="recommendation-text">
                    ${recommendation.recommendation}
                </div>
                
                <div class="crop-factors">
                    <div class="factor">
                        <span class="factor-label">
                            ${currentLang === 'kn' ? 'ಋತು' : 'Season'}
                        </span>
                        <div class="factor-score">
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${suitability.factors.season?.score || 0}%"></div>
                            </div>
                            <span>${suitability.factors.season?.score || 0}%</span>
                        </div>
                    </div>
                    
                    ${suitability.factors.soil ? `
                        <div class="factor">
                            <span class="factor-label">
                                ${currentLang === 'kn' ? 'ಮಣ್ಣು' : 'Soil'}
                            </span>
                            <div class="factor-score">
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${suitability.factors.soil.score}%"></div>
                                </div>
                                <span>${suitability.factors.soil.score}%</span>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${suitability.factors.weather ? `
                        <div class="factor">
                            <span class="factor-label">
                                ${currentLang === 'kn' ? 'ಹವಾಮಾನ' : 'Weather'}
                            </span>
                            <div class="factor-score">
                                <div class="score-bar">
                                    <div class="score-fill" style="width: ${suitability.factors.weather.score}%"></div>
                                </div>
                                <span>${suitability.factors.weather.score}%</span>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="factor">
                        <span class="factor-label">
                            ${currentLang === 'kn' ? 'ಸಮಯ' : 'Timing'}
                        </span>
                        <div class="factor-score">
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${suitability.factors.timing.score}%"></div>
                            </div>
                            <span>${suitability.factors.timing.score}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="crop-timing">
                    <div class="timing-info">
                        <i class="fas fa-seedling"></i>
                        <span>
                            ${currentLang === 'kn' ? 'ಬಿತ್ತನೆ' : 'Planting'}: 
                            ${recommendation.timing.planting.join(', ')}
                        </span>
                    </div>
                    <div class="timing-info">
                        <i class="fas fa-harvest"></i>
                        <span>
                            ${currentLang === 'kn' ? 'ಕೊಯ್ಲು' : 'Harvest'}: 
                            ${recommendation.timing.harvest.join(', ')}
                        </span>
                    </div>
                </div>
                
                ${recommendation.risks.length > 0 ? `
                    <div class="crop-risks">
                        <h4 style="margin-bottom: 0.5rem; color: #f57c00;">
                            <i class="fas fa-exclamation-triangle"></i>
                            ${currentLang === 'kn' ? 'ಅಪಾಯಗಳು' : 'Risks'}
                        </h4>
                        ${recommendation.risks.map(risk => `
                            <div class="risk-item">
                                <span class="risk-level ${risk.level}">${risk.level}</span>
                                <span>${risk.description}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="management-advice">
                    <h4 style="margin-bottom: 0.5rem; color: #2e7d32;">
                        <i class="fas fa-lightbulb"></i>
                        ${currentLang === 'kn' ? 'ನಿರ್ವಹಣಾ ಸಲಹೆ' : 'Management Advice'}
                    </h4>
                    <p style="font-size: 0.9em; line-height: 1.4;">
                        ${recommendation.management.general}
                    </p>
                </div>
            </div>
        `;

        return cardDiv;
    }
}

// Initialize enhanced crop suitability analyzer
window.CropSuitabilityAnalyzer = new CropSuitabilityAnalyzer();

// Integration with existing crop module
if (window.CropModule) {
    // Extend the existing crop recommendation function
    const originalLoadCropRecommendations = window.CropModule.loadCropRecommendations;
    
    // Preserve original signature from `crops.js`: (location, season, soilData)
    window.CropModule.loadCropRecommendations = async function(location, season, soilData) {
        try {
            // Load enhanced analysis
            const analysis = await window.CropSuitabilityAnalyzer.analyzeCropSuitability(
                location, 
                soilData, 
                null
            );
            
            if (analysis) {
                window.CropSuitabilityAnalyzer.displayCropSuitabilityAnalysis(analysis);
            } else {
                // Fallback to original function
                if (originalLoadCropRecommendations) {
                    await originalLoadCropRecommendations.call(this, location, season, soilData);
                }
            }
        } catch (error) {
            console.error('Enhanced crop analysis error:', error);
            // Fallback to original function
            if (originalLoadCropRecommendations) {
                await originalLoadCropRecommendations.call(this, location, season, soilData);
            }
        }
    };
}
