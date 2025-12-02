// Function to set theme based on system preference
function setThemeBasedOnSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        if (document.getElementById('themeIcon')) {
            document.getElementById('themeIcon').className = 'fas fa-sun';
        }
        if (document.getElementById('themeText')) {
            document.getElementById('themeText').textContent = 'Light Mode';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (document.getElementById('themeIcon')) {
            document.getElementById('themeIcon').className = 'fas fa-moon';
        }
        if (document.getElementById('themeText')) {
            document.getElementById('themeText').textContent = 'Dark Mode';
        }
    }
}

// Set initial theme based on system preference
setThemeBasedOnSystemPreference();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setThemeBasedOnSystemPreference();
});

// Toggle theme manually
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                document.getElementById('themeIcon').className = 'fas fa-moon';
                document.getElementById('themeText').textContent = 'Dark Mode';
            } else {
                document.body.classList.add('dark-mode');
                document.getElementById('themeIcon').className = 'fas fa-sun';
                document.getElementById('themeText').textContent = 'Light Mode';
            }
        });
    }
});

// Add animation to prize tables when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const prizeCategories = document.querySelectorAll('.prize-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    prizeCategories.forEach(category => {
        category.style.opacity = 0;
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(category);
    });
});