import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import "../App.css";

export default function Contact() {
  const [toast, setToast] = useState(null); // success / error message store karega

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xjkoqpar", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setToast({ type: "success", message: "✅ Thanks! Your message has been sent." });
      form.reset();
    } else {
      setToast({ type: "error", message: "❌ Oops! Something went wrong. Please try again." });
    }

    // 5 sec baad toast auto-hide
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section id="contact" className="contact-section responsive-contact fade-up">
      <div className="contact-inner">
        {/* LEFT */}
        <header className="contact-left slide-in from-left">
          <h2 className="contact-title">
            Let’s <span className="gradient-text">Connect</span>
          </h2>
          <p className="contact-sub">
            Tell me about your project or just say hi — I read every message.
          </p>

          <div className="contact-info">
            <div className="info-row fade-in delay-200">
              <FiMail className="info-icon pulse" />
              <div>
                <div className="info-label">Email</div>
                <a
                  className="info-link hover-underline"
                  href="mailto:av2337575@gmail.com"
                >
                  av2337575@gmail.com
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* RIGHT / FORM */}
        <form onSubmit={handleSubmit} className="contact-form zoom-in">
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name" className="label">Full name</label>
              <input
                id="name"
                className="input glow-on-focus"
                name="name"
                type="text"
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                className="input glow-on-focus"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="field full">
              <label htmlFor="message" className="label">Message</label>
              <textarea
                id="message"
                className="textarea glow-on-focus"
                name="message"
                placeholder="Tell me about your project…"
                rows={6}
                required
              />
            </div>
          </div>

          <div className="form-actions fade-in delay-400">
            <button type="submit" className="btn-primary shine-effect">
              <FiMail /> <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Toast Notification */}
      {toast && (
        <div
          className={`toast ${toast.type}`}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            background: toast.type === "success" ? "#22c55e" : "#ef4444",
            animation: "slideIn 0.4s ease",
            zIndex: 9999,
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Toast Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </section>
  );
}