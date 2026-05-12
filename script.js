// =============================================
//  Theme Toggle — Sun / Moon
//  Matches your .theme-dark system
// =============================================

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Get saved theme or system preference
function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('theme-dark');
        html.classList.remove('theme-light');
        themeToggle.checked = true;
    } else {
        html.classList.remove('theme-dark');
        html.classList.add('theme-light');   // explicit light class for the media query override
        themeToggle.checked = false;
    }
}

// Initialize
function initTheme() {
    const preferred = getPreferredTheme();
    applyTheme(preferred);
}

// Toggle
function toggleTheme() {
    const isDark = html.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Setup
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    themeToggle.addEventListener('change', toggleTheme);

    // Keyboard support for the theme switch label
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.checked = !themeToggle.checked;
                toggleTheme();
            }
        });
    }

    // Listen to system changes (only if user hasn't manually chosen)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});