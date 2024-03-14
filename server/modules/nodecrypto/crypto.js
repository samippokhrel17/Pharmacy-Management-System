const crypto = require("crypto");
const storedHashedPassword = "..."; // Retrieve from the database
const receivedPassword = "..."; // Received from the login attempt
const secretKey = storedHashedPassword; // Use stored hashed password as the secret key

const hmac = crypto.createHmac("sha256", secretKey);
hmac.update(receivedPassword);
const generatedHmac = hmac.digest("hex");

// Compare generatedHmac with the storedHmac
if (generatedHmac === storedHashedPassword) {
} else {
}
