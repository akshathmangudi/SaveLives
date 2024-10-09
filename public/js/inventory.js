// Fetch and display inventory items
document.addEventListener('DOMContentLoaded', () => {
    fetchInventory(); // Fetch inventory when the page loads

    // Event listener for the form submission
    document.getElementById('add-inventory-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            dosage: formData.get('dosage'),
            description: formData.get('description'),
            quantity: Number(formData.get('quantity')),
            expiryDate: formData.get('expiryDate'),
        };

        // Call the function to add inventory
        await addInventory(data);
        event.target.reset(); // Reset the form after submission
        fetchInventory(); // Refresh the inventory list
    });
});

async function fetchInventory() {
    const response = await fetch('http://localhost:5500/pharmacist/inventory');
    const inventory = await response.json();
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.dosage} - ${item.quantity} (Expires on: ${new Date(item.expiryDate).toLocaleDateString()})`;
        
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

async function deleteInventory(id) {
    await fetch(`/pharmacist/inventory/${id}`, { method: 'DELETE' });
    fetchInventory();
}

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

// Initial fetch
fetchInventory();