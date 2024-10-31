document.addEventListener('DOMContentLoaded', () => {
    fetchDoctorData();  // Ensure this is not called elsewhere to avoid duplication
});

async function submitForm(event) {
    // This prevents the default form submission behavior
    // which would cause a page reload
    event.preventDefault(); 

    // Collect form data
    const doctorId = document.getElementById('doctorId').value;
    const name = document.getElementById('name').value;
    const specialization = document.getElementById('specialization').value;
    const contact = document.getElementById('contact').value;
    const schedule = document.getElementById('schedule').value;

    // Prepare data object
    const doctorData = { 
        doctorId, 
        name, 
        specialization, 
        contact, 
        schedule 
    };

    try {
        let response;
        if (doctorId) {
            // Update existing doctor
            response = await fetch(`/api/doctor/${doctorId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(doctorData)
            });
        } else {
            // Create new doctor
            response = await fetch('/api/doctor', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(doctorData)
            });
        }

        if (response.ok) {
            const result = await response.json();
            console.log("Server response:", result);
            
            // Reset form and refresh doctor list
            resetForm();
            fetchDoctorData();
        } else {
            // Handle error response
            const errorText = await response.text();
            console.error("Error Status:", response.status);
            console.error("Error Text:", errorText);
        }
    } catch (error) {
        console.error("Network/Fetch Error:", error);
    }
}

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


function showEditForm(id) {
  fetch(`/api/doctor/${id}`)
    .then(response => response.json())
    .then(doctor => {
      if (doctor) {
        document.getElementById('doctorId').value = doctor._id;
        document.getElementById('name').value = doctor.name;
        document.getElementById('specialization').value = doctor.specialization;
        document.getElementById('contact').value = doctor.contact;
        document.getElementById('schedule').value = doctor.schedule;
        document.getElementById('formTitle').textContent = "Edit Doctor";
      } else {
        console.error("Error: Doctor data not found for ID:", id);
        // You can display an error message to the user here
      }
    })
    .catch(error => {
      console.error("Error fetching doctor data for edit:", error);
      // You can display an error message to the user here
    });
}


function resetForm() {
    document.getElementById('doctorId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('specialization').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('schedule').value = '';
    document.getElementById('formTitle').textContent = "Add Doctor";
}


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

