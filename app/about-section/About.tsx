import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import React from "react";

const About = () => {
  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16 pb-20 md:pt-20 md:pb-28 lg:pt-20 lg:pb-36"
      id="about"
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={
            <>
              I build technology that gives <span style={{ color: '#FDE68A' }}>small businesses</span> an <span style={{ color: '#60A5FA' }}>unfair</span> advantage.
            </>
          }
          className={
            "mb-10 text-left text-[24px] font-bold leading-[1.2em] tracking-tighter text-[#e4ded7] sm:text-[32px] md:mb-16 md:text-[40px] lg:text-[60px] xl:text-[80px]"
          }
          wordSpace={"mr-[0.25em]"}
          charSpace={"mr-[0.01em]"}
        />

        <div className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          <div className="mb-10 flex w-[100%] flex-col gap-8 text-[18px] font-medium leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-8 md:text-[20px] md:leading-relaxed lg:mb-16 lg:max-w-[65%] lg:text-[24px]">
            <AnimatedBody
              text={
                <>
                  Most business owners are trapped, spending too much time on <span style={{ color: '#5EEAD4' }}>repetitive tasks</span> and not enough on their actual craft. They know they need a <span style={{ color: '#60A5FA' }}>professional online presence</span> and smarter workflows, but the technology feels complex, expensive, and out of reach. I founded this practice to close that gap.
                </>
              }
            />
            <AnimatedBody
              text={
                <>
                  My approach is unique because I operate at the <span style={{ color: '#F0ABFC' }}>intersection</span> of business strategy, design, and AI engineering. I don&#39;t just build websites; I build digital storefronts designed to <span style={{ color: '#6EE7B7' }}>convert</span>. I don&#39;t just create chatbots; I build custom AI co-pilots that become your most efficient employee. My goal isn&#39;t just to complete a project—it&#39;s to deliver a system that directly saves you time and increases your revenue.
                </>
              }
            />
             <AnimatedBody
              text={
                <>
                  Whether it&#39;s establishing your foundational brand online, automating your operations with AI, or partnering for long-term growth, my work is a direct investment in your business&#39;s <span style={{ color: '#FDBA74' }}>autonomy</span> and <span style={{ color: '#FDE68A' }}>success</span>. Let&#39;s build your advantage.
                </>
              }
            />
          </div>

          <div className="mb-24 flex w-[100%] flex-col gap-8 text-[18px] font-normal leading-relaxed tracking-wide text-[#e4ded7]/80 sm:mb-32 md:mb-40 md:gap-8 md:text-[16px] md:leading-normal lg:mt-0 lg:mb-16 lg:max-w-[35%] lg:text-[18px]">
            <div className="flex flex-col gap-4">
              <AnimatedTitle
                text={"Core Capabilities"}
                className={
                  "text-[24px] font-semibold text-[#e4ded7] md:text-[30px] lg:text-[24px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <ul className="flex list-none flex-col gap-2">
                  <AnimatedBody text={<><span style={{ color: '#60A5FA' }}>- Strategic Web Design & Development</span></>} />
                  <AnimatedBody text={<><span style={{ color: '#C4B5FD' }}>- Custom AI & Automation Systems</span></>} />
                  <AnimatedBody text={<><span style={{ color: '#05B169' }}>- E-Commerce & Online Sales Platforms</span></>} />
                  <AnimatedBody text={<><span style={{ color: '#FDE68A' }}>- Data-Driven Marketing & SEO</span></>} />
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <AnimatedTitle
                text={"My Background"}
                className={
                  "text-[24px] font-semibold text-[#e4ded7] md:text-[30px] lg:text-[24px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "With a foundation as a founder, product leader, and full-stack developer, I bring a rare blend of strategic vision and hands-on technical execution to every project."
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