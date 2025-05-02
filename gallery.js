document.addEventListener('DOMContentLoaded', () => {
    // Gallery item data with descriptions
    const galleryData = [
        {
            id: 1,
            title: "Window to Memories",
            category: "Travel",
            image: "images/train-window.jpg",
            description: "Silhouettes against the sunset create a nostalgic moment as travelers gaze out of a train window, capturing the essence of journeys and memories made along the way.",
            date: "October 15, 2024",
            location: "Delhi, India",
            camera: "Sony Alpha A7 III"
        },
        {
            id: 2,
            title: "Urban Exploration",
            category: "Portrait",
            image: "images/placeholder1.jpg",
            description: "A portrait capturing the raw emotion and connection between urban environments and the human experience, highlighting the contrast between nature and city life.",
            date: "August 3, 2024",
            location: "Mumbai, India",
            camera: "Canon EOS R5"
        },
        {
            id: 3,
            title: "Serene Landscapes",
            category: "Nature",
            image: "images/placeholder2.jpg",
            description: "The tranquil beauty of untouched nature, where the harmony of elements creates a peaceful sanctuary away from the chaos of everyday life.",
            date: "July 22, 2024",
            location: "Himachal Pradesh, India",
            camera: "Nikon Z7 II"
        },
        {
            id: 4,
            title: "City Perspectives",
            category: "Architecture",
            image: "images/placeholder3.jpg",
            description: "Modern architectural marvels viewed from unique angles, showcasing the geometric precision and artistic vision behind urban design and development.",
            date: "September 5, 2024",
            location: "Bangalore, India",
            camera: "Fujifilm X-T4"
        },
        {
            id: 5,
            title: "Urban Wanderer",
            category: "Travel",
            image: "images/n1.png",
            description: "Exploring the urban landscape through a fresh perspective, finding beauty in the everyday city scenes that often go unnoticed.",
            date: "April 10, 2024",
            location: "Delhi, India",
            camera: "Sony Alpha A7 III"
        },
        {
            id: 6,
            title: "Natural Wonder",
            category: "Nature",
            image: "images/n2.jpg",
            description: "The breathtaking beauty of natural landscapes that remind us of the incredible diversity and majesty of our planet.",
            date: "March 15, 2024",
            location: "Uttarakhand, India",
            camera: "Canon EOS R6"
        },
        {
            id: 7,
            title: "Structural Beauty",
            category: "Architecture",
            image: "images/n3.jpg",
            description: "The elegant lines and forms of architectural design that showcase human creativity and engineering prowess.",
            date: "February 28, 2024",
            location: "Mumbai, India",
            camera: "Nikon Z6 II"
        },
        {
            id: 8,
            title: "Candid Moments",
            category: "Portrait",
            image: "images/n4.jpg",
            description: "Capturing authentic human expressions and emotions in unguarded moments that tell powerful stories.",
            date: "April 5, 2024",
            location: "Jaipur, India",
            camera: "Fujifilm X-T4"
        },
        {
            id: 9,
            title: "Wild Serenity",
            category: "Nature",
            image: "images/n5.jpg",
            description: "The peaceful coexistence of wildlife and landscape, showcasing the harmony of natural ecosystems.",
            date: "January 20, 2024",
            location: "Kaziranga, India",
            camera: "Sony Alpha A7R IV"
        },
        {
            id: 10,
            title: "Journey Highlights",
            category: "Travel",
            image: "images/n6.jpg",
            description: "Memorable moments from travels that capture the essence of discovery and adventure in new places.",
            date: "March 3, 2024",
            location: "Goa, India",
            camera: "Canon EOS R5"
        },
        {
            id: 11,
            title: "Urban Geometry",
            category: "Architecture",
            image: "images/n7.jpg",
            description: "The fascinating patterns and symmetry found in urban structures, revealing the mathematical precision in architectural design.",
            date: "February 12, 2024",
            location: "Bangalore, India",
            camera: "Nikon Z7 II"
        },
        {
            id: 12,
            title: "Human Expression",
            category: "Portrait",
            image: "images/n8.jpg",
            description: "The depth of human emotion captured in a single frame, revealing the complexity of the human experience.",
            date: "January 30, 2024",
            location: "Kolkata, India",
            camera: "Leica Q2"
        },
        {
            id: 13,
            title: "Earth's Canvas",
            category: "Nature",
            image: "images/n9.jpg",
            description: "Natural landscapes that appear as if painted by a master artist, showcasing the incredible palette of colors found in nature.",
            date: "April 18, 2024",
            location: "Ladakh, India",
            camera: "Sony Alpha A7 III"
        },
        {
            id: 14,
            title: "Destination Unknown",
            category: "Travel",
            image: "images/n10.jpg",
            description: "The thrill of exploring new destinations and the sense of wonder that comes with discovering unfamiliar places.",
            date: "March 25, 2024",
            location: "Varanasi, India",
            camera: "Canon EOS R6"
        },
        {
            id: 15,
            title: "Silent Stories",
            category: "Portrait",
            image: "images/n11.jpg",
            description: "Portraits that speak volumes without words, capturing the essence of the subject's character and life experiences.",
            date: "February 8, 2024",
            location: "Chennai, India",
            camera: "Fujifilm X-T4"
        },
        {
            id: 16,
            title: "Modern Designs",
            category: "Architecture",
            image: "images/n12.jpg",
            description: "Contemporary architectural innovations that push the boundaries of design and functionality in urban spaces.",
            date: "January 15, 2024",
            location: "Hyderabad, India",
            camera: "Nikon Z6 II"
        },
        {
            id: 17,
            title: "Natural Patterns",
            category: "Nature",
            image: "images/n13.jpg",
            description: "The intricate and mesmerizing patterns found in nature, from the microscopic to the grand landscape scale.",
            date: "April 2, 2024",
            location: "Kerala, India",
            camera: "Sony Alpha A7R IV"
        },
        {
            id: 18,
            title: "Wanderlust",
            category: "Travel",
            image: "images/n14.jpg",
            description: "The irresistible urge to explore and experience new places, captured in images that inspire adventure.",
            date: "March 10, 2024",
            location: "Rajasthan, India",
            camera: "Canon EOS R5"
        },
        {
            id: 19,
            title: "Character Study",
            category: "Portrait",
            image: "images/n15.jpg",
            description: "A deep exploration of personality and character through portraiture, revealing the unique qualities of the subject.",
            date: "February 22, 2024",
            location: "Pune, India",
            camera: "Leica Q2"
        },
        {
            id: 20,
            title: "Architectural Details",
            category: "Architecture",
            image: "images/n16.jpg",
            description: "The small but significant details in architectural design that contribute to the overall aesthetic and functional excellence.",
            date: "January 25, 2024",
            location: "Ahmedabad, India",
            camera: "Nikon Z7 II"
        },
        {
            id: 21,
            title: "Wilderness",
            category: "Nature",
            image: "images/n17.jpg",
            description: "The raw, untamed beauty of wild places that remain largely untouched by human influence.",
            date: "April 12, 2024",
            location: "Sundarbans, India",
            camera: "Sony Alpha A7 III"
        },
        {
            id: 22,
            title: "Travel Diary",
            category: "Travel",
            image: "images/n18.jpg",
            description: "Visual entries from a traveler's journal, documenting memorable experiences and discoveries along the journey.",
            date: "March 18, 2024",
            location: "Darjeeling, India",
            camera: "Canon EOS R6"
        },
        {
            id: 23,
            title: "Expressive Portrait",
            category: "Portrait",
            image: "images/n20.jpg",
            description: "A portrait that captures a powerful moment of emotional expression, revealing the depth of human feeling.",
            date: "February 15, 2024",
            location: "Lucknow, India",
            camera: "Fujifilm X-T4"
        }
    ];

    // Elements
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalCategory = document.querySelector('.modal-category');
    const modalDescription = document.querySelector('.modal-description p');
    const modalDate = document.querySelector('.metadata-item .date');
    const modalLocation = document.querySelector('.metadata-item .location');
    const modalCamera = document.querySelector('.metadata-item .camera');
    
    // Initialize Masonry layout
    function initMasonryLayout() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const isMobile = window.innerWidth <= 768;
        
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            
            // When image loads, adjust the grid row span based on image height
            img.onload = function() {
                // Only apply grid row span on desktop layout
                if (!isMobile) {
                    const height = this.getBoundingClientRect().height;
                    const rowSpan = Math.ceil(height / 10) + 2; // 10px grid rows + some margin
                    item.style.gridRowEnd = `span ${rowSpan}`;
                }
            };
            
            // If image is already cached, manually trigger onload
            if (img.complete) {
                img.onload();
            }
        });
    }
    
    // Filter gallery items with smooth transitions
    function filterGallery() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');
                const isMobile = window.innerWidth <= 768;
                
                // First, apply opacity transition to all items
                galleryItems.forEach(item => {
                    // Add transition class for smooth animation
                    item.classList.add('item-transition');
                    
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        // Show matching items
                        item.classList.remove('item-hidden');
                        item.classList.add('item-visible');
                    } else {
                        // Hide non-matching items
                        item.classList.remove('item-visible');
                        item.classList.add('item-hidden');
                    }
                });
                
                // After transition completes, update display property and layout
                setTimeout(() => {
                    galleryItems.forEach(item => {
                        if (item.classList.contains('item-hidden')) {
                            item.style.display = 'none';
                        } else {
                            item.style.display = isMobile ? 'block' : 'block';
                        }
                    });
                    
                    // Re-initialize masonry layout after filtering
                    initMasonryLayout();
                    
                    // Apply staggered reveal animation for visible items
                    const visibleItems = document.querySelectorAll('.gallery-item.item-visible');
                    visibleItems.forEach((item, index) => {
                        // Apply custom animation with staggered delay
                        item.style.animation = 'none'; // Reset animation
                        item.offsetHeight; // Trigger reflow
                        item.style.animation = `slideUpFade 0.6s ${index * 0.08}s cubic-bezier(0.19, 1, 0.22, 1) forwards`;
                        
                        // Ensure item is visible after animation
                        setTimeout(() => {
                            item.classList.add('item-visible');
                        }, 100 + (index * 80)); // Staggered timing
                    });
                    
                    // Add subtle animation to the filter buttons
                    const activeButton = document.querySelector('.filter-btn.active');
                    if (activeButton) {
                        activeButton.style.animation = 'none';
                        activeButton.offsetHeight;
                        activeButton.style.animation = 'pulse 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
                    }
                }, 300); // Match this to the CSS transition duration
            });
        });
    }
    
    // Open modal with image details
    function openModal(id, clickEvent) {
        const item = galleryData.find(data => data.id === id);
        
        if (item) {
            modalImage.src = item.image;
            modalImage.alt = item.title;
            modalTitle.textContent = item.title;
            modalCategory.textContent = item.category;
            modalDescription.textContent = item.description;
            modalDate.textContent = item.date;
            modalLocation.textContent = item.location;
            modalCamera.textContent = item.camera;
            
            // Position the modal near the clicked image
            const modalContainer = document.querySelector('.modal-container');
            
            // Get the clicked element's position
            const clickedRect = clickEvent.currentTarget.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Calculate position to show modal near the clicked image
            // Use the current scroll position plus the element's position
            const topPosition = scrollTop + clickedRect.top;
            
            // Apply the position to the modal container
            modalContainer.style.position = 'absolute';
            modalContainer.style.top = `${topPosition}px`;
            
            // Make sure the modal is fully visible
            setTimeout(() => {
                const modalRect = modalContainer.getBoundingClientRect();
                if (modalRect.bottom > window.innerHeight) {
                    // If modal extends beyond viewport, adjust position
                    const adjustment = modalRect.bottom - window.innerHeight + 20;
                    modalContainer.style.top = `${topPosition - adjustment}px`;
                }
                
                if (modalRect.top < 0) {
                    // If modal is above viewport, adjust position
                    modalContainer.style.top = `${scrollTop + 20}px`;
                }
            }, 0);
            
            modalOverlay.classList.add('active');
        }
    }
    
    // Close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        // No need to restore scrolling since we're not disabling it
    }
    
    // Add click event to gallery items
    function setupGalleryItemClicks() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (event) => {
                openModal(index + 1, event); // index + 1 to match with data IDs, pass the click event
            });
        });
    }
    
    // Close modal when clicking close button or outside the modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Initialize gallery
    function initGallery() {
        initMasonryLayout();
        filterGallery();
        setupGalleryItemClicks();
    }
    
    // Run initialization
    initGallery();
    
    // Reinitialize layout on window resize
    window.addEventListener('resize', initMasonryLayout);
});
