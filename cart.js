function loadCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let products = JSON.parse(localStorage.getItem("products")) || [];
      let container = document.getElementById("cartContainer");
      container.innerHTML = "";

      if(cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; font-size:18px;'>Your cart is empty!</p>";
        document.getElementById("cartSummary").innerHTML = "";
        return;
      }

      let table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="cartTableBody"></tbody>
      `;
      container.appendChild(table);

      let tbody = table.querySelector("#cartTableBody");

      let totalItems = 0;
      let totalValue = 0;

      cart.forEach((item, index) => {
        const productInInventory = products.find(p => p.name === item.name);
        const stock = productInInventory ? parseInt(productInInventory.stock) : 0;

        if (stock === 0) {
          // auto remove out-of-stock items
          cart.splice(index, 1);
          return;
        }

        if (item.quantity > stock) {
          item.quantity = stock;
        }

        totalItems += item.quantity;
        totalValue += item.price * item.quantity;

        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td><img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}"></td>
          <td>₹ ${item.price}</td>
          <td>
            <div class="qty-controls">
              <button class="qty-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
          </td>
          <td>₹ ${(item.price * item.quantity).toFixed(2)}</td>
          <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      document.getElementById("cartSummary").innerHTML = 
        `No. of products: <b>${totalItems}</b> | Total Cart Value: <b>₹ ${totalValue.toFixed(2)}</b>`;
    }

    function updateQuantity(index, change) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let products = JSON.parse(localStorage.getItem("products")) || [];

      if (!cart[index]) return;

      const productInInventory = products.find(p => p.name === cart[index].name);
      const maxStock = productInInventory ? parseInt(productInInventory.stock) : Infinity;

      cart[index].quantity += change;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      } else if (cart[index].quantity > maxStock) {
        alert("⚠️ Not enough stock available!");
        cart[index].quantity = maxStock;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    function removeItem(index) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    function clearCart() {
      localStorage.removeItem("cart");
      loadCart();
    }

    function checkoutCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if(cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  // Deduct stock
  cart.forEach(cartItem => {
    let product = products.find(p => p.name === cartItem.name);
    if(product) {
      let currentStock = parseInt(product.stock) || 0;
      product.stock = Math.max(0, currentStock - cartItem.quantity);
    }
  });

  // Save updated products
  localStorage.setItem("products", JSON.stringify(products));

  // --- 📌 Save sales record in the new format ---
  let sales = JSON.parse(localStorage.getItem("salesRecords")) || [];
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let newSale = {
    id: sales.length + 1,
    items: cart,
    total: total,
    date: new Date().toLocaleString()
  };

  sales.push(newSale);
  localStorage.setItem("salesRecords", JSON.stringify(sales));
  // --- END NEW ---

  // Clear cart
  localStorage.removeItem("cart");

  alert("✅ Checkout successful! Stock updated & Sale recorded.");
  loadCart();
  
}


    loadCart();