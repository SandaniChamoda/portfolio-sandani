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

// Projects data
const projectsData = [
  {
    id: 1,
    title: "RiyaGuru_LK - Driving School Management System",
    description: "A full-stack MERN platform automating driving school operations with student registration, lesson booking, and progress tracking. Developed payment management with JWT authentication and role-based access control.",
    tags: ["MERN", "React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    screenshot: "https://images.unsplash.com/photo-1606768666853-403c07a962b3?w=800&h=600&fit=crop",
    repo: "https://github.com/ravindu-sliit/RiyaGuru",
    demo: "#"
  },
  {
    id: 2,
    title: "WellNest Habit Tracker - Android App",
    description: "An offline Android wellness app for habit tracking, mood journaling, and hydration reminders with shake-sensor integration and home-screen widget.",
    tags: ["Kotlin", "Android Studio", "SharedPreferences", "Mobile"],
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    repo: "https://github.com/SandaniChamoda/Wellnest-Habit-tracker-app",
    demo: "#"
  },
  {
    id: 3,
    title: "Hotel Customer Care System",
    description: "Web-based customer support system with ticket submission, tracking, and feedback features. Developed with Java, MySQL, and Bootstrap.",
    tags: ["Java", "MySQL", "Bootstrap", "Web"],
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    repo: "#",
    demo: "#"
  },
  {
    id: 4,
    title: "Vehicle Insurance Management System",
    description: "Multi-role insurance platform with policy management and claims processing. Built with PHP and MySQL.",
    tags: ["PHP", "MySQL", "Web"],
    screenshot: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?w=800&h=600&fit=crop",
    repo: "#",
    demo: "#"
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
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sandani 
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
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

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer | MERN Stack | UI/UX Enthusiast";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-16 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20"></div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
           {/* Main Heading - All in one line */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold whitespace-nowrap">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Hi, I'm </span>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Sandani Chamoda
                </span>
              </h1>
              
              <div className="h-8">
                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                  {text}<span className="animate-pulse text-purple-600">|</span>
                </p>
              </div>
            </div>
            {/* Bio */}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A detail-oriented <span className="font-semibold text-purple-600">BSc (Hons) in Information Technology</span> undergraduate at SLIIT with a 
              <span className="font-semibold text-blue-600"> 3.6 GPA</span>. Skilled in MERN Stack, Java, and UI/UX with hands-on experience in 
              full-stack development. Passionate about creating efficient, user-friendly applications and always eager to learn new technologies.
            </p>

            {/* Stats Counter */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">6+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Months Experience</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <span className="whitespace-nowrap">View My Work</span>
              </a>
              <a
                href="/Sandani Chamoda CV.pdf"
                download
                className="px-8 py-2 bg-transparent border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="whitespace-nowrap">Download CV</span>
              </a>
              <a
                href="#contact"
                className="px-8 py-2 bg-transparent border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span className="whitespace-nowrap">Connect with Me</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/SandaniChamoda" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sandani-chamoda" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:sandanichamoda450@gmail.com" 
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                aria-label="Email"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side - Profile Image (Keep as current) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Profile Image with Elegant Shadow */}
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <img
                  src="/profile.png"
                  alt="Sandani Chamoda"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Education & Experience Section
const EducationExperience = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const toggleGallery = () => {
    setShowGallery(!showGallery);
  };

  const toggleCertificate = () => {
    setShowCertificate(!showCertificate);
  };

  return (
    <section id="education" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education & Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certificates Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Certifications
              </h3>

              <div className="space-y-4">
                {/* HRM Certificate */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-orange-200 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Certificate in Human Resource Management
                  </h4>
                  <p className="text-orange-600 dark:text-orange-400 text-sm font-semibold mb-2">
                    IMS Campus, Faculty of Management Studies
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    March 2022 - June 2022
                  </p>
                </div>

                {/* AI/ML Certificate */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-blue-200 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Artificial Intelligence & Machine Learning
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2">
                    Sri Lanka Institute of Information Technology (SLIIT)
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    In Progress
                  </p>
                </div>

                {/* Python Certificate */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-yellow-200 dark:border-yellow-900/50 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all duration-300">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Beginner's Python
                  </h4>
                  <p className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold mb-2">
                    University of Moratuwa
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    In Progress
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-blue-500" />
                Work Experience
              </h3>

              <div className="relative pl-8 pb-6 border-l-2 border-blue-500/30">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg shadow-blue-500/50"></div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                    Intern
                  </h4>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800">
                    Feb 2023 – Aug 2023
                  </span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
                  People's Bank, Galle Main Street Branch
                </p>
                
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm mb-6">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Facilitated digital transformation by guiding customers through online banking platform setup, mobile app integration, and troubleshooting technical issues, resulting in 15–20% increase in digital adoption rates.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Leveraged banking software systems for efficient data management, account processing, and transaction recording with 99% accuracy, ensuring compliance with digital security protocols.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Provided technical support for digital banking services, assisting 100+ customers daily with online transactions, mobile banking features, and digital payment solutions.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Promoted digital banking products and fintech solutions, educating customers on cybersecurity best practices and digital financial management tools to enhance user engagement.</span>
                  </li>
                </ul>

                {/* Certificate & Gallery Links */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleCertificate}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 text-sm"
                  >
                    <span>🔗</span>
                    View Service Certificate
                  </button>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors duration-300" onClick={toggleGallery}>
                    <span className="text-purple-600">📷</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Internship Gallery</span>
                  </div>
                </div>

                {/* Gallery Images */}
                {showGallery &&S  (
                  <div className="grid grid-cols-2 gap-3 mt-4 transition-all duration-300">
                    <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                      <img
                        src="/internship-1.jpg"
                        alt="Internship Photo 1"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                      <img
                        src="/internship-2.jpg"
                        alt="Internship Photo 2"
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={toggleCertificate}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Service Certificate</h3>
                <button
                  onClick={toggleCertificate}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <img
                  src="/service-certificate.pdf.jpeg"
                  alt="Service Certificate"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Additional certificates section */}
        <div className="mt-8">
          <div className="space-y-4">
            {/* Google Cloud Certificates */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">
                    MLOps for Generative AI
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-semibold">
                    Google Cloud Skills Boost
                  </p>
                </div>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-300 dark:border-gray-600">
                  2024
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Machine Learning Operations for Generative AI applications
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">
                    Introduction to Generative AI
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 text-xs font-semibold">
                    Google Cloud Skills Boost
                  </p>
                </div>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-300 dark:border-gray-600">
                  2024
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Fundamentals of Generative AI and its applications
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">
                    Microsoft Azure Fundamentals
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-semibold">
                    Microsoft
                  </p>
                </div>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-300 dark:border-gray-600">
                  2024
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Cloud computing fundamentals and Azure services
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Tech Stack data with icons and categories
const techStackData = {
  frontend: [
    { name: "React", level: 70, icon: "⚛️", color: "cyan" },
    { name: "TailwindCSS", level: 60, icon: "🎨", color: "cyan" },
    { name: "HTML/CSS", level: 90, icon: "🌐", color: "purple" }
  ],
  backend: [
    { name: "Java", level: 80, icon: "☕", color: "purple" },
    { name: "Node.js", level: 70, icon: "📦", color: "green" },
    { name: "Express", level: 50, icon: "⚡", color: "orange" },
    { name: "PHP", level: 50, icon: "🐘", color: "blue" }
  ],
  database: [
    { name: "MongoDB", level: 80, icon: "🍃", color: "green" },
    { name: "MySQL", level: 85, icon: "🐬", color: "blue" }
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
      className={`bg-white/50 dark:bg-gray-800/40 rounded-xl p-4 border ${colors.border} hover:bg-white/80 dark:hover:bg-gray-800/60 transition-all duration-300 hover:shadow-lg ${colors.glow} backdrop-blur-sm group`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: `${index * 30}ms`
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
            {tech.icon}
          </div>
          <span className="text-gray-800 dark:text-white font-semibold text-sm">{tech.name}</span>
        </div>
        <span className={`${colors.text} font-bold text-sm`}>{tech.level}%</span>
      </div>
      
      <div className="space-y-1">
        <div className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-wide">Proficiency</div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colors.progress} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ 
              width: isVisible ? `${tech.level}%` : '0%',
              transitionDelay: `${index * 30 + 200}ms`
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
          </div>
        </div>
      </div>
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
      return Object.entries(techStackData).flatMap(([category, techs]) => 
        techs.map(tech => ({ ...tech, category }))
      );
    }
    return techStackData[activeFilter]?.map(tech => ({ ...tech, category: activeFilter })) || [];
  };

  const filteredTechs = getFilteredTechs();

  return (
    <section id="skills" className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20 relative overflow-hidden" ref={skillsRef}>
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

        {/* Tech Stack Grid - More compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredTechs.map((tech, index) => (
            <TechStackCard 
              key={`${tech.category}-${tech.name}`} 
              tech={tech} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

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

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.screenshot}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="flex gap-3">
            <a
              href={project.repo}
              className="px-4 py-2 bg-white/90 text-gray-900 rounded-lg text-sm font-semibold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            <a
              href={project.demo}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
};

// Projects Component
const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web', 'Mobile', 'UI/UX'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work across web development, mobile apps, and UI/UX design
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filterName => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === filterName
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 border border-gray-300 dark:border-gray-700'
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
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Elegant Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠</span>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠</span>{errors.email}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder-gray-400 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠</span>{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Send Message
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Email</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">sandani@example.com</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">LinkedIn</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Connect with me</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Github className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">GitHub</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">View my projects</p>
          </div>
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
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:sandani@example.com" 
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background-color: #f9fafb;
        }
        
        .dark body {
          background-color: #111827;
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

      <AnimatedCursor enabled={cursorEnabled} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <HeroAbout />
        <EducationExperience />
        <Skills />
        <Projects />
        <ContactForm />
      </main>
      
      <Footer />
      <BackToTop />
      
      {/* Cursor Toggle Button */}
      <button
        onClick={() => setCursorEnabled(!cursorEnabled)}
        className="fixed bottom-8 left-8 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all z-40 hidden md:block border border-gray-200 dark:border-gray-700"
        aria-label="Toggle custom cursor"
      >
        Cursor: {cursorEnabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default App;