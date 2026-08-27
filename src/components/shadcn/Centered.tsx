import { cn } from "@/utilities/ui";
import { PropsWithChildren } from "react";

type Props = {
  className?: string
}

const Centered = ({children, className}:Props & PropsWithChildren) => {
  return (
    <div className={cn("w-full md:w-[800px] mx-auto", className)}>{children}</div>
  )
}

export default Centered;