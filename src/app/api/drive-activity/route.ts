import { db } from "@/lib/db"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { google } from "googleapis"
import { NextResponse } from "next/server"
import { v4 } from "uuid"

export async function GET() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.OAUTH2_REDIRECT_URL
    )
    const { userId } = auth()
    if (!userId) {
        return NextResponse.json({message : 'User not found'})
    }

    const clerkRespon = await clerkClient.users.getUserOauthAccessToken(
        userId,
        'oauth_google'
    )

    const accessToken = clerkRespon.data[0].token
    oauth2Client.setCredentials({
        access_token: accessToken
    })

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    })
    const channelId = v4()

    const startPageTokens = await drive.changes.getStartPageToken({})
    const startPageToken = startPageTokens.data.startPageToken
    if (startPageToken == null){
        throw new Error('startPageToken is unexpectedly null')
    }
    const listener = await drive.changes.watch({
        pageToken: startPageToken,
        supportsAllDrives: true,
        supportsTeamDrives: true,
        requestBody:{
            id: channelId,
            type: 'web_hook',
            address: 'https://8288-34-80-14-18.ngrok-free.app/drive-activity/notification',
            kind: 'apichannel'
        }
    })
    
    if (listener.status == 200) {
        const channelStored = await db.user.updateMany({
            where: {
                clerkId: userId
            },
            data: {
                googleResourceId: listener.data.resourceId
            },
        })

        if (channelStored){
            return new NextResponse('Listening to changes...')
        }
    }

    return new NextResponse('Ooopps! something went wrong, try again')
}