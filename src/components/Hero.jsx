import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, ShoppingCart, 
  Check, Award, Truck, Eye, Sparkles, MessageCircle, 
  Flame, Star, Sliders, Info, Cpu, Layers, ChevronRight,
  Target, ZapOff, CheckCircle2
} from "lucide-react";
import { PRODUCTS } from "../data/products";

// Four Main Categories for Slide 3 Bento Showcase
const MAIN_CATEGORIES_BENTO = [
  {
    id: "electroterapia",
    title: "Electroterapia & Láser",
    tagline: "Bio-Estímulo Frecuencial Avanzado",
    desc: "Equipos de electroestimulación, láser frío y ultrasonido de penetración tisular profunda.",
    priceStarting: "Desde $3,499 MXN",
    icon: Zap,
    categoryMatch: ["electroterapia", "ultrasonido", "chattanooga"],
    bgGradient: "linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(204,251,241,0.3) 100%)",
    accentColor: "#0d9488"
  },
  {
    id: "fuerza",
    title: "Fuerza & Rehabilitación",
    tagline: "Resistencia Progresiva Clínica",
    desc: "Sistemas antiexplosión, bandas elásticas de tensión graduada y entrenamiento propioceptivo.",
    priceStarting: "Desde $715 MXN",
    icon: Activity,
    categoryMatch: ["fuerza", "equilibrio", "ejercicio", "pesas", "pelota", "bandas"],
    bgGradient: "linear-gradient(135deg, rgba(2,132,199,0.08) 0%, rgba(224,242,254,0.3) 100%)",
    accentColor: "#0284c7"
  },
  {
    id: "muebles",
    title: "Mobiliario & Camillas",
    tagline: "Ergonomía de Alta Carga",
    desc: "Camillas de elevación motorizada, mesas de tracción espinal y sillas ergonómicas.",
    priceStarting: "Desde $18,900 MXN",
    icon: ShieldCheck,
    categoryMatch: ["mesa", "camilla", "baño", "ducha", "mobiliario"],
    bgGradient: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(254,215,170,0.3) 100%)",
    accentColor: "#f97316"
  },
  {
    id: "compresion",
    title: "Compresión & Soportes",
    tagline: "Órtesis & Presoterapia Vasc",
    desc: "Prendas de compresión graduada 20-30 mmHg y sistemas de presoterapia de 6 cámaras.",
    priceStarting: "Desde $890 MXN",
    icon: Award,
    categoryMatch: ["plantilla", "talonera", "soporte", "compresión", "manga", "rodillera"],
    bgGradient: "linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(204,251,241,0.3) 100%)",
    accentColor: "#0d9488"
  }
];

// Interactive Technical Spec Pills for Slide 2
const FLAGSHIP_SPECS = [
  {
    id: "frecuencia",
    title: "Modulación Frecuencial 4000Hz",
    shortDesc: "Ondas interferenciales bio-compatibles",
    fullDetail: "Penetración celular profunda para regeneración muscular acelerada y reducción de inflamación en sesiones de 15 minutos.",
    metricVal: "4,000 Hz",
    metricLabel: "Frecuencia Base Bio-Sync"
  },
  {
    id: "profundidad",
    title: "Profundidad Tisular 6.0 cm",
    shortDesc: "Alcance a tejidos periarticulares",
    fullDetail: "Emisión focalizada que penetra capas dérmicas y adiposas sin disipar calor ni causar molestia al paciente.",
    metricVal: "6.0 cm",
    metricLabel: "Profundidad Efectiva"
  },
  {
    id: "certificacion",
    title: "Certificación CE / FDA Médica",
    shortDesc: "Grado hospitalario internacional",
    fullDetail: "Equipamiento testado en más de 120 clínicas especializadas en México bajo rigurosos protocolos ISO 13485.",
    metricVal: "Grado 1A",
    metricLabel: "Estándar Bio-Médico"
  },
  {
    id: "garantia",
    title: "Garantía & Soporte Bruce 24/7",
    shortDesc: "2 Años de respaldo oficial",
    fullDetail: "Servicio técnico directo, refacciones originales y sustitución express en caso de mantenimiento programado.",
    metricVal: "2 Años",
    metricLabel: "Garantía Total"
  }
];

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal, 
  products = PRODUCTS 
}) {
  const [activeSpecIdx, setActiveSpecIdx] = useState(0);

  // Scroll Jacking Refs
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track horizontal translation (-66.666% across 3 panels)
  const xTrack = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);
  
  // Parallax effects
  const panel1Parallax = useTransform(scrollYProgress, [0, 0.33], ["0%", "30%"]);
  const panel2Scale = useTransform(scrollYProgress, [0.15, 0.33, 0.5], [0.95, 1, 0.95]);
  const panel3Parallax = useTransform(scrollYProgress, [0.33, 1], ["10%", "0%"]);

  const panel1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const activeSpec = FLAGSHIP_SPECS[activeSpecIdx];

  const handleWhatsAppQuote = (productName) => {
    const text = `Hola Bruce Médica, me interesa cotizar información y disponibilidad del equipo: ${productName || 'Equipamiento Bruce Médica'}. ¿Tienen envío disponible a mi clínica?`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section ref={containerRef} className="hero-clean-container">
      <div className="hero-sticky-frame">
        
        {/* Subtle Light Ambient Orbs */}
        <div className="light-orb orb-teal"></div>
        <div className="light-orb orb-cyan"></div>
        <div className="light-grid-pattern"></div>

        {/* Horizontal Track (300vw) */}
        <motion.div 
          className="hero-horizontal-track"
          style={{ x: xTrack }}
        >
          {/* ================= SLIDE 1: MANIFIESTO ÉLITE & GENERATED 3D IMAGE ================= */}
          <div className="hero-panel slide-1">
            <motion.div 
              className="slide-1-grid"
              style={{ x: panel1Parallax, opacity: panel1Opacity }}
            >
              {/* Left Column Text & CTAs */}
              <div className="slide-1-text">
                <div className="chip-pill">
                  <Sparkles size={14} className="text-teal" />
                  <span>Bruce Médica • Fisioterapia de Alta Gama</span>
                </div>

                <h1 className="hero-title-clean">
                  TECNOLOGÍA MÉDICA <br />
                  <span className="gradient-text-teal">& REHABILITACIÓN DE PRECISIÓN</span>
                </h1>

                <p className="hero-subtitle-clean">
                  Equipamiento bio-médico calibrado para clínicas y fisioterapeutas que buscan máxima tasa de recuperación y confort en sus pacientes.
                </p>

                <div className="trust-badges-row">
                  <div className="trust-item">
                    <ShieldCheck size={16} className="text-teal" />
                    <span>2 Años Garantía Oficial</span>
                  </div>
                  <div className="trust-item">
                    <Award size={16} className="text-teal" />
                    <span>FDA / CE Certified</span>
                  </div>
                  <div className="trust-item">
                    <Truck size={16} className="text-teal" />
                    <span>Envío Express a México</span>
                  </div>
                </div>

                <div className="hero-cta-cluster">
                  <button className="btn-primary-dark" onClick={onShopClick}>
                    Explorar Catálogo Completo <ArrowRight size={18} />
                  </button>
                  <button className="btn-whatsapp-light" onClick={() => handleWhatsAppQuote("Equipamiento General")}>
                    <MessageCircle size={18} /> Cotizar WhatsApp
                  </button>
                </div>
              </div>

              {/* Right Column: Custom 3D Generated Device Image Display */}
              <div className="slide-1-visual">
                <div className="image-stage-wrapper glass-clean-card">
                  <img 
                    src="/images/hero_device.png" 
                    alt="Bruce Médica Laser Device 3D Render" 
                    className="hero-3d-device-img" 
                  />
                  <div className="floating-spec-pill spec-top">
                    <Zap size={14} className="text-teal" />
                    <span>Emisión Láser 4,000 Hz</span>
                  </div>
                  <div className="floating-spec-pill spec-bottom">
                    <ShieldCheck size={14} className="text-copper" />
                    <span>Grado Médico A1</span>
                  </div>
                </div>
              </div>

              {/* Scroll Prompt */}
              <div className="scroll-indicator-clean">
                <div className="mouse-clean">
                  <div className="wheel-clean"></div>
                </div>
                <span>Haz scroll para avanzar</span>
              </div>
            </motion.div>
          </div>

          {/* ================= SLIDE 2: FLAGSHIP TECH SPOTLIGHT (NO STICK FIGURE) ================= */}
          <div className="hero-panel slide-2">
            <motion.div 
              className="slide-2-container"
              style={{ scale: panel2Scale }}
            >
              <div className="slide-header text-center">
                <div className="chip-pill inline-flex">
                  <Cpu size={14} className="text-teal" />
                  <span>Ingeniería Bio-Modulada en Detalle</span>
                </div>
                <h2>Especificaciones de Grado Médico Insignia</h2>
              </div>

              <div className="spotlight-grid">
                {/* Left Card: High-Res Equipment Display */}
                <div className="spotlight-display-card glass-clean-card">
                  <div className="display-badge">
                    <span className="live-status-dot"></span>
                    <span>EQUIPO INSIGNIA BRUCE PRO</span>
                  </div>

                  <div className="display-media">
                    <img 
                      src="/images/hero_device.png" 
                      alt="Chattanooga Intelect Device" 
                      className="spotlight-img" 
                    />
                  </div>

                  <div className="display-footer-metrics">
                    <div className="metric-cell">
                      <span className="m-title">{activeSpec.metricLabel}</span>
                      <span className="m-value text-teal">{activeSpec.metricVal}</span>
                    </div>
                    <div className="metric-cell border-l">
                      <span className="m-title">Estado de Respaldo</span>
                      <span className="m-value text-slate">Soporte 24/7 Oficial</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 4 Clean Interactive Technical Spec Pills */}
                <div className="spotlight-specs-column">
                  <div className="specs-list">
                    {FLAGSHIP_SPECS.map((spec, idx) => {
                      const isActive = idx === activeSpecIdx;
                      return (
                        <div 
                          key={spec.id}
                          className={`spec-interactive-pill glass-clean-card ${isActive ? "active" : ""}`}
                          onClick={() => setActiveSpecIdx(idx)}
                        >
                          <div className="pill-header">
                            <CheckCircle2 size={18} className={isActive ? "text-teal" : "text-gray-300"} />
                            <div className="pill-title-box">
                              <h4>{spec.title}</h4>
                              <p>{spec.shortDesc}</p>
                            </div>
                          </div>

                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="pill-expanded-detail"
                            >
                              <p>{spec.fullDetail}</p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= SLIDE 3: BENTO SHOWCASE (ZERO OVERLAPPING COLLISIONS) ================= */}
          <div className="hero-panel slide-3">
            <motion.div 
              className="slide-3-container"
              style={{ x: panel3Parallax }}
            >
              <div className="slide-header text-center">
                <div className="chip-pill inline-flex">
                  <Target size={14} className="text-teal" />
                  <span>Exploración por Especialidad</span>
                </div>
                <h2>Catálogo Bruce Médica por Categoría</h2>
                <p className="subtext">Equipamiento calibrado con disponibilidad inmediata y entrega en todo México.</p>
              </div>

              {/* 4-Column Clean Bento Cards (Spacious, No Overlaps!) */}
              <div className="bento-categories-grid">
                {MAIN_CATEGORIES_BENTO.map((cat) => {
                  const CatIcon = cat.icon;
                  const matchedProd = products.find(p => {
                    const pCat = (p.category || "").toLowerCase();
                    const pName = (p.name || "").toLowerCase();
                    return cat.categoryMatch.some(m => pCat.includes(m) || pName.includes(m));
                  }) || products[0];

                  return (
                    <div 
                      key={cat.id} 
                      className="bento-category-card glass-clean-card"
                      onClick={() => onShopClick && onShopClick()}
                    >
                      <div className="bento-card-top">
                        <div className="bento-icon-box" style={{ color: cat.accentColor, background: `${cat.accentColor}15` }}>
                          <CatIcon size={20} />
                        </div>
                        <span className="starting-price">{cat.priceStarting}</span>
                      </div>

                      <div className="bento-card-img-stage">
                        {matchedProd?.imageSvg ? (
                          <div className="svg-wrapper" dangerouslySetInnerHTML={{ __html: matchedProd.imageSvg }} />
                        ) : (
                          <img src={matchedProd?.image} alt={cat.title} className="bento-prod-img" />
                        )}
                      </div>

                      <div className="bento-card-body">
                        <span className="bento-tagline" style={{ color: cat.accentColor }}>{cat.tagline}</span>
                        <h3>{cat.title}</h3>
                        <p>{cat.desc}</p>
                        
                        <div className="bento-card-footer">
                          <span className="btn-explore-link">
                            Explorar <ChevronRight size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Clean Action Bar */}
              <div className="slide-3-footer-bar">
                <button className="btn-full-catalog-bar" onClick={onShopClick}>
                  Ver Todos los Productos de la Tienda Bruce Médica <ArrowRight size={18} />
                </button>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Styled JSX CSS Rules (ULTRA-CLEAN LIGHT THEME) */}
      <style>{`
        .hero-clean-container {
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

        .light-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }
        .orb-teal { width: 650px; height: 650px; top: -150px; right: -100px; background: rgba(13, 148, 136, 0.08); }
        .orb-cyan { width: 550px; height: 550px; bottom: -150px; left: -100px; background: rgba(6, 182, 212, 0.06); }

        .light-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(15, 23, 42, 0.04) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
          z-index: 0;
          pointer-events: none;
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

        /* SLIDE 1: MANIFIESTO & 3D IMAGE */
        .slide-1-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
          width: 100%;
          max-width: 1240px;
          z-index: 2;
        }

        .slide-1-text { display: flex; flex-direction: column; gap: 1.25rem; }

        .chip-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1.1rem;
          border-radius: 50px;
          background: rgba(13, 148, 136, 0.08);
          border: 1px solid rgba(13, 148, 136, 0.2);
          color: #0d9488;
          font-size: 0.85rem;
          font-weight: 700;
          width: fit-content;
        }

        .hero-title-clean {
          font-family: var(--font-heading);
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #0f172a;
        }

        .gradient-text-teal {
          background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle-clean {
          font-size: 1.1rem;
          line-height: 1.65;
          color: #475569;
          max-width: 580px;
        }

        .trust-badges-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
        }

        .hero-cta-cluster {
          display: flex;
          gap: 1rem;
          align-items: center;
          padding-top: 0.5rem;
        }

        .btn-primary-dark {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.9rem 1.8rem;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.15);
        }

        .btn-primary-dark:hover {
          background: #0d9488;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(13, 148, 136, 0.3);
        }

        .btn-whatsapp-light {
          background: #25d366;
          color: #ffffff;
          border: none;
          padding: 0.9rem 1.6rem;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.2);
        }

        .btn-whatsapp-light:hover {
          background: #20ba5a;
          transform: translateY(-2px);
        }

        .slide-1-visual { display: flex; justify-content: center; }
        .image-stage-wrapper {
          position: relative;
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 440px;
        }

        .hero-3d-device-img {
          width: 100%;
          max-height: 280px;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(15, 23, 42, 0.12));
          transition: transform 0.4s ease;
        }

        .image-stage-wrapper:hover .hero-3d-device-img {
          transform: scale(1.05);
        }

        .floating-spec-pill {
          position: absolute;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.45rem 0.95rem;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }

        .spec-top { top: 1.2rem; right: 1.2rem; }
        .spec-bottom { bottom: 1.2rem; left: 1.2rem; }

        .scroll-indicator-clean {
          position: absolute;
          bottom: -12vh;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .mouse-clean { width: 22px; height: 34px; border: 2px solid #cbd5e1; border-radius: 12px; display: flex; justify-content: center; padding-top: 5px; }
        .wheel-clean { width: 4px; height: 7px; background: #0d9488; border-radius: 2px; animation: scrollWheel 2s infinite; }
        @keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }

        /* SLIDE 2: FLAGSHIP SPOTLIGHT */
        .slide-2-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1150px;
        }

        .slide-header { margin-bottom: 2rem; }
        .slide-header h2 { font-family: var(--font-heading); font-size: 2.3rem; font-weight: 800; color: #0f172a; margin-top: 0.3rem; }
        .slide-header .subtext { font-size: 0.95rem; color: #64748b; margin-top: 0.2rem; }

        .spotlight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          width: 100%;
          align-items: center;
        }

        .spotlight-display-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .display-badge { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; font-weight: 800; color: #0d9488; letter-spacing: 0.05em; }
        .live-status-dot { width: 8px; height: 8px; background: #0d9488; border-radius: 50%; box-shadow: 0 0 10px #0d9488; }

        .display-media {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 18px;
          padding: 1.5rem;
        }

        .spotlight-img { max-height: 180px; object-fit: contain; }

        .display-footer-metrics { display: grid; grid-template-columns: 1fr 1fr; padding-top: 1rem; border-top: 1px solid #f1f5f9; }
        .metric-cell { display: flex; flex-direction: column; gap: 0.2rem; padding: 0 1rem; }
        .metric-cell.border-l { border-left: 1px solid #e2e8f0; }
        .m-title { font-size: 0.75rem; font-weight: 600; color: #94a3b8; }
        .m-value { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; }

        .spotlight-specs-column { display: flex; flex-direction: column; }
        .specs-list { display: flex; flex-direction: column; gap: 1rem; }
        
        .spec-interactive-pill {
          padding: 1.1rem 1.4rem;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid #e2e8f0;
        }

        .spec-interactive-pill:hover, .spec-interactive-pill.active {
          border-color: #0d9488;
          box-shadow: 0 10px 25px -5px rgba(13, 148, 136, 0.12);
        }

        .pill-header { display: flex; align-items: flex-start; gap: 0.85rem; }
        .pill-title-box h4 { font-size: 0.98rem; font-weight: 700; color: #0f172a; margin-bottom: 0.15rem; }
        .pill-title-box p { font-size: 0.8rem; color: #64748b; }

        .pill-expanded-detail { margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px dashed #e2e8f0; font-size: 0.83rem; line-height: 1.5; color: #475569; }

        /* SLIDE 3: BENTO SHOWCASE (SPACIOUS, NO COLLISION!) */
        .slide-3-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1240px;
        }

        .bento-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        .bento-category-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 380px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bento-category-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.15);
          border-color: #0d9488;
        }

        .bento-card-top { display: flex; justify-content: space-between; align-items: center; }
        .bento-icon-box { width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .starting-price { font-size: 0.78rem; font-weight: 800; color: #0f172a; background: #f1f5f9; padding: 0.3rem 0.65rem; border-radius: 50px; }

        .bento-card-img-stage {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 16px;
          padding: 0.75rem;
          margin: 1rem 0;
        }

        .bento-prod-img { max-height: 110px; object-fit: contain; transition: transform 0.3s ease; }
        .bento-category-card:hover .bento-prod-img { transform: scale(1.08); }
        .svg-wrapper { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; }

        .bento-card-body { display: flex; flex-direction: column; gap: 0.3rem; }
        .bento-tagline { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .bento-card-body h3 { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #0f172a; line-height: 1.25; }
        .bento-card-body p { font-size: 0.78rem; color: #64748b; line-height: 1.4; height: 2.8em; overflow: hidden; margin-top: 0.2rem; }

        .bento-card-footer { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; }
        .btn-explore-link { font-size: 0.85rem; font-weight: 700; color: #0d9488; display: inline-flex; align-items: center; gap: 0.3rem; }
        .bento-category-card:hover .btn-explore-link { color: #0f172a; }

        .slide-3-footer-bar { width: 100%; display: flex; justify-content: center; }
        .btn-full-catalog-bar {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.95rem 2.2rem;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
        }

        .btn-full-catalog-bar:hover {
          background: #0d9488;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(13, 148, 136, 0.3);
        }

        .text-teal { color: #0d9488; }
        .text-copper { color: #f97316; }
        .text-slate { color: #0f172a; }

        @media (max-width: 1024px) {
          .slide-1-grid { grid-template-columns: 1fr; }
          .spotlight-grid { grid-template-columns: 1fr; }
          .bento-categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
