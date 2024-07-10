import React, { useRef, useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { ComponentOptionsType as FancyboxOptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox(props: {
  children?: React.ReactNode;
  delegate?: string;
  options?: Partial<FancyboxOptionsType>;
  className?: string;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return (
    // <div className={`${props.className}`} ref={containerRef}>

    <div ref={containerRef}>
      {props.children}
    </div>
  );
}

export default Fancybox;
