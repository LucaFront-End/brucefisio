import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, ShieldCheck, Activity, Thermometer, ArrowDown } from "lucide-react";

export default function SpecialtyCurtain({ onExploreClick }) {
  const containerRef = useRef(null);
  
  // Track scroll progress of this specific section (240vh travel)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Curtain panel slide out (fades COMPLETELY to 0 at 0.50 to prevent edge clipping)
  const leftX = useTransform(scrollYProgress, [0.32, 0.55], ["0%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0.32, 0.55], ["0%", "110%"]);
  const panelOpacity = useTransform(scrollYProgress, [0.32, 0.50], [1, 0]);

  // 2. Wave and laser simulation animations (0% to 32% scroll)
  const contentY = useTransform(scrollYProgress, [0, 0.22], [20, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [0.7, 1]);
  const waveScaleY = useTransform(scrollYProgress, [0, 0.32], [1, 2.5]);
  const laserScale = useTransform(scrollYProgress, [0, 0.32], [0.85, 1.35]);
  const laserGlow = useTransform(
    scrollYProgress, 
    [0, 0.32], 
    ["0px 0px 8px rgba(239, 68, 68, 0.5)", "0px 0px 22px rgba(239, 68, 68, 0.9)"]
  );

  // 3. Underneath Revealed Timeline (fades in and remains firmly at 100% opacity)
  const bgMessageOpacity = useTransform(scrollYProgress, [0.42, 0.56, 1.0], [0, 1, 1]);
  const bgMessageScale = useTransform(scrollYProgress, [0.42, 0.56], [0.95, 1]);

  // 4. VERTICAL TRACK PROGRESS BEAD (Neon ball slides from top to bottom)
  const lineProgressHeight = useTransform(scrollYProgress, [0.55, 0.92], ["0%", "100%"]);
  const beadTop = useTransform(scrollYProgress, [0.55, 0.92], ["6%", "94%"]);
  const beadOpacity = useTransform(scrollYProgress, [0.53, 0.56, 0.92, 0.95], [0, 1, 1, 0]);

  // 5. SEQUENTIAL CARD TIMELINE REVEALS (Fades in)
  const step1Opacity = useTransform(scrollYProgress, [0.55, 0.64], [0, 1]);
  const step1X = useTransform(scrollYProgress, [0.55, 0.64], [25, 0]);

  const step2Opacity = useTransform(scrollYProgress, [0.64, 0.73], [0, 1]);
  const step2X = useTransform(scrollYProgress, [0.64, 0.73], [25, 0]);

  const step3Opacity = useTransform(scrollYProgress, [0.73, 0.82], [0, 1]);
  const step3X = useTransform(scrollYProgress, [0.73, 0.82], [25, 0]);

  const step4Opacity = useTransform(scrollYProgress, [0.82, 0.91], [0, 1]);
  const step4X = useTransform(scrollYProgress, [0.82, 0.91], [25, 0]);

  // 6. DYNAMIC ACTIVE GLOW FOR CARDS (Borders and shadows light up when scroll is near)
  const step1Border = useTransform(
    scrollYProgress,
    [0.53, 0.62, 0.69],
    ["rgba(226, 232, 240, 1)", "rgba(13, 148, 136, 1)", "rgba(226, 232, 240, 1)"]
  );
  const step1Shadow = useTransform(
    scrollYProgress,
    [0.53, 0.62, 0.69],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 8px 24px rgba(13, 148, 136, 0.16)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  const step2Border = useTransform(
    scrollYProgress,
    [0.62, 0.71, 0.78],
    ["rgba(226, 232, 240, 1)", "rgba(13, 148, 136, 1)", "rgba(226, 232, 240, 1)"]
  );
  const step2Shadow = useTransform(
    scrollYProgress,
    [0.62, 0.71, 0.78],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 8px 24px rgba(13, 148, 136, 0.16)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  const step3Border = useTransform(
    scrollYProgress,
    [0.71, 0.80, 0.87],
    ["rgba(226, 232, 240, 1)", "rgba(13, 148, 136, 1)", "rgba(226, 232, 240, 1)"]
  );
  const step3Shadow = useTransform(
    scrollYProgress,
    [0.71, 0.80, 0.87],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 8px 24px rgba(13, 148, 136, 0.16)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  const step4Border = useTransform(
    scrollYProgress,
    [0.80, 0.89, 0.96],
    ["rgba(226, 232, 240, 1)", "rgba(13, 148, 136, 1)", "rgba(226, 232, 240, 1)"]
  );
  const step4Shadow = useTransform(
    scrollYProgress,
    [0.80, 0.89, 0.96],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 8px 24px rgba(13, 148, 136, 0.16)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  return (
    <div ref={containerRef} className="curtain-scroll-container">
      {/* Sticky viewport frame */}
      <div className="curtain-sticky-viewport">
        
        {/* UNDERNEATH REVEALED TIMELINE SECTION */}
        <motion.div 
          style={{ opacity: bgMessageOpacity, scale: bgMessageScale }}
          className="curtain-revealed-bg"
        >
          <div className="container timeline-grid grid-2">
            
            {/* Left side: Editorial Heading */}
            <div className="timeline-intro-col">
              <span className="section-label">Fisioterapia en Fases</span>
              <h2>Ruta de Recuperación Bruce Médica</h2>
              <p className="timeline-intro-p">
                Entendemos que la rehabilitación exitosa no depende de un solo producto. 
                Es una secuencia clínica inteligente que va desde el diagnóstico hasta la re-educación del movimiento activo.
              </p>
              
              <div className="timeline-guide-indicator">
                <span className="scroll-arrow-pulse">
                  <ArrowDown size={18} />
                </span>
                <span>Desliza para avanzar el tratamiento</span>
              </div>
            </div>

            {/* Right side: Interactive vertical progress timeline */}
            <div className="timeline-track-col">
              
              {/* Backing track line */}
              <div className="timeline-vertical-line-track">
                {/* Active progress indicator line */}
                <motion.div 
                  style={{ height: lineProgressHeight }} 
                  className="timeline-vertical-line-fill" 
                />
                
                {/* Neon progress bead following the scroll height */}
                <motion.div 
                  style={{ top: beadTop, opacity: beadOpacity }}
                  className="timeline-bead-pulse"
                />
              </div>

              {/* Step items stack */}
              <div className="timeline-steps-list">
                
                {/* Step 1 */}
                <motion.div 
                  style={{ opacity: step1Opacity, x: step1X, borderColor: step1Border, boxShadow: step1Shadow }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num">1</div>
                  <div className="step-card-content">
                    <div className="step-card-header">
                      <h5>Diagnóstico & Escáner</h5>
                      <span className="card-phase-tag">Fase 1</span>
                    </div>
                    <p>Uso de termografía clínica y escaneo laser bio-térmico para localizar contracturas y focos de dolor activos.</p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  style={{ opacity: step2Opacity, x: step2X, borderColor: step2Border, boxShadow: step2Shadow }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num">2</div>
                  <div className="step-card-content">
                    <div className="step-card-header">
                      <h5>Estimulación Celular</h5>
                      <span className="card-phase-tag text-teal">Fase 2</span>
                    </div>
                    <p>Aplicación de radiofrecuencia a 4.4 MHz (Cureo) para acelerar el intercambio iónico y desinflamar tejidos agudos.</p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  style={{ opacity: step3Opacity, x: step3X, borderColor: step3Border, boxShadow: step3Shadow }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num">3</div>
                  <div className="step-card-content">
                    <div className="step-card-header">
                      <h5>Bloqueo & Crioláser</h5>
                      <span className="card-phase-tag text-copper">Fase 3</span>
                    </div>
                    <p>Choque térmico a -30°C combinado con láser de alta intensidad (Chelt) para un efecto analgésico duradero.</p>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div 
                  style={{ opacity: step4Opacity, x: step4X, borderColor: step4Border, boxShadow: step4Shadow }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num">4</div>
                  <div className="step-card-content">
                    <div className="step-card-header">
                      <h5>Rehabilitación Activa</h5>
                      <span className="card-phase-tag text-green">Fase 4</span>
                    </div>
                    <p>Re-educación del movimiento mediante vendaje neuromuscular elástico, loops progresivos y masaje por percusión.</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* LEFT PANEL: CUREO® 5.0 (REALIDAD VIRTUAL) */}
        <motion.div 
          style={{ x: leftX, opacity: panelOpacity }}
          className="curtain-panel panel-left"
        >
          <motion.div 
            style={{ y: contentY, opacity: contentOpacity }}
            className="panel-inner-content"
          >
            <div className="panel-header-badge teal-badge">
              <Activity size={14} /> CUREO® 5.0 VR REHABILITATION
            </div>
            
            <h3 className="panel-title">Rehabilitación con Realidad Virtual</h3>
            <p className="panel-desc">
              Terapias inmersivas y gamificadas para recuperación motora y cognitiva. 
              Módulos Active, Moto, Cogni, Daily, Finger, Relax y Activities con reporte CUREO HUB en la nube.
            </p>

            <div className="panel-benefits-list">
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-accent" />
                <span>+40% de Adherencia Terapéutica con gamificación</span>
              </div>
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-accent" />
                <span>7 Módulos de Entrenamiento Moto-Cognitivo</span>
              </div>
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-accent" />
                <span>CUREO Group: Atención de hasta 6 pacientes</span>
              </div>
            </div>

            {/* Interactive wave visual simulation */}
            <div className="panel-visual-simulator cureo-waves-visual">
              <div className="simulator-grid-bg"></div>
              <div className="wave-lines-container">
                <motion.span style={{ scaleY: waveScaleY }} className="wave-line wl-1"></motion.span>
                <motion.span style={{ scaleY: waveScaleY }} className="wave-line wl-2"></motion.span>
                <motion.span style={{ scaleY: waveScaleY }} className="wave-line wl-3"></motion.span>
              </div>
              <span className="wave-indicator-text">Entorno Inmersivo: VR 5.0 CUREOSITY</span>
            </div>

            <button className="btn btn-secondary explore-btn" onClick={onExploreClick}>
              Ver Ficha de CUREO® 5.0
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL: CHELT THERAPY (5 TERAPIAS) */}
        <motion.div 
          style={{ x: rightX, opacity: panelOpacity }}
          className="curtain-panel panel-right"
        >
          <motion.div 
            style={{ y: contentY, opacity: contentOpacity }}
            className="panel-inner-content"
          >
            <div className="panel-header-badge copper-badge">
              <Zap size={14} /> CHELT THERAPY (5 TERAPIAS EN 1)
            </div>
            
            <h3 className="panel-title">5 Terapias. Un Solo Equipo.</h3>
            <p className="panel-desc">
              Sinergia exclusiva de Laserterapia THEAL (92W), Crioterapia a -40°C, Termoterapia, Choque Térmico (95°C Δ en &lt;1s) y Sinergia THEAL-CRIO para mayor penetración del haz láser.
            </p>

            <div className="panel-benefits-list">
              <div className="benefit-pill">
                <Thermometer size={16} className="text-copper" />
                <span>Sinergia THEAL-CRIO: Aire -40°C como vector láser</span>
              </div>
              <div className="benefit-pill">
                <Thermometer size={16} className="text-copper" />
                <span>92W Potencia Media & 8 Longitudes de Onda</span>
              </div>
              <div className="benefit-pill">
                <Thermometer size={16} className="text-copper" />
                <span>90,000+ Investigaciones & 7 Patentes</span>
              </div>
            </div>

            {/* Interactive laser visual simulation */}
            <div className="panel-visual-simulator chelt-laser-visual">
              <div className="simulator-grid-bg"></div>
              <motion.div 
                style={{ scale: laserScale }}
                className="laser-target-ring"
              >
                <motion.div 
                  style={{ boxShadow: laserGlow }}
                  className="laser-dot-glowing"
                ></motion.div>
              </motion.div>
              <span className="wave-indicator-text">Emisión: Láser THEAL 92W + Crio -40°C</span>
            </div>

            <button className="btn btn-secondary explore-btn" onClick={onExploreClick}>
              Ver Ficha de CHELT Therapy
            </button>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        /* Curtain Scroll Container - Takes up 240vh height to fit curtain open + timeline draw */
        .curtain-scroll-container {
          position: relative;
          height: 240vh;
          background: var(--bg-secondary);
        }

        .curtain-sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
        }

        /* Underneath Revealed Timeline Section */
        .curtain-revealed-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          background: var(--bg-primary);
          z-index: 1;
        }

        .timeline-grid {
          height: 100%;
          align-items: center;
          padding: var(--navbar-height) 2rem 2rem 2rem;
        }

        .timeline-intro-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-right: 2rem;
        }

        .timeline-intro-col h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .timeline-intro-p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .timeline-guide-indicator {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-family: var(--font-heading);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .scroll-arrow-pulse {
          animation: arrowFloat 1.5s infinite ease-in-out;
          color: var(--accent-color);
          display: flex;
          align-items: center;
        }

        @keyframes arrowFloat {
          0% { transform: translateY(-3px); opacity: 0.5; }
          50% { transform: translateY(3px); opacity: 1; }
          100% { transform: translateY(-3px); opacity: 0.5; }
        }

        /* Timeline Track (Right Column) */
        .timeline-track-col {
          position: relative;
          height: 80vh;
          max-height: 520px;
          display: flex;
          align-items: center;
          padding-left: 2.5rem;
          width: 100%;
        }

        .timeline-vertical-line-track {
          position: absolute;
          left: 0;
          top: 6%;
          bottom: 6%;
          width: 4px;
          background: rgba(13, 148, 136, 0.08);
          border-radius: 99px;
        }

        .timeline-vertical-line-fill {
          width: 100%;
          background: var(--accent-color);
          box-shadow: 0 0 10px rgba(13, 148, 136, 0.5);
          border-radius: 99px;
          transform-origin: top;
        }

        /* Glowing Neon Bead */
        .timeline-bead-pulse {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-color);
          z-index: 12;
          border: 2px solid var(--white);
        }

        /* Steps List */
        .timeline-steps-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 88%;
          width: 100%;
          position: relative;
        }

        .timeline-step-card {
          display: flex;
          gap: 1.25rem;
          padding: 0.75rem 1.15rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          background: var(--white);
          box-shadow: var(--shadow-sm);
          position: relative;
          transition: all var(--transition-fast);
        }

        /* Left Connector Node Num */
        .step-badge-num {
          position: absolute;
          left: -46px; /* centered on vertical line */
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-heading);
          border: 2px solid var(--white);
          z-index: 10;
          transition: all var(--transition-fast);
        }

        .timeline-step-card:hover .step-badge-num {
          background: var(--accent-color);
          color: var(--white);
          box-shadow: 0 0 8px rgba(13, 148, 136, 0.4);
        }

        .step-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .step-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .step-card-header h5 {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .card-phase-tag {
          font-size: 0.65rem;
          font-weight: 700;
          font-family: var(--font-heading);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
        }

        .card-phase-tag.text-teal { background: #e0f2fe; color: #0369a1; }
        .card-phase-tag.text-copper { background: #ffedd5; color: #c2410c; }
        .card-phase-tag.text-green { background: #dcfce7; color: #166534; }

        .timeline-step-card p {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Split Panels */
        .curtain-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          z-index: 5;
          padding: 4rem;
          box-shadow: 0 0 40px rgba(15, 23, 42, 0.03);
        }

        .panel-left {
          left: 0;
          background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);
          border-right: 1px solid rgba(13, 148, 136, 0.08);
          justify-content: flex-end;
        }

        .panel-right {
          right: 0;
          background: linear-gradient(135deg, #fef2f2 0%, #e0f2fe 100%);
          border-left: 1px solid rgba(249, 115, 22, 0.08);
          justify-content: flex-start;
        }

        .panel-inner-content {
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .panel-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          font-family: var(--font-heading);
          width: fit-content;
        }

        .teal-badge {
          background: #ccfbf1;
          color: #0f766e;
          border: 1px solid rgba(13, 148, 136, 0.15);
        }

        .copper-badge {
          background: #ffedd5;
          color: #c2410c;
          border: 1px solid rgba(249, 115, 22, 0.15);
        }

        .panel-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .panel-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .panel-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .benefit-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .text-copper {
          color: #f97316;
        }

        .explore-btn {
          width: fit-content;
          padding: 0.65rem 1.25rem;
          font-size: 0.85rem;
          border-radius: 10px;
          margin-top: 0.5rem;
        }

        /* Visual Simulator Boxes */
        .panel-visual-simulator {
          position: relative;
          height: 110px;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          background: var(--white);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .simulator-grid-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: 15px 15px;
          background-image: 
            linear-gradient(to right, rgba(15, 23, 42, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
          z-index: 0;
        }

        .wave-indicator-text {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 0.65rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          z-index: 2;
        }

        /* Wave visualizer */
        .wave-lines-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 1;
        }

        .wave-line {
          width: 60px;
          height: 4px;
          background: var(--accent-color);
          border-radius: 99px;
          transform-origin: center;
        }

        .wl-1 { animation: cellWave 1.4s infinite ease-in-out; }
        .wl-2 { animation: cellWave 1.4s infinite ease-in-out 0.25s; }
        .wl-3 { animation: cellWave 1.4s infinite ease-in-out 0.5s; }

        @keyframes cellWave {
          0% { transform: scaleY(1); opacity: 0.4; }
          50% { transform: scaleY(8); opacity: 1; background-color: var(--accent-dark); }
          100% { transform: scaleY(1); opacity: 0.4; }
        }

        /* Laser visualizer */
        .laser-target-ring {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px dashed rgba(249, 115, 22, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          animation: ringSpin 8s linear infinite;
        }

        @keyframes ringSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .laser-dot-glowing {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444;
        }

        /* Mobile and Tablet Adaptation */
        @media (max-width: 1024px) {
          .curtain-scroll-container {
            height: auto;
          }
          .curtain-sticky-viewport {
            position: relative;
            height: auto;
            flex-direction: column;
            overflow: visible;
          }
          .curtain-panel {
            position: relative;
            width: 100% !important;
            height: auto;
            padding: 3rem 1.5rem;
            transform: none !important;
            opacity: 1 !important;
            left: auto !important;
            right: auto !important;
            filter: none !important;
          }
          .curtain-revealed-bg {
            position: relative;
            height: auto;
            padding: 4rem 1.5rem;
            opacity: 1 !important;
            scale: 1 !important;
            background: var(--bg-primary);
            order: 3;
          }
          .timeline-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding: 2rem 0;
          }
          .timeline-intro-col {
            padding-right: 0;
            text-align: center;
            align-items: center;
          }
          .timeline-track-col {
            height: auto;
            max-height: none;
            padding-left: 2rem;
            justify-content: flex-start;
          }
          .timeline-vertical-line-track {
            left: 0;
          }
          .timeline-vertical-line-fill {
            height: 100% !important; /* Force fill on mobile */
          }
          .timeline-bead-pulse {
            display: none; /* Hide bead on mobile scroll lists */
          }
          .timeline-step-card {
            opacity: 1 !important;
            x: 0 !important;
            transform: none !important;
            border-color: var(--border-color) !important;
            box-shadow: var(--shadow-sm) !important;
          }
          .timeline-steps-list {
            height: auto;
            gap: 1.5rem;
          }
          .step-badge-num {
            left: -38px;
          }
          .scroll-hint-indicator {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
