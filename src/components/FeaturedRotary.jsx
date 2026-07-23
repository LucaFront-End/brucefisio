import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ShoppingCart, Eye, Check, Sparkles, ShieldCheck, Award, Layers } from "lucide-react";
import { PRODUCTS } from "../data/products";

// Sanitizes raw HTML strings and entities (&nbsp;, <p>, etc.) from Wix
function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getProductHighlights(prod) {
  const text = cleanText(prod.description || "");

  let origin = "Origen Certificado";
  if (text.includes("U.S.A") || text.includes("USA") || text.includes("Origen: U.S.A.")) {
    origin = "Importación U.S.A.";
  } else if (text.includes("Alemania") || text.includes("Germany")) {
    origin = "Importación Alemania";
  }

  let material = "Material de Grado Clínico";
  if (text.toLowerCase().includes("acero inoxidable")) {
    material = "Acero Quirúrgico";
  } else if (text.toLowerCase().includes("aluminio")) {
    material = "Aluminio Aeronáutico";
  } else if (text.toLowerCase().includes("terapéutico")) {
    material = "Grado Terapéutico";
  }

  let capacity = "Uso Profesional 24/7";
  if (text.includes("12 COMPRESAS") || text.includes("12 compresas")) {
    capacity = "Capacidad 12 Compresas";
  } else if (text.includes("6 COMPRESAS") || text.includes("6 compresas")) {
    capacity = "Capacidad 6 Compresas";
  } else if (prod.variables?.options?.length > 0) {
    capacity = `${prod.variables.options.length} Opciones Tamaño`;
  }

  return [
    { icon: ShieldCheck, label: "Estructura", val: material },
    { icon: Award, label: "Garantía", val: "2 Años Cobertura Directa" },
    { icon: Sparkles, label: "Especificación", val: capacity },
    { icon: Layers, label: "Calidad", val: origin }
  ];
}

export default function FeaturedRotary({ onOpenProductModal, onQuickAdd, products = PRODUCTS }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  const containerRef = useRef(null);
  
  // Track scroll progress inside 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Top 5 products for the scroll rotary
  const ROTARY_PRODUCTS = products.slice(0, 5);

  // Bind wheel SVG rotation to scroll progress: 0 to -288 degrees
  const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, -288]);

  // Bind vertical progress bar height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate active index dynamically from scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = ROTARY_PRODUCTS.length;
    const step = 1 / total;
    const idx = Math.min(total - 1, Math.floor(latest / step));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  const activeProduct = ROTARY_PRODUCTS[activeIndex] || ROTARY_PRODUCTS[0];

  const handleBuyClick = (e, product) => {
    e.stopPropagation();
    if (!onQuickAdd) return;
    onQuickAdd(product);
    setAddedItem(product.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  const handleBulletClick = (idx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const sectionHeight = rect.height - window.innerHeight;
    const targetScroll = scrollTop + (idx / (ROTARY_PRODUCTS.length - 1)) * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const cleanDescription = cleanText(activeProduct.description);
  const shortSummary = cleanDescription.length > 100 
    ? cleanDescription.substring(0, 100) + "..." 
    : cleanDescription || "Equipamiento médico certificado para clínicas de fisioterapia y alta especialidad.";
  
  const highlights = getProductHighlights(activeProduct);

  return (
    <section ref={containerRef} className="scroll-rotary-track">
      
      {/* Sticky Viewport */}
      <div className="scroll-rotary-sticky">
        
        {/* Background Glows */}
        <div className="rotary-glow glow-1"></div>
        <div className="rotary-glow glow-2"></div>

        <div className="container rotary-layout-grid">
          
          {/* Left Panel: Scroll Progress & Clean Clinical Specs Deck */}
          <div className="rotary-intro-panel">
            
            <div className="scroll-progress-badge">
              <span className="step-counter">0{activeIndex + 1} / 0{ROTARY_PRODUCTS.length}</span>
              <span className="pulse-indicator">● Selección Premium</span>
            </div>

            <h2 className="heading-section">
              Línea Destacada & <br />
              <span className="text-gradient">Tecnología de Rehabilitación</span>
            </h2>

            {/* Dynamic Active Product Meta Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="active-product-meta-card glass"
              >
                <div className="meta-brand-row">
                  <span className="meta-brand-tag">{activeProduct.brand || "Bruce Médica"}</span>
                  <span className="meta-cat-pill">{activeProduct.category || "Alta Especialidad"}</span>
                </div>

                <h3 className="meta-product-name">{activeProduct.name}</h3>

                {/* Clean Short Summary */}
                <p className="meta-short-summary">{shortSummary}</p>

                {/* 2x2 Clinical Specs Highlights Grid */}
                <div className="highlights-grid">
                  {highlights.map((h, i) => {
                    const HIcon = h.icon;
                    return (
                      <div key={i} className="highlight-item-chip">
                        <HIcon size={14} className="chip-icon text-accent" />
                        <div className="chip-text-block">
                          <span className="chip-label">{h.label}</span>
                          <span className="chip-val">{h.val}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Price & Buttons */}
                <div className="meta-price-action-bar">
                  <div className="meta-price-block">
                    <span className="meta-price-val">${activeProduct.price?.toLocaleString()} MXN</span>
                    <span className="meta-tax-info">IVA Incluido</span>
                  </div>

                  <div className="meta-buttons-group">
                    <button 
                      className="btn-meta-inspect"
                      onClick={() => onOpenProductModal && onOpenProductModal(activeProduct)}
                    >
                      <Eye size={15} /> Ver
                    </button>

                    <button 
                      className={`btn-meta-buy ${addedItem === activeProduct.id ? "added" : ""}`}
                      onClick={(e) => handleBuyClick(e, activeProduct)}
                    >
                      {addedItem === activeProduct.id ? (
                        <><Check size={15} /> ¡Añadido!</>
                      ) : (
                        <><ShoppingCart size={15} /> Comprar</>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Vertical Scroll Progress Bar & Bullet Indicators */}
            <div className="scroll-controls-bar">
              <div className="vertical-track">
                <motion.div 
                  className="vertical-fill" 
                  style={{ height: progressHeight }} 
                />
              </div>

              <div className="rotary-bullets-list">
                {ROTARY_PRODUCTS.map((p, idx) => (
                  <button
                    key={p.id}
                    className={`scroll-bullet-btn ${idx === activeIndex ? "active" : ""}`}
                    onClick={() => handleBulletClick(idx)}
                    title={`Ver ${p.name}`}
                  >
                    <span className="bullet-num">0{idx + 1}</span>
                    <span className="bullet-title">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: Tilted 3D Cylinder Card Showcase */}
          <div className="rotary-carousel-panel">
            <div className="rotary-carousel-viewport">
              
              {/* ROTATING SPOKE WHEEL GRAPHIC */}
              <div className="rotary-wheel-graphic">
                <motion.svg 
                  viewBox="0 0 100 100" 
                  className="wheel-svg"
                  style={{ rotate: wheelRotation }}
                >
                  <circle cx="50" cy="50" r="44" stroke="rgba(13, 148, 136, 0.16)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                  <circle cx="50" cy="50" r="41" stroke="rgba(13, 148, 136, 0.06)" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="32" stroke="rgba(13, 148, 136, 0.05)" strokeWidth="0.5" fill="none" />
                  
                  <circle cx="50" cy="50" r="6" stroke="rgba(13, 148, 136, 0.2)" strokeWidth="0.75" fill="rgba(255, 255, 255, 0.85)" />
                  <circle cx="50" cy="50" r="2" fill="var(--accent-color)" />
                  
                  {[0, 1, 2, 3, 4].map(idx => {
                    const rad = (idx * 72) * (Math.PI / 180);
                    const sx = 50 + Math.sin(rad) * 6;
                    const sy = 50 - Math.cos(rad) * 6;
                    const ex = 50 + Math.sin(rad) * 44;
                    const ey = 50 - Math.cos(rad) * 44;
                    const isActiveSpoke = idx === 0;

                    return (
                      <g key={idx}>
                        <line 
                          x1={sx} y1={sy} x2={ex} y2={ey} 
                          stroke={isActiveSpoke ? "rgba(13, 148, 136, 0.4)" : "rgba(13, 148, 136, 0.12)"} 
                          strokeWidth={isActiveSpoke ? "0.9" : "0.5"} 
                        />
                        <circle 
                          cx={ex} cy={ey} 
                          r={isActiveSpoke ? "2.2" : "1.2"} 
                          fill={isActiveSpoke ? "var(--accent-color)" : "rgba(13, 148, 136, 0.3)"} 
                        />
                      </g>
                    );
                  })}
                </motion.svg>
              </div>

              {/* Rotating Product Cards */}
              {ROTARY_PRODUCTS.map((prod, i) => {
                const N = ROTARY_PRODUCTS.length;
                const angle = ((i - activeIndex) * (360 / N)) * (Math.PI / 180);
                
                const rx = 160;
                const ry = 80;
                const x = Math.sin(angle) * rx;
                const y = -Math.cos(angle) * ry;

                const depthFactor = (1 - Math.cos(angle)) / 2;
                const scale = 1.1 - depthFactor * 0.4;
                const opacity = 1 - depthFactor * 0.4;
                const zIndex = 15 - Math.round(depthFactor * 10);
                const isActive = i === activeIndex;

                const rotateY = angle * (180 / Math.PI) * 0.55;

                const blurVal = depthFactor * 3.5;
                const brightnessVal = 1 - depthFactor * 0.35;
                const cardFilter = isActive ? "none" : `blur(${blurVal}px) brightness(${brightnessVal})`;

                return (
                  <motion.div
                    key={prod.id}
                    animate={{ 
                      x: x, 
                      y: y, 
                      scale: scale, 
                      opacity: opacity,
                      rotateY: rotateY
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      zIndex: zIndex,
                      filter: cardFilter
                    }}
                    className={`rotary-card glass ${isActive ? "active-spotlight" : ""}`}
                    onClick={() => {
                      if (isActive && onOpenProductModal) {
                        onOpenProductModal(prod);
                      } else {
                        handleBulletClick(i);
                      }
                    }}
                  >
                    <div 
                      className="card-img-wrapper"
                      style={{ background: prod.imageBg || "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)" }}
                    >
                      <span className="card-brand-badge">{prod.brand || "Bruce"}</span>
                      {prod.imageSvg ? (
                        <div 
                          className="svg-box"
                          dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                        />
                      ) : (
                        <img src={prod.image} alt={prod.name} className="product-rotary-img" />
                      )}
                    </div>

                    <div className="card-info-body">
                      <span className="cat-tag">{prod.category || "Fisioterapia"}</span>
                      <h4 className="prod-name">{prod.name}</h4>
                      
                      <div className="card-price-row">
                        <span className="price-tag">${prod.price?.toLocaleString()} MXN</span>
                        
                        <button 
                          className={`rotary-buy-btn ${addedItem === prod.id ? "added" : ""}`}
                          onClick={(e) => handleBuyClick(e, prod)}
                          title="Añadir al carrito"
                        >
                          {addedItem === prod.id ? <Check size={14} /> : <ShoppingCart size={14} />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>

      </div>

      {/* Styled JSX CSS Rules */}
      <style>{`
        .scroll-rotary-track {
          position: relative;
          height: 300vh;
          background: var(--bg-primary);
        }

        .scroll-rotary-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 5.5rem 0 1.5rem 0;
        }

        .rotary-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .rotary-glow.glow-1 {
          width: 440px;
          height: 440px;
          top: 10%;
          left: -100px;
          background: rgba(13, 148, 136, 0.08);
        }

        .rotary-glow.glow-2 {
          width: 380px;
          height: 380px;
          bottom: 10%;
          right: -100px;
          background: rgba(249, 115, 22, 0.06);
        }

        .rotary-layout-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 2.5rem;
          align-items: center;
          width: 100%;
        }

        .rotary-intro-panel {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .heading-section {
          font-size: 1.85rem !important;
          line-height: 1.25 !important;
          margin: 0 !important;
        }

        .scroll-progress-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-color);
          background: var(--accent-light);
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          width: fit-content;
          border: 1px solid rgba(13, 148, 136, 0.25);
        }

        .step-counter {
          font-family: var(--font-heading);
          font-weight: 800;
          color: var(--accent-dark);
        }

        .pulse-indicator {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .active-product-meta-card {
          padding: 1.1rem 1.35rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .meta-brand-row {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }

        .meta-brand-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: var(--bg-secondary);
          padding: 0.15rem 0.55rem;
          border-radius: 50px;
          color: var(--text-primary);
        }

        .meta-cat-pill {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--accent-color);
          background: var(--accent-light);
          padding: 0.15rem 0.55rem;
          border-radius: 50px;
        }

        .meta-product-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .meta-short-summary {
          font-size: 0.82rem;
          line-height: 1.4;
          color: var(--text-secondary);
        }

        /* 2x2 Highlights Grid Compact */
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.45rem;
          padding: 0.15rem 0;
        }

        .highlight-item-chip {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(13, 148, 136, 0.05);
          padding: 0.4rem 0.65rem;
          border-radius: 10px;
          border: 1px solid rgba(13, 148, 136, 0.12);
        }

        .chip-icon {
          flex-shrink: 0;
        }

        .chip-text-block {
          display: flex;
          flex-direction: column;
        }

        .chip-label {
          font-size: 0.64rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .chip-val {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .meta-price-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.55rem;
          border-top: 1px solid var(--border-color);
        }

        .meta-price-block {
          display: flex;
          flex-direction: column;
        }

        .meta-price-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .meta-tax-info {
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }

        .meta-buttons-group {
          display: flex;
          gap: 0.4rem;
        }

        .btn-meta-inspect {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.5rem 0.8rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-meta-inspect:hover {
          background: var(--white);
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .btn-meta-buy {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--accent-color);
          color: var(--white);
          border: none;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.22);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-meta-buy:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
        }

        .btn-meta-buy.added {
          background: #10b981;
        }

        /* Scroll Controls & Bullets Compact */
        .scroll-controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 0.15rem;
        }

        .vertical-track {
          position: relative;
          width: 4px;
          height: 90px;
          background: rgba(15, 23, 42, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .vertical-fill {
          width: 100%;
          background: var(--accent-color);
          border-radius: 10px;
        }

        .rotary-bullets-list {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .scroll-bullet-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.15rem 0.4rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          opacity: 0.5;
          transition: all 0.25s ease;
        }

        .scroll-bullet-btn:hover,
        .scroll-bullet-btn.active {
          opacity: 1;
        }

        .scroll-bullet-btn.active .bullet-num {
          color: var(--accent-color);
          font-weight: 800;
        }

        .scroll-bullet-btn.active .bullet-title {
          color: var(--text-primary);
          font-weight: 700;
        }

        .bullet-num {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
        }

        .bullet-title {
          font-size: 0.78rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 210px;
        }

        /* Right Panel Carousel Viewport Compact */
        .rotary-carousel-panel {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .rotary-carousel-viewport {
          position: relative;
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .rotary-wheel-graphic {
          position: absolute;
          width: 360px;
          height: 360px;
          pointer-events: none;
        }

        .wheel-svg {
          width: 100%;
          height: 100%;
        }

        .rotary-card {
          position: absolute;
          width: 240px;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          cursor: pointer;
          transform-style: preserve-3d;
          transition: border-color 0.3s ease;
        }

        .rotary-card.active-spotlight {
          border-color: rgba(13, 148, 136, 0.4);
          box-shadow: 0 16px 36px rgba(13, 148, 136, 0.18);
        }

        .card-img-wrapper {
          height: 145px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .card-brand-badge {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.18rem 0.5rem;
          border-radius: 50px;
          color: var(--text-primary);
        }

        .product-rotary-img {
          max-height: 115px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .rotary-card:hover .product-rotary-img {
          transform: scale(1.06);
        }

        .svg-box {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-info-body {
          padding: 0.95rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .cat-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
        }

        .prod-name {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.3rem;
        }

        .price-tag {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .rotary-buy-btn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: var(--accent-color);
          color: var(--white);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .rotary-buy-btn:hover {
          background: var(--accent-dark);
          transform: scale(1.05);
        }

        .rotary-buy-btn.added {
          background: #10b981;
        }

        @media (max-width: 1024px) {
          .scroll-rotary-track {
            height: auto;
          }
          .scroll-rotary-sticky {
            position: relative;
            height: auto;
            padding: 4rem 0;
          }
          .rotary-layout-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .highlights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
