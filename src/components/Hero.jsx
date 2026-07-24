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
    title: "Abandono por falta de resultados rápidos.",
    impactMetric: "-45%",
    impactLabel: "Fuga de Pacientes",
    severityColor: "#ef4444",
    icon: AlertTriangle
  },
  {
    id: "fallas-equipo",
    tag: "OPERACIÓN",
    title: "Citas canceladas por fallas de equipo.",
    impactMetric: "$12k+",
    impactLabel: "Pérdida Semanal",
    severityColor: "#f97316",
    icon: ShieldAlert
  },
  {
    id: "postop-lento",
    tag: "EFICIENCIA",
    title: "Recuperaciones estancadas con terapia manual.",
    impactMetric: "3x",
    impactLabel: "Más lentitud",
    severityColor: "#eab308",
    icon: Clock
  },
  {
    id: "competencia",
    tag: "CRECIMIENTO",
    title: "Fuga de pacientes a clínicas mejor equipadas.",
    impactMetric: "-30%",
    impactLabel: "Cuota de Mercado",
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

          {/* ================= SLIDE 2: DOLENCIAS (CONCISE & VISUAL) ================= */}
          <div className="hero-panel slide-2">
            <div className="slide-2-container-concise">
              
              <div className="slide-header text-center slide-2-header-adjusted">
                <div className="chip-pill-pain inline-flex">
                  <AlertTriangle size={14} className="text-red" />
                  <span>El Desafío Clínico Real</span>
                </div>
                <h2>¿Qué frena el crecimiento de tu clínica?</h2>
                <p className="subtext">Identifica los cuellos de botella que más afectan la rentabilidad y retención de tus pacientes hoy.</p>
              </div>

              <div className="pain-concise-grid">
                {PAIN_POINTS.map((pain, idx) => {
                  const PainIcon = pain.icon;
                  return (
                    <div 
                      key={pain.id}
                      className="pain-bento-card glass-clean-card"
                      onMouseEnter={() => setSelectedPainIdx(idx)}
                    >
                      <div className="pain-bento-header">
                        <span className="pain-tag" style={{ color: pain.severityColor }}>{pain.tag}</span>
                        <div className="pain-icon-box" style={{ background: `${pain.severityColor}15`, color: pain.severityColor }}>
                          <PainIcon size={18} />
                        </div>
                      </div>

                      <div className="pain-bento-metric-box">
                        <span className="p-huge-metric" style={{ color: pain.severityColor }}>{pain.impactMetric}</span>
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

          {/* ================= SLIDE 3: LA RESPUESTA BIO-MÉDICA (SOLUTIONS) ================= */}
          <div className="hero-panel slide-3">
            <div className="slide-3-container">
              <div className="slide-header text-center">
                <div className="chip-pill-solution inline-flex">
                  <CheckCircle2 size={14} className="text-teal" />
                  <span>La Solución Bruce Médica</span>
                </div>
                <h2>Ingeniería Diseñada para Eliminar Fricciones</h2>
                <p className="subtext">Tecnología de grado hospitalario calibrada para potenciar tus resultados.</p>
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
                      className={`solution-card glass-clean-card ${isHighlighted ? "highlighted" : ""}`}
                      onClick={() => {
                        if (onOpenProductModal && matchingProd) onOpenProductModal(matchingProd);
                      }}
                    >
                      <div className="sol-card-header">
                        <div className="sol-icon-box" style={{ background: `${sol.accentColor}15`, color: sol.accentColor }}>
                          <IconComp size={22} />
                        </div>
                        <span className="sol-tagline" style={{ color: sol.accentColor }}>{sol.tagline}</span>
                      </div>

                      <div className="sol-img-stage">
                        {matchingProd?.imageSvg ? (
                          <div className="svg-w" dangerouslySetInnerHTML={{ __html: matchingProd.imageSvg }} />
                        ) : (
                          <img src={matchingProd?.image || "/images/hero_device.png"} alt={sol.solutionTitle} />
                        )}
                      </div>

                      <h3>{sol.solutionTitle}</h3>
                      <p>{sol.description}</p>

                      <div className="sol-metric-pill">
                        <TrendingUp size={16} className="text-teal" />
                        <div>
                          <strong>{sol.metricVal}</strong>
                          <span>{sol.metricDesc}</span>
                        </div>
                      </div>

                      <button 
                        className="btn-sol-quote"
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
                <button className="btn-primary-dark" onClick={onShopClick}>
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

        /* SLIDE 2: CONCISE PAIN POINTS */
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
          margin-bottom: 3rem;
        }

        .chip-pill-pain {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          font-size: 0.82rem;
          font-weight: 700;
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .slide-2-header-adjusted h2 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0.5rem 0;
        }

        .slide-2-header-adjusted .subtext {
          font-size: 1.05rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .pain-concise-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        .pain-bento-card {
          padding: 1.8rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #e2e8f0;
          height: 340px;
          cursor: crosshair;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(255, 255, 255, 0.7);
        }

        .pain-bento-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.1);
          border-color: #cbd5e1;
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
          color: #475569;
          margin-top: 0.4rem;
        }

        .pain-bento-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #334155;
          line-height: 1.4;
          margin-bottom: 1.5rem;
        }

        .pain-bento-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px dashed #e2e8f0;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }

        .pain-bento-card:hover .pain-bento-footer {
          color: #0d9488;
        }

        /* SLIDE 3: SOLUTIONS */
        .slide-3-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1240px;
        }

        .chip-pill-solution {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          background: rgba(13, 148, 136, 0.08);
          border: 1px solid rgba(13, 148, 136, 0.2);
          font-size: 0.82rem;
          font-weight: 700;
          color: #0d9488;
          margin-bottom: 0.5rem;
        }

        .solutions-matrix-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          width: 100%;
          margin: 1.5rem 0;
        }

        .solution-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 420px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .solution-card:hover, .solution-card.highlighted {
          transform: translateY(-6px);
          border-color: #0d9488;
          box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.2);
        }

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

        .sol-img-stage {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 16px;
          padding: 0.75rem;
          margin: 0.8rem 0;
        }

        .sol-img-stage img { max-height: 90px; object-fit: contain; }
        .svg-w { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }

        .solution-card h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 0.3rem;
        }

        .solution-card p {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.4;
          height: 3em;
          overflow: hidden;
        }

        .sol-metric-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #f0fdf4;
          padding: 0.5rem 0.8rem;
          border-radius: 10px;
          margin: 0.75rem 0;
        }

        .sol-metric-pill strong {
          display: block;
          font-size: 0.8rem;
          font-weight: 800;
          color: #0d9488;
          line-height: 1;
        }

        .sol-metric-pill span {
          font-size: 0.68rem;
          color: #166534;
        }

        .btn-sol-quote {
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.75rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-sol-quote:hover {
          background: #0d9488;
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
