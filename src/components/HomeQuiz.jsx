import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  ShoppingCart, 
  Eye, 
  Check, 
  RefreshCw, 
  Sparkles, 
  Cpu, 
  CheckCircle,
  ArrowRight,
  Flame,
  Target,
  Layers,
  Thermometer,
  Shield
} from "lucide-react";
import { PRODUCTS } from "../data/products";

const ANATOMICAL_ZONES = [
  { 
    id: "cervical", 
    name: "Cervical & Cuello", 
    cx: 50, 
    cy: 19, 
    icon: Target,
    muscles: "Trapecio, Esternocleidomastoideo & C7-T1",
    conditions: "Cervicalgia, cefaleas tensionales y contracturas por postura",
    dosageLevel: "Dosificación Media (2.2 - 3.5 MHz)"
  },
  { 
    id: "hombro", 
    name: "Hombro & Brazo", 
    cx: 31, 
    cy: 28, 
    icon: Flame,
    muscles: "Manguito Rotador, Deltoides & Biceps",
    conditions: "Tendinitis supraespinoso, bursitis subacromial y pinzamiento",
    dosageLevel: "Dosificación Alta (3.5 - 4.4 MHz)"
  },
  { 
    id: "lumbar", 
    name: "Lumbar & Espalda", 
    cx: 50, 
    cy: 44, 
    icon: Zap,
    muscles: "Paravertebrales, Lumbales L1-L5 & Cuadrado Lumbar",
    conditions: "Lumbalgia aguda/crónica, ciática y espasmos musculares",
    dosageLevel: "Dosificación Máxima (4.4 MHz)"
  },
  { 
    id: "rodilla", 
    name: "Rodilla & Articulación", 
    cx: 41, 
    cy: 71, 
    icon: Activity,
    muscles: "Cuádriceps, Tendón Rotuliano & Meniscos",
    conditions: "Desgaste articular, sobrecarga ligamentosa y condromalacia",
    dosageLevel: "Dosificación Regulada (2.0 - 4.0 MHz)"
  },
  { 
    id: "tobillo", 
    name: "Tobillo & Pie", 
    cx: 39, 
    cy: 90, 
    icon: Shield,
    muscles: "Ligamento Peroneoastrogalino & Tendón de Aquiles",
    conditions: "Esguinces, fascitis plantar y espolón calcáneo",
    dosageLevel: "Dosificación Focalizada (1.5 - 3.0 MHz)"
  }
];

const CLINICAL_OBJECTIVES = [
  { 
    id: "pain", 
    label: "Alivio del Dolor & Desinflamación", 
    icon: Zap, 
    subtext: "Bloqueo analgésico de fibras nociceptivas y reabsorción de edemas",
    accentColor: "teal"
  },
  { 
    id: "recovery", 
    label: "Recuperación & Masaje Deportivo", 
    icon: Activity, 
    subtext: "Drenaje metabólico de ácido láctico y oxigenación tisular acelerada",
    accentColor: "copper"
  },
  { 
    id: "support", 
    label: "Estabilidad & Soporte Articular", 
    icon: ShieldCheck, 
    subtext: "Estabilización biomecánica y prevención de lesiones recurrentes",
    accentColor: "cyan"
  }
];

export default function HomeQuiz({ onOpenProductModal, onQuickAdd, products = PRODUCTS }) {
  const [selectedZoneIdx, setSelectedZoneIdx] = useState(0);
  const [selectedObjectiveIdx, setSelectedObjectiveIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  // Telemetry HUD state
  const [telemetry, setTelemetry] = useState({ impedance: 10, frequency: 1.0, match: 60 });

  const activeZone = ANATOMICAL_ZONES[selectedZoneIdx];
  const activeObjective = CLINICAL_OBJECTIVES[selectedObjectiveIdx];

  // Scan simulation interval
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        impedance: prev.impedance < 420 ? prev.impedance + 45 : 420,
        frequency: prev.frequency < 4.4 ? parseFloat((prev.frequency + 0.4).toFixed(1)) : 4.4,
        match: prev.match < 98 ? prev.match + 4 : 98
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleRunScan = () => {
    setIsScanning(true);
    setShowResults(false);
    setTelemetry({ impedance: 10, frequency: 1.0, match: 60 });

    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 1800);
  };

  const handleResetScan = () => {
    setShowResults(false);
    setIsScanning(false);
  };

  const handleBuyClick = (e, prod) => {
    e.stopPropagation();
    if (!onQuickAdd) return;
    onQuickAdd(prod);
    setAddedItem(prod.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  // Find 3 solutions matching the scanned zone & objective
  const getSolutionsDeck = () => {
    const zoneKeyword = activeZone.id;
    const matchedProducts = products.filter(p => {
      const pName = (p.name || "").toLowerCase();
      const pCat = (p.category || "").toLowerCase();
      return pName.includes(zoneKeyword) || pCat.includes(zoneKeyword) || pName.includes(activeObjective.id);
    });

    const pPersonal = matchedProducts[0] || products[1] || products[0];
    const pPro = matchedProducts[1] || products[0] || products[2];
    const pClinical = matchedProducts[2] || products[2] || products[0];

    return [
      {
        tier: "Solución Personal / Doméstica",
        tierBadge: "🏠 Nivel 1: Hogar & Portátil",
        match: "94% MATCH",
        product: pPersonal
      },
      {
        tier: "Solución Deportiva / Rendimiento",
        tierBadge: "🏋️ Nivel 2: Deportivo Pro",
        match: "98% MATCH",
        product: pPro,
        isFeatured: true
      },
      {
        tier: "Solución Alta Especialidad",
        tierBadge: "🏥 Nivel 3: Clínico",
        match: "91% MATCH",
        product: pClinical
      }
    ];
  };

  const solutionsDeck = getSolutionsDeck();

  return (
    <section className="hologram-scanner-section">
      <div className="container">
        
        {/* Section Editorial Header */}
        <div className="scanner-header text-center">
          <span className="section-label">Diagnóstico Clínico Inteligente</span>
          <h2 className="display-large">Escáner Anatómico 3D & Prescripción</h2>
          <p className="scanner-sub">
            Selecciona la zona muscular o articular afectada en nuestro modelo vectorial humano para calcular la dosificación y equipo ideal.
          </p>
        </div>

        {!showResults ? (
          /* Interactive Scanner Setup Grid */
          <div className="grid-2 scanner-interactive-stage">
            
            {/* Left Stage: Realistic Anatomical Human Vector Body */}
            <div className="hologram-body-card glass">
              <div className="hologram-bg-grid"></div>
              
              {/* Laser Scan Line Sweeping Effect */}
              {isScanning && (
                <motion.div 
                  initial={{ top: "5%" }}
                  animate={{ top: "90%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="laser-scan-bar"
                />
              )}

              {/* REALISTIC ANATOMICAL HUMAN BODY VECTOR SVG */}
              <div className="body-silhouette-wrapper">
                <svg viewBox="0 0 100 100" className="body-svg">
                  <defs>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(13, 148, 136, 0.35)" />
                      <stop offset="50%" stopColor="rgba(6, 182, 212, 0.2)" />
                      <stop offset="100%" stopColor="rgba(15, 23, 42, 0.4)" />
                    </linearGradient>
                    <linearGradient id="muscleGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Background Medical Telemetry Circles */}
                  <circle cx="50" cy="50" r="48" stroke="rgba(13, 148, 136, 0.12)" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.5" fill="none" />
                  
                  {/* REALISTIC HUMAN BODY ANATOMICAL SILHOUETTE */}
                  <g className="anatomical-human-group">
                    {/* Head & Cranium Contour */}
                    <path d="M 45 10 C 44 4, 56 4, 55 10 C 56 15, 54 16, 50 16 C 46 16, 44 15, 45 10 Z" fill="url(#bodyGradient)" stroke="var(--accent-color)" strokeWidth="0.6" />
                    
                    {/* Cervical & Neck (Trapezius) */}
                    <path d="M 47 16 C 44 18, 38 21, 31 23 L 30 27 C 37 25, 43 23, 47 21 Z" fill="rgba(13, 148, 136, 0.25)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 53 16 C 56 18, 62 21, 69 23 L 70 27 C 63 25, 57 23, 53 21 Z" fill="rgba(13, 148, 136, 0.25)" stroke="var(--accent-color)" strokeWidth="0.5" />

                    {/* Deltoids & Shoulders */}
                    <path d="M 31 23 C 26 24, 23 28, 25 34 C 27 34, 30 31, 31 27 Z" fill="rgba(13, 148, 136, 0.3)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 69 23 C 74 24, 77 28, 75 34 C 73 34, 70 31, 69 27 Z" fill="rgba(13, 148, 136, 0.3)" stroke="var(--accent-color)" strokeWidth="0.5" />

                    {/* Pectorals & Torso Chest */}
                    <path d="M 31 27 C 37 25, 47 24, 50 27 C 50 33, 38 35, 31 32 Z" fill="url(#bodyGradient)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 69 27 C 63 25, 53 24, 50 27 C 50 33, 62 35, 69 32 Z" fill="url(#bodyGradient)" stroke="var(--accent-color)" strokeWidth="0.5" />

                    {/* Rectus Abdominis (Abs Grid) */}
                    <path d="M 43 36 L 57 36 L 55 48 L 45 48 Z" fill="rgba(13, 148, 136, 0.15)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <line x1="50" y1="36" x2="50" y2="48" stroke="rgba(13, 148, 136, 0.4)" strokeWidth="0.4" />
                    <line x1="44" y1="40" x2="56" y2="40" stroke="rgba(13, 148, 136, 0.3)" strokeWidth="0.4" />
                    <line x1="44" y1="44" x2="56" y2="44" stroke="rgba(13, 148, 136, 0.3)" strokeWidth="0.4" />

                    {/* Arms (Biceps & Forearms) */}
                    <path d="M 25 34 C 23 38, 22 44, 25 50 C 27 50, 29 44, 28 38 Z" fill="rgba(13, 148, 136, 0.2)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 75 34 C 77 38, 78 44, 75 50 C 73 50, 71 44, 72 38 Z" fill="rgba(13, 148, 136, 0.2)" stroke="var(--accent-color)" strokeWidth="0.5" />

                    {/* Pelvis & Hip Joint */}
                    <path d="M 45 48 C 40 50, 36 53, 38 58 C 46 58, 50 54, 50 50 Z" fill="rgba(13, 148, 136, 0.2)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 55 48 C 60 50, 64 53, 62 58 C 54 58, 50 54, 50 50 Z" fill="rgba(13, 148, 136, 0.2)" stroke="var(--accent-color)" strokeWidth="0.5" />

                    {/* Quadriceps (Thigh Muscles) */}
                    <path d="M 38 58 C 36 65, 38 72, 42 75 C 45 72, 46 64, 45 58 Z" fill="url(#bodyGradient)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 62 58 C 64 65, 62 72, 58 75 C 55 72, 54 64, 55 58 Z" fill="url(#bodyGradient)" stroke="var(--accent-color)" strokeWidth="0.5" />

                    {/* Knees (Patella Joints) */}
                    <ellipse cx="42" cy="76" rx="2.5" ry="3" fill="rgba(249, 115, 22, 0.3)" stroke="var(--secondary-accent)" strokeWidth="0.6" />
                    <ellipse cx="58" cy="76" rx="2.5" ry="3" fill="rgba(249, 115, 22, 0.3)" stroke="var(--secondary-accent)" strokeWidth="0.6" />

                    {/* Calves & Lower Legs */}
                    <path d="M 40 79 C 38 84, 38 88, 41 93 C 43 92, 44 87, 43 80 Z" fill="rgba(13, 148, 136, 0.25)" stroke="var(--accent-color)" strokeWidth="0.5" />
                    <path d="M 60 79 C 62 84, 62 88, 59 93 C 57 92, 56 87, 57 80 Z" fill="rgba(13, 148, 136, 0.25)" stroke="var(--accent-color)" strokeWidth="0.5" />
                  </g>

                  {/* Interactive Hotspot Nodes with Concentric Pulse Rings */}
                  {ANATOMICAL_ZONES.map((zone, idx) => {
                    const isSelected = idx === selectedZoneIdx;
                    return (
                      <g 
                        key={zone.id} 
                        className={`hologram-node ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedZoneIdx(idx)}
                        style={{ cursor: "pointer" }}
                      >
                        <circle 
                          cx={zone.cx} 
                          cy={zone.cy} 
                          r={isSelected ? "4.5" : "3"} 
                          fill={isSelected ? "var(--secondary-accent)" : "var(--accent-color)"}
                          stroke="var(--white)"
                          strokeWidth="0.8"
                        />
                        {isSelected && (
                          <>
                            <circle cx={zone.cx} cy={zone.cy} r="8" stroke="var(--secondary-accent)" strokeWidth="0.6" fill="none" className="pulse-node" />
                            <circle cx={zone.cx} cy={zone.cy} r="13" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="0.4" strokeDasharray="2 2" fill="none" />
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Zone Label Overlay */}
              <div className="zone-overlay-badge">
                <span className="zone-dot"></span>
                <span>Zona Activa: <strong>{activeZone.name}</strong></span>
              </div>

              {/* Scanning Telemetry HUD */}
              {isScanning && (
                <div className="telemetry-hud-box glass">
                  <div className="hud-row">
                    <span>IMPEDANCIA:</span>
                    <strong>{telemetry.impedance} Ω</strong>
                  </div>
                  <div className="hud-row">
                    <span>FRECUENCIA:</span>
                    <strong>{telemetry.frequency} MHz</strong>
                  </div>
                  <div className="hud-row">
                    <span>MATCH COINCIDENCIA:</span>
                    <strong className="text-teal">{telemetry.match}%</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Right Stage: Elevated x1000 Selectors & Preview Panel */}
            <div className="scanner-controls-card">
              
              {/* Step 1: Zone Selectors with Icons & Number Badges */}
              <div className="control-block">
                <div className="control-header-row">
                  <span className="control-num-badge">01</span>
                  <h4 className="control-title">Selecciona la Zona Anatómica</h4>
                </div>

                <div className="zone-pills-grid">
                  {ANATOMICAL_ZONES.map((zone, idx) => {
                    const ZoneIcon = zone.icon;
                    const isActive = idx === selectedZoneIdx;
                    return (
                      <button
                        key={zone.id}
                        className={`zone-pill-x1000 ${isActive ? "active" : ""}`}
                        onClick={() => setSelectedZoneIdx(idx)}
                      >
                        <ZoneIcon size={14} className="pill-icon" />
                        <span>{zone.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Illuminated Clinical Preview Box for Active Zone */}
              <div className="zone-clinical-spec-box glass">
                <div className="spec-header">
                  <span className="spec-badge"><Layers size={13} /> Diagnóstico Focalizado</span>
                  <strong className="spec-dosage">{activeZone.dosageLevel}</strong>
                </div>
                <div className="spec-body">
                  <p><strong>Músculos / Articulación:</strong> {activeZone.muscles}</p>
                  <p><strong>Patologías Comunes:</strong> {activeZone.conditions}</p>
                </div>
              </div>

              {/* Step 2: Clinical Objective Select (Elevated Cards) */}
              <div className="control-block">
                <div className="control-header-row">
                  <span className="control-num-badge">02</span>
                  <h4 className="control-title">Objetivo Terapéutico Principal</h4>
                </div>

                <div className="objective-options-list">
                  {CLINICAL_OBJECTIVES.map((obj, idx) => {
                    const ObjIcon = obj.icon;
                    const isActive = idx === selectedObjectiveIdx;
                    return (
                      <button
                        key={obj.id}
                        className={`objective-card-x1000 ${isActive ? "active" : ""} theme-${obj.accentColor}`}
                        onClick={() => setSelectedObjectiveIdx(idx)}
                      >
                        <div className="obj-icon-wrapper">
                          <ObjIcon size={20} />
                        </div>
                        <div className="obj-text-content">
                          <span className="obj-label-title">{obj.label}</span>
                          <span className="obj-sub-desc">{obj.subtext}</span>
                        </div>
                        {isActive && (
                          <span className="active-check-chip">
                            <Check size={14} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trigger Scan Button (High-End CTA) */}
              <div className="trigger-scan-box">
                <div className="scan-ready-bar">
                  <span className="status-pulse"></span>
                  <span>SISTEMA CLINICO LISTO Y CALIBRADO</span>
                </div>

                <button 
                  className={`btn btn-scan-trigger-x1000 ${isScanning ? "scanning" : ""}`}
                  onClick={handleRunScan}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw size={18} className="spin-icon" /> Escaneando Tejidos Musculares...
                    </>
                  ) : (
                    <>
                      <Cpu size={18} /> Ejecutar Escáner Anatómico <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Prescribed Solutions Deck (Results View) */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="results-prescribed-deck"
          >
            <div className="results-deck-header glass">
              <div className="header-match-pill">
                <Sparkles size={16} /> Diagnóstico Completado: Coincidencia 98%
              </div>
              <h3>Prescripción de Tratamiento Recomendada</h3>
              <p>
                Tratamiento calculado para <strong>{activeZone.name}</strong> enfocado en <strong>{activeObjective.label}</strong>.
              </p>
              <button className="btn-rescan" onClick={handleResetScan}>
                <RefreshCw size={14} /> Nuevo Escáner Anatómico
              </button>
            </div>

            {/* 3-Tiered Solution Cards Grid */}
            <div className="solutions-deck-grid">
              {solutionsDeck.map((sol, idx) => {
                const p = sol.product;
                return (
                  <div 
                    key={idx} 
                    className={`solution-tier-card glass ${sol.isFeatured ? "featured-tier" : ""}`}
                  >
                    <div className="tier-badge-row">
                      <span className="tier-name-tag">{sol.tierBadge}</span>
                      <span className="tier-match-pill">{sol.match}</span>
                    </div>

                    <div className="tier-img-box" style={{ background: p.imageBg || "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)" }}>
                      <span className="tier-brand">{p.brand || "Bruce Médica"}</span>
                      {p.imageSvg ? (
                        <div dangerouslySetInnerHTML={{ __html: p.imageSvg }} className="svg-box" />
                      ) : (
                        <img src={p.image} alt={p.name} className="tier-product-img" />
                      )}
                    </div>

                    <div className="tier-content-body">
                      <h4 className="tier-title">{p.name}</h4>
                      
                      <div className="tier-features-list">
                        <div className="f-item"><CheckCircle size={13} className="text-teal" /> <span>Garantía Oficial 2 Años</span></div>
                        <div className="f-item"><CheckCircle size={13} className="text-teal" /> <span>Envío Express Gratis</span></div>
                      </div>

                      <div className="tier-footer-action">
                        <div className="tier-price-block">
                          <span className="price-val">${p.price?.toLocaleString()} MXN</span>
                          <span className="tax-val">IVA Incluido</span>
                        </div>

                        <div className="tier-btns-group">
                          <button 
                            className="btn-tier-inspect"
                            onClick={() => onOpenProductModal && onOpenProductModal(p)}
                          >
                            <Eye size={15} /> Ver
                          </button>

                          <button 
                            className={`btn-tier-buy ${addedItem === p.id ? "added" : ""}`}
                            onClick={(e) => handleBuyClick(e, p)}
                          >
                            {addedItem === p.id ? <Check size={15} /> : <ShoppingCart size={15} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>

      {/* Styled JSX CSS Rules */}
      <style>{`
        .hologram-scanner-section {
          padding: 4.5rem 0 5.5rem 0;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .scanner-header {
          max-width: 750px;
          margin: 0 auto 3rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
        }

        .scanner-sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .scanner-interactive-stage {
          gap: 3rem;
          align-items: stretch;
        }

        /* Left Stage Hologram Body Card */
        .hologram-body-card {
          position: relative;
          border-radius: 28px;
          padding: 2rem;
          background: rgba(15, 23, 42, 0.94) !important;
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 520px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(13, 148, 136, 0.35);
        }

        .hologram-bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(13, 148, 136, 0.18) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .laser-scan-bar {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #06b6d4, var(--accent-color), transparent);
          box-shadow: 0 0 15px #06b6d4, 0 0 30px var(--accent-color);
          z-index: 10;
        }

        .body-silhouette-wrapper {
          width: 280px;
          height: 380px;
          position: relative;
          z-index: 5;
        }

        .body-svg {
          width: 100%;
          height: 100%;
        }

        .pulse-node {
          animation: pulseRing 1.8s infinite;
          transform-origin: center;
        }

        @keyframes pulseRing {
          0% { r: 5px; opacity: 1; }
          100% { r: 16px; opacity: 0; }
        }

        .zone-overlay-badge {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          padding: 0.4rem 0.85rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 10;
        }

        .zone-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--secondary-accent);
          box-shadow: 0 0 8px var(--secondary-accent);
        }

        .telemetry-hud-box {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.65) !important;
          border: 1px solid rgba(13, 148, 136, 0.4);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.72rem;
          z-index: 10;
        }

        .hud-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        /* Right Stage Elevated x1000 Selectors */
        .scanner-controls-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          justify-content: center;
        }

        .control-block {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .control-header-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .control-num-badge {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-color);
          background: var(--accent-light);
          padding: 0.2rem 0.6rem;
          border-radius: 50px;
        }

        .control-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        /* x1000 Zone Selector Pills */
        .zone-pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .zone-pill-x1000 {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.5rem 0.95rem;
          border-radius: 12px;
          background: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: var(--shadow-sm);
        }

        .zone-pill-x1000:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
          transform: translateY(-1px);
        }

        .zone-pill-x1000.active {
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          color: var(--white);
          border-color: var(--accent-color);
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.3);
        }

        .pill-icon {
          flex-shrink: 0;
        }

        /* Illuminated Clinical Zone Preview Card */
        .zone-clinical-spec-box {
          padding: 1rem 1.25rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(13, 148, 136, 0.25);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .spec-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--accent-dark);
          text-transform: uppercase;
        }

        .spec-dosage {
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--secondary-accent);
        }

        .spec-body p {
          font-size: 0.8rem;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        /* x1000 Objective Cards */
        .objective-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .objective-card-x1000 {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.95rem;
          padding: 0.85rem 1.1rem;
          border-radius: 16px;
          background: var(--white);
          border: 1px solid var(--border-color);
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
          box-shadow: var(--shadow-sm);
        }

        .objective-card-x1000:hover {
          border-color: var(--accent-color);
          transform: translateX(2px);
        }

        .objective-card-x1000.active {
          border-color: var(--accent-color);
          background: rgba(13, 148, 136, 0.05);
          box-shadow: 0 6px 18px rgba(13, 148, 136, 0.12);
        }

        .objective-card-x1000.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 15%;
          bottom: 15%;
          width: 4px;
          background: var(--accent-color);
          border-radius: 0 4px 4px 0;
        }

        .obj-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--bg-secondary);
          color: var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .objective-card-x1000.active .obj-icon-wrapper {
          background: var(--accent-color);
          color: var(--white);
        }

        .obj-text-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .obj-label-title {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .obj-sub-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .active-check-chip {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--accent-color);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* High-End CTA Button Box */
        .trigger-scan-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 0.35rem;
        }

        .scan-ready-bar {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .status-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .btn-scan-trigger-x1000 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 1rem;
          border-radius: 16px;
          font-family: var(--font-heading);
          font-size: 1.02rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          color: var(--white);
          border: none;
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.32);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-scan-trigger-x1000:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(13, 148, 136, 0.45);
        }

        .btn-scan-trigger-x1000.scanning {
          opacity: 0.85;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        /* Results Deck View */
        .results-prescribed-deck {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .results-deck-header {
          padding: 2rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.6rem;
        }

        .header-match-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--accent-dark);
          background: var(--accent-light);
          padding: 0.4rem 1rem;
          border-radius: 50px;
        }

        .results-deck-header h3 {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .btn-rescan {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.45rem 0.95rem;
          border-radius: 50px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.4rem;
        }

        .btn-rescan:hover {
          background: var(--white);
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .solutions-deck-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .solution-tier-card {
          border-radius: 24px;
          background: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .solution-tier-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .solution-tier-card.featured-tier {
          border-color: var(--accent-color);
          box-shadow: 0 12px 30px rgba(13, 148, 136, 0.2);
        }

        .tier-badge-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.25rem 0.5rem 1.25rem;
          align-items: center;
        }

        .tier-name-tag {
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .tier-match-pill {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--accent-color);
          background: var(--accent-light);
          padding: 0.2rem 0.55rem;
          border-radius: 50px;
        }

        .tier-img-box {
          height: 170px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
        }

        .tier-brand {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.2rem 0.55rem;
          border-radius: 50px;
        }

        .tier-product-img {
          max-height: 130px;
          object-fit: contain;
        }

        .svg-box {
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tier-content-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex: 1;
        }

        .tier-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .tier-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .f-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .tier-footer-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }

        .tier-price-block {
          display: flex;
          flex-direction: column;
        }

        .price-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .tax-val {
          font-size: 0.68rem;
          color: var(--text-tertiary);
        }

        .tier-btns-group {
          display: flex;
          gap: 0.4rem;
        }

        .btn-tier-inspect {
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

        .btn-tier-inspect:hover {
          background: var(--white);
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .btn-tier-buy {
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
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-tier-buy:hover {
          background: var(--accent-dark);
        }

        .btn-tier-buy.added {
          background: #10b981;
        }

        @media (max-width: 1024px) {
          .scanner-interactive-stage {
            grid-template-columns: 1fr;
          }
          .solutions-deck-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
