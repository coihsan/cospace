import express from 'express';
import { ClerkClient, createClerkClient } from '@clerk/backend';

const router = express.Router();
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
export const clerkClient = createClerkClient({ secretKey: CLERK_SECRET_KEY });

router.post('/api/auth/session', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
} )