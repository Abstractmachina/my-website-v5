import React from "react";

import { Momentum } from "ldrs/react";
import "ldrs/react/Momentum.css";

type Props = {
  size?: number;
  speed?: number;
  color?: string;
  className?: string;
};

const Loader = ({size, speed, color, className}: Props) => {
	return <Momentum size={size || "40"} speed={ speed || "1.1"} color={color || "white"} />;
};

export default Loader;
