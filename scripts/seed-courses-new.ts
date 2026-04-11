import dbConnect from '@/lib/db';
import { Course } from '@/models/Course';

const courses = [
  {
    title: 'Full Stack Web Development Mastery',
    slug: 'full-stack-web-development-mastery',
    shortDescription: 'Master web development from HTML/CSS to React, Node.js, MongoDB. Build real-world projects with MERN stack.',
    fullDescription: 'Become a complete full-stack developer with this comprehensive course covering frontend, backend, databases, and deployment. Learn modern technologies including React, Node.js, Express, MongoDB, and more. Build multiple real-world projects including an e-commerce platform, social media app, and portfolio websites. This course includes AI integration for accelerated development.',
    level: 'Beginner',
    category: 'IT & Software',
    tags: ['Web Development', 'React', 'Node.js', 'MongoDB', 'Full Stack', 'JavaScript', 'HTML', 'CSS', 'Express', 'MERN'],
    
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    earlyBirdPrice: 3999,
    earlyBirdDeadline: new Date('2025-05-01'),
    
    duration: '60 Hours | 8 Weeks',
    totalHours: 60,
    schedule: 'Mon-Fri 7PM-9PM, Sat-Sun 10AM-2PM',
    batchStartDate: new Date('2025-04-15'),
    enrollmentDeadline: new Date('2025-04-10'),
    
    learningOutcomes: [
      'Build responsive websites with HTML5, CSS3, and modern layouts',
      'Master JavaScript from fundamentals to advanced concepts',
      'Create dynamic frontend applications with React.js',
      'Build RESTful APIs with Node.js and Express',
      'Design and manage databases with MongoDB',
      'Implement authentication and authorization',
      'Deploy applications to production servers',
      'Use AI tools to accelerate development workflow',
      'Build a complete MERN stack e-commerce project'
    ],
    curriculum: [
      {
        title: 'Module 1: Web Development Fundamentals',
        lessons: [
          'Introduction to Web Development & Internet',
          'HTML5 Structure & Semantic Elements',
          'CSS3 Fundamentals & Box Model',
          'Flexbox & CSS Grid Layouts',
          'Responsive Design & Media Queries',
          'CSS Variables & Modern CSS Features',
          'Project: Personal Portfolio Website'
        ]
      },
      {
        title: 'Module 2: JavaScript Essentials',
        lessons: [
          'JavaScript Variables & Data Types',
          'Functions, Scope & Closures',
          'Arrays, Objects & DOM Manipulation',
          'Event Handling & Interactive UI',
          'ES6+ Features: Arrow Functions, Destructuring',
          'Async JavaScript: Promises & Async/Await',
          'Fetch API & Working with JSON',
          'Project: Interactive Todo Application'
        ]
      },
      {
        title: 'Module 3: React.js Development',
        lessons: [
          'Introduction to React & Component Architecture',
          'JSX & React Virtual DOM',
          'Props, State & Component Lifecycle',
          'React Hooks: useState, useEffect, useContext',
          'Custom Hooks & Reusable Components',
          'React Router for Single Page Apps',
          'State Management with Context API',
          'Project: Social Media Dashboard'
        ]
      },
      {
        title: 'Module 4: Node.js & Express Backend',
        lessons: [
          'Node.js Fundamentals & NPM',
          'Building RESTful APIs with Express',
          'Middleware & Request Handling',
          'Authentication with JWT',
          'Error Handling & Validation',
          'File Uploads & Data Processing',
          'Project: User Authentication System'
        ]
      },
      {
        title: 'Module 5: MongoDB & Database Design',
        lessons: [
          'MongoDB Fundamentals & NoSQL Concepts',
          'CRUD Operations with MongoDB',
          'Mongoose ODM & Data Modeling',
          'Relationships & Aggregations',
          'Indexing & Performance Optimization',
          'Database Security Best Practices',
          'Project: E-commerce Database Schema'
        ]
      },
      {
        title: 'Module 6: Full Stack Integration & Deployment',
        lessons: [
          'Connecting React with Node.js APIs',
          'Environment Variables & Configuration',
          'Deployment to Vercel & Render',
          'Git & Version Control Workflow',
          'CI/CD Basics for Web Apps',
          'Project: Complete E-commerce Platform'
        ]
      },
      {
        title: 'Module 7: AI-Powered Development',
        lessons: [
          'Introduction to AI in Web Development',
          'Using ChatGPT for Code Generation',
          'AI-Assisted Debugging & Optimization',
          'Prompt Engineering for Developers',
          'Building AI-Integrated Features',
          'Project: AI-Powered Chatbot Integration'
        ]
      }
    ],
    prerequisites: [
      'Basic computer knowledge',
      'No prior programming experience required',
      'Willingness to learn and practice'
    ],
    softwareRequired: [
      'VS Code Editor',
      'Node.js (LTS version)',
      'Git',
      'MongoDB Community Server',
      'Postman for API testing'
    ],
    
    thumbnailUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
    promoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    
    totalSeats: 50,
    enrolledCount: 0,
    instructorName: 'Mr. Aryan Sharma',
    instructorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
    
    meetLink: 'https://meet.google.com/web-dev-batch',
    whatsappGroupLink: 'https://chat.whatsapp.com/webdev2025',
    supportEmail: 'support@dblanks.site',
    
    isFeatured: true,
    isPublished: true,
    lifetimeAccess: true,
    certificateIncluded: true,
    recordingAccess: true,
    projectsCount: 5,
    language: 'Hindi/English'
  },
  {
    title: 'Generative AI & LLMs Mastery',
    slug: 'generative-ai-llms-mastery',
    shortDescription: 'Build AI apps with ChatGPT, LLMs, Prompt Engineering, RAG & LangChain. Create real-world AI products.',
    fullDescription: 'Dive deep into the world of Generative AI and Large Language Models. This comprehensive course covers everything from fundamental AI concepts to building production-ready AI applications. Learn to use ChatGPT API, implement Prompt Engineering, build RAG systems, and create AI-powered applications using LangChain and Hugging Face. Perfect for developers looking to integrate AI into their products.',
    level: 'Intermediate',
    category: 'IT & Software',
    tags: ['AI', 'Generative AI', 'LLM', 'ChatGPT', 'Prompt Engineering', 'LangChain', 'Hugging Face', 'Machine Learning', 'Python'],
    
    price: 7999,
    originalPrice: 14999,
    discount: 47,
    earlyBirdPrice: 6499,
    earlyBirdDeadline: new Date('2025-05-15'),
    
    duration: '50 Hours | 7 Weeks',
    totalHours: 50,
    schedule: 'Sat-Sun 9AM-1PM',
    batchStartDate: new Date('2025-05-01'),
    enrollmentDeadline: new Date('2025-04-25'),
    
    learningOutcomes: [
      'Understand fundamental concepts of Generative AI',
      'Master Prompt Engineering techniques',
      'Build applications using OpenAI GPT API',
      'Implement Retrieval-Augmented Generation (RAG)',
      'Use LangChain for AI application development',
      'Work with Hugging Face models and datasets',
      'Create AI chatbots and virtual assistants',
      'Build image generation applications with DALL-E',
      'Deploy AI applications to production'
    ],
    curriculum: [
      {
        title: 'Module 1: Introduction to Generative AI',
        lessons: [
          'What is Generative AI? Overview & Applications',
          'History of AI & Evolution of Language Models',
          'Understanding LLMs: GPT, BERT, T5 Architecture',
          'Difference between Narrow AI & Generative AI',
          'Current AI Landscape & Industry Trends',
          'AI Ethics & Responsible AI Development'
        ]
      },
      {
        title: 'Module 2: Prompt Engineering Mastery',
        lessons: [
          'Introduction to Prompt Engineering',
          'Basic Prompt Structures & Templates',
          'Chain-of-Thought & Few-Shot Learning',
          'System vs User Prompts & Role Playing',
          'Handling Ambiguity & Improving Responses',
          'Debugging & Optimizing Prompts',
          'Advanced: ReAct Prompting & Tool Use'
        ]
      },
      {
        title: 'Module 3: OpenAI API & GPT Integration',
        lessons: [
          'Setting Up OpenAI Account & API Keys',
          'Understanding API Parameters (temperature, max_tokens)',
          'Making API Calls with Python',
          'Handling Streaming Responses',
          'Error Handling & Rate Limiting',
          'Building a Basic Chatbot with GPT-4',
          'Project: FAQ Automation System'
        ]
      },
      {
        title: 'Module 4: LangChain Framework',
        lessons: [
          'Introduction to LangChain',
          'LLMs, Chains & Agents in LangChain',
          'Memory Management for Conversational AI',
          'Document Loaders & Text Splitting',
          'Vector Databases & Embeddings',
          'Building AI Apps with LangChain',
          'Project: Document Q&A System'
        ]
      },
      {
        title: 'Module 5: Retrieval-Augmented Generation (RAG)',
        lessons: [
          'What is RAG & Why It Matters',
          'Vector Databases: Chroma, Pinecone, Weaviate',
          'Creating Embeddings with OpenAI',
          'Building Knowledge Bases',
          'Implementing RAG Pipeline',
          'Evaluating RAG Performance',
          'Project: Company Knowledge Chatbot'
        ]
      },
      {
        title: 'Module 6: Hugging Face & Open Source Models',
        lessons: [
          'Introduction to Hugging Face Hub',
          'Working with Pre-trained Models',
          'Fine-tuning Language Models',
          'Using Inference Endpoints',
          'Image Generation with Stable Diffusion',
          'Audio AI: Text-to-Speech Models',
          'Project: Multi-modal AI Application'
        ]
      },
      {
        title: 'Module 7: Building AI Products',
        lessons: [
          'Designing AI Application Architecture',
          'Security & API Key Management',
          'Scaling AI Applications',
          'Cost Optimization Strategies',
          'Building AI-Powered SaaS Products',
          'Project: Complete AI SaaS Application',
          'Deployment & Monitoring'
        ]
      }
    ],
    prerequisites: [
      'Basic Python programming knowledge',
      'Understanding of REST APIs',
      'Familiarity with JSON data format',
      'Basic understanding of machine learning concepts'
    ],
    softwareRequired: [
      'Python 3.10+',
      'VS Code or PyCharm',
      'Postman',
      'OpenAI API Key',
      'Hugging Face Account'
    ],
    
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    promoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    
    totalSeats: 40,
    enrolledCount: 0,
    instructorName: 'Dr. Sarah Johnson',
    instructorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    
    meetLink: 'https://meet.google.com/ai-batch-2025',
    whatsappGroupLink: 'https://chat.whatsapp.com/ai2025',
    supportEmail: 'support@dblanks.site',
    
    isFeatured: true,
    isPublished: true,
    lifetimeAccess: true,
    certificateIncluded: true,
    recordingAccess: true,
    projectsCount: 6,
    language: 'Hindi/English'
  },
  {
    title: 'Game Development with Unity & Unreal Engine',
    slug: 'game-development-unity-unreal',
    shortDescription: 'Create games with Unity & Unreal Engine. Learn C#, Blueprints, 3D modeling, AI & publish to app stores.',
    fullDescription: 'Start your game development journey with this comprehensive course covering both Unity and Unreal Engine. Learn to create 2D and 3D games, implement game mechanics, design levels, add special effects, and publish to multiple platforms. Includes hands-on projects building complete games from scratch. Perfect for beginners and aspiring game developers.',
    level: 'Beginner',
    category: 'Gaming',
    tags: ['Game Development', 'Unity', 'Unreal Engine', 'C#', 'Blueprints', '3D Games', '2D Games', 'Game Design', 'C++', 'Blender'],
    
    price: 8999,
    originalPrice: 17999,
    discount: 50,
    earlyBirdPrice: 7499,
    earlyBirdDeadline: new Date('2025-05-20'),
    
    duration: '80 Hours | 12 Weeks',
    totalHours: 80,
    schedule: 'Mon-Fri 6PM-8PM, Sat 10AM-3PM',
    batchStartDate: new Date('2025-04-20'),
    enrollmentDeadline: new Date('2025-04-15'),
    
    learningOutcomes: [
      'Master Unity Game Engine from basics to advanced',
      'Learn C# programming for game development',
      'Understand Unreal Engine Blueprints system',
      'Create 2D and 3D game mechanics',
      'Design game levels and environments',
      'Implement AI for enemy characters',
      'Add visual effects and animations',
      'Build and publish games to app stores',
      'Create a complete portfolio of games'
    ],
    curriculum: [
      {
        title: 'Module 1: Game Development Foundations',
        lessons: [
          'Introduction to Game Development',
          'Understanding Game Engines & Tools',
          'Setting Up Unity & Unreal Engine',
          'Game Design Fundamentals',
          'Game Loop & Architecture',
          'Asset Management & Organization',
          'Your First Game: Setup & Structure'
        ]
      },
      {
        title: 'Module 2: Unity C# Programming',
        lessons: [
          'C# Fundamentals for Game Dev',
          'Variables, Data Types & Operators',
          'Control Flow & Loops',
          'Object-Oriented Programming in Games',
          'Unity API: Transform, Rigidbody, Collider',
          'Input System & Player Controls',
          'Debugging & Troubleshooting Games',
          'Project: Simple 2D Platformer'
        ]
      },
      {
        title: 'Module 3: 2D Game Development',
        lessons: [
          '2D Sprites & Animation',
          'Tilemaps & Level Design',
          'Physics 2D: Gravity & Collisions',
          'Player Movement & Jump Mechanics',
          'Enemies & AI Basic Behaviors',
          'Collectibles & Scoring System',
          'UI Design: Menus & HUD',
          'Project: Complete 2D Runner Game'
        ]
      },
      {
        title: 'Module 4: 3D Game Development',
        lessons: [
          '3D Models & Materials',
          'Camera Systems & Controls',
          '3D Physics & Collision Detection',
          'Character Controllers',
          'Lighting & Environment Design',
          'Particle Systems & VFX',
          'Audio in Games',
          'Project: 3D First Person Shooter'
        ]
      },
      {
        title: 'Module 5: Unreal Engine Blueprints',
        lessons: [
          'Introduction to Unreal Engine',
          'Blueprints Visual Scripting',
          'Variables, Events & Functions',
          'Level Blueprint vs Class Blueprints',
          'Actor Classes & Components',
          'Physics & Collision in Unreal',
          'AI Navigation & Behavior Trees',
          'Project: Unreal Platformer'
        ]
      },
      {
        title: 'Module 6: Advanced Game Systems',
        lessons: [
          'Save/Load System Implementation',
          'Inventory & Item Management',
          'Dialogue & Quest Systems',
          'Combat Systems & Damage Logic',
          'Multiplayer Basics (Photon/Netcode)',
          'Optimization & Performance',
          'Cross-Platform Publishing',
          'Project: Complete Action RPG'
        ]
      },
      {
        title: 'Module 7: Portfolio & Publishing',
        lessons: [
          'Building Your Game Portfolio',
          'App Store Submission Guidelines',
          'Marketing Your Games',
          'Monetization Strategies',
          'Game Analytics Integration',
          'Post-Launch Support & Updates',
          'Final Project Showcase',
          'Career Opportunities in Gaming'
        ]
      }
    ],
    prerequisites: [
      'Basic computer skills',
      'No prior programming experience needed',
      'Passion for games and creativity',
      '4GB RAM minimum, 20GB storage'
    ],
    softwareRequired: [
      'Unity Hub & Unity Editor (2022 LTS)',
      'Unreal Engine 5',
      'VS Code with C# extension',
      'Blender for 3D modeling',
      'Aseprite for 2D art'
    ],
    
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
    promoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    
    totalSeats: 35,
    enrolledCount: 0,
    instructorName: 'Mr. Vikram Patil',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    
    meetLink: 'https://meet.google.com/game-dev-batch',
    whatsappGroupLink: 'https://chat.whatsapp.com/gamedev2025',
    supportEmail: 'support@dblanks.site',
    
    isFeatured: true,
    isPublished: true,
    lifetimeAccess: true,
    certificateIncluded: true,
    recordingAccess: true,
    projectsCount: 4,
    language: 'Hindi/English'
  }
];

async function seedNewCourses() {
  await dbConnect();

  const existingCourses = await Course.find({
    slug: { $in: courses.map(c => c.slug) }
  });

  if (existingCourses.length > 0) {
    console.log(`Found ${existingCourses.length} existing courses with these slugs. Deleting old versions...`);
    await Course.deleteMany({ slug: { $in: courses.map(c => c.slug) } });
  }

  const createdCourses = await Course.insertMany(courses);
  console.log(`Successfully created ${createdCourses.length} new courses:`);
  createdCourses.forEach(course => {
    console.log(`  - ${course.title} (${course.slug})`);
  });
}

seedNewCourses().catch(console.error);