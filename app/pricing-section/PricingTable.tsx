import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedWords2 from "../animations/AnimatedWords2";
import AnimatedBody from "../animations/AnimatedBody";
import { monaSans } from "../fonts/monaSans";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const pricingData = [
  {
    name: "The Growth Blueprint Session",
    category: "Consultation",
    description: "Feeling stuck or unsure where to invest your marketing dollars? In this intensive 90-minute strategy session, we'll dissect your online presence, identify your biggest opportunities, and build a prioritized, step-by-step action plan.",
    tagline: "Your 90-minute deep dive to build a clear, actionable roadmap for growth.",
    price: "$297",
    frequency: "One-Time Investment",
    features: [
      "90-minute 1-on-1 strategy call",
      "A documented PDF 'Growth Blueprint'",
      "Full cost credited to any project over $1,000"
    ],
    cta: "Book Your Session",
    url: "https://brianwilson1.gumroad.com/l/vdbpg",
  },
  {
    name: "The Momentum Starter",
    category: "Design",
    description: "Turn your approved design into a fully functional, pixel-perfect webpage that starts working for you immediately.",
    tagline: "Go from design to live homepage in 5 days.",
    price: "$500",
    frequency: "One-Time Project",
    whoIsItFor: "Businesses with a completed design ready for development.",
    features: [
      "Development of one homepage",
      "Full mobile & tablet responsiveness",
      "Functional contact form setup",
      "Deployment to your hosting"
    ],
    cta: "Start Project",
    url: "https://brianwilson1.gumroad.com/l/gzxfs",
  },
  {
    name: "The Digital Storefront",
    category: "Design",
    description: "Your most important employee. We'll build a complete, strategic online presence to build trust and drive action.",
    tagline: "Your complete 5-page website, built to convert.",
    price: "$1,500",
    frequency: "One-Time Project",
    whoIsItFor: "Serious businesses needing a foundational marketing hub.",
    features: [
      "Strategic design & development (up to 5 pages)",
      "Cohesive brand experience",
      "SEO-ready structure",
      "1-hour training session"
    ],
    cta: "Start Project",
    popular: true,
    url: "https://brianwilson1.gumroad.com/l/fiwjyg",
  },
  {
    name: "The Online Sales Engine",
    category: "Design",
    description: "We build secure, beautiful, and easy-to-manage eCommerce stores that make buying from you a pleasure.",
    tagline: "Open for business online. We build the store, you ship the orders.",
    price: "$2,500",
    frequency: "One-Time Project",
    whoIsItFor: "Boutiques, artisans, or restaurants ready to sell online.",
    features: [
      "Full eCommerce site setup (Shopify/WooCommerce)",
      "Setup for up to 20 products",
      "Secure payment gateway integration",
      "Automated order confirmation emails"
    ],
    cta: "Start Project",
    url: "https://brianwilson1.gumroad.com/l/hkxyjg",
  },
  {
    name: "The Business Co-Pilot",
    category: "Custom AI",
    description: "Your own custom AI, trained exclusively on your business documents, ready to act as your team's on-demand expert.",
    tagline: "Your custom-trained AI expert, ready in 48 hours.",
    price: "$500",
    frequency: "One-Time Setup",
    whoIsItFor: "Teams wanting to centralize knowledge and reduce repetitive questions.",
    features: [
      "Secure, private web portal for your AI",
      "Installable app icon for all devices",
      "Setup to connect to your own API keys",
      "1-hour training session on 'feeding' your AI"
    ],
    cta: "Build My Co-Pilot",
    url: "https://brianwilson1.gumroad.com/l/fssms",
  },
  {
    name: "The Custom AI Solution",
    category: "Custom AI",
    description: "A fully managed, end-to-end AI system designed to solve your most complex operational challenge and create a competitive advantage.",
    tagline: "Your outsourced AI development and automation team.",
    price: "Starts at $1,600",
    frequency: "/month",
    whoIsItFor: "Businesses ready to invest in a bespoke system to solve a core problem.",
    features: [
      "Deep-Dive Discovery & Solution Architecture",
      "Agile Development & Deployment",
      "Ongoing Operation & Performance Monitoring",
      "Requires a 3-month minimum engagement"
    ],
    cta: "Automate My Business",
    url: "https://brianwilson1.gumroad.com/l/cbqcduk",
  },
  {
    name: "Growth Partner",
    category: "Marketing",
    description: "Your foundational growth and maintenance plan to dominate local search and keep your site in perfect health.",
    tagline: "Dominate Google Maps and attract local customers.",
    price: "$597",
    frequency: "/month",
    whoIsItFor: "Service businesses that rely on local customers.",
    features: [
      "All Technical Maintenance",
      "Local SEO Power-Up",
      "2 Hours of Content/Site Updates",
      "Monthly Performance Report"
    ],
    cta: "Become a Partner",
    url: "https://brianwilson1.gumroad.com/l/javhe",
  },
  {
    name: "Performance Partner",
    category: "Marketing",
    description: "Our premier partnership to turn your website into a lead-generation machine with proactive, data-driven strategy.",
    tagline: "Your complete technical, content, and strategy team.",
    price: "$897",
    frequency: "/month",
    whoIsItFor: "Businesses focused on driving leads and revenue online.",
    features: [
      "Everything in Growth Partner, PLUS:",
      "An Additional 2 Hours of Updates (4 total)",
      "Advanced SEO Strategy",
      "Conversion Rate Optimization (CRO)",
    ],
    cta: "Become a Partner",
    popular: true,
    url: "https://brianwilson1.gumroad.com/l/javhe",
  },
];

const categories = [
  "Design",
  "Custom AI",
  "Marketing",
];

const cardColors = [
  // Modern pastel/vibrant gradients or colors
  "from-pink-500/80 to-pink-700/80",
  "from-blue-500/80 to-blue-700/80",
  "from-green-500/80 to-green-700/80",
  "from-yellow-400/80 to-yellow-600/80",
  "from-purple-500/80 to-purple-700/80",
  "from-teal-400/80 to-teal-600/80",
  "from-orange-500/80 to-orange-700/80",
  "from-fuchsia-500/80 to-fuchsia-700/80",
];

const highlightColors = [
  "#F9A8D4", // pastel pink
  "#60A5FA", // pastel blue
  "#6EE7B7", // pastel green
  "#FDE68A", // pastel yellow
  "#C4B5FD", // pastel purple
  "#5EEAD4", // pastel teal
  "#FDBA74", // pastel orange
  "#F0ABFC", // pastel fuchsia
];

type CardName =
  | 'The Growth Blueprint Session'
  | 'The Momentum Starter'
  | 'The Digital Storefront'
  | 'The Online Sales Engine'
  | 'The Business Co-Pilot'
  | 'The Custom AI Solution'
  | 'Growth Partner'
  | 'Performance Partner';

const cardHighlightMap: Record<CardName, string> = {
  'The Growth Blueprint Session': '#FDE68A', // yellow (consultation)
  'The Momentum Starter': '#F9A8D4', // pink
  'The Digital Storefront': '#60A5FA', // blue
  'The Online Sales Engine': '#6EE7B7', // green
  'The Business Co-Pilot': '#C4B5FD', // purple (AI)
  'The Custom AI Solution': '#F0ABFC', // fuchsia (AI)
  'Growth Partner': '#FDBA74', // orange (Marketing)
  'Performance Partner': '#5EEAD4', // teal (Marketing)
};

const PricingTable = () => {
  const [selectedCategory, setSelectedCategory] = useState("Design");

  const consultation = pricingData.find((item) => item.category === "Consultation");
  const filteredPackages = pricingData.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <motion.section
      className="relative z-10 w-full overflow-hidden bg-[#12182B] py-20 md:py-24"
      id="pricing"
      initial="initial"
      animate="animate"
    >
      <div className={`relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 px-4 text-[#e4ded7] ${monaSans.className}`}>
        {/* --- HEADER --- */}
        <div className="flex w-full flex-col items-center text-center">
            <h2 className="font-extrabold uppercase text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9em] text-[#e4ded7] mb-2">Solutions for Growth</h2>
            <AnimatedBody
            text="Clear pricing, powerful results. Find the perfect package to elevate your business, from foundational websites to advanced AI solutions."
            className="mt-4 w-[90%] max-w-[600px] text-center text-[16px] font-medium text-[#e4ded7]/80 md:text-[18px]"
            />
        </div>

        {/* --- CONSULTATION HIGHLIGHT CARD --- */}
        {consultation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border bg-[#12182B] p-8 text-center"
            style={{ borderColor: '#FDE68A' }}
          >
            <div className="absolute -top-1/2 -left-1/2 -z-10 h-[200%] w-[200%] animate-gradient-spin" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #0E1016 0deg, #FDE68A 10deg, #0E1016 30deg)' }}></div>
            <h3 className="text-xl font-bold uppercase tracking-widest" style={{ color: '#FDE68A' }}>
              Not Sure Where to Start?
            </h3>
            <p className="mt-4 text-4xl font-extrabold text-white">
              {consultation.name}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              {consultation.description}
            </p>
            <motion.a 
                href={consultation.url}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-block rounded-lg px-12 py-4 text-lg font-bold text-[#181A20] transition-colors"
                style={{ background: '#FDE68A', color: '#181A20' }}
                target="_blank" rel="noopener noreferrer"
            >
              Book for {consultation.price}
            </motion.a>
          </motion.div>
        )}

        {/* --- TABS --- */}
        <div className="mt-16 flex w-full flex-col items-center">
            <div className="mb-12 flex flex-wrap justify-center gap-4 rounded-full bg-[#181A20] p-2 border border-[#212531]">
                {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative rounded-full px-6 py-3 text-base font-medium transition-colors ${
                    selectedCategory === category
                        ? "text-[#181A20] bg-[#e4ded7]"
                        : "text-gray-300 hover:text-white"
                    }`}
                >
                    {selectedCategory === category && (
                    <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 z-0 rounded-full bg-[#e4ded7]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
                ))}
            </div>

            {/* --- PRICING CARDS GRID --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 ${selectedCategory === 'Design' ? 'lg:grid-cols-3' : ''}`}
                >
                {filteredPackages.map((pkg, idx) => {
                  const highlight = cardHighlightMap[pkg.name as CardName] || '#F9A8D4';
                  return (
                    <div 
                      key={pkg.name}
                      className={`relative flex flex-col rounded-2xl border bg-[#181A20] p-8 shadow-lg ${
                        pkg.name === 'Performance Partner'
                          ? ''
                          : pkg.popular 
                            ? 'border-blue-500/70 shadow-blue-900/20' 
                            : ''
                      }`}
                      style={{ borderColor: highlight }}
                    >
                      {/* Removed top accent bar */}
                      {/*
                      <div style={{ background: highlight }} className="absolute left-0 top-0 h-2 w-full rounded-t-2xl" />
                      */}
                      {pkg.name === 'Growth Partner' && (
                        <div className="absolute top-0 -translate-y-1/2 rounded-full px-4 py-1 text-sm font-semibold" style={{ background: '#FDBA74', color: '#181A20' }}>
                          Most Popular
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-semibold text-white">{pkg.name}</h3>
                      <p className="mt-2 text-sm uppercase tracking-wider text-neutral-400">{pkg.tagline}</p>
                      
                      <div className="mt-6 flex items-baseline gap-2">
                          <span className="text-4xl font-extrabold tracking-tight text-white">{pkg.price}</span>
                          <span className="text-sm font-semibold text-neutral-400">{pkg.frequency}</span>
                      </div>

                      <p className="mt-6 text-base text-neutral-300">{pkg.description}</p>
                      {pkg.whoIsItFor && (
                        <p className="mt-2 text-sm font-semibold" style={{ color: pkg.name === 'Performance Partner' ? '#5EEAD4' : highlight }}>{pkg.whoIsItFor}</p>
                      )}
                      <ul className="mt-8 space-y-4">
                          {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" style={{ color: pkg.name === 'Performance Partner' ? '#5EEAD4' : highlight }} />
                                  <span className="text-neutral-300">{feature}</span>
                              </li>
                          ))}
                      </ul>

                      <motion.a
                          href={pkg.url}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`mt-8 w-full rounded-lg py-3 text-center text-lg font-bold transition-colors ${
                              pkg.name === 'The Business Co-Pilot' || pkg.name === 'Performance Partner'
                                ? ''
                                : pkg.popular 
                                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                                  : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
                          }`}
                          style={pkg.name === 'The Business Co-Pilot'
                            ? { background: '#C4B5FD', color: '#181A20' }
                            : pkg.name === 'Performance Partner'
                              ? { background: '#5EEAD4', color: '#181A20' }
                              : {}}
                          target="_blank" rel="noopener noreferrer"
                      >
                          {pkg.cta}
                      </motion.a>
                    </div>
                  );
                })}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default PricingTable; 