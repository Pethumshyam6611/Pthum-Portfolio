import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="py-3" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0,
      zIndex: 1000
    }}>
      <Navbar.Brand as={Link} to="/" className="ms-5 text-[#0A0909] fw-bold d-flex align-items-center">
        <img src="/assets/Pethum.png" alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
        <span style={{ fontSize: '1.5rem', letterSpacing: '1px', fontFamily: 'Fira Mono, monospace'}}>PETHUM</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5" style={{ borderColor: '#0000' }} />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="me-5">
          <Nav.Link 
            as={Link} 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/projects" 
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
          >
            Projects
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;