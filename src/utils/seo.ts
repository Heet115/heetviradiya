export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const defaultSEO: SEOData = {
  title: "Heet Viradiya - Full Stack Web Developer | React, TypeScript, Node.js Expert",
  description: "Experienced Full Stack Web Developer specializing in React, TypeScript, Node.js, and modern web technologies. Creating scalable, responsive web applications with exceptional user experiences. Available for freelance projects and full-time opportunities.",
  keywords: "Heet Viradiya, Web Developer, Full Stack Developer, React Developer, TypeScript, JavaScript, Node.js, Frontend Developer, Backend Developer, Tailwind CSS, Next.js, MongoDB, PostgreSQL, Web Development, Software Engineer, Portfolio, Freelance Developer",
  image: "https://heetviradiya.tech/og-image.jpg",
  url: "https://heetviradiya.tech/",
  type: "website",
  author: "Heet Viradiya"
};

export const getProjectSEO = (projectId: string, projectTitle: string, projectDescription: string): SEOData => {
  return {
    title: `${projectTitle} - Project by Heet Viradiya | Full Stack Web Developer`,
    description: `${projectDescription} Built by Heet Viradiya using modern web technologies. View project details, technologies used, and live demo.`,
    keywords: `${projectTitle}, Heet Viradiya, Web Development Project, React, TypeScript, JavaScript, Portfolio Project, ${projectTitle.toLowerCase().replace(/\s+/g, ', ')}`,
    image: "https://heetviradiya.tech/og-image.jpg",
    url: `https://heetviradiya.tech/projects/${projectId}`,
    type: "article",
    author: "Heet Viradiya",
    section: "Projects",
    tags: ["Web Development", "Portfolio", "Project", projectTitle]
  };
};

export const getPageSEO = (page: string): SEOData => {
  const seoData: Record<string, SEOData> = {
    home: defaultSEO,
    projects: {
      title: "Projects - Heet Viradiya | Full Stack Web Developer Portfolio",
      description: "Explore my portfolio of web development projects including e-commerce platforms, task management apps, weather dashboards, and more. Built with React, TypeScript, Node.js, and modern technologies.",
      keywords: "Heet Viradiya Projects, Web Development Portfolio, React Projects, TypeScript Projects, Full Stack Projects, JavaScript Projects, Node.js Projects, Portfolio Website",
      image: "https://heetviradiya.tech/og-image.jpg",
      url: "https://heetviradiya.tech/projects",
      type: "website",
      author: "Heet Viradiya"
    },
    about: {
      title: "About Heet Viradiya - Full Stack Web Developer | React & Node.js Expert",
      description: "Learn about Heet Viradiya, an experienced Full Stack Web Developer with expertise in React, TypeScript, Node.js, and modern web technologies. Passionate about creating exceptional user experiences.",
      keywords: "About Heet Viradiya, Web Developer Bio, Full Stack Developer Experience, React Developer, TypeScript Expert, Node.js Developer, Web Development Skills",
      image: "https://heetviradiya.tech/og-image.jpg",
      url: "https://heetviradiya.tech/#about",
      type: "profile",
      author: "Heet Viradiya"
    },
    skills: {
      title: "Skills & Technologies - Heet Viradiya | Full Stack Web Developer",
      description: "Discover my technical skills and expertise in React, TypeScript, JavaScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, and other modern web development technologies.",
      keywords: "Heet Viradiya Skills, Web Development Skills, React Skills, TypeScript Skills, JavaScript Skills, Node.js Skills, Full Stack Skills, Frontend Skills, Backend Skills",
      image: "https://heetviradiya.tech/og-image.jpg",
      url: "https://heetviradiya.tech/#skills",
      type: "website",
      author: "Heet Viradiya"
    },
    experience: {
      title: "Experience - Heet Viradiya | Full Stack Web Developer Career",
      description: "Explore my professional experience as a Full Stack Web Developer, including projects, achievements, and career progression in web development and software engineering.",
      keywords: "Heet Viradiya Experience, Web Developer Experience, Full Stack Developer Career, Professional Experience, Web Development Jobs, Software Engineer Experience",
      image: "https://heetviradiya.tech/og-image.jpg",
      url: "https://heetviradiya.tech/#experience",
      type: "website",
      author: "Heet Viradiya"
    },
    contact: {
      title: "Contact Heet Viradiya - Full Stack Web Developer | Hire for Projects",
      description: "Get in touch with Heet Viradiya for web development projects, collaborations, or job opportunities. Available for freelance work and full-time positions.",
      keywords: "Contact Heet Viradiya, Hire Web Developer, Full Stack Developer Contact, Web Development Services, Freelance Web Developer, React Developer for Hire",
      image: "https://heetviradiya.tech/og-image.jpg",
      url: "https://heetviradiya.tech/#contact",
      type: "website",
      author: "Heet Viradiya"
    }
  };

  return seoData[page] || defaultSEO;
};

// Generate structured data for different content types
export const generatePersonStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Heet Viradiya",
    "jobTitle": "Full Stack Web Developer",
    "description": "Experienced Full Stack Web Developer specializing in React, TypeScript, Node.js, and modern web technologies",
    "url": "https://heetviradiya.tech",
    "image": "https://heetviradiya.tech/og-image.jpg",
    "sameAs": [
      "https://github.com/Heet115",
      "https://www.linkedin.com/in/heet-viradiya-919198369/",
      "https://twitter.com/Heet115"
    ],
    "knowsAbout": [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Next.js",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "Web Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Gujarat"
    },
    "email": "hpviradiya05@gmail.com"
  };
};

export const generateWebsiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Heet Viradiya Portfolio",
    "url": "https://heetviradiya.tech",
    "description": "Portfolio website of Heet Viradiya, Full Stack Web Developer",
    "author": {
      "@type": "Person",
      "name": "Heet Viradiya"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://heetviradiya.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateProjectStructuredData = (project: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://heetviradiya.tech/projects/${project.id}`,
    "image": project.image,
    "author": {
      "@type": "Person",
      "name": "Heet Viradiya"
    },
    "dateCreated": project.startDate,
    "dateModified": project.endDate || project.startDate,
    "keywords": project.technologies.join(", "),
    "genre": "Web Development",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "programmingLanguage": project.technologies,
    "runtimePlatform": "Web Browser",
    "applicationCategory": "WebApplication"
  };
};

// SEO utility functions
export const generateMetaKeywords = (baseKeywords: string[], additionalKeywords: string[] = []): string => {
  const allKeywords = [...baseKeywords, ...additionalKeywords];
  return [...new Set(allKeywords)].join(', ');
};

export const truncateDescription = (description: string, maxLength: number = 160): string => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3).trim() + '...';
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://heetviradiya.tech';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};