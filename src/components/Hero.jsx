import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, Award, 
  Sparkles, MessageCircle, AlertTriangle, CheckCircle2, 
  TrendingDown, TrendingUp, Clock, HelpCircle, ChevronRight,
  ShieldAlert, Sparkle, Layers, ArrowUpRight
} from "lucide-react";
import { PRODUCTS } from "../data/products";

// Pain points / Friction items for Slide 2 (CONCISE)
const PAIN_POINTS = [
  {
    id: "dolor-cronico",
    tag: "RETENCIÓN",
    title: "Pacientes que no vuelven por falta de resultados.",
    impactMetric: "-45%",
    impactLabel: "Fuga de Pacientes",
    severityColor: "#ef4444",
    icon: AlertTriangle
  },
  {
    id: "fallas-equipo",
    tag: "OPERACIÓN",
    title: "Citas perdidas por equipos obsoletos que fallan.",
    impactMetric: "$12k+",
    impactLabel: "Fuga Semanal",
    severityColor: "#f97316",
    icon: ShieldAlert
  },
  {
    id: "postop-lento",
    tag: "EFICIENCIA",
    title: "Sesiones eternas estancadas en terapia manual.",
    impactMetric: "3x",
    impactLabel: "Más lentitud",
    severityColor: "#eab308",
    icon: Clock
  },
  {
    id: "competencia",
    tag: "CRECIMIENTO",
    title: "Pacientes robados por clínicas mejor equipadas.",
    impactMetric: "-30%",
    impactLabel: "Pérdida de Mercado",
    severityColor: "#ef4444",
    icon: TrendingDown
  }
];

// Solutions matching each pain point for Slide 3
const SOLUTIONS_MATRIX = [
  {
    id: "dolor-cronico",
    solutionTitle: "Bio-Estimulación Láser 4000Hz",
    tagline: "Alivio Tisular Inmediato",
    description: "Modulación frecuencial que alivia el dolor desde la 1ª sesión y acelera la regeneración celular.",
    metricVal: "3x MÁS RÁPIDO",
    metricDesc: "Regeneración Tisular",
    productId: "chattanooga-intelect",
    icon: Zap,
    accentColor: "#0d9488"
  },
  {
    id: "fallas-equipo",
    solutionTitle: "Garantía 2 Años & Soporte Express",
    tagline: "Cero Tiempos Muertos",
    description: "Reemplazo inmediato de equipo y soporte técnico continuo para que nunca canceles una cita.",
    metricVal: "100% DISPONIBILIDAD",
    metricDesc: "Continuidad Operativa",
    productId: "combo-electro-ultrasonido",
    icon: ShieldCheck,
    accentColor: "#0284c7"
  },
  {
    id: "postop-lento",
    solutionTitle: "Ultrasonido Tisular de 6.0 cm",
    tagline: "Desinflamación Profunda",
    description: "Alcanza cápsulas articulares profundas resolviendo inflamaciones complejas en tiempo récord.",
    metricVal: "-60% TIEMPO",
    metricDesc: "Reducción de Edema",
    productId: "tens-ems-profesional",
    icon: Activity,
    accentColor: "#0d9488"
  },
  {
    id: "competencia",
    solutionTitle: "Equipamiento A1 (FDA/CE)",
    tagline: "Prestigio Clínico",
    description: "Tecnología certificada que posiciona a tu consultorio como la clínica número 1 de tu zona.",
    metricVal: "+85% ATRACTIVO",
    metricDesc: "Prestigio de Marca",
    productId: "camilla-electrica-3-secciones",
    icon: Award,
    accentColor: "#8b5cf6"
  }
];

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal, 
  products = PRODUCTS 
}) {
  const [selectedPainIdx, setSelectedPainIdx] = useState(0);

  // Scroll Jacking Refs
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track horizontal translation (-66.666% across 3 panels)
  const xTrack = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);

  const handleWhatsAppQuote = (subject) => {
    const text = `Hola Bruce Médica, me interesa cotizar soluciones para resolver: ${subject || 'Equipamiento Clínico'}. ¿Tienen asesoría disponible?`;
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
                  Ingeniería biomédica de precisión. Equipamos clínicas y fisioterapeutas con tecnología que elimina cuellos de botella y acelera la recuperación de sus pacientes.
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

          {/* ================= SLIDE 2: DOLENCIAS (DARK DRAMATIC LOSS THEME) ================= */}
          <div className="hero-panel slide-2 theme-dark-loss">
            <div className="slide-2-container-concise">
              
              <div className="slide-header text-center slide-2-header-adjusted">
                <div className="chip-pill-pain inline-flex">
                  <span className="live-warning-dot"></span>
                  <span>FUGA DE CAPITAL ACTIVA</span>
                </div>
                <h2 className="loss-title">El costo real de <span className="highlight-loss">quedarse atrás.</span></h2>
                <p className="subtext-loss">Cada equipo descalibrado y tratamiento lento es un paciente que decide no volver. Identifica dónde está sangrando tu clínica.</p>
              </div>

              <div className="pain-concise-grid">
                {PAIN_POINTS.map((pain, idx) => {
                  const PainIcon = pain.icon;
                  return (
                    <div 
                      key={pain.id}
                      className="pain-bento-card dark-glass-card"
                      onMouseEnter={() => setSelectedPainIdx(idx)}
                    >
                      <div className="pain-bento-header">
                        <span className="pain-tag" style={{ color: pain.severityColor }}>{pain.tag}</span>
                        <div className="pain-icon-box" style={{ background: `${pain.severityColor}20`, color: pain.severityColor, border: `1px solid ${pain.severityColor}40` }}>
                          <PainIcon size={18} />
                        </div>
                      </div>

                      <div className="pain-bento-metric-box">
                        <span className="p-huge-metric" style={{ color: pain.severityColor, textShadow: `0 0 20px ${pain.severityColor}40` }}>
                          {pain.impactMetric}
                        </span>
                        <span className="p-metric-lbl">{pain.impactLabel}</span>
                      </div>

                      <h3>{pain.title}</h3>

                      <div className="pain-bento-footer">
                        <span>Solución ➔ Siguiente Fase</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* ================= SLIDE 3: LA RESPUESTA BIO-MÉDICA (RELIEF / SOLUTION THEME) ================= */}
          <div className="hero-panel slide-3 theme-light-relief">
            <div className="slide-3-container-relief">
              <div className="slide-header text-center slide-3-header-adjusted">
                <div className="chip-pill-relief inline-flex">
                  <span className="live-success-dot"></span>
                  <span>ALIVIO Y CRECIMIENTO CLÍNICO</span>
                </div>
                <h2 className="relief-title">Recupera el control. <span className="highlight-relief">Multiplica resultados.</span></h2>
                <p className="subtext-relief">Despídete de la fricción. Adquiere ingeniería de grado hospitalario diseñada para desinflamar rápido, no fallar nunca y escalar tus ingresos diarios.</p>
              </div>

              {/* Solutions Grid */}
              <div className="solutions-matrix-grid">
                {SOLUTIONS_MATRIX.map((sol, idx) => {
                  const IconComp = sol.icon;
                  const isHighlighted = idx === selectedPainIdx;
                  const matchingProd = products.find(p => p.id === sol.productId || (p.name || "").toLowerCase().includes(sol.productId.replace(/-/g, ' '))) || products[idx % products.length];

                  return (
                    <div 
                      key={sol.id}
                      className={`solution-card-relief ${isHighlighted ? "highlighted-relief" : ""}`}
                      onClick={() => {
                        if (onOpenProductModal && matchingProd) onOpenProductModal(matchingProd);
                      }}
                    >
                      <div className="sol-card-header">
                        <div className="sol-icon-box" style={{ background: `${sol.accentColor}15`, color: sol.accentColor }}>
                          <IconComp size={22} className="pulse-icon-hover" />
                        </div>
                        <span className="sol-tagline" style={{ color: sol.accentColor }}>{sol.tagline}</span>
                      </div>

                      <div className="sol-img-stage-relief">
                        {matchingProd?.imageSvg ? (
                          <div className="svg-w-relief" dangerouslySetInnerHTML={{ __html: matchingProd.imageSvg }} />
                        ) : (
                          <img src={matchingProd?.image || "/images/hero_device.png"} alt={sol.solutionTitle} />
                        )}
                        <div className="glow-backdrop" style={{ background: `radial-gradient(circle, ${sol.accentColor}20 0%, transparent 70%)` }}></div>
                      </div>

                      <h3 className="sol-title-relief">{sol.solutionTitle}</h3>
                      <p className="sol-desc-relief">{sol.description}</p>

                      <div className="sol-metric-pill-relief">
                        <TrendingUp size={16} className="text-teal" />
                        <div>
                          <strong>{sol.metricVal}</strong>
                          <span>{sol.metricDesc}</span>
                        </div>
                      </div>

                      <button 
                        className="btn-sol-quote-relief"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppQuote(sol.solutionTitle);
                        }}
                      >
                        <MessageCircle size={16} /> Cotizar Solución
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="slide-3-footer-action">
                <button className="btn-primary-teal" onClick={onShopClick}>
                  Ver Todos los Equipos y Soluciones <ArrowRight size={18} />
                </button>
              </div>

            </div>
          </div>

        </motion.div>
      </div>

      {/* Styled JSX CSS Rules */}
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
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05);
          border-radius: 24px;
        }

        /* SLIDE 1 */
        .slide-1-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .colossal-text-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .image-masked-title {
          font-family: var(--font-heading);
          font-size: clamp(5.5rem, 14vw, 15rem);
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin: 0;
          background-image: url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop');
          background-size: 150% auto;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: panImage 20s linear infinite alternate;
        }

        .title-stroke {
          -webkit-text-stroke: 2px rgba(15, 23, 42, 0.15);
          background-image: url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop');
        }

        @keyframes panImage {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .slide-1-footer {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-manifesto-sub {
          font-size: 1.15rem;
          line-height: 1.65;
          color: #475569;
          max-width: 650px;
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
          transform: scale(1.04);
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

        /* SLIDE 2: CONCISE PAIN POINTS (DARK LOSS THEME) */
        .theme-dark-loss {
          background: #020617; /* Very dark slate/blue */
          color: #f8fafc;
        }

        .slide-2-container-concise {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1100px;
          height: 100%;
          padding-top: 4rem;
        }

        .slide-2-header-adjusted {
          margin-bottom: 3.5rem;
        }

        .chip-pill-pain {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          font-size: 0.75rem;
          font-weight: 800;
          color: #ef4444;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .live-warning-dot {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 10px #ef4444;
          animation: warningPulse 1.5s infinite;
        }

        @keyframes warningPulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }

        .loss-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .highlight-loss {
          color: #ef4444;
          position: relative;
          display: inline-block;
        }

        .highlight-loss::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 4px;
          background: #ef4444;
          opacity: 0.5;
        }

        .subtext-loss {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 650px;
          margin: 0.5rem auto 0;
          line-height: 1.6;
        }

        .pain-concise-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        .dark-glass-card {
          padding: 1.8rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          height: 350px;
          cursor: crosshair;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .dark-glass-card:hover {
          transform: translateY(-8px);
          background: rgba(30, 41, 59, 0.8);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .pain-bento-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .pain-tag {
          font-size: 0.65rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .pain-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pain-bento-metric-box {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
        }

        .p-huge-metric {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .p-metric-lbl {
          font-size: 0.85rem;
          font-weight: 700;
          color: #94a3b8;
          margin-top: 0.4rem;
        }

        .dark-glass-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #f8fafc;
          line-height: 1.4;
          margin-bottom: 1.5rem;
        }

        .pain-bento-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .dark-glass-card:hover .pain-bento-footer {
          color: #f8fafc;
        }

        /* SLIDE 3: SOLUTIONS (RELIEF THEME) */
        .theme-light-relief {
          background: #ffffff;
          background-image: radial-gradient(circle at center, rgba(13, 148, 136, 0.05) 0%, transparent 70%);
        }

        .slide-3-container-relief {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1240px;
          height: 100%;
          justify-content: center;
          padding-top: 5rem;
        }

        .slide-3-header-adjusted {
          margin-bottom: 2rem;
        }

        .chip-pill-relief {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          background: rgba(13, 148, 136, 0.08);
          border: 1px solid rgba(13, 148, 136, 0.2);
          font-size: 0.75rem;
          font-weight: 800;
          color: #0d9488;
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .live-success-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: reliefPulse 2s infinite;
        }

        @keyframes reliefPulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } 100% { opacity: 1; transform: scale(1); } }

        .relief-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .highlight-relief {
          color: #0d9488;
          position: relative;
        }

        .highlight-relief::after {
          content: "";
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 10px;
          background: #0d9488;
          opacity: 0.15;
          z-index: -1;
        }

        .subtext-relief {
          font-size: 1.1rem;
          color: #475569;
          max-width: 680px;
          margin: 0.5rem auto 0;
          line-height: 1.6;
        }

        .solutions-matrix-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
          margin: 2rem 0;
          align-items: stretch;
        }

        .solution-card-relief {
          padding: 1.8rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 450px;
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .solution-card-relief:hover, .solution-card-relief.highlighted-relief {
          transform: translateY(-8px);
          border-color: #0d9488;
          box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.15);
        }

        .solution-card-relief:hover .pulse-icon-hover {
          animation: float 2s ease-in-out infinite;
        }

        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-3px); } 100% { transform: translateY(0); } }

        .sol-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sol-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sol-tagline {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sol-img-stage-relief {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 16px;
          margin: 1.5rem 0;
        }

        .glow-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .sol-img-stage-relief img, .svg-w-relief {
          max-height: 90px;
          object-fit: contain;
          z-index: 1;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.05));
        }

        .svg-w-relief { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }

        .sol-title-relief {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 0.6rem;
        }

        .sol-desc-relief {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .sol-metric-pill-relief {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: #f0fdf4;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          margin-top: auto;
        }

        .sol-metric-pill-relief strong {
          display: block;
          font-size: 0.82rem;
          font-weight: 800;
          color: #0d9488;
          line-height: 1.1;
        }

        .sol-metric-pill-relief span {
          font-size: 0.7rem;
          color: #166534;
        }

        .btn-sol-quote-relief {
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.85rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-sol-quote-relief:hover {
          background: #0d9488;
          box-shadow: 0 8px 20px rgba(13, 148, 136, 0.25);
        }

        .btn-primary-teal {
          background: #0d9488;
          color: #ffffff;
          border: none;
          padding: 1rem 2.5rem;
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

        .btn-primary-teal:hover {
          background: #0f172a;
          transform: scale(1.04);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
        }

        .text-red { color: #ef4444; }
        .text-teal { color: #0d9488; }

        @media (max-width: 1024px) {
          .pain-points-grid { grid-template-columns: 1fr; }
          .solutions-matrix-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
