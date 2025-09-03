export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'planned';
  teamSize: number;
  role: string;
  challenges: string[];
  features: string[];
  learnings: string[];
  stats?: {
    stars?: number;
    forks?: number;
    commits?: number;
    contributors?: number;
  };
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and order processing.',
    longDescription: 'This comprehensive e-commerce platform was built to provide a seamless shopping experience for both customers and administrators. The project involved creating a scalable architecture that could handle high traffic loads while maintaining excellent performance. The platform includes advanced features like real-time inventory management, automated email notifications, and detailed analytics dashboard for business insights.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'Express.js', 'JWT', 'Cloudinary'],
    githubUrl: 'https://github.com/heetviradiya/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    startDate: 'Jan 2024',
    endDate: 'Mar 2024',
    status: 'completed',
    teamSize: 3,
    role: 'Full-Stack Developer & Team Lead',
    features: [
      'User authentication and authorization with JWT',
      'Product catalog with advanced filtering and search',
      'Shopping cart with persistent storage',
      'Secure payment processing with Stripe',
      'Order management and tracking system',
      'Admin dashboard for inventory management',
      'Real-time notifications and email alerts',
      'Responsive design for all devices',
      'SEO optimization and performance monitoring',
      'Automated testing and CI/CD pipeline'
    ],
    challenges: [
      'Implementing secure payment processing while maintaining PCI compliance standards and handling various payment methods including credit cards, digital wallets, and international currencies.',
      'Optimizing database queries and implementing caching strategies to handle high traffic loads during peak shopping seasons without compromising user experience.',
      'Creating a scalable architecture that could accommodate future feature additions and integrations with third-party services like shipping providers and tax calculation APIs.'
    ],
    learnings: [
      'Gained deep understanding of payment gateway integration and security best practices, including tokenization, encryption, and fraud detection mechanisms.',
      'Learned advanced React patterns for state management in complex applications, including context optimization and custom hooks for better code reusability.',
      'Developed expertise in database optimization techniques, including indexing strategies, query optimization, and implementing efficient caching layers with Redis.'
    ],
    stats: {
      stars: 45,
      forks: 12,
      commits: 287,
      contributors: 3
    }
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription: 'This task management application was designed to streamline team productivity and project coordination. Built with modern web technologies, it provides real-time collaboration features that allow teams to work together seamlessly regardless of their location. The application includes advanced project management features like Gantt charts, time tracking, and detailed reporting capabilities.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'PostgreSQL', 'Tailwind CSS', 'NextAuth.js', 'Vercel'],
    githubUrl: 'https://github.com/heetviradiya/task-manager',
    liveUrl: 'https://taskmanager-pro.vercel.app',
    startDate: 'Apr 2024',
    endDate: 'Jun 2024',
    status: 'completed',
    teamSize: 2,
    role: 'Lead Frontend Developer',
    features: [
      'Real-time collaborative task editing and updates',
      'Drag-and-drop task management with Kanban boards',
      'Team member assignment and role management',
      'Project timeline visualization with Gantt charts',
      'Time tracking and productivity analytics',
      'File attachments and comment system',
      'Custom notifications and email reminders',
      'Advanced filtering and search capabilities',
      'Mobile-responsive design with PWA features',
      'Integration with popular calendar applications'
    ],
    challenges: [
      'Implementing real-time synchronization across multiple users while handling conflict resolution and maintaining data consistency in collaborative editing scenarios.',
      'Optimizing the drag-and-drop interface for smooth performance across different devices and browsers, especially on mobile devices with touch interactions.',
      'Designing an efficient database schema that could handle complex relationships between projects, tasks, users, and permissions while maintaining query performance.'
    ],
    learnings: [
      'Mastered WebSocket implementation with Socket.io for real-time features, including connection management, room-based broadcasting, and handling network interruptions.',
      'Developed expertise in TypeScript for large-scale applications, including advanced type definitions, generic constraints, and utility types for better code safety.',
      'Learned database design principles for complex relational data, including normalization strategies, indexing for performance, and implementing efficient many-to-many relationships.'
    ],
    stats: {
      stars: 78,
      forks: 23,
      commits: 412,
      contributors: 2
    }
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics using modern APIs.',
    longDescription: 'This weather dashboard provides comprehensive weather information with an intuitive and visually appealing interface. The application integrates multiple weather APIs to provide accurate forecasts, historical data, and severe weather alerts. It features interactive maps, customizable widgets, and detailed analytics that help users make informed decisions based on weather conditions.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop'
    ],
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Vuex', 'SCSS', 'Leaflet', 'PWA', 'Vite'],
    githubUrl: 'https://github.com/heetviradiya/weather-dashboard',
    liveUrl: 'https://weather-pro-dashboard.netlify.app',
    startDate: 'Jul 2024',
    endDate: 'Aug 2024',
    status: 'completed',
    teamSize: 1,
    role: 'Full-Stack Developer',
    features: [
      'Current weather conditions with detailed metrics',
      '7-day weather forecast with hourly breakdowns',
      'Interactive weather maps with multiple layers',
      'Location-based weather alerts and notifications',
      'Historical weather data and trend analysis',
      'Customizable dashboard with widget system',
      'Offline functionality with service workers',
      'Multiple location tracking and comparison',
      'Weather-based activity recommendations',
      'Export functionality for weather reports'
    ],
    challenges: [
      'Integrating multiple weather APIs while handling rate limits, data inconsistencies, and API downtime to ensure reliable weather information delivery.',
      'Creating responsive and interactive maps that perform well on various devices while displaying complex weather data layers and maintaining smooth user interactions.',
      'Implementing efficient data caching strategies to minimize API calls while ensuring users always have access to the most current weather information.'
    ],
    learnings: [
      'Gained experience with Vue.js ecosystem including Vuex for state management, Vue Router for navigation, and Vue CLI for project setup and build optimization.',
      'Learned to work with geolocation APIs and mapping libraries, including coordinate systems, map projections, and overlay management for weather data visualization.',
      'Developed skills in Progressive Web App development, including service workers, caching strategies, and offline functionality for improved user experience.'
    ],
    stats: {
      stars: 34,
      forks: 8,
      commits: 156,
      contributors: 1
    }
  },
  {
    id: 'social-media-analytics',
    title: 'Social Media Analytics',
    description: 'A comprehensive analytics dashboard for social media metrics with data visualization, reporting, and automated insights.',
    longDescription: 'This social media analytics platform provides businesses and content creators with deep insights into their social media performance across multiple platforms. The application aggregates data from various social media APIs, processes it using advanced algorithms, and presents actionable insights through interactive dashboards and automated reports.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop'
    ],
    technologies: ['React', 'D3.js', 'Python', 'Django', 'Redis', 'PostgreSQL', 'Celery', 'Docker'],
    githubUrl: 'https://github.com/heetviradiya/social-analytics',
    liveUrl: 'https://social-analytics-pro.herokuapp.com',
    startDate: 'Sep 2024',
    status: 'in-progress',
    teamSize: 4,
    role: 'Frontend Lead & Data Visualization Specialist',
    features: [
      'Multi-platform social media data aggregation',
      'Real-time analytics dashboard with custom metrics',
      'Advanced data visualization with interactive charts',
      'Automated report generation and scheduling',
      'Competitor analysis and benchmarking tools',
      'Sentiment analysis for posts and comments',
      'Influencer identification and tracking',
      'ROI calculation for social media campaigns',
      'Custom alert system for performance thresholds',
      'White-label solution for agencies'
    ],
    challenges: [
      'Managing and processing large volumes of social media data from multiple APIs while handling rate limits, authentication complexities, and varying data formats.',
      'Creating intuitive and performant data visualizations that can handle real-time updates and large datasets without compromising user experience or browser performance.',
      'Implementing scalable backend architecture that can process social media data in real-time while maintaining data accuracy and handling peak traffic loads.'
    ],
    learnings: [
      'Developed expertise in D3.js for creating custom, interactive data visualizations that provide meaningful insights from complex social media datasets.',
      'Learned advanced Python and Django techniques for building scalable APIs, including async processing, caching strategies, and database optimization for analytics workloads.',
      'Gained experience with microservices architecture and containerization using Docker, including service orchestration and deployment strategies for analytics applications.'
    ],
    stats: {
      stars: 67,
      forks: 19,
      commits: 324,
      contributors: 4
    }
  },
  {
    id: 'mobile-banking-app',
    title: 'Mobile Banking App',
    description: 'A secure mobile banking application with biometric authentication, transaction history, and real-time notifications.',
    longDescription: 'This mobile banking application was developed with security as the top priority, implementing multiple layers of protection including biometric authentication, end-to-end encryption, and fraud detection algorithms. The app provides a comprehensive banking experience with features like account management, money transfers, bill payments, and investment tracking, all within a user-friendly interface.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    ],
    technologies: ['React Native', 'Firebase', 'Plaid API', 'Redux', 'TypeScript', 'Expo', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/heetviradiya/mobile-banking',
    startDate: 'Oct 2024',
    status: 'in-progress',
    teamSize: 5,
    role: 'Mobile App Developer',
    features: [
      'Biometric authentication (fingerprint and face recognition)',
      'Account balance and transaction history viewing',
      'Secure money transfers between accounts',
      'Bill payment and recurring payment setup',
      'Mobile check deposit with image processing',
      'Real-time transaction notifications',
      'Spending analytics and budget tracking',
      'ATM and branch locator with maps',
      'Customer support chat integration',
      'Multi-language support and accessibility features'
    ],
    challenges: [
      'Implementing bank-level security measures including end-to-end encryption, secure key storage, and compliance with financial regulations like PCI DSS and PSD2.',
      'Integrating with multiple banking APIs and third-party services while maintaining consistent user experience and handling various data formats and authentication methods.',
      'Optimizing app performance for various mobile devices while ensuring smooth animations, fast loading times, and efficient battery usage for financial transactions.'
    ],
    learnings: [
      'Gained deep understanding of mobile security best practices, including secure storage, certificate pinning, and implementing biometric authentication across different platforms.',
      'Learned React Native development patterns for complex applications, including navigation, state management, and platform-specific implementations for iOS and Android.',
      'Developed expertise in financial API integration, including understanding banking protocols, transaction processing, and regulatory compliance requirements.'
    ],
    stats: {
      commits: 198,
      contributors: 5
    }
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that helps create blog posts, social media content, and marketing copy using GPT integration.',
    longDescription: 'This AI content generator leverages advanced language models to help businesses and content creators produce high-quality written content efficiently. The platform includes templates for various content types, tone adjustment capabilities, and SEO optimization features. It also provides content analytics and performance tracking to help users understand what resonates with their audience.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop'
    ],
    technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Supabase', 'Stripe', 'Vercel', 'TypeScript', 'Prisma'],
    githubUrl: 'https://github.com/heetviradiya/ai-content-generator',
    liveUrl: 'https://ai-content-pro.vercel.app',
    startDate: 'Nov 2024',
    status: 'in-progress',
    teamSize: 2,
    role: 'Full-Stack Developer',
    features: [
      'AI-powered content generation with multiple templates',
      'Tone and style customization for different audiences',
      'SEO optimization suggestions and keyword integration',
      'Content plagiarism checking and originality scoring',
      'Multi-language content generation support',
      'Content calendar and scheduling features',
      'Team collaboration and content approval workflows',
      'Performance analytics and engagement tracking',
      'Export functionality to various formats',
      'Integration with popular CMS platforms'
    ],
    challenges: [
      'Optimizing AI model interactions to balance content quality, generation speed, and API costs while providing consistent and relevant output for various content types.',
      'Implementing effective content moderation and quality control systems to ensure generated content meets brand guidelines and ethical standards.',
      'Creating an intuitive user interface that makes AI content generation accessible to non-technical users while providing advanced customization options for power users.'
    ],
    learnings: [
      'Gained experience working with large language models and AI APIs, including prompt engineering, response optimization, and handling API limitations and costs.',
      'Learned advanced Next.js features including API routes, middleware, and server-side rendering for AI-powered applications with dynamic content generation.',
      'Developed understanding of content management systems and SEO principles, including keyword optimization, content structure, and performance measurement techniques.'
    ],
    stats: {
      stars: 89,
      forks: 31,
      commits: 267,
      contributors: 2
    }
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.status === 'completed').slice(0, 6);
};