// 1. Get references to the HTML elements we need to interact with
const addToCartButton = document.getElementById('add-to-cart-btn');
const cartCountElement = document.getElementById('cart-count');

// 2. Initialize a variable to track the cart quantity (this is like a simple 'state')
let cartCount = 0;

// 3. Define the function that runs when the button is clicked
function addToCart() {
    // 3a. Increment the count
    cartCount = cartCount + 1;
    
    // 3b. Update the text displayed on the page (DOM manipulation)
    cartCountElement.textContent = cartCount;

    // Optional: Provide user feedback
    console.log(`Item added. Total items in cart: ${cartCount}`);
    alert('Product X added to cart!');
}

// 4. Attach the function to the button's 'click' event
addToCartButton.addEventListener('click', addToCart);

// **How this fits together:**
// The 'click' event listener is the *trigger*.
// The 'addToCart' function is the *action* (the logic).
// The 'cartCountElement.textContent = cartCount;' is the *update* to the UI.