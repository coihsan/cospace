import PulseIndicator from "./pulse-indicator"

const OnlineSystemStatus = () => {
    return (
        <div className="flex items-center gap-3">
            <PulseIndicator />
            <span className="text-xs">Online</span>
        </div>
    )
}

export default OnlineSystemStatus