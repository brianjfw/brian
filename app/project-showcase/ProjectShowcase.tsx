"use client"; // Added to mark this component as a Client Component

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { riseWithFade } from '../animations/animations'; // Assuming you have this
import { monaSans } from '../fonts/monaSans';
import dynamic from 'next/dynamic';

// Dynamically import the animated components with SSR disabled
const AnimatedTitle = dynamic(() => import('../animations/AnimatedTitle'), { ssr: false });
const AnimatedBody = dynamic(() => import('../animations/AnimatedBody'), { ssr: false });

// Define a type for the project, similar to your ProjectProps
export type ShowcaseProjectProps = {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  available: boolean;
  id: number;
};

// async function getProject(id: number): Promise<ShowcaseProjectProps | undefined> {
//   const res = await fetch('/data/projects.json');
//   const projects: ShowcaseProjectProps[] = await res.json();
//   return projects.find((project) => project.id === id);
// }

const ProjectShowcase: React.FC<ShowcaseProjectProps> = ({
  name,
  description,
  technologies,
  github,
  demo,
  image,
  available,
  id,
}) => {
  return (
    <motion.section
      className="relative z-10 flex w-full flex-col items-center justify-center bg-[#0E1016] text-[#e4ded7] py-16 md:py-24 lg:py-32"
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        {/* Project Image */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-lg mb-12"
          variants={riseWithFade}
        >
          <Image
            src={image}
            alt={name}
            width={1920} // Adjust as needed
            height={1080} // Adjust as needed
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Project Title and Description */}
        <div className="text-center mb-8">
          <AnimatedTitle
            text={name}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${monaSans.className} mb-4`}
            wordSpace="mr-4"
            charSpace="mr-0"
          />
          <AnimatedBody
            text={description}
            className="text-lg md:text-xl lg:text-2xl font-medium"
          />
        </div>

        {/* Technologies Used */}
        <motion.div variants={riseWithFade} className="mb-8">
          <h3 className={`text-2xl font-semibold ${monaSans.className} mb-4`}>
            Technologies Used
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-[#212531] text-[#e4ded7] py-2 px-4 rounded-full text-sm md:text-base"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Links to GitHub and Live Demo */}
        <motion.div variants={riseWithFade} className="flex justify-center gap-8">
          <Link
            href="https://www.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e4ded7] text-[#0E1016] py-3 px-6 rounded-lg font-semibold hover:bg-[#c4c0b8] transition-colors duration-300"
          >
            GitHub Repository
          </Link>
          {available && (
            <Link
              href="https://www.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e4ded7] text-[#0E1016] py-3 px-6 rounded-lg font-semibold hover:bg-[#c4c0b8] transition-colors duration-300"
            >
              Live Demo
            </Link>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectShowcase; 