const cartCountElement = document.getElementById('cart-count');
const productContainer = document.getElementById('product-container');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Fetch products from API and render them
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Render products dynamically
function renderProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart-button" data-product-id="${product._id}" aria-label="Add ${product.name} to cart">
                Add to Cart
            </button>
        `;
        productContainer.appendChild(productCard);
    });

    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = event.target.dataset.productId;
    const productCard = event.target.parentElement;
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
    const productImage = productCard.querySelector('.product-image').src;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Visual feedback: flash the cart count
    cartCountElement.style.backgroundColor = '#ffff00';
    setTimeout(() => {
        cartCountElement.style.backgroundColor = '';
    }, 500);

    console.log(`Item added: ${productName}. Total items in cart: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`);
}

// Make cart icon clickable to go to cart page
cartCountElement.parentElement.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    fetchProducts();
});
