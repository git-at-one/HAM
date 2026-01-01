// /js/modules/left-drawer-builder.js (The Final, Corrected Version)

export function buildLeftDrawer() {
    const drawerContainer = document.querySelector('.left-drawer');
    if (!drawerContainer) {
        console.error("Build failed: Left drawer container not found.");
        return;
    }

    // Data for the dynamic lists
    const membersData = [
        { iconClass: 'users', text: 'Sarah' },
        { iconClass: 'users', text: 'David' },
        { iconClass: 'plus-circle', text: 'Invite Member' },
    ];

    const appActionsData = [
        { iconClass: 'settings', text: 'Settings' },
        { iconClass: 'help-circle', text: 'Help & Support' },
        { iconClass: 'log-out', text: 'Logout' },
    ];

    // Helper function to generate list items from data
    function generateListHTML(listData) {
        return listData.map(item => `
            <li>
                <a href="#" class="list-item">
                    <span class="svg-icon ${item.iconClass}"></span>
                    <span class="item-text">${item.text}</span>
                </a>
            </li>
        `).join('');
    }

    // --- BUILD THE ENTIRE DRAWER HTML ---
    // This now uses <span> icons and includes the required IDs for dynamic data.
    drawerContainer.innerHTML = `
        <a href="#" class="drawer-card drawer-user-profile">
            <div class="avatar">
                <span class="svg-icon user"></span>
            </div>
            <div class="user-info">
                <!-- Added IDs for future JavaScript targeting -->
                <div class="user-name" id="drawer-user-name">[User Name]</div>
                <div class="user-email" id="drawer-user-email">[user@email.com]</div>
            </div>
            
            <span class="svg-icon chevron-right profile-arrow"></span>
        </a>

        <a href="#" class="drawer-card home-switcher">
            <span class="svg-icon home"></span>
            <div class="home-info">
                <div class="home-label">Current</div>
                <div class="home-name">Alex's House</div>
            </div>
            
            <span class="svg-icon chevron-down"></span>
        </a>

        <hr class="gradient-divider">

        <ul class="management-group">
            <h4 class="list-title">Home Members</h4>
            ${generateListHTML(membersData)}
        </ul>

        <div class="app-actions">
            <hr class="gradient-divider">
            <ul class="management-group">
                <h4 class="list-title">App</h4>
                ${generateListHTML(appActionsData)}
            </ul>
        </div>
    `;
}
