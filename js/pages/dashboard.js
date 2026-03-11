/**
 * FarmPal - Dashboard Page Component
 */

window.DashboardPage = {
    render: () => {
        const content = document.createElement('div');
        content.className = 'dashboard-container animate-fade-in';
        
        content.innerHTML = `
            <div class="stats-grid">
                <div class="glass-card stat-card">
                    <span class="stat-label">Active Crops</span>
                    <span class="stat-value">12</span>
                    <span class="stat-trend positive">↑ 2 from last month</span>
                </div>
                <div class="glass-card stat-card">
                    <span class="stat-label">Soil Moisture</span>
                    <span class="stat-value">68%</span>
                    <div class="progress-bar"><div class="progress" style="width: 68%"></div></div>
                </div>
                <div class="glass-card stat-card">
                    <span class="stat-label">Next Harvest</span>
                    <span class="stat-value">14 Days</span>
                    <span class="stat-subtext">Maize Plot B</span>
                </div>
                <div class="glass-card stat-card">
                    <span class="stat-label">Health Score</span>
                    <span class="stat-value">94/100</span>
                    <span class="stat-trend positive">Optimal</span>
                </div>
            </div>

            <div class="dashboard-grid mt-24">
                <div class="glass-card grid-span-4">
                    <h3>Weather Forecast</h3>
                    <div id="dashboard-weather-mini" class="weather-mini">
                        <div class="weather-item">
                            <span class="day">Mon</span>
                            <span class="icon">☀️</span>
                            <span class="temp">32°C</span>
                        </div>
                        <div class="weather-item">
                            <span class="day">Tue</span>
                            <span class="icon">⛅</span>
                            <span class="temp">29°C</span>
                        </div>
                        <div class="weather-item">
                            <span class="day">Wed</span>
                            <span class="icon">🌧️</span>
                            <span class="temp">24°C</span>
                        </div>
                    </div>
                </div>
                
                <div class="glass-card grid-span-4">
                    <h3>Recent Tasks</h3>
                    <ul class="task-list">
                        <li><span class="task-check">✓</span> Apply fertilizer to Maize Plot A</li>
                        <li><span class="task-check">○</span> Weed Cassava Section 3</li>
                        <li><span class="task-check">○</span> Inspect Irrigation Lines</li>
                    </ul>
                </div>
            </div>
        `;
        
        return content;
    },
    init: () => {
        console.log('Dashboard Initialized');
    }
};
