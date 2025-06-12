import { StaticImageData } from "next/image";
import alex from "../../public/samuel.avif"; // We'll keep using these images for now, but you may want to replace them with skill-specific icons

export type skillProps = {
  name: string;
  category: string;
  icon: StaticImageData;
  description: string;
  index: number;
};

export const skillDetails = [
  {
    name: "Product Management",
    category: "Leadership",
    icon: alex,
    description: "Expert in product strategy, roadmapping, and agile methodologies. Proven track record in leading cross-functional teams and delivering successful products that meet market needs.",
    index: 0
  },
  {
    name: "AI & Machine Learning",
    category: "Technical",
    icon: alex,
    description: "Specialized in developing AI-powered solutions, including natural language processing, data preprocessing, and model selection. Experience with TensorFlow and PyTorch.",
    index: 1
  },
  {
    name: "Full-Stack Development",
    category: "Technical",
    icon: alex,
    description: "Proficient in both frontend and backend development, with expertise in JavaScript, Node.js, Python, and Ruby on Rails. Strong experience with SQL and NoSQL databases.",
    index: 2
  },
  {
    name: "UX/UI Design",
    category: "Design",
    icon: alex,
    description: "Skilled in user-centered design, rapid prototyping, and creating intuitive interfaces. Experience with Figma, Adobe XD, and implementing design systems.",
    index: 3
  },
  {
    name: "Business Strategy",
    category: "Business",
    icon: alex,
    description: "Demonstrated success in market analysis, go-to-market strategy, and business development. Experience in fundraising, P&L management, and scaling startups.",
    index: 4
  },
  {
    name: "Digital Marketing",
    category: "Business",
    icon: alex,
    description: "Expertise in SEO/SEM, content marketing, and social media strategy. Proven track record in user acquisition and campaign optimization.",
    index: 5
  }
]; 