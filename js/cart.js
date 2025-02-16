let cart = [];

const addToCart = (productId) => {
  // Fetch the product details from products.json or the API
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      
      if (!product) return;

      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(item => item.id === productId);

      if (existingProductIndex > -1) {
        // Update quantity if already in cart
        cart[existingProductIndex].quantity++;
      } else {
        // Add product to cart
        cart.push({ ...product, quantity: 1 });
      }
      
      updateCart();
    });
};

const updateCart = () => {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = `Cart: ${cart.length}`;

  const checkoutSection = document.getElementById('checkout');
  checkoutSection.innerHTML = '<h2>Cart Summary</h2>';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price} x ${item.quantity}</p>
      <button onclick="updateQuantity(${item.id}, -1)">-</button>
      <button onclick="updateQuantity(${item.id}, 1)">+</button>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    checkoutSection.appendChild(cartItem);
  });

  checkoutSection.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
  checkoutSection.innerHTML += `<button onclick="clearCart()">Clear Cart</button>`;
};

const updateQuantity = (productId, change) => {
  const productIndex = cart.findIndex(item => item.id === productId);
  
  if (productIndex > -1) {
    const updatedQuantity = cart[productIndex].quantity + change;
    
    if (updatedQuantity <= 0) return;
    
    cart[productIndex].quantity = updatedQuantity;
    updateCart();
  }
};

const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
};

const clearCart = () => {
  cart = [];
  updateCart();
};