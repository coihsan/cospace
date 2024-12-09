import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '../ui/button';

export const ButtonAction = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button> & { tooltip?: string; side?: typeof Tooltip }>(
  ({ children, tooltip, ...buttonProps }, ref) => {
    const button = (
      <Button ref={ref} {...buttonProps}>
        {children}
      </Button>
    );

    return tooltip ? (
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col items-center text-center">{tooltip}</div>
        </TooltipContent>
      </Tooltip>
    ) : (
      button
    );
  }
);

ButtonAction.displayName = 'ButtonAction';

export default ButtonAction;