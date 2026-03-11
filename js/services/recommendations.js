/**
 * FarmPal - Recommendations Service
 */

window.RecommendationsService = {
    getRecommendations: (cropType, growthStage, weatherData) => {
        // AI rule-based recommendation logic for the demo
        const recommendations = [
            { id: 1, text: "Apply high-nitrogen fertilizer for optimal growth in Plot A.", priority: 'high' },
            { id: 2, text: "Increase irrigation frequency as high temperatures are expected.", priority: 'medium' },
            { id: 3, text: "Monitor for leaf pests in lower canopy.", priority: 'low' }
        ];
        return recommendations;
    }
};
