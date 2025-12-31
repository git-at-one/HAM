// /js/signup.js

import { initParticleAnimation } from './modules/particle-anim.js';
import { initPasswordFeatures } from './modules/password-strength.js';
import { initVisibilityToggle } from './modules/toggle-visibility.js'; // Import the new module

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features for the signup page
    initParticleAnimation('particle-canvas');
    initPasswordFeatures();
    
    // Use our reusable module for BOTH password fields
    initVisibilityToggle('toggle-password-button', 'password');
    initVisibilityToggle('toggle-confirm-password-button', 'confirm-password');

    // Add logic for password confirmation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('password-match-error');
    const signupForm = document.querySelector('.login-form');

    function validatePasswordConfirmation() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            errorMessage.textContent = "Passwords do not match.";
            confirmPasswordInput.setCustomValidity("Invalid"); // Mark field as invalid for the form
        } else {
            errorMessage.textContent = "";
            confirmPasswordInput.setCustomValidity(""); // Mark field as valid
        }
    }

    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', validatePasswordConfirmation);
        confirmPasswordInput.addEventListener('input', validatePasswordConfirmation);
    }

    if(signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent submission
            validatePasswordConfirmation(); // Final check on submit

            // checkValidity() will now be false if passwords don't match
            if (signupForm.checkValidity()) {
                console.log('Signup form is valid and ready to be submitted!');
                // Add logic here to send data to a server
            } else {
                console.log('Signup form is invalid.');
            }
        });
    }
});
