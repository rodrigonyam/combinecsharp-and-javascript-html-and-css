// API Configuration
const API_BASE_URL = window.location.origin + '/api';

// State Management
let products = [];
let cart = [];
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoriesContainer = document.getElementById('categoriesContainer');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const confirmationModal = document.getElementById('confirmationModal');
const closeConfirmation = document.getElementById('closeConfirmation');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initializing...');
    console.log('API Base URL:', API_BASE_URL);
    loadProducts();
    loadCategories();
    setupEventListeners();
    loadCartFromStorage();
    console.log('App initialized');
});

// Setup Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    closeCheckout.addEventListener('click', closeCheckoutModal);
    closeConfirmation.addEventListener('click', closeConfirmationModal);
    checkoutBtn.addEventListener('click', openCheckout);
    checkoutForm.addEventListener('submit', handleCheckout);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
        if (e.target === checkoutModal) closeCheckoutModal();
        if (e.target === confirmationModal) closeConfirmationModal();
    });
}

// Load Products from API
async function loadProducts(category = 'all') {
    currentCategory = category;
    productsGrid.innerHTML = '<div class="loading">Loading products...</div>';

    try {
        const url = category === 'all' 
            ? `${API_BASE_URL}/products` 
            : `${API_BASE_URL}/products?category=${category}`;
        
        console.log('Fetching from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        products = await response.json();
        console.log('Products loaded:', products.length);
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>Error loading products: ${error.message}</p>
                <p>Please ensure the API server is running.</p>
                <button onclick="loadProducts('${category}')" class="cta-btn" style="margin-top: 1rem;">
                    Retry
                </button>
            </div>`;
    }
}

// Search Products
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        loadProducts(currentCategory);
        return;
    }

    productsGrid.innerHTML = '<div class="loading">Searching...</div>';

    try {
        const response = await fetch(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) throw new Error('Search failed');
        
        const results = await response.json();
        displayProducts(results);
    } catch (error) {
        console.error('Error searching products:', error);
        productsGrid.innerHTML = `<div class="no-products">Search failed. Please try again.</div>`;
    }
}

// Display Products
function displayProducts(productsToDisplay) {
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found.</div>';
        return;
    }

    productsGrid.innerHTML = productsToDisplay.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x250?text=Product+Image'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-value">${product.rating.toFixed(1)}</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add intersection observer for scroll animations
    observeProducts();
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (halfStar) stars += '☆';
    return stars;
}

// Load Categories
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Display Categories
function displayCategories(categories) {
    const categoryButtons = categories.map(category => `
        <button class="category-btn" data-category="${category}" onclick="filterByCategory('${category}')">
            ${category}
        </button>
    `).join('');

    categoriesContainer.innerHTML = `
        <button class="category-btn active" data-category="all" onclick="filterByCategory('all')">
            All Products
        </button>
        ${categoryButtons}
    `;
}

// Filter Products by Category
function filterByCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Clear search
    searchInput.value = '';
    
    // Load products
    loadProducts(category);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl
        });
    }

    updateCartCount();
    saveCartToStorage();
    
    // Animate cart button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('pulse');
    setTimeout(() => cartBtn.classList.remove('pulse'), 600);
    
    // Animate the add to cart button
    const addBtn = event.target;
    addBtn.classList.add('added');
    const originalText = addBtn.textContent;
    addBtn.textContent = '✓ Added!';
    setTimeout(() => {
        addBtn.classList.remove('added');
        addBtn.textContent = originalText;
    }, 1000);
    
    showNotification('🎉 Product added to cart!');
    createFloatingEmoji('🛒', event.clientX, event.clientY);
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Open Cart Modal
function openCart() {
    displayCartItems();
    cartModal.classList.add('active');
}

// Close Cart Modal
function closeCartModal() {
    cartModal.classList.remove('active');
}

// Display Cart Items
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '$0.00';
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.imageUrl}" alt="${item.productName}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80?text=Product'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.productName}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.productId}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.productId}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.productId})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.productId === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCartCount();
    displayCartItems();
    saveCartToStorage();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartCount();
    displayCartItems();
    saveCartToStorage();
}

// Open Checkout
function openCheckout() {
    if (cart.length === 0) return;

    displayCheckoutSummary();
    closeCartModal();
    checkoutModal.classList.add('active');
}

// Close Checkout Modal
function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
}

// Display Checkout Summary
function displayCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.productName} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle Checkout
async function handleCheckout(e) {
    e.preventDefault();

    const order = {
        customerName: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        address: document.getElementById('customerAddress').value,
        items: cart
    };

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) throw new Error('Order failed');

        const confirmedOrder = await response.json();
        
        // Clear cart
        cart = [];
        updateCartCount();
        saveCartToStorage();

        // Show confirmation
        closeCheckoutModal();
        showOrderConfirmation(confirmedOrder.id);

        // Reset form
        checkoutForm.reset();

    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    }
}

// Show Order Confirmation
function showOrderConfirmation(orderId) {
    document.getElementById('orderId').textContent = `#${orderId}`;
    confirmationModal.classList.add('active');
}

// Close Confirmation Modal
function closeConfirmationModal() {
    confirmationModal.classList.remove('active');
}

// Save Cart to Local Storage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Show Notification
function showNotification(message) {
    // Simple notification - could be enhanced with a toast library
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating emoji animation
function createFloatingEmoji(emoji, x, y) {
    const emojiEl = document.createElement('div');
    emojiEl.textContent = emoji;
    emojiEl.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 1.5s ease-out forwards;
    `;
    document.body.appendChild(emojiEl);
    
    const floatAnimation = document.createElement('style');
    floatAnimation.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-150px) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatAnimation);
    
    setTimeout(() => {
        emojiEl.remove();
        floatAnimation.remove();
    }, 1500);
}

// Intersection Observer for scroll animations
function observeProducts() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #0066cc, #00a86b);
        width: 0%;
        z-index: 1001;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });
}

// Add typing effect to search input
function addSearchPlaceholderAnimation() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const placeholders = [
        'Search medical equipment...',
        'Find syringes, gloves...',
        'Search lab supplies...',
        'Find pharmacy items...',
        'Search temperature monitors...'
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = placeholders[currentIndex];
        
        if (document.activeElement === searchInput) {
            return;
        }
        
        if (!isDeleting && charIndex <= currentText.length) {
            searchInput.placeholder = currentText.substring(0, charIndex);
            charIndex++;
        } else if (isDeleting && charIndex >= 0) {
            searchInput.placeholder = currentText.substring(0, charIndex);
            charIndex--;
        }
        
        if (charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % placeholders.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    setTimeout(typeEffect, 1000);
}

// Add smooth cart count animation
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cartCount');
    
    // Animate the number change
    const currentCount = parseInt(countElement.textContent) || 0;
    if (currentCount !== totalItems) {
        countElement.style.transform = 'scale(1.5)';
        countElement.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            countElement.textContent = totalItems;
            countElement.style.transform = 'scale(1)';
        }, 150);
    }
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Press 'S' to focus search
        if (e.key === 's' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Press 'C' to open cart
        if (e.key === 'c' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            openCart();
        }
        
        // Press 'Escape' to close modals
        if (e.key === 'Escape') {
            closeCartModal();
            closeCheckoutModal();
            closeConfirmationModal();
        }
    });
}

// Add product quick view on card click
function addProductQuickView() {
    document.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        if (productCard && !e.target.classList.contains('add-to-cart-btn')) {
            productCard.style.animation = 'none';
            setTimeout(() => {
                productCard.style.animation = '';
            }, 10);
        }
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    addScrollProgress();
    addParallaxEffect();
    addSearchPlaceholderAnimation();
    addKeyboardShortcuts();
    addProductQuickView();
    initScrollToTop();
});

// Scroll to top button functionality
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}
