import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, ShieldCheck, Activity, Thermometer, ArrowDown, Flame, Sparkles, Target, Check } from "lucide-react";

export default function SpecialtyCurtain({ onExploreClick }) {
  const containerRef = useRef(null);
  
  // Track scroll progress of this specific section (280vh travel for unhurried scroll cushion)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Curtain panel slide out (0.12 to 0.38 scroll travel)
  const leftX = useTransform(scrollYProgress, [0.12, 0.38], ["0%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0.12, 0.38], ["0%", "110%"]);
  const panelOpacity = useTransform(scrollYProgress, [0.12, 0.35], [1, 0]);

  // 2. Wave and laser simulation animations (0% to 32% scroll)
  const contentY = useTransform(scrollYProgress, [0, 0.22], [20, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [0.7, 1]);
  const waveScaleY = useTransform(scrollYProgress, [0, 0.32], [1, 2.5]);
  const laserScale = useTransform(scrollYProgress, [0, 0.32], [0.85, 1.35]);
  const laserGlow = useTransform(
    scrollYProgress, 
    [0, 0.32], 
    ["0px 0px 4px rgba(249, 115, 22, 0.2)", "0px 0px 12px rgba(249, 115, 22, 0.4)"]
  );

  // 3. Underneath Revealed Timeline (fades in and remains firmly at 100% opacity, never disappears)
  const bgMessageOpacity = useTransform(scrollYProgress, [0.35, 0.45, 1.0], [0, 1, 1]);
  const bgMessageScale = useTransform(scrollYProgress, [0.35, 0.45], [0.96, 1]);

  // 4. VERTICAL TRACK PROGRESS BEAD (Neon ball slides top to bottom, stays illuminated)
  const lineProgressHeight = useTransform(scrollYProgress, [0.45, 0.85], ["0%", "100%"]);
  const beadTop = useTransform(scrollYProgress, [0.45, 0.85], ["5%", "95%"]);
  const beadOpacity = useTransform(scrollYProgress, [0.40, 0.45, 1.0], [0, 1, 1]);

  // 5. PERSISTENT CARD TIMELINE REVEALS & HIGHLIGHTS (Teal & Copper Brand Palette)
  // Step 1: Diagnóstico
  const step1Opacity = useTransform(scrollYProgress, [0.45, 0.53, 1.0], [0, 1, 1]);
  const step1X = useTransform(scrollYProgress, [0.45, 0.53], [30, 0]);
  const step1Scale = useTransform(scrollYProgress, [0.45, 0.53, 0.61], [0.96, 1.02, 1]);
  const step1Border = useTransform(
    scrollYProgress,
    [0.45, 0.53, 0.61],
    ["rgba(226, 232, 240, 1)", "rgba(0, 126, 229, 0.4)", "rgba(226, 232, 240, 1)"]
  );
  const step1Shadow = useTransform(
    scrollYProgress,
    [0.45, 0.53, 0.61],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 6px 16px rgba(0, 126, 229, 0.1)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  // Step 2: Estimulación Celular
  const step2Opacity = useTransform(scrollYProgress, [0.54, 0.62, 1.0], [0, 1, 1]);
  const step2X = useTransform(scrollYProgress, [0.54, 0.62], [30, 0]);
  const step2Scale = useTransform(scrollYProgress, [0.54, 0.62, 0.70], [0.96, 1.02, 1]);
  const step2Border = useTransform(
    scrollYProgress,
    [0.54, 0.62, 0.70],
    ["rgba(226, 232, 240, 1)", "rgba(0, 126, 229, 0.4)", "rgba(226, 232, 240, 1)"]
  );
  const step2Shadow = useTransform(
    scrollYProgress,
    [0.54, 0.62, 0.70],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 6px 16px rgba(0, 126, 229, 0.1)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  // Step 3: Bloqueo & Crioláser
  const step3Opacity = useTransform(scrollYProgress, [0.63, 0.71, 1.0], [0, 1, 1]);
  const step3X = useTransform(scrollYProgress, [0.63, 0.71], [30, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.63, 0.71, 0.79], [0.96, 1.02, 1]);
  const step3Border = useTransform(
    scrollYProgress,
    [0.63, 0.71, 0.79],
    ["rgba(226, 232, 240, 1)", "rgba(249, 115, 22, 0.4)", "rgba(226, 232, 240, 1)"]
  );
  const step3Shadow = useTransform(
    scrollYProgress,
    [0.63, 0.71, 0.79],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 6px 16px rgba(249, 115, 22, 0.1)", "0px 2px 8px rgba(0,0,0,0.03)"]
  );

  // Step 4: Rehabilitación Activa
  const step4Opacity = useTransform(scrollYProgress, [0.72, 0.80, 1.0], [0, 1, 1]);
  const step4X = useTransform(scrollYProgress, [0.72, 0.80], [30, 0]);
  const step4Scale = useTransform(scrollYProgress, [0.72, 0.80, 0.90], [0.96, 1.02, 1]);
  const step4Border = useTransform(
    scrollYProgress,
    [0.72, 0.80, 0.90],
    ["rgba(226, 232, 240, 1)", "rgba(249, 115, 22, 0.4)", "rgba(226, 232, 240, 1)"]
  );
  const step4Shadow = useTransform(
    scrollYProgress,
    [0.72, 0.80, 0.90],
    ["0px 2px 8px rgba(0,0,0,0.03)", "0px 6px 16px rgba(249, 115, 22, 0.1)", "0px 2px 8px rgba(0,0,0,0.03)"]
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
                  style={{ 
                    opacity: step1Opacity, 
                    x: step1X, 
                    scale: step1Scale,
                    borderColor: step1Border, 
                    boxShadow: step1Shadow 
                  }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num badge-teal">
                    <span>1</span>
                  </div>

                  <div className="step-card-inner">
                    <div className="step-icon-box bg-teal-soft">
                      <Activity className="text-accent" size={20} />
                    </div>

                    <div className="step-card-content">
                      <div className="step-card-header">
                        <h5>Diagnóstico & Escáner</h5>
                        <span className="card-phase-tag tag-teal">Fase 1</span>
                      </div>
                      <p>Uso de termografía clínica y escaneo láser bio-térmico para localizar contracturas y focos de dolor activos.</p>
                      
                      <div className="step-micro-chips">
                        <span className="micro-chip"><Sparkles size={11} /> Bio-Termografía</span>
                        <span className="micro-chip"><Target size={11} /> Focos de Dolor</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  style={{ 
                    opacity: step2Opacity, 
                    x: step2X, 
                    scale: step2Scale,
                    borderColor: step2Border, 
                    boxShadow: step2Shadow 
                  }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num badge-teal">
                    <span>2</span>
                  </div>

                  <div className="step-card-inner">
                    <div className="step-icon-box bg-teal-soft">
                      <Zap className="text-accent" size={20} />
                    </div>

                    <div className="step-card-content">
                      <div className="step-card-header">
                        <h5>Estimulación Celular</h5>
                        <span className="card-phase-tag tag-teal">Fase 2</span>
                      </div>
                      <p>Aplicación de radiofrecuencia a 4.4 MHz (Cureo) para acelerar el intercambio iónico y desinflamar tejidos agudos.</p>
                      
                      <div className="step-micro-chips">
                        <span className="micro-chip"><Zap size={11} /> 4.4 MHz Cureo</span>
                        <span className="micro-chip"><Activity size={11} /> Intercambio Iónico</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  style={{ 
                    opacity: step3Opacity, 
                    x: step3X, 
                    scale: step3Scale,
                    borderColor: step3Border, 
                    boxShadow: step3Shadow 
                  }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num badge-copper">
                    <span>3</span>
                  </div>

                  <div className="step-card-inner">
                    <div className="step-icon-box bg-copper-soft">
                      <Flame className="text-copper" size={20} />
                    </div>

                    <div className="step-card-content">
                      <div className="step-card-header">
                        <h5>Bloqueo & Crioláser</h5>
                        <span className="card-phase-tag tag-copper">Fase 3</span>
                      </div>
                      <p>Choque térmico a -30°C combinado con láser de alta intensidad (Chelt) para un efecto analgésico duradero.</p>
                      
                      <div className="step-micro-chips">
                        <span className="micro-chip"><Thermometer size={11} /> Crioláser -30°C</span>
                        <span className="micro-chip"><Flame size={11} /> THEAL 92W</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div 
                  style={{ 
                    opacity: step4Opacity, 
                    x: step4X, 
                    scale: step4Scale,
                    borderColor: step4Border, 
                    boxShadow: step4Shadow 
                  }}
                  className="timeline-step-card glass"
                >
                  <div className="step-badge-num badge-copper">
                    <span>4</span>
                  </div>

                  <div className="step-card-inner">
                    <div className="step-icon-box bg-copper-soft">
                      <ShieldCheck className="text-copper" size={20} />
                    </div>

                    <div className="step-card-content">
                      <div className="step-card-header">
                        <h5>Rehabilitación Activa</h5>
                        <span className="card-phase-tag tag-copper">Fase 4</span>
                      </div>
                      <p>Re-educación del movimiento mediante vendaje neuromuscular elástico, loops progresivos y masaje por percusión.</p>
                      
                      <div className="step-micro-chips">
                        <span className="micro-chip"><ShieldCheck size={11} /> Re-educación Movimiento</span>
                        <span className="micro-chip"><Activity size={11} /> Vendaje & Percusión</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* LEFT PANEL: CUREO® 5.0 (LIGHT GLASS TEAL THEME) */}
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

            <button className="btn btn-primary explore-btn" onClick={onExploreClick}>
              Ver Ficha de CUREO® 5.0
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL: CHELT THERAPY (LIGHT GLASS COPPER THEME) */}
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

            <button className="btn btn-copper explore-btn" onClick={onExploreClick}>
              Ver Ficha de CHELT Therapy
            </button>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        /* Curtain Scroll Container */
        .curtain-scroll-container {
          position: relative;
          height: 280vh;
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
          height: 82vh;
          max-height: 560px;
          display: flex;
          align-items: center;
          padding-left: 2.75rem;
          width: 100%;
        }

        .timeline-vertical-line-track {
          position: absolute;
          left: 0;
          top: 5%;
          bottom: 5%;
          width: 4px;
          background: rgba(0, 126, 229, 0.12);
          border-radius: 99px;
        }

        .timeline-vertical-line-fill {
          width: 100%;
          background: linear-gradient(180deg, var(--accent-color) 0%, var(--secondary-accent) 100%);
          box-shadow: 0 0 12px rgba(0, 126, 229, 0.5);
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
          box-shadow: 0 0 8px var(--accent-color);
          z-index: 12;
          border: 2px solid var(--white);
        }

        /* Steps List Stack */
        .timeline-steps-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 94%;
          width: 100%;
          position: relative;
          gap: 0.85rem;
        }

        /* High-Contrast Glass Step Card */
        .timeline-step-card {
          position: relative;
          border-radius: 18px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.96) !important;
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
          padding: 0.9rem 1.2rem;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .timeline-step-card:hover {
          border-color: var(--accent-color);
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(0, 126, 229, 0.16);
        }

        /* Left Connector Node Badge */
        .step-badge-num {
          position: absolute;
          left: -50px;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--white);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          font-family: var(--font-heading);
          border: 2px solid var(--accent-color);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
          transition: all 0.25s ease;
        }

        .step-badge-num.badge-teal { border-color: var(--accent-color); color: var(--accent-dark); }
        .step-badge-num.badge-copper { border-color: var(--secondary-accent); color: #c2410c; }

        .step-card-inner {
          display: flex;
          align-items: flex-start;
          gap: 0.95rem;
        }

        .step-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .bg-teal-soft { background: rgba(0, 126, 229, 0.1); }
        .bg-copper-soft { background: rgba(249, 115, 22, 0.1); }

        .text-copper { color: #c2410c; }

        .step-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }

        .step-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .step-card-header h5 {
          font-family: var(--font-heading);
          font-size: 1.02rem;
          font-weight: 800;
          color: #0f172a !important;
          line-height: 1.25;
        }

        .step-card-content p {
          font-size: 0.84rem;
          color: #334155 !important;
          line-height: 1.45;
        }

        .card-phase-tag {
          font-size: 0.68rem;
          font-weight: 800;
          font-family: var(--font-heading);
          padding: 0.15rem 0.55rem;
          border-radius: 50px;
          white-space: nowrap;
        }

        .card-phase-tag.tag-teal { background: var(--accent-light); color: var(--accent-dark); }
        .card-phase-tag.tag-copper { background: #ffedd5; color: #c2410c; }

        .step-micro-chips {
          display: flex;
          gap: 0.4rem;
          padding-top: 0.2rem;
          flex-wrap: wrap;
        }

        .micro-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #475569;
          background: rgba(15, 23, 42, 0.04);
          padding: 0.15rem 0.55rem;
          border-radius: 6px;
          border: 1px solid rgba(15, 23, 42, 0.06);
        }

        /* LIGHT GLASS CURTAIN PANEL OVERLAYS */
        .curtain-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          z-index: 5;
          display: flex;
          align-items: center;
          padding: var(--navbar-height) 3rem 2rem 3rem;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.06);
        }

        /* Left Panel - Light Glass */
        .panel-left {
          left: 0;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          color: var(--text-primary);
          justify-content: flex-end;
          border-right: 1px solid rgba(0, 126, 229, 0.1);
        }

        /* Right Panel - Light Glass */
        .panel-right {
          right: 0;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          color: var(--text-primary);
          justify-content: flex-start;
          border-left: 1px solid rgba(249, 115, 22, 0.1);
        }

        .panel-inner-content {
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .panel-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 800;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          width: fit-content;
        }

        .teal-badge {
          background: rgba(0, 126, 229, 0.12);
          color: var(--accent-dark);
          border: 1px solid rgba(0, 126, 229, 0.28);
        }

        .copper-badge {
          background: rgba(249, 115, 22, 0.12);
          color: #c2410c;
          border: 1px solid rgba(249, 115, 22, 0.28);
        }

        .panel-title {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.2;
          color: #0f172a;
        }

        .panel-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #334155;
        }

        .panel-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .benefit-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #0f172a;
          padding: 0.6rem 0.95rem;
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
        }

        .panel-visual-simulator {
          height: 110px;
          border-radius: 16px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cureo-waves-visual {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 126, 229, 0.25);
        }

        .chelt-laser-visual {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(249, 115, 22, 0.25);
        }

        .simulator-grid-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .wave-lines-container {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 40px;
          z-index: 2;
        }

        .wave-line {
          width: 4px;
          height: 20px;
          background: var(--accent-color);
          border-radius: 10px;
          transform-origin: center;
        }

        .laser-target-ring {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px stroke rgba(249, 115, 22, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .laser-dot-glowing {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--secondary-accent);
          box-shadow: 0 0 10px var(--secondary-accent);
        }

        .wave-indicator-text {
          font-size: 0.72rem;
          font-family: var(--font-heading);
          font-weight: 700;
          color: #0f172a;
          margin-top: 0.5rem;
          z-index: 2;
        }

        .explore-btn {
          width: fit-content;
          margin-top: 0.5rem;
        }

        .btn-copper {
          background: var(--secondary-accent);
          color: var(--white);
          border: none;
          padding: 0.65rem 1.4rem;
          border-radius: 50px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.25);
        }

        .btn-copper:hover {
          background: #ea580c;
          transform: translateY(-1px);
        }

        @media (max-width: 1024px) {
          .curtain-scroll-container {
            height: auto;
          }
          .curtain-sticky-viewport {
            position: relative;
            height: auto;
            flex-direction: column;
          }
          .curtain-panel {
            position: relative;
            width: 100%;
            height: auto;
            padding: 4rem 1.5rem;
          }
          .curtain-revealed-bg {
            position: relative;
            height: auto;
            padding: 4rem 0;
          }
          .timeline-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .timeline-track-col {
            padding-left: 2rem;
          }
          .step-badge-num {
            left: -40px;
          }
        }
      `}</style>
    </div>
  );
}
