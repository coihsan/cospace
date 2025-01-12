import * as React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean
  tooltip?: string
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ isActive, children, tooltip, className, ...props }, ref) => {
    const toggleButton = (
      <Toggle size="sm" ref={ref} className={cn('size-8 p-0', { 'bg-accent': isActive }, className)} {...props}>
        {children}
      </Toggle>
    )

    if (!tooltip) {
      return toggleButton
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col items-center text-center">{tooltip}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

ToolbarButton.displayName = 'ToolbarButton'

export default ToolbarButton