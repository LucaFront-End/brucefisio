import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Sparkles, Flame, CheckCircle, ArrowUpRight, Cpu } from "lucide-react";

export default function HighSpecialty() {
  const [activeTech, setActiveTech] = useState("cureo"); // 'cureo' | 'chelt'
  
  // Interactive Simulator States
  const [intensity, setIntensity] = useState(60);
  const [frequency, setFrequency] = useState(5);

  return (
    <div className="specialty-page container">
      {/* Editorial Header */}
      <div className="specialty-header text-center">
        <span className="section-label">Línea Clínica Bruce Médica</span>
        <h2 className="display-large">Alta Especialidad Médica</h2>
        <p className="specialty-sub">Tecnología de frontera para acelerar la regeneración de tejidos y recuperación física.</p>
        
        {/* Toggle Switcher */}
        <div className="tech-toggle-bar glass">
          <button 
            className={`tech-toggle-btn ${activeTech === "cureo" ? "active" : ""}`}
            onClick={() => setActiveTech("cureo")}
          >
            <Zap size={16} /> Cureo System
          </button>
          <button 
            className={`tech-toggle-btn ${activeTech === "chelt" ? "active" : ""}`}
            onClick={() => setActiveTech("chelt")}
          >
            <Flame size={16} /> Chelt Therapy Laser
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="tech-display-container">
        <AnimatePresence mode="wait">
          {activeTech === "cureo" ? (
            <motion.div 
              key="cureo"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="grid-2 tech-content-grid"
            >
              {/* Left Column: Visual & Simulator */}
              <div className="tech-visual-col">
                <div className="tech-hero-card cureo-theme">
                  <div className="tech-glow"></div>
                  <Cpu className="tech-bg-icon" size={200} />
                  
                  {/* Simulator Box */}
                  <div className="simulator-panel glass">
                    <h4>Simulador Clínico Cureo</h4>
                    <div className="sim-slider-group">
                      <div className="sim-slider-label">
                        <span>Frecuencia de Radio</span>
                        <strong>{frequency} MHz</strong>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={frequency} 
                        onChange={(e) => setFrequency(parseInt(e.target.value))}
                        className="sim-slider" 
                      />
                    </div>
                    <div className="sim-slider-group">
                      <div className="sim-slider-label">
                        <span>Intensidad de Energía</span>
                        <strong>{intensity}%</strong>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={intensity} 
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        className="sim-slider" 
                      />
                    </div>
                    <div className="sim-pulse-wave">
                      <div className="wave-bar" style={{ height: `${intensity * 0.4}px`, animationDuration: `${11 - frequency}s` }}></div>
                      <div className="wave-bar" style={{ height: `${intensity * 0.6}px`, animationDuration: `${10 - frequency}s` }}></div>
                      <div className="wave-bar" style={{ height: `${intensity * 0.8}px`, animationDuration: `${12 - frequency}s` }}></div>
                      <div className="wave-bar" style={{ height: `${intensity * 0.5}px`, animationDuration: `${9 - frequency}s` }}></div>
                      <div className="wave-bar" style={{ height: `${intensity * 0.7}px`, animationDuration: `${11 - frequency}s` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Technicalities */}
              <div className="tech-narrative-col">
                <div className="tech-tag">CUREO TECHNOLOGY</div>
                <h3>Terapia de Estimulación Celular Activa</h3>
                <p className="narrative-p">
                  El sistema Cureo utiliza corrientes de alta frecuencia y bioestimulación selectiva 
                  para penetrar en los estratos celulares más profundos. Esto acelera el intercambio iónico, 
                  facilitando la curación inmediata de inflamaciones crónicas y reabsorción de edemas.
                </p>

                <div className="benefits-grid">
                  <div className="benefit-card glass">
                    <CheckCircle className="text-accent" size={18} />
                    <div>
                      <h5>Regeneración Acelerada</h5>
                      <p>Reduce hasta un 40% el tiempo de curación de microfisuras musculares y esguinces.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Sparkles className="text-accent" size={18} />
                    <div>
                      <h5>Bioestimulación Atérmica</h5>
                      <p>Trata patologías agudas sin sobrecalentar el tejido circundante.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Shield className="text-accent" size={18} />
                    <div>
                      <h5>Procedimiento Seguro</h5>
                      <p>Monitoreo inteligente de impedancia de la piel en tiempo real.</p>
                    </div>
                  </div>
                </div>

                <div className="official-link-section">
                  <a href="#link-cureo" className="btn btn-primary" onClick={(e) => e.preventDefault()}>
                    Saber más sobre Cureo <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chelt"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid-2 tech-content-grid"
            >
              {/* Left Column: Visual & Laser Simulator */}
              <div className="tech-visual-col">
                <div className="tech-hero-card chelt-theme">
                  <div className="tech-glow"></div>
                  <Zap className="tech-bg-icon" size={200} />
                  
                  {/* Simulator Box */}
                  <div className="simulator-panel glass">
                    <h4>Simulador Láser Chelt</h4>
                    <div className="sim-slider-group">
                      <div className="sim-slider-label">
                        <span>Longitud de Onda</span>
                        <strong>{frequency === 5 ? "Multi-Onda (TRI)" : frequency > 5 ? "Infrarrojo 1064nm" : "Rojo 810nm"}</strong>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={frequency} 
                        onChange={(e) => setFrequency(parseInt(e.target.value))}
                        className="sim-slider" 
                      />
                    </div>
                    <div className="sim-slider-group">
                      <div className="sim-slider-label">
                        <span>Potencia de Emisión</span>
                        <strong>{intensity * 0.3} Watts</strong>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={intensity} 
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        className="sim-slider" 
                      />
                    </div>
                    
                    {/* Laser beam rendering */}
                    <div className="laser-beam-container">
                      <div 
                        className="laser-beam" 
                        style={{ 
                          width: `${intensity * 0.8}%`, 
                          backgroundColor: frequency > 5 ? "#ef4444" : frequency === 5 ? "#a855f7" : "#e11d48",
                          boxShadow: `0 0 ${intensity * 0.3}px ${frequency > 5 ? "#ef4444" : "#e11d48"}`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Technicalities */}
              <div className="tech-narrative-col">
                <div className="tech-tag laser-tag">CHELT THERAPY</div>
                <h3>Láser de Alta Intensidad y Criofisioterapia</h3>
                <p className="narrative-p">
                  El sistema Chelt revoluciona la fototerapia combinando el láser de alta potencia 
                  con la crioterapia (aire seco y frío a -30°C). La vasoconstricción inicial seguida 
                  de la bioestimulación del láser promueve un efecto analgésico y desinflamatorio inmediato.
                </p>

                <div className="benefits-grid">
                  <div className="benefit-card glass">
                    <CheckCircle className="text-accent" size={18} />
                    <div>
                      <h5>Efecto Analgésico Profundo</h5>
                      <p>Inhibe de forma segura la transmisión del dolor nervioso en tendinopatías severas.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Sparkles className="text-accent" size={18} />
                    <div>
                      <h5>Acción Antiinflamatoria</h5>
                      <p>Aumenta el drenaje linfático local y reduce la formación de edemas.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Shield className="text-accent" size={18} />
                    <div>
                      <h5>Fotocriocuidado Sin Dolor</h5>
                      <p>La crio-protección de la piel permite potencias 10 veces mayores que el láser común.</p>
                    </div>
                  </div>
                </div>

                <div className="official-link-section">
                  <a href="#link-chelt" className="btn btn-primary" onClick={(e) => e.preventDefault()}>
                    Saber más sobre Chelt <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .specialty-page {
          padding: 6rem 2rem;
          background: var(--bg-primary);
        }
        
        .specialty-header {
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .section-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          margin-bottom: 0.75rem;
          display: block;
        }
        
        .specialty-sub {
          max-width: 600px;
          margin: 1rem auto 2.5rem auto;
          color: var(--text-secondary);
        }
        
        .tech-toggle-bar {
          display: flex;
          gap: 0.5rem;
          background: var(--white);
          border: 1px solid var(--border-color);
          padding: 0.5rem;
          border-radius: 9999px;
          box-shadow: var(--shadow-sm);
        }
        
        .tech-toggle-btn {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
        }
        
        .tech-toggle-btn.active {
          background: var(--text-primary);
          color: var(--white);
          box-shadow: var(--shadow-md);
        }
        
        .tech-display-container {
          min-height: 550px;
        }
        
        .tech-content-grid {
          align-items: stretch;
        }
        
        /* Visual Col */
        .tech-visual-col {
          display: flex;
        }
        
        .tech-hero-card {
          width: 100%;
          border-radius: 28px;
          padding: 2rem;
          display: flex;
          align-items: flex-end;
          position: relative;
          overflow: hidden;
          min-height: 480px;
        }
        
        .cureo-theme {
          background: linear-gradient(135deg, #0d9488 0%, #115e59 100%);
        }
        
        .chelt-theme {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        
        .tech-glow {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .tech-bg-icon {
          position: absolute;
          top: 10%;
          right: -10%;
          opacity: 0.05;
          color: var(--white);
          pointer-events: none;
        }
        
        .simulator-panel {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          z-index: 2;
          color: var(--white);
        }
        
        .simulator-panel h4 {
          font-size: 1rem;
          color: var(--white);
          margin-bottom: 1.25rem;
          font-weight: 700;
        }
        
        .sim-slider-group {
          margin-bottom: 1.25rem;
        }
        
        .sim-slider-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }
        
        .sim-slider {
          width: 100%;
          -webkit-appearance: none;
          background: rgba(255, 255, 255, 0.2);
          height: 6px;
          border-radius: 3px;
          outline: none;
        }
        
        .sim-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--white);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        /* Wave graphics */
        .sim-pulse-wave {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 50px;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .wave-bar {
          flex-grow: 1;
          background: var(--accent-light);
          border-radius: 3px;
          height: 10px;
          animation: wave 1s ease-in-out infinite alternate;
        }
        
        @keyframes wave {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
        
        /* Laser beam */
        .laser-beam-container {
          height: 40px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1rem;
        }
        
        .laser-beam {
          height: 4px;
          border-radius: 2px;
          transition: all 0.2s ease;
        }
        
        /* Narrative Column */
        .tech-narrative-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
        }
        
        .tech-tag {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-color);
          letter-spacing: 0.05em;
        }
        
        .laser-tag {
          color: var(--secondary-accent);
        }
        
        .tech-narrative-col h3 {
          font-size: 2.25rem;
          font-weight: 700;
        }
        
        .narrative-p {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }
        
        .benefits-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .benefit-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 14px;
        }
        
        .benefit-card h5 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .benefit-card p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        
        .official-link-section {
          margin-top: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .tech-hero-card {
            min-height: 380px;
          }
        }
      `}</style>
    </div>
  );
}
