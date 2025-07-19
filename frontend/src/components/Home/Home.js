import { Container } from 'react-bootstrap';
import Spline from '@splinetool/react-spline';
import { Suspense, useEffect, useRef } from 'react';
import BlurText from '../BlurText'; // Adjust this path based on your project structure
import DecryptedText from '../DecryptedText'; // Updated to match the file name

function Home() {
  console.log('Home component rendering');

  const handleSplineLoad = () => {
    console.log('Spline 3D model loaded successfully');
  };

  const handleSplineError = (error) => {
    console.error('Spline 3D model failed to load:', error.message);
  };

  // Refs for the button and icons
  const resumeBtnRef = useRef(null);
  const githubIconRef = useRef(null);
  const linkedinIconRef = useRef(null);
  const facebookIconRef = useRef(null);
  const instagramIconRef = useRef(null);

  useEffect(() => {
    const elementsToAnimate = [
      resumeBtnRef.current,
      githubIconRef.current,
      linkedinIconRef.current,
      facebookIconRef.current,
      instagramIconRef.current,
    ].filter(Boolean); // Filter out null refs

    console.log('Elements to animate:', elementsToAnimate); // Debug: Ensure refs are assigned

    // Delayed transition for the button
    if (resumeBtnRef.current) {
      setTimeout(() => {
        resumeBtnRef.current.classList.add('transition-reveal');
      }, 200); // Delay of 200ms to allow the initial state to render
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        console.log(`Element ${entry.target.className} is intersecting: ${entry.isIntersecting}`); // Debug: Check if observer triggers
        if (entry.isIntersecting) {
          entry.target.classList.add('transition-reveal');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px', // Trigger slightly before the element enters the viewport
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elementsToAnimate.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elementsToAnimate.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="hero-section" style={{ alignItems: 'flex-start', maxWidth: '100%' }}>
      <Container className="hero-container">
        <div className="hero-content-wrapper d-flex flex-row align-items-start justify-content-between w-100">
          <div className="hero-content text-left" style={{ maxWidth: '700px', marginTop: '55px', marginLeft: '20px' }}>
            <DecryptedText
              text="PETHUM SHYAM."
              as="h1"
              className="hero-main-heading fw-bold mb-3"
              style={{ fontSize: '3.5rem', letterSpacing: '3px', color: '#0A0909', fontFamily: 'Fira Mono, monospace' }}
              speed={50}
              maxIterations={10}
              sequential={true}
              revealDirection="start"
              animateOn="view"
            />
            <DecryptedText
              text="Full-Stack Developer & UI/UX Designer"
              as="h2"
              className="hero-sub-heading fw-bold mb-4"
              style={{ fontSize: '1.50rem', letterSpacing: '1px', color: '#0A0909', fontFamily: 'Fira Mono, monospace' }}
              speed={50}
              maxIterations={10}
              sequential={true}
              revealDirection="start"
              animateOn="view"
            />
            <BlurText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in nisi non enim facilisis elementum. Sed ac arcu nec arcu maximus gravida vitae ante. Sed sed sollicitudin nibh. Nam consectetur rhoncus neque."
              as="p"
              className="hero-paragraph lorem-text mb-5"
              style={{ fontSize: '1rem', fontWeight: 400, lineHeight: '1.6', color: '#0A0909', fontFamily: 'Fira Mono, monospace' }}
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.3}
            />
            <div className="mb-5">
              <a
                href="/resume.pdf"
                download="Pethum_Shyam_Resume_2025.pdf"
                ref={resumeBtnRef}
                className="hero-resume-btn btn btn-lg transition-element"
                style={{ borderRadius: '0', padding: '12px 30px', fontSize: '1.1rem', borderWidth: '2px', color: '#0A0909', borderColor: '#0A0909' }}
              >
                View Full Resume
              </a>
            </div>
            <div className="d-flex gap-5">
              <a
                href="https://github.com"
                target="_blank"
                ref={githubIconRef}
                className="social-icon transition-element"
                style={{ fontSize: '1.8rem', color: '#0A0909' }}
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                ref={linkedinIconRef}
                className="social-icon transition-element"
                style={{ fontSize: '1.8rem', color: '#0A0909' }}
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                ref={facebookIconRef}
                className="social-icon transition-element"
                style={{ fontSize: '1.8rem', color: '#0A0909' }}
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                ref={instagramIconRef}
                className="social-icon transition-element"
                style={{ fontSize: '1.8rem', color: '#0A0909' }}
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="hero-3d-model" style={{ width: '150%', minHeight: '900px',bottom: '-20px', position: 'relative' }}>
            <Suspense fallback={<div style={{ color: '#0A0909', textAlign: 'center' }}>Loading 3D Model...</div>}>
              <Spline
                scene="/model.splinecode"
                style={{ width: '100%', height: '778px', position: 'absolute', top: '-250px', left: '100px', bottom: '-60px', transformOrigin: 'center top' }}
                onLoad={handleSplineLoad}
                onError={handleSplineError}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;