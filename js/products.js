const fetchProducts = () => {
    fetch('products.json')
      .then(response => response.json())
      .then(data => displayProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };
  
  const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      
      productList.appendChild(productCard);
    });
  };
  
  fetchProducts();