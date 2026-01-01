// /js/modules/ui-effects.js - Advanced UI Effects

/**
 * Adds a Material Design-style ripple effect to all elements with the 'ripple' class.
 */
export function initRippleEffects() {
    const rippleElements = document.querySelectorAll('.ripple');

    rippleElements.forEach(element => {
        element.addEventListener('click', function (e) {
            // Get click coordinates
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create the ripple span
            let ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Append, and then remove after the animation is done
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600); // Corresponds to the animation duration in the CSS
        });
    });
}
