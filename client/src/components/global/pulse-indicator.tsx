const PulseIndicator = () => {
    return(
        <div>
            <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
            </span>
        </div>
    )
}
export default PulseIndicator