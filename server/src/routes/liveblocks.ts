import express from 'express'
import { Liveblocks } from "@liveblocks/node";
import { getAuth, clerkClient } from '@clerk/express';

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET as string,
});

const app = express();
app.use(express.json());

app.post('/api/liveblocks-auth', async (req, res) => {
    const userId = getAuth(req)
    const session = liveblocks.prepareSession(userId.userId as string, {
        userInfo: userId.userId as any
    })

    session.allow(`${userId.orgId}:*`, session.READ_ACCESS);
    session.allow(`${userId.orgId}:${userId.userId}:*`, session.FULL_ACCESS);

    const { status, body } = await session.authorize();
    res.status(status).end(body);
})