"use client";

import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import React from "react";

interface AnimatedBodyProps {
  text: ReactNode;
  className?: string;
  wordSpace?: string;
  charSpace?: string;
  style?: React.CSSProperties;
}

const AnimatedBody: React.FC<AnimatedBodyProps> = ({
  text,
  className,
  wordSpace,
  charSpace,
  style,
}) => {
  //   const text = "Animated Text"; // This would normally be passed into this component as a prop!

  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    } else {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const bodyAnimation = {
    hidden: {
      opacity: 0,
      y: "1em",
    },
    visible: {
      opacity: 1,
      y: "0em",
      transition: {
        delay: 0.1,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.p
      aria-label={typeof text === 'string' ? text : undefined}
      role="heading"
      className={className}
      ref={ref}
      aria-hidden="true"
      initial="hidden"
      animate={ctrls}
      variants={bodyAnimation}
      style={style}
    >
      {text}
    </motion.p>
  );
};

export default AnimatedBody;
