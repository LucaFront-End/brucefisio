import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, ShoppingCart, 
  Check, Award, Truck, Eye, Sparkles, MessageCircle, 
  Plus, Minus, Sliders, Info, Flame, UserCheck, Star,
  Crosshair, ActivitySquare
} from "lucide-react";
import { PRODUCTS } from "../data/products";

const SMART_CATEGORIES = [
  {
    id: "electroterapia",
    label: "Electroterapia & Bio-Estímulo",
    icon: Zap,
    categoryMatch: ["electroterapia", "ultrasonido", "chattanooga"],
    tagline: "Estímulo bio-eléctrico de alta precisión para acelerar la cicatrización y regeneración celular.",
    specs: [
      { x: 30, y: 35, title: "Frecuencia Bio-Modulada", desc: "Ondas interferenciales de 4000Hz" },
      { x: 70, y: 65, title: "Electrodos Grado Médico", desc: "Gel conductivo biocompatible" }
    ]
  },
  {
    id: "fuerza",
    label: "Fuerza & Rehabilitación",
    icon: Activity,
    categoryMatch: ["fuerza", "equilibrio", "ejercicio", "pesas", "pelota", "bandas"],
    tagline: "Sistemas de resistencia progresiva y fortalecimiento muscular de grado clínico.",
    specs: [
      { x: 45, y: 40, title: "Núcleo Antiexplosión", desc: "Resistencia hasta 500 kg estáticos" },
      { x: 60, y: 70, title: "Textura Antideslizante", desc: "Agarre ergonómico micro-texturizado" }
    ]
  },
  {
    id: "muebles",
    label: "Mobiliario & Mesas",
    icon: ShieldCheck,
    categoryMatch: ["mesa", "camilla", "baño", "ducha", "mobiliario"],
    tagline: "Mobiliario ergonómico de alta carga y elevación motorizada para confort profesional.",
    specs: [
      { x: 35, y: 50, title: "Motor Silencioso Dual", desc: "Ajuste milimétrico de altura" },
      { x: 75, y: 45, title: "Tapizado Antibacteriano", desc: "Resistente a fluidos y uso rudo" }
    ]
  },
  {
    id: "compresion",
    label: "Compresión & Soportes",
    icon: Award,
    categoryMatch: ["plantilla", "talonera", "soporte", "compresión", "manga", "rodillera"],
    tagline: "Órtesis ergonómicas y prendas compresivas clínicas para estabilización articular.",
    specs: [
      { x: 40, y: 35, title: "Compresión Graduada", desc: "20-30 mmHg para retorno venoso" },
      { x: 65, y: 60, title: "Tejido Respirable", desc: "Estructura 3D termorreguladora" }
    ]
  }
];

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal, 
  products = PRODUCTS 
}) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [viewMode, setViewMode] = useState("commercial");
  const [quantity, setQuantity] = useState(1);
  const [addedItem, setAddedItem] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Card Mouse Parallax state
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);

  // Scroll Jacking Refs
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track horizontal translation (300vw total, so we move -66.666vw)
  const xTrack = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);
  
  // Parallax elements inside panels
  const panel1Parallax = useTransform(scrollYProgress, [0, 0.33], ["0%", "40%"]);
  const panel2Parallax = useTransform(scrollYProgress, [0, 0.33, 0.66], ["-20%", "0%", "20%"]);
  const panel3Parallax = useTransform(scrollYProgress, [0.33, 1], ["20%", "0%"]);

  const panel1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const panel2Scale = useTransform(scrollYProgress, [0.15, 0.33, 0.5], [0.8, 1, 0.8]);

  const activeCategory = SMART_CATEGORIES[activeTabIdx];

  const categoryProducts = products.filter(p => {
    const pCat = (p.category || "").toLowerCase();
    const pName = (p.name || "").toLowerCase();
    return activeCategory.categoryMatch.some(term => pCat.includes(term) || pName.includes(term));
  });

  const activeProduct = categoryProducts[0] || products[0] || {
    id: "demo-1",
    name: "Equipamiento Bruce Médica",
    price: 3899,
    category: activeCategory.label,
    brand: "Bruce Pro",
    imageBg: "linear-gradient(135deg, #020617 0%, #0d9488 100%)"
  };

  const [selectedVariant, setSelectedVariant] = useState("");

  useEffect(() => {
    if (activeProduct?.variables?.options?.length > 0) {
      const firstOpt = activeProduct.variables.options[0];
      setSelectedVariant(typeof firstOpt === "object" ? firstOpt.value : firstOpt);
    } else {
      setSelectedVariant("");
    }
    setQuantity(1);
    setActiveHotspot(null);
  }, [activeProduct, activeTabIdx]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTabIdx(prev => (prev + 1) % SMART_CATEGORIES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (!onQuickAdd) return;
    
    const quickProduct = {
      ...activeProduct,
      selectedVariant: selectedVariant || null,
      quantity: quantity
    };

    onQuickAdd(quickProduct);
    setAddedItem(activeProduct.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  const handleWhatsAppQuote = (e) => {
    e.stopPropagation();
    const text = `Hola Bruce Médica, me interesa cotizar ${quantity} unidad(es) del equipo: ${activeProduct.name} (Variante: ${selectedVariant || 'Estándar'}, Precio Unitario: $${activeProduct.price?.toLocaleString()} MXN). ¿Tienen disponibilidad inmediata?`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  const subtotalPrice = (activeProduct.price || 0) * quantity;

  return (
    <section ref={containerRef} className="hero-cinematic-container">
      {/* Sticky Frame locks the view while scrolling */}
      <div className="hero-sticky-frame">
        
        {/* Ambient Dark Mode Glows */}
        <div className="cinematic-glow glow-teal"></div>
        <div className="cinematic-glow glow-blue"></div>
        <div className="cinematic-grid"></div>

        {/* Horizontal Track (300vw) */}
        <motion.div 
          className="hero-horizontal-track"
          style={{ x: xTrack }}
        >
          {/* ================= PANEL 1: EL ORIGEN ================= */}
          <div className="hero-panel panel-1">
            <motion.div 
              className="panel-1-inner"
              style={{ x: panel1Parallax, opacity: panel1Opacity }}
            >
              <h1 className="x-ray-title">
                FUTURO<br/>CLÍNICO
              </h1>
              <div className="panel-1-desc">
                <p>El cuerpo humano es la máquina perfecta.</p>
                <p className="text-teal">Exige tecnología a su altura.</p>
              </div>

              <div className="scroll-prompt">
                <div className="mouse">
                  <div className="wheel"></div>
                </div>
                <span>Inicia el Diagnóstico</span>
              </div>
            </motion.div>
          </div>

          {/* ================= PANEL 2: LA TECNOLOGÍA ================= */}
          <div className="hero-panel panel-2">
            <motion.div 
              className="panel-2-inner"
              style={{ scale: panel2Scale, x: panel2Parallax }}
            >
              <div className="scanner-ui">
                <div className="scanner-ring outer-ring"></div>
                <div className="scanner-ring inner-ring"></div>
                <Crosshair className="scanner-crosshair" size={180} />
                <ActivitySquare className="scanner-pulse" size={60} />
              </div>
              <h2 className="scanner-title">
                Precisión de Grado Médico
              </h2>
              <p className="scanner-subtitle">Analizando catálogo de alta tecnología...</p>
            </motion.div>
          </div>

          {/* ================= PANEL 3: LA SOLUCIÓN CLÍNICA (TIENDA) ================= */}
          <div className="hero-panel panel-3">
            <motion.div 
              className="panel-3-inner container hero-x1000-grid"
              style={{ x: panel3Parallax }}
            >
              {/* Left Column: Cyber-Clinical Selector Deck */}
              <div className="hero-left-deck">
                
                <div className="hero-top-meta">
                  <div className="hero-live-chip">
                    <span className="live-pulse"></span>
                    Sistema en Vivo & Control
                  </div>
                  
                  <div className="hero-rating-badge">
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="var(--secondary-accent)" color="var(--secondary-accent)" />
                      ))}
                    </div>
                    <span>4.9/5 por +120 Clínicas</span>
                  </div>
                </div>

                <h2 className="hero-x1000-title">
                  Equipamiento <br />
                  <span className="gradient-text">Fisioterapéutico Avanzado</span>
                </h2>

                <p className="hero-x1000-desc text-gray-400">
                  Selecciona la especialidad para explorar equipos calibrados y cotizar en tiempo real.
                </p>

                {/* Cyber-Clinical Category Tabs */}
                <div 
                  className="smart-category-matrix"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {SMART_CATEGORIES.map((cat, idx) => {
                    const TabIcon = cat.icon;
                    const isActive = idx === activeTabIdx;
                    return (
                      <button
                        key={cat.id}
                        className={`matrix-tab-btn ${isActive ? "active" : ""}`}
                        onClick={() => setActiveTabIdx(idx)}
                      >
                        <TabIcon size={18} className="tab-icon" />
                        <span>{cat.label}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="activeTabUnderline2" 
                            className="tab-active-glow-bar" 
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Category Clinical Tagline */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="category-clinical-banner glass-dark"
                  >
                    <div className="banner-accent-line"></div>
                    <Sparkles size={18} className="text-copper" />
                    <p>{activeCategory.tagline}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="hero-main-actions">
                  <button className="btn btn-accent-hero" onClick={onShopClick}>
                    Ver Catálogo Completo <ArrowRight size={18} />
                  </button>
                  <button className="btn btn-whatsapp-quote" onClick={handleWhatsAppQuote}>
                    <MessageCircle size={18} /> Cotización Rápida
                  </button>
                </div>

              </div>

              {/* Right Column: 3D Tilt Parallax Showcase Card */}
              <div className="hero-right-showcase">
                
                <div className="view-mode-switcher-bar glass-dark">
                  <button 
                    className={`mode-btn ${viewMode === "commercial" ? "active" : ""}`}
                    onClick={() => setViewMode("commercial")}
                  >
                    <ShoppingCart size={14} /> Vista Comercial
                  </button>
                  <button 
                    className={`mode-btn ${viewMode === "diagnostic" ? "active" : ""}`}
                    onClick={() => setViewMode("diagnostic")}
                  >
                    <Sliders size={14} /> Modo Diagnóstico
                  </button>
                </div>

                <div 
                  className="perspective-container"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    handleMouseLeave();
                  }}
                  onMouseMove={handleMouseMove}
                >
                  <motion.div
                    ref={cardRef}
                    animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="showcase-3d-card glass-dark-border"
                    onClick={() => onOpenProductModal && onOpenProductModal(activeProduct)}
                  >
                    <div 
                      className="card-specular-glare"
                      style={{ background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)` }}
                    />

                    <div 
                      className="card-image-stage"
                      style={{ background: activeProduct.imageBg || "linear-gradient(135deg, #020617 0%, #0d9488 100%)" }}
                    >
                      <div className="card-top-badges">
                        <span className="brand-tag dark-mode-tag">{activeProduct.brand || "Bruce Médica"}</span>
                        <span className="urgency-tag dark-mode-tag">
                          <Flame size={12} className="text-orange" /> En Stock
                        </span>
                      </div>

                      {activeProduct.imageSvg ? (
                        <div 
                          className="card-svg-wrapper"
                          dangerouslySetInnerHTML={{ __html: activeProduct.imageSvg }}
                        />
                      ) : (
                        <img 
                          src={activeProduct.image} 
                          alt={activeProduct.name} 
                          className="card-hero-img drop-shadow-2xl" 
                        />
                      )}

                      {activeCategory.specs.map((spec, i) => (
                        <div 
                          key={i}
                          className="hotspot-pin"
                          style={{ left: `${spec.x}%`, top: `${spec.y}%` }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(activeHotspot === i ? null : i);
                          }}
                          onMouseEnter={() => setActiveHotspot(i)}
                        >
                          <span className="hotspot-ring"></span>
                          <span className="hotspot-core">+</span>

                          <AnimatePresence>
                            {activeHotspot === i && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                className="hotspot-popover glass-dark"
                              >
                                <div className="popover-title"><Zap size={12} /> {spec.title}</div>
                                <div className="popover-desc">{spec.desc}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>

                    <div className="card-content-stage dark-bg">
                      <div className="card-header-info">
                        <span className="card-cat-badge">{activeProduct.category || activeCategory.label}</span>
                        <h3 className="card-title text-white">{activeProduct.name}</h3>
                      </div>

                      <AnimatePresence mode="wait">
                        {viewMode === "commercial" ? (
                          <motion.div 
                            key="commercial-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="view-mode-panel"
                          >
                            {activeProduct.variables?.options?.length > 0 && (
                              <div className="variants-selector-box" onClick={(e) => e.stopPropagation()}>
                                <span className="selector-label text-gray-400">{activeProduct.variables.name}:</span>
                                <div className="variant-pills-row">
                                  {activeProduct.variables.options.slice(0, 3).map((opt, idx) => {
                                    const val = typeof opt === "object" ? opt.value : opt;
                                    const isSelected = selectedVariant === val;
                                    return (
                                      <button
                                        key={idx}
                                        className={`variant-pill dark-pill ${isSelected ? "selected" : ""}`}
                                        onClick={() => setSelectedVariant(val)}
                                      >
                                        {val}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="quantity-urgency-row dark-row" onClick={(e) => e.stopPropagation()}>
                              <div className="quantity-counter">
                                <button className="qty-btn dark-qty" onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}><Minus size={14} /></button>
                                <span className="qty-val text-white">{quantity}</span>
                                <button className="qty-btn dark-qty" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                              </div>
                              <div className="live-viewers-badge">
                                <UserCheck size={13} className="text-teal" />
                                <span className="text-gray-300">14 en línea consultando</span>
                              </div>
                            </div>

                            <div className="card-footer-checkout border-gray-700">
                              <div className="price-stack">
                                <span className="subtotal-price text-white">${subtotalPrice.toLocaleString()} MXN</span>
                                <span className="tax-notice">IVA Incluido ({quantity} ud)</span>
                              </div>

                              <div className="actions-cluster">
                                <button className="inspect-btn dark-inspect" onClick={(e) => { e.stopPropagation(); if (onOpenProductModal) onOpenProductModal(activeProduct); }}>
                                  <Eye size={16} /> Ficha
                                </button>
                                <button className={`buy-now-btn ${addedItem === activeProduct.id ? "added" : ""}`} onClick={handleBuyClick}>
                                  {addedItem === activeProduct.id ? <><Check size={16} /> ¡Añadido!</> : <><ShoppingCart size={16} /> Comprar</>}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="diagnostic-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="view-mode-panel diagnostic-panel"
                          >
                            <div className="diagnostic-spec-card dark-spec">
                              <h5><Info size={14} /> Aplicación Clínica</h5>
                              <p className="text-gray-300">{activeCategory.tagline}</p>
                            </div>

                            <div className="diagnostic-specs-list">
                              <div className="spec-row border-gray-700">
                                <span className="text-gray-400">Certificación:</span>
                                <strong className="text-white">Grado Médico CE / FDA</strong>
                              </div>
                              <div className="spec-row border-gray-700">
                                <span className="text-gray-400">Mantenimiento:</span>
                                <strong className="text-white">Soporte Oficial Bruce 24/7</strong>
                              </div>
                              <div className="spec-row border-gray-700">
                                <span className="text-gray-400">Disponibilidad:</span>
                                <strong className="text-green">Despacho Inmediato</strong>
                              </div>
                            </div>

                            <button className="btn-full-spec dark-full-spec" onClick={(e) => { e.stopPropagation(); if (onOpenProductModal) onOpenProductModal(activeProduct); }}>
                              Abrir Ficha Técnica Completa <ArrowRight size={16} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CSS Rules for Cinematic Scroll */}
      <style>{`
        .hero-cinematic-container {
          height: 400vh;
          background: #020617; /* Very dark slate, almost black */
          position: relative;
        }

        .hero-sticky-frame {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* Ambient Dark Glows */
        .cinematic-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }
        .glow-teal { width: 600px; height: 600px; top: -200px; right: -100px; background: rgba(13, 148, 136, 0.4); animation: float 10s infinite alternate; }
        .glow-blue { width: 500px; height: 500px; bottom: -200px; left: -100px; background: rgba(37, 99, 235, 0.3); animation: float 12s infinite alternate-reverse; }
        
        .cinematic-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes float { 0% { transform: translate(0, 0); } 100% { transform: translate(40px, -40px); } }

        /* The moving track */
        .hero-horizontal-track {
          display: flex;
          height: 100vh;
          width: 300vw; /* 3 panels of 100vw */
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
        }

        /* PANEL 1: Typography */
        .panel-1-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 2;
        }

        .x-ray-title {
          font-family: var(--font-heading);
          font-size: 14vw;
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.05em;
          color: transparent;
          background: url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop') center/cover;
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(13, 148, 136, 0.3));
          margin-bottom: 2rem;
        }

        .panel-1-desc {
          font-size: 1.5rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }
        
        .scroll-prompt {
          position: absolute;
          bottom: 10vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .mouse { width: 24px; height: 36px; border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; display: flex; justify-content: center; padding-top: 6px; }
        .wheel { width: 4px; height: 8px; background: var(--accent-color); border-radius: 2px; animation: scrollWheel 2s infinite; }
        @keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }

        /* PANEL 2: Scanner UI */
        .panel-2-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .scanner-ui {
          position: relative;
          width: 400px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .scanner-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(13, 148, 136, 0.3);
          box-shadow: 0 0 30px rgba(13, 148, 136, 0.1) inset;
        }
        
        .outer-ring { width: 400px; height: 400px; border-style: dashed; animation: spin 20s linear infinite; }
        .inner-ring { width: 280px; height: 280px; border: 2px solid rgba(13, 148, 136, 0.6); animation: spinReverse 15s linear infinite; }

        .scanner-crosshair { color: var(--accent-color); filter: drop-shadow(0 0 10px var(--accent-color)); opacity: 0.8; }
        .scanner-pulse { position: absolute; color: var(--accent-color); animation: pulseScale 2s infinite; }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 100% { transform: rotate(-360deg); } }
        @keyframes pulseScale { 0% { transform: scale(0.8); opacity: 0.8; } 50% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 20px var(--accent-color)); } 100% { transform: scale(0.8); opacity: 0.8; } }

        .scanner-title { font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; text-shadow: 0 0 20px rgba(13, 148, 136, 0.5); }
        .scanner-subtitle { font-size: 1.1rem; color: var(--accent-color); font-family: monospace; letter-spacing: 0.1em; }

        /* PANEL 3: Catalog/Store */
        .panel-3-inner {
          width: 100%;
          max-width: 1280px;
          padding: 0 2rem;
        }

        /* Adjustments for Panel 3 existing classes into dark mode */
        .hero-x1000-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: center; }
        .hero-left-deck { display: flex; flex-direction: column; gap: 1.5rem; }
        .hero-top-meta { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .hero-live-chip { background: rgba(13, 148, 136, 0.2); color: var(--accent-color); border: 1px solid rgba(13, 148, 136, 0.4); padding: 0.45rem 1rem; border-radius: 50px; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; }
        .live-pulse { width: 8px; height: 8px; background: var(--accent-color); border-radius: 50%; box-shadow: 0 0 10px var(--accent-color); animation: blink 1.5s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }
        
        .hero-rating-badge { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #fff; padding: 0.45rem 0.9rem; border-radius: 50px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.5rem; }
        .stars-row { display: flex; gap: 0.15rem; }

        .hero-x1000-title { font-family: var(--font-heading); font-size: 3.2rem; font-weight: 800; line-height: 1.1; color: #fff; }
        .gradient-text { background: linear-gradient(135deg, #2dd4bf, #0284c7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .smart-category-matrix { display: flex; flex-wrap: wrap; gap: 0.65rem; }
        .matrix-tab-btn { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #e2e8f0; padding: 0.65rem 1.25rem; border-radius: 50px; font-weight: 600; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 0.55rem; cursor: pointer; transition: all 0.25s; position: relative; }
        .matrix-tab-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.3); }
        .matrix-tab-btn.active { background: var(--accent-color); color: #fff; border-color: var(--accent-color); box-shadow: 0 0 20px rgba(13, 148, 136, 0.4); }
        .tab-active-glow-bar { position: absolute; bottom: -4px; left: 20%; right: 20%; height: 3px; background: #fff; border-radius: 10px; box-shadow: 0 0 8px #fff; }

        .glass-dark { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); color: #cbd5e1; }
        .glass-dark-border { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(13, 148, 136, 0.3); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        .glass-dark-border:hover { border-color: var(--accent-color); box-shadow: 0 0 40px rgba(13, 148, 136, 0.2); }
        
        .category-clinical-banner { position: relative; padding: 0.95rem 1.35rem; border-radius: 16px; display: flex; align-items: center; gap: 0.85rem; font-size: 0.93rem; overflow: hidden; }
        .banner-accent-line { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent-color); }

        .hero-main-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 1rem; }
        .btn-accent-hero { background: var(--accent-color); color: #fff; border: none; padding: 0.9rem 1.75rem; border-radius: 14px; font-weight: 700; font-size: 0.98rem; display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer; box-shadow: 0 0 20px rgba(13, 148, 136, 0.4); transition: transform 0.2s; }
        .btn-accent-hero:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(13, 148, 136, 0.6); }
        .btn-whatsapp-quote { background: #25d366; color: #fff; border: none; padding: 0.9rem 1.6rem; border-radius: 14px; font-weight: 700; font-size: 0.98rem; display: inline-flex; align-items: center; gap: 0.55rem; cursor: pointer; transition: transform 0.2s; }
        .btn-whatsapp-quote:hover { transform: translateY(-2px); background: #20ba5a; }

        /* Panel 3 3D Card Dark mode overrides */
        .hero-right-showcase { display: flex; flex-direction: column; gap: 1.1rem; align-items: center; }
        .view-mode-switcher-bar { display: flex; padding: 0.35rem; border-radius: 50px; gap: 0.25rem; }
        .mode-btn { background: transparent; color: #94a3b8; border: none; padding: 0.5rem 1.1rem; border-radius: 50px; font-weight: 700; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 0.45rem; cursor: pointer; transition: 0.2s; }
        .mode-btn.active { background: rgba(255, 255, 255, 0.1); color: #fff; }
        
        .perspective-container { perspective: 1200px; width: 100%; max-width: 440px; }
        .showcase-3d-card { position: relative; border-radius: 32px; overflow: hidden; transform-style: preserve-3d; cursor: pointer; transition: 0.3s; }
        .card-specular-glare { position: absolute; inset: 0; pointer-events: none; z-index: 10; }
        .card-image-stage { height: 260px; width: 100%; position: relative; display: flex; align-items: center; justify-content: center; padding: 2.25rem; overflow: hidden; }
        .card-top-badges { position: absolute; top: 1.1rem; left: 1.1rem; right: 1.1rem; display: flex; justify-content: space-between; z-index: 5; }
        .dark-mode-tag { background: rgba(15, 23, 42, 0.8) !important; color: #fff !important; border: 1px solid rgba(255, 255, 255, 0.1); }
        .brand-tag { font-size: 0.72rem; font-weight: 800; padding: 0.28rem 0.75rem; border-radius: 50px; text-transform: uppercase; }
        .urgency-tag { font-size: 0.72rem; font-weight: 700; padding: 0.28rem 0.75rem; border-radius: 50px; display: inline-flex; align-items: center; gap: 0.3rem; }
        
        .card-hero-img { max-height: 190px; object-fit: contain; transition: 0.4s; }
        .showcase-3d-card:hover .card-hero-img { transform: scale(1.08); }
        
        .hotspot-pin { position: absolute; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 8; }
        .hotspot-ring { position: absolute; inset: 0; border-radius: 50%; background: var(--accent-color); opacity: 0.5; animation: pulseRing 1.8s infinite; }
        .hotspot-core { position: relative; z-index: 2; width: 18px; height: 18px; border-radius: 50%; background: var(--accent-color); color: #fff; font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px var(--accent-color); }
        .hotspot-popover { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 200px; padding: 0.75rem; border-radius: 14px; color: #fff; pointer-events: none; z-index: 20; }
        
        .dark-bg { background: #0f172a; border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .card-content-stage { padding: 1.6rem 1.85rem; display: flex; flex-direction: column; gap: 1.15rem; }
        .card-cat-badge { font-size: 0.75rem; font-weight: 800; color: var(--accent-color); text-transform: uppercase; }
        .card-title { font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; line-height: 1.3; }
        
        .view-mode-panel { display: flex; flex-direction: column; gap: 1.05rem; }
        .variants-selector-box { display: flex; flex-direction: column; gap: 0.45rem; }
        .variant-pills-row { display: flex; gap: 0.45rem; flex-wrap: wrap; }
        .dark-pill { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; padding: 0.32rem 0.75rem; border-radius: 10px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .dark-pill:hover { border-color: var(--accent-color); color: var(--accent-color); }
        .dark-pill.selected { background: rgba(13, 148, 136, 0.2); border-color: var(--accent-color); color: var(--accent-light); }
        
        .dark-row { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.55rem 0.95rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: center; }
        .quantity-counter { display: flex; align-items: center; gap: 0.65rem; }
        .dark-qty { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .dark-qty:hover { background: var(--accent-color); border-color: var(--accent-color); }
        .qty-val { font-weight: 800; min-width: 16px; text-align: center; }
        
        .card-footer-checkout { display: flex; justify-content: space-between; align-items: center; padding-top: 0.9rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }
        .subtotal-price { font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; }
        .tax-notice { font-size: 0.7rem; color: #64748b; font-weight: 500; display: block; }
        
        .actions-cluster { display: flex; gap: 0.5rem; }
        .dark-inspect { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); color: #fff; padding: 0.65rem 0.95rem; border-radius: 12px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; transition: 0.2s; }
        .dark-inspect:hover { background: var(--accent-color); border-color: var(--accent-color); }
        .buy-now-btn { background: var(--accent-color); color: #fff; border: none; padding: 0.65rem 1.25rem; border-radius: 12px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.45rem; cursor: pointer; transition: 0.2s; box-shadow: 0 0 15px rgba(13, 148, 136, 0.3); }
        .buy-now-btn:hover { transform: translateY(-1px); box-shadow: 0 0 20px rgba(13, 148, 136, 0.5); }
        .buy-now-btn.added { background: #10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }

        .diagnostic-panel { gap: 0.85rem; }
        .dark-spec { background: rgba(13, 148, 136, 0.1); padding: 0.9rem 1.1rem; border-radius: 14px; border-left: 4px solid var(--accent-color); }
        .dark-spec h5 { font-size: 0.84rem; font-weight: 800; color: var(--accent-color); display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.25rem; }
        .diagnostic-specs-list { display: flex; flex-direction: column; gap: 0.45rem; }
        .spec-row { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 0.35rem 0; border-bottom: 1px dashed rgba(255, 255, 255, 0.1); }
        .dark-full-spec { background: rgba(255, 255, 255, 0.1); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); width: 100%; padding: 0.7rem; border-radius: 12px; font-weight: 700; font-size: 0.88rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; transition: 0.2s; margin-top: 0.25rem; }
        .dark-full-spec:hover { background: var(--accent-color); border-color: var(--accent-color); }
      `}</style>
    </section>
  );
}
