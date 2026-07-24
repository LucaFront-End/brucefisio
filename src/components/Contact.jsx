import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-page container">
      <div className="contact-grid grid-2">
        {/* Left: Contact Info & Map placeholder */}
        <div className="contact-info-col">
          <span className="section-label">Contacto</span>
          <h2 className="heading-section">Estamos para ayudarte</h2>
          <p className="contact-lead">
            ¿Tienes dudas técnicas sobre algún equipo de Alta Especialidad? 
            ¿Necesitas asesoría técnica para tu clínica? Escríbenos o contáctanos.
          </p>

          <div className="info-cards-list">
            <div className="info-item-card glass">
              <MapPin className="text-accent shrink-0" size={20} />
              <div>
                <h5>Dirección Principal</h5>
                <p>Av. Insurgentes Sur 1450, Col. Actipan, Benito Juárez, CDMX, México</p>
              </div>
            </div>

            <div className="info-item-card glass">
              <Phone className="text-accent shrink-0" size={20} />
              <div>
                <h5>Líneas de Atención</h5>
                <p>+52 (55) 8765 4321 / +52 (55) 1234 5678</p>
              </div>
            </div>

            <div className="info-item-card glass">
              <Mail className="text-accent shrink-0" size={20} />
              <div>
                <h5>Correos Electrónicos</h5>
                <p>ventas@brucemedica.com.mx / contacto@brucemedica.com.mx</p>
              </div>
            </div>

            <div className="info-item-card glass">
              <Clock className="text-accent shrink-0" size={20} />
              <div>
                <h5>Horarios de Atención</h5>
                <p>Lunes a Viernes: 9:00 AM - 6:00 PM <br /> Sábados: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="map-wrapper glass">
            <div className="map-glow"></div>
            <div className="map-placeholder-dots">
              <div className="dot pulse-dot"></div>
              <span className="dot-label">Corporativo Bruce Médica</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-col">
          <div className="form-container glass">
            <h3>Envíanos un mensaje</h3>
            <p className="form-subtitle">Te responderemos en un plazo menor a 24 horas hábiles.</p>
            
            <form onSubmit={handleSubmit} className="actual-form">
              <div className="input-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Ej. Dr. Alejandro Ruiz"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="subject">Asunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Ej. Cotización de Láser Chelt"
                />
              </div>

              <div className="input-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Escribe aquí tu consulta o requerimiento detallado..."
                  required
                ></textarea>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="form-success-alert"
                  >
                    <CheckCircle size={20} />
                    <span>¡Mensaje enviado! Nos contactaremos pronto.</span>
                  </motion.div>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className={`btn btn-primary btn-submit-form ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner"></span>
                    ) : (
                      <>
                        Enviar Mensaje <Send size={16} />
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page {
          padding: 6rem 2rem;
          background: var(--bg-primary);
        }
        
        .contact-lead {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }
        
        .info-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .info-item-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        
        .info-item-card h5 {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        
        .info-item-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        
        .shrink-0 {
          flex-shrink: 0;
        }
        
        /* Map widget styling */
        .map-wrapper {
          width: 100%;
          height: 220px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          background-image: radial-gradient(var(--text-tertiary) 1px, transparent 1px);
          background-size: 20px 20px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .map-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%);
          top: 30%;
          left: 40%;
          pointer-events: none;
        }
        
        .map-placeholder-dots {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
        }
        
        .dot {
          width: 14px;
          height: 14px;
          background: var(--accent-color);
          border-radius: 50%;
        }
        
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        
        .dot-label {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          background: var(--text-primary);
          color: var(--white);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
        }
        
        /* Form column styles */
        .form-container {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
        }
        
        .form-container h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .form-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .actual-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .input-group label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .input-group input, .input-group textarea {
          font-family: var(--font-body);
          padding: 0.85rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          outline: none;
          font-size: 0.9rem;
          color: var(--text-primary);
          background: var(--bg-primary);
          transition: all var(--transition-fast);
        }
        
        .input-group input:focus, .input-group textarea:focus {
          border-color: var(--accent-color);
          background: var(--white);
          box-shadow: 0 4px 12px rgba(0, 126, 229, 0.05);
        }
        
        .btn-submit-form {
          width: 100%;
          padding: 0.95rem;
          font-size: 0.95rem;
          border-radius: 10px;
          position: relative;
        }
        
        .form-success-alert {
          background: #dcfce7;
          color: #15803d;
          border-radius: 10px;
          padding: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: var(--white);
          border-radius: 50%;
          animation: spin-loader 0.8s linear infinite;
          display: inline-block;
        }
        
        @keyframes spin-loader {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
