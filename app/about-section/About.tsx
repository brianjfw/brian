import SongCarousel from "./SongCarousel";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import React from "react";

const About = () => {
  const emphasizedWords = [
    "multimedia",
    "refined",
    "transformation",
    "storytelling",
    "ever-changing",
  ];

  // Function to generate pastel HSL color
  const getPastelColor = (index: number, total: number) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 80%)`; // Adjusted saturation and lightness for pastel look
  };

  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16 pb-36 md:pt-20 md:pb-44 lg:pt-20 lg:pb-56"
      id="about"
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={
            "THANKS FOR STOPPING BY! I AM THRILLED YOU HAVE TAKEN A MOMENT TO DIVE INTO MY CREATIVE WORLD"
          }
          className={
            "mb-10 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]"
          }
          wordSpace={"mr-[14px]"}
          charSpace={"mr-[0.001em]"}
        />

        <div className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-medium  leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:mb-16  lg:max-w-[90%] lg:text-[24px] ">
            <AnimatedBody
              text={
                <>
                  I am a{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(0, emphasizedWords.length) }}
                  >
                    {emphasizedWords[0]}
                  </span>
                  , content creator, and writer on a journey of exploration where art is
                  not confined to one medium. I craft blogs, videos, paintings, and
                  one-of-a-kind pieces that evolve as I do.
                </>
              }
            />
            <AnimatedBody
              text={
                <>
                  Each project is a chance to play with contrasts: I love blending the
                  unsettling with the comforting, the abstract with a touch of{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(1, emphasizedWords.length) }}
                  >
                    {emphasizedWords[1]}
                  </span>
                  , to spark a little wonder and maybe even a hint of introspection.
                </>
              }
            />
            <AnimatedBody
              text={
                <>
                  My work is driven by the thrill of{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(2, emphasizedWords.length) }}
                  >
                    {emphasizedWords[2]}
                  </span>
                  —taking the ordinary and pushing it into the realm of the unexpected.
                  I am inspired by a universe where the surreal meets the sublime,
                  where emotions and images merge into something that challenges you to
                  see the world from a new perspective.
                </>
              }
            />
            <AnimatedBody
              text={
                <>
                  Whether it's an experiment in digital{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(3, emphasizedWords.length) }}
                  >
                    {emphasizedWords[3]}
                  </span>
                  or a piece that fuses tactile art with fluid narrative, I aim to
                  create experiences that are as thought-provoking as they are
                  beautifully strange.
                </>
              }
            />
            <AnimatedBody
              text={
                <>
                  I invite you to wander through my art as if it were an{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(4, emphasizedWords.length) }}
                  >
                    {emphasizedWords[4]}
                  </span>
                  —one that holds surprises at every turn. Thank you for joining me at
                  the very beginning of this exciting adventure. I hope my work resonates
                  with you, challenges your ideas, and perhaps even comforts you in its
                  unpredictable way.
                </>
              }
            />
          </div>

          <div className="mb-24 flex w-[100%] flex-col gap-4 text-[18px] font-normal leading-relaxed tracking-wide text-[#e4ded7]/80 sm:mb-32 md:mb-40 md:gap-6 md:text-[16px] md:leading-normal lg:mt-0 lg:mb-16 lg:max-w-[30%] lg:text-[18px]">
            <div className="flex flex-col gap-4 md:gap-3">
              <AnimatedTitle
                text={"Haunting Hues"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "oil paintings, acrylic abstracts, watercolor illusions, encaustic textures, palette knife impasto works, pastel sketches, spray-painted murals, luminescent mixed media canvases, atmospheric charcoals, glazing techniques, varnished realism"
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Distorted Forms"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "metal sculptures, welded steel constructs, wood assemblages, recycled material carvings, intricate busts, cast bronze figures, ceramic distortions, glass installations, stone reliefs, fiber art sculptures, kinetic bronze reliefs"
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Otherworldly Environments"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "kinetic installations, site-specific interventions, immersive sculptures, interactive structures, light-and-sound installations, projection mapping experiences, shadow play exhibits, environmental art pieces, public space interventions, spatial reconfigurations, sculptural land art"
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:-mt-0 lg:mt-28">
          <SongCarousel />
          <AnimatedBody
            text="Join me as I turn a deck of playing cards into a collection of art pieces."
            className="absolute bottom-10 right-0 left-0 mx-auto w-[90%] text-center text-[14px] font-semibold uppercase text-[#e4ded7] sm:w-[500px] md:bottom-12 md:w-[550px] md:text-[16px] "
          />
        </div>
      </div>
    </section>
  );
};

export default About;
