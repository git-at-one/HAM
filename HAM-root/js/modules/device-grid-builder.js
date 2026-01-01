// /js/modules/device-grid-builder.js (With Filtering Logic)

import { fetchDevices } from '../data/mock-devices.js';

function createDeviceCardHTML(device) {
    return `
        <div class="device-card ${device.isActive ? 'active' : ''}" data-device-id="${device.id}">
            <div class="device-card-icon"><span class="svg-icon ${device.icon}"></span></div>
            <div class="device-card-info">
                <p class="device-name">${device.name}</p>
                <p class="device-status">${device.status}</p>
            </div>
        </div>
    `;
}
function createAddNewCardHTML() {
    return `
        <button type="button" class="device-card add-new-card">
            <div class="device-card-icon"><span class="svg-icon plus"></span></div>
            <p class="device-name">Add New</p>
        </button>
    `;
}
function createSkeletonLoaderHTML(count = 4) {
    let loaderHTML = '';
    for (let i = 0; i < count; i++) {
        loaderHTML += '<div class="skeleton-card"></div>';
    }
    return loaderHTML;
}

export async function buildDeviceGrids(activeContainerId, allContainerId) {
    const activeContainer = document.getElementById(activeContainerId);
    const allContainer = document.getElementById(allContainerId);

    if (!activeContainer || !allContainer) {
        console.error("One or more device grid containers were not found.");
        return;
    }

    activeContainer.innerHTML = createSkeletonLoaderHTML(2);
    allContainer.innerHTML = createSkeletonLoaderHTML(4);

    const devices = await fetchDevices();

    const activeDevices = devices.filter(device => device.isActive);
    const allDevices = devices;

    const activeCardsHTML = activeDevices.map(createDeviceCardHTML).join('');
    const allCardsHTML = allDevices.map(createDeviceCardHTML).join('');

    if (activeContainer) activeContainer.innerHTML = activeCardsHTML;
    if (allContainer) allContainer.innerHTML = allCardsHTML;
}
