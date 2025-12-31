// /js/login.js

import { initParticleAnimation } from './modules/particle-anim.js';
import { initVisibilityToggle } from './modules/toggle-visibility.js'; // Import the new module

document.addEventListener('DOMContentLoaded', () => {
    initParticleAnimation('particle-canvas');
    
    // Use the reusable module for the login page's password field
    initVisibilityToggle('toggle-password-button', 'password');
    
    const loginForm = document.querySelector('.login-form');
    if(loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Login form submitted!');
        });
    }
});
