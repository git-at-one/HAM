// /js/app.js (The Full and Correct Version)

// --- MODULE IMPORTS ---
// Imports the function to dynamically build the left-side navigation drawer.
import { buildLeftDrawer } from './modules/left-drawer-builder.js';
// Imports the function to fetch internet time and update the greeting and time display.
import { initDynamicGreetingAndClock } from './modules/greet.js';
// Imports the function to build the "Active" and "All" device grids.
import { buildDeviceGrids } from './modules/device-grid-builder.js';


/**
 * Initializes all interactive features for the mobile drawer.
 * This includes the menu toggle button and the overlay for closing the drawer.
 */
function initDrawerInteractivity() {
    const appLayout = document.querySelector('.app-layout');
    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const drawerOverlay = document.getElementById('drawer-overlay');

    // Gracefully exit if any required elements are missing on the page.
    if (!appLayout || !menuToggleButton || !drawerOverlay) {
        console.warn("Drawer interactivity elements not found. Skipping initialization.");
        return;
    }

    // Event listener for the menu button to open/close the drawer.
    menuToggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the click from bubbling up.
        appLayout.classList.toggle('left-drawer-open');
    });

    // Event listener for the overlay to close the drawer when clicked.
    drawerOverlay.addEventListener('click', () => {
        appLayout.classList.remove('left-drawer-open');
    });

    console.log("Drawer interactivity initialized.");
}


/**
 * The main initialization function for the entire dashboard.
 * This function is now 'async' because it needs to 'await' the device grid creation.
 */
async function dashboardInit() {
    console.log("Dashboard Initializing...");

    // --- INITIALIZE ALL FEATURES ---

    // 1. These functions are synchronous or run in the background.
    // They can be called right away.
    initDynamicGreetingAndClock('user-greeting', 'current-time-display', 'Alex');
    buildLeftDrawer();
    initDrawerInteractivity();

    // 2. This function is asynchronous. It fetches data and builds the main UI.
    // We 'await' its completion to ensure the main content is ready.
    // It now takes two arguments for the two separate grid containers.
    await buildDeviceGrids('active-devices-grid', 'all-devices-grid');

    console.log("Dashboard initialization complete.");
}


// --- SCRIPT EXECUTION ---
// This is the entry point. It waits for the HTML document to be fully loaded
// and parsed before running the main initialization function.
document.addEventListener('DOMContentLoaded', dashboardInit);
