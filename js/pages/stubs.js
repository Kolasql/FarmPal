/**
 * FarmPal - Other Page Stubs
 */

const createStubPage = (name, icon) => ({
    render: () => {
        const content = document.createElement('div');
        content.className = 'page-container animate-fade-in';
        content.innerHTML = `
            <div class="glass-card full-page">
                <div class="header-with-icon">
                    <span class="icon">${icon}</span>
                    <h2>${name}</h2>
                </div>
                <p>This feature is part of the FarmPal Premium experience. Manage your farm with advanced intelligence.</p>
                <div class="mock-content mt-24">
                   <div class="placeholder-row"></div>
                   <div class="placeholder-row w-75"></div>
                   <div class="placeholder-row w-50"></div>
                </div>
                <button class="btn-primary mt-24">Unlock Full Insights</button>
            </div>
        `;
        return content;
    },
    init: () => console.log(`${name} Page Initialized`)
});

window.FarmsPage = createStubPage('My Farms', '🚜');
window.CropsPage = createStubPage('Crop Management', '🌱');
window.WeatherPage = createStubPage('Weather Forecast', '⛅');
window.RecommendationsPage = createStubPage('AI Recommendations', '🤖');
window.CalendarPage = createStubPage('Farm Calendar', '📅');
