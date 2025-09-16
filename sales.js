function loadSales() {
      let sales = JSON.parse(localStorage.getItem("salesRecords")) || [];
      let container = document.getElementById("salesContainer");
      container.innerHTML = "";

      if (sales.length === 0) {
        container.innerHTML = "<p style='text-align:center; font-size:18px;'>No sales recorded yet!</p>";
        return;
      }

      sales.forEach(sale => {
        // Create the main card container
        let card = document.createElement("div");
        card.classList.add("sales-card");

        // Create the header with Sale ID and Date
        let header = document.createElement("div");
        header.classList.add("sales-header");
        header.innerHTML = `
          <h3 class="sale-title">Sale #${sale.id}</h3>
          <span class="sale-date">${sale.date}</span>
        `;
        card.appendChild(header);

        // Create the total value element
        let totalValue = document.createElement("p");
        totalValue.classList.add("total-value");
        totalValue.textContent = `Total Sale Value: ₹${sale.total.toFixed(2)}`;
        card.appendChild(totalValue);

        // Create the cart details section
        let cartDetails = document.createElement("div");
        cartDetails.classList.add("cart-details");
        let cartTitle = document.createElement("p");
        cartTitle.textContent = "Cart Details:";
        cartDetails.appendChild(cartTitle);

        let productsList = document.createElement("ul");
        sale.items.forEach(item => {
          let listItem = document.createElement("li");
          listItem.textContent = `${item.name} (${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`;
          productsList.appendChild(listItem);
        });
        cartDetails.appendChild(productsList);
        card.appendChild(cartDetails);

        // Append the completed card to the container
        container.appendChild(card);
      });
    }

    loadSales();