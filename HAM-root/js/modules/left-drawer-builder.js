// /js/modules/left-drawer-builder.js (The Final, Corrected Version)

export function buildLeftDrawer() {
    const drawerContainer = document.querySelector('.left-drawer');
    if (!drawerContainer) {
        console.error("Build failed: Left drawer container not found.");
        return;
    }

    const membersData = [
        { iconClass: 'icon-users', text: 'Sarah' },
        { iconClass: 'icon-users', text: 'David' },
        { iconClass: 'icon-plus-circle', text: 'Invite Member' },
    ];

    const appActionsData = [
        { iconClass: 'icon-settings', text: 'Settings' },
        { iconClass: 'icon-help-circle', text: 'Help & Support' },
        { iconClass: 'icon-log-out', text: 'Logout' },
    ];

    // --- NEW, ROBUST LOGIC ---
    // Function to generate an HTML string for a list of items
    function generateListHTML(listData) {
        return listData.map(item => `
            <li>
                <a href="#" class="list-item">
                    <span class="svg-icon ${item.iconClass}"></span>
                    <span class="item-text">${item.text}</span>
                </a>
            </li>
        `).join(''); // .join('') concatenates all the list items into one string
    }

    // --- BUILD THE ENTIRE DRAWER HTML IN ONE GO ---
    drawerContainer.innerHTML = `
        <a href="#" class="drawer-card drawer-user-profile">
            <div class="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="user-info">
                <div class="user-name">Alex</div>
                <div class="user-email">alex@example.com</div>
                <div class="user-last-login">Last login: Today, 10:45 PM</div>
            </div>
            <span class="svg-icon icon-arrow-right profile-arrow"></span>
        </a>

        <a href="#" class="drawer-card home-switcher">
            <span class="svg-icon icon-home"></span>
            <div class="home-info">
                <div class="home-label">Current Home</div>
                <div class="home-name">Alex's House</div>
            </div>
            <span class="svg-icon icon-chevron-down"></span>
        </a>

        <hr class="gradient-divider">

        <ul class="management-group">
            <h4 class="list-title">Home Members</h4>
            ${generateListHTML(membersData)}
        </ul>

        <div class="app-actions">
            <hr class="gradient-divider">
            <ul class="management-group">
                ${generateListHTML(appActionsData)}
            </ul>
        </div>
    `;
}
