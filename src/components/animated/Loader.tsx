import React from "react";

import { Momentum } from "ldrs/react";
import "ldrs/react/Momentum.css";

// note: css import triggers error "module nt found". not clear why
// but required and works.

type Props = {
  size?: number;
  speed?: number;
  color?: string;
  className?: string;
};

const Loader = ({size=40, speed=1.1, color="white", className}: Props) => {
	return <Momentum size={size} speed={ speed} color={color} />;
};

export default Loader;
