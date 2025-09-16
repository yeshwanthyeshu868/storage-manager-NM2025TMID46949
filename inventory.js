function loadInventory() {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const grid = document.getElementById("inventoryGrid");
      const search = document.getElementById("searchInput").value.toLowerCase();
      const alertValue = parseInt(document.getElementById("alertValue").value) || 0;
      const showDepleted = document.getElementById("showDepleted").checked;

      let filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.tags.some(tag => tag.toLowerCase().includes(search))
      );

      if (showDepleted) {
        filteredProducts = filteredProducts.filter(p => parseInt(p.stock) === 0);
      }

      if (filteredProducts.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
      }

      grid.innerHTML = "";
      filteredProducts.forEach((product, index) => {
        const stock = parseInt(product.stock);
        const card = document.createElement("div");
        card.classList.add("card");

        let stockText = "";
        if (stock === 0) {
          stockText = `<p class="stock-alert">⚠️ Out of Stock</p>`;
        } else if (stock <= alertValue) {
          stockText = `<p class="stock-alert">⚠️ Low Stock: ${stock}</p>`;
        } else {
          stockText = `<p><strong>Stock Available:</strong> ${stock}</p>`;
        }

        card.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}">
          <p class="price">Price: ₹${product.price}</p>
          ${stockText}
          
          <label>Update Stock:</label>
          <input type="number" id="stockChange-${index}" value="0">
          <br>
          <button class="btn update-btn" onclick="updateStock(${index})">🔄 Update Stock</button>
        `;
        grid.appendChild(card);
      });
    }

    function updateStock(index) {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      let changeValue = parseInt(document.getElementById(`stockChange-${index}`).value) || 0;

      if (!isNaN(changeValue) && changeValue !== 0) {
        products[index].stock = Math.max(0, parseInt(products[index].stock) + changeValue);
        localStorage.setItem("products", JSON.stringify(products));
        loadInventory();
      }
    }

    window.onload = loadInventory;