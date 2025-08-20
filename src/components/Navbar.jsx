import React, { useState, useEffect } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import "../App.css";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        {/* Logo */}
        <a href="#home" className="logo">
          <span className="logo-highlight">Arun Vishwakarma</span>
          <span className="logo-sub">.dev</span>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href="https://drive.google.com/file/d/16I23SPqrjpSBeclNW0H3lg_Iq5g82msD/view?usp=drivesdk" className="btn-resume">
              <FiDownload /> Resume
            </a>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          className="menu-btn"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              className="btn-resume"
              onClick={() => setOpen(false)}
            >
              <FiDownload /> Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
