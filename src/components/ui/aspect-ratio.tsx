
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { forwardRef, ComponentPropsWithoutRef } from "react"

// Enhanced AspectRatio with proper accessibility and types
const AspectRatio = forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={className}
    {...props}
  />
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
