// server/routes/authRoutes.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const router = Router();

// User registration
router.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

// User login
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Issue a token and send it to the client
    // Replace this with your actual authentication implementation
    const token = "your-issued-token";
    res.status(200).json({ message: "Logged in successfully.", token, user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

export default router;
