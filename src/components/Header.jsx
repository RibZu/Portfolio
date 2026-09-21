import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { currentLanguage, setLanguagePreference, getOppositePath } from '../lib/language.js';
import { t } from '../lib/content.js';
import { ui } from '../data/ui.js';
import { profile } from '../data/profile.js';

export default function Header() {
  const switchLang = currentLanguage === 'es' ? 'en' : 'es';
  const oppositePath = getOppositePath();
  const switchLabel = switchLang === 'en' ? 'English' : 'Español';

  const handleLanguageSwitch = () => {
    setLanguagePreference(switchLang);
  };

  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">{profile.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#skills">{t(ui.navSkills)}</Nav.Link>
            <Nav.Link href="#projects">{t(ui.navProjects)}</Nav.Link>
            <Nav.Link href="#background">{t(ui.navBackground)}</Nav.Link>
            <Nav.Link href="#contact">{t(ui.navContact)}</Nav.Link>
          </Nav>
          <Nav>
            <a href={`${oppositePath}${hash}`} onClick={handleLanguageSwitch} className="nav-link">
              {switchLabel}
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
