// Soil Module for Smart Farming Assistant
// Karnataka Soil Classification and Analysis

class SoilModule {
    constructor() {
        // Karnataka soil type mapping based on districts
        this.soilMapping = {
            // Red soil regions
            'bangalore': { type: 'red', ph: 6.2, organic: 'medium', characteristics: ['well-drained', 'acidic', 'low-fertility'] },
            'tumkur': { type: 'red', ph: 6.0, organic: 'low', characteristics: ['well-drained', 'acidic', 'low-fertility'] },
            'kolar': { type: 'red', ph: 6.1, organic: 'medium', characteristics: ['well-drained', 'acidic', 'sandy'] },
            'chikkaballapur': { type: 'red', ph: 6.3, organic: 'medium', characteristics: ['well-drained', 'slightly-acidic'] },
            'chitradurga': { type: 'red', ph: 5.9, organic: 'low', characteristics: ['well-drained', 'acidic', 'rocky'] },
            'davanagere': { type: 'red', ph: 6.0, organic: 'low', characteristics: ['well-drained', 'acidic', 'low-fertility'] },
            'bellary': { type: 'red', ph: 6.2, organic: 'medium', characteristics: ['well-drained', 'slightly-acidic'] },

            // Black soil regions
            'vijayapura': { type: 'black', ph: 7.5, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'fertile'] },
            'belagavi': { type: 'black', ph: 7.8, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'water-retentive'] },
            'bagalkot': { type: 'black', ph: 7.6, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'fertile'] },
            'gadag': { type: 'black', ph: 7.4, organic: 'high', characteristics: ['clay-rich', 'slightly-alkaline', 'fertile'] },
            'dharwad': { type: 'black', ph: 7.3, organic: 'high', characteristics: ['clay-rich', 'slightly-alkaline', 'fertile'] },
            'haveri': { type: 'black', ph: 7.5, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'water-retentive'] },
            'koppal': { type: 'black', ph: 7.7, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'fertile'] },
            'raichur': { type: 'black', ph: 7.6, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'fertile'] },
            'kalaburagi': { type: 'black', ph: 7.8, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'water-retentive'] },
            'bidar': { type: 'black', ph: 7.4, organic: 'high', characteristics: ['clay-rich', 'slightly-alkaline', 'fertile'] },
            'yadgir': { type: 'black', ph: 7.5, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'fertile'] },

            // Laterite soil regions
            'uttara-kannada': { type: 'laterite', ph: 5.5, organic: 'low', characteristics: ['well-drained', 'acidic', 'iron-rich'] },
            'udupi': { type: 'laterite', ph: 5.8, organic: 'medium', characteristics: ['well-drained', 'acidic', 'iron-rich'] },
            'dakshina-kannada': { type: 'laterite', ph: 5.6, organic: 'medium', characteristics: ['well-drained', 'acidic', 'iron-rich'] },
            'kodagu': { type: 'laterite', ph: 5.9, organic: 'high', characteristics: ['well-drained', 'slightly-acidic', 'iron-rich'] },
            'chikkamagaluru': { type: 'laterite', ph: 5.7, organic: 'high', characteristics: ['well-drained', 'acidic', 'iron-rich'] },
            'shimoga': { type: 'laterite', ph: 5.8, organic: 'medium', characteristics: ['well-drained', 'acidic', 'iron-rich'] },

            // Alluvial soil regions
            'mandya': { type: 'alluvial', ph: 7.0, organic: 'high', characteristics: ['fertile', 'well-drained', 'river-deposited'] },
            'mysore': { type: 'alluvial', ph: 6.8, organic: 'high', characteristics: ['fertile', 'well-drained', 'nutrient-rich'] },
            'hassan': { type: 'alluvial', ph: 6.9, organic: 'high', characteristics: ['fertile', 'well-drained', 'nutrient-rich'] },
            'ramanagara': { type: 'alluvial', ph: 6.7, organic: 'medium', characteristics: ['fertile', 'well-drained', 'mixed-composition'] }
        };

        // Soil type descriptions
        this.soilDescriptions = {
            'red': {
                name: { en: 'Red Soil', kn: 'ಕೆಂಪು ಮಣ್ಣು' },
                description: { 
                    en: 'Rich in iron oxide, well-drained but low in fertility. Common in Karnataka plateau regions.',
                    kn: 'ಕಬ್ಬಿಣದ ಆಕ್ಸೈಡ್‌ನಿಂದ ಭರಪೂರ, ಚೆನ್ನಾಗಿ ನೀರಿನಿಂದ ಖಾಲಿಯಾದ ಆದರೆ ಫಲವತ್ತತೆ ಕಡಿಮೆ.'
                },
                icon: 'fa-mountain',
                color: '#d32f2f'
            },
            'black': {
                name: { en: 'Black Cotton Soil', kn: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು' },
                description: { 
                    en: 'Clay-rich, highly fertile soil ideal for cotton and cereals. Excellent water retention.',
                    kn: 'ಮಣ್ಣಿನಿಂದ ಭರಪೂರ, ಹೆಚ್ಚು ಫಲವತ್ತು ಮಣ್ಣು ಹತ್ತಿ ಮತ್ತು ಧಾನ್ಯಗಳಿಗೆ ಆದರ್ಶ.'
                },
                icon: 'fa-seedling',
                color: '#424242'
            },
            'laterite': {
                name: { en: 'Laterite Soil', kn: 'ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು' },
                description: { 
                    en: 'Iron and aluminum-rich soil found in high rainfall areas. Good for cashew and coconut.',
                    kn: 'ಕಬ್ಬಿಣ ಮತ್ತು ಅಲುಮಿನಿಯಂ ಭರಿತ ಮಣ್ಣು ಹೆಚ್ಚು ಮಳೆಯ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕಂಡುಬರುತ್ತದೆ.'
                },
                icon: 'fa-tree',
                color: '#ff8f00'
            },
            'alluvial': {
                name: { en: 'Alluvial Soil', kn: 'ಮೆಕ್ಕೆಜೋಳದ ಮಣ್ಣು' },
                description: { 
                    en: 'River-deposited fertile soil, rich in nutrients. Excellent for agriculture.',
                    kn: 'ನದಿ ಸಂಚಾರದಿಂದ ರೂಪಗೊಂಡ ಫಲವತ್ತು ಮಣ್ಣು, ಪೋಷಕಾಂಶಗಳಿಂದ ಭರಪೂರ.'
                },
                icon: 'fa-water',
                color: '#388e3c'
            }
        };

        // Crop suitability for different soil types
        this.cropSuitability = {
            'red': {
                'highly-suitable': ['finger-millet', 'groundnut', 'sunflower', 'castor', 'pulses'],
                'moderately-suitable': ['maize', 'cotton', 'jowar', 'bajra'],
                'least-suitable': ['rice', 'sugarcane', 'wheat']
            },
            'black': {
                'highly-suitable': ['cotton', 'wheat', 'jowar', 'safflower', 'sunflower'],
                'moderately-suitable': ['maize', 'sugarcane', 'pulses'],
                'least-suitable': ['rice', 'finger-millet', 'cashew']
            },
            'laterite': {
                'highly-suitable': ['cashew', 'coconut', 'pepper', 'cardamom', 'arecanut'],
                'moderately-suitable': ['rice', 'ginger', 'turmeric'],
                'least-suitable': ['cotton', 'wheat', 'jowar']
            },
            'alluvial': {
                'highly-suitable': ['rice', 'sugarcane', 'wheat', 'maize', 'vegetables'],
                'moderately-suitable': ['cotton', 'pulses', 'groundnut'],
                'least-suitable': ['cashew', 'pepper']
            }
        };
    }

    async loadSoilData(location) {
        try {
            // Get soil data based on location
            const soilData = this.getSoilDataForLocation(location);
            
            // Display soil information
            this.displaySoilAnalysis(soilData);
            
            // Generate recommendations
            this.generateSoilRecommendations(soilData);
            
            // Cache soil data
            this.cacheSoilData(soilData);
            
            // Store in global app for use by crop module
            if (window.smartFarmingApp) {
                window.smartFarmingApp.soilData = soilData;
            }

        } catch (error) {
            console.error('Error loading soil data:', error);
            this.displayDemoSoilData();
        }
    }

    getSoilDataForLocation(location) {
        // Determine soil type based on location
        let soilInfo = null;
        
        if (location.type === 'district' && this.soilMapping[location.name.toLowerCase()]) {
            soilInfo = this.soilMapping[location.name.toLowerCase()];
        } else if (location.type === 'district') {
            // Find by district name
            const districtKey = Object.keys(window.smartFarmingApp.karnatakaDistricts)
                .find(key => window.smartFarmingApp.karnatakaDistricts[key].name === location.name);
            soilInfo = this.soilMapping[districtKey];
        }

        // If no specific mapping found, use coordinates to estimate
        if (!soilInfo) {
            soilInfo = this.estimateSoilFromCoordinates(location.lat, location.lon);
        }

        // Add estimated moisture based on season and weather
        const moisture = this.estimateSoilMoisture();

        return {
            type: soilInfo.type,
            ph: soilInfo.ph,
            organic: soilInfo.organic,
            characteristics: soilInfo.characteristics,
            moisture: moisture,
            location: location
        };
    }

    estimateSoilFromCoordinates(lat, lon) {
        // Simple coordinate-based soil estimation for Karnataka
        // This is a simplified approach - in production, use proper soil databases
        
        if (lat > 16.5) {
            // Northern Karnataka - mostly black soil
            return { type: 'black', ph: 7.5, organic: 'high', characteristics: ['clay-rich', 'alkaline', 'fertile'] };
        } else if (lat < 13.0 && lon < 76.0) {
            // Western Ghats region - laterite soil
            return { type: 'laterite', ph: 5.8, organic: 'medium', characteristics: ['well-drained', 'acidic', 'iron-rich'] };
        } else if (lat < 13.5 && lon > 77.0) {
            // Eastern regions - red soil
            return { type: 'red', ph: 6.1, organic: 'medium', characteristics: ['well-drained', 'acidic', 'low-fertility'] };
        } else {
            // Central Karnataka - mixed, default to red soil
            return { type: 'red', ph: 6.2, organic: 'medium', characteristics: ['well-drained', 'slightly-acidic'] };
        }
    }

    estimateSoilMoisture() {
        const month = new Date().getMonth() + 1;
        
        if (month >= 6 && month <= 9) {
            return 'high'; // Monsoon season
        } else if (month >= 10 && month <= 2) {
            return 'medium'; // Post-monsoon
        } else {
            return 'low'; // Summer season
        }
    }

    displaySoilAnalysis(soilData) {
        const soilTypeElement = document.getElementById('soil-type');
        const soilPhElement = document.getElementById('soil-ph');
        const organicMatterElement = document.getElementById('organic-matter');
        const soilMoistureElement = document.getElementById('soil-moisture');

        // Get current language
        const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';
        
        // Update soil type display
        const soilTypeInfo = this.soilDescriptions[soilData.type];
        soilTypeElement.innerHTML = `
            <strong style="color: ${soilTypeInfo.color}">${soilTypeInfo.name[currentLang]}</strong><br>
            <small>${soilTypeInfo.description[currentLang]}</small>
        `;

        // Update soil properties
        soilPhElement.textContent = soilData.ph.toFixed(1);
        organicMatterElement.textContent = this.getOrganicMatterText(soilData.organic, currentLang);
        soilMoistureElement.textContent = this.getMoistureText(soilData.moisture, currentLang);

        // Update soil icon
        const soilIcon = document.querySelector('.soil-icon i');
        soilIcon.className = `fas ${soilTypeInfo.icon}`;

        // Show soil analysis section
        document.getElementById('soil-analysis').classList.remove('hidden');
        document.getElementById('soil-analysis').classList.add('fade-in');
    }

    getOrganicMatterText(level, lang) {
        const texts = {
            'low': { en: 'Low (< 1%)', kn: 'ಕಡಿಮೆ (< 1%)' },
            'medium': { en: 'Medium (1-3%)', kn: 'ಮಧ್ಯಮ (1-3%)' },
            'high': { en: 'High (> 3%)', kn: 'ಹೆಚ್ಚು (> 3%)' }
        };
        return texts[level][lang];
    }

    getMoistureText(level, lang) {
        const texts = {
            'low': { en: 'Low', kn: 'ಕಡಿಮೆ' },
            'medium': { en: 'Medium', kn: 'ಮಧ್ಯಮ' },
            'high': { en: 'High', kn: 'ಹೆಚ್ಚು' }
        };
        return texts[level][lang];
    }

    generateSoilRecommendations(soilData) {
        const recommendationsContainer = document.getElementById('soil-recommendations');
        recommendationsContainer.innerHTML = '';

        const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';

        // pH-based recommendations
        this.addpHRecommendations(recommendationsContainer, soilData.ph, currentLang);

        // Organic matter recommendations
        this.addOrganicMatterRecommendations(recommendationsContainer, soilData.organic, currentLang);

        // Moisture management recommendations
        this.addMoistureRecommendations(recommendationsContainer, soilData.moisture, soilData.type, currentLang);

        // Soil type specific recommendations
        this.addSoilTypeRecommendations(recommendationsContainer, soilData.type, currentLang);
    }

    addpHRecommendations(container, ph, lang) {
        let recommendation = '';
        let title = '';

        if (ph < 6.0) {
            title = lang === 'kn' ? 'ಆಮ್ಲೀಯ ಮಣ್ಣಿನ ನಿರ್ವಹಣೆ' : 'Acidic Soil Management';
            recommendation = lang === 'kn' ? 
                'ಸುಣ್ಣ ಅಥವಾ ಡೋಲೋಮೈಟ್ ಸೇರಿಸಿ pH ಹೆಚ್ಚಿಸಿ. ಸಾವಯವ ಪದಾರ್ಥಗಳನ್ನು ಹೆಚ್ಚಿಸಿ.' :
                'Add lime or dolomite to increase pH. Increase organic matter content through compost and green manure.';
        } else if (ph > 8.0) {
            title = lang === 'kn' ? 'ಕ್ಷಾರೀಯ ಮಣ್ಣಿನ ನಿರ್ವಹಣೆ' : 'Alkaline Soil Management';
            recommendation = lang === 'kn' ? 
                'ಗಂಧಕ ಅಥವಾ ಸಾವಯವ ಆಮ್ಲಗಳನ್ನು ಸೇರಿಸಿ pH ಕಡಿಮೆ ಮಾಡಿ. ನಿಯಮಿತ ಜಲಾಭಿಸಿಂಚನೆ ಮಾಡಿ.' :
                'Add sulfur or organic acids to lower pH. Ensure proper drainage and regular irrigation to leach excess salts.';
        } else {
            title = lang === 'kn' ? 'ಸೂಕ್ತ pH ಮಟ್ಟ' : 'Optimal pH Level';
            recommendation = lang === 'kn' ? 
                'ನಿಮ್ಮ ಮಣ್ಣಿನ pH ಮಟ್ಟ ಸೂಕ್ತವಾಗಿದೆ. ಸಾವಯವ ಪದಾರ್ಥಗಳಿಂದ ನಿರ್ವಹಿಸಿ.' :
                'Your soil pH is optimal for most crops. Maintain with regular organic matter additions.';
        }

        this.addRecommendationCard(container, title, recommendation);
    }

    addOrganicMatterRecommendations(container, organicLevel, lang) {
        let title = '';
        let recommendation = '';

        if (organicLevel === 'low') {
            title = lang === 'kn' ? 'ಸಾವಯವ ಪದಾರ್ಥ ಹೆಚ್ಚಿಸಿ' : 'Increase Organic Matter';
            recommendation = lang === 'kn' ? 
                'ಕಂಪೋಸ್ಟ್, ಹಸಿರು ಗೊಬ್ಬರ, ಕೃಷಿ ತ್ಯಾಜ್ಯಗಳನ್ನು ಬಳಸಿ. ಫಸಲ್ ತಿರುಗುವಿಕೆ ಅಳವಡಿಸಿ.' :
                'Add compost, green manure, and crop residues. Practice crop rotation with legumes to improve soil organic matter.';
        } else if (organicLevel === 'high') {
            title = lang === 'kn' ? 'ಉತ್ತಮ ಸಾವಯವ ಪದಾರ್ಥ' : 'Excellent Organic Matter';
            recommendation = lang === 'kn' ? 
                'ಪ್ರಸ್ತುತ ಮಟ್ಟವನ್ನು ನಿರ್ವಹಿಸಿ. ಮಣ್ಣಿನ ಜೈವಿಕ ಚಟುವಟಿಕೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ.' :
                'Maintain current levels through continued organic practices. Encourage soil biological activity.';
        } else {
            title = lang === 'kn' ? 'ಸಾವಯವ ಪದಾರ್ಥ ನಿರ್ವಹಣೆ' : 'Organic Matter Management';
            recommendation = lang === 'kn' ? 
                'ನಿಯಮಿತವಾಗಿ ಕಂಪೋಸ್ಟ್ ಸೇರಿಸಿ. ಮಣ್ಣಿನ ಸ್ವಾಸ್ಥ್ಯವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.' :
                'Regularly add compost and maintain soil cover. Monitor soil health through regular testing.';
        }

        this.addRecommendationCard(container, title, recommendation);
    }

    addMoistureRecommendations(container, moisture, soilType, lang) {
        let title = '';
        let recommendation = '';

        if (moisture === 'low') {
            title = lang === 'kn' ? 'ತೇವಾಂಶ ನಿರ್ವಹಣೆ' : 'Moisture Management';
            recommendation = lang === 'kn' ? 
                'ಡ್ರಿಪ್ ಇರಿಗೇಷನ್ ಬಳಸಿ. ಮಲ್ಚಿಂಗ್ ಮಾಡಿ ನೀರಿನ ಆವಿಯಾಗುವಿಕೆ ಕಡಿಮೆ ಮಾಡಿ.' :
                'Use drip irrigation for efficient water use. Apply mulching to reduce evaporation and conserve soil moisture.';
        } else if (moisture === 'high' && soilType === 'black') {
            title = lang === 'kn' ? 'ಒಳಚರಂಡಿ ನಿರ್ವಹಣೆ' : 'Drainage Management';
            recommendation = lang === 'kn' ? 
                'ಉತ್ತಮ ಒಳಚರಂಡಿ ಖಚಿತಪಡಿಸಿ. ಬೆಳೆ ಬೆಡ್‌ಗಳನ್ನು ಮಾಡಿ ನೀರು ಸಂಗ್ರಹವಾಗುವುದನ್ನು ತಪ್ಪಿಸಿ.' :
                'Ensure proper drainage to prevent waterlogging. Create raised beds for better water management in clay soils.';
        } else {
            title = lang === 'kn' ? 'ಸಮತೋಲಿತ ನೀರಾಧಾರ' : 'Balanced Water Management';
            recommendation = lang === 'kn' ? 
                'ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ. ಸೂಕ್ತ ಸಮಯದಲ್ಲಿ ನೀರು ಕೊಡಿ.' :
                'Monitor soil moisture levels regularly. Water crops at optimal times for maximum efficiency.';
        }

        this.addRecommendationCard(container, title, recommendation);
    }

    addSoilTypeRecommendations(container, soilType, lang) {
        const soilInfo = this.soilDescriptions[soilType];
        let title = lang === 'kn' ? `${soilInfo.name.kn} ನಿರ್ವಹಣೆ` : `${soilInfo.name.en} Management`;
        let recommendation = '';

        switch (soilType) {
            case 'red':
                recommendation = lang === 'kn' ? 
                    'ಸಾವಯವ ಗೊಬ್ಬರ ಹೆಚ್ಚಿಸಿ. ಫಾಸ್ಫರಸ್ ಮತ್ತು ಪೋಟಾಶ್ ಸೇರಿಸಿ. ನೀರಿನ ನಿಯಂತ್ರಣ ಮುಖ್ಯ.' :
                    'Increase organic fertilizers. Add phosphorus and potash supplements. Focus on water conservation techniques.';
                break;
            case 'black':
                recommendation = lang === 'kn' ? 
                    'ಒಳಚರಂಡಿ ಸುಧಾರಿಸಿ. ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ಮೆಗ್ನೀಸಿಯಂ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ. ಮಣ್ಣಿನ ರಚನೆ ಸುಧಾರಿಸಿ.' :
                    'Improve drainage systems. Monitor calcium and magnesium levels. Focus on soil structure improvement.';
                break;
            case 'laterite':
                recommendation = lang === 'kn' ? 
                    'ಸುಣ್ಣ ಸೇರಿಸಿ pH ಸುಧಾರಿಸಿ. ಸಾವಯವ ಪದಾರ್ಥ ಹೆಚ್ಚಿಸಿ. ಮೈಕ್ರೊ ಪೋಷಕಾಂಶಗಳ ಪೂರಕತೆ.' :
                    'Add lime to improve pH. Increase organic content. Supplement with micronutrients and trace elements.';
                break;
            case 'alluvial':
                recommendation = lang === 'kn' ? 
                    'ಸಮತೋಲಿತ ಗೊಬ್ಬರ ಬಳಕೆ. ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ನಿರ್ವಹಿಸಿ. ಫಸಲ್ ತಿರುಗುವಿಕೆ ಅಳವಡಿಸಿ.' :
                    'Use balanced fertilization. Maintain soil fertility through proper nutrient management and crop rotation.';
                break;
        }

        this.addRecommendationCard(container, title, recommendation);
    }

    addRecommendationCard(container, title, recommendation) {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <h4>${title}</h4>
            <p>${recommendation}</p>
        `;
        container.appendChild(card);
    }

    displayDemoSoilData() {
        // Display demo soil data
        const demoSoilData = {
            type: 'red',
            ph: 6.2,
            organic: 'medium',
            moisture: 'medium',
            characteristics: ['well-drained', 'slightly-acidic'],
            location: { name: 'Karnataka' }
        };

        this.displaySoilAnalysis(demoSoilData);
        this.generateSoilRecommendations(demoSoilData);

        // Add demo notice
        const recommendationsContainer = document.getElementById('soil-recommendations');
        const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';
        
        const demoTitle = currentLang === 'kn' ? 'ಡೆಮೊ ಮೋಡ್' : 'Demo Mode';
        const demoMessage = currentLang === 'kn' ? 
            'ಮಾದರಿ ಮಣ್ಣಿನ ಡೇಟಾ ತೋರಿಸಲಾಗುತ್ತಿದೆ. ನಿಖರ ಮಾಹಿತಿಗಾಗಿ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ.' :
            'Showing sample soil data. Get actual soil testing done for precise recommendations.';
        
        this.addRecommendationCard(recommendationsContainer, demoTitle, demoMessage);
    }

    displayCachedSoil(cachedData) {
        if (cachedData) {
            this.displaySoilAnalysis(cachedData);
            this.generateSoilRecommendations(cachedData);

            // Add offline notice
            const recommendationsContainer = document.getElementById('soil-recommendations');
            const currentLang = window.smartFarmingApp ? window.smartFarmingApp.currentLanguage : 'en';
            
            const offlineTitle = currentLang === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್' : 'Offline Mode';
            const offlineMessage = currentLang === 'kn' ? 
                'ಸಂಗ್ರಹಿತ ಮಣ್ಣಿನ ಡೇಟಾ ತೋರಿಸಲಾಗುತ್ತಿದೆ. ಅಪ್‌ಡೇಟ್‌ಗಾಗಿ ಇಂಟರ್ನೆಟ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.' :
                'Showing cached soil data. Connect to internet for latest updates.';
            
            this.addRecommendationCard(recommendationsContainer, offlineTitle, offlineMessage);
        }
    }

    cacheSoilData(soilData) {
        localStorage.setItem('smartFarming_soil', JSON.stringify(soilData));
    }

    // Get crop suitability for soil type
    getCropSuitabilityForSoil(soilType) {
        return this.cropSuitability[soilType] || this.cropSuitability['red'];
    }
}

// Initialize soil module
window.SoilModule = new SoilModule();
