  function loadProducts() {
    const productList = document.getElementById("productList");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const search = document.getElementById("searchBox").value.toLowerCase();

    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<p>No products available</p>";
      return;
    }

    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.tags.some(tag => tag.toLowerCase().includes(search))
    );

    filtered.forEach((product, index) => {
      const productCol = document.createElement("div");
      productCol.classList.add("col-1");

      const stock = parseInt(product.stock) || 0;
      const inCart = cart.some(item => item.name === product.name);

      productCol.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p class="price">Price: ₹${product.price}</p>
        
        ${
          stock > 0
            ? `<button class="cart-btn ${inCart ? 'remove' : ''}" onclick="toggleCart(${index})">
                 ${inCart ? 'Remove from Cart' : 'Add to Cart'}
               </button>`
            : `<p class="out-of-stock">❌ Out of Stock</p>`
        }
      `;

      productList.appendChild(productCol);
    });
  }

  function toggleCart(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProduct = products[index];
    const exists = cart.findIndex(item => item.name === selectedProduct.name);

    if (exists !== -1) {
      cart.splice(exists, 1); // remove
    } else {
      if (parseInt(selectedProduct.stock) > 0) {
        cart.push({ ...selectedProduct, quantity: 1 }); // add with quantity
      } else {
        alert("❌ This product is out of stock!");
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadProducts();
  }

  window.onload = loadProducts;
