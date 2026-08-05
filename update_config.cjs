const fs = require('fs');
const content = `export const config = {
    developer: {
        name: "Anurudh",
        fullName: "Anurudh Singh Rajawat",
        title: "Full-Stack Developer & UI/UX Designer",
        description: "3rd-year Computer Science & Engineering student at Parul Institute of Technology. Full-Stack Developer & UI/UX Designer building clean, responsive web applications, desktop tools, and Android apps."
    },
    social: {
        github: "https://github.com/Anurudrr",
        email: "sanurudh938@gmail.com",
        location: "India"
    },
    about: {
        title: "About Me",
        description: "I am a 3rd-year Computer Science & Engineering student at Parul Institute of Technology, Vadodara (2023–2027). Started with zero coding background in 2023, spent 2024 on UI/UX design (Figma, Canva, Adobe XD), crossed into frontend & React in 2025, now operates at the intersection of full-stack systems and high-fidelity design. I care about UI/UX as much as clean code — from React apps and Electron desktop tools to Android apps with Kotlin/Compose, and Java backend systems."
    },
    experiences: [
        {
            position: "Full-Stack Developer",
            company: "Self-Development",
            period: "2025-Present",
            location: "India",
            description: "Building modern web applications using React, Node.js, and databases. Creating seamless user experiences with modern UI/UX principles.",
            responsibilities: [
                "Developing full-stack web applications using React and Node.js",
                "Building RESTful APIs and integrating PostgreSQL",
                "Creating responsive and interactive user interfaces with Tailwind CSS and Motion"
            ],
            technologies: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "PostgreSQL", "Figma"]
        },
        {
            position: "UI/UX Designer",
            company: "Self-Development",
            period: "2024",
            location: "India",
            description: "Spent a year focusing on UI/UX design, creating wireframes, prototypes, and high-fidelity designs for web and mobile applications.",
            responsibilities: [
                "Designing interfaces using Figma, Canva, and Adobe XD",
                "Learning design principles, color theory, and typography",
                "Bridging the gap between design and development"
            ],
            technologies: ["Figma", "Canva", "Adobe XD", "Visual Design"]
        },
        {
            position: "Computer Science Student",
            company: "Parul Institute of Technology",
            period: "2023-Present",
            location: "Vadodara, India",
            description: "Pursuing a B.Tech in Computer Science & Engineering. Building strong fundamentals in data structures, algorithms, and software engineering.",
            responsibilities: [
                "Learning core computer science concepts",
                "Programming in Java and Kotlin",
                "Participating in hackathons and coding competitions"
            ],
            technologies: ["Java", "Kotlin", "C++", "DSA", "Problem Solving"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Evento",
            category: "Full-Stack Product",
            technologies: "React, Tailwind CSS, TypeScript, Motion, Node.js, Express",
            image: "/projects/evento.jpg",
            description: "A full-stack web application connecting users with top-rated event organizers and service providers. Implemented booking functionality, service discovery features, and a responsive UI for seamless event planning and reservations.",
            githubUrl: "https://github.com/Anurudrr/EVENTO-EVENT-MANAGER",
            demoUrl: "https://evento-six-livid.vercel.app/"
        },
        {
            id: 2,
            title: "Hopin",
            category: "Full-Stack Product",
            technologies: "TypeScript, Node.js, PostgreSQL, REST APIs, Vercel",
            image: "/projects/hopin.jpg",
            description: "A full-stack ride-sharing platform enabling users to find and match with commuters on similar routes. Engineered route matching algorithms, fare calculation and splitting, real-time location tracking, and user authentication.",
            githubUrl: "https://github.com/Anurudrr/HOPIN--CAB-SERVICES",
            demoUrl: "https://hopin-five.vercel.app/"
        }
    ],
    contact: {
        email: "sanurudh938@gmail.com",
        github: "https://github.com/Anurudrr",
        linkedin: "https://linkedin.com/in/anurudh-singh-rajawat",
        twitter: "https://x.com/anurudrr",
        facebook: "",
        instagram: ""
    },
    skills: {
        develop: {
            title: "FULL-STACK DEVELOPER",
            description: "Building scalable web & desktop applications",
            details: "Developing modern applications using React, TypeScript, Node.js, Java, and Kotlin. Focused on creating seamless user experiences and robust backend systems.",
            tools: ["React", "TypeScript", "Node.js", "Java", "Kotlin", "Express", "PostgreSQL", "Electron"]
        },
        design: {
            title: "UI/UX DESIGNER",
            description: "Creating intuitive & beautiful interfaces",
            details: "Designing high-fidelity prototypes and design systems using Figma and Adobe XD. Passionate about typography, layout, and user-centric design principles.",
            tools: ["Figma", "Adobe XD", "Canva", "Tailwind CSS", "Motion", "Visual Design"]
        }
    }
};
`;
fs.writeFileSync('src/redoyan/config.ts', content);
