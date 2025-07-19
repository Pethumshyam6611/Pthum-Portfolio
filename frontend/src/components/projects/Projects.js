import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiFigma } from 'react-icons/si';
import { Container } from 'react-bootstrap';

function Projects() {
  const [activeCategory, setActiveCategory] = useState('software');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (selectedProject) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          const currentProjects = smallProjects.filter(p => 
            activeCategory === 'software' ? p.category === "Software Engineering" : p.category === "UI/UX Design"
          );
          const currentIndex = currentProjects.findIndex(p => p.id === selectedProject.id);
          const nextIndex = (currentIndex + 1) % currentProjects.length;
          setSelectedProject(currentProjects[nextIndex]);
          setIsAnimating(false);
        }, 500);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [selectedProject, activeCategory]);

  const smallProjects = [
      {
        id: 1,
      title: "Weather Dashboard",
      category: "Software Engineering",
      description: "Real-time weather tracking application with detailed forecasts and interactive maps.",
      technologies: ["React", "OpenWeather API", "Mapbox"],
      github: "https://github.com/yourusername/weather-dashboard",
      image: "/projects/weather-app.jpg"
    },
    {
      id: 2,
      title: "Task Flow Pro",
      category: "Software Engineering",
      description: "Advanced task management system with Kanban boards and team collaboration features.",
      technologies: ["Vue.js", "Vuex", "Firebase"],
      github: "https://github.com/yourusername/task-flow-pro",
      image: "/projects/task-manager.jpg"
    },
    {
      id: 3,
      title: "Code Share Hub",
      category: "Software Engineering",
      description: "Real-time code sharing and collaboration platform for developers.",
      technologies: ["Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com/yourusername/code-share-hub",
      image: "/projects/code-share.jpg"
    },
    {
      id: 4,
      title: "Fitness Tracker",
      category: "Software Engineering",
      description: "Comprehensive fitness tracking application with workout plans and progress analytics.",
      technologies: ["React Native", "Redux", "Firebase"],
      github: "https://github.com/yourusername/fitness-tracker",
      image: "/projects/fitness-app.jpg"
    },
      {
      id: 5,
      title: "E-commerce Dashboard",
      category: "UI/UX Design",
      description: "Modern e-commerce admin dashboard with intuitive analytics and order management.",
      technologies: ["Figma", "Adobe XD", "Prototyping"],
      figma: "https://figma.com/file/e-commerce-dashboard",
      image: "/projects/ecommerce-dashboard.jpg"
    },
    {
      id: 6,
      title: "Travel App Design",
      category: "UI/UX Design",
      description: "Beautiful travel planning app design with immersive user experience.",
      technologies: ["Figma", "UI Design", "Interaction Design"],
      figma: "https://figma.com/file/travel-app",
      image: "/projects/travel-app.jpg"
    },
    {
      id: 7,
      title: "Healthcare Portal",
      category: "UI/UX Design",
      description: "Patient-centric healthcare portal design focusing on accessibility and ease of use.",
      technologies: ["Adobe XD", "Wireframing", "User Research"],
      figma: "https://figma.com/file/healthcare-portal",
      image: "/projects/healthcare-portal.jpg"
    },
    {
      id: 8,
      title: "Smart Home App",
      category: "UI/UX Design",
      description: "Intuitive smart home control application with voice command integration.",
      technologies: ["Figma", "Prototyping", "Motion Design"],
      figma: "https://figma.com/file/smart-home-app",
      image: "/projects/smart-home.jpg"
    }
  ];

  const filteredProjects = smallProjects.filter(project => 
    activeCategory === 'software' 
      ? project.category === "Software Engineering" 
      : project.category === "UI/UX Design"
  );

  const handleSmallProjectClick = (project) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="projects-section">
      <Container>
        <div className="projects-content">
          <div className="projects-header">
            <h1 className="projects-heading">PROJECTS</h1>
            <h2 className="projects-subheading">
              Collection of innovative solutions and creative designs
            </h2>
          </div>

          {/* Featured Project or Selected Small Project */}
          <div className="project-card">
            {selectedProject || filteredProjects[0] ? (
              <>
                <div className="project-image-container">
                  <img 
                    src={(selectedProject || filteredProjects[0]).image}
                    alt={(selectedProject || filteredProjects[0]).title}
                    className="project-image"
                  />
                </div>
                <div className={`project-content ${isAnimating ? 'slide-out' : 'slide-in'}`}>
                  <div className="project-header">
                    <h3 className="project-title">
                      {(selectedProject || filteredProjects[0]).title}
                    </h3>
                    <h4 className="project-subtitle">
                      {(selectedProject || filteredProjects[0]).category}
                    </h4>
                  </div>
                  <p className="project-description">
                    {(selectedProject || filteredProjects[0]).description}
                  </p>
                  <div className="project-technologies">
                    {(selectedProject || filteredProjects[0]).technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {(selectedProject || filteredProjects[0]).github && (
                      <a 
                        href={(selectedProject || filteredProjects[0]).github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FaGithub />
                        <span>GitHub</span>
                      </a>
                    )}
                    {(selectedProject || filteredProjects[0]).figma && (
                      <a
                        href={(selectedProject || filteredProjects[0]).figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <SiFigma />
                        <span>Figma</span>
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
          
          {/* Category Toggle */}
          <div className="category-toggle-bottom">
            <button 
              className={`category-btn ${activeCategory === 'software' ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory('software');
                setSelectedProject(null);
              }}
            >
              Software Engineering
            </button>
            <button 
              className={`category-btn ${activeCategory === 'uiux' ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory('uiux');
                setSelectedProject(null);
              }}
            >
              UI/UX Design
            </button>
          </div>

          {/* Small Projects Grid */}
          <div className="small-projects-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="small-project-card"
                onClick={() => handleSmallProjectClick(project)}
              >
                <div className="small-project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <h3 className="small-project-title">{project.title}</h3>
                <p className="small-project-description">{project.description}</p>
                <div className="small-project-technologies">
                    {project.technologies.map((tech, index) => (
                    <span key={index} className="small-project-tech-tag">{tech}</span>
                    ))}
                  </div>
                <div className="small-project-links">
                    {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="small-project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub />
                      <span>GitHub</span>
                      </a>
                    )}
                    {project.figma && (
                    <a
                      href={project.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="small-project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SiFigma />
                      <span>Figma</span>
                      </a>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Projects;

