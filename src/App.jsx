import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { FaArrowUp } from "react-icons/fa"; // 🔹 Add this
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false); // 🔹 Back-to-top toggle

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  // 🔹 Scroll listener for button show/hide
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <div data-aos="fade-up">
          <Hero />
        </div>
        <div data-aos="fade-right">
          <About />
        </div>
        <div data-aos="zoom-in">
          <Skills />
        </div>
        <div data-aos="fade-up">
          <Projects />
        </div>
        <div data-aos="fade-left">
          <Contact />
        </div>
      </main>

      <footer data-aos="fade-in">
        <Footer />
      </footer>

      {/* 🔹 Floating Back to Top Button */}
      {showButton && (
        <a href="#home" className="back-to-top-btn" data-aos="fade-left">
          <FaArrowUp className="arrow-icon" />
        </a>
      )}
    </div>
  );
}
