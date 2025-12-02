// Registration Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Individual Registration
    const individualRegBtn = document.getElementById('individualReg');
    if (individualRegBtn) {
        individualRegBtn.addEventListener('click', function() {
            // Redirect to Google Form for individual registration
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSerz2_p9jYqBZsNQFxlSkfz--C9CYLOufx5SSsGZI0Z0P-gSQ/viewform?usp=dialog', '_blank');
        });
    }
    
    // Collective Registration Modal
    const collectiveRegBtn = document.getElementById('collectiveReg');
    const collectiveModal = document.getElementById('collectiveModal');
    const closeModal = document.querySelector('.close');
    
    if (collectiveRegBtn && collectiveModal) {
        // Open modal when collective registration button is clicked
        collectiveRegBtn.addEventListener('click', function() {
            collectiveModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Close modal when X is clicked
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                collectiveModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target === collectiveModal) {
                collectiveModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && collectiveModal.style.display === 'block') {
                collectiveModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});