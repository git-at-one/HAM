// /js/app.js (The Final, Corrected Version)

import { buildLeftDrawer } from './modules/left-drawer-builder.js';

function dashboardInit() {
    console.log("Dashboard Initializing...");

    // --- 1. BUILD DYNAMIC CONTENT ---
    // This function now builds the entire drawer's inner HTML in one go.
    buildLeftDrawer();
    console.log("Dynamic drawer lists built.");

    // --- 2. INITIALIZE INTERACTIVITY ---
    const appLayout = document.querySelector('.app-layout');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const drawerOverlay = document.getElementById('drawer-overlay');

    if (!appLayout || !menuToggleBtn || !drawerOverlay) {
        console.error("Initialization failed: A required UI element is missing.");
        return;
    }

    // This correctly opens AND closes the drawer on button click.
    menuToggleBtn.addEventListener('click', () => {
        appLayout.classList.toggle('left-drawer-open');
    });

    // This correctly closes the drawer when the overlay is clicked.
    drawerOverlay.addEventListener('click', () => {
        appLayout.classList.remove('left-drawer-open');
    });
    
    console.log("Dashboard Initialized Successfully.");
}

document.addEventListener('DOMContentLoaded', dashboardInit);
