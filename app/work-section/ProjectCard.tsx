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
  // Helper function to darken the color for text
  const getDarkerColor = (color: string) => {
    // Ensure color is in hsl format
    if (!color.startsWith("hsl")) {
      return "#333"; // Default dark color
    }

    try {
      // Extract HSL values
      const [hue, saturation, lightness] = color
        .substring(4, color.length - 1)
        .split(",")
        .map((str) => parseFloat(str));

      // Decrease lightness for a darker shade (e.g., reduce by 20%)
      const darkerLightness = Math.max(0, lightness - 20);

      return `hsl(${hue}, ${saturation}%, ${darkerLightness}%)`;
    } catch (error) {
      console.error("Invalid color format:", color, error);
      return "#333"; // Default dark color on error
    }
  };

  const textColor = getDarkerColor(color);

  return (
    <motion.div
      style={{
        backgroundColor: color,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        position: "relative",
      } as React.CSSProperties}
      className={`relative z-10  w-full overflow-hidden rounded-3xl bg-center py-0 `}  // Removed fixed heights, let content dictate
      initial="initial"
      animate="animate"
    >
      <div className="relative w-full md:flex md:items-center md:gap-4" //container for responsive layout
           style={{
            //added min height so empty cards don't collapse
            minHeight: '300px',
           }}
      > 
        {/* Image Container */}
        <div className={`relative w-full md:w-1/2 ${id % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
          <Image
            src={image}
            alt={name}
            className={`w-full object-cover rounded-t-3xl md:rounded-none`} // Full width on mobile, object-cover
            style={{
              aspectRatio: '4/3', //maintain consistent image ratio, adjust as needed
            }}
            
          />
        </div>

        {/* Text Content Container */}
        <div
          className={`w-full p-4 md:w-1/2 text-white  md:py-8 md:pr-6 ${ // Padding adjustments
            id % 2 === 0 ? 'md:order-1 md:text-left' : 'md:order-2 md:text-right' //text alignment
          }`}
          style={{ color: textColor }}
        >
          <Link
            href="https://www.etsy.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${name} project on Etsy`}
            className="absolute top-4 left-4 rounded-full bg-[#e4ded7] transition-colors duration-300 hover:bg-[#c4c0b8] flex items-center justify-center z-20" //z-index to bring it front
            style={{ width: '40px', height: '40px' }}
            data-blobity-magnetic="true"
            data-blobity-offset-x="2"
            data-blobity-offset-y="2"
          >
            <FontAwesomeIcon icon={faLink} className="text-[#0E1016] text-lg" />
          </Link>

          <AnimatedTitle
            text={name}
            className="text-[40px] leading-none text-[#fafafa] md:text-[44px] lg:text-[48px]" // Removed max-width, let it flow
            wordSpace={"mr-[0.25em]"}
            charSpace={"-mr-[0.01em]"}
          />
          <AnimatedBody
            text={description}
            className="mt-4 text-[16px] font-semibold text-[#555]"  // Removed max-width
          />
          <div className={`mt-9 flex flex-wrap  ${
            id % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
          } gap-4`}> {/* Always show technologies, wrap on smaller screens, justify based on id */}
            {technologies.map((tech, index) => (
              <AnimatedTitle
                text={tech}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
                key={index}
                className="text-[14px] font-bold uppercase md:text-[16px] lg:text-[18px] text-[#333]"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;