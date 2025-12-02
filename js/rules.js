// Rules page tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.rules-content');
    
    if (tabs.length > 0 && contents.length > 0) {
        // Show the first tab content by default
        if (tabs[0] && contents[0]) {
            tabs[0].classList.add('active');
            contents[0].classList.add('active');
        }
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                const targetContentId = `${tabName}-content`;
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                
                const targetContent = document.getElementById(targetContentId);
                if (targetContent) {
                    targetContent.classList.add('active');
                } else {
                    console.error(`Content element with ID '${targetContentId}' not found`);
                }
            });
        });
    }
});