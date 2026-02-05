// Language Module for Smart Farming Assistant
// Kannada/English Language Support

class LanguageModule {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {
            en: {
                // Header
                'smart_farming_assistant': 'Smart Farming Assistant',
                'language_toggle': 'ಕನ್ನಡ',
                
                // Location Section
                'your_location': 'Your Location',
                'select_district': 'Select District',
                'get_location_info': 'Get Location Info',
                
                // Weather Section
                'weather_alerts': 'Weather & Alerts',
                'loading': 'Loading...',
                
                // Soil Section
                'soil_analysis': 'Soil Analysis',
                'soil_type': 'Soil Type',
                'ph_level': 'pH Level',
                'organic_matter': 'Organic Matter',
                'moisture': 'Moisture',
                
                // Crop Section
                'crop_recommendations': 'Crop Recommendations',
                'kharif_season': 'Kharif (June-Oct)',
                'rabi_season': 'Rabi (Nov-Mar)',
                'zaid_season': 'Zaid (Apr-June)',
                
                // Common Terms
                'high': 'High',
                'medium': 'Medium',
                'low': 'Low',
                'suitable': 'Suitable',
                'moderately_suitable': 'Moderately Suitable',
                'less_suitable': 'Less Suitable',
                
                // Offline Messages
                'offline_message': 'You\'re offline. Some features may not be available.',
                'demo_mode': 'Demo Mode',
                'cached_data': 'Showing cached data. Connect to internet for latest updates.',
                
                // Error Messages
                'location_error': 'Unable to get your location. Please select manually.',
                'no_data': 'No data available for this location.',
                'connection_error': 'Please check your internet connection.',
                
                // Success Messages
                'location_found': 'Location detected successfully',
                'data_updated': 'Data updated successfully'
            },
            kn: {
                // Header
                'smart_farming_assistant': 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ',
                'language_toggle': 'English',
                
                // Location Section
                'your_location': 'ನಿಮ್ಮ ಸ್ಥಳ',
                'select_district': 'ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ',
                'get_location_info': 'ಸ್ಥಳದ ಮಾಹಿತಿ ಪಡೆಯಿರಿ',
                
                // Weather Section
                'weather_alerts': 'ಹವಾಮಾನ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು',
                'loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
                
                // Soil Section
                'soil_analysis': 'ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ',
                'soil_type': 'ಮಣ್ಣಿನ ಪ್ರಕಾರ',
                'ph_level': 'pH ಮಟ್ಟ',
                'organic_matter': 'ಸಾವಯವ ಪದಾರ್ಥ',
                'moisture': 'ತೇವಾಂಶ',
                
                // Crop Section
                'crop_recommendations': 'ಬೆಳೆ ಶಿಫಾರಸುಗಳು',
                'kharif_season': 'ಖರೀಫ್ (ಜೂನ್-ಅಕ್ಟೋ)',
                'rabi_season': 'ರಬಿ (ನವೆಂ-ಮಾರ್ಚ್)',
                'zaid_season': 'ಜಾಯೀದ್ (ಏಪ್ರಿ-ಜೂನ್)',
                
                // Common Terms
                'high': 'ಹೆಚ್ಚು',
                'medium': 'ಮಧ್ಯಮ',
                'low': 'ಕಡಿಮೆ',
                'suitable': 'ಸೂಕ್ತ',
                'moderately_suitable': 'ಮಧ್ಯಮ ಸೂಕ್ತ',
                'less_suitable': 'ಕಡಿಮೆ ಸೂಕ್ತ',
                
                // Offline Messages
                'offline_message': 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಕೆಲವು ವೈಶಿಷ್ಟ್ಯಗಳು ಲಭ್ಯವಿರದಿರಬಹುದು.',
                'demo_mode': 'ಡೆಮೊ ಮೋಡ್',
                'cached_data': 'ಸಂಗ್ರಹಿತ ಮಾಹಿತಿ ತೋರಿಸಲಾಗುತ್ತಿದೆ. ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಾಗಿ ಇಂಟರ್ನೆಟ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.',
                
                // Error Messages
                'location_error': 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ವಯಂ ಆಯ್ಕೆ ಮಾಡಿ.',
                'no_data': 'ಈ ಸ್ಥಳಕ್ಕೆ ಯಾವುದೇ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ.',
                'connection_error': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ.',
                
                // Success Messages
                'location_found': 'ಸ್ಥಳವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪತ್ತೆ ಮಾಡಲಾಗಿದೆ',
                'data_updated': 'ಮಾಹಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಲಾಗಿದೆ'
            }
        };
        
        // District names in both languages
        this.districtNames = {
            'bangalore': { en: 'Bangalore Urban', kn: 'ಬೆಂಗಳೂರು ನಗರ' },
            'mysore': { en: 'Mysore', kn: 'ಮೈಸೂರು' },
            'mandya': { en: 'Mandya', kn: 'ಮಂಡ್ಯ' },
            'hassan': { en: 'Hassan', kn: 'ಹಾಸನ' },
            'tumkur': { en: 'Tumkur', kn: 'ತುಮಕೂರು' },
            'kolar': { en: 'Kolar', kn: 'ಕೋಲಾರ' },
            'chikkaballapur': { en: 'Chikkaballapur', kn: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ' },
            'ramanagara': { en: 'Ramanagara', kn: 'ರಾಮನಗರ' },
            'chitradurga': { en: 'Chitradurga', kn: 'ಚಿತ್ರದುರ್ಗ' },
            'davanagere': { en: 'Davanagere', kn: 'ದಾವಣಗೆರೆ' },
            'shimoga': { en: 'Shimoga', kn: 'ಶಿವಮೊಗ್ಗ' },
            'chikkamagaluru': { en: 'Chikkamagaluru', kn: 'ಚಿಕ್ಕಮಗಳೂರು' },
            'udupi': { en: 'Udupi', kn: 'ಉಡುಪಿ' },
            'dakshina-kannada': { en: 'Dakshina Kannada', kn: 'ದಕ್ಷಿಣ ಕನ್ನಡ' },
            'kodagu': { en: 'Kodagu', kn: 'ಕೊಡಗು' },
            'dharwad': { en: 'Dharwad', kn: 'ಧಾರವಾಡ' },
            'haveri': { en: 'Haveri', kn: 'ಹಾವೇರಿ' },
            'uttara-kannada': { en: 'Uttara Kannada', kn: 'ಉತ್ತರ ಕನ್ನಡ' },
            'gadag': { en: 'Gadag', kn: 'ಗದಗ' },
            'bagalkot': { en: 'Bagalkot', kn: 'ಬಾಗಲಕೋಟೆ' },
            'vijayapura': { en: 'Vijayapura', kn: 'ವಿಜಯಪುರ' },
            'belagavi': { en: 'Belagavi', kn: 'ಬೆಳಗಾವಿ' },
            'bellary': { en: 'Bellary', kn: 'ಬಳ್ಳಾರಿ' },
            'koppal': { en: 'Koppal', kn: 'ಕೊಪ್ಪಳ' },
            'raichur': { en: 'Raichur', kn: 'ರಾಯಚೂರು' },
            'kalaburagi': { en: 'Kalaburagi', kn: 'ಕಲಬುರಗಿ' },
            'bidar': { en: 'Bidar', kn: 'ಬೀದರ್' },
            'yadgir': { en: 'Yadgir', kn: 'ಯಾದಗಿರಿ' }
        };
    }

    getStoredLanguage() {
        return localStorage.getItem('smartFarming_language') || 'en';
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('smartFarming_language', lang);
        
        // Update the global app language
        if (window.smartFarmingApp) {
            window.smartFarmingApp.currentLanguage = lang;
        }
        
        // Update UI immediately
        this.updateUI();
        
        // Update language toggle button
        this.updateLanguageToggle();
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }

    updateUI() {
        // Update all elements with data-en and data-kn attributes
        const elements = document.querySelectorAll('[data-en][data-kn]');
        
        elements.forEach(element => {
            const enText = element.getAttribute('data-en');
            const knText = element.getAttribute('data-kn');
            
            if (this.currentLanguage === 'en') {
                element.textContent = enText;
            } else {
                element.textContent = knText;
            }
        });

        // Update input placeholders
        this.updatePlaceholders();
        
        // Update district dropdown
        this.updateDistrictDropdown();
        
        // Set document language attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Add/remove Kannada font class to body
        if (this.currentLanguage === 'kn') {
            document.body.classList.add('kannada');
        } else {
            document.body.classList.remove('kannada');
        }

        // Refresh dynamic content if it exists
        this.refreshDynamicContent();
    }

    updatePlaceholders() {
        const pincodeInput = document.getElementById('pincode-input');
        if (pincodeInput) {
            if (this.currentLanguage === 'en') {
                pincodeInput.placeholder = 'Enter PIN Code';
            } else {
                pincodeInput.placeholder = 'ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ';
            }
        }
    }

    updateDistrictDropdown() {
        const districtSelect = document.getElementById('district-select');
        if (!districtSelect) return;

        const options = districtSelect.querySelectorAll('option');
        options.forEach(option => {
            const value = option.value;
            if (value && this.districtNames[value]) {
                option.textContent = this.districtNames[value][this.currentLanguage];
            } else if (value === '') {
                // Update the default option
                option.textContent = this.translate('select_district');
            }
        });
    }

    updateLanguageToggle() {
        const langIndicator = document.getElementById('lang-indicator');
        if (langIndicator) {
            langIndicator.textContent = this.translate('language_toggle');
        }
    }

    refreshDynamicContent() {
        // Refresh soil analysis if it exists
        if (window.smartFarmingApp && window.smartFarmingApp.soilData) {
            if (window.SoilModule) {
                window.SoilModule.displaySoilAnalysis(window.smartFarmingApp.soilData);
                window.SoilModule.generateSoilRecommendations(window.smartFarmingApp.soilData);
            }
        }

        // Refresh crop recommendations if they exist
        const activeSeasonBtn = document.querySelector('.season-btn.active');
        if (activeSeasonBtn && window.smartFarmingApp && window.smartFarmingApp.currentLocation) {
            const season = activeSeasonBtn.dataset.season;
            if (window.CropModule) {
                window.CropModule.loadCropRecommendations(
                    window.smartFarmingApp.currentLocation, 
                    season, 
                    window.smartFarmingApp.soilData
                );
            }
        }

        // Update weather alerts if they exist
        this.updateWeatherAlerts();
    }

    updateWeatherAlerts() {
        // Update weather alert messages based on current language
        const alerts = document.querySelectorAll('#weather-alerts .alert');
        alerts.forEach(alert => {
            const alertText = alert.textContent;
            
            // Update common alert messages
            if (alertText.includes('Demo Mode') || alertText.includes('ಡೆಮೊ ಮೋಡ್')) {
                const title = this.translate('demo_mode');
                const message = this.currentLanguage === 'kn' ? 
                    'ಮಾದರಿ ಹವಾಮಾನ ಮಾಹಿತಿ ತೋರಿಸಲಾಗುತ್ತಿದೆ. ನೇರ ಹವಾಮಾನ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗೆ API ಕೀ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.' :
                    'Showing sample weather data. Configure your API key for live weather updates.';
                
                alert.innerHTML = `
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>${title}</strong>
                        <p>${message}</p>
                    </div>
                `;
            }
        });
    }

    // Format numbers and currency based on locale
    formatNumber(number, options = {}) {
        const locale = this.currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
        return new Intl.NumberFormat(locale, options).format(number);
    }

    formatCurrency(amount, currency = 'INR') {
        return this.formatNumber(amount, { 
            style: 'currency', 
            currency: currency,
            maximumFractionDigits: 0
        });
    }

    // Date formatting
    formatDate(date, options = {}) {
        const locale = this.currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    // Get localized month names
    getMonthName(monthIndex) {
        const monthNames = {
            en: ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December'],
            kn: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್',
                 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್']
        };
        return monthNames[this.currentLanguage][monthIndex];
    }

    // Get localized day names
    getDayName(dayIndex) {
        const dayNames = {
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            kn: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ']
        };
        return dayNames[this.currentLanguage][dayIndex];
    }

    // Helper method to get district name in current language
    getDistrictName(districtKey) {
        return this.districtNames[districtKey]?.[this.currentLanguage] || districtKey;
    }

    // Create language-aware alert messages
    createAlert(type, titleKey, messageKey, customMessage = null) {
        const alertContainer = document.getElementById('weather-alerts');
        if (!alertContainer) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        
        const iconMap = {
            info: 'info-circle',
            warning: 'exclamation-triangle',
            error: 'exclamation-circle',
            success: 'check-circle'
        };

        const title = this.translate(titleKey);
        const message = customMessage || this.translate(messageKey);

        alert.innerHTML = `
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <div>
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        `;

        alertContainer.appendChild(alert);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 5000);
    }

    // Initialize language module
    init() {
        // Set initial language
        this.setLanguage(this.currentLanguage);
        
        // Add language detection based on browser
        const browserLang = navigator.language || navigator.languages[0];
        if (browserLang.startsWith('kn') && this.currentLanguage === 'en') {
            this.setLanguage('kn');
        }
        
        console.log('Language module initialized with language:', this.currentLanguage);
    }
}

// Global function for HTML onclick handler
function toggleLanguage() {
    const newLang = window.LanguageModule.getCurrentLanguage() === 'en' ? 'kn' : 'en';
    window.LanguageModule.setLanguage(newLang);
}

// Initialize language module
window.LanguageModule = new LanguageModule();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.LanguageModule.init();
});
