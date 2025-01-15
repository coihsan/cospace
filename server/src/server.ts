import 'dotenv/config';
import express, { Express } from 'express'
import cors from 'cors'
import {
  clerkMiddleware,
} from '@clerk/express';

const app: Express = express()
const PORT = 5173;

app.use(clerkMiddleware());
app.use(cors())

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`cospace app listening at http://localhost:${PORT}`);
});