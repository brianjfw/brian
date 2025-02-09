import { StaticImageData } from "next/image";
import alex from "../../public/samuel.avif";
import jerry from "../../public/jerry.avif";
import mauro from "../../public/mauro.jpeg";
import alan from "../../public/alan.jpeg";
import olamide from "../../public/olamide.jpeg";
import umar from "../../public/umar.jpeg";

export type reviewProps = {
  name: string;
  role: string;
  company: string;
  profileImg: StaticImageData;
  testimonial: string;
  index: number;
};

export const reviewDetails = [
  {
    name: "Maya T.",
    role: "",
    company: "",
    profileImg: alex,
    testimonial:
      "Heather’s work transports you to another realm—where every stroke and sculpture speaks a language of its own. I left her gallery feeling both unsettled and comforted, like I’d glimpsed the raw poetry of life.",
  },
  {
    name: "Jordan R.",
    role: "",
    company: "",
    profileImg: jerry,
    testimonial:
      "Visiting Heather’s exhibit was a revelation. Her art is a brilliant collision of the eerie and the elegant, challenging my perceptions and sparking a newfound curiosity about the world.",
  },
  {
    name: "Alex P.",
    role: "",
    company: "",
    profileImg: mauro,
    testimonial:
      "I’ve experienced countless art shows, but Heather Hudson’s creations are unlike any other. Her immersive installations draw you in, inviting a dialogue between the fantastical and the familiar.",
  },
  {
    name: "Taylor S.",
    role: "",
    company: "",
    profileImg: umar,
    testimonial:
      "Heather’s multimedia pieces are a masterful exploration of emotion and texture. Each work is a journey that provokes deep thought and leaves a lasting impression on the soul.",
  },
  {
    name: "Casey M.",
    role: "",
    company: "",
    profileImg: olamide,
    testimonial:
      "The way Heather blends physical art with abstract vision is truly captivating. Her work turns ordinary moments into an extraordinary dance of shadows, colors, and emotions.",
  },
  {
    name: "Riley K.",
    role: "",
    company: "",
    profileImg: alan,
    testimonial:
      "Every piece of Heather’s art feels like a personal invitation to explore the mysteries of beauty and the dark. I left her exhibit inspired, reflective, and eager to see what comes next.",
  },
  
];
