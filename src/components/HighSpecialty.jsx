import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Sparkles, 
  Flame, 
  CheckCircle, 
  ArrowUpRight, 
  Cpu, 
  Eye, 
  Activity, 
  Brain, 
  Smile, 
  Layers, 
  Snowflake, 
  Thermometer, 
  Award,
  Users
} from "lucide-react";

const CUREO_MODULES = [
  { id: "active", name: "Active", icon: Activity, desc: "Entrenamiento dinámico del tronco y la cabeza. Apoya movimientos dirigidos con esquemas de movimiento coordinados." },
  { id: "moto", name: "Moto", icon: Zap, desc: "Entrenamiento motor bi y unilateral de extremidades superiores en juegos de terapia altamente motivadores." },
  { id: "cogni", name: "Cogni", icon: Brain, desc: "Entrenamiento cognitivo y sensorial (reconocimiento de colores/formas, memoria y orientación espacial)." },
  { id: "daily", name: "Daily", icon: Shield, desc: "Cocina terapéutica y uso de herramientas cotidianas en un entorno virtual seguro sin riesgo de caídas." },
  { id: "finger", name: "Finger", icon: Sparkles, desc: "Motricidad fina de la mano y coordinación individual de dedos para pinza, agarre y sujeción." },
  { id: "relax", name: "Relax", icon: Smile, desc: "Reducción del estrés, alivio del dolor, cromoterapia y ejercicios de respiración guiada." },
  { id: "activities", name: "Activities", icon: Cpu, desc: "Inmersión multisensorial de mayor complejidad para etapas avanzadas de neurorrehabilitación." }
];

const CHELT_THERAPIES = [
  { id: "theal", name: "Laserterapia THEAL", icon: Zap, desc: "Fototerapia adaptativa patentada de 92W potencia media, 8 longitudes de onda y 16 modos de emisión (PBM/E²C)." },
  { id: "crio", name: "Crioterapia -40°C", icon: Snowflake, desc: "Aire frío seco a -40°C con control térmico vobulado. Vasoconstricción profunda y efecto analgésico." },
  { id: "termo", name: "Termoterapia", icon: Thermometer, desc: "Aire caliente seco regulable entre 35°C y 55°C (+55°C) para vasodilatación controlada y relajación muscular." },
  { id: "choque", name: "Choque Térmico", icon: Flame, desc: "Gradiente térmico ultrarrápido de 95°C Δ en <1s para gimnasia vascular e hiperemia intensificada." },
  { id: "sinergia", name: "Sinergia THEAL-CRIO", icon: Layers, desc: "El aire frío a -40°C actúa como vector del láser THEAL, permitiendo mayor penetración en profundidad sin riesgos de quemaduras." }
];

export default function HighSpecialty() {
  const [activeTech, setActiveTech] = useState("cureo"); // 'cureo' | 'chelt'
  
  // Interactive Simulator States
  const [selectedCureoModule, setSelectedCureoModule] = useState(0);
  const [immersionLevel, setImmersionLevel] = useState(85);

  const [selectedCheltTherapy, setSelectedCheltTherapy] = useState(0);
  const [laserPower, setLaserPower] = useState(45);

  return (
    <div className="specialty-page container">
      {/* Editorial Header */}
      <div className="specialty-header text-center">
        <span className="section-label">Línea Clínica Bruce Médica</span>
        <h2 className="display-large">Alta Especialidad Médica</h2>
        <p className="specialty-sub">Tecnología de frontera exclusiva para la rehabilitación física y neurorrehabilitación avanzada.</p>
        
        {/* Toggle Switcher */}
        <div className="tech-toggle-bar glass">
          <button 
            className={`tech-toggle-btn ${activeTech === "cureo" ? "active" : ""}`}
            onClick={() => setActiveTech("cureo")}
          >
            <Eye size={16} /> CUREO® 5.0 (Realidad Virtual)
          </button>
          <button 
            className={`tech-toggle-btn ${activeTech === "chelt" ? "active" : ""}`}
            onClick={() => setActiveTech("chelt")}
          >
            <Flame size={16} /> CHELT Therapy (5 Terapias)
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
                    <h4>Simulador de Módulos CUREO® 5.0</h4>
                    
                    <div className="sim-module-selector">
                      <span className="sim-label">Módulo Terapéutico:</span>
                      <div className="module-buttons-grid">
                        {CUREO_MODULES.map((m, idx) => (
                          <button
                            key={m.id}
                            className={`mod-pill ${selectedCureoModule === idx ? "active" : ""}`}
                            onClick={() => setSelectedCureoModule(idx)}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sim-slider-group">
                      <div className="sim-slider-label">
                        <span>Nivel de Inmersión VR:</span>
                        <strong>{immersionLevel}%</strong>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        value={immersionLevel} 
                        onChange={(e) => setImmersionLevel(parseInt(e.target.value))}
                        className="sim-slider" 
                      />
                    </div>

                    <div className="module-active-detail">
                      <p className="mod-desc-text">
                        <strong>Módulo {CUREO_MODULES[selectedCureoModule].name}:</strong> {CUREO_MODULES[selectedCureoModule].desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Technicalities */}
              <div className="tech-narrative-col">
                <div className="tech-tag">CUREO® 5.0 VR REHABILITATION</div>
                <h3>Rehabilitación con Realidad Virtual de Última Generación</h3>
                <p className="narrative-p">
                  CUREO® 5.0 ofrece terapias inmersivas y gamificadas para la recuperación motora y cognitiva de miembros superiores, tronco, manos y cabeza. Diseñado por Cureosity (Alemania) y distribuido en México por Bruce Médica, optimiza el tiempo clínico y eleva la adherencia del paciente.
                </p>

                <div className="benefits-grid">
                  <div className="benefit-card glass">
                    <CheckCircle className="text-accent" size={18} />
                    <div>
                      <h5>+40% Adherencia Terapéutica</h5>
                      <p>Entorno virtual gamificado que motiva al paciente y acelera la recuperación funcional.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Sparkles className="text-accent" size={18} />
                    <div>
                      <h5>7 Módulos Especializados</h5>
                      <p>Entrenamiento Active, Moto, Cogni, Daily, Finger, Relax y Activities adaptados a cada diagnóstico.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Users className="text-accent" size={18} />
                    <div>
                      <h5>CUREO HUB & CUREO Group</h5>
                      <p>Reportes automáticos en la nube y opción de atención simultánea de hasta 6 pacientes.</p>
                    </div>
                  </div>
                </div>

                <div className="official-link-section">
                  <a 
                    href="https://bruce-medica-cureo.vercel.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary"
                  >
                    Ver Sitio Oficial de CUREO® 5.0 <ArrowUpRight size={16} />
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
                  <Flame className="tech-bg-icon" size={200} />
                  
                  {/* Simulator Box */}
                  <div className="simulator-panel glass">
                    <h4>Simulador 5 Terapias CHELT</h4>
                    
                    <div className="sim-module-selector">
                      <span className="sim-label">Terapia Seleccionada:</span>
                      <div className="module-buttons-grid">
                        {CHELT_THERAPIES.map((t, idx) => (
                          <button
                            key={t.id}
                            className={`mod-pill chelt-pill ${selectedCheltTherapy === idx ? "active" : ""}`}
                            onClick={() => setSelectedCheltTherapy(idx)}
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sim-slider-group">
                      <div className="sim-slider-label">
                        <span>Potencia Láser THEAL:</span>
                        <strong>{laserPower} W (Máx 92W)</strong>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="92" 
                        value={laserPower} 
                        onChange={(e) => setLaserPower(parseInt(e.target.value))}
                        className="sim-slider" 
                      />
                    </div>

                    <div className="module-active-detail">
                      <p className="mod-desc-text">
                        <strong>{CHELT_THERAPIES[selectedCheltTherapy].name}:</strong> {CHELT_THERAPIES[selectedCheltTherapy].desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Technicalities */}
              <div className="tech-narrative-col">
                <div className="tech-tag laser-tag">CHELT THERAPY — 5 TERAPIAS EN 1</div>
                <h3>5 Terapias Integradas en Un Solo Equipo</h3>
                <p className="narrative-p">
                  CHELT Therapy integra en un único equipo: Laserterapia THEAL de 92W (8 longitudes de onda y 16 modos de emisión), Crioterapia a -40°C, Termoterapia (35°C - 55°C), Choque Térmico (95°C Δ en &lt;1s) y la exclusiva Sinergia THEAL-CRIO.
                </p>

                <div className="benefits-grid">
                  <div className="benefit-card glass">
                    <Layers className="text-copper" size={18} />
                    <div>
                      <h5>Sinergia THEAL-CRIO</h5>
                      <p>El aire a -40°C actúa como vector del láser THEAL, permitiendo mayor penetración en tejidos profundos sin quemaduras.</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Flame className="text-copper" size={18} />
                    <div>
                      <h5>92W Potencia Media & 8 Longitudes</h5>
                      <p>16 modos de emisión (pulsados, superpulsados, estocásticos, E²C y Biomodulación PBM).</p>
                    </div>
                  </div>
                  <div className="benefit-card glass">
                    <Award className="text-copper" size={18} />
                    <div>
                      <h5>90,000+ Investigaciones Científicas</h5>
                      <p>Respaldado por 7 patentes internacionales y certificación médica CE.</p>
                    </div>
                  </div>
                </div>

                <div className="official-link-section">
                  <a 
                    href="https://chelt-therapy.vercel.app/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary"
                  >
                    Ver Sitio Oficial de CHELT Therapy <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Styled JSX CSS Rules */}
      <style>{`
        .specialty-page {
          padding-top: 3rem;
          padding-bottom: 5rem;
        }

        .specialty-header {
          max-width: 750px;
          margin: 0 auto 3.5rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .specialty-sub {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .tech-toggle-bar {
          display: inline-flex;
          padding: 0.4rem;
          border-radius: 50px;
          gap: 0.5rem;
          margin-top: 1rem;
          border: 1px solid var(--border-color);
        }

        .tech-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.4rem;
          border-radius: 50px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .tech-toggle-btn.active {
          background: var(--accent-color);
          color: var(--white);
          box-shadow: 0 4px 14px rgba(0, 126, 229, 0.3);
        }

        .tech-display-container {
          min-height: 520px;
        }

        .tech-content-grid {
          align-items: center;
          gap: 3.5rem;
        }

        .tech-visual-col {
          display: flex;
          justify-content: center;
        }

        .tech-hero-card {
          width: 100%;
          border-radius: 28px;
          padding: 2.25rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .tech-hero-card.cureo-theme {
          background: linear-gradient(135deg, #003057 0%, #003057 100%);
          color: var(--white);
        }

        .tech-hero-card.chelt-theme {
          background: linear-gradient(135deg, #9a3412 0%, #7c2d12 100%);
          color: var(--white);
        }

        .tech-bg-icon {
          position: absolute;
          right: -30px;
          bottom: -30px;
          opacity: 0.12;
          pointer-events: none;
        }

        .simulator-panel {
          border-radius: 20px;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .simulator-panel h4 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .sim-module-selector {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .sim-label {
          font-size: 0.78rem;
          font-weight: 700;
          opacity: 0.9;
        }

        .module-buttons-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .mod-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: var(--white);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mod-pill:hover,
        .mod-pill.active {
          background: var(--white);
          color: #003057;
        }

        .mod-pill.chelt-pill:hover,
        .mod-pill.chelt-pill.active {
          background: var(--white);
          color: #7c2d12;
        }

        .sim-slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .sim-slider-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
        }

        .sim-slider {
          width: 100%;
          accent-color: var(--white);
          cursor: pointer;
        }

        .module-active-detail {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem;
          border-radius: 10px;
        }

        .mod-desc-text {
          font-size: 0.8rem;
          line-height: 1.4;
          opacity: 0.95;
        }

        .tech-narrative-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .tech-tag {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--accent-color);
        }

        .tech-tag.laser-tag {
          color: var(--secondary-accent);
        }

        .tech-narrative-col h3 {
          font-family: var(--font-heading);
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .narrative-p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .benefits-grid {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .benefit-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          border-radius: 16px;
          background: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .benefit-card h5 {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .benefit-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .official-link-section {
          padding-top: 0.5rem;
        }

        @media (max-width: 1024px) {
          .tech-content-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
