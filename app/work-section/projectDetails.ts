export type ProjectProps = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  available: boolean;
  color: string;
};

// Function to generate pastel HSL color
const getPastelColor = (index: number, total: number) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 70%, 80%)`; // Adjusted saturation and lightness for pastel look
};

const devProjectsData: Omit<ProjectProps, 'color'>[] = [
  {
    id: 0,
    name: "Dark Bloom",
    description:
      "A haunting mixed media work fusing organic textures with digital overlays.",
    technologies: ["Oil", "Surreal", "Textured"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: true,
  },
  {
    id: 1,
    name: "Feral Echo",
    description:
      "A striking sculpture of welded metal and found objects that evokes a wild, untamed energy.",
    technologies: ["Metal", "Found Objects", "Welded"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: true,
  },
  {
    id: 2,
    name: "Silent Pulse",
    description:
      "A digital painting capturing the heartbeat of darkness with pulsating, vibrant hues.",
    technologies: ["Vibrant", "Rhythmic", "Abstract"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: true,
  },
  {
    id: 3,
    name: "Spectral",
    description:
      "A delicate sculpture carved from reclaimed wood, exuding timeless melancholy and grace.",
    technologies: ["Wood", "Carved", "Melancholic"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: true,
  },
  {
    id: 4,
    name: "Obsidian",
    description:
      "A digital experiment where algorithmic patterns meet handcrafted brushstrokes for a futuristic edge.",
    technologies: ["Handcrafted", "Futuristic", "Digital"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: true,
  }
];

const designProjectsData: Omit<ProjectProps, 'color'>[] = [
  {
    id: 1,
    name: "Eclipse",
    description:
      "A dramatic oil painting that captures the interplay of light and shadow during a celestial moment.",
    technologies: ["Oil", "Light", "Shadow"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: false,
  },
  {
    id: 2,
    name: "Abyss",
    description:
      "An immersive installation exploring emotional depths with dark, layered forms and tactile materials.",
    technologies: ["Tactile", "Dark", "Layered"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: false,
  },
  {
    id: 3,
    name: "Rift",
    description:
      "A vibrant mixed-media piece symbolizing the fracture between reality and dreams through dynamic collage.",
    technologies: ["Mixed Media", "Collage", "Dynamic"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: false,
  },
  {
    id: 4,
    name: "Nebula",
    description:
      "A mesmerizing digital painting where swirling, cosmic colors create an otherworldly nebula of emotion.",
    technologies: ["Digital", "Cosmic", "Emotional"],
    github: "",
    demo: "",
    image: require(".//../../public/propellent.png"),
    available: false,
  },
];

export const devProjects: ProjectProps[] = devProjectsData.map((project, index) => ({
  ...project,
  color: getPastelColor(index, devProjectsData.length),
}));

export const designProjects: ProjectProps[] = designProjectsData.map((project, index) => ({
  ...project,
  color: getPastelColor(index, designProjectsData.length),
}));
