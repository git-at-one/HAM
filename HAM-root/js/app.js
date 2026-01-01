// /js/app.js (The Correct, Fully-Featured Version)

import { buildLeftDrawer } from './modules/left-drawer-builder.js';

function dashboardInit() {
    console.log("Dashboard Initializing...");
    buildLeftDrawer();
    initDrawerInteractivity();
    console.log("Dashboard initialization complete.");
}

function initDrawerInteractivity() {
    const appLayout = document.querySelector('.app-layout');
    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const drawerOverlay = document.getElementById('drawer-overlay');

    if (!appLayout || !menuToggleButton || !drawerOverlay) {
        console.error("Drawer initialization failed: A required UI element is missing.");
        return;
    }

    menuToggleButton.addEventListener('click', () => {
        appLayout.classList.toggle('left-drawer-open');
    });

    drawerOverlay.addEventListener('click', () => {
        appLayout.classList.remove('left-drawer-open');
    });
    console.log("Drawer interactivity initialized.");
}

document.addEventListener('DOMContentLoaded', dashboardInit);
