import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        valorant:
          "border-transparent bg-valorant-red text-white shadow hover:bg-valorant-red/80 uppercase tracking-wider",
        elite:
          "border-transparent bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg uppercase tracking-wider",
        pro:
          "border-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg uppercase tracking-wider",
        verified:
          "border-transparent bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg uppercase tracking-wider",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }