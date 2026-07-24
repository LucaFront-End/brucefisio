import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, ShoppingCart, 
  Check, Award, Truck, Eye, Sparkles, MessageCircle, 
  Flame, Star, Crosshair, HeartPulse, Target, MoveUpRight,
  Maximize2, ActivitySquare, Radio
} from "lucide-react";
import { PRODUCTS } from "../data/products";

// Anatomical Hotspots for Panel 2 Scanner
const SCANNER_NODES = [
  {
    id: "hombro",
    title: "Manguito Rotador / Hombro",
    x: 35,
    y: 28,
    tech: "Láser Frío Bio-Estimulante 4000Hz",
    frequency: "4,200 Hz",
    depth: "3.5 cm",
    recommendation: "Chattanooga Intelect Laser / Electroterapia"
  },
  {
    id: "lumbar",
    title: "Columna Lumbar & Sacro",
    x: 50,
    y: 52,
    tech: "Descompresión & Tracción Espinal",
    frequency: "Tracción Motorizada 45kg",
    depth: "6.0 cm",
    recommendation: "Mesa de Tracción Espinal Electrónica"
  },
  {
    id: "rodilla",
    title: "Rodilla & Ligamentos",
    x: 62,
    y: 75,
    tech: "Ondas de Choque Radiales Focales",
    frequency: "15 Hz / 3.0 Bar",
    depth: "4.0 cm",
    recommendation: "Equipo Ondas de Choque Médicas"
  },
  {
    id: "muscular",
    title: "Presoterapia & Retorno Venoso",
    x: 42,
    y: 82,
    tech: "Compresión Neumática Graduada",
    frequency: "20 - 120 mmHg",
    depth: "Superficial / Vascular",
    recommendation: "Botas de Presoterapia Clínica 6 Cámaras"
  }
];

// Therapeutic Objectives for Panel 3
const THERAPEUTIC_GOALS = [
  {
    id: "regeneracion",
    title: "Regeneración Tisular",
    subtitle: "Acelera la cicatrización celular y reparación muscular profunda",
    icon: Zap,
    badge: "Electroterapia & Láser",
    productIds: ["chattanooga-intelect", "combo-electro-ultrasonido", "ultrasonido-portatil"]
  },
  {
    id: "dolor",
    title: "Control del Dolor",
    subtitle: "Modulación bio-eléctrica y analgesia clínica de alta frecuencia",
    icon: HeartPulse,
    badge: "Analgesia Frecuencial",
    productIds: ["tens-ems-profesional", "laser-terapeutico-alta-potencia", "compresor-frio-calor"]
  },
  {
    id: "rendimiento",
    title: "Alto Rendimiento",
    subtitle: "Fortalecimiento neuromuscular progresivo y propiocepción",
    icon: Activity,
    badge: "Rehabilitación Motora",
    productIds: ["kit-bandas-resistencia-medica", "pelota-bobath-antiexplosion", "sistema-presoterapia-deportiva"]
  },
  {
    id: "mobiliario",
    title: "Confort & Mobiliario",
    subtitle: "Ergonomía de alta carga para la práctica clínica profesional",
    icon: ShieldCheck,
    badge: "Grado Médico CE/FDA",
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
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [activeGoalIdx, setActiveGoalIdx] = useState(0);
  const [focusedCardIdx, setFocusedCardIdx] = useState(1); // 0, 1, 2 for 3D stack

  // Scroll Jacking Refs
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track horizontal translation (-66.666% across 3 panels)
  const xTrack = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);
  
  // Parallax effects
  const panel1Parallax = useTransform(scrollYProgress, [0, 0.33], ["0%", "35%"]);
  const panel2Scale = useTransform(scrollYProgress, [0.15, 0.33, 0.5], [0.92, 1, 0.92]);
  const panel3Parallax = useTransform(scrollYProgress, [0.33, 1], ["15%", "0%"]);

  const panel1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const activeNode = SCANNER_NODES[activeNodeIdx];
  const activeGoal = THERAPEUTIC_GOALS[activeGoalIdx];

  // Selected products for Panel 3
  const curatedProducts = activeGoal.productIds.map(id => {
    return products.find(p => p.id === id || (p.name || "").toLowerCase().includes(id.replace(/-/g, ' '))) || products[Math.floor(Math.random() * products.length)];
  }).filter(Boolean).slice(0, 3);

  const handleWhatsAppQuote = (productName) => {
    const text = `Hola Bruce Médica, me interesa cotizar información del equipo: ${productName || 'Equipamiento Bruce Médica'}. ¿Tienen disponibilidad y envío a mi clínica?`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section ref={containerRef} className="hero-awwwards-container">
      <div className="hero-sticky-frame">
        
        {/* Ambient Light Orbs & Grid */}
        <div className="light-glow glow-teal"></div>
        <div className="light-glow glow-cyan"></div>
        <div className="light-dot-grid"></div>

        {/* Horizontal Track (300vw) */}
        <motion.div 
          className="hero-horizontal-track"
          style={{ x: xTrack }}
        >
          {/* ================= PANEL 1: IMAGE MASK TYPOGRAPHY ================= */}
          <div className="hero-panel panel-1">
            <motion.div 
              className="panel-1-content"
              style={{ x: panel1Parallax, opacity: panel1Opacity }}
            >
              <div className="hero-top-badge">
                <Sparkles size={14} className="text-teal" />
                <span>Bruce Médica & Equipamiento Clínico</span>
              </div>

              {/* Masked Typography Image */}
              <h1 className="image-masked-title">
                TECNOLOGÍA<br/>CLÍNICA
              </h1>

              <p className="hero-manifesto-sub">
                Desarrollamos y distribuimos equipamiento bio-médico de alta precisión calibrado para profesionales de la fisioterapia.
              </p>

              {/* Floating Badges */}
              <div className="hero-badges-cluster">
                <div className="h-badge">
                  <ShieldCheck size={16} className="text-teal" />
                  <span>2 Años Garantía</span>
                </div>
                <div className="h-badge">
                  <Award size={16} className="text-teal" />
                  <span>Certificación CE / FDA</span>
                </div>
                <div className="h-badge">
                  <Truck size={16} className="text-teal" />
                  <span>Envío Express México</span>
                </div>
              </div>

              {/* Scroll Prompt */}
              <div className="scroll-indicator-box">
                <div className="mouse-icon">
                  <div className="wheel-dot"></div>
                </div>
                <span>Haz scroll para iniciar escáner</span>
              </div>
            </motion.div>
          </div>

          {/* ================= PANEL 2: INTERACTIVE LASER SCANNER HUD ================= */}
          <div className="hero-panel panel-2">
            <motion.div 
              className="panel-2-content"
              style={{ scale: panel2Scale }}
            >
              <div className="scanner-section-header">
                <span className="section-pill">
                  <Radio size={14} className="text-teal animate-pulse" />
                  Diagnóstico Anatómico Interactivo
                </span>
                <h2>Escáner Bio-Médico & Diagnóstico Clínico</h2>
              </div>

              <div className="scanner-interactive-stage">
                {/* Left: Anatomical Body Canvas with Moving Laser Beam */}
                <div className="anatomical-canvas glass-card">
                  <div className="laser-beam-line"></div>
                  
                  {/* Human Figure Silhouette Representation */}
                  <div className="silhouette-wrapper">
                    <svg viewBox="0 0 200 400" className="human-svg">
                      <path 
                        d="M 100 20 C 110 20, 118 28, 118 38 C 118 48, 110 56, 100 56 C 90 56, 82 48, 82 38 C 82 28, 90 20, 100 20 Z M 80 65 L 120 65 C 135 65, 145 80, 145 100 L 140 180 L 125 180 L 128 110 L 118 110 L 118 220 L 105 220 L 105 380 L 95 380 L 95 220 L 82 220 L 82 110 L 72 110 L 75 180 L 60 180 L 55 100 C 55 80, 65 65, 80 65 Z" 
                        fill="none" 
                        stroke="rgba(13, 148, 136, 0.25)" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                      />
                    </svg>

                    {/* Active Reticle Target Indicator */}
                    <motion.div 
                      className="target-reticle"
                      animate={{ 
                        left: `${activeNode.x}%`, 
                        top: `${activeNode.y}%` 
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <div className="reticle-ring"></div>
                      <Crosshair size={24} className="text-teal" />
                    </motion.div>

                    {/* Hotspot Pins */}
                    {SCANNER_NODES.map((node, idx) => (
                      <div 
                        key={node.id}
                        className={`scanner-pin ${idx === activeNodeIdx ? "active" : ""}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onClick={() => setActiveNodeIdx(idx)}
                        onMouseEnter={() => setActiveNodeIdx(idx)}
                      >
                        <span className="pin-pulse"></span>
                        <span className="pin-num">{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Live Diagnostics HUD Display */}
                <div className="diagnostics-hud-panel glass-card">
                  <div className="hud-top-bar">
                    <div className="hud-title">
                      <ActivitySquare size={16} className="text-teal" />
                      <span>Nodo #{activeNodeIdx + 1}: {activeNode.title}</span>
                    </div>
                    <span className="live-status-pill">LÁSER ACTIVO</span>
                  </div>

                  <div className="hud-reading-card">
                    <span className="hud-label">Terapia Recomendada</span>
                    <h3 className="hud-value text-teal">{activeNode.tech}</h3>
                    <p className="hud-desc">Optimizado para desinflamación rápida y respuesta neuromuscular comprobada.</p>
                  </div>

                  <div className="hud-metrics-row">
                    <div className="metric-cell">
                      <span className="m-title">Frecuencia / Potencia</span>
                      <strong className="m-data">{activeNode.frequency}</strong>
                    </div>
                    <div className="metric-cell">
                      <span className="m-title">Profundidad Efectiva</span>
                      <strong className="m-data text-copper">{activeNode.depth}</strong>
                    </div>
                  </div>

                  <div className="hud-equipment-recommendation">
                    <span className="rec-label">Equipo Recomendado Bruce Médica:</span>
                    <div className="rec-box">
                      <Zap size={16} className="text-teal" />
                      <span>{activeNode.recommendation}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* ================= PANEL 3: 3D STACKING FAN DECK ================= */}
          <div className="hero-panel panel-3">
            <motion.div 
              className="panel-3-content"
              style={{ x: panel3Parallax }}
            >
              <div className="panel3-header-box">
                <div className="section-pill">
                  <Target size={14} className="text-teal" />
                  <span>Prescripción Tecnológica</span>
                </div>
                <h2>Catálogo Interactivo por Objetivo Clínico</h2>
              </div>

              {/* Goal Selector Tabs */}
              <div className="goal-tabs-container">
                {THERAPEUTIC_GOALS.map((goal, idx) => {
                  const GoalIcon = goal.icon;
                  const isActive = idx === activeGoalIdx;
                  return (
                    <button
                      key={goal.id}
                      className={`goal-tab-btn ${isActive ? "active" : ""}`}
                      onClick={() => {
                        setActiveGoalIdx(idx);
                        setFocusedCardIdx(1);
                      }}
                    >
                      <GoalIcon size={16} />
                      <span>{goal.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3D Stacking Deck Container */}
              <div className="perspective-deck-stage">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeGoal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="deck-3d-stack"
                  >
                    {curatedProducts.map((product, cIdx) => {
                      const isFocused = cIdx === focusedCardIdx;
                      let transformStyle = {};

                      if (cIdx === 0) {
                        transformStyle = {
                          transform: isFocused 
                            ? "translateX(0px) translateZ(50px) scale(1.04)" 
                            : "translateX(-240px) translateZ(-80px) rotateY(15deg) scale(0.9)",
                          zIndex: isFocused ? 10 : 2
                        };
                      } else if (cIdx === 1) {
                        transformStyle = {
                          transform: isFocused 
                            ? "translateX(0px) translateZ(50px) scale(1.04)" 
                            : "translateX(0px) translateZ(-40px) scale(0.95)",
                          zIndex: isFocused ? 10 : 5
                        };
                      } else {
                        transformStyle = {
                          transform: isFocused 
                            ? "translateX(0px) translateZ(50px) scale(1.04)" 
                            : "translateX(240px) translateZ(-80px) rotateY(-15deg) scale(0.9)",
                          zIndex: isFocused ? 10 : 2
                        };
                      }

                      return (
                        <div 
                          key={cIdx}
                          className={`stack-card-3d glass-card ${isFocused ? "focused" : ""}`}
                          style={transformStyle}
                          onClick={() => setFocusedCardIdx(cIdx)}
                        >
                          <div className="card-top-header">
                            <span className="badge-teal-light">{activeGoal.badge}</span>
                            <span className="stock-indicator"><Flame size={12} className="text-copper" /> Stock Listo</span>
                          </div>

                          <div className="card-media-box">
                            {product.imageSvg ? (
                              <div className="svg-stage" dangerouslySetInnerHTML={{ __html: product.imageSvg }} />
                            ) : (
                              <img src={product.image} alt={product.name} className="product-media" />
                            )}
                          </div>

                          <div className="card-details">
                            <h3>{product.name}</h3>
                            <p className="details-sub">{product.description || activeGoal.subtitle}</p>

                            <div className="card-price-actions">
                              <div className="price-tag">
                                <span className="amount">${(product.price || 3899).toLocaleString()} MXN</span>
                                <span className="tax">IVA Incluido</span>
                              </div>

                              <div className="action-buttons">
                                <button 
                                  className="btn-inspect-round"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onOpenProductModal) onOpenProductModal(product);
                                  }}
                                  title="Ficha técnica completa"
                                >
                                  <Eye size={16} />
                                </button>

                                <button 
                                  className="btn-whatsapp-direct"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWhatsAppQuote(product.name);
                                  }}
                                >
                                  <MessageCircle size={15} /> Cotizar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Full Shop Action */}
              <div className="panel3-bottom-action">
                <button className="btn-explore-catalog-light" onClick={onShopClick}>
                  Ver Catálogo Completo Bruce Médica <ArrowRight size={18} />
                </button>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Styled JSX CSS Rules (AWWARDS LIGHT THEME) */}
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

        /* Ambient Glow Orbs */
        .light-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.55;
        }
        .glow-teal { width: 650px; height: 650px; top: -150px; right: -100px; background: rgba(13, 148, 136, 0.09); }
        .glow-cyan { width: 550px; height: 550px; bottom: -150px; left: -100px; background: rgba(6, 182, 212, 0.07); }

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

        .glass-card {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06);
          border-radius: 24px;
        }

        /* PANEL 1: MASKED TYPOGRAPHY */
        .panel-1-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 950px;
          z-index: 2;
        }

        .hero-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1.2rem;
          border-radius: 50px;
          background: rgba(13, 148, 136, 0.08);
          border: 1px solid rgba(13, 148, 136, 0.2);
          color: #0d9488;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .image-masked-title {
          font-family: var(--font-heading);
          font-size: 9.5vw;
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.05em;
          color: transparent;
          background: url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop') center/cover;
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 15px 30px rgba(13, 148, 136, 0.15));
          margin-bottom: 1.75rem;
        }

        .hero-manifesto-sub {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #475569;
          max-width: 720px;
          margin-bottom: 2.25rem;
        }

        .hero-badges-cluster {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .h-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .scroll-indicator-box {
          position: absolute;
          bottom: -14vh;
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

        .mouse-icon { width: 22px; height: 34px; border: 2px solid #cbd5e1; border-radius: 12px; display: flex; justify-content: center; padding-top: 5px; }
        .wheel-dot { width: 4px; height: 7px; background: #0d9488; border-radius: 2px; animation: scrollWheel 2s infinite; }
        @keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }

        /* PANEL 2: INTERACTIVE LASER SCANNER */
        .panel-2-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1150px;
        }

        .scanner-section-header { text-align: center; margin-bottom: 2rem; }
        .section-pill { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.4rem 1rem; border-radius: 50px; background: rgba(13, 148, 136, 0.08); border: 1px solid rgba(13, 148, 136, 0.2); font-size: 0.82rem; font-weight: 700; color: #0d9488; margin-bottom: 0.4rem; }
        .scanner-section-header h2 { font-family: var(--font-heading); font-size: 2.3rem; font-weight: 800; color: #0f172a; }

        .scanner-interactive-stage {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2.5rem;
          width: 100%;
          align-items: center;
        }

        .anatomical-canvas {
          position: relative;
          height: 380px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .laser-beam-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0d9488, #06b6d4, transparent);
          box-shadow: 0 0 15px #0d9488;
          animation: laserScan 4s ease-in-out infinite alternate;
          z-index: 5;
        }

        @keyframes laserScan {
          0% { top: 5%; }
          100% { top: 95%; }
        }

        .silhouette-wrapper { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .human-svg { height: 100%; max-height: 320px; }

        .target-reticle {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reticle-ring {
          position: absolute;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 2px dashed #0d9488;
          animation: spin 10s linear infinite;
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }

        .scanner-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #cbd5e1;
          color: #334155;
          font-weight: 800;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.06);
          z-index: 10;
        }

        .scanner-pin:hover, .scanner-pin.active {
          border-color: #0d9488;
          background: #0d9488;
          color: #ffffff;
          transform: translate(-50%, -50%) scale(1.2);
          box-shadow: 0 0 20px rgba(13, 148, 136, 0.4);
        }

        .pin-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid #0d9488;
          opacity: 0.6;
          animation: pulsePin 1.8s infinite;
        }

        @keyframes pulsePin { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.8); opacity: 0; } }

        .diagnostics-hud-panel { padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .hud-top-bar { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .hud-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: #0f172a; }
        .live-status-pill { background: rgba(13, 148, 136, 0.1); color: #0d9488; font-size: 0.7rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 50px; letter-spacing: 0.05em; }

        .hud-reading-card { background: #f8fafc; padding: 1.1rem 1.25rem; border-radius: 16px; border: 1px solid #e2e8f0; }
        .hud-label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .hud-value { font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; margin: 0.2rem 0; }
        .hud-desc { font-size: 0.82rem; color: #64748b; line-height: 1.45; }

        .hud-metrics-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .metric-cell { background: #ffffff; padding: 0.85rem; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 0.2rem; }
        .m-title { font-size: 0.72rem; color: #94a3b8; font-weight: 600; }
        .m-data { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 800; color: #0f172a; }

        .hud-equipment-recommendation { display: flex; flex-direction: column; gap: 0.4rem; }
        .rec-label { font-size: 0.78rem; font-weight: 700; color: #475569; }
        .rec-box { display: flex; align-items: center; gap: 0.6rem; background: rgba(13, 148, 136, 0.07); padding: 0.75rem 1rem; border-radius: 12px; border-left: 4px solid #0d9488; font-weight: 700; font-size: 0.88rem; color: #0f172a; }

        /* PANEL 3: 3D STACKING FAN DECK */
        .panel-3-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        .panel3-header-box { text-align: center; margin-bottom: 1.5rem; }
        .panel3-header-box h2 { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; color: #0f172a; }

        .goal-tabs-container { display: flex; gap: 0.65rem; flex-wrap: wrap; justify-content: center; margin-bottom: 2rem; }
        .goal-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 1.35rem;
          border-radius: 50px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .goal-tab-btn:hover { border-color: #0d9488; color: #0d9488; }
        .goal-tab-btn.active { background: #0d9488; color: #ffffff; border-color: #0d9488; box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3); }

        .perspective-deck-stage {
          perspective: 1200px;
          width: 100%;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .deck-3d-stack {
          position: relative;
          width: 100%;
          max-width: 360px;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .stack-card-3d {
          position: absolute;
          width: 340px;
          padding: 1.5rem;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
          transform-style: preserve-3d;
        }

        .stack-card-3d.focused {
          border-color: #0d9488;
          box-shadow: 0 25px 50px -10px rgba(13, 148, 136, 0.25);
        }

        .card-top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; font-size: 0.75rem; font-weight: 700; }
        .badge-teal-light { background: rgba(13, 148, 136, 0.1); color: #0d9488; padding: 0.25rem 0.65rem; border-radius: 50px; }
        .stock-indicator { display: flex; align-items: center; gap: 0.3rem; color: #64748b; }

        .card-media-box { height: 140px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-radius: 16px; margin-bottom: 1rem; padding: 0.75rem; }
        .product-media { max-height: 110px; object-fit: contain; }
        .svg-stage { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; }

        .card-details h3 { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem; }
        .details-sub { font-size: 0.78rem; color: #64748b; margin-bottom: 1rem; height: 2.3em; overflow: hidden; }

        .card-price-actions { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; }
        .amount { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; color: #0f172a; display: block; }
        .tax { font-size: 0.68rem; color: #94a3b8; }

        .action-buttons { display: flex; gap: 0.4rem; }
        .btn-inspect-round { width: 34px; height: 34px; border-radius: 10px; background: #f1f5f9; border: 1px solid #e2e8f0; color: #334155; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .btn-inspect-round:hover { background: #ffffff; border-color: #0d9488; color: #0d9488; }
        .btn-whatsapp-direct { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.85rem; border-radius: 10px; background: #25d366; color: #ffffff; border: none; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: 0.2s; }
        .btn-whatsapp-direct:hover { background: #20ba5a; }

        .panel3-bottom-action { margin-top: 0.5rem; }
        .btn-explore-catalog-light { display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.85rem 2rem; border-radius: 14px; background: #0f172a; color: #ffffff; font-family: var(--font-heading); font-weight: 700; font-size: 0.95rem; border: none; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15); }
        .btn-explore-catalog-light:hover { background: #0d9488; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(13, 148, 136, 0.3); }

        .text-teal { color: #0d9488; }
        .text-copper { color: #f97316; }

        @media (max-width: 1024px) {
          .image-masked-title { font-size: 4rem; }
          .scanner-interactive-stage { grid-template-columns: 1fr; }
          .stack-card-3d { position: relative; transform: none !important; width: 100%; margin-bottom: 1rem; }
          .deck-3d-stack { flex-direction: column; height: auto; }
          .perspective-deck-stage { height: auto; }
        }
      `}</style>
    </section>
  );
}
