const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const continueShoppingButton = document.getElementById('continue-shopping');
const checkoutButton = document.getElementById('checkout');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Render cart items
function renderCart() {
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.innerHTML = '';
        return;
    }

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
                </div>
                <p class="cart-item-total">Total: $${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    cartTotalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;

    // Add event listeners
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', handleQuantityChange);
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', handleRemoveItem);
    });
}

// Handle quantity change
function handleQuantityChange(event) {
    const index = parseInt(event.target.dataset.index);
    const action = event.target.dataset.action;

    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }

    saveCart();
    renderCart();
}

// Handle remove item
function handleRemoveItem(event) {
    const index = parseInt(event.target.dataset.index);
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Event listeners
continueShoppingButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

checkoutButton.addEventListener('click', () => {
    alert('Checkout functionality would be implemented here!');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});
