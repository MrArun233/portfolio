import React, { useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

export default function About() {
  const resumeBtnRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const handleResumeClick = () => {
    const btn = resumeBtnRef.current;
    btn.classList.remove("shine-animation");
    void btn.offsetWidth; 
    btn.classList.add("shine-animation");
  };

  return (
    <section id="about" className="about-section">
      <h2 className="section-title fade-in" data-aos="fade-up" data-aos-delay="100">
        About <span className="gradient-text">Me</span>
      </h2>

      <div className="about-wrapper">
        {/* Left Side */}
        <div className="about-left" data-aos="fade-right" data-aos-delay="200">
         <p>
  Hi there! I am <span className="highlight">Arun Vishwakarma</span>, a{" "}
  <span className="highlight">self-taught Front-end Developer</span> with around{" "}
  <span className="highlight">1 year of practical experience</span> in building
  responsive and interactive web applications. I love creating clean,
  user-friendly interfaces and enjoy blending design with code to deliver smooth
  user experiences. Apart from coding, I'm passionate about photography, which
  helps me bring creativity and a fresh perspective to my projects.
</p>

          <p>
            If you’d like to collaborate or learn more, feel free to reach out — 
            I’d love to connect!
          </p>

       <ul className="about-list">
  <li>✅ 1 year of hands-on experience with modern Front-end development</li>
  <li>⚡ Skilled in building responsive and user-friendly React applications</li>
  <li>🎨 Passion for clean UI/UX and adding creative design touches</li>
  <li>🤝 Quick learner with strong problem-solving & teamwork skills</li>
</ul>


          {/* Resume Button */}
          <a
            href="https://drive.google.com/file/d/16I23SPqrjpSBeclNW0H3lg_Iq5g82msD/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn shine-effect"
            ref={resumeBtnRef}
            onClick={handleResumeClick}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            📄 Resume
          </a>
        </div>

        {/* Right Side */}
        <div className="about-right" data-aos="fade-left" data-aos-delay="300">
          <div className="fact-card glass-effect" data-aos="zoom-in-up" data-aos-delay="500">
            <h3>Quick Facts</h3>
            <ul>
              <li>📍 Based in Dewas(M.P), India</li>
              <li>📚 Currently pursuing MCA</li>
              <li>💼 Open to Frontend/React opportunities</li>
              <li>🕹️ Hobbies: Gaming, UI Design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
