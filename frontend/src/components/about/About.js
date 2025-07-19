import { Container } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import DecryptedText from '../DecryptedText';
import BlurText from '../BlurText';

function About() {
  console.log('About component rendering');

  // State to track the active section
  const [activeSection, setActiveSection] = useState('introduction');

  // Refs for animated elements
  const introHeadingRef = useRef(null);
  const skillsHeadingRef = useRef(null);
  const educationHeadingRef = useRef(null);

  // Ref for left navigation panel
  const navPanelRef = useRef(null);

  // Refs for scrolling to sections
  const introSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const educationSectionRef = useRef(null);

  useEffect(() => {
    // Animation observer
    const elementsToAnimate = [
      navPanelRef.current,
      introHeadingRef.current,
      skillsHeadingRef.current,
      educationHeadingRef.current,
    ].filter(Boolean);

    // Add entry animation on mount with staggered delays
    elementsToAnimate.forEach((el, idx) => {
      if (el) {
        el.classList.add('about-fade-in');
        el.style.animationDelay = `${0.2 + idx * 0.15}s`;
      }
    });

    const animationObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('transition-reveal');
        }
      });
    };

    const animationObserverOptions = {
      root: null,
      rootMargin: '-50px 0px',
      threshold: 0.1,
    };

    const animationObserver = new IntersectionObserver(animationObserverCallback, animationObserverOptions);

    elementsToAnimate.forEach((element) => {
      animationObserver.observe(element);
    });

    // Active section observer
    const sections = [
      { ref: introSectionRef, id: 'introduction' },
      { ref: skillsSectionRef, id: 'skills' },
      { ref: educationSectionRef, id: 'education' },
    ];

    const sectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
          console.log(`Active section updated to: ${entry.target.dataset.section}`);
        }
      });
    };

    const sectionObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const sectionObserver = new IntersectionObserver(sectionObserverCallback, sectionObserverOptions);

    sections.forEach(({ ref }) => {
      if (ref.current) {
        sectionObserver.observe(ref.current);
      }
    });

    return () => {
      elementsToAnimate.forEach((element) => {
        animationObserver.unobserve(element);
      });
      sections.forEach(({ ref }) => {
        if (ref.current) {
          sectionObserver.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Scroll handler for nav links
  const scrollToSection = (ref, sectionName) => {
    console.log(`Navigating to section: ${sectionName}`);
    setActiveSection(sectionName);
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="about-section">
      {/* Left Navigation Panel */}
      <div className="about-nav-panel" ref={navPanelRef}>
        <div>
          <h2 className="about-nav-heading">ABOUT ME</h2>
          <ul className="about-nav-list">
            <li>
              <a
                href="#introduction"
                className={`about-nav-link ${activeSection === 'introduction' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(introSectionRef, 'introduction');
                }}
              >
                - Introduction
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`about-nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(skillsSectionRef, 'skills');
                }}
              >
                - Skills
              </a>
            </li>
            <li>
              <a
                href="#education"
                className={`about-nav-link ${activeSection === 'education' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(educationSectionRef, 'education');
                }}
              >
                - Education
              </a>
            </li>
          </ul>
        </div>
        
        {/* Social Media Icons */}
        <div className="social-icons-container">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Navigation Indicator */}
      <div className="nav-indicator">
        <div className="nav-indicator-line"></div>
        <div className={`section-indicator introduction ${activeSection === 'introduction' ? 'active' : ''}`}></div>
        <div className={`section-indicator skills ${activeSection === 'skills' ? 'active' : ''}`}></div>
        <div className={`section-indicator education ${activeSection === 'education' ? 'active' : ''}`}></div>
      </div>

      {/* Right Scrollable Content Panel */}
      <div className="about-content-panel about-fade-in" style={{ marginBottom: '50px' }}>
        <Container className="about-container custom-container">
          <div className="about-content-wrapper w-100">
            {/* Introduction Section */}
            <div
              className="about-content section-wrapper introduction about-section-animate"
              style={{ maxWidth: '800px', marginTop: '55px', textAlign: 'left' }}
              ref={introSectionRef}
              data-section="introduction"
            >
              <div className="section-circle about-fade-in"></div>
              <div className="section-line about-fade-in"></div>
              <h2 ref={introHeadingRef} className="about-sub-heading">Introduction</h2>
              <div className="intro-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginTop: '20px' }}>
                <img
                  src= "../assets/DP.jpg"
                  alt="Profile"
                  className="profile-pic"
                  style={{ width: '170px', height: '170px', marginRight: '20px' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <h1 className="about-main-heading">Pethum Shyam</h1>
                  <DecryptedText
                    text="Full- Stack Developer & UI/UX Designer"
                    as="h3"
                    className="about-role-heading"
                    speed={50}
                    maxIterations={10}
                    sequential={true}
                    revealDirection="start"
                    animateOn="view"
                  />
                  <BlurText
                    text="In in nisi non enim facilisis elementum. Sed ac arcu nec arcu maximus gravida vitae quis ante. Sed sed sollicitudin nibh. Nam consectetur rhoncus neque."
                    as="p"
                    className="about-paragraph"
                    delay={100}
                    animateBy="words"
                    direction="top"
                    stepDuration={0.3}
                  />
                </div>
              </div>
              <div className="personal-details">
                <h3 className="details-heading">Personal Details</h3>
                    <ul className="details-list list-unstyled">
                  <li><span className="detail-label">Age:</span> 24</li>
                  <li><span className="detail-label">Birthday:</span> 2001/12/07</li>
                  <li><span className="detail-label">Phone:</span> +94772910692</li>
                  <li><span className="detail-label">Email:</span> pethumwaragoda66@gmail.com</li>
                    </ul>
                  </div>
            </div>

            {/* Skills Section */}
            <div
              className="about-content section-wrapper skills about-section-animate"
              style={{ maxWidth: '800px', marginTop: '30px' }}
              ref={skillsSectionRef}
              data-section="skills"
            >
              <div className="section-circle about-fade-in"></div>
              <div className="section-line about-fade-in"></div>
              <h2 ref={skillsHeadingRef} className="about-sub-heading">Skills</h2>
              <div className="skills-container">
                <div className="skill-card">
                  <h3 className="skill-card-heading">Languages</h3>
                  <p className="skill-card-text">
                    Skilled in JavaScript, Python, PHP, C++, C#, Java, and HTML—each a tool I use to build smart, functional, and engaging digital solutions.
                  </p>
                  <div className="language-icons">
                    <img src="../assets/c-original.png" alt="JavaScript" className="language-icon" />
                    <img src="../assets/cplusplus-original.png" alt="Python" className="language-icon" />
                    <img src="../assets/java-original-wordmark.png" alt="PHP" className="language-icon" />
                    <img src="../assets/javascript-original.png" alt="C++" className="language-icon" />
                    <img src="../assets/php-plain.png" alt="C#" className="language-icon" />
                    <img src="../assets/python-original.png" alt="Java" className="language-icon" />
                    <img src="../assets/html5-original.png" alt="HTML" className="language-icon" />
                  </div>
                </div>
                <div className="skill-card">
                  <h3 className="skill-card-heading">Front-End</h3>
                  <p className="skill-card-text">
                    Passionate about crafting clean, responsive interfaces using HTML, CSS, Bootstrap, and React—bringing design to life with smooth, user-friendly experiences.
                  </p>
                  <div className="language-icons">
                    <img src="../assets/react-original.png" alt="JavaScript" className="language-icon" />
                    <img src="../assets/html5-original.png" alt="HTML" className="language-icon" />
                    <img src="../assets/css3-original.png" alt="PHP" className="language-icon" />
                    <img src="../assets/bootstrap-original.png" alt="C++" className="language-icon" />
                  </div>
                </div>
                <div className="skill-card">
                  <h3 className="skill-card-heading">Back-End</h3>
                  <p className="skill-card-text">
                  Experienced in building fast, secure, and scalable back-ends with Node.js, Express.js, and Spring—powering applications from behind the scenes use to build smart, functional, and engaging digital solutions.
                  </p>
                  <div className="language-icons">
                    <img src="../assets/express-original.png" alt="JavaScript" className="language-icon" />
                    <img src="../assets/nodejs-plain-wordmark.png" alt="Python" className="language-icon" />
                    <img src="../assets/spring-original-wordmark.png" alt="PHP" className="language-icon" />
                  </div>
                </div>
                <div className="skill-card">
                  <h3 className="skill-card-heading">Tools</h3>
                  <p className="skill-card-text">
                  Proficient with essential development tools and databases like Git, MySQL, MongoDB, and PostgreSQL—ensuring smooth collaboration and solid data management                  </p>
                  <div className="language-icons">
                    <img src="../assets/git-plain.png" alt="JavaScript" className="language-icon" />
                    <img src="../assets/mongodb-original-wordmark.png" alt="Python" className="language-icon" />
                    <img src="../assets/mysql-original-wordmark.png" alt="PHP" className="language-icon" />
                    <img src="../assets/postgresql-original-wordmark.png" alt="C++" className="language-icon" />
                  </div>
                </div>
                <div className="skill-card">
                  <h3 className="skill-card-heading">UI/UX Designig</h3>
                  <p className="skill-card-text">
                  Skilled in crafting intuitive and engaging designs using Figma, Adobe XD, and Photoshop—blending creativity with user-centered thinking.                  </p>
                  <div className="language-icons">
                    <img src="../assets/figma-original.png" alt="JavaScript" className="language-icon" />
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div
              className="about-content section-wrapper education about-section-animate"
              style={{ maxWidth: '800px', marginTop: '30px', marginBottom: '40px' }}
              ref={educationSectionRef}
              data-section="education"
            >
              <div className="section-circle about-fade-in"></div>
              <div className="section-line about-fade-in"></div>
              <h2 ref={educationHeadingRef} className="about-sub-heading">Education</h2>
              <div className="education-container">
                <div className="education-card">
                  <img 
                    src="../assets/University Logo.jpg" 
                    alt="Cardiff Metropolitan University" 
                    className="education-logo"
                  />
                  <div className="education-content">
                    <h3 className="education-university">Cardiff Metropolitan University</h3>
                    <h4 className="education-degree">Diploma in Computing and Software Engineering</h4>
                    <p className="education-year">2022-2024 (Merit)</p>
                  </div>
                </div>
                <div className="education-card">
                  <img 
                    src="../assets/University Logo.jpg" 
                    alt="Cardiff Metropolitan University" 
                    className="education-logo"
                  />
                  <div className="education-content">
                    <h3 className="education-university">Cardiff Metropolitan University</h3>
                    <h4 className="education-degree">BSc (Hons) in Software Engineering</h4>
                    <p className="education-year">2024-2025 (First Class)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default About;