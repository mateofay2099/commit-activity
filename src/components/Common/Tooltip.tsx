"use client";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

type TooltipProps = {
  id: string;
};

export const Tooltip = ({ id }: TooltipProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <ReactTooltip id={id} place="top" style={{ zIndex: 5 }} />
  ) : null;
};
