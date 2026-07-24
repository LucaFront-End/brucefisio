import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Award, Play } from "lucide-react";

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal 
}) {
  const containerRef = useRef(null);
  
  // 1. Setup Scroll Tracking for the massive 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Mapeo de valores de transformación
  // Fase 1 (0 a 0.4): Hacemos un zoom MASIVO al texto (scale 1 -> 150)
  const maskScale = useTransform(scrollYProgress, [0, 0.4], [1, 200]);
  
  // Fase 2 (0.4 a 0.45): Desvanecemos la máscara blanca una vez que el zoom cruzó la letra
  const maskOpacity = useTransform(scrollYProgress, [0.38, 0.45], [1, 0]);
  // Desactivar puntero para no bloquear clics cuando desaparezca
  const maskPointerEvents = useTransform(scrollYProgress, v => v > 0.4 ? "none" : "auto");

  // Fase 3 (0.45 a 0.55): Oscurecemos el video para darle legibilidad al Hero 2
  const overlayOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 0.65]);

  // Fase 4 (0.55 a 0.75): Aparece el "Segundo Hero" sobre el video
  const hero2Opacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const hero2Y = useTransform(scrollYProgress, [0.55, 0.75], [80, 0]);
  const hero2PointerEvents = useTransform(scrollYProgress, v => v > 0.6 ? "auto" : "none");

  const handleWhatsAppQuote = () => {
    const text = `Hola Bruce Médica, me interesa cotizar equipamiento clínico de vanguardia.`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section ref={containerRef} className="hero-zoom-wrapper">
      <div className="hero-sticky-stage">
        
        {/* ================= CAPA 1: VIDEO DE FONDO CINEMÁTICO ================= */}
        <video 
          className="hero-bg-video"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
        >
          {/* Un video médico abstracto / tecnológico */}
          <source src="https://cdn.pixabay.com/video/2021/08/04/83866-584742781_large.mp4" type="video/mp4" />
        </video>

        {/* ================= CAPA 2: OVERLAY OSCURO (Aparece después del zoom) ================= */}
        <motion.div 
          className="hero-dark-overlay"
          style={{ opacity: overlayOpacity }}
        />

        {/* ================= CAPA 3: EL SEGUNDO HERO (Contenido Final) ================= */}
        <motion.div 
          className="hero2-content-layer"
          style={{ 
            opacity: hero2Opacity, 
            y: hero2Y, 
            pointerEvents: hero2PointerEvents 
          }}
        >
          <div className="hero2-inner">
            <div className="hero2-badge">
              <span className="live-dot"></span>
              <span>Rehabilitación de Próxima Generación</span>
            </div>
            
            <h1 className="hero2-title">
              FISIOTERAPIA <br /> DEL FUTURO
            </h1>
            
            <p className="hero2-subtitle">
              Elevamos el estándar de las clínicas en México con tecnología médica de precisión, certificaciones globales y garantías extendidas.
            </p>
            
            <div className="hero2-actions">
              <button className="btn-hero2-primary" onClick={onShopClick}>
                Descubrir Equipos <ArrowRight size={18} />
              </button>
              <button className="btn-hero2-secondary" onClick={handleWhatsAppQuote}>
                <MessageCircle size={18} /> Cotizar Asesoría
              </button>
            </div>

            <div className="hero2-trust-row">
              <div className="trust-col">
                <ShieldCheck size={20} className="text-teal" />
                <span>Garantía Oficial</span>
              </div>
              <div className="trust-col">
                <Award size={20} className="text-teal" />
                <span>Grado A1 Clínico</span>
              </div>
              <div className="trust-col">
                <Zap size={20} className="text-teal" />
                <span>Eficacia Probada</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CAPA 4: MÁSCARA DE TEXTO (El Zoom-Through Mágico) ================= */}
        {/* Usamos mix-blend-mode: screen. El fondo blanco se mantiene blanco. El texto negro se vuelve "transparente" y deja ver el video. */}
        <motion.div 
          className="hero-text-mask-layer"
          style={{ 
            scale: maskScale, 
            opacity: maskOpacity,
            pointerEvents: maskPointerEvents
          }}
        >
          {/* El centro del zoom será la letra U. Alineando BRUCE al centro absoluto logramos que el hueco de la U quede justo en el centro de la pantalla. */}
          <h1 className="mask-typography">
            BRUCE
          </h1>
          <div className="scroll-hint-mask">
            SCROLL PARA ENTRAR
          </div>
        </motion.div>

      </div>

      <style>{`
        .hero-zoom-wrapper {
          position: relative;
          height: 400vh; /* Altura de scroll masiva para dar tiempo al efecto */
          background-color: #000000;
        }

        .hero-sticky-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: #000000;
        }

        /* ===== VIDEO ===== */
        .hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: 1;
        }

        /* ===== OVERLAY ===== */
        .hero-dark-overlay {
          position: absolute;
          inset: 0;
          background-color: #000000;
          z-index: 5;
        }

        /* ===== MÁSCARA MAGIC (mix-blend-mode) ===== */
        .hero-text-mask-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #ffffff; /* Fondo sólido blanco */
          color: #000000; /* Texto sólido negro */
          mix-blend-mode: screen; /* El truco maestro de CSS */
          z-index: 20;
          /* Hacemos que el transform-origin esté un poquitito arriba del centro 
             para apuntar directamente a la abertura superior de la U en "BRUCE" */
          transform-origin: 50% 48%; 
          will-change: transform, opacity;
        }

        .mask-typography {
          font-family: var(--font-heading);
          font-size: 28vw; /* Extremadamente grande */
          font-weight: 900;
          line-height: 1;
          margin: 0;
          letter-spacing: -0.06em;
          text-align: center;
          /* Eliminamos márgenes o paddings que descuadren el centro */
        }

        .scroll-hint-mask {
          position: absolute;
          bottom: 3rem;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000000;
          opacity: 0.5;
          animation: pulseHint 2s infinite;
        }

        @keyframes pulseHint {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(5px); }
        }

        /* ===== SEGUNDO HERO ===== */
        .hero2-content-layer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          padding: 2rem;
          color: #ffffff;
        }

        .hero2-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 900px;
        }

        .hero2-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1.2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #0d9488;
          border-radius: 50%;
          box-shadow: 0 0 10px #0d9488;
          animation: pulseDot 2s infinite;
        }

        @keyframes pulseDot {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        .hero2-title {
          font-family: var(--font-heading);
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .hero2-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: #cbd5e1;
          max-width: 600px;
          margin-bottom: 3rem;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .hero2-actions {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-hero2-primary {
          background: #0d9488;
          color: #ffffff;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(13, 148, 136, 0.4);
        }
        .btn-hero2-primary:hover {
          background: #0f766e;
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(13, 148, 136, 0.6);
        }

        .btn-hero2-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-hero2-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #ffffff;
        }

        .hero2-trust-row {
          display: flex;
          gap: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-col {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #e2e8f0;
          letter-spacing: 0.05em;
        }
        .text-teal { color: #5eead4; }
      `}</style>
    </section>
  );
}
