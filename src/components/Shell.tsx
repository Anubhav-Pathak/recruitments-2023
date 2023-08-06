import * as React from "react"

import { cn } from "@/lib/utils"

interface ComponentShell extends React.HTMLAttributes<HTMLDivElement> {}

export function ComponentShell({
  children,
  className,
  ...props
}: ComponentShell) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
