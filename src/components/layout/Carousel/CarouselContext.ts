import { createContext, useContext } from "react"


type CarouselContextProps = {
  activeIndex: number;
  setActiveIndex: (val:number) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  scrollTo: (index: number) => void;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel components must be used within a <Carousel>");
  return context;
};

export { CarouselContext, useCarousel };
export type { CarouselContextProps };