// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle intro video animation
    const introAnimation = document.getElementById('intro-animation');
    const introVideo = document.getElementById('intro-video');
    
    // Function to hide the intro animation with a smooth fade effect
    function hideIntroAnimation() {
        // First apply the fade-out effect to the video
        introVideo.classList.add('fade-out');
        
        // After the video fade effect starts, begin fading out the entire container
        setTimeout(() => {
            introAnimation.classList.add('hidden');
        }, 600);
    }
    
    // Play the intro video
    if (introVideo) {
        // Play the video
        introVideo.play().catch(error => {
            console.error('Error playing intro video:', error);
            // If video can't play, hide the animation immediately
            hideIntroAnimation();
        });
        
        // When video ends, trigger the fade effect and hide animation
        introVideo.addEventListener('ended', hideIntroAnimation);
        
        // Prepare main content for a smooth reveal after video ends
        const container = document.querySelector('.container');
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            container.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            // Listen for when the intro animation is fully hidden
            introAnimation.addEventListener('transitionend', () => {
                if (introAnimation.classList.contains('hidden')) {
                    // Reveal the main content with a smooth animation
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }
            });
        }
    }
    
    // Add a subtle fade-in effect for the content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.8s ease-in-out';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }
    
    // Cursor trail effect
    const trailCount = 5; // Number of trail elements
    const trails = [];
    let isMoving = false;
    let movingTimeout;
    let mouseX = 0;
    let mouseY = 0;
    
    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = 0;
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            size: 8 - (i * 1.2), // Decreasing size for each trail element
            alpha: 0.5 - (i * 0.08), // Decreasing opacity for each trail element
            delay: i * 40 // Delay for each trail element
        });
    }
    
    // Update trail positions on mouse move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        clearTimeout(movingTimeout);
        
        // Set timeout to detect when movement stops
        movingTimeout = setTimeout(() => {
            isMoving = false;
            trails.forEach(trail => {
                setTimeout(() => {
                    trail.element.style.opacity = 0;
                }, trail.delay);
            });
        }, 100);
    });
    
    // Animation loop for smoother trail movement
    function animateTrails() {
        if (isMoving) {
            trails.forEach((trail, index) => {
                // Calculate position with easing
                trail.x += (mouseX - trail.x) * (0.3 - index * 0.05);
                trail.y += (mouseY - trail.y) * (0.3 - index * 0.05);
                
                // Update trail element
                trail.element.style.opacity = trail.alpha;
                trail.element.style.transform = `translate(${trail.x - trail.size / 2}px, ${trail.y - trail.size / 2}px)`;
                trail.element.style.width = `${trail.size}px`;
                trail.element.style.height = `${trail.size}px`;
                trail.element.style.filter = `blur(${index * 0.5}px)`;
            });
        }
        
        requestAnimationFrame(animateTrails);
    }
    
    // Start the animation loop
    animateTrails();
    
    // Click effect - Keep the smaller size but with blue theme
    document.addEventListener('click', (e) => {
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        
        // Position the effect at the click coordinates
        clickEffect.style.top = `${e.clientY - 15}px`;
        clickEffect.style.left = `${e.clientX - 15}px`;
        clickEffect.style.width = '30px';
        clickEffect.style.height = '30px';
        clickEffect.style.borderWidth = '1px';
        clickEffect.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
        
        document.body.appendChild(clickEffect);
        
        // Remove the effect element after animation completes
        setTimeout(() => {
            clickEffect.remove();
        }, 600);
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        updateThemeIcon(savedTheme === 'light-mode');
    }
    
    // Toggle between dark and light mode
    themeToggle.addEventListener('click', () => {
        const isLightMode = document.body.classList.contains('light-mode');
        
        if (isLightMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon(false);
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon(true);
        }
    });
    
    // Update the theme icon based on current mode
    function updateThemeIcon(isLightMode) {
        if (isLightMode) {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
    
    // Initialize and update the clock
    const clockElement = document.getElementById('clock');
    
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        
        // Add leading zeros if needed
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        // Update the clock element
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Update the clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize Spotify Now Playing
    initSpotify();
    
    // Add click event listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clicked on:', link.textContent);
        });
    });
    
    // Email submission handling
    const emailForm = document.querySelector('.email-form');
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-email');
    const flyingPlaneContainer = document.querySelector('.flying-plane-container');
    const flyingPlane = document.querySelector('.flying-plane');
    
    submitButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        
        if (isValidEmail(email)) {
            console.log('Email submitted:', email);
            emailInput.value = '';
            
            // Show and animate the flying paper plane
            flyingPlaneContainer.classList.add('show');
            flyingPlane.classList.add('animate');
            
            // Reset the animation after it completes
            setTimeout(() => {
                flyingPlaneContainer.classList.remove('show');
                flyingPlane.classList.remove('animate');
            }, 1500);
        } else {
            console.log('Invalid email format');
            emailInput.focus();
        }
    });
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Spotify integration
function initSpotify() {
    const spotifyContainer = document.getElementById('spotify-container');
    const spotifyNowPlaying = document.getElementById('spotify-now-playing');
    
    // Enhanced track list with Spotify URLs
    const tracks = [
        { 
            name: "Bohemian Rhapsody", 
            artist: "Queen", 
            url: "https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J"
        },
        { 
            name: "Blinding Lights", 
            artist: "The Weeknd", 
            url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
        },
        { 
            name: "Shape of You", 
            artist: "Ed Sheeran", 
            url: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3"
        },
        { 
            name: "Bad Guy", 
            artist: "Billie Eilish", 
            url: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m"
        },
        { 
            name: "Uptown Funk", 
            artist: "Mark Ronson ft. Bruno Mars", 
            url: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS"
        },
        { 
            name: "Starboy", 
            artist: "The Weeknd, Daft Punk", 
            url: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"
        },
        { 
            name: "Levitating", 
            artist: "Dua Lipa", 
            url: "https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP"
        },
        { 
            name: "Watermelon Sugar", 
            artist: "Harry Styles", 
            url: "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY"
        },
        { 
            name: "Stay", 
            artist: "The Kid LAROI, Justin Bieber", 
            url: "https://open.spotify.com/track/5HCyWlXZPP0y6Gqq8TgA20"
        },
        { 
            name: "Montero (Call Me By Your Name)", 
            artist: "Lil Nas X", 
            url: "https://open.spotify.com/track/1SC5rEoYDGUK4NfG82494W"
        },
        { 
            name: "drivers license", 
            artist: "Olivia Rodrigo", 
            url: "https://open.spotify.com/track/7lPN2DXiMsVn7XUKtOW1CS"
        },
        { 
            name: "Save Your Tears", 
            artist: "The Weeknd", 
            url: "https://open.spotify.com/track/5QO79kh1waicV47BqGRL3g"
        },
        { 
            name: "Peaches", 
            artist: "Justin Bieber", 
            url: "https://open.spotify.com/track/4iJyoBOLtHqaGxP12qzhQI"
        },
        { 
            name: "Don't Start Now", 
            artist: "Dua Lipa", 
            url: "https://open.spotify.com/track/3PfIrDoz19wz7qK7tYeu62"
        },
        { 
            name: "Shivers", 
            artist: "Ed Sheeran", 
            url: "https://open.spotify.com/track/75MNhvTCCKsST3YqqUiU9r"
        }
    ];
    
    // Keep track of the current song
    let currentTrack = null;
    
    function updateSpotifyStatus() {
        // Simulate API call with 70% chance of playing
        const isPlaying = Math.random() > 0.3;
        
        if (isPlaying) {
            // Select a random track
            currentTrack = tracks[Math.floor(Math.random() * tracks.length)];
            spotifyNowPlaying.textContent = `${currentTrack.name} - ${currentTrack.artist}`;
            
            // Make the container clickable
            spotifyContainer.style.cursor = 'pointer';
            
            // Add scrolling effect if text is too long
            if (spotifyNowPlaying.scrollWidth > spotifyContainer.clientWidth) {
                spotifyNowPlaying.classList.add('scrolling');
            } else {
                spotifyNowPlaying.classList.remove('scrolling');
            }
        } else {
            currentTrack = null;
            spotifyNowPlaying.textContent = "Not playing";
            spotifyNowPlaying.classList.remove('scrolling');
            spotifyContainer.style.cursor = 'default';
        }
    }
    
    // Add click event to open the Spotify link
    spotifyContainer.addEventListener('click', () => {
        if (currentTrack && currentTrack.url) {
            window.open(currentTrack.url, '_blank');
        }
    });
    
    // Update initially and then every 30 seconds
    updateSpotifyStatus();
    setInterval(updateSpotifyStatus, 30000);
}

// For a real implementation, you would need these additional functions:
/*
function authenticateWithSpotify() {
    // Redirect to Spotify authorization page or handle token exchange
}

async function getCurrentlyPlaying(accessToken) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        if (response.status === 204) {
            return null; // No track currently playing
        }
        
        const data = await response.json();
        return {
            name: data.item.name,
            artist: data.item.artists.map(artist => artist.name).join(', '),
            albumArt: data.item.album.images[0].url,
            isPlaying: data.is_playing
        };
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        return null;
    }
}
*/ 