import React, { useEffect, useState, useCallback } from "react";
import { FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa"; // Telegram, WhatsApp
import "../App.css";

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const SHOW_AFTER = 300;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback((e) => {
    if (e) e.preventDefault();
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    let current = document.documentElement.scrollTop || document.body.scrollTop;
    const step = () => {
      current = current - current / 8;
      window.scrollTo(0, current);
      if (current > 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") scrollToTop(e);
  };

  return (
    <>
      <footer className="footer" aria-labelledby="site-footer">
        <div className="footer-container">
          <div className="footer-left" id="site-footer">
            © {new Date().getFullYear()} Arun Vishwakarma. All rights reserved.
          </div>

          <ul className="social-list" aria-label="Social links">
            <li>
              <a
                className="social-link"
                href="https://wa.me/6266760124" // <-- Apna WhatsApp number
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </li>
            <li>
              <a
                className="social-link"
                href="https://www.linkedin.com/in/arun-vishwakarma-078ba2250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // <-- Apna LinkedIn
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                className="social-link"
                href="https://www.instagram.com/mr.arun_233?igsh=cWo3bTlxNzAybzNh" // <-- Apna Instagram
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <button
        className={`bt-float ${visible ? "bt-visible" : ""}`}
        onClick={scrollToTop}
        onKeyDown={handleKey}
        aria-label="Back to top"
        title="Back to top"
        type="button"
      >
        <span className="bt-icon" aria-hidden="true">
          <FaArrowUp />
        </span>
      </button>
    </>
  );
}
