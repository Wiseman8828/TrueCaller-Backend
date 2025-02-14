const { faker } = require('@faker-js/faker');

// Function to generate a random 10-digit phone number
function generatePhoneNumber() {
    let phoneNumber = '';
    for (let i = 0; i < 10; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
}

// Generate random data
function generateRandomData() {
    const Id = faker.string.uuid();
    const username = faker.internet.userName();
    const phoneNumber = generatePhoneNumber();
    const email = faker.internet.email();
    const password = faker.internet.password();

    return {
        Id,
        username,
        phoneNumber,
        email,
        password
    };
}

module.exports = {
    generateRandomData
}