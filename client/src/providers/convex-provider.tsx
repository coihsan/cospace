import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";

interface Props {
    children: React.ReactNode;
}

const ConvexProviders: React.FC<Props> = ({ children }) => {
    const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
    
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    )
}
export default ConvexProviders