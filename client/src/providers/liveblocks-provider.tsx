import React from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";

interface LiveblocksProviderProps {
    children: React.ReactNode;
}
  
const LiveblocksProviders : React.FC<LiveblocksProviderProps> = ({ children }) => {
    return (
      <LiveblocksProvider publicApiKey={"pk_dev_DHG-PeCDuPDiYXGKgEqBndGxioZatf960raJucUjK8fogDvoUiGghTxxcyGwo6tW"}>
        <RoomProvider id="my-room">
          <ClientSideSuspense fallback={<div>Loading…</div>}>
            {children}
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    );
  }
export default LiveblocksProviders