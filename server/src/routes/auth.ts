import 'dotenv/config';
import express from 'express'
import { registerUser, loginUser } from "../controllers/auth"

const router = express.Router()

// router.post('/app', registerUser)
router.post('/app', loginUser)

module.exports = router;