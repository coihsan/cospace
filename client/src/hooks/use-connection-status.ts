import { useState, useEffect } from 'react';
import { WebsocketProvider } from 'y-websocket';

export type ConnectionStatus = 'connecting' | 'connected' | 'offline';

export function useConnectionStatus(provider: WebsocketProvider) {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');

  useEffect(() => {
    const updateStatus = () => {
      setStatus(provider.wsconnected ? 'connected' : 'offline');
    };

    provider.on('status', updateStatus);
    return () => {
      provider.off('status', updateStatus);
    };
  }, [provider]);

  return status;
}