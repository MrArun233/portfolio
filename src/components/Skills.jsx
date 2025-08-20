import React from "react";
import { FaReact, FaGitAlt, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss, SiVite, SiC, SiCplusplus } from "react-icons/si";
import "../App.css";

const SKILLS = [
  { name: "C", icon: <SiC />, level: 70, color: "#5c6bc0" },
  { name: "C++", icon: <SiCplusplus />, level: 75, color: "#004482" },
  { name: "React", icon: <FaReact />, level: 80, color: "#61dafb" },
  { name: "JavaScript", icon: <SiJavascript />, level: 60, color: "#facc15" },
  { name: "TailwindCSS", icon: <SiTailwindcss />, level: 80, color: "#38bdf8" },

];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">
        Core <span className="gradient-text">Skills</span>
      </h2>

      <div className="skills-grid">
        {SKILLS.map((s) => (
          <div key={s.name} className="skill-card zoom-in">
            <div className="circle" style={{ background: `conic-gradient(${s.color} ${s.level}%, #1e293b ${s.level}%)` }}>
              <div className="circle-inner">{s.level}%</div>
            </div>
            <div className="skill-icon" style={{ color: s.color }}>
              {s.icon}
            </div>
            <h3 className="skill-name">{s.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}