document.addEventListener('DOMContentLoaded', () => {
    fetchInventory(); // Fetch inventory when the page loads

    // Event listener for the form submission
    document.getElementById('add-inventory-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('Name'),
            dosage: formData.get('Dosage'),
            description: formData.get('Description'),
            quantity: Number(formData.get('Quantity')),
            expiryDate: formData.get('ExpiryDate'),
        };

        // Call the function to add inventory
        await addInventory(data);
        event.target.reset(); // Reset the form after submission
        fetchInventory(); // Refresh the inventory list
    });

    document.getElementById('logoutButton').addEventListener('click', logout);
});

// Fetch and display inventory items
async function fetchInventory() {
    const response = await fetch('/pharmacist/inventory/items'); // Ensure this endpoint is correct
    const inventory = await response.json();
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    inventory.forEach(item => {
        const li = document.createElement('li');

        // Ensure these keys match the Medicine model, including description
        li.textContent = `${item.name} - ${item.dosage} - ${item.description} - ${item.quantity} (Expires on: ${new Date(item.expiryDate).toLocaleDateString()})`; // Added description

        // Update Button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => updateInventory(item._id);
        li.appendChild(updateButton);
        
        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteInventory(item._id);
        li.appendChild(deleteButton);
        
        inventoryList.appendChild(li);
    });
}


/**
 * Adds a new inventory item to the database by sending a POST request.
 * Displays a success alert if the item is added successfully, otherwise logs an error.
 * 
 * @param {Object} data - An object containing the inventory item details with keys: name, dosage, description, quantity, expiryDate.
 */
async function addInventory(data) {
    const response = await fetch('/pharmacist/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const newItem = await response.json();
        console.log('Inventory item added:', newItem);
        alert('Medicine added successfully!');
    } else {
        console.error('Failed to add inventory item:', response.statusText);
    }
}

/**
 * Deletes an inventory item from the database by sending a DELETE request with the item's ID.
 * If the deletion is successful, the inventory list is refreshed.
 * 
 * @param {string} id - The unique identifier of the inventory item to delete.
 */
async function deleteInventory(id) {
    await fetch(`/pharmacist/inventory/${id}`, { method: 'DELETE' });
    fetchInventory();
}


/**
 * Updates an inventory item in the database with new details provided by the user.
 * Prompts the user for new details and sends an update request to the server.
 * Refreshes the inventory list upon a successful update.
 * 
 * @param {string} id - The unique identifier of the inventory item to update.
 */
async function updateInventory(id) {
    const newDetails = prompt("Enter new details as 'name, dosage, description, quantity, expiryDate'");
    if (newDetails) {
        const [name, dosage, description, quantity, expiryDate] = newDetails.split(', ');
        await fetch(`/pharmacist/inventory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, dosage, description, quantity, expiryDate }),
        });
        fetchInventory();
    }
}

document.getElementById('logoutButton').addEventListener('click', logout);

/**
 * Logs the user out by redirecting to the login page.
 */
function logout() {
    window.location.href = '/login';
}   

// Initial fetch
fetchInventory();
