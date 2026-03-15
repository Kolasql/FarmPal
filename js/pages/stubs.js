/**
 * FarmPal - Other Page Stubs
 */

const createStubPage = (name, icon) => ({
    render: () => {
        const content = document.createElement('div');
        content.className = 'page-container animate-fade-in';
        content.innerHTML = `
            <div class="glass-card full-page" style="min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                <div class="premium-icon-shield" style="font-size: 64px; margin-bottom: 24px; filter: drop-shadow(0 0 15px rgba(192, 132, 252, 0.4));">
                    ${icon}
                </div>
                <h2 style="margin-bottom: 12px; font-size: 28px;">${name}</h2>
                <div class="badge-premium" style="margin-bottom: 24px; padding: 4px 12px; font-size: 12px;">PREMIUM FEATURE</div>
                <p style="color: var(--text-secondary); max-width: 450px; margin-bottom: 32px; line-height: 1.6;">
                    Gain access to advanced agricultural intelligence, historical trends, and multi-farm management tools with FarmPal Pro.
                </p>
                <div class="mock-ui-preview" style="width: 100%; max-width: 400px; background: rgba(255,255,255,0.03); border: 1px dashed var(--border-glass); border-radius: 12px; padding: 20px; margin-bottom: 32px;">
                    <div style="height: 12px; background: var(--bg-glass); border-radius: 6px; width: 60%; margin-bottom: 12px;"></div>
                    <div style="height: 12px; background: var(--bg-glass); border-radius: 6px; width: 90%; margin-bottom: 12px;"></div>
                    <div style="height: 12px; background: var(--bg-glass); border-radius: 6px; width: 40%;"></div>
                </div>
                <button class="btn-primary" style="background: var(--gradient-purple); box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);">Upgrade to Pro</button>
            </div>
        `;
        return content;
    },
    init: () => console.log(`${name} Page Initialized`)
});

window.FarmsPage = createStubPage('Farm Management', '🚜');
window.CropsPage = createStubPage('AI Crop Assistant', '🌱');
window.WeatherPage = createStubPage('Hyper-Local Weather', '⛈️');
window.RecommendationsPage = createStubPage('Expert Insights', '🤖');
window.CalendarPage = createStubPage('Agricultural Calendar', '📅');
