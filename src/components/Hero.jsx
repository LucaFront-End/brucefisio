import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Activity, ShoppingCart, Check } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function Hero({ onShopClick, onSpecialtyClick, onQuickAdd, products = PRODUCTS }) {
  const [activeStep, setActiveStep] = useState(1);
  const [addedItem, setAddedItem] = useState(null); // 'prod-1' | 'prod-6' | 'prod-2' | null

  const sortedProducts = products.length > 0 ? [...products].sort((a, b) => b.price - a.price) : [];
  
  // Grab top 3 highest priced products for the hero showcase
  const pulseProduct = sortedProducts[0] || { price: 3899, name: "Cargando catálogo..." };
  const kinesioProduct = sortedProducts[1] || { price: 320, name: "Cargando catálogo..." };
  const chattanoogaProduct = sortedProducts[2] || { price: 7499, name: "Cargando catálogo..." };

  // Throttled scroll listener to change step highlights (reduces re-renders)
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      let currentStep = 1;
      if (sy > 120 && sy <= 240) {
        currentStep = 2;
      } else if (sy > 240) {
        currentStep = 3;
      }
      setActiveStep(prev => prev !== currentStep ? currentStep : prev);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollY } = useScroll();

  // HIGH-PERFORMANCE GPU MOTION TRANSFORMS (No component re-renders)
  // 1. Sweeper Laser Line
  const laserTop = useTransform(scrollY, [0, 320], ["10%", "88%"]);
  const laserOpacity = useTransform(scrollY, [0, 320, 350], [0.85, 0.85, 0]);

  // 2. Anatomical Healing Dots Opacities & Pulsing scale
  const cRedOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const cTealOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const cScale = useTransform(scrollY, [0, 100], [1, 1.2]);

  const sRedOpacity = useTransform(scrollY, [40, 200], [1, 0]);
  const sTealOpacity = useTransform(scrollY, [40, 200], [0, 1]);
  const sScale = useTransform(scrollY, [40, 200], [1, 1.2]);

  const lRedOpacity = useTransform(scrollY, [100, 300], [1, 0]);
  const lTealOpacity = useTransform(scrollY, [100, 300], [0, 1]);
  const lScale = useTransform(scrollY, [100, 300], [1, 1.2]);

  // 3. E-commerce Cards Sliding/Fading
  const neckCardOpacity = useTransform(scrollY, [20, 100], [0, 1]);
  const neckCardX = useTransform(scrollY, [20, 100], [-30, 0]);

  const shoulderCardOpacity = useTransform(scrollY, [120, 200], [0, 1]);
  const shoulderCardX = useTransform(scrollY, [120, 200], [30, 0]);

  const lumbarCardOpacity = useTransform(scrollY, [200, 300], [0, 1]);
  const lumbarCardX = useTransform(scrollY, [200, 300], [-30, 0]);

  const handleBuyClick = (product) => {
    if (!onQuickAdd) return;
    onQuickAdd(product);
    setAddedItem(product.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  return (
    <section className="hero-scroll-container">
      {/* Sticky container wrapper */}
      <div className="hero-sticky-wrapper">
        {/* Decorative glows */}
        <div className="hero-bg-glow glow-1"></div>
        <div className="hero-bg-glow glow-2"></div>

        <div className="container hero-container grid-2">
          {/* Left Column: Descriptions & Interactive Stepper */}
          <div className="hero-content">
            <div className="hero-tag">
              <span className="tag-pulse"></span>
              Diagnóstico e Insumos de Fisioterapia
            </div>
            
            <h1 className="display-large hero-title">
              Redefiniendo la <br />
              <span className="text-gradient">Fisioterapia</span> de <br />
              Alta Especialidad
            </h1>
            
            <p className="hero-description">
              Haz <strong>scroll hacia abajo</strong> para activar nuestro escáner bio-térmico y ver cómo estimulamos la recuperación muscular.
            </p>

            {/* Scroll Stepper */}
            <div className="stepper-visual-list">
              <div className={`step-item-hero ${activeStep === 1 ? "active" : ""}`}>
                <span className="step-num">1</span>
                <div>
                  <h4>Alivio Cervical (Cuello)</h4>
                  <p>Estimulación por percusión profunda para relajar fibras musculares contracturadas.</p>
                </div>
              </div>
              <div className={`step-item-hero ${activeStep === 2 ? "active" : ""}`}>
                <span className="step-num">2</span>
                <div>
                  <h4>Estabilidad Articular (Hombro)</h4>
                  <p>Vendaje neuromuscular para dar soporte estructural y mejorar flujo sanguíneo.</p>
                </div>
              </div>
              <div className={`step-item-hero ${activeStep === 3 ? "active" : ""}`}>
                <span className="step-num">3</span>
                <div>
                  <h4>Rehabilitación Lumbar (Espalda)</h4>
                  <p>Electroterapia clínica de canales para desinflamar y recuperar tejidos.</p>
                </div>
              </div>
            </div>

            <div className="hero-actions-footer">
              <button className="btn btn-accent" onClick={onShopClick}>
                Ir a la Tienda <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Muscular Torso Scan & E-commerce Products Integration */}
          <div className="hero-visual">
            <div className="visual-wrapper heatmap-wrapper">
              
              {/* Circular Medical Grid */}
              <div className="circle-bg">
                <svg viewBox="0 0 100 100" className="animated-pulse-circle">
                  <circle cx="50" cy="50" r="46" stroke="rgba(13, 148, 136, 0.05)" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
                  <circle cx="50" cy="50" r="34" stroke="rgba(13, 148, 136, 0.08)" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              {/* Sweeping Laser Line (GPU transform style) */}
              <motion.div 
                className="laser-scan-line" 
                style={{ 
                  top: laserTop, 
                  opacity: laserOpacity 
                }} 
              />

              {/* Detailed Realist-clinical Muscular Torso SVG */}
              <div className="anatomy-container">
                <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="anatomical-body-svg">
                  {/* Outer Silhouette */}
                  <path 
                    d="M50 12 C44 12, 42 16, 42 20 C42 24, 38 27, 34 27 C28 27, 24 31, 23 38 C22 43, 24 53, 24 63 C24 73, 21 83, 21 93 C21 103, 25 118, 25 133 H75 C75 118, 79 103, 79 93 C79 83, 76 73, 76 63 C76 53, 78 43, 77 38 C76 31, 72 27, 66 27 C62 27, 58 24, 58 20 C58 16, 56 12, 50 12 Z" 
                    stroke="var(--border-color)" 
                    strokeWidth="1.2" 
                    fill="rgba(255, 255, 255, 0.55)" 
                  />

                  {/* Muscle Detail Layers */}
                  <path d="M42 20 C45 23, 47 25, 50 25 C53 25, 55 23, 58 20" stroke="var(--border-color)" strokeWidth="0.8" />
                  <path d="M45 15 C46 19, 48 22, 50 22 C52 22, 54 19, 55 15" stroke="var(--border-color)" strokeWidth="0.6" />

                  {/* Shoulders / Deltoids */}
                  <path d="M34 27 C30 30, 26 36, 25 43" stroke="var(--border-color)" strokeWidth="0.9" />
                  <path d="M66 27 C70 30, 74 36, 75 43" stroke="var(--border-color)" strokeWidth="0.9" />
                  <path d="M32 32 C28 35, 26 40, 25 45" stroke="var(--border-color)" strokeWidth="0.6" />
                  <path d="M68 32 C72 35, 74 40, 75 45" stroke="var(--border-color)" strokeWidth="0.6" />

                  {/* Chest / Pectorals */}
                  <path d="M34 27 C38 35, 45 42, 50 42 C55 42, 62 35, 66 27" stroke="var(--border-color)" strokeWidth="0.9" />
                  <path d="M50 42 V70" stroke="var(--border-color)" strokeWidth="0.8" />
                  <path d="M32 40 C38 41, 44 42, 50 42 C56 42, 62 41, 68 40" stroke="var(--border-color)" strokeWidth="0.8" />

                  {/* Ribs / Serratus anterior */}
                  <path d="M29 52 C32 54, 35 55, 38 54" stroke="var(--border-color)" strokeWidth="0.5" />
                  <path d="M71 52 C68 54, 65 55, 62 54" stroke="var(--border-color)" strokeWidth="0.5" />
                  <path d="M29 60 C32 62, 35 63, 38 62" stroke="var(--border-color)" strokeWidth="0.5" />
                  <path d="M71 60 C68 62, 65 63, 62 62" stroke="var(--border-color)" strokeWidth="0.5" />

                  {/* Abdominals */}
                  <path d="M35 55 C40 58, 45 59, 50 59 C55 59, 60 58, 65 55" stroke="var(--border-color)" strokeWidth="0.75" />
                  <path d="M37 68 C41 71, 45 72, 50 72 C55 72, 59 71, 63 68" stroke="var(--border-color)" strokeWidth="0.75" />
                  <path d="M38 80 C42 83, 46 84, 50 84 C54 84, 58 83, 62 80" stroke="var(--border-color)" strokeWidth="0.75" />
                  <path d="M42 59 V84" stroke="var(--border-color)" strokeWidth="0.5" />
                  <path d="M58 59 V84" stroke="var(--border-color)" strokeWidth="0.5" />

                  {/* Spinal Column */}
                  <path d="M50 25 V125" stroke="var(--border-color)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Pain & Recovery Dots */}
                  {/* Neck Dot */}
                  <motion.circle cx="50" cy="24" r="4.5" fill="#ef4444" style={{ opacity: cRedOpacity, scale: cScale }} className="pulse-spot" />
                  <motion.circle cx="50" cy="24" r="9" stroke="#ef4444" strokeWidth="0.5" fill="none" style={{ opacity: cRedOpacity, scale: cScale }} className="pulse-ring" />
                  <motion.circle cx="50" cy="24" r="4.5" fill="#0d9488" style={{ opacity: cTealOpacity }} />
                  <motion.circle cx="50" cy="24" r="9" stroke="#0d9488" strokeWidth="0.5" fill="none" style={{ opacity: cTealOpacity }} />

                  {/* Shoulder Dot */}
                  <motion.circle cx="31" cy="36" r="4.5" fill="#ef4444" style={{ opacity: sRedOpacity, scale: sScale }} className="pulse-spot" />
                  <motion.circle cx="31" cy="36" r="9" stroke="#ef4444" strokeWidth="0.5" fill="none" style={{ opacity: sRedOpacity, scale: sScale }} className="pulse-ring" />
                  <motion.circle cx="31" cy="36" r="4.5" fill="#0d9488" style={{ opacity: sTealOpacity }} />
                  <motion.circle cx="31" cy="36" r="9" stroke="#0d9488" strokeWidth="0.5" fill="none" style={{ opacity: sTealOpacity }} />

                  {/* Lumbar Dot */}
                  <motion.circle cx="50" cy="92" r="4.5" fill="#ef4444" style={{ opacity: lRedOpacity, scale: lScale }} className="pulse-spot" />
                  <motion.circle cx="50" cy="92" r="9" stroke="#ef4444" strokeWidth="0.5" fill="none" style={{ opacity: lRedOpacity, scale: lScale }} className="pulse-ring" />
                  <motion.circle cx="50" cy="92" r="4.5" fill="#0d9488" style={{ opacity: lTealOpacity }} />
                  <motion.circle cx="50" cy="92" r="9" stroke="#0d9488" strokeWidth="0.5" fill="none" style={{ opacity: lTealOpacity }} />
                </svg>
              </div>

              {/* PRODUCT OFFERS SLIDING IN ON SCROLL */}
              {/* Product 1: Bruce Pro Pulse */}
              <motion.div 
                style={{ opacity: neckCardOpacity, x: neckCardX }}
                className="hero-sales-card card-neck glass"
              >
                <span className="card-badge cervical-badge">Alivio Cuello</span>
                <h5>{pulseProduct.name}</h5>
                <div className="card-buy-row">
                  <span className="card-price">${pulseProduct.price.toLocaleString()}</span>
                  <button 
                    className={`buy-dot ${addedItem === pulseProduct.id ? "added" : ""}`}
                    onClick={() => handleBuyClick(pulseProduct)}
                    title="Añadir al carrito"
                  >
                    {addedItem === pulseProduct.id ? <Check size={14} /> : <ShoppingCart size={14} />}
                  </button>
                </div>
              </motion.div>

              {/* Product 2: Kinesio Tape */}
              <motion.div 
                style={{ opacity: shoulderCardOpacity, x: shoulderCardX }}
                className="hero-sales-card card-shoulder glass"
              >
                <span className="card-badge shoulder-badge">Estabilidad</span>
                <h5>{kinesioProduct.name}</h5>
                <div className="card-buy-row">
                  <span className="card-price">${kinesioProduct.price.toLocaleString()}</span>
                  <button 
                    className={`buy-dot ${addedItem === kinesioProduct.id ? "added" : ""}`}
                    onClick={() => handleBuyClick(kinesioProduct)}
                    title="Añadir al carrito"
                  >
                    {addedItem === kinesioProduct.id ? <Check size={14} /> : <ShoppingCart size={14} />}
                  </button>
                </div>
              </motion.div>

              {/* Product 3: Chattanooga TENS */}
              <motion.div 
                style={{ opacity: lumbarCardOpacity, x: lumbarCardX }}
                className="hero-sales-card card-lumbar glass"
              >
                <span className="card-badge lumbar-badge">Terapia Lumbar</span>
                <h5>{chattanoogaProduct.name}</h5>
                <div className="card-buy-row">
                  <span className="card-price">${chattanoogaProduct.price.toLocaleString()}</span>
                  <button 
                    className={`buy-dot ${addedItem === chattanoogaProduct.id ? "added" : ""}`}
                    onClick={() => handleBuyClick(chattanoogaProduct)}
                    title="Añadir al carrito"
                  >
                    {addedItem === chattanoogaProduct.id ? <Check size={14} /> : <ShoppingCart size={14} />}
                  </button>
                </div>
              </motion.div>

              {/* Diagnostic Overlays */}
              <div className="widget-floating widget-1 anatomy-widget glass">
                <div className="widget-icon text-red">●</div>
                <div>
                  <h5>Zonas Activas</h5>
                  <span className="bold-stat">{activeStep === 1 ? 3 : activeStep === 2 ? 2 : 0} áreas con dolor</span>
                </div>
              </div>

              <div className="widget-floating widget-2 anatomy-widget glass">
                <div className="widget-icon text-accent">♥</div>
                <div>
                  <h5>Rehabilitación</h5>
                  <span className="bold-stat">{activeStep === 1 ? 15 : activeStep === 2 ? 55 : 100}% Eficiencia</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-scroll-container {
          position: relative;
          background: var(--bg-primary);
        }
        
        /* Sticky Layout - Desktop Only */
        @media (min-width: 1025px) {
          .hero-scroll-container {
            height: 180vh; /* scroll timeline */
          }
          .hero-sticky-wrapper {
            position: sticky;
            top: var(--navbar-height);
            height: calc(100vh - var(--navbar-height));
            display: flex;
            align-items: center;
          }
        }

        /* Non-sticky static layout - Mobile & Tablet Only */
        @media (max-width: 1024px) {
          .hero-scroll-container {
            height: auto;
            padding: 2rem 0;
          }
          .hero-sticky-wrapper {
            position: relative;
            height: auto;
          }
        }
        
        .hero-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.45;
          z-index: 0;
          pointer-events: none;
        }
        
        .glow-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%);
          top: -50px;
          right: -100px;
        }
        
        .glow-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--secondary-light) 0%, transparent 70%);
          bottom: -50px;
          left: -100px;
        }
        
        .hero-container {
          z-index: 1;
          height: 100%;
          align-items: center;
        }
        
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-right: 1.5rem;
        }
        
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent-light);
          color: var(--accent-dark);
          padding: 0.4rem 0.9rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.8rem;
          font-family: var(--font-heading);
          margin-bottom: 1rem;
        }
        
        .tag-pulse {
          width: 8px;
          height: 8px;
          background-color: var(--accent-color);
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(13, 148, 136, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
        }
        
        .hero-title {
          margin-bottom: 1rem;
          font-weight: 800;
          line-height: 1.15;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 500px;
        }

        /* Stepper Visual List */
        .stepper-visual-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
          width: 100%;
        }

        .step-item-hero {
          display: flex;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: all var(--transition-medium);
          opacity: 0.45;
        }

        .step-item-hero.active {
          opacity: 1;
          background: var(--white);
          border-color: var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          transition: all var(--transition-medium);
        }

        .step-item-hero.active .step-num {
          background: var(--accent-color);
          color: var(--white);
        }

        .step-item-hero h4 {
          font-size: 0.95rem;
          margin-bottom: 0.15rem;
        }

        .step-item-hero p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        
        .hero-actions-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        /* Visual Panel */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        
        .visual-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .circle-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .animated-pulse-circle {
          width: 100%;
          height: 100%;
          animation: spin 70s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Anatomical Human Torso (Scaled by Viewport Height for zero-cutoff) */
        .anatomy-container {
          height: 52vh;
          max-height: 370px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .anatomical-body-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 12px 24px rgba(15, 23, 42, 0.04));
        }
        
        /* Laser scanner line */
        .laser-scan-line {
          position: absolute;
          left: 15%;
          right: 15%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent-color), var(--accent-dark), var(--accent-color), transparent);
          box-shadow: 0 0 10px rgba(13, 148, 136, 0.5), 0 0 4px rgba(13, 148, 136, 0.7);
          z-index: 3;
          pointer-events: none;
          /* Driven by GPU translate style */
        }
        
        /* Pulsing dots */
        .pulse-spot {
          transform-origin: center;
          animation: scalePulse 1.2s infinite alternate;
        }
        
        .pulse-ring {
          transform-origin: center;
          animation: ringPulse 1.8s infinite ease-out;
        }
        
        @keyframes scalePulse {
          0% { transform: scale(0.9); }
          100% { transform: scale(1.15); }
        }
        
        @keyframes ringPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        
        /* E-COMMERCE CARDS ALIGNMENT (Centered columns, no-overlap) */
        .hero-sales-card {
          position: absolute;
          width: 145px;
          padding: 0.8rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: var(--shadow-md);
          z-index: 5;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          transition: border-color var(--transition-fast);
        }

        .hero-sales-card:hover {
          border-color: var(--accent-color);
          box-shadow: var(--shadow-lg);
        }

        .card-badge {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          width: fit-content;
        }

        .cervical-badge { background: #fee2e2; color: #b91c1c; }
        .shoulder-badge { background: #dbeafe; color: #1e40af; }
        .lumbar-badge { background: #dcfce7; color: #166534; }

        .hero-sales-card h5 {
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.25;
          color: var(--text-primary);
        }

        .card-buy-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.15rem;
          border-top: 1px solid var(--border-color);
          padding-top: 0.35rem;
        }

        .card-price {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          color: var(--text-primary);
        }

        .buy-dot {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--text-primary);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .buy-dot:hover {
          background: var(--accent-color);
        }

        .buy-dot.added {
          background: #25d366;
        }

        /* Responsive relative placements */
        .card-neck {
          top: 10%;
          right: 100%;
          margin-right: 10px;
        }

        .card-shoulder {
          top: 25%;
          left: 100%;
          margin-left: 10px;
        }

        .card-lumbar {
          top: 60%;
          right: 100%;
          margin-right: 10px;
        }
        
        /* Floating diagnostics widgets */
        .widget-floating {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1rem;
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          z-index: 3;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        .anatomy-widget {
          min-width: 155px;
        }
        
        .widget-1 {
          top: 4%;
          right: 8%;
        }
        
        .widget-2 {
          bottom: 4%;
          left: 8%;
        }
        
        .widget-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.85rem;
          box-shadow: var(--shadow-sm);
        }
        
        .text-red {
          color: #ef4444;
          animation: flash 1s infinite alternate;
        }
        
        @keyframes flash {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        
        .widget-floating h5 {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .bold-stat {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          color: var(--text-primary);
          display: block;
          margin-top: 1px;
        }
        
        /* Mobile and Tablet styling adjustments */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-content {
            padding-right: 0;
            align-items: center;
            text-align: center;
          }
          .hero-description {
            max-width: 100%;
          }
          .stepper-visual-list {
            max-width: 500px;
            text-align: left;
          }
          .visual-wrapper {
            max-width: 100%;
            height: auto;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.5rem 0;
          }
          .anatomy-container {
            height: 340px;
          }
          .hero-sales-card {
            position: relative;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 0 auto;
            width: 100%;
            max-width: 280px;
            opacity: 1 !important;
            transform: none !important;
          }
          .widget-1, .widget-2 {
            position: relative;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: 100%;
            max-width: 280px;
            margin: 0 auto;
          }
          .laser-scan-line {
            display: none; /* Hide line on non-sticky mobile */
          }
          .circle-bg {
            display: none;
          }
        }

        /* Adjustments for short viewport heights (e.g. 700px - 800px laptops) */
        @media (max-height: 800px) and (min-width: 1025px) {
          .hero-title {
            font-size: 2.25rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.15 !important;
          }
          .hero-description {
            font-size: 0.85rem !important;
            margin-bottom: 1.25rem !important;
          }
          .stepper-visual-list {
            gap: 0.75rem !important;
            margin-bottom: 1.5rem !important;
          }
          .step-item-hero {
            padding: 0.5rem 0.75rem !important;
          }
          .visual-wrapper {
            height: 440px !important;
          }
          .anatomy-container {
            height: 44vh !important;
            max-height: 310px !important;
          }
          .card-neck { top: 6% !important; }
          .card-shoulder { top: 22% !important; }
          .card-lumbar { top: 56% !important; }
        }
      `}</style>
    </section>
  );
}
