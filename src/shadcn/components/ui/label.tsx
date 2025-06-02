'use client'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@shadcn/lib/utils'

import * as React from 'react'

/**
 * Renders a styled label component based on Radix UI's Label primitive.
 *
 * Combines default label styles with any additional classes provided via {@link className}, and passes all other props to the underlying primitive.
 *
 * @returns A React element representing a styled label.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-sm font-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
