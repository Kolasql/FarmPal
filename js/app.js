/**
 * FarmPal - Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('page-container');
    const pageTitle = document.getElementById('page-title');
    const navItems = document.querySelectorAll('.nav-item');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Navigation State
    const state = {
        currentPage: 'dashboard',
        pages: {
            dashboard: window.DashboardPage,
            farms: window.FarmsPage,
            crops: window.CropsPage,
            weather: window.WeatherPage,
            recommendations: window.RecommendationsPage,
            calendar: window.CalendarPage
        }
    };

    // Route transitions
    const navigateTo = (pageName) => {
        if (!state.pages[pageName]) {
            console.error(`Page not found: ${pageName}`);
            return;
        }

        // Update UI
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });

        const page = state.pages[pageName];
        pageTitle.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        
        // Render page
        pageContainer.innerHTML = '';
        pageContainer.appendChild(page.render());
        
        if (page.init) page.init();
        
        state.currentPage = pageName;
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    };

    // Event listeners
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Initial load
    // Simple delay to ensure sub-scripts are available
    setTimeout(() => {
        Storage.seedDemoData();
        navigateTo('dashboard');
    }, 100);
});
