import { skillProps } from "./skillDetails";
import Image from "next/image";
import slash from "../../public/review-slash.svg";
import { motion } from "framer-motion";

const SkillCard = ({
  name,
  category,
  icon,
  description,
  index,
}: skillProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.1 * index,
          ease: [0.44, 0, 0.22, 0.99],
        },
      }}
      viewport={{
        amount: "some",
        once: true,
      }}
      className="relative flex h-[473px] w-[100%] flex-col items-start justify-between rounded-[23px] border-[3px] border-[#212531] bg-transparent p-[28px] sm:h-[450px] sm:items-center sm:justify-start lg:h-[393px] lg:max-w-[438px]"
    >
      <Image
        src={slash}
        alt={"title"}
        className="absolute top-[34px] left-[28px] w-[51px]"
      />

      <div className="mt-10 flex flex-col gap-4">
        <h3 className="text-[28px] font-bold uppercase leading-[1.1em] tracking-tight text-[#e4ded7]">
          {name}
        </h3>
        <span className="text-[16px] font-medium uppercase text-[#95979D]">
          {category}
        </span>
        <p className="text-[18px] font-[500] leading-relaxed tracking-wide text-[#e4ded7]">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3 sm:absolute sm:bottom-[28px] sm:left-[28px]">
        <Image
          src={icon}
          alt={name}
          width={1600}
          height={840}
          className="h-[41px] w-[41px] rounded-full bg-contain bg-center object-cover"
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
