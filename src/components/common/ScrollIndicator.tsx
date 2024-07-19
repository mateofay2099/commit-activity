"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type ScrollIndicatorProps = {
  scrollableElementId: string;
};

export const ScrollIndicator = ({
  scrollableElementId,
}: ScrollIndicatorProps) => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const updateScrollable = () => {
      const scrollableElement = document.getElementById(scrollableElementId);
      setIsScrollable(
        !!scrollableElement &&
          scrollableElement.scrollWidth > scrollableElement.clientWidth
      );
    };
    updateScrollable();

    window.addEventListener("resize", updateScrollable);
    return () => {
      window.removeEventListener("resize", updateScrollable);
    };
  }, [scrollableElementId]);

  if (!isScrollable) {
    return null;
  }

  return (
    <>
      <Image alt="" src="/infoIcon.svg" width={20} height={20} />
      <p>Scroll to see more data</p>
    </>
  );
};
