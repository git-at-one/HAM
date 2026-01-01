// /js/app.js (The Correct, Fully-Featured Version)

// --- MODULE IMPORTS ---
// Imports the function to dynamically build the left-side navigation drawer.
import { buildLeftDrawer } from './modules/left-drawer-builder.js';
// Imports the function to fetch internet time and update the greeting and time display.
import { setDynamicGreetingAndTime } from './modules/greet.js';


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
 * This function is called once the DOM is fully loaded.
 */
function dashboardInit() {
    console.log("Dashboard Initializing...");

    // --- INITIALIZE ALL FEATURES ---

    // 1. Build the dynamic content of the left drawer.
    buildLeftDrawer();

    // 2. Set up the event listeners for opening and closing the drawer.
    initDrawerInteractivity();

    // 3. Fetch internet time and set the personalized greeting and time display.
    //    We provide the IDs of the HTML elements to be updated.
    setDynamicGreetingAndTime('user-greeting', 'current-time-display', 'Alex');


    console.log("Dashboard initialization complete.");
}


// --- SCRIPT EXECUTION ---
// This is the entry point. It waits for the HTML document to be fully loaded
// and parsed before running the main initialization function.
document.addEventListener('DOMContentLoaded', dashboardInit);
