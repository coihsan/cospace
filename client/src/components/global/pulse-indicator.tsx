import { type ConnectionStatus } from '@/hooks/use-connection-status';

interface ConnectionIndicatorProps {
    status: ConnectionStatus;
  }

const PulseIndicator : React.FC<ConnectionIndicatorProps> = ({ status }) => {
    return(
        <div>
            <span className="relative flex size-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full 
                ${status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'} opacity-75`} />
                <span className={`relative inline-flex rounded-full size-2 ${status === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`} />
            </span>
        </div>
    )
}
export default PulseIndicator