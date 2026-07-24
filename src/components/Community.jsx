import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Video, ArrowRight, Award } from "lucide-react";

export default function Community() {
  const [activeFilter, setActiveFilter] = useState("all");

  const communityItems = [
    {
      id: 1,
      type: "article",
      title: "Aplicaciones del láser de alta intensidad en esguinces crónicos",
      description: "Un análisis detallado de los parámetros de longitud de onda óptimos para acelerar la curación en atletas de alto rendimiento.",
      author: "Dra. Elena Martínez",
      date: "Jul 10, 2026",
      readTime: "8 min de lectura",
      icon: <BookOpen size={16} />
    },
    {
      id: 2,
      type: "webinar",
      title: "Webinar: Manejo clínico de la radiofrecuencia selectiva (Cureo)",
      description: "Aprende los protocolos térmicos y atérmicos con casos reales en tendinopatías aquí explicados paso a paso.",
      author: "Lic. Carlos Fuentes",
      date: "Jul 22, 2026",
      readTime: "6:00 PM (CDMX)",
      icon: <Video size={16} />
    },
    {
      id: 3,
      type: "workshop",
      title: "Taller Práctico: Vendajes funcionales y Kinesiología Avanzada",
      description: "Curso presencial con certificación avalada para terapeutas de clínicas asociadas a Bruce Médica.",
      author: "Bruce Academy",
      date: "Ago 15, 2026",
      readTime: "Presencial CDMX",
      icon: <Calendar size={16} />
    },
    {
      id: 4,
      type: "article",
      title: "La importancia de la dosificación de ejercicio activo en el adulto mayor",
      description: "Guía práctica de seguridad clínica utilizando balones y bandas elásticas de tensión progresiva.",
      author: "Mft. Sofía Castro",
      date: "Jun 28, 2026",
      readTime: "12 min de lectura",
      icon: <BookOpen size={16} />
    }
  ];

  const filteredItems = activeFilter === "all" 
    ? communityItems 
    : communityItems.filter(item => item.type === activeFilter);

  return (
    <div className="community-page container">
      {/* Intro */}
      <div className="community-header text-center">
        <span className="section-label">Bruce Community</span>
        <h2 className="display-large">Comunidad Científica</h2>
        <p className="community-sub">Recursos académicos, webinars y artículos clínicos exclusivos para profesionales del movimiento.</p>

        {/* Filter buttons */}
        <div className="community-filters glass">
          <button 
            className={`filter-tab-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Todos
          </button>
          <button 
            className={`filter-tab-btn ${activeFilter === "article" ? "active" : ""}`}
            onClick={() => setActiveFilter("article")}
          >
            Artículos Clínicos
          </button>
          <button 
            className={`filter-tab-btn ${activeFilter === "webinar" ? "active" : ""}`}
            onClick={() => setActiveFilter("webinar")}
          >
            Webinars
          </button>
          <button 
            className={`filter-tab-btn ${activeFilter === "workshop" ? "active" : ""}`}
            onClick={() => setActiveFilter("workshop")}
          >
            Talleres y Cursos
          </button>
        </div>
      </div>

      {/* Grid of posts */}
      <div className="community-grid grid-2">
        {filteredItems.map((item) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={item.id} 
            className="community-card glass"
          >
            <div className="card-top-row">
              <span className={`type-tag ${item.type}`}>
                {item.icon} {item.type.toUpperCase()}
              </span>
              <span className="card-date">{item.date}</span>
            </div>

            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.description}</p>

            <div className="card-footer">
              <div className="author-info">
                <div className="avatar-placeholder">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h5>{item.author}</h5>
                  <span>{item.readTime}</span>
                </div>
              </div>

              <button className="read-more-link">
                Acceder <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Academy CTA Block */}
      <section className="academy-banner glass">
        <div className="academy-content">
          <Award size={44} className="text-accent" />
          <div>
            <h3>Bruce Academy Certification</h3>
            <p>Obtén acreditaciones con valor curricular formal avalado por instituciones de rehabilitación en México.</p>
          </div>
        </div>
        <button className="btn btn-primary">Ver Calendario Acreditaciones</button>
      </section>

      <style>{`
        .community-page {
          padding: 6rem 2rem;
          background: var(--bg-primary);
        }
        
        .community-header {
          margin-bottom: 4.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .community-sub {
          max-width: 600px;
          margin: 1rem auto 2.5rem auto;
          color: var(--text-secondary);
        }
        
        .community-filters {
          display: flex;
          gap: 0.5rem;
          padding: 0.4rem;
          border-radius: 9999px;
          background: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        
        .filter-tab-btn {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.6rem 1.25rem;
          border-radius: 9999px;
          transition: all var(--transition-fast);
        }
        
        .filter-tab-btn.active {
          background: var(--accent-color);
          color: var(--white);
          box-shadow: var(--shadow-sm);
        }
        
        /* Grid */
        .community-grid {
          gap: 2rem;
          margin-bottom: 5rem;
        }
        
        .community-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-medium);
        }
        
        .community-card:hover {
          border-color: var(--accent-light);
          box-shadow: var(--shadow-md);
        }
        
        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .type-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
        }
        
        .type-tag.article { background: #e0f2fe; color: #0369a1; }
        .type-tag.webinar { background: #fee2e2; color: #b91c1c; }
        .type-tag.workshop { background: #e0f2fe; color: #003057; }
        
        .card-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }
        
        .card-title {
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1.25rem;
        }
        
        .author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .avatar-placeholder {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .author-info h5 {
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .author-info span {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          display: block;
        }
        
        .read-more-link {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-color);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color var(--transition-fast);
        }
        
        .read-more-link:hover {
          color: var(--accent-dark);
        }
        
        /* Banner Academy */
        .academy-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.5rem;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.8);
          background: linear-gradient(135deg, rgba(204, 251, 241, 0.4) 0%, rgba(224, 242, 254, 0.4) 100%);
          box-shadow: var(--shadow-sm);
        }
        
        .academy-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .academy-content h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        
        .academy-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 480px;
        }
        
        @media (max-width: 1024px) {
          .academy-banner {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
          .academy-content {
            flex-direction: column;
            gap: 1rem;
          }
          .academy-banner button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
