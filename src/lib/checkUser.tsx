import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () =>{
    const user = await currentUser()

    if (!user){
        return null
    }
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkId: user.id
        }
    })
    if (loggedInUser){
        return loggedInUser
    }
    const createUser = await db.user.create({
        data:{
            clerkId: user.id,
            name: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            profileImage: user.imageUrl
        }
    })
    return createUser
} 