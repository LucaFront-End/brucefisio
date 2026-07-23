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
  Flame
} from "lucide-react";
import { PRODUCTS } from "../data/products";

const ANATOMICAL_ZONES = [
  { id: "cervical", name: "Cervical & Cuello", cx: 50, cy: 22, desc: "Tensión muscular trapezoide, cervicalgia y cefaleas tensionales." },
  { id: "hombro", name: "Hombro & Brazo", cx: 35, cy: 30, desc: "Manguito rotador, tendinitis supraespinoso y restricción de movilidad." },
  { id: "lumbar", name: "Lumbar & Espalda", cx: 50, cy: 45, desc: "Lumbalgia aguda/crónica, ciática y espasmos paravertebrales." },
  { id: "rodilla", name: "Rodilla & Articulación", cx: 42, cy: 70, desc: "Desgaste articular, sobrecarga ligamentosa y meniscos." },
  { id: "tobillo", name: "Tobillo & Pie", cx: 40, cy: 88, desc: "Esguinces, fascitis plantar y necesidad de estabilización." }
];

const CLINICAL_OBJECTIVES = [
  { id: "pain", label: "Alivio del Dolor & Desinflamación", icon: Zap, subtext: "Bloqueo analgésico y reabsorción de edemas" },
  { id: "recovery", label: "Recuperación & Masaje Deportivo", icon: Activity, subtext: "Drenaje de ácido láctico y oxigenación tisular" },
  { id: "support", label: "Estabilidad & Soporte Articular", icon: ShieldCheck, subtext: "Soporte dinámico y prevención de lesiones" }
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
        tierBadge: "🏠 Nivel 1: Hogar",
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
          <h2 className="display-large">Escáner Anatómico 3D & Recomendación</h2>
          <p className="scanner-sub">
            Selecciona la articulación o zona muscular afectada en nuestro holograma bio-médico para calcular tu tratamiento ideal.
          </p>
        </div>

        {!showResults ? (
          /* Interactive Scanner Setup Grid */
          <div className="grid-2 scanner-interactive-stage">
            
            {/* Left Stage: Hologram Body Canvas */}
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

              {/* Holographic Body SVG Silhouette */}
              <div className="body-silhouette-wrapper">
                <svg viewBox="0 0 100 100" className="body-svg">
                  {/* Grid Lines */}
                  <circle cx="50" cy="50" r="45" stroke="rgba(13, 148, 136, 0.12)" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
                  <circle cx="50" cy="50" r="35" stroke="rgba(13, 148, 136, 0.08)" strokeWidth="0.5" fill="none" />
                  
                  {/* Head */}
                  <circle cx="50" cy="15" r="7" fill="rgba(13, 148, 136, 0.25)" stroke="var(--accent-color)" strokeWidth="0.8" />
                  {/* Neck */}
                  <line x1="50" y1="22" x2="50" y2="26" stroke="var(--accent-color)" strokeWidth="1.2" />
                  {/* Torso & Shoulders */}
                  <path d="M 35 28 L 65 28 L 58 52 L 42 52 Z" fill="rgba(13, 148, 136, 0.18)" stroke="var(--accent-color)" strokeWidth="0.8" />
                  {/* Arms */}
                  <line x1="35" y1="28" x2="28" y2="48" stroke="var(--accent-color)" strokeWidth="1" />
                  <line x1="65" y1="28" x2="72" y2="48" stroke="var(--accent-color)" strokeWidth="1" />
                  {/* Legs */}
                  <line x1="44" y1="52" x2="42" y2="90" stroke="var(--accent-color)" strokeWidth="1" />
                  <line x1="56" y1="52" x2="58" y2="90" stroke="var(--accent-color)" strokeWidth="1" />

                  {/* Hotspot Pins for Anatomical Zones */}
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
                          r={isSelected ? "5" : "3.5"} 
                          fill={isSelected ? "var(--secondary-accent)" : "var(--accent-color)"}
                          stroke="var(--white)"
                          strokeWidth="0.8"
                        />
                        {isSelected && (
                          <circle 
                            cx={zone.cx} 
                            cy={zone.cy} 
                            r="8" 
                            stroke="var(--secondary-accent)" 
                            strokeWidth="0.6" 
                            fill="none" 
                            className="pulse-node" 
                          />
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

            {/* Right Stage: Controls & Scanning Trigger */}
            <div className="scanner-controls-card">
              
              {/* Step 1: Zone Select Pills */}
              <div className="control-block">
                <span className="control-num">Paso 1:</span>
                <h4 className="control-title">Selecciona la Zona Anatómica</h4>
                <div className="zone-pills-grid">
                  {ANATOMICAL_ZONES.map((zone, idx) => {
                    const isActive = idx === selectedZoneIdx;
                    return (
                      <button
                        key={zone.id}
                        className={`zone-pill ${isActive ? "active" : ""}`}
                        onClick={() => setSelectedZoneIdx(idx)}
                      >
                        {zone.name}
                      </button>
                    );
                  })}
                </div>
                <p className="zone-desc-box">{activeZone.desc}</p>
              </div>

              {/* Step 2: Clinical Objective Select */}
              <div className="control-block">
                <span className="control-num">Paso 2:</span>
                <h4 className="control-title">Objetivo Terapéutico Principal</h4>
                <div className="objective-options-list">
                  {CLINICAL_OBJECTIVES.map((obj, idx) => {
                    const ObjIcon = obj.icon;
                    const isActive = idx === selectedObjectiveIdx;
                    return (
                      <button
                        key={obj.id}
                        className={`objective-card ${isActive ? "active" : ""}`}
                        onClick={() => setSelectedObjectiveIdx(idx)}
                      >
                        <ObjIcon size={18} className="obj-icon" />
                        <div className="obj-text">
                          <span className="obj-label">{obj.label}</span>
                          <span className="obj-sub">{obj.subtext}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trigger Scan Button */}
              <div className="trigger-scan-box">
                <button 
                  className={`btn btn-scan-trigger ${isScanning ? "scanning" : ""}`}
                  onClick={handleRunScan}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw size={18} className="spin-icon" /> Escaneando Tejidos...
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
          background: rgba(15, 23, 42, 0.92) !important;
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
          border: 1px solid rgba(13, 148, 136, 0.3);
        }

        .hologram-bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(13, 148, 136, 0.15) 1px, transparent 1px);
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
          width: 260px;
          height: 360px;
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
          background: var(--accent-color);
        }

        .telemetry-hud-box {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.6) !important;
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

        /* Right Stage Scanner Controls */
        .scanner-controls-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
        }

        .control-block {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .control-num {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .control-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .zone-pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .zone-pill {
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.45rem 0.9rem;
          border-radius: 50px;
          background: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .zone-pill:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .zone-pill.active {
          background: var(--accent-color);
          color: var(--white);
          border-color: var(--accent-color);
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
        }

        .zone-desc-box {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: rgba(13, 148, 136, 0.05);
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          border-left: 3px solid var(--accent-color);
        }

        .objective-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .objective-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: var(--white);
          border: 1px solid var(--border-color);
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
        }

        .objective-card:hover {
          border-color: var(--accent-color);
        }

        .objective-card.active {
          border-color: var(--accent-color);
          background: var(--accent-light);
          box-shadow: var(--shadow-sm);
        }

        .obj-icon {
          color: var(--accent-color);
          flex-shrink: 0;
        }

        .obj-text {
          display: flex;
          flex-direction: column;
        }

        .obj-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .obj-sub {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .trigger-scan-box {
          padding-top: 0.5rem;
        }

        .btn-scan-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.9rem;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          color: var(--white);
          border: none;
          box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-scan-trigger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.4);
        }

        .btn-scan-trigger.scanning {
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
