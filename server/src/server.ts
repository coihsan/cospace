import 'dotenv/config';
import express from 'express';
import {
  clerkClient,
  clerkMiddleware,
  getAuth,
  requireAuth,
} from '@clerk/express';

const app = express();
const PORT = 3000;

app.use(clerkMiddleware());

app.get('/protected', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  const user = await clerkClient.users.getUser(userId as string);

  res.json({ user });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});