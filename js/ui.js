document.getElementById('view-cart').addEventListener('click', () => {
    const checkoutSection = document.getElementById('checkout');
    checkoutSection.style.display = checkoutSection.style.display === 'none' ? 'block' : 'none';
  });