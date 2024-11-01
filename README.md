# SaveLives

SaveLives is a smooth and comprehensive hospital management system that is capable of doing mainly two things: 
* **Inventory Management**: This module will take care of CRUD operations for updating medicines and other supplies. 
* **Staff Management**: This module will handle the doctors that are currently in the clinic and their essential contact information in order to reach out. 

## Project Tree is as follows: 
```bash
/
├── app.js
├── data
│   ├── auth_details.csv
│   ├── auth_hashed.csv
│   ├── doctors_schedule.csv
│   └── inventory_details.csv
├── intermediate
├── LICENSE
├── middleware
│   └── authMiddleware.js
├── models
│   ├── doctor.js
│   ├── medicine.js
│   └── user.js
├── package.json
├── package-lock.json
├── pages
│   ├── admin.html
│   ├── doctor.html
│   └── inventory.html
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       ├── admin.js
│       ├── doctor.js
│       └── inventory.js
├── README.md
├── routes
│   ├── admin.js
│   ├── doctor.js
│   └── pharmacist.js
├── scripts
│   ├── seedDoctors.js
│   └── seedUsers.js
└── views
    ├── about.html
    ├── contact.html
    └── login.html
```

## Project Tree Description

The project is structured into the following directories:

- **data**: Contains CSV files for storing data of users, doctors, and medicines.
- **intermediate**: A temporary directory for storing intermediate data.
- **middleware**: Contains middleware functions for authentication.
- **models**: Contains Mongoose models for doctors, users, and medicines.
- **pages**: Contains static HTML pages for the web interface.
- **public**: Contains static assets such as CSS and JavaScript files.
- **routes**: Contains Express route handlers for different endpoints.
- **scripts**: Contains Node scripts for seeding the database with sample data.
- **views**: Contains HTML templates for rendering dynamic webpages.

The project tree also contains several individual files:

- **app.js**: The main entry point for the Express application.
- **LICENSE**: The license for the project.
- **package.json**: The package metadata file.
- **package-lock.json**: The file that locks the versions of dependencies.
- **README.md**: This file, which contains a description of the project.


## Installation

1. Clone the repository from GitHub: `git clone https://github.com/akshathmangudi/SaveLives.git`
2. Change to the project directory: `cd SaveLives`
3. Install the dependencies: `npm install`
4. Inside Mongo Compass, open up a database and create three new collections: 
`doctors`, 'users' and `medicines`. Randomly generate few values like so: 
```
username,password,role
rakeshs,srakesh,admin
akshathm,makshath,doctor
diyav,vdiya,pharmacist
```

Do the same for doctors and inventory as well. 
5. Run the seed scripts to create the collections: `node scripts/seedUsers.js && node scripts/seedDoctors.js` and import it to the respective collections inside MongoDB. 
6. Create a `.env` file with the following variables:
   - `MONGODB_URI="<your_connection_string>"`
   - `SESSION_SECRET="<secret string>"`
   - `PORT=3000`
7. Start the server: `npm start`
8. Open the web interface in the browser: `http://localhost:3000`


## Purpose and Licenses
This Hospital Management System [HMS] was developed as part of a final project for my Software Engineering [CSE1005] course. This project is covered under the MIT License, available to be used by anyone.

## Credits
Developed by: Akshath Mangudi