import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, HeartHandshake, Eye } from "lucide-react";

export default function AboutUs() {
  const stats = [
    { number: "10+", label: "Años en el Mercado" },
    { number: "5K+", label: "Clínicas Equipadas" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "24/7", label: "Soporte Técnico Especializado" }
  ];

  const values = [
    { 
      icon: <Award className="value-icon text-accent" size={24} />, 
      title: "Excelencia Médica", 
      desc: "Distribuyendo equipos con aprobaciones de calidad y certificaciones internacionales." 
    },
    { 
      icon: <Compass className="value-icon text-accent" size={24} />, 
      title: "Innovación Tecnológica", 
      desc: "Buscando constantemente tecnologías avanzadas que redefinan el tratamiento y acorten plazos de curación." 
    },
    { 
      icon: <HeartHandshake className="value-icon text-accent" size={24} />, 
      title: "Compromiso de Rehabilitación", 
      desc: "Acompañamos a los profesionales de la salud con capacitación continua y soporte preventivo." 
    },
    { 
      icon: <Eye className="value-icon text-accent" size={24} />, 
      title: "Transparencia Absoluta", 
      desc: "Ofreciendo cotizaciones justas, envíos rápidos y políticas claras de garantía." 
    }
  ];

  return (
    <div className="about-page container">
      {/* Intro Narrative */}
      <section className="grid-2 intro-section">
        <div className="intro-text">
          <span className="section-label">Nosotros</span>
          <h2 className="heading-section">Líderes en Equipamiento de Fisioterapia</h2>
          <p className="intro-lead">
            Bruce Médica nace de la necesidad de acercar a México la tecnología más avanzada 
            en fisioterapia y medicina del deporte. Nos esforzamos por proveer a clínicas 
            y terapeutas con insumos de alta gama que eleven el estándar de cuidado médico.
          </p>
          <p>
            No vendemos únicamente insumos médicos; proporcionamos la base científica y la estabilidad 
            técnica que los profesionales requieren para ejercer su labor con absoluta confianza. Desde 
            equipos portátiles de percusión hasta complejos sistemas láser multi-longitud de onda, 
            garantizamos la máxima calidad en cada uno de nuestros procesos.
          </p>
        </div>
        
        <div className="intro-visual-panel">
          <div className="about-visual-canvas">
            <div className="canvas-circle-1"></div>
            <div className="canvas-circle-2"></div>
            <div className="visual-statement glass">
              <span className="quote-mark">“</span>
              <p>Facilitar el movimiento, acortar el dolor y maximizar la recuperación humana a través de la ciencia aplicada.</p>
              <span className="quote-author">— Bruce Médica</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-section grid-4">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="stat-card glass"
          >
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Values Grid */}
      <section className="values-section">
        <div className="text-center section-title-block">
          <h3 className="heading-section inline-block">Nuestros Valores Fundamentales</h3>
          <p className="values-sub">Los pilares sobre los que construimos relaciones comerciales y clínicas a largo plazo.</p>
        </div>

        <div className="grid-2 values-grid">
          {values.map((val, idx) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={idx} 
              className="value-card glass"
            >
              <div className="value-header">
                {val.icon}
                <h4>{val.title}</h4>
              </div>
              <p>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .about-page {
          padding: 6rem 2rem;
          background: var(--bg-primary);
        }
        
        .intro-section {
          margin-bottom: 6rem;
        }
        
        .intro-lead {
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        
        .intro-text p {
          margin-bottom: 1rem;
        }
        
        /* Intro visual */
        .intro-visual-panel {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .about-visual-canvas {
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .canvas-circle-1 {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-light) 0%, transparent 100%);
          top: 0;
          left: 0;
        }
        
        .canvas-circle-2 {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--secondary-light) 0%, transparent 100%);
          bottom: 0;
          right: 0;
        }
        
        .visual-statement {
          position: relative;
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: var(--shadow-lg);
          max-width: 320px;
          background: rgba(255,255,255,0.8);
        }
        
        .quote-mark {
          font-family: var(--font-heading);
          font-size: 4rem;
          color: var(--accent-color);
          line-height: 0.1;
          display: block;
          margin-bottom: 1rem;
        }
        
        .visual-statement p {
          font-size: 1.05rem;
          font-weight: 500;
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.5;
        }
        
        .quote-author {
          display: block;
          margin-top: 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        
        /* Stats */
        .stats-section {
          margin-bottom: 6rem;
        }
        
        .stat-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        
        .stat-card h3 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent-color);
          margin-bottom: 0.5rem;
        }
        
        .stat-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        
        /* Values */
        .section-title-block {
          margin-bottom: 3.5rem;
        }
        
        .inline-block {
          display: inline-block;
        }
        
        .values-sub {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        
        .values-grid {
          gap: 2rem;
        }
        
        .value-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-medium);
        }
        
        .value-card:hover {
          border-color: var(--accent-light);
          box-shadow: var(--shadow-md);
        }
        
        .value-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .value-icon {
          padding: 0.25rem;
        }
        
        .value-card h4 {
          font-size: 1.15rem;
          font-weight: 700;
        }
        
        .value-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
