// Countdown timer
// Countdown timer
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Exit if countdown elements don't exist on this page
    if (!daysElement && !hoursElement && !minutesElement && !secondsElement) return;
    
    const eventDate = new Date('October 19, 2025 06:00:00').getTime();
    
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdownFunction);
            if (daysElement) daysElement.innerHTML = '00';
            if (hoursElement) hoursElement.innerHTML = '00';
            if (minutesElement) minutesElement.innerHTML = '00';
            if (secondsElement) secondsElement.innerHTML = '00';
            
            // Optional: Display a message when countdown completes
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = '<div class="countdown-complete">Event has started!</div>';
            }
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the elements if they exist
        if (daysElement) daysElement.innerHTML = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');
    }, 1000);
});