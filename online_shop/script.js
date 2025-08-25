// Product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3" },
  { id: 2, name: "Smart Watch", price: 199.99, category: "electronics", image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3" },
  { id: 3, name: "Running Shoes", price: 79.99, category: "clothing", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3" },
  { id: 4, name: "Backpack", price: 49.99, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3" },
  { id: 5, name: "Coffee Maker", price: 129.99, category: "home", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3" },
  { id: 6, name: "Desk Lamp", price: 39.99, category: "home", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3" },
  { id: 7, name: "Sunglasses", price: 89.99, category: "accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3" },
  { id: 8, name: "Winter Jacket", price: 149.99, category: "clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3" }
];

// Deal products
const deals = [
  { id: 1, name: "Wireless Headphones", price: 99.99, originalPrice: 149.99, discount: 33, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3" },
  { id: 2, name: "Smart Watch", price: 199.99, originalPrice: 249.99, discount: 20, image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3" },
  { id: 3, name: "Running Shoes", price: 79.99, originalPrice: 99.99, discount: 20, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3" },
  { id: 4, name: "Coffee Maker", price: 129.99, originalPrice: 179.99, discount: 28, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3" }
];

// Categories
const categories = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "home", name: "Home & Kitchen", icon: "🏠" },
  { id: "accessories", name: "Accessories", icon: "🕶️" }
];

// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Update quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }
}

// Render cart
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    cartTotalContainer.innerHTML = '';
    return;
  }
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-actions">
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  
  cartTotalContainer.innerHTML = `
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="total">Total: $${total.toFixed(2)}</div>
      <a href="checkout.html" class="btn">Proceed to Checkout</a>
    </div>
  `;
}

// Render products
function renderProducts(productsToRender) {
  const container = document.getElementById('products-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  productsToRender.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="card-content">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render categories
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-content">
        <h2>${category.icon}</h2>
        <h3>${category.name}</h3>
        <a href="products.html?category=${category.id}" class="btn">View Products</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render deals
function renderDeals() {
  const container = document.getElementById('deals-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  deals.forEach(deal => {
    const card = document.createElement('div');
    card.className = 'card deal-card';
    card.innerHTML = `
      <div class="deal-badge">${deal.discount}% OFF</div>
      <img src="${deal.image}" alt="${deal.name}">
      <div class="card-content">
        <h3>${deal.name}</h3>
        <p class="price">
          <span class="original-price">$${deal.originalPrice.toFixed(2)}</span>
          $${deal.price.toFixed(2)}
        </p>
        <button class="btn" onclick="addToCart(${deal.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Initialize pages
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Home page
  if (document.getElementById('featured-products')) {
    renderProducts(products.slice(0, 4));
  }
  
  // Categories page
  if (document.getElementById('categories-container')) {
    renderCategories();
  }
  
  // Products page
  if (document.getElementById('products-container')) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
      const filteredProducts = products.filter(p => p.category === category);
      renderProducts(filteredProducts);
    } else {
      renderProducts(products);
    }
  }
  
  // Deals page
  if (document.getElementById('deals-container')) {
    renderDeals();
  }
  
  // Cart page
  if (document.getElementById('cart-items')) {
    renderCart();
  }
  
  // Checkout page
  if (document.getElementById('order-summary')) {
    const orderSummaryContainer = document.getElementById('order-summary');
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const orderItem = document.createElement('div');
      orderItem.className = 'cart-item';
      orderItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
        </div>
      `;
      orderSummaryContainer.appendChild(orderItem);
    });
    
    orderSummaryContainer.innerHTML += `
      <div class="total">Total: $${total.toFixed(2)}</div>
    `;
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
      method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
      });
    });
    
    // Form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real application, you would process payment here
      alert('Order placed successfully! Thank you for your purchase.');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  }
});