const addToCartButton = document.getElementById('add-to-cart-btn');
const cartCountElement = document.getElementById('cart-count');

let cartCount = 0;

function addToCart() {
    cartCount += 1;
    cartCountElement.textContent = cartCount;

    // Visual feedback: flash the cart count
    cartCountElement.style.backgroundColor = '#ffff00';
    setTimeout(() => {
        cartCountElement.style.backgroundColor = '';
    }, 500);

    console.log(`Item added. Total items in cart: ${cartCount}`);
}

addToCartButton.addEventListener('click', addToCart);
