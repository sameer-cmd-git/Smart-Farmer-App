# Smart Farming Assistant for Karnataka Farmers

A comprehensive web-based farming assistant designed exclusively for Karnataka farmers, providing soil-type insights, localized weather alerts, and season-based crop recommendations in both Kannada and English.

## 🌾 Features

- **Location-Based Services**: GPS detection, PIN code, and district selection for Karnataka
- **Weather & Climate**: Real-time weather data, rainfall alerts, and agricultural weather insights
- **Soil Analysis**: Karnataka-specific soil classification (Red, Black, Laterite, Alluvial) with recommendations
- **Crop Recommendations**: Season-based suggestions for Kharif, Rabi, and Zaid crops
- **Multilingual Support**: Full Kannada and English language support
- **Offline Functionality**: Works without internet with cached data
- **Mobile Optimized**: Responsive design for smartphones and tablets
- **PWA Support**: Installable as a native app

## 📱 Demo

Link : https://sameer-cmd-git.github.io/Smart-Farmer-App/

The application works in demo mode without API keys, showing sample data for all features. For live data, configure your API keys as described below.

## 🚀 Quick Start

1. **Clone or download** the project to your local machine
2. **Serve the files** using any web server (see deployment options below)
3. **Access the app** at `http://localhost:PORT` or your server URL
4. **Configure API keys** (optional) for live weather data

### Local Development

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## 🔑 API Configuration

### Required APIs for Full Functionality

#### 1. OpenWeatherMap API (Weather Data)
- **Free Tier**: 1,000 calls/day
- **Sign up**: https://openweathermap.org/api
- **Configure**: Edit `js/weather.js` line 7:
  ```javascript
    this.API_KEY = 'your_openweathermap_api_key_here';
  ```

#### 2. Visual Crossing Weather API (Advanced Weather Analytics)
- **Free Tier**: 1,000 records/day  
- **Sign up**: https://www.visualcrossing.com/weather-api
- **Alternative to OpenWeatherMap for enhanced features**

#### 3. NASA POWER API (Soil & Agricultural Data)
- **Completely Free**
- **No signup required**
- **Already configured** for soil temperature and moisture data

#### 4. PIN Code Geocoding (Optional Enhancement)
- **Free Tier**: Various providers available
- **Current**: Uses postal PIN code API (free)
- **For production**: Consider Google Maps Geocoding API

### API Key Management

#### Security Best Practices:
1. **Never commit API keys** to version control
2. **Use environment variables** in production
3. **Implement server-side proxy** for production deployment
4. **Monitor API usage** to avoid exceeding limits

#### Using local environment variables (development)

1. Copy `.env.example` to `.env` and fill in your keys.
2. For local static hosting, you can create a small `js/env.js` that's ignored by git and sets `window.__ENV`:

```javascript
// js/env.js (DO NOT COMMIT)
window.__ENV = {
    OPENWEATHERMAP_API_KEY: 'your_openweathermap_key',
    BHUVAN_API_KEY: 'your_bhuvan_key'
};
```

3. Include `js/env.js` in `index.html` before other scripts during local testing.

Note: For production, don't embed secrets into client-side code — use server-side environment variables or a proxy.

#### Production Setup:
```javascript
// In production, use environment variables
this.API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_mode';
```

## 📂 Project Structure

```
smart_farmer_app/
├── index.html              # Main application entry point
├── styles.css              # Responsive CSS with mobile optimization
├── manifest.json           # PWA manifest for app installation
├── sw.js                   # Service Worker for offline functionality
├── README.md               # This file
└── js/
    ├── app.js              # Main application logic & location services
    ├── weather.js          # Weather API integration & alerts
    ├── soil.js             # Soil analysis & Karnataka soil mapping
    ├── crops.js            # Crop recommendation engine
    └── language.js         # Kannada/English multilingual support
```

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **APIs**: OpenWeatherMap, NASA POWER, Postal PIN Code API
- **PWA**: Service Worker, Web App Manifest
- **Fonts**: Noto Sans Kannada, Inter
- **Icons**: Font Awesome
- **Responsive**: Mobile-first design with CSS Grid & Flexbox

## 🌍 Deployment Options

### 1. Static Hosting (Recommended for beginners)
- **GitHub Pages**: Free, easy setup
- **Netlify**: Free tier with SSL
- **Vercel**: Free deployment from Git
- **Firebase Hosting**: Free tier available

### 2. Traditional Web Hosting
- Any shared hosting provider
- Upload files to public_html or www folder
- Ensure HTTPS for PWA features

### 3. Server Deployment
```bash
# Using nginx (recommended for production)
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/smart_farmer_app;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📱 Mobile Installation

The app can be installed as a native mobile app:

1. **Android**: Chrome will show "Add to Home Screen" banner
2. **iOS**: Use Safari's "Add to Home Screen" option
3. **Desktop**: Chrome/Edge will show install prompt

## 🌾 Karnataka-Specific Features

### Soil Types Covered
- **Red Soil**: Bangalore, Tumkur, Kolar, Chikkaballapur, etc.
- **Black Cotton Soil**: Vijayapura, Belagavi, Bagalkot, Dharwad, etc.
- **Laterite Soil**: Uttara Kannada, Udupi, Dakshina Kannada, Kodagu, etc.
- **Alluvial Soil**: Mandya, Mysore, Hassan, Ramanagara, etc.

### Crops Database
- **Kharif**: Rice, Cotton, Sugarcane, Groundnut, Jowar, etc.
- **Rabi**: Wheat, Sunflower, Safflower, Tomato, etc.
- **Zaid**: Maize, Summer crops with irrigation

### Districts Supported
All 30 districts of Karnataka with local language names and coordinates.

## 🌐 Language Support

- **English**: Complete interface and recommendations
- **Kannada**: Native script support with proper fonts
- **Automatic Detection**: Based on browser language settings
- **Manual Toggle**: Switch between languages anytime

## 🔧 Customization

### Adding New Crops
Edit `js/crops.js`:
```javascript
'new-crop': {
    name: { en: 'New Crop', kn: 'ಹೊಸ ಬೆಳೆ' },
    icon: 'fa-seedling',
    seasons: ['kharif'],
    soilSuitability: {
        'red': 'highly-suitable',
        // ... other soil types
    },
    // ... other properties
}
```

### Adding New Districts
Edit `js/app.js` and `js/language.js`:
```javascript
'new-district': { 
    name: 'New District', 
    lat: 12.0000, 
    lon: 77.0000 
}
```

### Modifying Soil Recommendations
Edit `js/soil.js` soil mapping and recommendations functions.

## 🐛 Troubleshooting

### Common Issues

#### 1. App Not Loading
- Check browser console for errors
- Ensure all files are properly uploaded
- Verify HTTPS for PWA features

#### 2. Weather Data Not Loading
- Check API key configuration
- Verify API key is active and has available quota
- Check browser network tab for API errors

#### 3. Location Detection Issues
- Enable location permissions in browser
- Use manual district/PIN selection as fallback
- Check HTTPS requirement for geolocation

#### 4. Offline Functionality Not Working
- Ensure service worker is registered
- Check browser support for service workers
- Clear cache and reload for updates

### Browser Support
- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Internet Explorer**: Not supported

## 🤝 Contributing

Contributions are welcome! Please consider:

1. **Local Testing**: Test thoroughly on mobile devices
2. **Language Accuracy**: Verify Kannada translations with native speakers
3. **Agricultural Accuracy**: Consult local agricultural experts
4. **Performance**: Maintain fast loading on low-end devices

### Development Guidelines
- Follow responsive design principles
- Maintain offline functionality
- Test on various screen sizes
- Ensure accessibility compliance

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Karnataka State Department of Agriculture
- Indian Meteorological Department
- OpenWeatherMap for weather data
- NASA POWER for agricultural data
- Font Awesome for icons
- Google Fonts for typography

## 📞 Support

For technical support or agricultural queries:
- Create an issue in the project repository
- Consult local agricultural extension officers
- Contact Karnataka State Helpline: 1551

---

**Built with ❤️ for Karnataka Farmers**

*Empowering farmers with technology for better yields and sustainable agriculture.*
