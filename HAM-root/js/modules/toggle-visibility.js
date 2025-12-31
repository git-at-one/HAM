// /js/modules/toggle-visibility.js

/**
 * Initializes the password visibility toggle feature for a given input field.
 * @param {string} toggleButtonId - The ID of the button/span that contains the eye icons.
 * @param {string} passwordInputId - The ID of the password input field to be controlled.
 */
export function initVisibilityToggle(toggleButtonId, passwordInputId) {
    const toggleButton = document.getElementById(toggleButtonId);
    const passwordInput = document.getElementById(passwordInputId);

    // Exit if the necessary elements don't exist on the page
    if (!toggleButton || !passwordInput) {
        return;
    }

    const eyeIcon = toggleButton.querySelector('#eye-icon');
    const eyeOffIcon = toggleButton.querySelector('#eye-off-icon');

    toggleButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        // Toggle the visibility of the two SVG icons
        if (eyeIcon && eyeOffIcon) {
            eyeIcon.classList.toggle('hidden', isPassword);
            eyeOffIcon.classList.toggle('hidden', !isPassword);
        }
    });
}
