document.addEventListener('DOMContentLoaded', function() {
    const randomPill = document.getElementById('random-content-pill');
    const contentItems = document.querySelectorAll('.content-item');
    
    // Define categories
    const categories = [
        { name: 'surprise me', filter: null },
        { name: 'tech', filter: 'tech' },
        { name: 'music', filter: 'music' },
        { name: 'vid essay', filter: 'vid-essay' },
        { name: 'movie', filter: 'movie' },
        { name: 'anime', filter: 'anime' },
        { name: 'game', filter: 'game' },
        { name: 'manga', filter: 'manga' },
        { name: 'tv', filter: 'tv' }
    ];
    
    let currentCategoryIndex = 0;
    
    // Show all content initially
    showAllContent();
    
    // Add click event to random pill
    randomPill.addEventListener('click', function() {
        // Move to next category (cycling through the array)
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        const currentCategory = categories[currentCategoryIndex];
        
        // Update pill text
        this.textContent = currentCategory.name;
        
        // Filter content based on category
        if (currentCategory.filter === null) {
            // For 'surprise me', show random selection
            showRandomContent();
        } else {
            // For specific categories, filter by that category
            filterByCategory(currentCategory.filter);
        }
    });
    
    function showAllContent() {
        contentItems.forEach(item => {
            item.style.display = 'flex';
        });
    }
    
    function filterByCategory(category) {
        contentItems.forEach(item => {
            if (item.getAttribute('data-category').includes(category)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    function showRandomContent() {
        // Hide all items first
        contentItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Get all items as array
        const itemsArray = Array.from(contentItems);
        
        // Shuffle array
        const shuffled = itemsArray.sort(() => 0.5 - Math.random());
        
        // Get random number between 5 and 10
        const randomCount = Math.floor(Math.random() * 6) + 5;
        
        // Take first n items and show them
        shuffled.slice(0, randomCount).forEach(item => {
            item.style.display = 'flex';
        });
    }
});
