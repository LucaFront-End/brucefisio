import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomeCTA.css';

export default function HomeCTA() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleWhatsAppQuote = () => {
    const text = `Hola Bruce Médica, me interesa recibir asesoría especializada para equipar mi clínica.`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="home-cta-section" ref={ref}>
      <motion.div 
        className="home-cta-container"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cta-glow-blob top-right"></div>
        <div className="cta-glow-blob bottom-left"></div>

        <div className="cta-glass-overlay">
          <div className="cta-content-wrapper">
            <motion.div 
              className="cta-pill"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Zap size={16} className="cta-accent-icon" />
              <span>EVOLUCIÓN CLÍNICA</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Transforma tu clínica en una <br />
              <span className="cta-highlight">referencia de élite.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Garantía oficial, capacitaciones certificadas y tecnología de vanguardia. 
              El respaldo biomédico en el que los mejores fisioterapeutas de México confían.
            </motion.p>

            <motion.div 
              className="cta-action-group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button className="btn-cta-primary" onClick={() => navigate('/shop')}>
                Explorar Catálogo <ArrowRight size={18} />
              </button>
              <button className="btn-cta-secondary" onClick={handleWhatsAppQuote}>
                <MessageCircle size={18} /> Asesoría por WhatsApp
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
