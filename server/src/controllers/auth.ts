import { Request, Response } from 'express';
import bcryptjs from "bcryptjs"
import { clerkClient } from '@clerk/express';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, fullName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await clerkClient.users.createUser({
      emailAddress: email,
      password: hashedPassword,
      username: username,
      firstName: fullName.split(" ")[0],
      lastName: fullName.split(" ")[1],
    });

    const userExists = await clerkClient.users.getUser(user.id)

    if (user) {
      return res.status(201).json({ message: "User created successfully", userId: user.id });
    } else {
      return res.status(500).json({ error: "Failed to create user" });
    }

  } catch (error) {
    console.error("Error registering user:", error);

    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Failed to register user" });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    // const user = await clerkClient.users.getUser()
    // const userExists = await clerkClient.users.getUser(user.id)
  } catch (error) {

  }
}