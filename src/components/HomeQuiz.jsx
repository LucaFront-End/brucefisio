import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, RefreshCw, ShoppingCart, Eye, Check, ChevronRight, Zap, Target } from "lucide-react";
import { PRODUCTS } from "../data/products";

// Questions database
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "1. ¿Cuál es tu objetivo terapéutico principal?",
    options: [
      { text: "Alivio del Dolor & Desinflamación", subtext: "Bloqueo analgésico de fibras nerviosas y reabsorción de edemas.", value: "pain", icon: <Zap size={20} /> },
      { text: "Recuperación & Masaje Deportivo", subtext: "Drenaje de ácido láctico, oxigenación y relajación post-entrenamiento.", value: "recovery", icon: <Activity size={20} /> },
      { text: "Soporte Muscular & Propiocepción", subtext: "Estabilidad estructural de articulaciones sin limitar rango de movimiento.", value: "support", icon: <ShieldCheck size={20} /> }
    ]
  },
  {
    id: 2,
    question: "2. Selecciona la zona anatómica en el mapa holográfico:",
    options: []
  },
  {
    id: 3,
    question: "3. ¿Cuál es el nivel de intensidad clínica requerido?",
    options: [
      { text: "Uso Personal / Rehabilitación Doméstica", subtext: "Equipos portátiles cómodos y de fácil operación guiada.", value: "personal", icon: "●" },
      { text: "Deportistas de Alto Rendimiento / Uso Diario", subtext: "Dispositivos de alto torque y materiales de máxima duración deportiva.", value: "athlete", icon: "▲" },
      { text: "Uso Clínico Profesional / Consultorio", subtext: "Sistemas avanzados con dosificación de energía y multi-canales clínicos.", value: "clinical", icon: "■" }
    ]
  }
];

export default function HomeQuiz({ onOpenProductModal, onQuickAdd }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [addedItem, setAddedItem] = useState(false);
  const [hoveredSpot, setHoveredSpot] = useState(null);

  // HUD telemetry simulator
  const [scanTelemetry, setScanTelemetry] = useState({
    impedance: 10,
    voltage: 5,
    frequency: 1.0
  });

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanTelemetry(prev => {
        const nextImpedance = prev.impedance < 420 ? prev.impedance + 38 : 420;
        const nextVoltage = prev.voltage < 120 ? prev.voltage + 9 : 120;
        const nextFrequency = prev.frequency < 4.4 ? parseFloat((prev.frequency + 0.35).toFixed(2)) : 4.4;
        return {
          impedance: nextImpedance,
          voltage: nextVoltage,
          frequency: nextFrequency
        };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleOptionSelect = (val) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsScanning(true);
      setScanTelemetry({ impedance: 10, voltage: 5, frequency: 1.0 });
      setTimeout(() => {
        setIsScanning(false);
        calculateRecommendation(nextAnswers);
      }, 1800);
    }
  };

  const calculateRecommendation = (finalAnswers) => {
    const [goal, zone, intensity] = finalAnswers;
    let matchedProdId = "prod-3";

    if (intensity === "clinical" || goal === "pain") {
      matchedProdId = "prod-2";
    } else if (goal === "recovery" && (intensity === "athlete" || zone === "upper")) {
      matchedProdId = "prod-1";
    } else if (goal === "support") {
      matchedProdId = "prod-6";
    } else if (goal === "recovery" && zone === "lower") {
      matchedProdId = "prod-4";
    }

    const matchedProduct = PRODUCTS.find(p => p.id === matchedProdId);
    setRecommendation(matchedProduct);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendation(null);
    setAddedItem(false);
    setHoveredSpot(null);
  };

  const handleBuyClick = (product) => {
    if (!onQuickAdd) return;
    onQuickAdd(product);
    setAddedItem(true);
    setTimeout(() => setAddedItem(false), 2000);
  };

  const handleWhatsAppQuote = () => {
    if (!recommendation) return;
    const goalText = answers[0] === "pain" ? "Alivio del Dolor" : answers[0] === "recovery" ? "Recuperación Deportiva" : "Soporte Muscular";
    const zoneText = answers[1] === "upper" ? "Cervical/Cuello" : answers[1] === "lumbar" ? "Lumbar/Espalda" : "Articular/Rodilla";
    
    const message = `Hola! Realicé el diagnóstico inteligente de Bruce Médica.\n\n` +
      `- Objetivo: ${goalText}\n` +
      `- Zona de Malestar: ${zoneText}\n` +
      `- Equipo Recomendado: ${recommendation.name} (${recommendation.brand})\n\n` +
      `Quisiera cotizar formalmente este equipo.`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5215555555555?text=${encoded}`, "_blank");
  };

  return (
    <section className="quiz-section container">
      <div className="text-center quiz-header">
        <span className="section-label">Diagnóstico Inteligente</span>
        <h2>Recomendador Clínico de Productos</h2>
        <p className="quiz-subtitle">Configura tus parámetros médicos y simula el tratamiento óptimo para tu sintomatología.</p>
      </div>

      <div className="quiz-box-wrapper glass">
        <div className="console-mesh-grid"></div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Quiz Options */}
          {!isScanning && recommendation === null && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="quiz-step-viewport"
            >
              <div className="step-counter-header">
                <span className="step-tag">Fase de Configuración {currentStep + 1} / 3</span>
                <div className="step-progress-bar">
                  <div className="fill" style={{ width: `${((currentStep + 1) / 3) * 100}%` }}></div>
                </div>
              </div>

              <h3 className="quiz-question-txt">{QUIZ_QUESTIONS[currentStep].question}</h3>

              {currentStep !== 1 ? (
                <div className="quiz-options-list">
                  {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(opt.value)}
                      className="quiz-option-card glass"
                    >
                      <div className="opt-icon-circle">
                        {opt.icon}
                      </div>
                      <div className="opt-card-meta">
                        <span className="opt-card-title">{opt.text}</span>
                        <span className="opt-card-desc">{opt.subtext}</span>
                      </div>
                      <ChevronRight size={16} className="opt-card-arrow" />
                    </button>
                  ))}
                </div>
              ) : (
                /* Question 2: PREMIUM HIGH-FIDELITY HUMAN BLUEPRINT HUD MAP (Realistic body silhouette outline) */
                <div className="anatomy-selector-workspace grid-2">
                  
                  <div className="body-blueprint-map-box">
                    <svg viewBox="0 0 200 160" className="interactive-blueprint-svg">
                      
                      {/* Outer circular HUD coordinates */}
                      <circle cx="100" cy="74" r="66" stroke="rgba(13, 148, 136, 0.05)" strokeWidth="0.75" fill="none" strokeDasharray="3 3" />
                      <circle cx="100" cy="74" r="48" stroke="rgba(13, 148, 136, 0.03)" strokeWidth="0.5" fill="none" />

                      {/* HIGH-FIDELITY DETAILED STANDING HUMAN SILHOUETTE OUTLINE */}
                      <g className="blueprint-humanoid-contour-group">
                        {/* Head circle */}
                        <path 
                          d="M 100,5 C 97,5 95,7 95,10.5 C 95,14 97,16.5 100,16.5 C 103,16.5 105,14 105,10.5 C 105,7 103,5 100,5 Z"
                          className="bp-real-body-contour"
                        />
                        {/* Torso & Legs Contour */}
                        <path 
                          d="M 100,17.5 C 96.5,17.5 95,19.5 93,21.5 C 91.5,23 90.5,26 90,30.5 C 89,40.5 90,50.5 89,60.5 C 88.5,65.5 87,71.5 87,78.5 C 87,90.5 84.5,100.5 84.5,110.5 C 84.5,112.5 86,113.5 86,115.5 C 86,122.5 83.5,129.5 83.5,136.5 C 83.5,140.5 85,143.5 86.5,143.5 L 89.5,143.5 C 90.5,143.5 91,141.5 90.5,136.5 C 90,129.5 91.5,122.5 91.5,115.5 C 91.5,113.5 90,112.5 90,110.5 C 90,100.5 92.5,90.5 93,84.5 L 93,81.5 L 107,81.5 L 107,84.5 C 107.5,90.5 110,100.5 110,110.5 C 110,112.5 108.5,113.5 108.5,115.5 C 108.5,122.5 110,129.5 110,136.5 C 109.5,141.5 110,143.5 111,143.5 L 114,143.5 C 115.5,143.5 117,140.5 117,136.5 C 117,129.5 114.5,122.5 114.5,115.5 C 114.5,113.5 116,112.5 116,110.5 C 116,100.5 113.5,90.5 113,78.5 C 113,71.5 111.5,65.5 111,60.5 C 110,50.5 111,40.5 110,30.5 C 109.5,26 108.5,23 107,21.5 C 105,19.5 103.5,17.5 100,17.5 Z" 
                          className="bp-real-body-contour"
                        />

                        {/* Left Arm Curve */}
                        <path 
                          d="M 87,24.5 C 84,26.5 80,29.5 79,34.5 C 77,41.5 76.5,50.5 76.5,60.5 C 76.5,70.5 78,80.5 79,88.5 C 79.5,91.5 81.5,91.5 82,88.5 C 81,80.5 81.5,70.5 82.5,60.5 C 83.5,50.5 83.5,41.5 85,34.5 C 86,29.5 87,26.5 87,24.5 Z"
                          className="bp-real-body-contour"
                        />

                        {/* Right Arm Curve */}
                        <path 
                          d="M 113,24.5 C 116,26.5 120,29.5 121,34.5 C 123,41.5 123.5,50.5 123.5,60.5 C 123.5,70.5 122,80.5 121,88.5 C 120.5,91.5 118.5,91.5 118,88.5 C 119,80.5 118.5,70.5 117.5,60.5 C 116.5,50.5 116.5,41.5 115,34.5 C 114,29.5 113,26.5 113,24.5 Z"
                          className="bp-real-body-contour"
                        />
                      </g>

                      {/* Internal Medical telemetry blueprint overlays */}
                      <g className="blueprint-skeleton-group">
                        {/* Chest Heart Pulse circle */}
                        <circle cx="100" cy="42" r="3.2" className="bp-heart-pulse" />

                        {/* Collarbones */}
                        <path d="M 100,20.5 C 95,20.5 88,23.5 87,26.5" className="bp-inner-ribs" />
                        <path d="M 100,20.5 C 105,20.5 112,23.5 113,26.5" className="bp-inner-ribs" />

                        {/* Pectoral outline */}
                        <path d="M 98,32 C 94,32 91,36 91,42 C 91,46 95,48 98,48" className="bp-inner-ribs" />
                        <path d="M 102,32 C 106,32 109,36 109,42 C 109,46 105,48 102,48" className="bp-inner-ribs" />

                        {/* Spine vertebrae chain */}
                        <line x1="100" y1="20" x2="100" y2="78" className="bp-bone-spine" />
                        <circle cx="100" cy="27" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="34" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="41" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="48" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="55" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="62" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="69" r="0.9" className="bp-vert" />
                        <circle cx="100" cy="76" r="0.9" className="bp-vert" />

                        {/* Symmetrical knee joint nodes */}
                        <circle cx="83.5" cy="112" r="1.8" className="bp-joint-dot" />
                        <circle cx="116.5" cy="112" r="1.8" className="bp-joint-dot" />
                      </g>

                      {/* HUD LEADER LINES */}
                      <g className="hud-leaders-group" style={{ pointerEvents: "none" }}>
                        <polyline 
                          points="100,26 55,26 50,32" 
                          className={`hud-leader-wire ${hoveredSpot === "upper" ? "active" : ""}`} 
                        />
                        <polyline 
                          points="100,68 145,68 150,74" 
                          className={`hud-leader-wire ${hoveredSpot === "lumbar" ? "active" : ""}`} 
                        />
                        <polyline 
                          points="83.5,112 55,112 50,118" 
                          className={`hud-leader-wire ${hoveredSpot === "lower" ? "active" : ""}`} 
                        />
                      </g>

                      {/* INTERACTIVE HUD CLICK CLUSTERS */}
                      {/* Cervical Node Group */}
                      <g 
                        className={`anatomical-node-spot ${hoveredSpot === "upper" ? "hovered" : ""}`}
                        onMouseEnter={() => setHoveredSpot("upper")}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onClick={() => handleOptionSelect("upper")}
                      >
                        <circle cx="100" cy="26" r="4.5" className="target-core" />
                        <circle cx="100" cy="26" r="9" className="target-ring-outer" />
                        <rect x="2" y="26" width="44" height="12" rx="3" className="hud-label-card" />
                        <text x="24" y="34" className="hud-label-text">CERVICAL</text>
                      </g>

                      {/* Lumbar Node Group */}
                      <g 
                        className={`anatomical-node-spot ${hoveredSpot === "lumbar" ? "hovered" : ""}`}
                        onMouseEnter={() => setHoveredSpot("lumbar")}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onClick={() => handleOptionSelect("lumbar")}
                      >
                        <circle cx="100" cy="68" r="4.5" className="target-core" />
                        <circle cx="100" cy="68" r="9" className="target-ring-outer" />
                        <rect x="152" y="68" width="44" height="12" rx="3" className="hud-label-card" />
                        <text x="174" y="76" className="hud-label-text">LUMBAR</text>
                      </g>

                      {/* Knee / Joint Node Group */}
                      <g 
                        className={`anatomical-node-spot ${hoveredSpot === "lower" ? "hovered" : ""}`}
                        onMouseEnter={() => setHoveredSpot("lower")}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onClick={() => handleOptionSelect("lower")}
                      >
                        {/* Left knee */}
                        <circle cx="83.5" cy="112" r="4.5" className="target-core" />
                        <circle cx="83.5" cy="112" r="9" className="target-ring-outer" />
                        {/* Right knee */}
                        <circle cx="116.5" cy="112" r="4.5" className="target-core" />
                        <circle cx="116.5" cy="112" r="9" className="target-ring-outer" />
                        
                        <rect x="2" y="112" width="44" height="12" rx="3" className="hud-label-card" />
                        <text x="24" y="120" className="hud-label-text">ARTICULAR</text>
                      </g>
                    </svg>
                  </div>

                  <div className="anatomy-instruction-col">
                    <div className="instruction-heading">
                      <Target size={20} className="text-accent" />
                      <h5>Consola de Mapeo Clínico</h5>
                    </div>
                    <p className="inst-p">
                      Pasa el cursor sobre el holograma y haz clic directamente en los **nodos de neón** correspondientes a la zona de tratamiento muscular requerida.
                    </p>

                    <div className="anatomy-help-cards">
                      <button 
                        className={`help-spot-pill ${hoveredSpot === "upper" ? "focused" : ""}`} 
                        onMouseEnter={() => setHoveredSpot("upper")}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onClick={() => handleOptionSelect("upper")}
                      >
                        <strong>Fase Cervical:</strong> Hombros, cuello y trapecio.
                      </button>
                      <button 
                        className={`help-spot-pill ${hoveredSpot === "lumbar" ? "focused" : ""}`} 
                        onMouseEnter={() => setHoveredSpot("lumbar")}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onClick={() => handleOptionSelect("lumbar")}
                      >
                        <strong>Fase Lumbar:</strong> Espalda baja, dorsales e inflamación de ciática.
                      </button>
                      <button 
                        className={`help-spot-pill ${hoveredSpot === "lower" ? "focused" : ""}`} 
                        onMouseEnter={() => setHoveredSpot("lower")}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onClick={() => handleOptionSelect("lower")}
                      >
                        <strong>Fase Articular:</strong> Rodillas, codos y articulaciones de carga.
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: Scanning Diagnostics */}
          {isScanning && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="quiz-scanning-viewport"
            >
              <div className="scanner-hud-grid grid-2">
                <div className="hud-silhouette-box">
                  <svg viewBox="0 0 200 160" className="scanning-silhouette-svg">
                    {/* Realistic body paths drawn inside the scanner */}
                    <path 
                      d="M 100,5 C 97,5 95,7 95,10.5 C 95,14 97,16.5 100,16.5 C 103,16.5 105,14 105,10.5 C 105,7 103,5 100,5 Z"
                      stroke="rgba(13, 148, 136, 0.4)" 
                      strokeWidth="0.8" 
                      fill="rgba(13, 148, 136, 0.05)" 
                    />
                    <path 
                      d="M 100,17.5 C 96.5,17.5 95,19.5 93,21.5 C 91.5,23 90.5,26 90,30.5 C 89,40.5 90,50.5 89,60.5 C 88.5,65.5 87,71.5 87,78.5 C 87,90.5 84.5,100.5 84.5,110.5 C 84.5,112.5 86,113.5 86,115.5 C 86,122.5 83.5,129.5 83.5,136.5 C 83.5,140.5 85,143.5 86.5,143.5 L 89.5,143.5 C 90.5,143.5 91,141.5 90.5,136.5 C 90,129.5 91.5,122.5 91.5,115.5 C 91.5,113.5 90,112.5 90,110.5 C 90,100.5 92.5,90.5 93,84.5 L 93,81.5 L 107,81.5 L 107,84.5 C 107.5,90.5 110,100.5 110,110.5 C 110,112.5 108.5,113.5 108.5,115.5 C 108.5,122.5 110,129.5 110,136.5 C 109.5,141.5 110,143.5 111,143.5 L 114,143.5 C 115.5,143.5 117,140.5 117,136.5 C 117,129.5 114.5,122.5 114.5,115.5 C 114.5,113.5 116,112.5 116,110.5 C 116,100.5 113.5,90.5 113,78.5 C 113,71.5 111.5,65.5 111,60.5 C 110,50.5 111,40.5 110,30.5 C 109.5,26 108.5,23 107,21.5 C 105,19.5 103.5,17.5 100,17.5 Z" 
                      stroke="rgba(13, 148, 136, 0.4)" 
                      strokeWidth="0.8" 
                      fill="rgba(13, 148, 136, 0.05)" 
                    />
                    <path 
                      d="M 87,24.5 C 84,26.5 80,29.5 79,34.5 C 77,41.5 76.5,50.5 76.5,60.5 C 76.5,70.5 78,80.5 79,88.5 C 79.5,91.5 81.5,91.5 82,88.5 C 81,80.5 81.5,70.5 82.5,60.5 C 83.5,50.5 83.5,41.5 85,34.5 C 86,29.5 87,26.5 87,24.5 Z"
                      stroke="rgba(13, 148, 136, 0.4)" 
                      strokeWidth="0.8" 
                      fill="rgba(13, 148, 136, 0.05)" 
                    />
                    <path 
                      d="M 113,24.5 C 116,26.5 120,29.5 121,34.5 C 123,41.5 123.5,50.5 123.5,60.5 C 123.5,70.5 122,82 121,88.5 C 120.5,91.5 118.5,91.5 118,88.5 C 119,80.5 118.5,70.5 117.5,60.5 C 116.5,50.5 116.5,41.5 115,34.5 C 114,29.5 113,26.5 113,24.5 Z"
                      stroke="rgba(13, 148, 136, 0.4)" 
                      strokeWidth="0.8" 
                      fill="rgba(13, 148, 136, 0.05)" 
                    />
                    
                    <div className="laser-sweep-line-console"></div>
                  </svg>
                </div>

                <div className="hud-telemetry-box text-left">
                  <span className="telemetry-label">Consola de Diagnóstico</span>
                  <h4 className="glowing-telemetry-title">Escaneo Bioeléctrico Activo</h4>
                  
                  <div className="telemetry-item">
                    <span>Impedancia de Tejidos:</span>
                    <strong className="text-teal">{scanTelemetry.impedance} Ω</strong>
                  </div>
                  <div className="telemetry-item">
                    <span>Voltaje Umbral (Nervio):</span>
                    <strong className="text-teal">{scanTelemetry.voltage} mV</strong>
                  </div>
                  <div className="telemetry-item">
                    <span>Frecuencia Óptima:</span>
                    <strong className="text-teal">{scanTelemetry.frequency} MHz</strong>
                  </div>
                  <div className="telemetry-item">
                    <span>Estado del Escaneo:</span>
                    <span className="scan-status-pill animate-pulse">ANALIZANDO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CLINICAL REPORT DIAGNOSTIC RESULT */}
          {recommendation !== null && (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="quiz-result-viewport"
            >
              <div className="result-grid grid-2">
                
                <div className="result-narrative-col">
                  <span className="recommendation-badge">
                    <span className="live-pulse-dot-green"></span>
                    Informe Terapéutico Cargado
                  </span>
                  <h4 className="result-clinical-title">Resultados del Diagnóstico</h4>
                  <p className="rec-desc">
                    El algoritmo de dosificación ha identificado compatibilidad óptima con la línea <strong>{recommendation.brand}</strong>. 
                    Este equipo proporciona los parámetros de energía específicos para las necesidades seleccionadas.
                  </p>

                  <div className="telemetry-dashboard-panel glass">
                    <span className="dash-heading">Telemetría de Eficacia Terapéutica</span>
                    
                    <div className="compatibility-gauges-row">
                      <div className="gauge-box">
                        <svg className="gauge-svg" viewBox="0 0 36 36">
                          <path className="gauge-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <motion.path 
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: "95, 100" }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="gauge-fill" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <span className="gauge-label">Alivio Dolor: 95%</span>
                      </div>

                      <div className="gauge-box">
                        <svg className="gauge-svg" viewBox="0 0 36 36">
                          <path className="gauge-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <motion.path 
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: "88, 100" }}
                            transition={{ duration: 1.2, delay: 0.4 }}
                            className="gauge-fill" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <span className="gauge-label">Fibras: 88%</span>
                      </div>

                      <div className="gauge-box">
                        <svg className="gauge-svg" viewBox="0 0 36 36">
                          <path className="gauge-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <motion.path 
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: "92, 100" }}
                            transition={{ duration: 1.2, delay: 0.6 }}
                            className="gauge-fill" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          />
                        </svg>
                        <span className="gauge-label">Rango Art: 92%</span>
                      </div>
                    </div>
                  </div>

                  <div className="quiz-result-action-strip">
                    <button className="reset-quiz-btn" onClick={handleReset}>
                      <RefreshCw size={14} /> Reconfigurar Parámetros
                    </button>
                    
                    <button className="whatsapp-quote-rec-btn" onClick={handleWhatsAppQuote}>
                      <Zap size={14} /> Solicitar Cotización Formal
                    </button>
                  </div>
                </div>

                {/* Right Column: Dynamic "Informe Clínico" Medical Report card layout */}
                <div className="result-card-col">
                  <div className="result-medical-report-card glass">
                    <div className="report-glow-corner" style={{ background: recommendation.imageBg }}></div>
                    
                    <div className="report-header-console">
                      <div className="report-seal-block">
                        <div className="seal-circle"></div>
                        <span>BRUCE MEDICAL INC.</span>
                      </div>
                      <span className="report-id-code">REG-Nº: {recommendation.id.toUpperCase()}</span>
                    </div>

                    <div className="report-body-divider"></div>

                    <div className="report-display-workspace">
                      <div className="report-product-image-frame" style={{ background: recommendation.imageBg }}>
                        <div 
                          className="report-svg-box"
                          dangerouslySetInnerHTML={{ __html: recommendation.imageSvg }}
                        />
                      </div>
                      
                      <div className="report-product-meta">
                        <span className="report-brand-tag">{recommendation.brand}</span>
                        <h4 className="report-product-title">{recommendation.name}</h4>
                        <span className="report-badge-status-glow">Garantía Directa Bruce</span>
                      </div>
                    </div>

                    <div className="report-barcode-strip">
                      <div className="barcode-bars"></div>
                      <span className="barcode-number">COMPATIBLE CERTIFIED</span>
                    </div>

                    <div className="report-purchase-actions">
                      <div className="report-price-tag">${recommendation.price.toLocaleString()} MXN</div>
                      
                      <div className="report-action-buttons-row">
                        <button 
                          className="btn btn-secondary btn-report-inspect"
                          onClick={() => onOpenProductModal(recommendation)}
                        >
                          <Eye size={14} /> Detalles
                        </button>
                        <button 
                          className={`btn btn-accent btn-report-buy ${addedItem ? "success" : ""}`}
                          onClick={() => handleBuyClick(recommendation)}
                          disabled={addedItem}
                        >
                          {addedItem ? <Check size={14} /> : <ShoppingCart size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .quiz-section {
          padding: 6rem 2rem;
          background: var(--bg-primary);
        }

        .quiz-header {
          margin-bottom: 3.5rem;
        }

        .quiz-subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        /* Console Mesh Panel */
        .quiz-box-wrapper {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 32px;
          padding: 3rem;
          box-shadow: var(--shadow-md);
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .console-mesh-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(13, 148, 136, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 148, 136, 0.015) 1px, transparent 1px);
          top: 0;
          left: 0;
          z-index: 0;
          pointer-events: none;
        }

        .quiz-step-viewport {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 1;
        }

        .step-counter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }

        .step-tag {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .step-progress-bar {
          height: 6px;
          background: var(--bg-secondary);
          border-radius: 99px;
          flex-grow: 1;
          overflow: hidden;
        }

        .step-progress-bar .fill {
          height: 100%;
          background: var(--accent-color);
          border-radius: 99px;
          transition: width 0.35s ease;
        }

        .quiz-question-txt {
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1.2;
          color: var(--text-primary);
        }

        /* Option cards */
        .quiz-options-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quiz-option-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 1.25rem 1.75rem;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .quiz-option-card:hover {
          border-color: var(--accent-color);
          background: var(--accent-light);
          transform: translateX(6px);
        }

        .opt-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .quiz-option-card:hover .opt-icon-circle {
          background: var(--accent-color);
          color: var(--white);
        }

        .opt-card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex-grow: 1;
        }

        .opt-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .opt-card-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .opt-card-arrow {
          color: var(--text-tertiary);
          transition: transform var(--transition-fast);
        }

        .quiz-option-card:hover .opt-card-arrow {
          transform: translateX(4px);
          color: var(--accent-color);
        }

        /* Anatomy Blueprint Grid Map Workspace */
        .anatomy-selector-workspace {
          align-items: center;
          gap: 3rem;
          margin-top: 1rem;
        }

        .body-blueprint-map-box {
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a; /* Deep tech dark console contrast */
          border-radius: 20px;
          padding: 1.5rem;
          border: 1px solid rgba(13, 148, 136, 0.15);
          box-shadow: inset 0 0 20px rgba(13, 148, 136, 0.1);
        }

        .interactive-blueprint-svg {
          height: 100%;
          width: 100%;
        }

        /* REALISTIC SMOOTH BODY PATH STYLING */
        .bp-real-body-contour {
          fill: rgba(13, 148, 136, 0.05);
          stroke: rgba(13, 148, 136, 0.3);
          stroke-width: 0.8;
          stroke-linecap: round;
          transition: all 0.3s ease;
        }

        /* Blueprint Skeletal style paths */
        .bp-bone {
          stroke: rgba(13, 148, 136, 0.15);
          stroke-width: 0.8;
          stroke-linecap: round;
        }

        .bp-inner-ribs {
          fill: none;
          stroke: rgba(13, 148, 136, 0.12);
          stroke-width: 0.6;
        }

        .bp-bone-spine {
          stroke: rgba(13, 148, 136, 0.2);
          stroke-width: 1;
        }

        .bp-joint-knee {
          fill: none;
          stroke: rgba(13, 148, 136, 0.2);
          stroke-width: 0.5;
        }

        .bp-vert {
          fill: rgba(13, 148, 136, 0.25);
        }

        .bp-heart-pulse {
          fill: #0d9488;
          animation: bpHeart 1.4s infinite alternate;
        }

        @keyframes bpHeart {
          from { transform: scale(0.9); opacity: 0.5; }
          to { transform: scale(1.15); opacity: 1; }
        }

        /* HUD Leader Wire lines */
        .hud-leader-wire {
          fill: none;
          stroke: rgba(13, 148, 136, 0.12);
          stroke-width: 0.5;
          transition: all var(--transition-fast);
        }

        .hud-leader-wire.active {
          stroke: #ef4444;
          stroke-width: 0.8;
          filter: drop-shadow(0 0 2px #ef4444);
        }

        /* Click Clusters Spots */
        .anatomical-node-spot {
          cursor: pointer;
        }

        .target-core {
          fill: #ef4444;
          transition: all var(--transition-fast);
        }

        .target-ring-outer {
          fill: none;
          stroke: #ef4444;
          stroke-width: 0.5;
          transform-origin: center;
          animation: ringPulseSpot 2s infinite ease-out;
        }

        .hud-label-card {
          fill: rgba(30, 41, 59, 0.85);
          stroke: rgba(13, 148, 136, 0.15);
          stroke-width: 0.5;
          transition: all var(--transition-fast);
        }

        .hud-label-text {
          font-family: var(--font-heading);
          font-size: 4px;
          font-weight: 800;
          fill: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.05em;
          text-anchor: middle;
          transition: all var(--transition-fast);
        }

        /* Hovered Spot states */
        .anatomical-node-spot.hovered .target-core {
          fill: var(--accent-color);
        }

        .anatomical-node-spot.hovered .target-ring-outer {
          stroke: var(--accent-color);
        }

        .anatomical-node-spot.hovered .hud-label-card {
          fill: var(--accent-color);
          stroke: var(--accent-color);
        }

        .anatomical-node-spot.hovered .hud-label-text {
          fill: var(--white);
        }

        .anatomy-instruction-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .instruction-heading {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .instruction-heading h5 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .inst-p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .anatomy-help-cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .help-spot-pill {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .help-spot-pill.focused {
          border-color: var(--accent-color);
          background: var(--accent-light);
          transform: translateX(4px);
        }

        .help-spot-pill strong {
          color: var(--accent-color);
        }

        /* Scanning HUD */
        .quiz-scanning-viewport {
          z-index: 1;
          width: 100%;
        }

        .scanner-hud-grid {
          align-items: center;
          gap: 4rem;
        }

        .hud-silhouette-box {
          height: 320px;
          background: #0f172a;
          border-radius: 20px;
          border: 1px solid rgba(13, 148, 136, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .scanning-silhouette-svg {
          height: 90%;
        }

        .laser-sweep-line-console {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--accent-color);
          box-shadow: 0 0 12px var(--accent-color);
          top: 0;
          animation: sweep 1.8s infinite linear;
        }

        @keyframes sweep {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        .hud-telemetry-box {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .telemetry-label {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .glowing-telemetry-title {
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
        }

        .telemetry-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .telemetry-item strong {
          font-family: var(--font-heading);
          font-size: 1rem;
        }

        .scan-status-pill {
          background: #ffe4e6;
          color: #be123c;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        /* OVERHAULED RESULT DIAGNOSTIC DISPLAY */
        .quiz-result-viewport {
          z-index: 1;
        }

        .recommendation-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 800;
          color: #0f766e;
          background: #ccfbf1;
          border: 1px solid rgba(13, 148, 136, 0.2);
          padding: 0.35rem 0.8rem;
          border-radius: 9999px;
          width: fit-content;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 8px rgba(13, 148, 136, 0.05);
          margin-bottom: 0.5rem;
        }

        .live-pulse-dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
          animation: pulseGreen 1.4s infinite alternate;
        }

        @keyframes pulseGreen {
          from { transform: scale(0.9); opacity: 0.6; }
          to { transform: scale(1.3); opacity: 1; }
        }

        .result-grid {
          align-items: center;
          gap: 4rem;
        }

        .result-clinical-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        /* Telemetry dashboard glass box */
        .telemetry-dashboard-panel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dash-heading {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }

        .compatibility-gauges-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .gauge-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }

        .gauge-svg {
          width: 50px;
          height: 50px;
        }

        .gauge-track {
          fill: none;
          stroke: rgba(15, 23, 42, 0.05);
          stroke-width: 2.8;
        }

        .gauge-fill {
          fill: none;
          stroke: var(--accent-color);
          stroke-width: 2.8;
          stroke-linecap: round;
        }

        .gauge-label {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Action strip */
        .quiz-result-action-strip {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .reset-quiz-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          transition: color var(--transition-fast);
        }

        .reset-quiz-btn:hover {
          color: var(--accent-color);
        }

        .whatsapp-quote-rec-btn {
          background: #25d366;
          color: var(--white);
          border: 1px solid #22c55e;
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          font-size: 0.8rem;
          font-family: var(--font-heading);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
        }

        .whatsapp-quote-rec-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
        }

        /* MEDICAL CLINICAL REPORT DECK CARD */
        .result-medical-report-card {
          width: 100%;
          max-width: 320px;
          background: var(--white);
          border: 2px solid var(--text-primary);
          border-radius: 24px;
          padding: 1.75rem;
          box-shadow: 6px 6px 0px var(--accent-color);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          overflow: hidden;
        }

        .report-glow-corner {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.08;
          top: -20px;
          right: -20px;
          z-index: 0;
          pointer-events: none;
        }

        .report-header-console {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-heading);
          z-index: 1;
        }

        .report-seal-block {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .seal-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 6px var(--accent-color);
        }

        .report-id-code {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
        }

        .report-body-divider {
          height: 1px;
          background: var(--border-color);
          width: 100%;
          z-index: 1;
        }

        .report-display-workspace {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 1;
        }

        .report-product-image-frame {
          height: 140px;
          width: 100%;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .report-svg-box {
          width: 55%;
          height: 55%;
        }

        .report-svg-box svg {
          width: 100%;
          height: 100%;
        }

        .report-product-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
        }

        .report-brand-tag {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        .report-product-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .report-badge-status-glow {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-color);
          display: inline-block;
        }

        /* Barcode simulated */
        .report-barcode-strip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          z-index: 1;
        }

        .barcode-bars {
          width: 100%;
          height: 24px;
          background-image: repeating-linear-gradient(
            to right,
            var(--text-primary) 0px,
            var(--text-primary) 2px,
            transparent 2px,
            transparent 6px,
            var(--text-primary) 6px,
            var(--text-primary) 7px,
            transparent 7px,
            transparent 10px
          );
        }

        .barcode-number {
          font-family: var(--font-heading);
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.15em;
        }

        /* Purchase actions strip */
        .report-purchase-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          z-index: 1;
        }

        .report-price-tag {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
          text-align: left;
        }

        .report-action-buttons-row {
          display: flex;
          gap: 0.5rem;
        }

        .report-action-buttons-row button {
          padding: 0.6rem 1rem;
          font-size: 0.8rem;
          border-radius: 8px;
        }

        .btn-report-buy.success {
          background: #25d366;
        }

        @media (max-width: 1024px) {
          .result-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .result-card-col {
            width: 100%;
          }
          .result-medical-report-card {
            max-width: 100%;
          }
          .anatomy-selector-workspace {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .body-blueprint-map-box {
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
}
