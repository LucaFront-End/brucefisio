import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  ShoppingCart, 
  Check, 
  Award, 
  Truck, 
  Eye, 
  Sparkles,
  MessageCircle,
  Plus,
  Minus,
  Sliders,
  Info,
  Flame,
  UserCheck,
  Star
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
  const [viewMode, setViewMode] = useState("commercial"); // 'commercial' | 'diagnostic'
  const [quantity, setQuantity] = useState(1);
  const [addedItem, setAddedItem] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Card Mouse Parallax state
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);

  const activeCategory = SMART_CATEGORIES[activeTabIdx];

  // Find best matching product for active category tab
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
    imageBg: "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)"
  };

  // Selected variant state
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

  // Auto-play category rotation every 7s if not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTabIdx(prev => (prev + 1) % SMART_CATEGORIES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // 3D Parallax mouse handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12deg
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
    <section className="hero-x1000-section">
      {/* Background Interactive Ambient Particles & Glows */}
      <div className="hero-ambient-glow glow-teal"></div>
      <div className="hero-ambient-glow glow-copper"></div>
      <div className="hero-ambient-glow glow-cyan"></div>
      <div className="hero-grid-pattern"></div>

      <div className="container hero-x1000-grid">
        
        {/* Left Column: Cyber-Clinical Selector Deck & Copy */}
        <div className="hero-left-deck">
          
          <div className="hero-top-meta">
            <div className="hero-live-chip">
              <span className="live-pulse"></span>
              Catálogo en Vivo & Control Bio-Médico
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

          <h1 className="hero-x1000-title">
            Equipamiento Médico <br />
            <span className="gradient-text">& Fisioterapia Avanzada</span>
          </h1>

          <p className="hero-x1000-desc">
            Interactúa con nuestro escáner interactivo por especialidad para explorar especificaciones técnicas y cotizar en tiempo real.
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
                      layoutId="activeTabUnderline" 
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
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="category-clinical-banner glass"
            >
              <div className="banner-accent-line"></div>
              <Sparkles size={18} className="text-copper" />
              <p>{activeCategory.tagline}</p>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges Bar */}
          <div className="hero-trust-bar">
            <div className="trust-pill">
              <ShieldCheck size={16} className="text-teal" />
              <span>2 Años Garantía</span>
            </div>
            <div className="trust-pill">
              <Truck size={16} className="text-teal" />
              <span>Envío Express Gratis</span>
            </div>
            <div className="trust-pill">
              <Award size={16} className="text-teal" />
              <span>FDA / CE Certified</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-main-actions">
            <button className="btn btn-accent-hero" onClick={onShopClick}>
              Explorar Tienda Completa <ArrowRight size={18} />
            </button>
            <button className="btn btn-whatsapp-quote" onClick={handleWhatsAppQuote}>
              <MessageCircle size={18} /> Cotizar vía WhatsApp
            </button>
          </div>

        </div>

        {/* Right Column: 3D Tilt Parallax Showcase Card */}
        <div className="hero-right-showcase">
          
          {/* Card View Mode Switcher (Comercial vs Diagnóstico) */}
          <div className="view-mode-switcher-bar glass">
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

          {/* 3D Tilt Card Frame Container */}
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
              animate={{ 
                rotateX: tilt.x, 
                rotateY: tilt.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="showcase-3d-card glass"
              onClick={() => onOpenProductModal && onOpenProductModal(activeProduct)}
            >
              {/* Dynamic Glare Reflection Sheen */}
              <div 
                className="card-specular-glare"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, transparent 60%)`
                }}
              />

              {/* Image Stage with Dynamic Category Gradient & Interactive Hotspots */}
              <div 
                className="card-image-stage"
                style={{ background: activeProduct.imageBg || "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)" }}
              >
                <div className="card-top-badges">
                  <span className="brand-tag">{activeProduct.brand || "Bruce Médica"}</span>
                  <span className="urgency-tag">
                    <Flame size={12} className="text-orange" /> En Stock - Envío Hoy
                  </span>
                </div>

                {/* Main Image or SVG */}
                {activeProduct.imageSvg ? (
                  <div 
                    className="card-svg-wrapper"
                    dangerouslySetInnerHTML={{ __html: activeProduct.imageSvg }}
                  />
                ) : (
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="card-hero-img" 
                  />
                )}

                {/* Interactive Technical Spec Hotspots */}
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

                    {/* Hotspot Spec Popover Tooltip */}
                    <AnimatePresence>
                      {activeHotspot === i && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="hotspot-popover glass"
                        >
                          <div className="popover-title"><Zap size={12} /> {spec.title}</div>
                          <div className="popover-desc">{spec.desc}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Card Body Content (Switches between Commercial and Diagnostic view) */}
              <div className="card-content-stage">
                
                <div className="card-header-info">
                  <span className="card-cat-badge">{activeProduct.category || activeCategory.label}</span>
                  <h3 className="card-title">{activeProduct.name}</h3>
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
                      {/* Variants Selector */}
                      {activeProduct.variables?.options?.length > 0 && (
                        <div className="variants-selector-box" onClick={(e) => e.stopPropagation()}>
                          <span className="selector-label">{activeProduct.variables.name}:</span>
                          <div className="variant-pills-row">
                            {activeProduct.variables.options.slice(0, 3).map((opt, idx) => {
                              const val = typeof opt === "object" ? opt.value : opt;
                              const isSelected = selectedVariant === val;
                              return (
                                <button
                                  key={idx}
                                  className={`variant-pill ${isSelected ? "selected" : ""}`}
                                  onClick={() => setSelectedVariant(val)}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Quantity & Urgency Stats */}
                      <div className="quantity-urgency-row" onClick={(e) => e.stopPropagation()}>
                        <div className="quantity-counter">
                          <button 
                            className="qty-btn"
                            onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-val">{quantity}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => setQuantity(q => q + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="live-viewers-badge">
                          <UserCheck size={13} className="text-teal" />
                          <span>14 en línea consultando</span>
                        </div>
                      </div>

                      {/* Footer Price & CTAs */}
                      <div className="card-footer-checkout">
                        <div className="price-stack">
                          <span className="subtotal-price">${subtotalPrice.toLocaleString()} MXN</span>
                          <span className="tax-notice">IVA Incluido ({quantity} ud)</span>
                        </div>

                        <div className="actions-cluster">
                          <button 
                            className="inspect-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenProductModal) onOpenProductModal(activeProduct);
                            }}
                            title="Ver ficha técnica"
                          >
                            <Eye size={16} /> Ficha
                          </button>

                          <button 
                            className={`buy-now-btn ${addedItem === activeProduct.id ? "added" : ""}`}
                            onClick={handleBuyClick}
                          >
                            {addedItem === activeProduct.id ? (
                              <><Check size={16} /> ¡Añadido!</>
                            ) : (
                              <><ShoppingCart size={16} /> Comprar</>
                            )}
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
                      <div className="diagnostic-spec-card">
                        <h5><Info size={14} /> Aplicación Clínica</h5>
                        <p>{activeCategory.tagline}</p>
                      </div>

                      <div className="diagnostic-specs-list">
                        <div className="spec-row">
                          <span>Certificación:</span>
                          <strong>Grado Médico CE / FDA</strong>
                        </div>
                        <div className="spec-row">
                          <span>Mantenimiento:</span>
                          <strong>Soporte Oficial Bruce 24/7</strong>
                        </div>
                        <div className="spec-row">
                          <span>Disponibilidad:</span>
                          <strong className="text-green">Despacho Inmediato</strong>
                        </div>
                      </div>

                      <button 
                        className="btn-full-spec"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenProductModal) onOpenProductModal(activeProduct);
                        }}
                      >
                        Abrir Ficha Técnica Completa <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Styled JSX CSS Rules */}
      <style>{`
        .hero-x1000-section {
          position: relative;
          padding: 3.5rem 0 5.5rem 0;
          overflow: hidden;
          background: var(--bg-primary);
        }

        /* Ambient Floating Orbs */
        .hero-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-ambient-glow.glow-teal {
          width: 550px;
          height: 550px;
          top: -140px;
          right: -80px;
          background: rgba(13, 148, 136, 0.12);
          animation: floatOrb 8s ease-in-out infinite alternate;
        }

        .hero-ambient-glow.glow-copper {
          width: 450px;
          height: 450px;
          bottom: -120px;
          left: -80px;
          background: rgba(249, 115, 22, 0.08);
          animation: floatOrb 10s ease-in-out infinite alternate-reverse;
        }

        .hero-ambient-glow.glow-cyan {
          width: 350px;
          height: 350px;
          top: 40%;
          left: 40%;
          background: rgba(6, 182, 212, 0.05);
          animation: floatOrb 12s ease-in-out infinite alternate;
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -25px) scale(1.08); }
        }

        .hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        .hero-x1000-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-left-deck {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-top-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-live-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent-color);
          background: linear-gradient(135deg, rgba(204, 251, 241, 0.85) 0%, rgba(204, 251, 241, 0.45) 100%);
          backdrop-filter: blur(8px);
          padding: 0.45rem 1rem;
          border-radius: 50px;
          width: fit-content;
          border: 1px solid rgba(13, 148, 136, 0.3);
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.1);
        }

        .hero-rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          padding: 0.45rem 0.9rem;
          border-radius: 50px;
          border: 1px solid var(--border-color);
        }

        .stars-row {
          display: flex;
          gap: 0.15rem;
        }

        .live-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
          animation: pulseRing 2s infinite;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(13, 148, 136, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(13, 148, 136, 0);
          }
        }

        .hero-x1000-title {
          font-family: var(--font-heading);
          font-size: 3.1rem;
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.035em;
          color: var(--text-primary);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-color) 0%, #06b6d4 50%, var(--accent-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-x1000-desc {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 580px;
        }

        /* Category Matrix Tabs */
        .smart-category-matrix {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-top: 0.5rem;
        }

        .matrix-tab-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 1.25rem;
          border-radius: 50px;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .matrix-tab-btn:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .matrix-tab-btn.active {
          background: var(--accent-color);
          color: var(--white);
          border-color: var(--accent-color);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.35);
          transform: translateY(-2px);
        }

        .tab-active-glow-bar {
          position: absolute;
          bottom: -4px;
          left: 20%;
          right: 20%;
          height: 3px;
          background: var(--secondary-accent);
          border-radius: 10px;
        }

        .category-clinical-banner {
          position: relative;
          padding: 0.95rem 1.35rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 0.93rem;
          color: var(--text-secondary);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .banner-accent-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, var(--accent-color), var(--accent-dark));
        }

        .text-copper {
          color: var(--secondary-accent);
          flex-shrink: 0;
        }

        .hero-trust-bar {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          padding-top: 0.25rem;
        }

        .trust-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .text-teal {
          color: var(--accent-color);
        }

        .text-orange {
          color: var(--secondary-accent);
        }

        .text-green {
          color: #10b981;
        }

        .hero-main-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }

        .btn-accent-hero {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.75rem;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.98rem;
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          color: var(--white);
          border: none;
          box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
          cursor: pointer;
          transition: all 0.25s ease;
          overflow: hidden;
        }

        .btn-accent-hero:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(13, 148, 136, 0.45);
        }

        .btn-whatsapp-quote {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.9rem 1.6rem;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.98rem;
          background: #25d366;
          color: var(--white);
          border: none;
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.25);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-whatsapp-quote:hover {
          background: #20ba5a;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(37, 211, 102, 0.38);
        }

        /* Right Column Showcase */
        .hero-right-showcase {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          align-items: center;
        }

        .view-mode-switcher-bar {
          display: flex;
          padding: 0.35rem;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          gap: 0.25rem;
          box-shadow: var(--shadow-sm);
        }

        .mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.1rem;
          border-radius: 50px;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mode-btn.active {
          background: var(--white);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        /* 3D Perspective Card Container */
        .perspective-container {
          perspective: 1200px;
          width: 100%;
          max-width: 440px;
        }

        .showcase-3d-card {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 
            0 25px 50px -12px rgba(15, 23, 42, 0.12),
            0 0 0 1px rgba(13, 148, 136, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.9);
          transform-style: preserve-3d;
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .showcase-3d-card:hover {
          border-color: rgba(13, 148, 136, 0.35);
          box-shadow: 
            0 30px 60px -12px rgba(13, 148, 136, 0.2),
            0 0 0 1px rgba(13, 148, 136, 0.25);
        }

        .card-specular-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          transition: background 0.1s ease;
        }

        .card-image-stage {
          height: 260px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.25rem;
          overflow: hidden;
          transition: background 0.5s ease;
        }

        .card-top-badges {
          position: absolute;
          top: 1.1rem;
          left: 1.1rem;
          right: 1.1rem;
          display: flex;
          justify-content: space-between;
          z-index: 5;
        }

        .brand-tag {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 0.28rem 0.75rem;
          border-radius: 50px;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .urgency-tag {
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 0.28rem 0.75rem;
          border-radius: 50px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: var(--shadow-sm);
        }

        .card-hero-img {
          max-height: 190px;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.12));
        }

        .showcase-3d-card:hover .card-hero-img {
          transform: scale(1.08);
        }

        .card-svg-wrapper {
          width: 165px;
          height: 165px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hotspots */
        .hotspot-pin {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 8;
        }

        .hotspot-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0.5;
          animation: pulseRing 1.8s infinite;
        }

        .hotspot-core {
          position: relative;
          z-index: 2;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-color), var(--accent-dark));
          color: var(--white);
          font-size: 0.8rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
        }

        .hotspot-popover {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          padding: 0.75rem 0.95rem;
          border-radius: 14px;
          background: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(12px);
          color: var(--white);
          box-shadow: var(--shadow-lg);
          pointer-events: none;
          z-index: 20;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .popover-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--accent-light);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.2rem;
        }

        .popover-desc {
          font-size: 0.74rem;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.85);
        }

        /* Card Content Stage */
        .card-content-stage {
          padding: 1.6rem 1.85rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .card-header-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .card-cat-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .view-mode-panel {
          display: flex;
          flex-direction: column;
          gap: 1.05rem;
        }

        .variants-selector-box {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .selector-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .variant-pills-row {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .variant-pill {
          font-size: 0.78rem;
          font-family: var(--font-body);
          font-weight: 600;
          padding: 0.32rem 0.75rem;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .variant-pill:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .variant-pill.selected {
          background: var(--accent-light);
          border-color: var(--accent-color);
          color: var(--accent-dark);
          font-weight: 700;
        }

        .quantity-urgency-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-secondary);
          padding: 0.55rem 0.95rem;
          border-radius: 14px;
          border: 1px solid var(--border-color);
        }

        .quantity-counter {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .qty-btn:hover {
          background: var(--accent-color);
          color: var(--white);
          border-color: var(--accent-color);
        }

        .qty-val {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.98rem;
          color: var(--text-primary);
          min-width: 16px;
          text-align: center;
        }

        .live-viewers-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .card-footer-checkout {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.9rem;
          border-top: 1px solid var(--border-color);
        }

        .price-stack {
          display: flex;
          flex-direction: column;
        }

        .subtotal-price {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .tax-notice {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .actions-cluster {
          display: flex;
          gap: 0.5rem;
        }

        .inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.65rem 0.95rem;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .inspect-btn:hover {
          background: var(--white);
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .buy-now-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.65rem 1.25rem;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          color: var(--white);
          border: none;
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.28);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .buy-now-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(13, 148, 136, 0.4);
        }

        .buy-now-btn.added {
          background: #10b981;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
        }

        /* Diagnostic Mode Panel */
        .diagnostic-panel {
          gap: 0.85rem;
        }

        .diagnostic-spec-card {
          background: rgba(13, 148, 136, 0.07);
          padding: 0.9rem 1.1rem;
          border-radius: 14px;
          border-left: 4px solid var(--accent-color);
        }

        .diagnostic-spec-card h5 {
          font-size: 0.84rem;
          font-weight: 800;
          color: var(--accent-color);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.25rem;
        }

        .diagnostic-spec-card p {
          font-size: 0.82rem;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        .diagnostic-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          padding: 0.35rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .spec-row span {
          color: var(--text-tertiary);
        }

        .spec-row strong {
          color: var(--text-primary);
        }

        .btn-full-spec {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.7rem;
          border-radius: 12px;
          background: var(--text-primary);
          color: var(--white);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.25rem;
        }

        .btn-full-spec:hover {
          background: var(--accent-color);
          box-shadow: 0 6px 18px rgba(13, 148, 136, 0.3);
        }

        @media (max-width: 1024px) {
          .hero-x1000-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-x1000-title {
            font-size: 2.35rem;
          }
          .perspective-container {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
