import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import React from "react";

const About = () => {
  const emphasizedWords = [
    "Product Leader",
    "Entrepreneur",
    "AI Specialist",
    "Full-Stack Developer",
    "UX/UI Designer",
  ];

  // Function to generate pastel HSL color
  const getPastelColor = (index: number, total: number) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 80%)`; // Adjusted saturation and lightness for pastel look
  };

  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16 pb-20 md:pt-20 md:pb-28 lg:pt-20 lg:pb-36"
      id="about"
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={
            "ENTREPRENEURIAL PRODUCT LEADER DRIVEN BY INNOVATION AND TECHNICAL EXCELLENCE"
          }
          className={
            "mb-10 text-left text-[24px] font-bold leading-[1.2em] tracking-tighter text-[#e4ded7] sm:text-[32px] md:mb-16 md:text-[40px] lg:text-[60px] xl:text-[80px]"
          }
          wordSpace={"mr-[0.25em]"}
          charSpace={"mr-[0.01em]"}
        />

        <div className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-medium leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:mb-16 lg:max-w-[90%] lg:text-[24px]">
            <AnimatedBody
              text={
                <>
                  As a{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(0, emphasizedWords.length) }}
                  >
                    {emphasizedWords[0]}
                  </span>
                  {" "}and{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(1, emphasizedWords.length) }}
                  >
                    {emphasizedWords[1]}
                  </span>
                  , I am driven to identify significant market gaps and build innovative solutions that fill them. My work is best exemplified by Crescent AI, the intelligent workspace I founded to fundamentally change how teams access knowledge and automate workflows. By focusing on critical business needs, I lead ventures from initial concept to rapid growth, creating products that deliver tangible value and drive market momentum.
                </>
              }
            />
            <AnimatedBody
              text={
                <>
                  This vision is built on a foundation of deep, hands-on technical expertise. As an{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(2, emphasizedWords.length) }}
                  >
                    {emphasizedWords[2]}
                  </span>
                  {" "}and{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(3, emphasizedWords.length) }}
                  >
                    {emphasizedWords[3]}
                  </span>
                  , I architect and engineer comprehensive solutions from concept to code. However, I believe powerful technology must be intuitive. That&apos;s why I integrate every feature with a sharp focus on{" "}
                  <span
                    className="font-bold"
                    style={{ color: getPastelColor(4, emphasizedWords.length) }}
                  >
                    {emphasizedWords[4]}
                  </span>
                  {" "}design, ensuring the final product is not only technically robust but also genuinely engaging and easy for people to use.
                </>
              }
            />
          </div>

          <div className="mb-24 flex w-[100%] flex-col gap-4 text-[18px] font-normal leading-relaxed tracking-wide text-[#e4ded7]/80 sm:mb-32 md:mb-40 md:gap-6 md:text-[16px] md:leading-normal lg:mt-0 lg:mb-16 lg:max-w-[30%] lg:text-[18px]">
            <div className="flex flex-col gap-4 md:gap-3">
              <AnimatedTitle
                text={"Technical Expertise"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "UX/UI Design, Full-Stack Development, Machine Learning & AI, Data Visualization, DevOps & Cloud Infrastructure, RESTful APIs, Database Management"
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Business & Product"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "Product Management, Agile/Scrum, Market Analysis, Go-to-Market Strategy, Digital Marketing, Sales & CRM, Fundraising, Business Development"
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Awards & Recognition"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "Founder's Institute, NVIDIA Inception Program, Semi-finalist at Pepperdine University's Most Fundable Companies (2025)"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
