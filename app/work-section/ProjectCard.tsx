import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectProps } from "./projectDetails";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedBody from "../animations/AnimatedBody";
import { motion } from "framer-motion";

const ProjectCard = ({
  id,
  name,
  description,
  technologies,
  github,
  demo,
  image,
  available,
  color,
}: ProjectProps) => {
  return (
    <motion.div
      style={{
        backgroundColor: color,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        position: "relative",
      } as React.CSSProperties}
      className={`relative z-10 h-[550px]  w-full items-stretch justify-center overflow-hidden rounded-3xl bg-center py-0 sm:h-[700px] sm:w-[100%] md:h-[650px] md:w-[100%] lg:h-[500px]`}
      initial="initial"
      animate="animate"
    >
      <Image
        src={image}
        alt={name}
        className={`absolute -bottom-2 w-[70%] sm:w-[85%] md:w-[60%] lg:max-w-[55%] ${
          id % 2 === 0 ? "right-0" : "left-0"
        }`}
      />
      <Link
        href="https://www.etsy.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${name} project on Etsy`}
        className="absolute top-4 left-4 rounded-full bg-[#e4ded7] transition-colors duration-300 hover:bg-[#c4c0b8] flex items-center justify-center"
        style={{ width: '40px', height: '40px' }}
        data-blobity-magnetic="true"
        data-blobity-offset-x="2"
        data-blobity-offset-y="2"
      >
        <FontAwesomeIcon icon={faLink} className="text-[#0E1016] text-lg" />
      </Link>
      <div
        className={`absolute top-0 text-[#0E1016] ${
          id % 2 === 0 ? "left-0 ml-8 lg:ml-14" : "right-0 mr-8 lg:mr-14"
        } mt-6 flex  items-center justify-center gap-4 lg:mt-10`}
      ></div>
      <div
        className={`absolute text-white  ${
          !(id % 2 === 0)
            ? "right-0 top-16 mr-0 ml-10 md:right-0 md:ml-0 lg:right-0 lg:top-60  lg:mr-4"
            : "left-10 top-16 ml-0 md:mr-12 lg:top-52 lg:ml-4"
        } mb-10  md:mb-16 lg:mb-14 lg:text-center `}
      >
        <AnimatedTitle
          text={name}
          className={
            "max-w-[90%] text-[40px] leading-none text-white md:text-[44px] md:leading-none lg:max-w-[450px] lg:text-[48px] lg:leading-none"
          }
          wordSpace={"mr-[0.25em]"}
          charSpace={"-mr-[0.01em]"}
        />
        <AnimatedBody
          text={description}
          className={
            "mt-4 w-[90%] max-w-[457px] text-[16px] font-semibold text-[#95979D] "
          }
        />
        <div className="mt-9 flex gap-4 hidden md:flex">
          {technologies.map((tech, id) => (
            <AnimatedTitle
              text={tech}
              wordSpace={"mr-[0.25em]"}
              charSpace={"mr-[0.01em]"}
              key={id}
              className={
                "text-[14px] font-bold uppercase md:text-[16px] lg:text-[18px] "
              }
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
