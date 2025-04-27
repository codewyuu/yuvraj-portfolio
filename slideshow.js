// Slideshow functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slideshow-track');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || !slides.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Initialize slideshow
    function initSlideshow() {
        // Set initial active slide
        updateSlidePosition();
        
        // Add event listeners
        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);
        
        // Add indicator click events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateSlidePosition();
                updateIndicators();
            });
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(showNextSlide, 5000);
    }
    
    // Update slide position based on current index
    function updateSlidePosition() {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        slides[currentIndex].classList.add('active');
        
        // Calculate the transform value to center the active slide
        const slideWidth = slides[0].offsetWidth;
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Show previous slide
    function showPreviousSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlidePosition();
        updateIndicators();
    }
    
    // Show next slide
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlidePosition();
        updateIndicators();
    }
    
    // Initialize the slideshow
    initSlideshow();
    
    // Add touch swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    
    slideshowWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slideshowWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX) {
            // Swipe left - show next slide
            showNextSlide();
        } else if (touchEndX > touchStartX) {
            // Swipe right - show previous slide
            showPreviousSlide();
        }
    }
});
