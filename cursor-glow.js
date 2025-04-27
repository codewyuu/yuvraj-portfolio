// Cursor background glow effect
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor glow element
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    
    // Get the container element - this is our target area
    const container = document.querySelector('.container');
    
    // Add the cursor glow inside the container instead of body for proper clipping
    if (container) {
        container.appendChild(cursorGlow);
        
        // Make sure the container can properly contain the glow
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
        
        // Ensure overflow is hidden
        container.style.overflow = 'hidden';
    } else {
        document.body.appendChild(cursorGlow);
    }
    
    // Helper function to check if an element is interactive (should not show glow)
    function isInteractiveElement(element) {
        if (!element) return false;
        
        return (
            element.tagName === 'IMG' || 
            element.tagName === 'INPUT' || 
            element.tagName === 'BUTTON' ||
            element.tagName === 'A' ||
            element.tagName === 'TEXTAREA' ||
            element.classList.contains('email-form') ||
            element.classList.contains('image-container') ||
            element.id === 'profile-image' ||
            element.id === 'email-input' ||
            element.closest('.paper-plane-btn') ||
            element.closest('.email-form')
        );
    }
    
    // Variables to track mouse position and movement
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let speed = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let isInsideContainer = false;
    let containerRect = container ? container.getBoundingClientRect() : null;
    
    // Calculate glow size to be half the container width if available
    function calculateGlowSize() {
        if (container) {
            const containerWidth = containerRect.width;
            // Double the original size (which was half container width)
            return Math.min(containerWidth, 700); // Double the previous limit (350 -> 700)
        } else {
            const viewportWidth = window.innerWidth;
            return viewportWidth; // Double the previous size (was viewportWidth/2)
        }
    }
    
    // Apply initial size
    let baseGlowSize = calculateGlowSize();
    cursorGlow.style.width = `${baseGlowSize}px`;
    cursorGlow.style.height = `${baseGlowSize}px`;
    
    // Check if point is inside container
    function isPointInsideContainer(x, y) {
        if (!container) return false;
        
        // Update container rect in case it moved or resized
        containerRect = container.getBoundingClientRect();
        
        // Add a small margin to make detection smoother
        const margin = 5;
        return (
            x >= containerRect.left + margin &&
            x <= containerRect.right - margin &&
            y >= containerRect.top + margin &&
            y <= containerRect.bottom - margin
        );
    }
    
    // Convert global coordinates to container-relative coordinates
    function getRelativeCoordinates(x, y) {
        if (!container || !containerRect) return { x, y };
        
        return {
            x: x - containerRect.left,
            y: y - containerRect.top
        };
    }
    
    // Update mouse position on move with container-relative coordinates
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse movement speed for dynamic glow size
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        speed = Math.sqrt(dx * dx + dy * dy) * 0.5;
        speed = Math.min(speed, 40); // Limit maximum speed effect
        
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        
        // Check if mouse is inside container
        isInsideContainer = isPointInsideContainer(e.clientX, e.clientY);
        
        // Only show glow when mouse is over the container but not over any of its interactive children
        if (isInsideContainer && container) {
            // Check if we're hovering over an interactive element
            const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
            
            // Only show glow if not over an interactive element
            if (!isInteractiveElement(elementUnderCursor)) {
                cursorGlow.style.opacity = '0.4';
                
                // Convert to container-relative coordinates
                const relativeCoords = getRelativeCoordinates(e.clientX, e.clientY);
                mouseX = relativeCoords.x;
                mouseY = relativeCoords.y;
            } else {
                cursorGlow.style.opacity = '0';
            }
        } else {
            cursorGlow.style.opacity = '0';
        }
    });
    
    // Hide glow when mouse stops moving
    let moveTimer;
    document.addEventListener('mousemove', (e) => {
        if (isInsideContainer) {
            // Only handle this for elements that should show the glow
            const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
            
            if (!isInteractiveElement(elementUnderCursor)) {
                clearTimeout(moveTimer);
                moveTimer = setTimeout(() => {
                    cursorGlow.style.opacity = '0.2';
                }, 100);
            }
        }
    });
    
    // Hide glow when mouse leaves container
    if (container) {
        container.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }
    
    // Hide glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    // Recalculate base size on window resize
    window.addEventListener('resize', () => {
        if (container) {
            containerRect = container.getBoundingClientRect();
        }
        baseGlowSize = calculateGlowSize();
    });
    
    // Animation loop for smooth cursor glow following
    function animateCursorGlow() {
        // Calculate smooth movement with easing
        const easeFactor = 0.08;
        currentX += (mouseX - currentX) * easeFactor;
        currentY += (mouseY - currentY) * easeFactor;
        
        // Dynamic glow size based on cursor speed
        const sizeChange = speed * 1.5;
        const currentSize = baseGlowSize + sizeChange;
        
        // Update cursor glow position and size
        // Use absolute positioning relative to container
        cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        cursorGlow.style.width = `${currentSize}px`;
        cursorGlow.style.height = `${currentSize}px`;
        
        // Reduce speed over time for smooth effect
        speed *= 0.95;
        
        // Continue animation loop
        requestAnimationFrame(animateCursorGlow);
    }
    
    // Start animation
    animateCursorGlow();
}); 