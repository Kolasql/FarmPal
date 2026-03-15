/**
 * FarmPal - Dashboard Page Component
 */

window.DashboardPage = {
    render: () => {
        const content = document.createElement('div');
        content.className = 'dashboard-container animate-fade-in';
        
        content.innerHTML = `
            <div class="stats-grid">
                <div class="glass-card stat-card" id="stat-crops">
                    <span class="stat-label">Active Plots</span>
                    <span class="stat-value">--</span>
                    <span class="stat-trend positive">↑ Live</span>
                </div>
                <div class="glass-card stat-card" id="stat-moisture">
                    <span class="stat-label">Avg. Moisture</span>
                    <span class="stat-value">68%</span>
                    <div class="progress-bar"><div class="progress" style="width: 68%"></div></div>
                </div>
                <div class="glass-card stat-card" id="stat-weather">
                    <span class="stat-label">Temp</span>
                    <span class="stat-value">--°C</span>
                    <span class="stat-subtext" id="weather-location">Loading...</span>
                </div>
                <div class="glass-card stat-card">
                    <span class="stat-label">System Status</span>
                    <span class="stat-value">Online</span>
                    <span class="stat-trend positive">All sensors active</span>
                </div>
            </div>

            <div class="dashboard-grid mt-24">
                <div class="glass-card grid-span-4">
                    <div class="card-header">
                        <h3>Weather Forecast</h3>
                        <span class="badge" id="weather-badge">Real-time</span>
                    </div>
                    <div id="dashboard-weather-mini" class="weather-mini">
                        <div class="loading-spinner"></div>
                    </div>
                </div>
                
                <div class="glass-card grid-span-4">
                    <h3>Your Plots</h3>
                    <div id="dashboard-plots-list" class="plots-mini">
                        <div class="loading-spinner"></div>
                    </div>
                </div>
            </div>
        `;
        
        return content;
    },

    async init() {
        console.log('Dashboard Initializing...');
        
        // 1. Get Data from Storage
        const farms = Storage.getFarms();
        const mainFarm = farms[0];
        const fields = mainFarm ? Storage.getFieldsByFarm(mainFarm.id) : [];
        
        // Update Crop Stat
        const statCrops = document.querySelector('#stat-crops .stat-value');
        if (statCrops) statCrops.textContent = fields.length;

        // 2. Fetch Weather
        if (mainFarm) {
            const locationText = document.getElementById('weather-location');
            if (locationText) locationText.textContent = mainFarm.location;

            try {
                const weatherData = await WeatherAPI.getCurrentAndForecast(mainFarm.lat, mainFarm.lon);
                
                // Update Temp Stat
                const statTemp = document.querySelector('#stat-weather .stat-value');
                if (statTemp) statTemp.textContent = `${weatherData.current.temp}°C`;

                // Render Mini Forecast
                const weatherContainer = document.getElementById('dashboard-weather-mini');
                if (weatherContainer) {
                    weatherContainer.innerHTML = weatherData.daily.slice(0, 4).map(day => `
                        <div class="weather-item">
                            <span class="day">${day.dayName}</span>
                            <span class="icon">${day.icon}</span>
                            <span class="temp">${day.maxTemp}°C</span>
                        </div>
                    `).join('');
                }
            } catch (err) {
                console.error('Weather init failed', err);
            }
        }

        // 3. Render Plots
        const plotsContainer = document.getElementById('dashboard-plots-list');
        if (plotsContainer) {
            if (fields.length === 0) {
                plotsContainer.innerHTML = '<p class="empty-state">No plots added yet.</p>';
            } else {
                plotsContainer.innerHTML = fields.slice(0, 3).map(field => `
                    <div class="plot-item">
                        <div class="plot-info">
                            <span class="plot-name">${field.name}</span>
                            <span class="plot-crop">${field.cropType}</span>
                        </div>
                        <div class="plot-status">
                            <span class="status-dot active"></span>
                            Growing
                        </div>
                    </div>
                `).join('');
            }
        }
    }
};
