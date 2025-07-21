document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Logic
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement; // This is the <html> tag

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // CAPTCHA Logic (Arithmetic)
    let num1, num2, correctAnswer;

    function generateCaptcha() {
        num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
        num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
        correctAnswer = num1 + num2;

        document.getElementById('captcha-num1').textContent = num1;
        document.getElementById('captcha-num2').textContent = num2;
        document.getElementById('captcha-input').value = ''; // Clear previous input
        document.getElementById('captcha-message').classList.add('hidden'); // Hide any previous messages
    }

    // Initialize Dark Mode on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (darkModeToggle) { // Ensure the button exists before attaching listener
        darkModeToggle.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }

    // Initialize CAPTCHA on page load
    generateCaptcha();

    const captchaSubmitBtn = document.getElementById('captcha-submit');
    const captchaInput = document.getElementById('captcha-input');
    const captchaMessage = document.getElementById('captcha-message');
    const captchaSection = document.getElementById('captcha-section');
    const contactInfo = document.getElementById('contact-info');
    const emailDisplaySpan = document.getElementById('email-display'); // Get the email display placeholder

    captchaSubmitBtn.addEventListener('click', () => {
        const userAnswer = parseInt(captchaInput.value, 10);

        if (userAnswer === correctAnswer) {
            captchaMessage.textContent = 'Verification successful! Contact information revealed.';
            captchaMessage.classList.remove('text-red-600', 'dark:text-red-400');
            captchaMessage.classList.add('text-green-600', 'dark:text-green-400');
            captchaMessage.classList.remove('hidden');

            // --- JAVASCRIPT FOR EMAIL OBFUSCATION
            const encodedUser = '4a616d6573412e4a6f7264616e';
            const encodedDomain = '686f746d61696c2e636f6d';

            function hexDecode(hex) {
                let str = '';
                for (let i = 0; i < hex.length; i += 2) {
                    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                }
                return str;
            }

            const user = hexDecode(encodedUser);
            const domain = hexDecode(encodedDomain);
            const emailAddress = user + '@' + domain;
            const emailLinkHtml = `<a href="mailto:${emailAddress}" class="text-blue-600 hover:underline dark:text-blue-400">${emailAddress}</a>`;
            emailDisplaySpan.innerHTML = emailLinkHtml;
            // --- END JAVASCRIPT ---

            captchaSection.classList.add('hidden'); // Hide CAPTCHA form
            contactInfo.classList.remove('hidden'); // Show contact info
            captchaSubmitBtn.disabled = true; // Optionally disable the button after success
            captchaInput.disabled = true; // Optionally disable input after success
        } else {
            captchaMessage.textContent = 'Incorrect answer. Please try again.';
            captchaMessage.classList.remove('text-green-600', 'dark:text-green-400');
            captchaMessage.classList.add('text-red-600', 'dark:text-red-400');
            captchaMessage.classList.remove('hidden');
            generateCaptcha(); // Regenerate CAPTCHA on incorrect attempt
            contactInfo.classList.add('hidden'); // Ensure contact info stays hidden on failure
        }
    });

    // Allow pressing Enter key to submit CAPTCHA
    captchaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            captchaSubmitBtn.click();
        }
    });
});