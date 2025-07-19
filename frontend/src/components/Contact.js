import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="contact-section">
      <Container>
        <div className="contact-content">
          {/* Header Section */}
          <div className="contact-header">
            <h1 className="contact-heading">CONTACT</h1>
            <h2 className="contact-subheading">
              Let's create something amazing together
            </h2>
          </div>

          <div className="contact-wrapper">
            {/* Contact Information */}
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <MdEmail />
                </div>
                <h3>Email</h3>
                <p>pethumshayam66@gmail.com</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MdPhone />
                </div>
                <h3>Phone</h3>
                <p>+94 77 2910692</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MdLocationOn />
                </div>
                <h3>Location</h3>
                <p>Sri Lanka</p>
              </div>

              {/* Social Links */}
              <div className="contact-social">
                <h3>Connect With Me</h3>
                <div className="social-icons">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                  </a>
                  <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaFacebookF />
                  </a>
                  <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="form-textarea"
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact; 