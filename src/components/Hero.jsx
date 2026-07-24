import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, ShoppingCart, 
  Check, Award, Truck, Eye, Sparkles, MessageCircle, 
  Plus, Minus, Sliders, Info, Flame, UserCheck, Star,
  Crosshair, ActivitySquare, ChevronRight, HeartPulse, Target
} from "lucide-react";
import { PRODUCTS } from "../data/products";

// Therapeutic Objectives for Panel 3
const THERAPEUTIC_GOALS = [
  {
    id: "regeneracion",
    title: "Regeneración Tisular",
    subtitle: "Acelera la cicatrización celular y reparación muscular",
    icon: Zap,
    badge: "Electroterapia & Láser",
    color: "#0d9488",
    productIds: ["chattanooga-intelect", "combo-electro-ultrasonido", "ultrasonido-portatil"]
  },
  {
    id: "dolor",
    title: "Control del Dolor",
    subtitle: "Modulación bio-eléctrica y analgesia de alta frecuencia",
    icon: HeartPulse,
    badge: "Analgesia Clínica",
    color: "#0284c7",
    productIds: ["tens-ems-profesional", "laser-terapeutico-alta-potencia", "compresor-frio-calor"]
  },
  {
    id: "rendimiento",
    title: "Alto Rendimiento",
    subtitle: "Fortalecimiento progresivo y propiocepción",
    icon: Activity,
    badge: "Rehabilitación Motora",
    color: "#f97316",
    productIds: ["kit-bandas-resistencia-medica", "pelota-bobath-antiexplosion", "sistema-presoterapia-deportiva"]
  },
  {
    id: "mobiliario",
    title: "Confort & Mobiliario",
    subtitle: "Ergonomía de alta carga para la práctica clínica diaria",
    icon: ShieldCheck,
    badge: "Grado Médico",
    color: "#0d9488",
    productIds: ["camilla-electrica-3-secciones", "mesa-traccion-espinal", "silla-rehabilitacion-ergonomica"]
  }
];

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal, 
  products = PRODUCTS 
}) {
  const [activeGoalIdx, setActiveGoalIdx] = useState(0);
  const [activeTechNode, setActiveTechNode] = useState(0);

  // Scroll Jacking Refs
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track horizontal translation (300vw total, so we move -66.666vw)
  const xTrack = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);
  
  // Parallax elements inside panels
  const panel1Parallax = useTransform(scrollYProgress, [0, 0.33], ["0%", "30%"]);
  const panel2Scale = useTransform(scrollYProgress, [0.15, 0.33, 0.5], [0.9, 1, 0.9]);
  const panel3Parallax = useTransform(scrollYProgress, [0.33, 1], ["15%", "0%"]);

  const panel1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const activeGoal = THERAPEUTIC_GOALS[activeGoalIdx];

  // Selected products for Panel 3
  const curatedProducts = activeGoal.productIds.map(id => {
    return products.find(p => p.id === id || (p.name || "").toLowerCase().includes(id.replace(/-/g, ' '))) || products[Math.floor(Math.random() * products.length)];
  }).filter(Boolean).slice(0, 3);

  const handleWhatsAppQuote = (productName) => {
    const text = `Hola Bruce Médica, me interesa cotizar información y disponibilidad del equipo: ${productName || 'Equipamiento Bruce Médica'}. ¿Me comparten ficha técnica y precio especial para clínica?`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section ref={containerRef} className="hero-cinematic-container-light">
      <div className="hero-sticky-frame-light">
        
        {/* Ambient Light Orbs & Grid */}
        <div className="light-glow glow-teal-light"></div>
        <div className="light-glow glow-cyan-light"></div>
        <div className="light-dot-grid"></div>

        {/* Horizontal Track (300vw) */}
        <motion.div 
          className="hero-horizontal-track"
          style={{ x: xTrack }}
        >
          {/* ================= PANEL 1: EL MANIFIESTO (LIGHT MODE) ================= */}
          <div className="hero-panel panel-1-light">
            <motion.div 
              className="panel-1-content-light"
              style={{ x: panel1Parallax, opacity: panel1Opacity }}
            >
              <div className="manifesto-chip">
                <Sparkles size={14} className="text-teal" />
                <span>Bruce Médica & Fisioterapia Avanzada</span>
              </div>

              <h1 className="manifesto-title">
                INGENIERÍA CLÍNICA <br />
                <span className="gradient-teal-text">& REHABILITACIÓN DE PRECISIÓN</span>
              </h1>

              <p className="manifesto-desc">
                Desarrollamos y distribuimos equipamiento bio-médico calibrado para especialistas que exigen el máximo rendimiento y recuperación en sus pacientes.
              </p>

              {/* Floating Badges */}
              <div className="manifesto-badges-row">
                <div className="m-badge">
                  <ShieldCheck size={16} className="text-teal" />
                  <span>2 Años Garantía Oficial</span>
                </div>
                <div className="m-badge">
                  <Award size={16} className="text-teal" />
                  <span>Certificación CE / FDA</span>
                </div>
                <div className="m-badge">
                  <Truck size={16} className="text-teal" />
                  <span>Envío Express a Todo México</span>
                </div>
              </div>

              {/* Scroll prompt */}
              <div className="scroll-prompt-light">
                <div className="mouse-light">
                  <div className="wheel-light"></div>
                </div>
                <span>Desliza para explorar el ecosistema</span>
              </div>
            </motion.div>
          </div>

          {/* ================= PANEL 2: MOTOR DE DIAGNÓSTICO (LIGHT LAB) ================= */}
          <div className="hero-panel panel-2-light">
            <motion.div 
              className="panel-2-content-light"
              style={{ scale: panel2Scale }}
            >
              <div className="lab-header">
                <span className="lab-tag">TECNOLOGÍA BIO-MODULADA</span>
                <h2>Mapa Tecnológico de Grado Médico</h2>
              </div>

              <div className="lab-scanner-stage">
                {/* Central Interactive Wave Monitor */}
                <div className="wave-monitor-card glass-white-card">
                  <div className="wave-card-top">
                    <span className="live-dot"></span>
                    <span>Monitor Frecuencial Bio-Estímulo</span>
                  </div>

                  <div className="waveform-display">
                    <svg className="wave-svg" viewBox="0 0 500 100">
                      <path 
                        d="M0 50 Q 50 20, 100 50 T 200 50 T 300 10 T 400 90 T 500 50" 
                        fill="none" 
                        stroke="#0d9488" 
                        strokeWidth="3"
                        className="pulse-wave-path"
                      />
                    </svg>
                  </div>

                  <div className="wave-metrics-grid">
                    <div className="metric-box">
                      <span className="m-label">Frecuencia Base</span>
                      <span className="m-val text-teal">4,000 Hz</span>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">Profundidad Tisular</span>
                      <span className="m-val text-slate">4.5 cm</span>
                    </div>
                    <div className="metric-box">
                      <span className="m-label">Modulación</span>
                      <span className="m-val text-copper">Bio-Sync 3D</span>
                    </div>
                  </div>
                </div>

                {/* Tech Nodes Selector */}
                <div className="tech-nodes-column">
                  {[
                    { title: "Electro-Estímulo Interferencial", desc: "Ondas bio-eléctricas de penetración profunda" },
                    { title: "Láser Terapéutico Frío", desc: "Fotonización para bio-estimulación celular" },
                    { title: "Ondas de Choque Radiales", desc: "Disolución de calcificaciones y dolor crónico" },
                    { title: "Presoterapia Neumática", desc: "Drenaje linfático y recuperación acelerada" }
                  ].map((node, idx) => (
                    <div 
                      key={idx}
                      className={`tech-node-item glass-white-card ${activeTechNode === idx ? "active" : ""}`}
                      onClick={() => setActiveTechNode(idx)}
                    >
                      <div className="node-icon-box">
                        <Zap size={18} />
                      </div>
                      <div className="node-info">
                        <h4>{node.title}</h4>
                        <p>{node.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= PANEL 3: SELECCIÓN POR OBJETIVO TERAPÉUTICO (NUEVO ENFOQUE) ================= */}
          <div className="hero-panel panel-3-light">
            <motion.div 
              className="panel-3-content-light"
              style={{ x: panel3Parallax }}
            >
              <div className="panel3-header">
                <div className="section-pill-light">
                  <Target size={14} className="text-teal" />
                  <span>Selección por Resultado Clínico</span>
                </div>
                <h2>¿Qué objetivo terapéutico buscas en tu clínica?</h2>
              </div>

              {/* Goal Selector Tabs */}
              <div className="goal-selector-pills">
                {THERAPEUTIC_GOALS.map((goal, idx) => {
                  const GoalIcon = goal.icon;
                  const isActive = idx === activeGoalIdx;
                  return (
                    <button
                      key={goal.id}
                      className={`goal-pill-btn ${isActive ? "active" : ""}`}
                      onClick={() => setActiveGoalIdx(idx)}
                    >
                      <GoalIcon size={16} />
                      <span>{goal.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Curated 3-Card Deck */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeGoal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="goal-curated-deck"
                >
                  {curatedProducts.map((product, pIdx) => (
                    <div key={pIdx} className="curated-device-card glass-white-card">
                      <div className="card-top-tag">
                        <span className="badge-teal">{activeGoal.badge}</span>
                        <span className="stock-pill"><Flame size={12} className="text-copper" /> En Stock</span>
                      </div>

                      <div className="card-image-box">
                        {product.imageSvg ? (
                          <div className="svg-container" dangerouslySetInnerHTML={{ __html: product.imageSvg }} />
                        ) : (
                          <img src={product.image} alt={product.name} className="product-img" />
                        )}
                      </div>

                      <div className="card-body-box">
                        <h3>{product.name}</h3>
                        <p className="product-desc">{product.description || activeGoal.subtitle}</p>
                        
                        <div className="price-cta-row">
                          <div className="price-box">
                            <span className="p-amount">${(product.price || 3499).toLocaleString()} MXN</span>
                            <span className="p-tax">IVA Incluido</span>
                          </div>

                          <div className="btn-group">
                            <button 
                              className="btn-icon-inspect"
                              onClick={() => onOpenProductModal && onOpenProductModal(product)}
                              title="Ver ficha técnica completa"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="btn-quote-whatsapp"
                              onClick={() => handleWhatsAppQuote(product.name)}
                            >
                              <MessageCircle size={16} /> Cotizar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Action Footer */}
              <div className="panel3-footer">
                <button className="btn-full-shop-light" onClick={onShopClick}>
                  Explorar Todo el Catálogo Bruce Médica <ArrowRight size={18} />
                </button>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Styled JSX CSS Rules (LIGHT THEME X1000) */}
      <style>{`
        .hero-cinematic-container-light {
          height: 400vh;
          background: #ffffff;
          position: relative;
          color: #0f172a;
        }

        .hero-sticky-frame-light {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #ffffff;
        }

        /* Ambient Light Glow Orbs */
        .light-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }
        .glow-teal-light { width: 650px; height: 650px; top: -150px; right: -100px; background: rgba(13, 148, 136, 0.08); }
        .glow-cyan-light { width: 550px; height: 550px; bottom: -150px; left: -100px; background: rgba(6, 182, 212, 0.06); }

        .light-dot-grid {
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

        /* Common Glass Card for Light Theme */
        .glass-white-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05);
          border-radius: 24px;
        }

        /* PANEL 1: MANIFIESTO */
        .panel-1-content-light {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 900px;
          z-index: 2;
        }

        .manifesto-chip {
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
          margin-bottom: 1.5rem;
        }

        .manifesto-title {
          font-family: var(--font-heading);
          font-size: 3.8rem;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .gradient-teal-text {
          background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .manifesto-desc {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #475569;
          max-width: 720px;
          margin-bottom: 2.5rem;
        }

        .manifesto-badges-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .m-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.6rem 1.1rem;
          border-radius: 50px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .scroll-prompt-light {
          position: absolute;
          bottom: -15vh;
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

        .mouse-light { width: 22px; height: 34px; border: 2px solid #cbd5e1; border-radius: 12px; display: flex; justify-content: center; padding-top: 5px; }
        .wheel-light { width: 4px; height: 7px; background: #0d9488; border-radius: 2px; animation: scrollWheel 2s infinite; }
        @keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }

        /* PANEL 2: LAB HUD */
        .panel-2-content-light {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1100px;
        }

        .lab-header { text-align: center; margin-bottom: 2.5rem; }
        .lab-tag { font-size: 0.82rem; font-weight: 800; color: #0d9488; letter-spacing: 0.1em; text-transform: uppercase; }
        .lab-header h2 { font-family: var(--font-heading); font-size: 2.4rem; font-weight: 800; color: #0f172a; }

        .lab-scanner-stage {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          width: 100%;
          align-items: center;
        }

        .wave-monitor-card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .wave-card-top { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; font-weight: 700; color: #475569; }
        .live-dot { width: 8px; height: 8px; background: #0d9488; border-radius: 50%; box-shadow: 0 0 10px #0d9488; }

        .waveform-display { background: #f8fafc; border-radius: 16px; padding: 1.5rem 1rem; border: 1px solid #e2e8f0; }
        .pulse-wave-path { animation: waveDash 3s linear infinite; }

        .wave-metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center; }
        .metric-box { display: flex; flex-direction: column; gap: 0.2rem; background: #ffffff; padding: 0.75rem; border-radius: 12px; border: 1px solid #f1f5f9; }
        .m-label { font-size: 0.72rem; font-weight: 600; color: #94a3b8; }
        .m-val { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; }

        .tech-nodes-column { display: flex; flex-direction: column; gap: 0.9rem; }
        .tech-node-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.1rem 1.35rem;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid #e2e8f0;
        }
        .tech-node-item:hover, .tech-node-item.active {
          border-color: #0d9488;
          box-shadow: 0 10px 25px -5px rgba(13, 148, 136, 0.15);
          transform: translateX(6px);
        }
        .node-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(13, 148, 136, 0.1);
          color: #0d9488;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .node-info h4 { font-size: 0.98rem; font-weight: 700; color: #0f172a; margin-bottom: 0.15rem; }
        .node-info p { font-size: 0.8rem; color: #64748b; }

        /* PANEL 3: NEW APPROACH - THERAPEUTIC OBJECTIVES */
        .panel-3-content-light {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        .panel3-header { text-align: center; margin-bottom: 1.75rem; }
        .section-pill-light { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.4rem 1rem; border-radius: 50px; background: rgba(13, 148, 136, 0.08); border: 1px solid rgba(13, 148, 136, 0.2); font-size: 0.82rem; font-weight: 700; color: #0d9488; margin-bottom: 0.5rem; }
        .panel3-header h2 { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: #0f172a; }

        .goal-selector-pills { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem; }
        .goal-pill-btn {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 1.35rem;
          border-radius: 50px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .goal-pill-btn:hover { border-color: #0d9488; color: #0d9488; }
        .goal-pill-btn.active { background: #0d9488; color: #ffffff; border-color: #0d9488; box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3); }

        .goal-curated-deck {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          width: 100%;
          margin-bottom: 2rem;
        }

        .curated-device-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }
        .curated-device-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.15);
          border-color: #0d9488;
        }

        .card-top-tag { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem; }
        .badge-teal { background: rgba(13, 148, 136, 0.1); color: #0d9488; padding: 0.25rem 0.65rem; border-radius: 50px; }
        .stock-pill { display: flex; align-items: center; gap: 0.3rem; color: #64748b; }

        .card-image-box {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          background: #f8fafc;
          border-radius: 16px;
          padding: 1rem;
        }
        .product-img { max-height: 130px; object-fit: contain; }
        .svg-container { width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }

        .card-body-box h3 { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.4rem; line-height: 1.3; }
        .product-desc { font-size: 0.8rem; color: #64748b; line-height: 1.4; margin-bottom: 1.25rem; height: 2.4em; overflow: hidden; }

        .price-cta-row { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #f1f5f9; }
        .p-amount { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; color: #0f172a; display: block; }
        .p-tax { font-size: 0.68rem; color: #94a3b8; }

        .btn-group { display: flex; gap: 0.4rem; }
        .btn-icon-inspect { width: 36px; height: 36px; border-radius: 10px; background: #f1f5f9; border: 1px solid #e2e8f0; color: #334155; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .btn-icon-inspect:hover { background: #ffffff; border-color: #0d9488; color: #0d9488; }

        .btn-quote-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          border-radius: 10px;
          background: #25d366;
          color: #ffffff;
          border: none;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-quote-whatsapp:hover { background: #20ba5a; transform: translateY(-1px); }

        .panel3-footer { margin-top: 0.5rem; }
        .btn-full-shop-light {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 2rem;
          border-radius: 14px;
          background: #0f172a;
          color: #ffffff;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
        }
        .btn-full-shop-light:hover { background: #0d9488; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(13, 148, 136, 0.3); }

        .text-teal { color: #0d9488; }
        .text-copper { color: #f97316; }
        .text-slate { color: #334155; }

        @media (max-width: 1024px) {
          .manifesto-title { font-size: 2.5rem; }
          .lab-scanner-stage { grid-template-columns: 1fr; }
          .goal-curated-deck { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
