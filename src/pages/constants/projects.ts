import careexpandThumbnail from "../../assets/projects/thumbnails/carexpandThumbnail.png";
import queryhealthThumbnail from "../../assets/projects/thumbnails/queryhealthThumbnail.png";
import queryHealthMobileThumbnail from "../../assets/projects/thumbnails/queryhealthMobileThumbnail.png";
import dspThumbnail from "../../assets/projects/thumbnails/dspThumbnail.png";
import pianoPracticeThumbnail from "../../assets/projects/thumbnails/PianoPracticeThumbnail.png";

import portfolioThumbnails from "../../assets/projects/thumbnails/portfolioThumbnails.png";

const PROJECTS = [
  {
    id: 1,
    title: "Careexpand Plataform",
    description:
      "Careexpand is a platform that allows you to manage your patients and appointments.",
    image: careexpandThumbnail,
    technologies: [
      "React",
      "TypeScript",
      "SASS",
      "Redux",
      "Twilio",
      "Jest",
      "JWT",
      "Figma",
    ],
  },
  {
    id: 2,
    title: "Queryhealth App",
    description:
      "Chat with your personal AI assistant to get ready for your doctor's appointment.",
    image: queryHealthMobileThumbnail,
    technologies: [
      "React Native",
      "TypeScript",
      "SASS",
      "Persona",
      "Figma",
      "Vouched",
    ],
  },
  {
    id: 3,
    title: "Queryhealth Web App",
    description:
      "Queryhealth is a platform that allows you to manage your patients pre appointment information and integrate with your CRM such as Careexpand.",
    image: queryhealthThumbnail,
    technologies: [
      "React",
      "TypeScript",
      "SASS",
      "Zustand",
      "Motion",
      "Figma",
      "Vouched",
      "GptApi",
    ],
  },
  {
    id: 4,
    title: "DSP Project",
    description:
      "Application for the elderly to track their geofence and receive notifications when they are outside of their home.",
    image: dspThumbnail,
    technologies: [
      "React",
      "TypeScript",
      "SASS",
      "Axios",
      "Sockets",
      "Figma",
      "Motion",
    ],
  },
  {
    id: 5,
    title: "Learn to read Piano Sheet Mobile App",
    description:
      "This app helps you learn to read piano sheet music in the keys of C and G major.",
    image: pianoPracticeThumbnail,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    link: "https://piano-note-study.vercel.app/",
  },
  {
    id: 6,
    title: "Previous portfolios",
    description: "Previous portfolios of mine.",
    image: portfolioThumbnails,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Framer Motion",
    ],
    link: "https://github.com/LucasDDiazCuenca/Portfolio2",
  },
];

export default PROJECTS;
