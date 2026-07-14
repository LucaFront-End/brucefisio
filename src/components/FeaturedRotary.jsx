import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Eye, Check } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function FeaturedRotary({ onOpenProductModal, onQuickAdd, products = PRODUCTS }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedItem, setAddedItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic products list for the rotary
  const ROTARY_PRODUCTS = products.slice(0, 5);

  // Auto-rotate carousel every 8 seconds, pausing on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ROTARY_PRODUCTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ROTARY_PRODUCTS.length) % ROTARY_PRODUCTS.length);
  };

  const handleBuyClick = (e, product) => {
    e.stopPropagation(); // Prevent active node trigger
    if (!onQuickAdd) return;
    onQuickAdd(product);
    setAddedItem(product.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  return (
    <section 
      className="rotary-section container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rotary-layout-grid">
        {/* Left Side: Editorial Introduction & Controls */}
        <div className="rotary-intro-panel">
          <span className="section-label">Línea Destacada</span>
          <h2 className="heading-section">Selección Premium para Fisioterapia</h2>
          <p className="rotary-intro-desc">
            Tecnología innovadora diseñada para optimizar los tratamientos de rehabilitación. 
            Inspecciona las tarjetas en el carrusel circular interactivo y agrégalas directamente a tu cotización.
          </p>

          <div className="rotary-controls">
            <button className="ctrl-arrow-btn" onClick={handlePrev} title="Anterior">
              <ChevronLeft size={20} />
            </button>
            <div className="ctrl-bullets">
              {ROTARY_PRODUCTS.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`bullet ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
            <button className="ctrl-arrow-btn" onClick={handleNext} title="Siguiente">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Side: Tilted 3D Cylinder Card Carousel with Depth of Field & Lighting Shading */}
        <div className="rotary-carousel-panel">
          <div className="rotary-carousel-viewport">
            
            {/* ROTATING SPOKE WHEEL GRAPHIC (With active radar pulses at tips) */}
            <div className="rotary-wheel-graphic">
              <svg 
                viewBox="0 0 100 100" 
                className="wheel-svg"
                style={{ 
                  transform: `rotate(${activeIndex * -72}deg)`,
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Concentric rings */}
                <circle cx="50" cy="50" r="44" stroke="rgba(13, 148, 136, 0.16)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
                <circle cx="50" cy="50" r="41" stroke="rgba(13, 148, 136, 0.06)" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="32" stroke="rgba(13, 148, 136, 0.05)" strokeWidth="0.5" fill="none" />
                
                {/* Central hub */}
                <circle cx="50" cy="50" r="6" stroke="rgba(13, 148, 136, 0.2)" strokeWidth="0.75" fill="rgba(255, 255, 255, 0.85)" />
                <circle cx="50" cy="50" r="2" fill="var(--accent-color)" />
                
                {/* 5 Spoke lines with connector pins */}
                {[0, 1, 2, 3, 4].map(idx => {
                  const rad = (idx * 72) * (Math.PI / 180);
                  const sx = 50 + Math.sin(rad) * 6;
                  const sy = 50 - Math.cos(rad) * 6;
                  const ex = 50 + Math.sin(rad) * 44;
                  const ey = 50 - Math.cos(rad) * 44;
                  
                  // Index 0 represents the spoke that rotates to the top (active product position)
                  const isActiveSpoke = idx === 0;

                  return (
                    <g key={idx}>
                      <line 
                        x1={sx} 
                        y1={sy} 
                        x2={ex} 
                        y2={ey} 
                        stroke={isActiveSpoke ? "rgba(13, 148, 136, 0.35)" : "rgba(13, 148, 136, 0.12)"} 
                        strokeWidth={isActiveSpoke ? "0.85" : "0.5"} 
                      />
                      
                      {/* Spoke tip node */}
                      <circle 
                        cx={ex} 
                        cy={ey} 
                        r={isActiveSpoke ? "2" : "1.2"} 
                        fill={isActiveSpoke ? "var(--accent-color)" : "rgba(13, 148, 136, 0.3)"} 
                      />

                      {/* Radar pulse effect at active tip */}
                      {isActiveSpoke && (
                        <circle 
                          cx={ex} 
                          cy={ey} 
                          r="4" 
                          stroke="var(--accent-color)" 
                          strokeWidth="0.5" 
                          fill="none" 
                          className="pulse-ring"
                          style={{ transformOrigin: `${ex}px ${ey}px` }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Rotating Product Cards */}
            {ROTARY_PRODUCTS.map((prod, i) => {
              const N = ROTARY_PRODUCTS.length;
              const angle = ((i - activeIndex) * (360 / N)) * (Math.PI / 180);
              
              // Coordinates on ellipse (Rx = 175px, Ry = 95px)
              const rx = 175;
              const ry = 95;
              const x = Math.sin(angle) * rx;
              const y = -Math.cos(angle) * ry;

              // Perspective calculations
              const depthFactor = (1 - Math.cos(angle)) / 2; // 0 in front, 1 in back
              const scale = 1.15 - depthFactor * 0.45; // Front: 1.15, Back: 0.7
              const opacity = 1 - depthFactor * 0.4; // Front: 1, Back: 0.6
              const zIndex = 15 - Math.round(depthFactor * 10);
              const isActive = i === activeIndex;

              // Tilt Cards on Y axis to simulate cylindrical rotation
              const rotateY = angle * (180 / Math.PI) * 0.55;

              // CINEMATIC GRAPHIC FILTERS (Depth of field blur & 3D light shading)
              const blurVal = depthFactor * 3.5; // blur background cards up to 3.5px
              const brightnessVal = 1 - depthFactor * 0.35; // shade background cards down to 65% brightness
              const cardFilter = isActive 
                ? "none" 
                : `blur(${blurVal}px) brightness(${brightnessVal})`;

              return (
                <motion.div
                  key={prod.id}
                  animate={{ 
                    x: x, 
                    y: y, 
                    scale: scale, 
                    opacity: opacity,
                    zIndex: zIndex,
                    rotateY: rotateY,
                    filter: cardFilter
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 90, 
                    damping: 16 
                  }}
                  className={`rotary-card-node ${isActive ? "active-node" : ""}`}
                  onClick={() => {
                    if (isActive) {
                      onOpenProductModal(prod);
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                  style={{ position: "absolute" }}
                >
                  {/* REALISTIC E-COMMERCE CARD WITH GLASS GLARE SHEEN */}
                  <div className="rotary-product-card glass">
                    {/* Hover reflection sheen overlay */}
                    <div className="card-glass-glare"></div>

                    {/* Image Header */}
                    <div className="card-img-header" style={{ background: prod.imageBg }}>
                      {prod.imageSvg ? (
                        <div 
                          className="card-svg"
                          dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                        />
                      ) : (
                        <img src={prod.image} alt={prod.name} className="rotary-card-img" />
                      )}
                    </div>

                    {/* Card Content Info */}
                    <div className="card-info">
                      <span className="card-brand">{prod.brand}</span>
                      <h4 className="card-title">{prod.name}</h4>
                      
                      <div className="card-footer-row">
                        <span className="card-price">${prod.price.toLocaleString()}</span>
                        
                        <div className="card-actions">
                          {isActive ? (
                            <>
                              <button 
                                className="action-circle view-btn"
                                onClick={() => onOpenProductModal(prod)}
                                title="Ver variantes y detalles"
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className={`action-circle buy-btn ${addedItem === prod.id ? "success" : ""}`}
                                onClick={(e) => handleBuyClick(e, prod)}
                                disabled={addedItem === prod.id}
                                title="Añadir rápido al carrito"
                              >
                                {addedItem === prod.id ? <Check size={12} /> : <ShoppingCart size={12} />}
                              </button>
                            </>
                          ) : (
                            <span className="click-to-inspect">Girar</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Card Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="cardActiveGlow" 
                      className="card-active-glow-shadow"
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Circular shadow floor reflection */}
            <div className="carousel-reflection-floor"></div>

          </div>
        </div>
      </div>

      <style>{`
        .rotary-section {
          padding: 6rem 2rem;
          background: var(--bg-primary);
          overflow: hidden;
        }
        
        .rotary-layout-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 4rem;
          align-items: center;
        }
        
        /* Intro text panel */
        .rotary-intro-panel {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .rotary-intro-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        /* Stepper navigation arrows */
        .rotary-controls {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .ctrl-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          background: var(--white);
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        
        .ctrl-arrow-btn:hover {
          background: var(--text-primary);
          color: var(--white);
          border-color: var(--text-primary);
        }
        
        .ctrl-bullets {
          display: flex;
          gap: 0.65rem;
        }
        
        .bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-tertiary);
          transition: all var(--transition-fast);
        }
        
        .bullet.active {
          width: 24px;
          border-radius: 4px;
          background: var(--accent-color);
        }
        
        /* Circular 3D Carousel Viewport */
        .rotary-carousel-panel {
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .rotary-carousel-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1100px; /* Enables 3D perspective space */
        }
        
        /* Rotating spoke wheel graphic behind cards */
        .rotary-wheel-graphic {
          position: absolute;
          width: 440px;
          height: 440px;
          transform: scaleY(0.55); /* Squashes the circle */
          z-index: 1;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .wheel-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 12px rgba(13, 148, 136, 0.05));
        }

        /* Pulse ring animation at top of spoke wheel */
        .pulse-ring {
          animation: tipRadarPulse 1.8s infinite ease-out;
        }

        @keyframes tipRadarPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        
        .carousel-reflection-floor {
          position: absolute;
          width: 340px;
          height: 50px;
          bottom: 8%;
          background: radial-gradient(ellipse, rgba(13, 148, 136, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }
        
        /* Product Card Nodes */
        .rotary-card-node {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }
        
        .rotary-product-card {
          width: 180px;
          height: 260px;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          z-index: 3;
          transition: all var(--transition-fast);
          pointer-events: auto;
          backface-visibility: hidden;
          position: relative;
        }
        
        /* Glare effect sweeping on card hover */
        .card-glass-glare {
          position: absolute;
          top: 0;
          left: -150%;
          width: 120%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.25) 50%, 
            transparent 100%
          );
          transform: skewX(-25deg);
          z-index: 10;
          pointer-events: none;
          transition: left 0.6s ease;
        }

        .rotary-product-card:hover .card-glass-glare {
          left: 150%;
        }

        /* Header Image Inside Card */
        .card-img-header {
          height: 110px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          transition: transform var(--transition-fast);
        }
        
        .rotary-card-img {
          width: 70%;
          height: 70%;
          object-fit: contain;
        }

        .card-svg {
          width: 60%;
          height: 60%;
          filter: drop-shadow(0 4px 10px rgba(15, 23, 42, 0.15));
        }
        
        .card-svg svg {
          width: 100%;
          height: 100%;
        }
        
        /* Card details */
        .card-info {
          padding: 0.95rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .card-brand {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-heading);
        }
        
        .card-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-top: 0.15rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .card-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 0.65rem;
          margin-top: 0.5rem;
        }
        
        .card-price {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        
        .card-actions {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }
        
        .action-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        
        .view-btn {
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }
        
        .view-btn:hover {
          background: var(--text-primary);
          color: var(--white);
        }
        
        .buy-btn {
          background: var(--text-primary);
          color: var(--white);
        }
        
        .buy-btn:hover {
          background: var(--accent-color);
        }
        
        .buy-btn.success {
          background: #25d366;
        }
        
        .click-to-inspect {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        
        /* Active Node Enhancements */
        .active-node .rotary-product-card {
          border-color: var(--accent-light);
          box-shadow: var(--shadow-lg);
        }
        
        .active-node .card-img-header {
          transform: scale(1.04);
        }
        
        .card-active-glow-shadow {
          position: absolute;
          width: 200px;
          height: 280px;
          border-radius: 22px;
          background: radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, transparent 80%);
          z-index: 1;
          pointer-events: none;
        }

        /* Mobile and Tablet responsive adaptation */
        @media (max-width: 1024px) {
          .rotary-layout-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          .rotary-intro-panel {
            align-items: center;
          }
          .rotary-controls {
            justify-content: center;
          }
          .rotary-carousel-panel {
            height: auto;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 1.5rem 0.5rem;
          }
          .rotary-carousel-viewport {
            display: flex;
            position: relative;
            width: auto;
            height: auto;
            gap: 1.25rem;
          }
          .rotary-card-node {
            position: relative !important;
            transform: none !important;
            opacity: 1 !important;
            x: 0 !important;
            y: 0 !important;
            scale: 1 !important;
            filter: none !important;
          }
          .rotary-wheel-graphic, .carousel-reflection-floor, .card-active-glow-shadow {
            display: none;
          }
          .rotary-product-card {
            width: 170px;
            height: 250px;
            box-shadow: var(--shadow-sm);
          }
          .click-to-inspect {
            display: none;
          }
          .card-actions {
            display: flex !important;
          }
          .card-actions .view-btn, .card-actions .buy-btn {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </section>
  );
}
