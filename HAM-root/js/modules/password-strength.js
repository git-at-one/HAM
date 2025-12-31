// /js/modules/password-strength.js

export function initPasswordFeatures() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;

    const togglePasswordButton = document.getElementById('toggle-password-button');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    const strengthIndicator = document.getElementById('strength-indicator');
    const requirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        lowercase: document.getElementById('req-lowercase'),
        number: document.getElementById('req-number'),
    };

    // Toggle password visibility
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            eyeIcon.classList.toggle('hidden', isPassword);
            eyeOffIcon.classList.toggle('hidden', !isPassword);
        });
    }

    // Check password strength
    const checks = {
        length: (p) => p.length >= 8,
        uppercase: (p) => /[A-Z]/.test(p),
        lowercase: (p) => /[a-z]/.test(p),
        number: (p) => /[0-9]/.test(p),
    };

    if (strengthIndicator) {
        const originalPlaceholder = passwordInput.placeholder;

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
                    if (isMet) {
                        metCount++;
                        requirements[key].classList.add('met');
                    } else {
                        requirements[key].classList.remove('met');
                    }
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

        passwordInput.addEventListener('blur', () => {
            const isValid = passwordInput.checkValidity();
            const isNotEmpty = passwordInput.value.length > 0;
            if (!isValid && isNotEmpty) {
                passwordInput.placeholder = "Password does not meet requirements";
            } else {
                passwordInput.placeholder = originalPlaceholder;
            }
        });

        passwordInput.addEventListener('focus', () => {
            passwordInput.placeholder = originalPlaceholder;
        });
    }
}
