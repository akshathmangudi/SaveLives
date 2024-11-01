document.addEventListener('DOMContentLoaded', () => {
    fetchDoctorData();  // Ensure this is not called elsewhere to avoid duplication
    document.getElementById('logoutButton').addEventListener('click', logout);
});

/**
 * Handles submission of the doctor form, either adding a new doctor or updating an existing one.
 * Prevents page reload, reads form data, and sends a PUT or POST request to the server.
 * If the request is successful, resets the form and refreshes the doctor list.
 * If the request fails, logs the error status and text to the console.
 * @param {Event} event - The form submission event
 */
async function submitForm(event) {
    event.preventDefault(); // Prevent page reload

    const doctorId = document.getElementById('doctorId').value; // This can be empty when adding a new doctor
    const name = document.getElementById('name').value;
    const specialization = document.getElementById('specialization').value;
    const contact = document.getElementById('contact').value;
    const schedule = document.getElementById('schedule').value;

    // Prepare data object
    const doctorData = { name, specialization, contact, schedule };

    try {
        let response;
        if (doctorId) {
            // Update existing doctor
            response = await fetch(`/api/doctor/${doctorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
        } else {
            // Create new doctor
            response = await fetch('/api/doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
        }

        if (response.ok) {
            const result = await response.json();
            console.log("Doctor added/updated successfully:", result);
            resetForm(); // Reset form after successful action
            fetchDoctorData(); // Refresh doctor list
        } else {
            const errorText = await response.text();
            console.error("Error Status:", response.status);
            console.error("Error Text:", errorText);
        }
    } catch (error) {
        console.error("Network/Fetch Error:", error);
    }
}


/**
 * Fetches all doctor data from the server and populates the #doctorTable.
 * Each doctor is rendered as a table row with columns for name, specialization, contact, schedule, and actions (edit and delete).
 * If the fetch fails, logs an error to the console.
 */
async function fetchDoctorData() {
    try {
        const response = await fetch('/api/doctor');
        const doctors = await response.json();

        const tableBody = document.getElementById('doctorTable').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        doctors.forEach(doctor => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${doctor.name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.contact}</td>
                <td>${doctor.schedule}</td>
                <td>
                    <button onclick="showEditForm('${doctor._id}')">Edit</button>
                    <button onclick="deleteDoctor('${doctor._id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching doctor data:", error);
    }
}


/**
 * Fetches a doctor's data from the server by ID and populates the form fields with the retrieved data.
 * Updates the form title to "Edit Doctor" to indicate editing mode.
 * Handles errors by logging them to the console.
 * 
 * @param {string} id - The unique identifier of the doctor to fetch.
 */
function showEditForm(id) {
    fetch(`/api/doctor/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(doctor => {
            if (doctor) {
                // Populate the form with doctor's data
                document.getElementById('doctorId').value = doctor._id; // Make sure this is _id
                document.getElementById('name').value = doctor.name;
                document.getElementById('specialization').value = doctor.specialization;
                document.getElementById('contact').value = doctor.contact;
                document.getElementById('schedule').value = doctor.schedule;
                document.getElementById('formTitle').textContent = "Edit Doctor";
            } else {
                console.error("Error: Doctor data not found for ID:", id);
            }
        })
        .catch(error => {
            console.error("Error fetching doctor data for edit:", error);
        });
}


/**
 * Resets the form fields to their initial state, ready for adding a new doctor.
 * Resets the form title to "Add Doctor" to indicate add mode.
 */
function resetForm() {
    document.getElementById('doctorId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('specialization').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('schedule').value = '';
    document.getElementById('formTitle').textContent = "Add Doctor";
}


/**
 * Creates a new doctor in the database and refreshes the doctor table.
 * @param {Object} doctorData - An object with keys for name, specialization, contact, and schedule.
 */
async function createDoctor(doctorData) {
    try {
        const response = await fetch('/api/doctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctorData)
        });
        const newDoctor = await response.json();
        fetchDoctorData(); // Refresh the table
    } catch (error) {
        console.error("Error creating doctor:", error);
    }
}

/**
 * Updates an existing doctor in the database with new data and refreshes the doctor table.
 * @param {string} id - The unique identifier of the doctor to update.
 * @param {Object} updatedData - An object with keys for name, specialization, contact, and schedule.
 */
async function updateDoctor(id, updatedData) {
    try {
        await fetch(`/api/doctor/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        fetchDoctorData(); // Refresh the table
    } catch (error) {
        console.error("Error updating doctor:", error);
    }
}

/**
 * Deletes a doctor from the database with the given ID and refreshes the doctor table.
 * @param {string} id - The unique identifier of the doctor to delete.
 */
async function deleteDoctor(id) {
    try {
        await fetch(`/api/doctor/${id}`, {
            method: 'DELETE'
        });
        fetchDoctorData(); // Refresh the table
    } catch (error) {
        console.error("Error deleting doctor:", error);
    }
}

/**
 * Logs the user out by redirecting to the login page.
 */
function logout() {
    window.location.href = '/login';
}   
