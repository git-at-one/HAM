// /js/signup.js (The Final, Corrected Version)

import { initParticleAnimation } from './modules/particle-anim.js';
import { initPasswordFeatures } from './modules/password-strength.js';
import { initVisibilityToggle } from './modules/toggle-visibility.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Signup page script started.");

    // --- Initialize UI Features ---
    try {
        initParticleAnimation('particle-canvas');
        console.log("SUCCESS: Particle animation initialized.");

        // This is a likely source of a hidden error.
        // If this function fails, the script might stop.
        initPasswordFeatures();
        console.log("SUCCESS: Password features initialized.");

        // Initialize the visibility toggle for the FIRST password field
        initVisibilityToggle('toggle-password-button', 'password');
        console.log("SUCCESS: Toggle initialized for 'password'.");

        // Initialize the visibility toggle for the SECOND password field
        initVisibilityToggle('toggle-confirm-password-button', 'confirm-password');
        console.log("SUCCESS: Toggle initialized for 'confirm-password'.");

    } catch (error) {
        console.error("An error occurred during UI initialization:", error);
    }

    // --- Initialize Form Validation Logic ---
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('password-match-error');
    
    // THIS IS THE FIX: Use the correct ID to select the form.
    const signupForm = document.getElementById('signup-form');

    if (!signupForm) {
        console.error("CRITICAL: Could not find form with ID 'signup-form'.");
        return; // Stop if the form doesn't exist.
    }

    function validatePasswordConfirmation() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage.textContent = "Passwords do not match.";
            confirmPasswordInput.setCustomValidity("Invalid");
        } else {
            errorMessage.textContent = "";
            confirmPasswordInput.setCustomValidity("");
        }
    }

    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', validatePasswordConfirmation);
        confirmPasswordInput.addEventListener('input', validatePasswordConfirmation);
    }

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        validatePasswordConfirmation();

        if (signupForm.checkValidity()) {
            console.log('Form is valid! (Submission logic would go here)');
            alert('Form is valid!');
        } else {
            console.log('Form is invalid. Please check fields.');
        }
    });

    console.log("Signup page script finished successfully.");
});
