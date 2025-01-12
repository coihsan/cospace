import { type ConnectionStatus } from '@/hooks/use-connection-status';
import PulseIndicator from "./pulse-indicator"
import React from 'react';


interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}
const OnlineSystemStatus : React.FC<ConnectionIndicatorProps> = ({ status }) => {
    return (
        <div className="flex items-center gap-2">
            <PulseIndicator status={status} />
            <span className="text-xs">
                {status === 'connected' ? 'Connected' : 'Offline'}
            </span>
        </div>
    )
}

export default OnlineSystemStatus