"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectProps } from "./projectDetails";
import Link from "next/link";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedBody from "../animations/AnimatedBody";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial, Center } from "@react-three/drei";
import { useState, useRef, useMemo, Suspense } from "react"; // Added useMemo and Suspense
import { extend } from "@react-three/fiber";
import type { StaticImageData } from 'next/image';

// -----------------------------
// Improved type guard for StaticImageData
function isStaticImageData(img: any): img is StaticImageData {
  return (
    img &&
    typeof img === "object" &&
    "src" in img && typeof img.src === "string" &&
    "width" in img && typeof img.width === "number" &&
    "height" in img && typeof img.height === "number"
  );
}
// -----------------------------

// Shader Material Definition (for liquid hover effect)
const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 0.5,
    dispFactor: 0,
    tex: null,
    tex2: null,
    disp: null,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  `
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 dispTex = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (dispTex.r * effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (dispTex.r * effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
    }
  `
);

extend({ ImageFadeMaterial });

interface FadingImageProps {
  image: string | StaticImageData;
  aspectRatio?: number; // Make aspect ratio prop optional
}

function FadingImage({ image, aspectRatio = 4 / 3 }: FadingImageProps) {
  const ref = useRef<any>(null); // Explicitly initialize with null

  // Determine image path and handle potential errors
  const computedImagePath = useMemo(() => {
    if (typeof image === "string") {
      return image;
    } else if (image && typeof image === 'object' && 'src' in image && typeof image.src === 'string') {
      return image.src;
    }
    // Got an invalid image prop (or none) – return null so that the fallback takes over
    return null;
  }, [image]);

  // Fallback: 1x1 transparent GIF (useMemo for optimization)
  const fallbackImagePath = useMemo(() => "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", []);

  const validImagePath = useMemo(() => computedImagePath || fallbackImagePath, [computedImagePath, fallbackImagePath]);


  const displacementPath = useMemo(() => "/img/displacement/13.jpg", []);  //useMemo since it's static.
  const textures = useTexture([validImagePath, validImagePath, displacementPath]);
  const [texture1, texture2, dispTexture] = useMemo(() => textures, [textures]); // useMemo for textures

  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (ref.current && ref.current.dispFactor !== undefined) { // Check for dispFactor
      ref.current.dispFactor = THREE.MathUtils.lerp(
        ref.current.dispFactor,
        hovered ? 1 : 0,
        0.075
      );
    }
  });

  // Calculate plane geometry arguments based on aspectRatio.  Default to 4/3 if not provided.
  const planeGeometryArgs = useMemo((): [number, number] => [2, 2 / aspectRatio], [aspectRatio]);

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerLeave={() => setHover(false)} // Add onPointerLeave
    >
      <planeGeometry args={planeGeometryArgs} />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
}

interface ProjectCardProps extends ProjectProps {
  // You can add additional props specific to the card here if needed
}

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
}: ProjectCardProps) => {


  // Helper function to darken the color for text
  const getDarkerColor = useMemo(() => (color: string) => {
    if (!color.startsWith("hsl")) {
      return "#333"; // Default dark color
    }

    try {
      const [hue, saturation, lightness] = color
        .substring(4, color.length - 1)
        .split(",")
        .map((str) => parseFloat(str));

      const darkerLightness = Math.max(0, lightness - 20);
      return `hsl(${hue}, ${saturation}%, ${darkerLightness}%)`;
    } catch (error) {
      console.error("Invalid color format:", color, error);
      return "#333"; // Default dark color
    }
  }, []); // Empty dependency array, calculates only once

  const textColor = useMemo(() => getDarkerColor(color), [getDarkerColor, color]); // Memoize textColor

  // Determine aspect ratio from image, if available
  const imageAspectRatio = useMemo(() => {
    if (isStaticImageData(image) && image.height !== 0) {
      const img = image as StaticImageData; // Explicitly assert image is a StaticImageData
      return img.width / img.height;
    }
    return 4 / 3; // Default aspect ratio
  }, [image]);


  return (
    <motion.div
      style={{
        backgroundColor: color,
        // Removed backgroundSize, backgroundRepeat, backgroundPosition: let the Canvas handle image display
        position: "relative",
      }}
      className="relative z-10 w-full overflow-hidden rounded-3xl py-0" // Removed bg-center
      initial="initial"
      animate="animate"
    >
      <div
        className="relative w-full md:flex md:items-center md:gap-4"
        style={{
          minHeight: "300px",
        }}
      >
        <div className={`relative w-full md:w-1/2 ${id % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
          <Canvas
            camera={{ position: [0, 0, 2], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ alpha: true }} // Ensure alpha is true for transparency
            dpr={[1, 2]} // Add dpr for better resolution on high-density displays
          >
            <Suspense fallback={null}>
              <Center>
                <FadingImage image={image} aspectRatio={imageAspectRatio} />
              </Center>
            </Suspense>
          </Canvas>
        </div>

        {/* TEXT CONTENT CONTAINER */}
        <div
          className={`w-full p-4 md:w-1/2 text-white md:py-8 md:pr-6 ${
            id % 2 === 0 ? "md:order-1 md:text-left" : "md:order-2 md:text-right"
          }`}
          style={{ color: textColor }}
        >
          {/* GitHub Link (Optional, based on your original design) */}
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} project on GitHub`}
              className="absolute top-4 right-4 rounded-full bg-[#e4ded7] transition-colors duration-300 hover:bg-[#c4c0b8] flex items-center justify-center z-20"
              style={{ width: "40px", height: "40px" }}
              data-blobity-magnetic="true"
              data-blobity-offset-x="2"
              data-blobity-offset-y="2"
            >
              <FontAwesomeIcon icon={faGithub} className="text-[#0E1016] text-lg" />
            </Link>
          )}

          {/* Demo/Link Button (Now correctly positioned) */}
          {(demo || available) && ( // Show only if demo or available is true
            <Link
              href={demo || (available ? "https://www.etsy.com/" : "#")} // Use demo link, or Etsy if available, otherwise default to "#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} ${demo ? "demo" : "project"}`}
              className="absolute top-4 left-4 rounded-full bg-[#e4ded7] transition-colors duration-300 hover:bg-[#c4c0b8] flex items-center justify-center z-20"
              style={{ width: "40px", height: "40px" }}
              data-blobity-magnetic="true"
              data-blobity-offset-x="2"
              data-blobity-offset-y="2"
            >
              <FontAwesomeIcon icon={faLink} className="text-[#0E1016] text-lg" />
            </Link>
          )}

          <AnimatedTitle
            text={name}
            className="text-[40px] leading-none text-[#fafafa] md:text-[44px] lg:text-[48px]"
            wordSpace={"mr-[0.25em]"}
            charSpace={"-mr-[0.01em]"}
          />
          <AnimatedBody
            text={description}
            className="mt-4 text-[16px] font-semibold" // Removed specific color
            style={{ color: textColor }}  // Apply calculated text color
          />
          <div
            className={`mt-9 flex flex-wrap ${
              id % 2 === 0 ? "md:justify-start" : "md:justify-end"
            } gap-4`}
          >
            {technologies.map((tech, index) => (
              <AnimatedTitle
                text={tech}
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
                key={index}
                className="text-[14px] font-bold uppercase md:text-[16px] lg:text-[18px]"
                style={{ color: textColor }} // Apply calculated text color
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;