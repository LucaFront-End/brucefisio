import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, Award, 
  Sparkles, MessageCircle, Eye, Cpu, Scan, X, MoveRight, Layers
} from "lucide-react";
import { PRODUCTS } from "../data/products";

// Therapeutic Objectives for Panel 3 Accordion
const THERAPEUTIC_GOALS = [
  {
    id: "regeneracion",
    title: "Regeneración Celular",
    subtitle: "Acelera la cicatrización celular profunda",
    icon: Zap,
    productIds: ["chattanooga-intelect", "combo-electro-ultrasonido"],
    bgImage: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "dolor",
    title: "Analgesia Clínica",
    subtitle: "Control bio-eléctrico del dolor severo",
    icon: Activity,
    productIds: ["tens-ems-profesional", "laser-terapeutico-alta-potencia"],
    bgImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "rendimiento",
    title: "Alto Rendimiento",
    subtitle: "Fuerza y propiocepción élite",
    icon: Award,
    productIds: ["kit-bandas-resistencia-medica", "pelota-bobath-antiexplosion"],
    bgImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "mobiliario",
    title: "Ergonomía Médica",
    subtitle: "Mobiliario de grado hospitalario",
    icon: ShieldCheck,
    productIds: ["camilla-electrica-3-secciones", "mesa-traccion-espinal"],
    bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  }
];

const MagneticParticleStage = () => {
  const containerRef = useRef(null);
  const particles = Array.from({ length: 144 }); // 12x12 grid

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const children = containerRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      if (el.classList.contains('particle-node')) {
        const elRect = el.getBoundingClientRect();
        // Calculate center of particle relative to container
        const elX = (elRect.left - rect.left) + elRect.width / 2;
        const elY = (elRect.top - rect.top) + elRect.height / 2;
        
        const dx = elX - mouseX;
        const dy = elY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 160; // radius of magnetic repulsion
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const moveX = (dx / dist) * force * 50; 
          const moveY = (dy / dist) * force * 50;
          el.style.transform = `translate(${moveX}px, ${moveY}px) scale(2)`;
          el.style.background = '#0d9488';
          el.style.boxShadow = '0 0 12px rgba(13, 148, 136, 0.8)';
        } else {
          el.style.transform = 'translate(0px, 0px) scale(1)';
          el.style.background = 'rgba(13, 148, 136, 0.15)';
          el.style.boxShadow = 'none';
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const children = containerRef.current.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains('particle-node')) {
        children[i].style.transform = 'translate(0px, 0px) scale(1)';
        children[i].style.background = 'rgba(13, 148, 136, 0.15)';
        children[i].style.boxShadow = 'none';
      }
    }
  };

  return (
    <div 
      className="magnetic-particle-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 12x12 Grid of Particles */}
      {particles.map((_, i) => (
        <motion.div 
          key={i} 
          className="particle-node"
          initial={{ opacity: 0, x: (Math.random() - 0.5) * 1000, y: (Math.random() - 0.5) * 1000, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3, delay: Math.random() * 0.5 }}
        />
      ))}

      {/* Central Device Image */}
      <motion.div 
        className="magnetic-device-wrapper"
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.5 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
      >
        <img src="/images/hero_device.png" alt="Medical Device" className="magnetic-device-img" />
      </motion.div>

      {/* Floating HUD Panels */}
      <motion.div 
        className="hud-panel hud-top-left glass-clean-card"
        initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, type: "spring" }}
        viewport={{ once: false, margin: "-50px" }}
      >
        <span className="hud-val text-teal">4,000 Hz</span>
        <span className="hud-label">Frecuencia Modulada</span>
      </motion.div>

      <motion.div 
        className="hud-panel hud-bottom-right glass-clean-card"
        initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, type: "spring" }}
        viewport={{ once: false, margin: "-50px" }}
      >
        <span className="hud-val">6.0 cm</span>
        <span className="hud-label">Penetración Tisular</span>
      </motion.div>
    </div>
  );
};

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal, 
  products = PRODUCTS 
}) {
  // Accordion State
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Scroll Jacking Refs
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track horizontal translation (-66.666% across 3 panels)
  const xTrack = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);
  
  const handleWhatsAppQuote = (productName) => {
    const text = `Hola Bruce Médica, me interesa cotizar información de: ${productName || 'Equipamiento Bruce Médica'}. ¿Tienen envío disponible?`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section ref={containerRef} className="hero-awwwards-container">
      <div className="hero-sticky-frame">
        
        {/* Horizontal Track (300vw) */}
        <motion.div 
          className="hero-horizontal-track"
          style={{ x: xTrack }}
        >
          {/* ================= SLIDE 1: COLOSSAL IMAGE MASK TYPOGRAPHY ================= */}
          <div className="hero-panel slide-1">
            <div className="slide-1-content">
              {/* Colossal Typography */}
              <div className="colossal-text-wrapper">
                <h1 className="image-masked-title" data-text="TECNOLOGÍA">
                  TECNOLOGÍA
                </h1>
                <h1 className="image-masked-title title-stroke" data-text="CLÍNICA">
                  CLÍNICA
                </h1>
              </div>

              <div className="slide-1-footer">
                <p className="hero-manifesto-sub">
                  Ingeniería biomédica de precisión. Desarrollamos equipamiento con certificaciones internacionales para la vanguardia en fisioterapia.
                </p>
                <button className="btn-primary-dark" onClick={onShopClick}>
                  Descubrir Catálogo <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="scroll-indicator-clean">
              <div className="mouse-clean">
                <div className="wheel-clean"></div>
              </div>
              <span>SCROLL</span>
            </div>
          </div>

          {/* ================= SLIDE 2: MAGNETIC PARTICLE ASSEMBLY ================= */}
          <div className="hero-panel slide-2">
            <div className="slide-2-container">
              <div className="slide-header text-center">
                <div className="chip-pill inline-flex">
                  <Cpu size={14} className="text-teal" />
                  <span>Matriz de Ensamblaje Reactivo</span>
                </div>
                <h2>Arquitectura Bio-Magnética</h2>
                <p className="subtext">Pasa el cursor sobre el campo de partículas para interactuar con la matriz estructural.</p>
              </div>

              {/* Magnetic Particle Stage Component */}
              <div className="magnetic-stage-wrapper">
                <MagneticParticleStage />
              </div>
            </div>
          </div>

          {/* ================= SLIDE 3: HORIZONTAL EXPANDING ACCORDION ================= */}
          <div className="hero-panel slide-3">
            <div className="slide-3-container">
              
              <div className="slide-header absolute-header">
                <h2>Exploración Panorámica</h2>
                <p>Selecciona un objetivo terapéutico para desplegar los equipos asociados.</p>
              </div>

              <div className="accordion-wrapper">
                {THERAPEUTIC_GOALS.map((goal, idx) => {
                  const isActive = activeAccordion === idx;
                  const GoalIcon = goal.icon;
                  
                  // Pick max 2 products for the expanded view
                  const curatedProducts = goal.productIds.map(id => {
                    return products.find(p => p.id === id || (p.name || "").toLowerCase().includes(id.replace(/-/g, ' '))) || products[Math.floor(Math.random() * products.length)];
                  }).filter(Boolean).slice(0, 2);

                  return (
                    <div 
                      key={goal.id}
                      className={`accordion-panel ${isActive ? "active" : ""}`}
                      onMouseEnter={() => setActiveAccordion(idx)}
                      onClick={() => setActiveAccordion(idx)}
                      style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.85)), url(${goal.bgImage})` }}
                    >
                      {/* Collapsed State Title (Vertical) */}
                      <div className="acc-collapsed-content">
                        <GoalIcon size={24} className="acc-icon" />
                        <h3 className="acc-vertical-title">{goal.title}</h3>
                      </div>

                      {/* Expanded State Content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            className="acc-expanded-content"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            <div className="acc-header">
                              <div className="acc-icon-box"><GoalIcon size={28} /></div>
                              <div className="acc-title-group">
                                <h2>{goal.title}</h2>
                                <p>{goal.subtitle}</p>
                              </div>
                            </div>

                            <div className="acc-products-showcase">
                              {curatedProducts.map((prod, pIdx) => (
                                <div key={pIdx} className="acc-product-card glass-clean-card">
                                  <div className="acc-prod-img-box">
                                    {prod.imageSvg ? (
                                      <div className="svg-w" dangerouslySetInnerHTML={{ __html: prod.imageSvg }} />
                                    ) : (
                                      <img src={prod.image} alt={prod.name} />
                                    )}
                                  </div>
                                  <div className="acc-prod-details">
                                    <h4>{prod.name}</h4>
                                    <span className="acc-price">${(prod.price || 999).toLocaleString()} MXN</span>
                                    <button 
                                      className="btn-acc-action"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (onOpenProductModal) onOpenProductModal(prod);
                                      }}
                                    >
                                      Ver Detalles
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <button className="btn-whatsapp-light acc-wa-btn" onClick={(e) => { e.stopPropagation(); handleWhatsAppQuote(`Línea ${goal.title}`); }}>
                              <MessageCircle size={18} /> Cotizar Línea Completa
                            </button>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </motion.div>
      </div>

      {/* Styled JSX CSS Rules (AWWARDS INNOVATION THEME) */}
      <style>{`
        .hero-awwwards-container {
          height: 400vh;
          background: #ffffff;
          position: relative;
          color: #0f172a;
        }

        .hero-sticky-frame {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #ffffff;
        }

        .hero-horizontal-track {
          display: flex;
          height: 100vh;
          width: 300vw;
          will-change: transform;
          z-index: 10;
        }

        .hero-panel {
          width: 100vw;
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 0 4rem;
        }

        .glass-clean-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05);
          border-radius: 24px;
        }

        /* ================= SLIDE 1: COLOSSAL MASKED TYPOGRAPHY ================= */
        .slide-1-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hero-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.4rem;
          border-radius: 50px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0d9488;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .colossal-text-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .image-masked-title {
          font-family: var(--font-heading);
          font-size: clamp(6rem, 15vw, 16rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin: 0;
          padding: 0;
          
          /* The Magic: Image Masking with animation */
          background-image: url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop');
          background-size: 150% auto;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: panImage 20s linear infinite alternate;
        }

        /* The second word as an outline for contrast */
        .title-stroke {
          -webkit-text-stroke: 2px rgba(15, 23, 42, 0.1);
          background-image: url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop');
        }

        @keyframes panImage {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .slide-1-footer {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-manifesto-sub {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #475569;
          max-width: 600px;
          text-align: center;
        }

        .btn-primary-dark {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.95rem 2.2rem;
          border-radius: 50px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-primary-dark:hover {
          background: #0d9488;
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(13, 148, 136, 0.3);
        }

        .scroll-indicator-clean {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .mouse-clean { width: 20px; height: 32px; border: 2px solid #cbd5e1; border-radius: 12px; display: flex; justify-content: center; padding-top: 5px; }
        .wheel-clean { width: 4px; height: 6px; background: #0d9488; border-radius: 2px; animation: scrollWheel 2s infinite; }
        @keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }


        /* ================= SLIDE 2: MAGNETIC PARTICLE ASSEMBLY ================= */
        .slide-2-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1000px;
        }

        .slide-header { margin-bottom: 2.5rem; }
        .chip-pill { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.4rem 1rem; border-radius: 50px; background: rgba(13, 148, 136, 0.08); border: 1px solid rgba(13, 148, 136, 0.2); font-size: 0.82rem; font-weight: 700; color: #0d9488; margin-bottom: 0.5rem; }
        .slide-header h2 { font-family: var(--font-heading); font-size: 2.5rem; font-weight: 900; color: #0f172a; margin-top: 0.3rem; letter-spacing: -0.02em; }
        .slide-header .subtext { font-size: 1rem; color: #64748b; margin-top: 0.2rem; }

        .magnetic-stage-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .magnetic-particle-container {
          position: relative;
          width: clamp(300px, 40vw, 550px);
          aspect-ratio: 1 / 1;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(12, 1fr);
          gap: clamp(6px, 1.2vw, 15px);
          place-items: center;
        }

        .particle-node {
          width: clamp(4px, 0.8vw, 8px);
          height: clamp(4px, 0.8vw, 8px);
          border-radius: 50%;
          background: rgba(13, 148, 136, 0.15);
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.25s, box-shadow 0.25s;
          pointer-events: none; /* Let the container handle mouse events */
        }

        .magnetic-device-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none; /* Crucial so we can hover particles under it */
          z-index: 5;
        }

        .magnetic-device-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(15, 23, 42, 0.2));
          animation: floatSlow 5s ease-in-out infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .hud-panel {
          position: absolute;
          padding: 1.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          pointer-events: none;
          z-index: 10;
        }

        .hud-top-left { top: 10%; left: -25%; }
        .hud-bottom-right { bottom: 10%; right: -25%; }

        .hud-val { font-family: var(--font-heading); font-size: 1.7rem; font-weight: 900; color: #0f172a; }
        .hud-label { font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }

        /* ================= SLIDE 3: HORIZONTAL ACCORDION ================= */
        .slide-3-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .absolute-header {
          position: absolute;
          top: 8vh;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 20;
        }

        .accordion-wrapper {
          display: flex;
          width: 90vw;
          height: 65vh;
          max-width: 1400px;
          gap: 1rem;
          margin-top: 5vh;
        }

        .accordion-panel {
          flex: 1;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          background-size: cover;
          background-position: center;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
        }

        .accordion-panel:hover {
          box-shadow: 0 20px 40px rgba(13, 148, 136, 0.25);
        }

        .accordion-panel.active {
          flex: 5;
          cursor: default;
        }

        /* Collapsed State */
        .acc-collapsed-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          transition: opacity 0.3s;
        }
        
        .accordion-panel.active .acc-collapsed-content { opacity: 0; pointer-events: none; }

        .acc-icon { color: #ffffff; margin-bottom: 2rem; opacity: 0.8; }
        .acc-vertical-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* Expanded State */
        .acc-expanded-content {
          position: absolute;
          inset: 0;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          background: linear-gradient(to right, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 100%);
        }

        .acc-header { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 2.5rem; }
        .acc-icon-box { width: 56px; height: 56px; background: #0d9488; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #ffffff; }
        .acc-title-group h2 { font-family: var(--font-heading); font-size: 2.5rem; font-weight: 900; margin: 0; line-height: 1.1; }
        .acc-title-group p { font-size: 1.1rem; color: #cbd5e1; margin-top: 0.3rem; }

        .acc-products-showcase {
          display: flex;
          gap: 1.5rem;
          height: 100%;
        }

        .acc-product-card {
          flex: 1;
          max-width: 300px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s;
        }

        .acc-product-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .acc-prod-img-box {
          flex: 1;
          background: #ffffff;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .acc-prod-img-box img { max-height: 120px; object-fit: contain; }
        .svg-w { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }

        .acc-prod-details h4 { font-size: 1rem; font-weight: 700; color: #ffffff; margin-bottom: 0.3rem; line-height: 1.3; }
        .acc-price { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: #5eead4; display: block; margin-bottom: 1rem; }

        .btn-acc-action {
          width: 100%;
          background: #ffffff;
          color: #0f172a;
          border: none;
          padding: 0.75rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-acc-action:hover { background: #0d9488; color: #ffffff; }

        .acc-wa-btn {
          margin-top: auto;
          align-self: flex-start;
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .text-teal { color: #0d9488; }

        @media (max-width: 1024px) {
          .image-masked-title { font-size: 4rem; }
          .accordion-wrapper { flex-direction: column; height: 80vh; }
          .accordion-panel { flex-direction: row; }
          .acc-vertical-title { writing-mode: horizontal-tb; transform: none; font-size: 1.2rem; }
          .acc-collapsed-content { flex-direction: row; gap: 1rem; padding: 1rem; }
          .acc-icon { margin-bottom: 0; }
        }
      `}</style>
    </section>
  );
}
