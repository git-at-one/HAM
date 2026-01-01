// /js/modules/toggle-visibility.js (The Final, Corrected Version)

/**
 * Initializes the password visibility toggle feature for a given input field.
 * @param {string} toggleButtonId - The ID of the button/span that contains the icon.
 * @param {string} passwordInputId - The ID of the password input field to be controlled.
 */
export function initVisibilityToggle(toggleButtonId, passwordInputId) {
    const toggleButton = document.getElementById(toggleButtonId);
    const passwordInput = document.getElementById(passwordInputId);

    if (!toggleButton || !passwordInput) {
        // Silently exit if the required elements aren't on the page.
        return;
    }

    // Find the single icon element by its base class '.svg-icon'.
    const icon = toggleButton.querySelector('.svg-icon');

    if (!icon) {
        // Add a clear error message in case the icon is missing from the HTML.
        console.error(`No icon with class '.svg-icon' found inside button with ID: ${toggleButtonId}`);
        return;
    }

    toggleButton.addEventListener('click', () => {
        // This part toggles the password's visibility (text vs. password).
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        // This part now correctly flips the icon by swapping its class.
        if (isPassword) {
            // We are switching TO text, so show the "eye-off" icon.
            icon.classList.remove('eye-on');
            icon.classList.add('eye-off');
        } else {
            // We are switching BACK to password, so show the "eye-on" icon.
            icon.classList.remove('eye-off');
            icon.classList.add('eye-on');
        }
    });
}
