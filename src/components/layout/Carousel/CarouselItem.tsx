import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

const CarouselItem = ({ children, className = '' }: Props & PropsWithChildren) => {
  return (
    <div className={`w-full flex-shrink-0 snap-start ${className}`}>
      {children}
    </div>
  );
};

export default CarouselItem;