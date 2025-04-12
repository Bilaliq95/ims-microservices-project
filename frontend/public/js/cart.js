document.addEventListener('DOMContentLoaded', function () {
    // Handle update quantity form submission
    const updateButtons = document.querySelectorAll('.update-quantity-btn');
    updateButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const productId = button.getAttribute('data-id');
            const quantity = button.previousElementSibling.value;

            // Send AJAX request to update the quantity
            fetch(`/cart/update/${productId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update the cart items dynamically
                        updateCartView(data.cart);
                    } else {
                        alert('Error updating cart');
                    }
                });
        });
    });

    // Handle remove item button click
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = button.getAttribute('data-id');

            // Send AJAX request to remove item
            fetch(`/cart/remove/${productId}`, {
                method: 'POST',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update the cart items dynamically
                        updateCartView(data.cart);
                    } else {
                        alert('Error removing item');
                    }
                });
        });
    });

    // Function to update the cart view
    function updateCartView(cart) {
        const cartContainer = document.querySelector('.cart-items-container');
        let cartHtml = '';

        cart.forEach(item => {
            cartHtml += `
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div class="d-flex align-items-center">
                        <h6>${item.product_name}</h6>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 ms-auto" style="width: 60px;">
                            <input type="number" value="${item.quantity}" min="1">
                            <button class="btn btn-sm btn-dark update-quantity-btn" data-id="${item.product_id}">Update</button>
                        </div>
                        <button class="btn btn-sm btn-danger remove-item-btn" data-id="${item.product_id}">Remove</button>
                    </div>
                </li>
            `;
        });

        cartContainer.innerHTML = cartHtml;
    }
});
