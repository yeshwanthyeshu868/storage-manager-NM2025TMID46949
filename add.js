document.getElementById("addProductForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get values
    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const price = parseFloat(document.getElementById("price").value); // number
    const stock = parseInt(document.getElementById("stock").value);   // number
    const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());

    // Create product object
    const product = { name, image, price, stock, tags };

    // Get existing products
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product
    products.push(product);

    // Save back
    localStorage.setItem("products", JSON.stringify(products));

    // Success
    // Show success message
document.getElementById("successMessage").style.display = "block";

// Reset form
this.reset();

// Hide success message after 3 seconds (3000 ms)
setTimeout(() => {
    document.getElementById("successMessage").style.display = "none";
}, 3000);
  });