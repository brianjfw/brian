import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type AnimatedWordsProps = {
  title: string;
  style: string;
};

const AnimatedWords: React.FC<AnimatedWordsProps> = ({ title, style }) => {
  const ctrls = useAnimation();
  const [activeLetter, setActiveLetter] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("animate");
    } else {
      ctrls.start("initial");
    }
  }, [ctrls, inView]);

  // Calculate total number of letters (excluding spaces)
  const totalLetters = title.replace(/\s/g, "").length;

  // Cycle through each letter periodically (only one highlighted at a time)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLetter(Math.floor(Math.random() * totalLetters));
    }, 1000); // change highlight every 1000ms
    return () => clearInterval(interval);
  }, [totalLetters]);

  const wordAnimation = {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 6,
        ease: [0.2, 0.65, 0.3, 0.9],
        duration: 1,
      },
    },
  };

  // Function to generate pastel HSL color
  const getPastelColor = (index: number, total: number) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 80%)`; // Adjusted saturation and lightness for pastel look
  };

  // Global letter index for calculating the highlight (across words)
  let globalLetterIndex = 0;

  return (
    <h1 aria-label={title} role="heading">
      <motion.span
        ref={ref}
        className="flex max-w-[500px] flex-col overflow-hidden text-center text-[96px] font-extrabold leading-[0.8em] text-[#e4ded7] sm:text-[120px] sm:leading-[0.85em] md:max-w-[900px] md:text-[155.5px] lg:text-[215px]"
      >
        {title.split(" ").map((word, wordIndex, arr) => (
          <motion.div
            key={wordIndex}
            initial="initial"
            animate={ctrls}
            transition={{
              delayChildren: wordIndex * 0.25,
              staggerChildren: 0.05,
            }}
            className="flex items-center justify-center overflow-hidden"
          >
            <span className={style}>
              {word.split("").map((letter, letterIndex) => {
                const currentIndex = globalLetterIndex;
                globalLetterIndex++;
                // Compute a unique highlight color for this letter using HSL
                const highlightColor = getPastelColor(currentIndex, totalLetters);
                return (
                  <motion.span
                    key={letterIndex}
                    style={{
                      color:
                        activeLetter === currentIndex
                          ? highlightColor
                          : "#e4ded7",
                      transition: "color 0.3s ease",
                    }}
                    variants={wordAnimation}
                  >
                    {letter}
                  </motion.span>
                );
              })}
              {"\u00A0"}
            </span>
          </motion.div>
        ))}
      </motion.span>
    </h1>
  );
};

export default AnimatedWords;
