const dbClient = require("../utils/db");
const crypto = require("crypto");

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }
    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    try {
      // Check if the email already exists
      const existingUser = await dbClient.db
        .collection("users")
        .findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Already exists" });
      }

      // Hash the password using SHA1
      const hashedPassword = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");

      // Create new user object
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Insert the new user into the database
      const result = await dbClient.db.collection("users").insertOne(newUser);

      // Return the new user with id and email
      res.status(201).json({
        id: result.insertedId,
        email: newUser.email,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UsersController;
