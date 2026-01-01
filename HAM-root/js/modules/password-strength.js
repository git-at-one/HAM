// /js/modules/password-strength.js (The Final, Corrected Version)

export function initPasswordFeatures() {
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('strength-indicator');
    const requirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        lowercase: document.getElementById('req-lowercase'),
        number: document.getElementById('req-number'),
    };

    // Exit gracefully if the main elements for this module aren't found.
    if (!passwordInput || !strengthIndicator) {
        console.warn("Password strength feature disabled: Required elements not found.");
        return;
    }

    // This module's ONLY job is to check password strength.
    const checks = {
        length: (p) => p.length >= 8,
        uppercase: (p) => /[A-Z]/.test(p),
        lowercase: (p) => /[a-z]/.test(p),
        number: (p) => /[0-9]/.test(p),
    };

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let metCount = 0;

        if (password.length === 0) {
            strengthIndicator.classList.remove('visible');
            Object.values(requirements).forEach(req => {
                if(req) req.classList.remove('met');
            });
            return;
        }

        for (const key in checks) {
            if (requirements[key]) {
                const isMet = checks[key](password);
                requirements[key].classList.toggle('met', isMet);
                if (isMet) metCount++;
            }
        }

        strengthIndicator.classList.add('visible');
        strengthIndicator.classList.remove('weak', 'good', 'strong');

        if (metCount <= 2) {
            strengthIndicator.textContent = 'Weak';
            strengthIndicator.classList.add('weak');
        } else if (metCount === 3) {
            strengthIndicator.textContent = 'Good';
            strengthIndicator.classList.add('good');
        } else {
            strengthIndicator.textContent = 'Strong';
            strengthIndicator.classList.add('strong');
        }
    });
}
