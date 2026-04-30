import React, { useState, useEffect, useRef } from 'react';
import { Camera, Code, Database, Palette, Terminal, Download, Mail, Github, Linkedin, ExternalLink, Menu, X, Sun, Moon, ChevronUp, Filter, MapPin, Briefcase, GraduationCap } from 'lucide-react';

// Custom hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Home Background Animation with Floating Code Symbols
const CODE_SYMBOLS = [
  { sym: "</>", x: 5, y: 8, size: 13, delay: 0, dur: 18 },
  { sym: "{ }", x: 88, y: 12, size: 11, delay: 2, dur: 22 },
  { sym: "=>", x: 15, y: 55, size: 10, delay: 4, dur: 20 },
  { sym: "[ ]", x: 78, y: 40, size: 12, delay: 1, dur: 25 },
  { sym: "&&", x: 92, y: 68, size: 9, delay: 6, dur: 19 },
  { sym: "fn()", x: 3, y: 80, size: 11, delay: 3, dur: 23 },
  { sym: "git", x: 50, y: 5, size: 10, delay: 5, dur: 21 },
  { sym: "npm", x: 65, y: 85, size: 9, delay: 7, dur: 24 },
  { sym: "===", x: 35, y: 90, size: 10, delay: 2.5, dur: 17 },
  { sym: "||", x: 20, y: 20, size: 14, delay: 8, dur: 26 },
  { sym: "const", x: 72, y: 22, size: 9, delay: 1.5, dur: 20 },
  { sym: "async", x: 42, y: 70, size: 10, delay: 4.5, dur: 22 },
  { sym: "#", x: 58, y: 50, size: 16, delay: 0.5, dur: 28 },
  { sym: "< >", x: 10, y: 42, size: 11, delay: 9, dur: 19 },
  { sym: "return", x: 83, y: 55, size: 8, delay: 3.5, dur: 21 },
  { sym: "=>", x: 30, y: 35, size: 13, delay: 6.5, dur: 23 },
  { sym: "{ }", x: 55, y: 15, size: 9, delay: 7.5, dur: 18 },
  { sym: "*.ts", x: 95, y: 30, size: 9, delay: 2, dur: 20 },
  { sym: "0x", x: 25, y: 65, size: 10, delay: 10, dur: 24 },
  { sym: "~/", x: 70, y: 75, size: 11, delay: 5.5, dur: 22 },
  { sym: "useEffect()", x: 12, y: 28, size: 8, delay: 2.2, dur: 24 },
  { sym: "import", x: 82, y: 18, size: 9, delay: 4.8, dur: 21 },
  { sym: "export", x: 18, y: 72, size: 9, delay: 6.2, dur: 23 },
  { sym: "props", x: 62, y: 60, size: 8, delay: 1.8, dur: 20 },
  { sym: "node", x: 8, y: 60, size: 10, delay: 7.2, dur: 25 },
  { sym: "sql", x: 90, y: 82, size: 9, delay: 5.2, dur: 22 },
  { sym: "api", x: 40, y: 12, size: 10, delay: 3.3, dur: 19 },
  { sym: "json", x: 76, y: 63, size: 9, delay: 8.2, dur: 24 },
  { sym: "JWT", x: 28, y: 10, size: 9, delay: 2.7, dur: 20 },
  { sym: "tsx", x: 54, y: 88, size: 10, delay: 9.1, dur: 23 },
  { sym: "map()", x: 97, y: 48, size: 8, delay: 1.2, dur: 21 },
  { sym: "hook", x: 6, y: 35, size: 9, delay: 4.1, dur: 22 }
];

const HomeBackgroundAnimation = () => {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {CODE_SYMBOLS.map((s, i) => (
          <span
            key={i}
            className="absolute select-none font-medium text-cyan-200/[0.12] will-change-transform [font-family:'Fira_Code','Cascadia_Code','JetBrains_Mono',monospace] animate-[float-code_linear_infinite] sm:text-cyan-200/[0.18]"
            style={{
              left: `${s.x}%`,
              bottom: `-${s.size + 2}%`,
              fontSize: `${Math.max(s.size - 2, 8)}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.sym}
          </span>
        ))}

        <div
          className="absolute h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.05)_0%,transparent_70%)] sm:h-[440px] sm:w-[440px] md:h-[600px] md:w-[600px]"
          style={{ top: "10%", left: "60%" }}
        />
        <div
          className="absolute h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] sm:h-[360px] sm:w-[360px] md:h-[500px] md:w-[500px]"
          style={{ top: "70%", left: "20%" }}
        />
        <div
          className="absolute h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.035)_0%,transparent_72%)] sm:h-[320px] sm:w-[320px] md:h-[420px] md:w-[420px]"
          style={{ top: "35%", left: "85%" }}
        />
      </div>
    </>
  );
};

// Logo Component
const Logo = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="url(#gradient)" />
    <path d="M25 70C25 70 30 55 40 50C50 45 45 35 45 35" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <path d="M55 35C55 35 50 45 60 50C70 55 75 70 75 70" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="40" cy="32" r="3" fill="white"/>
    <circle cx="60" cy="32" r="3" fill="white"/>
    <path d="M30 75L35 65L40 75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M60 75L65 65L70 75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);

// Certifications data
const certificationsData = [
  {
    id: 1,
    title: "Computer Hardware Basics",
    issuer: "Cisco Networking Academy",
    issueDate: "2026",
    status: "Completed",
    logo: "/certificate/cisco-logo.png",
    image: "/certificate/cisco-hardware.jpg",
    description: "Completed student-level training in computer hardware components, device maintenance, troubleshooting, and safety basics.",
    skills: "Hardware · Maintenance · Troubleshooting",
    certificateLink: "/certificate/cisco-hardware.pdf"
  },
  {
    id: 2,
    title: "AI/ML Engineer - Stage 1",
    issuer: "SLIIT",
    issueDate: "2026",
    status: "Completed",
    logo: "/certificate/sliit-logo.png",
    image: "/certificate/aiml-stage-1.jpg",
    description: "Completed foundational learning in artificial intelligence and machine learning concepts through SLIIT CODL.",
    skills: "AI · Machine Learning · Python",
    certificateLink: "/certificate/aiml-stage-1.pdf"
  },
  {
    id: 3,
    title: "DesignX 2025 Workshop Series",
    issuer: "IEEE Computer Society / UCSC",
    issueDate: "2026",
    status: "Completed",
    logo: "/certificate/ieee-logo.png",
    image: "/certificate/designx-2025.jpg",
    description: "Participated in UI/UX focused workshops covering user experience foundations, visual design, and Figma systems.",
    skills: "UI/UX · Figma · Design Systems",
    certificateLink: "/certificate/designx-2025.pdf"
  },
  {
    id: 4,
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    issueDate: "2025",
    status: "Completed",
    logo: "/certificate/uom-logo.png",
    image: "/certificate/python-beginners.jpg",
    description: "Completed beginner-level Python programming training focused on programming logic and practical coding fundamentals.",
    skills: "Python · Programming · Problem Solving",
    certificateLink: "/certificate/python-beginners.pdf"
  },
  {
    id: 5,
    title: "Certificate in Human Resource Management",
    issuer: "IMS Campus",
    issueDate: "2022",
    status: "Completed",
    logo: "/certificate/ims-logo.png",
    image: "/certificate/hr-management.jpg",
    description: "Completed HRM training covering recruitment, human resource planning, labour law basics, and organizational behavior.",
    skills: "HRM · Management · Communication",
    certificateLink: "/certificate/hr-management.pdf"
  },
  {
    id: 6,
    title: "MongoDB User Model & Backend Development",
    issuer: "Self Learning",
    issueDate: "In Progress",
    status: "In Progress",
    logo: "/certificate/mongodb-logo.png",
    image: "/certificate/mongodb-user-model.jpg",
    description: "Currently learning MongoDB schema design, user models, authentication flow, and backend data handling.",
    skills: "MongoDB · User Model · Backend",
    certificateLink: ""
  }
];

// Projects data
const projectsData = [
  {
    id: 1,
    title: "HireSmart – Internship & Job Preparation Platform",
    description: "A full-stack platform helping students prepare for internships with secure authentication, profile management, and role-based quizzes. Built with a modern, scalable tech stack.",
    tags: ["Full Stack", "Auth", "Quizzes", "Web"],
    screenshot: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/SandaniChamoda/Internship-and-Job-preparation-platform.git",
    demo: "/videos/HireSmart.mp4"
  },
  {
    id: 2,
    title: "Vertexone - Smart Campus Management System",
    description: "Developed the ticketing module for reporting, tracking, and resolving campus incidents with status workflows and role-based access.",
    tags: ["Spring Boot", "React", "MySQL", "REST APIs"],
    screenshot: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/SandaniChamoda/SandaniChamoda-it3030-paf-2026-smart-campus-group49.git",
    demo: "/videos/Vertexone.mp4"
  },
  {
    id: 3,
    title: "RiyaGuru_LK - Driving School Management System",
    description: "A MERN platform for managing driving school operations, including booking and progress tracking. Implemented secure payments with JWT authentication and role-based access control.",
    tags: ["MERN", "React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    screenshot: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/SandaniChamoda/RiyaGuru.git",
    demo: "/videos/Riyaguru.mp4"
  },
  {
    id: 4,
    title: "WellNest Habit Tracker - Android App",
    description: "An offline Android wellness app for habit tracking, mood journaling, and hydration reminders with shake-sensor integration and home-screen widget.",
    tags: ["Kotlin", "Android Studio", "SharedPreferences", "Mobile"],
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/SandaniChamoda/Wellnest-Habit-tracker-app.git",
    demo: "/videos/WellNest.mp4"
  },
  {
    id: 5,
    title: "Hotel Customer Care System",
    description: "Web-based customer support system with ticket submission, tracking, and feedback features. Developed with Java, MySQL, and Bootstrap.",
    tags: ["Java", "MySQL", "Bootstrap", "Web"],
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/SandaniChamoda/hotel-customer-care.git",
    demo: "https://youtu.be/hotel-customer-care-demo"
  },
  {
    id: 6,
    title: "Vehicle Insurance Management System",
    description: "Multi-role insurance platform with policy management and claims processing. Built with PHP and MySQL.",
    tags: ["PHP", "MySQL", "Web"],
    screenshot: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/SandaniChamoda/vehicle-insurance-system.git",
    demo: "https://youtu.be/vehicle-insurance-demo"
  }
];

// Skills data
const skillsData = {
  "Web Development": [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "PHP", level: 80 },
    { name: "MERN Stack", level: 75 }
  ],
  "Programming": [
    { name: "Java", level: 85 },
    { name: "Python", level: 70 },
    { name: "SQL", level: 80 }
  ],
  "Tools & Design": [
    { name: "Figma", level: 85 },
    { name: "Git", level: 75 },
    { name: "Mobile Dev", level: 70 }
  ],
  "Learning": [
    { name: "Python/Pandas", level: 60 },
    { name: "Data Analysis", level: 55 }
  ]
};

// Animated Cursor Component
const AnimatedCursor = ({ enabled }) => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      
      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={cursorDotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
};

// Navbar Component
const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/40 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo & Branding */}
          <div className="flex items-center space-x-3">
            <Logo className="w-5 h-5" />
            <span className="text-base font-bold text-gray-400 hover:text-white transition-colors">
              M S CHAMODA
            </span>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center px-8 py-2 rounded-full border border-purple-500/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors font-medium px-4"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right - Social Media Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/sandani-chamoda/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/s__chamoo/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-300 hover:text-pink-400 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-300 hover:text-blue-400 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-300 hover:text-green-400 transition-colors" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a8.06 8.06 0 00-8.062 8.062c0 2.126.631 4.179 1.82 5.834L2.498 21.5l6.375-1.671a8.048 8.048 0 005.83 2.274h.005c4.446 0 8.068-3.622 8.068-8.062s-3.622-8.062-8.068-8.062M19.54 2.431A9.953 9.953 0 0012.007 0C5.506 0 .157 5.348.157 11.849c0 2.096.547 4.142 1.588 5.946L.057 24l6.305-1.654a9.95 9.95 0 004.745 1.245h.005c6.51 0 11.855-5.348 11.855-11.849 0-3.176-1.237-6.167-3.432-8.413Z"/>
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-lg border-t border-purple-500/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

//Hero about
const HeroAbout = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden bg-transparent">

      <div className="max-w-7xl mx-auto w-full">
       <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-6"> 
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:pr-8 pt-20 md:pt-24 lg:pt-32">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-0.2 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/30 rounded-full w-fit">
              <span className="text-lg">💎</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-blue-100 bg-clip-text text-transparent">Fullstack Developer </span>
            </div>

            {/* Main Heading */}
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight whitespace-nowrap">
              <span className="text-white">Hi, I am </span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Sandani</span>
            </h1>

            {/* Bio */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              Building scalable web applications with real-world impact. Experienced in full-stack development, working across modern frontend and backend technologies to deliver clean, user-focused solutions. </p>

            {/* CTA Button */}
           <a
  href="/Sandani Chamoda CV.pdf"
  download="Sandani Chamoda CV.pdf"
  target="_blank"
  className="
  inline-block px-9 py-2 rounded-xl font-semibold text-white
  bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-purple-500/10
  backdrop-blur-lg
  border border-purple-400/30
  shadow-[0_0_20px_rgba(139,92,246,0.25)]
  hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
  hover:border-purple-400/50
  hover:scale-105
  transition-all duration-300
  "
>
  Download CV
</a>
          </div>

          {/* Right Side - Tech Stack Icons */}
          <div className="relative h-96 flex items-center justify-center">
            {/* Center circular glow */}
            <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            {/* Circular grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full border border-purple-500/20"></div>
                <div className="absolute inset-[12%] rounded-full border border-purple-500/15"></div>
                <div className="absolute inset-[26%] rounded-full border border-purple-500/10"></div>
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-purple-500/12"></div>
                <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-purple-500/12"></div>
                <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 rotate-45 bg-purple-500/10"></div>
                <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -rotate-45 bg-purple-500/10"></div>
              </div>
            </div>
            
            {/* Tech Icons in circular pattern */}
            <div className="relative w-72 h-72">
              {/* React */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="5" cy="12" r="2"/><path d="M12 5v14M5 12h14" stroke="currentColor" fill="none" strokeWidth="1"/>
                </svg>
              </div>

              {/* JavaScript */}
              <div className="absolute top-12 right-8 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <span className="text-2xl font-bold text-yellow-400">JS</span>
              </div>

              {/* Firebase */}
              <div className="absolute bottom-12 right-8 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <svg className="w-12 h-12 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13l8-15 8 15-4 11H7z"/>
                </svg>
              </div>

              {/* TypeScript */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <span className="text-2xl font-bold text-blue-500">TS</span>
              </div>

              {/* MongoDB */}
              <div className="absolute bottom-12 left-8 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c0 0-6 3-6 9c0 3 2 5 6 5s6-2 6-5c0-6-6-9-6-9z" opacity="0.5"/><circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>

              {/* AWS */}
              <div className="absolute top-12 left-8 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <span className="text-lg font-bold text-orange-400">AWS</span>
              </div>

              {/* GitHub */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 bg-gray-800/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                <Github className="w-12 h-12 text-gray-300" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Education & Experience Section
const LetterGlitch = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/#@$%&*!+-=_():;,";
    const colors = ["#5e4491", "#A476FF", "#241a38"];

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const fontSize = 13;

    const resize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;

      canvas.width = width;
      canvas.height = height;

      cols = Math.floor(width / 10);
      rows = Math.floor(height / 16);
    };

    resize();
    window.addEventListener("resize", resize);

    let grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => chars[Math.floor(Math.random() * chars.length)])
    );

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (Math.random() < 0.04) {
            grid[y][x] = chars[Math.floor(Math.random() * chars.length)];
          }

          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.globalAlpha = 0.65;
          ctx.fillText(grid[y][x], x * 10, y * 16);
        }
      }

      ctx.globalAlpha = 1;
    };

    const interval = setInterval(draw, 80);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

// Certificate Card Component
const CertificateCard = ({ certificate, index }) => {
  const [showCredential, setShowCredential] = useState(false);
  const isCompleted = certificate.status === "Completed";

  return (
    <div
      className="group h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.30)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards"
      }}
    >
      <div className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">
            <img
              src={certificate.logo}
              alt={certificate.issuer}
              className="h-7 w-7 object-contain"
            />
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-1 text-base font-semibold text-white">
              {certificate.title}
            </h3>
            <p className="text-xs text-gray-400">
              {certificate.issuer} · {certificate.issueDate}
            </p>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <p className="mb-3 text-sm leading-relaxed text-gray-400">
          {certificate.description}
        </p>

        <p className="mb-5 text-xs text-gray-500">
          {certificate.skills}
        </p>

        {isCompleted ? (
          <button
            type="button"
            onClick={() => setShowCredential(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-200 transition-all duration-300 hover:bg-purple-500/20 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Certificate
          </button>
        ) : (
          <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-semibold text-yellow-300">
            In Progress
          </span>
        )}
      </div>

      {showCredential && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#070915]/80 px-4 py-8 backdrop-blur-lg"
          onClick={() => setShowCredential(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-purple-400/20 bg-[#0b0f2b] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-200/70">
                  Certificate Preview
                </p>
                <h3 className="text-xl font-semibold text-white">
                  {certificate.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCredential(false)}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto p-5">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10"
              />

              {certificate.certificateLink && (
                <div className="mt-5 text-center">
                  <a
                    href={certificate.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-500/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Certificate
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modern Certifications Component
const ModernCertifications = () => {
  return (
    <section id="certifications" className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800 dark:text-white">Licenses & </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            Professional certifications and continuous learning achievements
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((certificate, index) => (
            <CertificateCard key={certificate.id} certificate={certificate} index={index} />
          ))}
        </div>

        {certificationsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-base">No certifications available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const EducationExperience = () => {
  return (
   <section id="education" className="relative py-8 px-4 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
    <span className="text-white">Education</span>
  </h2>
           <p className="text-gray-400 text-base max-w-2xl mx-auto">
    My academic journey and qualifications
  </p>
        </div>

       <div className="grid lg:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
          {/* LEFT - Education Info */}
          <div className="flex justify-center">
            <div className="w-full max-w-[520px] h-[320px] bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                Education
              </h3>

              <div className="space-y-2 ">
                <div className="bg-white/5 rounded-lg p-2.5 bospace-y-3rder border-purple-500/10">
                  <h4 className="font-semibold text-white text-xs leading-tight">
                    BSc (Hons) in Information Technology
                  </h4>
                  <p className="text-xs text-purple-300 leading-tight">
                    Specializing in Information Technology
                  </p>
                  <p className="text-xs text-gray-400 leading-tight">
                    Sri Lanka Institute of Information Technology (SLIIT)
                  </p>
                  <p className="text-xs font-medium text-blue-300">
                    Present · GPA: 3.73
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-2.5 border border-blue-500/10">
                  <h4 className="font-semibold text-white text-xs leading-tight">G.C.E. Advanced Level</h4>
                  <p className="text-xs text-blue-300 leading-tight">
                    Artificial Intelligence Stream
                  </p>
                  <p className="text-xs text-gray-400 leading-tight">
                    Sangamiththa Balika Vidyalaya, Galle
                  </p>
                  <p className="text-xs font-medium text-gray-300">
                    2021 · A, C, S — Maths, Physics, ICT
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-2.5 border border-cyan-500/10">
                  <h4 className="font-semibold text-white text-xs leading-tight">G.C.E. Ordinary Level</h4>
                  <p className="text-xs text-gray-400 leading-tight">
                    Sangamiththa Balika Vidyalaya, Galle
                  </p>
                  <p className="text-xs font-medium text-cyan-300">
                    2018
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Letter Glitch */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-[520px] h-[320px] opacity-80">
              <LetterGlitch />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Work Experience Component
const WorkExperience = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const toggleGallery = () => setShowGallery(!showGallery);
  const toggleCertificate = () => setShowCertificate(!showCertificate);

  return (
    <section id="experience" className="relative py-20 px-4 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Work </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Professional experience and practical skills development
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mx-auto max-w-5xl">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
            <Briefcase className="h-4 w-4 text-blue-400" />
            Work Experience
          </h3>

          <div className="space-y-2">
            <div className="bg-white/5 rounded-lg p-2.5 border border-blue-500/10">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-white text-xs">Intern</h4>
                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs font-medium rounded-full border border-blue-800">
                  Feb 2023 – Aug 2023
                </span>
              </div>

              <p className="text-blue-400 font-medium text-xs mb-2">
                People's Bank, Galle Main Street Branch
              </p>

              <ul className="space-y-1.5 text-gray-400 text-xs mb-3">
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0" />
                  <span>Guided customers through online banking setup, mobile app integration, and digital service troubleshooting.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0" />
                  <span>Used banking software for accurate account processing, transaction recording, and customer support.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0" />
                  <span>Supported customers with mobile banking features, online transactions, and digital payment solutions.</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={toggleCertificate}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600/80 text-white rounded-md font-medium hover:bg-purple-700 transition-colors duration-300 text-xs"
                >
                  <span>🔗</span>
                  View Certificate
                </button>

                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-purple-400 transition-colors duration-300"
                  onClick={toggleGallery}
                >
                  <span className="text-purple-400 text-xs">📷</span>
                  <span className="text-xs text-gray-400">Gallery</span>
                </div>
              </div>

              {/* Gallery Images */}
              {showGallery && (
                <div className="grid grid-cols-2 gap-2 mt-2 transition-all duration-300">
                  <img src="/internship-1.jpg" alt="Internship Photo 1" className="w-full h-16 object-cover rounded border border-white/10" />
                  <img src="/internship-2.jpg" alt="Internship Photo 2" className="w-full h-16 object-cover rounded border border-white/10" />
                </div>
              )}
            </div>
          </div>
        </div>

        {showCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={toggleCertificate}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Service Certificate</h3>
                <button onClick={toggleCertificate} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  ✕
                </button>
              </div>
              <div className="p-4">
                <img src="/service-certificate.pdf.jpeg" alt="Service Certificate" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Tech Stack data with icons and categories
const techStackData = {
  frontend: [
    { name: "React", level: 70, icon: "⚛️", color: "cyan" },
    { name: "TailwindCSS", level: 60, icon: "🎨", color: "cyan" },
    { name: "HTML/CSS", level: 90, icon: "🌐", color: "purple" },
    { name: "Next.js", level: 65, icon: "🧭", color: "blue" },
    { name: "TypeScript", level: 70, icon: "📘", color: "blue" }
  ],
  backend: [
    { name: "Java", level: 80, icon: "☕", color: "purple" },
    { name: "Node.js", level: 70, icon: "📦", color: "green" },
    { name: "Express", level: 50, icon: "⚡", color: "orange" },
    { name: "PHP", level: 50, icon: "🐘", color: "blue" },
    { name: "Spring Boot", level: 75, icon: "🌱", color: "green" },
    { name: "Spring Security", level: 70, icon: "🛡️", color: "green" },
    { name: "tRPC", level: 65, icon: "🔗", color: "cyan" },
    { name: "NextAuth", level: 65, icon: "🔐", color: "purple" }
  ],
  database: [
    { name: "MongoDB", level: 80, icon: "🍃", color: "green" },
    { name: "MySQL", level: 85, icon: "🐬", color: "blue" },
    { name: "Prisma", level: 65, icon: "🧩", color: "blue" }
  ],
  tools: [
    { name: "Git", level: 70, icon: "📊", color: "orange" },
    { name: "VS Code", level: 90, icon: "💻", color: "blue" },
    { name: "Figma", level: 85, icon: "🎨", color: "purple" },
    { name: "C", level: 50, icon: "🔧", color: "blue" },
    { name: "C++", level: 50, icon: "⚙️", color: "blue" }
  ]
};

// TechStackCard component - Compact version
const TechStackCard = ({ tech, index, isVisible }) => {
  const getColorClasses = (color) => {
    const colors = {
      cyan: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", progress: "from-cyan-500 to-cyan-600", glow: "hover:shadow-cyan-500/20" },
      blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", progress: "from-blue-500 to-blue-600", glow: "hover:shadow-blue-500/20" },
      purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", progress: "from-purple-500 to-purple-600", glow: "hover:shadow-purple-500/20" },
      green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", progress: "from-green-500 to-green-600", glow: "hover:shadow-green-500/20" },
      orange: { border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", progress: "from-orange-500 to-orange-600", glow: "hover:shadow-orange-500/20" },
      white: { border: "border-gray-500/30", bg: "bg-gray-500/10", text: "text-gray-600 dark:text-gray-300", progress: "from-gray-400 to-gray-500", glow: "hover:shadow-gray-500/20" }
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(tech.color);

  return (
    <div
      className={`w-[110px] h-[110px] bg-white/50 dark:bg-gray-800/40 rounded-xl p-2 border ${colors.border} hover:bg-white/80 dark:hover:bg-gray-800/60 transition-all duration-300 hover:shadow-md ${colors.glow} backdrop-blur-sm group flex flex-col items-center justify-center text-center`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
        transition: "all 0.4s ease",
        transitionDelay: `${index * 25}ms`
      }}
    >
      {/* ICON */}
      <div className={`w-10 h-10 rounded-lg ${colors.bg} ring-1 ring-white/10 flex items-center justify-center text-lg mb-1.5 group-hover:scale-110 transition shadow-sm`}>
        {tech.icon}
      </div>

      {/* NAME */}
      <span className="text-gray-800 dark:text-white font-medium text-[10px] leading-tight">
        {tech.name}
      </span>

      {/* % */}
      <span className={`${colors.text} text-[10px] font-semibold`}>
        {tech.level}%
      </span>

      {/* SHORT PROGRESS */}
      <div className="w-1/2 h-[2px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
        <div
          className={`h-full bg-gradient-to-r ${colors.progress} rounded-full transition-all duration-700`}
          style={{
            width: isVisible ? `${tech.level}%` : "0%",
            transitionDelay: `${index * 25 + 150}ms`
          }}
        />
      </div>
    </div>
  );
};

const buildTechRows = (items, rowSizes) => {
  const rows = [];
  let cursor = 0;

  for (let i = 0; i < rowSizes.length && cursor < items.length; i += 1) {
    const size = Math.min(rowSizes[i], items.length - cursor);
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }

  if (cursor < items.length) {
    rows.push(items.slice(cursor));
  }

  return rows;
};

const TechStackRows = ({ techs, isVisible }) => {
  const rows = buildTechRows(techs, [8, 6, 4, 3]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-wrap justify-center gap-3">
          {row.map((tech, index) => (
            <TechStackCard
              key={`${tech.category}-${tech.name}`}
              tech={tech}
              index={index + rowIndex * 10}
              isVisible={isVisible}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Skills Component
const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'tools', label: 'Tools' }
  ];

  const getFilteredTechs = () => {
    if (activeFilter === 'all') {
      const orderedCategories = ['frontend', 'backend', 'database', 'tools'];
      return orderedCategories.flatMap((category) =>
        (techStackData[category] || []).map((tech) => ({ ...tech, category }))
      );
    }
    return techStackData[activeFilter]?.map((tech) => ({ ...tech, category: activeFilter })) || [];
  };

  const filteredTechs = getFilteredTechs();

  return (
    <section id="skills" className="py-16 px-4 bg-transparent relative overflow-hidden" ref={skillsRef}>
      <div className="techstack-vortex" aria-hidden="true" />
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800 dark:text-white">Tech </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            My toolkit for creating powerful digital experiences
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Tech Stack Row Layout */}
        <TechStackRows techs={filteredTechs} isVisible={isVisible} />

        {filteredTechs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-base">No technologies found in this category.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const getVideoSource = (url) => {
  if (!url) return { type: 'none' };

  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    let videoId = '';
    try {
      if (lower.includes('youtu.be')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else {
        const u = new URL(url);
        videoId = u.searchParams.get('v') || '';
      }
    } catch {
      videoId = '';
    }
    if (!videoId) return { type: 'none' };
    return { type: 'youtube', src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` };
  }

  if (lower.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0] || '';
    if (!videoId) return { type: 'none' };
    return { type: 'vimeo', src: `https://player.vimeo.com/video/${videoId}?autoplay=1` };
  }

  if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg') || lower.startsWith('/videos/') || lower.startsWith('videos/')) {
    return { type: 'local', src: url };
  }

  return { type: 'external', src: url };
};

// Project Card Component
const ProjectCard = ({ project, onDemoClick }) => {
  return (
    <div className="group h-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/30">
      <div className="relative aspect-video overflow-hidden rounded-t-2xl border-b border-white/10">
        <img
          src={project.screenshot}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex h-[320px] flex-col gap-3 p-6">
        <h3 className="text-xl font-semibold text-white">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-300">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <button
            type="button"
            onClick={() => onDemoClick(project)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(56,189,248,0.35)]"
          >
            <ExternalLink className="h-4 w-4" />
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

// Projects Component
const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const filters = ['All', 'Web', 'Mobile', 'UI/UX'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.tags.includes(filter));

  const handleOpenDemo = (project) => {
    setActiveProject(project);
    setIsVideoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsVideoOpen(false);
    setActiveProject(null);
  };

  useEffect(() => {
    if (!isVideoOpen) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseDemo();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVideoOpen]);

  return (
    <section id="projects" className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800 dark:text-white">My </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            A clean showcase of my recent work and builds
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {filters.map(filterName => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                filter === filterName
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <ProjectCard project={project} onDemoClick={handleOpenDemo} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-base">No projects found in this category.</p>
          </div>
        )}
      </div>

      {isVideoOpen && activeProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#070915]/80 px-4 py-8 backdrop-blur-lg" onClick={handleCloseDemo}>
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0b0f2b]/90 via-[#090c1f]/90 to-[#0a0b18]/90 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Project Demo</p>
                <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={handleCloseDemo}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15"
                aria-label="Close demo"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative">
              <div className="relative aspect-video w-full bg-black/40">
                {(() => {
                  const source = getVideoSource(activeProject.demo);
                  if (source.type === 'youtube' || source.type === 'vimeo') {
                    return (
                      <iframe
                        className="h-full w-full"
                        src={source.src}
                        title={`${activeProject.title} demo`}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }

                  if (source.type === 'local') {
                    return (
                      <video
                        className="h-full w-full"
                        src={source.src}
                        controls
                        autoPlay
                      />
                    );
                  }

                  return (
                    <div className="flex h-full items-center justify-center px-6 text-center">
                      <div className="space-y-3">
                        <p className="text-lg font-semibold text-white">Demo link is not available.</p>
                        <p className="text-sm text-gray-300">Add a video URL or local video path for this project.</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
              <div className="text-sm text-gray-300">
                Tip: press Esc to close.
              </div>
              <div className="flex gap-3">
                <a
                  href={activeProject.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100 hover:bg-cyan-500/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Demo Link
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Compact Contact Section
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const sendEmail = async (formData) => {
    try {
      const response = await emailjs.send(
        'service_your_service_id', // You'll need to get this from EmailJS
        'template_your_template_id', // You'll need to create this in EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'sandanichamoda450@gmail.com',
          reply_to: formData.email
        }
      );
      
      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false, error: 'Failed to send email' };
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { success: false, error: 'Email service unavailable' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSending(true);
      
      const result = await sendEmail(formData);
      
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        
        setTimeout(() => {
          setSubmitted(false);
          setIsSending(false);
        }, 3000);
      } else {
        setErrors({ general: result.error });
        setIsSending(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gray-800 dark:text-white">Get In </span>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            Let's discuss your next project or collaboration opportunity
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-300 text-sm">
                I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 018 0 4-4h8v4H8z"></path>
                    </svg>
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
          <a href="mailto:sandanichamoda450@gmail.com" className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
            <Mail className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Email</p>
          </a>

          <a href="https://www.linkedin.com/in/sandani-chamoda//in/sandani" target="_blank" rel="noopener noreferrer" className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
            <Linkedin className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">LinkedIn</p>
          </a>

          <a href="https://github.com/SandaniChamoda/sandani" target="_blank" rel="noopener noreferrer" className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
            <Github className="w-5 h-5 text-pink-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300">GitHub</p>
          </a>
        </div>
      </div>
    </section>
  );
};

// Elegant Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo className="w-12 h-12" />
              <span className="text-2xl font-bold text-white">Sandani Chamoda</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              IT Undergraduate specializing in Data Science at SLIIT. Creating innovative solutions through code and transforming data into insights.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com/SandaniChamoda" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sandani-chamoda/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:sandanichamoda450@gmail.com" 
                className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300"></span>
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300"></span>
                  Projects
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300"></span>
                  Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services/Skills */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">What I Do</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-400" />
                Web Development
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                Data Science
              </li>
              <li className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-pink-400" />
                UI/UX Design
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                Full Stack Apps
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Sandani Chamoda. All rights reserved. Built with React & Tailwind CSS
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 z-50 group"
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  ) : null;
};

// Main App Component
const App = () => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useLocalStorage('theme', getInitialTheme());
  const [cursorEnabled, setCursorEnabled] = useLocalStorage('cursorEnabled', true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-root min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="starfield" aria-hidden="true" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .custom-cursor {
          position: fixed;
          width: 32px;
          height: 32px;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s;
        }
        
        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: rgba(139, 92, 246, 0.8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <div className="app-content">
        <HomeBackgroundAnimation />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main>
          <HeroAbout />
          <EducationExperience />
          <Skills />
          <WorkExperience />
          <Projects />
          <ModernCertifications />
          <ContactForm />
        </main>
        
        <Footer />
        <BackToTop />
        
      </div>
    </div>
  );
};

export default App;