const fs = require('fs');
const bcrypt = require('bcrypt');
const csvParser = require('csv-parser');
const { hash } = require('crypto');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const saltRounds = 10;

// Path to your input CSV file
const inputCsvFile = './data/auth_details.csv';

// Path to the output CSV file with hashed passwords
const outputCsvFile = './data/auth_hashed.csv';

// Set up CSV writer
const csvWriter = createCsvWriter({
    path: outputCsvFile,
    header: [
        { id: 'username', title: 'username' },
        { id: 'password', title: 'password' },  // Hashed password will go here
        { id: 'role', title: 'role' }
    ]
});

const users = [];

// Function to hash password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

// Function to process CSV
const processCSV = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(inputCsvFile)
            .pipe(csvParser())
            .on('data', (row) => {
                const username = row['username'];
                const password = row['password'];
                const role = row['role'];

                if (!username || !password) {
                    console.error('Missing data:', row);
                    return;  // Skip this row if any field is missing
                }

                users.push({ username, password, role });
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

// Main function
async function main() {
    try {
        await processCSV();

        console.log('Users array:', users);  // This should now show the users

        const hashedUsers = await Promise.all(users.map(async (user) => {
            console.log(`Processing user: ${user.username}`);
            const hashedPassword = await hashPassword(user.password);
            console.log(`Hashed Password for ${user.username}: ${hashedPassword}`);
            return { ...user, password: hashedPassword };
        }));

        if (hashedUsers.length > 0) {
            await csvWriter.writeRecords(hashedUsers);
            console.log('CSV file with hashed passwords created successfully.');
        } else {
            console.error('No users to write to the CSV file.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

main();