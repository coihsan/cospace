import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import React from "react";

interface Props {
    children: React.ReactNode;
}

const ConvexProviders: React.FC<Props> = ({ children }) => {
    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

    if (!PUBLISHABLE_KEY) {
        throw new Error('Add your Clerk Publishable Key to the .env.local file')
    }
    const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
export default ConvexProviders