// Crop Recommendation Module for Smart Farming Assistant
// Karnataka-specific crop recommendations based on soil, weather, and season

class CropModule {
    constructor() {
        // Karnataka crop database with seasonal and soil suitability
        this.cropDatabase = {
            // Cereal crops
            'rice': {
                name: { en: 'Rice', kn: 'ಅಕ್ಕಿ' },
                icon: 'fa-seedling',
                seasons: ['kharif', 'rabi'],
                soilSuitability: {
                    'alluvial': 'highly-suitable',
                    'black': 'moderately-suitable',
                    'red': 'least-suitable',
                    'laterite': 'moderately-suitable'
                },
                waterRequirement: 'high',
                growthPeriod: '120-150 days',
                yield: '3-5 tons/hectare',
                marketPrice: '20-25 ₹/kg',
                investment: '35,000-45,000 ₹/hectare',
                tips: {
                    en: [
                        'Requires consistent water supply',
                        'Plant during optimal rainfall period',
                        'Use disease-resistant varieties',
                        'Maintain proper spacing for better yield'
                    ],
                    kn: [
                        'ನಿರಂತರ ನೀರಿನ ಪೂರೈಕೆ ಅಗತ್ಯ',
                        'ಸೂಕ್ತ ಮಳೆಯ ಅವಧಿಯಲ್ಲಿ ನಟುವಿರಿ',
                        'ರೋಗ ಪ್ರತಿರೋಧಿ ಪ್ರಭೇದಗಳನ್ನು ಬಳಸಿ',
                        'ಉತ್ತಮ ಇಳುವರಿಗಾಗಿ ಸರಿಯಾದ ಅಂತರ ಇರಿಸಿ'
                    ]
                }
            },
            'wheat': {
                name: { en: 'Wheat', kn: 'ಗೋಧಿ' },
                icon: 'fa-wheat-awn',
                seasons: ['rabi'],
                soilSuitability: {
                    'black': 'highly-suitable',
                    'alluvial': 'highly-suitable',
                    'red': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'medium',
                growthPeriod: '110-130 days',
                yield: '2.5-4 tons/hectare',
                marketPrice: '22-28 ₹/kg',
                investment: '25,000-35,000 ₹/hectare',
                tips: {
                    en: [
                        'Sow after monsoon ends',
                        'Requires cool weather during growth',
                        'Apply nitrogen in split doses',
                        'Harvest when grains are fully mature'
                    ],
                    kn: [
                        'ಮಾನ್‌ಸೂನ್ ಮುಗಿದ ನಂತರ ಬಿತ್ತಿರಿ',
                        'ಬೆಳವಣಿಗೆಯ ಸಮಯದಲ್ಲಿ ತಂಪಾದ ಹವಾಮಾನ ಅಗತ್ಯ',
                        'ಸಾರಜನಕವನ್ನು ಭಾಗಗಳಾಗಿ ಹಾಕಿ',
                        'ಧಾನ್ಯಗಳು ಪೂರ್ಣವಾಗಿ ಮಾಗಿದಾಗ ಕೊಯ್ಯಿರಿ'
                    ]
                }
            },
            'maize': {
                name: { en: 'Maize', kn: 'ಮಕ್ಕಜೋಳ' },
                icon: 'fa-seedling',
                seasons: ['kharif', 'rabi', 'zaid'],
                soilSuitability: {
                    'alluvial': 'highly-suitable',
                    'red': 'moderately-suitable',
                    'black': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'medium',
                growthPeriod: '90-120 days',
                yield: '4-6 tons/hectare',
                marketPrice: '18-22 ₹/kg',
                investment: '30,000-40,000 ₹/hectare',
                tips: {
                    en: [
                        'Adaptable to various seasons',
                        'Requires good drainage',
                        'Intercrop with legumes for better nutrition',
                        'Protect from pest attacks'
                    ],
                    kn: [
                        'ವಿವಿಧ ಋತುಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ',
                        'ಉತ್ತಮ ಒಳಚರಂಡಿ ಅಗತ್ಯ',
                        'ಉತ್ತಮ ಪೋಷಣೆಗಾಗಿ ದಾಲ್‌ಗಳೊಂದಿಗೆ ಅಂತರ್‌ಬೆಳೆ ಮಾಡಿ',
                        'ಕೀಟ ಆಕ್ರಮಣದಿಂದ ರಕ್ಷಿಸಿ'
                    ]
                }
            },
            'jowar': {
                name: { en: 'Jowar (Sorghum)', kn: 'ಜೋಳ' },
                icon: 'fa-wheat-awn',
                seasons: ['kharif', 'rabi'],
                soilSuitability: {
                    'black': 'highly-suitable',
                    'red': 'moderately-suitable',
                    'alluvial': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'low',
                growthPeriod: '100-120 days',
                yield: '1.5-3 tons/hectare',
                marketPrice: '25-30 ₹/kg',
                investment: '20,000-30,000 ₹/hectare',
                tips: {
                    en: [
                        'Drought-tolerant crop',
                        'Suitable for rainfed conditions',
                        'Good for black cotton soil',
                        'Can be used as fodder crop'
                    ],
                    kn: [
                        'ಬರ ಸಹನೀಯ ಬೆಳೆ',
                        'ಮಳೆನೀರ ಕೃಷಿಗೆ ಸೂಕ್ತ',
                        'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣಿಗೆ ಉತ್ತಮ',
                        'ಮೇವಿನ ಬೆಳೆಯಾಗಿ ಬಳಸಬಹುದು'
                    ]
                }
            },

            // Cash crops
            'cotton': {
                name: { en: 'Cotton', kn: 'ಹತ್ತಿ' },
                icon: 'fa-cotton-bureau',
                seasons: ['kharif'],
                soilSuitability: {
                    'black': 'highly-suitable',
                    'alluvial': 'moderately-suitable',
                    'red': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'medium',
                growthPeriod: '160-200 days',
                yield: '1.5-2.5 tons/hectare',
                marketPrice: '55-70 ₹/kg',
                investment: '60,000-80,000 ₹/hectare',
                tips: {
                    en: [
                        'Requires deep black soil',
                        'Monitor for bollworm attacks',
                        'Maintain proper plant population',
                        'Harvest in multiple pickings'
                    ],
                    kn: [
                        'ಆಳವಾದ ಕಪ್ಪು ಮಣ್ಣಿನ ಅಗತ್ಯ',
                        'ಬೋಲ್‌ವರ್ಮ್ ಆಕ್ರಮಣವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
                        'ಸರಿಯಾದ ಸಸ್ಯ ಜನಸಂಖ್ಯೆ ನಿರ್ವಹಿಸಿ',
                        'ಅನೇಕ ಬಾರಿ ಕೊಯ್ಯಿರಿ'
                    ]
                }
            },
            'sugarcane': {
                name: { en: 'Sugarcane', kn: 'ಕಬ್ಬು' },
                icon: 'fa-seedling',
                seasons: ['kharif', 'zaid'],
                soilSuitability: {
                    'alluvial': 'highly-suitable',
                    'black': 'moderately-suitable',
                    'red': 'least-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'high',
                growthPeriod: '300-365 days',
                yield: '70-100 tons/hectare',
                marketPrice: '2800-3200 ₹/ton',
                investment: '80,000-120,000 ₹/hectare',
                tips: {
                    en: [
                        'Requires abundant water supply',
                        'Plant quality seed cane',
                        'Apply organic manure regularly',
                        'Harvest at optimal maturity'
                    ],
                    kn: [
                        'ಸಾಕಷ್ಟು ನೀರಿನ ಪೂರೈಕೆ ಅಗತ್ಯ',
                        'ಗುಣಮಟ್ಟದ ಬೀಜ ಕಬ್ಬನ್ನು ನಟುವಿರಿ',
                        'ನಿಯಮಿತವಾಗಿ ಸಾವಯವ ಗೊಬ್ಬರ ಹಾಕಿ',
                        'ಸೂಕ್ತ ಮಾಗಿದಾಗ ಕೊಯ್ಯಿರಿ'
                    ]
                }
            },

            // Oilseed crops
            'groundnut': {
                name: { en: 'Groundnut', kn: 'ಕಡಲೆಕಾಯಿ' },
                icon: 'fa-seedling',
                seasons: ['kharif', 'rabi'],
                soilSuitability: {
                    'red': 'highly-suitable',
                    'alluvial': 'moderately-suitable',
                    'black': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'low',
                growthPeriod: '100-120 days',
                yield: '1.5-2.5 tons/hectare',
                marketPrice: '50-65 ₹/kg',
                investment: '35,000-45,000 ₹/hectare',
                tips: {
                    en: [
                        'Suitable for light soils',
                        'Fixes nitrogen in soil',
                        'Requires calcium for pod development',
                        'Harvest when leaves turn yellow'
                    ],
                    kn: [
                        'ಹಗುರ ಮಣ್ಣಿಗೆ ಸೂಕ್ತ',
                        'ಮಣ್ಣಿನಲ್ಲಿ ಸಾರಜನಕವನ್ನು ಸ್ಥಿರಗೊಳಿಸುತ್ತದೆ',
                        'ಕಾಯಿ ಅಭಿವೃದ್ಧಿಗೆ ಕ್ಯಾಲ್ಸಿಯಂ ಅಗತ್ಯ',
                        'ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ ಕೊಯ್ಯಿರಿ'
                    ]
                }
            },
            'sunflower': {
                name: { en: 'Sunflower', kn: 'ಸೂರ್ಯಕಾಂತಿ' },
                icon: 'fa-sun',
                seasons: ['kharif', 'rabi'],
                soilSuitability: {
                    'black': 'highly-suitable',
                    'red': 'highly-suitable',
                    'alluvial': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'medium',
                growthPeriod: '90-110 days',
                yield: '1-2 tons/hectare',
                marketPrice: '55-70 ₹/kg',
                investment: '25,000-35,000 ₹/hectare',
                tips: {
                    en: [
                        'Requires well-drained soil',
                        'Plant in rows facing east-west',
                        'Monitor for head rot disease',
                        'Harvest when back of head turns brown'
                    ],
                    kn: [
                        'ಉತ್ತಮ ಒಳಚರಂಡಿ ಮಣ್ಣಿನ ಅಗತ್ಯ',
                        'ಪೂರ್ವ-ಪಶ್ಚಿಮ ಮುಖವಾಗಿ ಸಾಲುಗಳಲ್ಲಿ ನಟುವಿರಿ',
                        'ತಲೆ ಕೊಳೆತ ರೋಗವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
                        'ತಲೆಯ ಹಿಂಭಾಗ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ ಕೊಯ್ಯಿರಿ'
                    ]
                }
            },

            // Plantation crops
            'cashew': {
                name: { en: 'Cashew', kn: 'ಗೋಡಂಬಿ' },
                icon: 'fa-tree',
                seasons: ['kharif'],
                soilSuitability: {
                    'laterite': 'highly-suitable',
                    'red': 'moderately-suitable',
                    'alluvial': 'least-suitable',
                    'black': 'least-suitable'
                },
                waterRequirement: 'medium',
                growthPeriod: '3-5 years to bearing',
                yield: '8-12 kg/tree/year',
                marketPrice: '700-900 ₹/kg',
                investment: '150,000-200,000 ₹/hectare',
                tips: {
                    en: [
                        'Suitable for coastal regions',
                        'Plant during monsoon season',
                        'Requires good drainage',
                        'Regular pruning improves yield'
                    ],
                    kn: [
                        'ಕರಾವಳಿ ಪ್ರದೇಶಗಳಿಗೆ ಸೂಕ್ತ',
                        'ಮಾನ್‌ಸೂನ್ ಋತುವಿನಲ್ಲಿ ನಟುವಿರಿ',
                        'ಉತ್ತಮ ಒಳಚರಂಡಿ ಅಗತ್ಯ',
                        'ನಿಯಮಿತ ಕೊಂಬೆ ಕತ್ತರಿಸುವಿಕೆ ಇಳುವರಿ ಸುಧಾರಿಸುತ್ತದೆ'
                    ]
                }
            },
            'coconut': {
                name: { en: 'Coconut', kn: 'ತೆಂಗು' },
                icon: 'fa-tree',
                seasons: ['kharif', 'rabi'],
                soilSuitability: {
                    'laterite': 'highly-suitable',
                    'alluvial': 'highly-suitable',
                    'red': 'moderately-suitable',
                    'black': 'least-suitable'
                },
                waterRequirement: 'high',
                growthPeriod: '5-6 years to bearing',
                yield: '80-120 nuts/tree/year',
                marketPrice: '15-25 ₹/nut',
                investment: '120,000-180,000 ₹/hectare',
                tips: {
                    en: [
                        'Requires consistent water supply',
                        'Plant healthy seedlings',
                        'Apply organic manure regularly',
                        'Control rhinoceros beetle'
                    ],
                    kn: [
                        'ನಿರಂತರ ನೀರಿನ ಪೂರೈಕೆ ಅಗತ್ಯ',
                        'ಆರೋಗ್ಯಕರ ಮೊಳಕೆಗಳನ್ನು ನಟುವಿರಿ',
                        'ನಿಯಮಿತವಾಗಿ ಸಾವಯವ ಗೊಬ್ಬರ ಹಾಕಿ',
                        'ಖಡ್ಗಮೃಗ ಜೀರುಂಡೆ ನಿಯಂತ್ರಿಸಿ'
                    ]
                }
            },

            // Vegetables
            'tomato': {
                name: { en: 'Tomato', kn: 'ಟೊಮೇಟೊ' },
                icon: 'fa-apple-alt',
                seasons: ['rabi', 'zaid'],
                soilSuitability: {
                    'alluvial': 'highly-suitable',
                    'red': 'moderately-suitable',
                    'black': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'medium',
                growthPeriod: '70-100 days',
                yield: '25-40 tons/hectare',
                marketPrice: '15-25 ₹/kg',
                investment: '80,000-120,000 ₹/hectare',
                tips: {
                    en: [
                        'Requires well-drained fertile soil',
                        'Provide support for climbing varieties',
                        'Regular watering and mulching',
                        'Control blight diseases'
                    ],
                    kn: [
                        'ಉತ್ತಮ ಒಳಚರಂಡಿ ಫಲವತ್ತು ಮಣ್ಣಿನ ಅಗತ್ಯ',
                        'ಏರುವ ಪ್ರಭೇದಗಳಿಗೆ ಆಧಾರ ಕೊಡಿ',
                        'ನಿಯಮಿತ ನೀರಾಡಿಸುವಿಕೆ ಮತ್ತು ಮಲ್ಚಿಂಗ್',
                        'ಬ್ಲೈಟ್ ರೋಗಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ'
                    ]
                }
            },

            // Pulses
            'pigeon-pea': {
                name: { en: 'Pigeon Pea (Tur)', kn: 'ತೊಗರಿ ಬೇಳೆ' },
                icon: 'fa-seedling',
                seasons: ['kharif'],
                soilSuitability: {
                    'red': 'highly-suitable',
                    'black': 'moderately-suitable',
                    'alluvial': 'moderately-suitable',
                    'laterite': 'least-suitable'
                },
                waterRequirement: 'low',
                growthPeriod: '150-200 days',
                yield: '1-1.5 tons/hectare',
                marketPrice: '80-120 ₹/kg',
                investment: '25,000-35,000 ₹/hectare',
                tips: {
                    en: [
                        'Drought-tolerant legume crop',
                        'Improves soil fertility',
                        'Can be intercropped with cereals',
                        'Harvest when pods are dry'
                    ],
                    kn: [
                        'ಬರ ಸಹನೀಯ ದಾಲ್ ಬೆಳೆ',
                        'ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಸುಧಾರಿಸುತ್ತದೆ',
                        'ಧಾನ್ಯಗಳೊಂದಿಗೆ ಅಂತರ್‌ಬೆಳೆ ಮಾಡಬಹುದು',
                        'ಕಾಯಿಗಳು ಒಣಗಿದಾಗ ಕೊಯ್ಯಿರಿ'
                    ]
                }
            }
        };

        // Seasonal crop calendar for Karnataka
        this.seasonalCalendar = {
            'kharif': {
                plantingPeriod: 'June-July',
                harvestPeriod: 'October-December',
                suitableCrops: ['rice', 'maize', 'cotton', 'sugarcane', 'groundnut', 'sunflower', 'jowar', 'pigeon-pea', 'cashew'],
                weatherRequirements: 'Monsoon rains essential'
            },
            'rabi': {
                plantingPeriod: 'November-December',
                harvestPeriod: 'March-April',
                suitableCrops: ['wheat', 'maize', 'groundnut', 'sunflower', 'jowar', 'tomato', 'coconut'],
                weatherRequirements: 'Cool and dry weather'
            },
            'zaid': {
                plantingPeriod: 'March-April',
                harvestPeriod: 'June-July',
                suitableCrops: ['maize', 'sugarcane', 'tomato'],
                weatherRequirements: 'Irrigation required'
            }
        };
    }

    async loadCropRecommendations(location, season, soilData) {
        try {
            // Get crop recommendations based on location, season, and soil
            const recommendations = this.generateCropRecommendations(location, season, soilData);
            
            // Display crop recommendations
            this.displayCropRecommendations(recommendations, season);
            
            // Cache crop data
            this.cacheCropData({ recommendations, season, location: location.name });

        } catch (error) {
            console.error('Error loading crop recommendations:', error);
            this.displayDemoCropRecommendations(season);
        }
    }

    generateCropRecommendations(location, season, soilData) {
        const recommendations = [];
        const seasonalCrops = this.seasonalCalendar[season]?.suitableCrops || [];
        const soilType = soilData?.type || 'red';

        // Get soil suitability rankings
        const soilSuitability = window.SoilModule ? 
            window.SoilModule.getCropSuitabilityForSoil(soilType) : 
            { 'highly-suitable': [], 'moderately-suitable': [], 'least-suitable': [] };

        // Score and rank crops
        const cropScores = {};

        seasonalCrops.forEach(cropId => {
            const crop = this.cropDatabase[cropId];
            if (!crop) return;

            let score = 0;
            
            // Base score for being in season
            score += 10;
            
            // Soil suitability score
            const cropSoilSuitability = crop.soilSuitability[soilType];
            if (cropSoilSuitability === 'highly-suitable') score += 20;
            else if (cropSoilSuitability === 'moderately-suitable') score += 10;
            else score += 0; // least-suitable gets no bonus

            // Water requirement vs moisture availability
            if (soilData?.moisture === 'high' && crop.waterRequirement === 'high') score += 5;
            if (soilData?.moisture === 'medium' && crop.waterRequirement === 'medium') score += 5;
            if (soilData?.moisture === 'low' && crop.waterRequirement === 'low') score += 5;

            // Market value bonus for high-value crops
            const marketPrice = parseFloat(crop.marketPrice.split('-')[1]);
            if (marketPrice > 50) score += 5;

            cropScores[cropId] = score;
        });

        // Sort crops by score and take top recommendations
        const sortedCrops = Object.entries(cropScores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6); // Top 6 recommendations

        // Build recommendation objects
        sortedCrops.forEach(([cropId, score]) => {
            const crop = this.cropDatabase[cropId];
            if (crop) {
                recommendations.push({
                    id: cropId,
                    ...crop,
                    suitabilityScore: score,
                    soilSuitability: crop.soilSuitability[soilType]
                });
            }
        });

        return recommendations;
    }

    displayCropRecommendations(recommendations, season) {
        const container = document.getElementById('crop-recommendations');
        container.innerHTML = '';

        const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';

        if (recommendations.length === 0) {
            container.innerHTML = `<p>No crop recommendations available for this season.</p>`;
            return;
        }

        recommendations.forEach(crop => {
            const cropCard = this.createCropCard(crop, currentLang);
            container.appendChild(cropCard);
        });

        // Show recommendations section
        container.classList.remove('hidden');
        container.classList.add('fade-in');

        // Add seasonal information
        this.addSeasonalInfo(container, season, currentLang);
    }

    createCropCard(crop, lang) {
        const card = document.createElement('div');
        card.className = 'crop-card';

        const suitabilityColor = this.getSuitabilityColor(crop.soilSuitability);
        const suitabilityText = this.getSuitabilityText(crop.soilSuitability, lang);

        card.innerHTML = `
            <div class="crop-header">
                <div class="crop-icon">
                    <i class="fas ${crop.icon}"></i>
                </div>
                <div class="crop-name">${crop.name[lang]}</div>
                <div class="crop-suitability" style="background-color: ${suitabilityColor}; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">
                    ${suitabilityText}
                </div>
            </div>
            <div class="crop-body">
                <div class="crop-details">
                    <div class="crop-detail">
                        <span class="crop-detail-label">${lang === 'kn' ? 'ಬೆಳವಣಿಗೆಯ ಅವಧಿ' : 'Growth Period'}</span>
                        <span class="crop-detail-value">${crop.growthPeriod}</span>
                    </div>
                    <div class="crop-detail">
                        <span class="crop-detail-label">${lang === 'kn' ? 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ' : 'Expected Yield'}</span>
                        <span class="crop-detail-value">${crop.yield}</span>
                    </div>
                    <div class="crop-detail">
                        <span class="crop-detail-label">${lang === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ' : 'Market Price'}</span>
                        <span class="crop-detail-value">${crop.marketPrice}</span>
                    </div>
                    <div class="crop-detail">
                        <span class="crop-detail-label">${lang === 'kn' ? 'ಹೂಡಿಕೆ' : 'Investment'}</span>
                        <span class="crop-detail-value">${crop.investment}</span>
                    </div>
                    <div class="crop-detail">
                        <span class="crop-detail-label">${lang === 'kn' ? 'ನೀರಿನ ಅಗತ್ಯ' : 'Water Need'}</span>
                        <span class="crop-detail-value">${this.getWaterRequirementText(crop.waterRequirement, lang)}</span>
                    </div>
                </div>
                <div class="crop-tips">
                    <h5>${lang === 'kn' ? 'ಬೆಳೆ ಸಲಹೆಗಳು' : 'Farming Tips'}</h5>
                    <ul>
                        ${crop.tips[lang].map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        return card;
    }

    getSuitabilityColor(suitability) {
        const colors = {
            'highly-suitable': '#4caf50',
            'moderately-suitable': '#ff9800',
            'least-suitable': '#f44336'
        };
        return colors[suitability] || '#9e9e9e';
    }

    getSuitabilityText(suitability, lang) {
        const texts = {
            'highly-suitable': { en: 'Highly Suitable', kn: 'ಹೆಚ್ಚು ಸೂಕ್ತ' },
            'moderately-suitable': { en: 'Moderately Suitable', kn: 'ಮಧ್ಯಮ ಸೂಕ್ತ' },
            'least-suitable': { en: 'Less Suitable', kn: 'ಕಡಿಮೆ ಸೂಕ್ತ' }
        };
        return texts[suitability]?.[lang] || 'Unknown';
    }

    getWaterRequirementText(requirement, lang) {
        const texts = {
            'low': { en: 'Low', kn: 'ಕಡಿಮೆ' },
            'medium': { en: 'Medium', kn: 'ಮಧ್ಯಮ' },
            'high': { en: 'High', kn: 'ಹೆಚ್ಚು' }
        };
        return texts[requirement]?.[lang] || requirement;
    }

    addSeasonalInfo(container, season, lang) {
        const seasonalInfo = this.seasonalCalendar[season];
        if (!seasonalInfo) return;

        const infoCard = document.createElement('div');
        infoCard.className = 'seasonal-info-card';
        infoCard.style.cssText = `
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            padding: 1.5rem;
            border-radius: 12px;
            margin-top: 1.5rem;
            border-left: 4px solid #2196f3;
        `;

        const seasonNames = {
            'kharif': { en: 'Kharif Season', kn: 'ಖರೀಫ್ ಋತು' },
            'rabi': { en: 'Rabi Season', kn: 'ರಬಿ ಋತು' },
            'zaid': { en: 'Zaid Season', kn: 'ಜಾಯೀದ್ ಋತು' }
        };

        infoCard.innerHTML = `
            <h4 style="color: #1565c0; margin-bottom: 1rem;">
                <i class="fas fa-calendar-alt"></i> ${seasonNames[season][lang]}
            </h4>
            <div style="display: grid; gap: 0.5rem;">
                <div>
                    <strong>${lang === 'kn' ? 'ಬಿತ್ತನೆ ಅವಧಿ:' : 'Planting Period:'}</strong> 
                    ${seasonalInfo.plantingPeriod}
                </div>
                <div>
                    <strong>${lang === 'kn' ? 'ಕೊಯ್ಲು ಅವಧಿ:' : 'Harvest Period:'}</strong> 
                    ${seasonalInfo.harvestPeriod}
                </div>
                <div>
                    <strong>${lang === 'kn' ? 'ಹವಾಮಾನ ಅವಶ್ಯಕತೆಗಳು:' : 'Weather Requirements:'}</strong> 
                    ${seasonalInfo.weatherRequirements}
                </div>
            </div>
        `;

        container.appendChild(infoCard);
    }

    displayDemoCropRecommendations(season) {
        // Display demo crop recommendations
        const demoCrops = [
            {
                id: 'rice',
                ...this.cropDatabase['rice'],
                suitabilityScore: 25,
                soilSuitability: 'highly-suitable'
            },
            {
                id: 'cotton',
                ...this.cropDatabase['cotton'],
                suitabilityScore: 20,
                soilSuitability: 'moderately-suitable'
            },
            {
                id: 'groundnut',
                ...this.cropDatabase['groundnut'],
                suitabilityScore: 18,
                soilSuitability: 'highly-suitable'
            }
        ];

        this.displayCropRecommendations(demoCrops, season);

        // Add demo notice
        const container = document.getElementById('crop-recommendations');
        const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';
        
        const demoNotice = document.createElement('div');
        demoNotice.className = 'alert alert-info';
        demoNotice.style.marginTop = '1rem';
        
        demoNotice.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <div>
                <strong>${currentLang === 'kn' ? 'ಡೆಮೊ ಮೋಡ್' : 'Demo Mode'}</strong>
                <p>${currentLang === 'kn' ? 
                    'ಮಾದರಿ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ. ನಿಖರ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ಸ್ಥಳ ಮತ್ತು ಮಣ್ಣಿನ ಮಾಹಿತಿ ಒದಗಿಸಿ.' :
                    'Showing sample crop recommendations. Provide location and soil information for accurate recommendations.'}</p>
            </div>
        `;
        
        container.appendChild(demoNotice);
    }

    displayCachedCrops(cachedData) {
        if (cachedData && cachedData.recommendations) {
            this.displayCropRecommendations(cachedData.recommendations, cachedData.season);

            // Add offline notice
            const container = document.getElementById('crop-recommendations');
            const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';
            
            const offlineNotice = document.createElement('div');
            offlineNotice.className = 'alert alert-info';
            offlineNotice.style.marginTop = '1rem';
            
            offlineNotice.innerHTML = `
                <i class="fas fa-wifi"></i>
                <div>
                    <strong>${currentLang === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್' : 'Offline Mode'}</strong>
                    <p>${currentLang === 'kn' ? 
                        'ಸಂಗ್ರಹಿತ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ. ಅಪ್‌ಡೇಟ್‌ಗಾಗಿ ಇಂಟರ್ನೆಟ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.' :
                        'Showing cached crop recommendations. Connect to internet for latest updates.'}</p>
                </div>
            `;
            
            container.appendChild(offlineNotice);
        }
    }

    cacheCropData(cropData) {
        localStorage.setItem('smartFarming_crops', JSON.stringify(cropData));
    }

    // Get crop database for external use
    getCropDatabase() {
        return this.cropDatabase;
    }

    // Get seasonal calendar
    getSeasonalCalendar() {
        return this.seasonalCalendar;
    }
}

// Initialize crop module
window.CropModule = new CropModule();
