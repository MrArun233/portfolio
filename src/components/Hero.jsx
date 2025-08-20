import React from "react";
import { FiArrowDown } from "react-icons/fi";
import "../App.css";

export default function Hero() {
  return (
    <section id="home" className="hero-compact">
      <div className="hero-inner">
        <div className="hero-small">Hello! I'm</div>
        <h1 className="hero-name">Arun Vishwakarma</h1>
        <div className="hero-role">Frontend Developer</div>
      </div>

      {/* Scroll Button */}
      <a href="#about" className="scroll-down">
        <FiArrowDown className="arrow-icon" />
        <span>Scroll Down</span>
      </a>
    </section>
  );
}