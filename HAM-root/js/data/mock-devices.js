// /js/data/mock-devices.js

// This is our mock database of devices.
// In a real app, this data would be fetched from a server API.
const devices = [
    {
        id: 'lamp-1',
        name: 'Living Room Lamp',
        icon: 'lightbulb', // Corresponds to a CSS class for the icon
        status: 'On',
        isActive: true
    },
    {
        id: 'thermo-1',
        name: 'Thermostat',
        icon: 'thermostat',
        status: 'Off • 72°F',
        isActive: false
    },
    {
        id: 'speaker-main',
        name: 'Main Speaker',
        icon: 'speaker',
        status: 'Playing',
        isActive: true
    },
    {
        id: 'front-door',
        name: 'Front Door Lock',
        icon: 'lock',
        status: 'Locked',
        isActive: true
    },
    {
        id: 'tv-living',
        name: 'Living Room TV',
        icon: 'tv',
        status: 'Off',
        isActive: false
    }
];

/**
 * Simulates fetching device data from a server with a delay.
 * @returns {Promise<Array>} A promise that resolves with the array of device objects.
 */
export function fetchDevices() {
    console.log("Fetching devices from server...");
    return new Promise(resolve => {
        // Simulate a network delay of 500ms
        setTimeout(() => {
            console.log("...devices fetched successfully.");
            resolve(devices);
        }, 500);
    });
}
