import dbClient from "../utils/db";
import crypto from "crypto";

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate email and password
    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }
    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    // Check if the email already exists
    const existingUser = await dbClient.client
      .db("files_manager")
      .collection("users")
      .findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Already exist" });
    }

    // Hash the password using SHA1
    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    // Create a new user object
    const newUser = { email, password: hashedPassword };

    // Insert the new user into the database
    const result = await dbClient.client
      .db("files_manager")
      .collection("users")
      .insertOne(newUser);

    // Return the new user info
    return res
      .status(201)
      .json({ id: result.insertedId, email: newUser.email });
  }
}

export default UsersController;
