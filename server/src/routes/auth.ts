import 'dotenv/config';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import {
  clerkClient,
  clerkMiddleware,
  getAuth,
  requireAuth,
} from '@clerk/express';

const app: Express = express()
const PORT = 5173;

app.use(clerkMiddleware());
app.use(cors())

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

app.get('/api/notes', requireAuth({ signInUrl: '/sign-in' }), async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const user = await clerkClient.users.getUser(userId as string);
  res.json({ user });
});

app.get('/sign-in', (req, res) => {
  res.render('sign-in')
})

const hasPermission = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req)

  if (!auth.has({ permission: 'user' })) {
    return res.status(403).send('Forbidden')
  }

  return next()
}

app.listen(PORT, () => {
  console.log(`cospace app listening at http://localhost:${PORT}`);
});