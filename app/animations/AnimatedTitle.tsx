"use client";

import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { ReactNode } from "react";

interface AnimatedTitleProps {
  text: string | ReactNode;
  className?: string;
  wordSpace?: string;
  charSpace?: string;
  style?: React.CSSProperties;
  delay?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  className,
  wordSpace,
  charSpace,
  style,
  delay = 0,
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
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: "0.25em",
    },
    visible: {
      opacity: 1,
      y: "0em",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <h2 aria-label={typeof text === 'string' ? text : undefined} role="heading" className={className} style={style}>
      {typeof text === 'string'
        ? text.split(" ").map((word, wordIndex) => (
            <motion.span
              ref={ref}
              key={wordIndex}
              aria-hidden="true"
              initial="hidden"
              animate={ctrls}
              variants={wordAnimation}
              className={`inline-block mb-0 ${wordSpace}`}
            >
              {word.split("").map((character, charIndex) => (
                <motion.span
                  aria-hidden="true"
                  key={charIndex}
                  variants={characterAnimation}
                  className={`inline-block mb-0 ${charSpace}`}
                >
                  {character}
                </motion.span>
              ))}
            </motion.span>
          ))
        : text}
    </h2>
  );
};

export default AnimatedTitle;
