import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Users, HardHat, ChevronRight } from "lucide-react";

// Brand information mock database
const BRAND_DETAILS = [
  {
    id: "brand-bruce",
    name: "Bruce Pro",
    tagline: "Equipamiento de Percusión & Electroterapia de Alta Gama",
    desc: "Nuestra línea insignia desarrollada para terapeutas de élite. Dispositivos con calibración milimétrica que ofrecen percusión profunda constante y electroestimulación robusta para clínicas.",
    focus: "Recuperación profunda y estimulación muscular",
    color: "#007EE5",
    bg: "#f0fdfa"
  },
  {
    id: "brand-chattanooga",
    name: "Chattanooga",
    tagline: "Líder Mundial en Agentes Físicos Clínicos",
    desc: "Estándar clínico internacional en electroterapia, ultrasonido y terapia combinada. Equipamiento robusto con librerías de patologías integradas que guían al terapeuta en cada sesión.",
    focus: "Ultrasonido, electroterapia y camillas clínicas",
    color: "#1e40af",
    bg: "#eff6ff"
  },
  {
    id: "brand-hyperice",
    name: "Hyperice",
    tagline: "Tecnología de Recuperación y Vibración Deportiva",
    desc: "Pioneros en terapia de vibración inteligente y compresión neumática. Utilizado por atletas olímpicos y equipos de ligas profesionales en todo el mundo para acelerar el calentamiento y enfriamiento.",
    focus: "Vibración asistida, calor y compresión dinámica",
    color: "#f97316",
    bg: "#fff7ed"
  },
  {
    id: "brand-compex",
    name: "Compex",
    tagline: "Estimulación Muscular Inteligente para Entrenamiento",
    desc: "Líderes en electroestimulación portátil para deportistas y kinesiología activa. Cuenta con tecnología Mi (Muscle Intelligence) que escanea el músculo para dosificar la corriente exacta.",
    focus: "Tono muscular, potenciación muscular y drenaje",
    color: "#ef4444",
    bg: "#fef2f2"
  },
  {
    id: "brand-kinesio",
    name: "Kinesio Tex",
    tagline: "El Vendaje Neuromuscular Original Hipoalergénico",
    desc: "Creadores del vendaje neuromuscular elástico original. Diseñado con adhesivo de ondas que imita la elasticidad de la piel humana, mejorando la circulación linfática y la propiocepción.",
    focus: "Soporte fascial, propiocepción y drenaje linfático",
    color: "#22c55e",
    bg: "#f0fdf4"
  }
];

export default function HomeTrajectory({ onBrandClick }) {
  const [activeBrandIdx, setActiveBrandIdx] = useState(0);
  const activeBrand = BRAND_DETAILS[activeBrandIdx];

  const stats = [
    {
      icon: <Award size={24} className="text-accent" />,
      number: "10+",
      title: "Años en el Mercado",
      desc: "Distribuyendo las marcas líderes de fisioterapia en todo México."
    },
    {
      icon: <Users size={24} className="text-accent" />,
      number: "5,000+",
      title: "Clínicas Equipadas",
      desc: "Desde consultorios privados hasta centros de alto rendimiento deportivo."
    },
    {
      icon: <ShieldCheck size={24} className="text-accent" />,
      number: "24/7",
      title: "Soporte Técnico",
      desc: "Taller certificado para calibraciones periódicas y mantenimiento oficial."
    },
    {
      icon: <HardHat size={24} className="text-accent" />,
      number: "98%",
      title: "Índice de Aprobación",
      desc: "Clientes respaldados por garantías extendidas directas de fábrica."
    }
  ];

  return (
    <section className="trajectory-section container">
      {/* 1. Trajectory editorial highlights */}
      <div className="grid-2 trajectory-intro-grid">
        <div className="trajectory-text-col">
          <span className="section-label">Cobertura y Respaldo</span>
          <h2 className="heading-section">Equipando Clínicas de Mayor Prestigio</h2>
          <p className="lead-p">
            En <strong>Bruce Médica</strong>, no somos solo distribuidores de insumos de fisioterapia; 
            proveemos la base tecnológica que permite a los terapeutas curar con total confianza y rigurosidad científica.
          </p>
          <p>
            Trabajamos bajo estándares internacionales de calidad y ofrecemos servicios de calibración, 
            garantías oficiales y certificaciones con valor curricular para mantener a tu equipo humano a la vanguardia.
          </p>
        </div>

        {/* Dynamic statistics layout */}
        <div className="trajectory-stats-grid">
          {stats.map((stat, idx) => (
            <motion.div 
              whileHover={{ y: -6, boxShadow: "var(--shadow-md)" }}
              key={idx} 
              className="stat-box-card glass"
            >
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <h3 className="stat-number">{stat.number}</h3>
              <h4 className="stat-title">{stat.title}</h4>
              <p className="stat-desc">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Elite Brands Showcase (Interactive Dial-tab) */}
      <div className="brands-showcase-wrapper glass">
        <div className="text-center brands-header-block">
          <span className="section-label text-white-tag" style={{ background: "rgba(15,23,42,0.06)", color: "var(--text-primary)", borderColor: "rgba(15,23,42,0.1)" }}>Alianzas Tecnológicas</span>
          <h3>Respaldados por las Marcas de Mayor Confianza</h3>
          <p>Haz clic en los logotipos para ver la especialidad clínica y cobertura de cada fabricante.</p>
        </div>

        {/* Logo Strip Tabs */}
        <div className="brands-logo-strip">
          {BRAND_DETAILS.map((brand, idx) => {
            const isActive = idx === activeBrandIdx;
            return (
              <button 
                key={brand.id}
                onClick={() => setActiveBrandIdx(idx)}
                className={`brand-tab-logo-btn ${isActive ? "active" : ""}`}
                style={{ 
                  "--brand-active-color": brand.color,
                  borderColor: isActive ? brand.color : "transparent"
                }}
              >
                <span className="brand-logo-txt">{brand.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Brand Information Card (Framer Motion fade slide) */}
        <div className="brands-detail-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBrand.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="brand-spec-card"
              style={{ background: activeBrand.bg }}
            >
              <div className="spec-card-grid grid-2">
                <div className="spec-text-details">
                  <span className="spec-badge" style={{ color: activeBrand.color, borderColor: activeBrand.color }}>
                    Línea Oficial Autorizada
                  </span>
                  <h4>{activeBrand.name}</h4>
                  <h5 className="spec-tagline">{activeBrand.tagline}</h5>
                  <p className="spec-desc">{activeBrand.desc}</p>
                  
                  <div className="spec-focus-block">
                    <strong>Foco Clínico:</strong> {activeBrand.focus}
                  </div>
                </div>

                <div className="spec-action-showcase">
                  <div className="action-visual-box glass">
                    <div className="visual-circle-glow" style={{ background: activeBrand.color }}></div>
                    <Award size={48} style={{ color: activeBrand.color, zIndex: 2 }} />
                    <p className="showcase-caption">Línea oficial importada y calibrada por Bruce Médica en México.</p>
                    <button 
                      className="btn btn-accent btn-view-brand-products"
                      style={{ background: activeBrand.color, borderColor: activeBrand.color }}
                      onClick={() => onBrandClick(activeBrand.name)}
                    >
                      Ver Productos de {activeBrand.name} <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .trajectory-section {
          padding: 6rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 6rem;
          background: var(--bg-primary);
        }

        .trajectory-intro-grid {
          align-items: center;
          gap: 4rem;
        }

        .trajectory-text-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .lead-p {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        /* Stats Grid */
        .trajectory-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .stat-box-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-medium);
        }

        .stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--accent-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Brands interactive showcase */
        .brands-showcase-wrapper {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 32px;
          padding: 3rem;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .brands-header-block {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .brands-header-block p {
          color: var(--text-secondary);
          font-size: 0.92rem;
        }

        /* Logo Strip */
        .brands-logo-strip {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }

        .brand-tab-logo-btn {
          padding: 0.8rem 1.75rem;
          border-radius: 12px;
          border: 2px solid transparent;
          background: var(--bg-secondary);
          transition: all var(--transition-fast);
        }

        .brand-tab-logo-btn:hover {
          background: var(--bg-tertiary);
        }

        .brand-tab-logo-btn.active {
          background: var(--white);
          box-shadow: var(--shadow-sm);
        }

        .brand-logo-txt {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-secondary);
          letter-spacing: -0.02em;
        }

        .brand-tab-logo-btn.active .brand-logo-txt {
          color: var(--brand-active-color);
        }

        /* Brand details card viewport */
        .brands-detail-viewport {
          min-height: 300px;
        }

        .brand-spec-card {
          border-radius: 24px;
          padding: 2.5rem;
          width: 100%;
        }

        .spec-card-grid {
          align-items: center;
          gap: 3rem;
        }

        .spec-text-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .spec-badge {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid;
          padding: 0.15rem 0.6rem;
          border-radius: 4px;
          width: fit-content;
        }

        .spec-text-details h4 {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
        }

        .spec-tagline {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .spec-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .spec-focus-block {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .spec-focus-block strong {
          color: var(--text-primary);
        }

        /* Action Showcase (Right Column) */
        .spec-action-showcase {
          display: flex;
          justify-content: center;
        }

        .action-visual-box {
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .visual-circle-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.08;
          top: -20px;
          right: -20px;
          z-index: 0;
        }

        .showcase-caption {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
          z-index: 1;
        }

        .btn-view-brand-products {
          width: 100%;
          color: var(--white);
          font-size: 0.85rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          z-index: 2;
        }

        .btn-view-brand-products:hover {
          filter: brightness(0.9);
          transform: translateY(-2px);
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .trajectory-section {
            gap: 4rem;
          }
          .spec-card-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .action-visual-box {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .trajectory-stats-grid {
            grid-template-columns: 1fr;
          }
          .brands-showcase-wrapper {
            padding: 1.5rem;
          }
          .brand-spec-card {
            padding: 1.5rem;
          }
          .brand-tab-logo-btn {
            padding: 0.6rem 1.2rem;
          }
          .brand-logo-txt {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
