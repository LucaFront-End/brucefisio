import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Check, Activity, Battery, Award, Star, Settings, Sparkles, ShieldCheck, Zap, ArrowDown } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function HomeCompare({ onQuickAdd, products = PRODUCTS }) {
  const [addedItem, setAddedItem] = useState(null);
  const sectionRef = useRef(null);

  // Track scroll progress of the compare section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 1. Scroll-Synced Laser Radar Sweep Bar
  const laserTop = useTransform(scrollYProgress, [0.2, 0.8], ["5%", "92%"]);
  const laserOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);

  // 2. Parallax Side Rail Progress Line
  const railHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  // 3. 3D Spotlight Animations for Featured Column (Middle Card)
  const featuredScale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.96, 1.06, 0.98]);
  const featuredY = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [10, -24, 0]);
  const featuredShadow = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.75],
    [
      "0px 4px 20px rgba(15, 23, 42, 0.05)",
      "0px 24px 60px rgba(13, 148, 136, 0.22)",
      "0px 4px 20px rgba(15, 23, 42, 0.05)"
    ]
  );
  const featuredBorder = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.75],
    [
      "rgba(226, 232, 240, 1)",
      "rgba(13, 148, 136, 0.85)",
      "rgba(226, 232, 240, 1)"
    ]
  );

  // 4. Parallax 3D Entry for Left & Right Cards
  const leftX = useTransform(scrollYProgress, [0.1, 0.35], [-35, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.35], [35, 0]);
  
  const sideOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.8, 1]);
  const sideScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.97, 1]);

  // Select 3 meaningful products (prefer high-value devices or category diverse)
  const getCompareProducts = () => {
    if (!products || products.length === 0) return PRODUCTS.slice(0, 3);
    const filtered = products.filter(p => p.price > 1500);
    if (filtered.length >= 3) return filtered.slice(0, 3);
    return products.slice(0, 3);
  };

  const COMPARE_PRODUCTS = getCompareProducts();

  const TIERS = [
    {
      tierBadge: "🏠 Nivel 1: Hogar & Portátil",
      badgeClass: "tier-badge-subtle",
      isFeatured: false
    },
    {
      tierBadge: "🏥 Nivel 2: Clínico Pro (Recomendado)",
      badgeClass: "tier-badge-teal",
      isFeatured: true
    },
    {
      tierBadge: "⚡ Nivel 3: Alta Especialidad",
      badgeClass: "tier-badge-copper",
      isFeatured: false
    }
  ];

  const handleBuyClick = (product) => {
    if (!onQuickAdd) return;
    onQuickAdd(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section ref={sectionRef} className="compare-section container">
      {/* Editorial Section Header */}
      <div className="text-center compare-header">
        <span className="section-label">Comparativa de Gama</span>
        <h2 className="display-large" style={{ fontSize: "2.5rem" }}>Encuentra la Tecnología Adecuada</h2>
        <p className="compare-subtitle">Compara las especificaciones técnicas y alcances de nuestros equipos insignia.</p>
        
        <div className="scroll-indicator-pill">
          <ArrowDown size={14} className="bounce-anim text-teal" />
          <span>Haz scroll para escanear la comparativa</span>
        </div>
      </div>

      {/* 3 Unified Motion Tier Cards Stage */}
      <div className="compare-cards-stage-wrapper">
        
        {/* Scroll-Synced Vertical Laser Radar Beam */}
        <motion.div 
          style={{ top: laserTop, opacity: laserOpacity }} 
          className="compare-scroll-laser-bar"
        />

        {/* Side Scroll Progress Line */}
        <div className="compare-side-progress-track">
          <motion.div style={{ height: railHeight }} className="compare-side-progress-fill" />
        </div>

        <div className="compare-cards-stage">
          {COMPARE_PRODUCTS.map((prod, idx) => {
            const tier = TIERS[idx] || TIERS[0];
            const isFeatured = tier.isFeatured;

            // Parallax 3D Entry transforms based on column index
            const cardX = idx === 0 ? leftX : idx === 2 ? rightX : 0;

            return (
              <motion.div
                key={prod.id}
                style={
                  isFeatured
                    ? { scale: featuredScale, y: featuredY, boxShadow: featuredShadow, borderColor: featuredBorder, zIndex: 10 }
                    : { opacity: sideOpacity, scale: sideScale, x: cardX }
                }
                className={`compare-tier-card ${isFeatured ? "featured-tier-card" : ""}`}
              >
                {/* Floating Top Badge for Featured Card */}
                {isFeatured && (
                  <div className="spotlight-floating-chip">
                    <Sparkles size={13} /> #1 RECOMENDACIÓN CLÍNICA
                  </div>
                )}

                {/* Card Header & Product Preview */}
                <div className="card-top-header">
                  <span className={`tier-pill-badge ${tier.badgeClass}`}>{tier.tierBadge}</span>
                  
                  <div className="card-product-visual" style={{ background: prod.imageBg || "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)" }}>
                    {prod.imageSvg ? (
                      <div className="card-svg-container" dangerouslySetInnerHTML={{ __html: prod.imageSvg }} />
                    ) : (
                      <img src={prod.image} alt={prod.name} className="card-img-fit" />
                    )}
                  </div>

                  <div className="card-title-block">
                    <span className="card-brand-name">{prod.brand || "Bruce Médica"}</span>
                    <h4 className="card-product-title">{prod.name}</h4>
                  </div>
                </div>

                {/* Internal Specs Comparison List */}
                <div className="card-specs-list">
                  
                  <div className="spec-row-item">
                    <div className="spec-label">
                      <Activity size={14} className="text-teal" />
                      <span>Categoría</span>
                    </div>
                    <strong className="spec-val-text">{prod.category || "Fisioterapia"}</strong>
                  </div>

                  <div className="spec-row-item">
                    <div className="spec-label">
                      <Settings size={14} className="text-teal" />
                      <span>Tecnología</span>
                    </div>
                    <strong className="spec-val-text">Alta Eficiencia Clínica</strong>
                  </div>

                  <div className="spec-row-item">
                    <div className="spec-label">
                      <Star size={14} className="text-teal" />
                      <span>Aplicación</span>
                    </div>
                    <strong className="spec-val-text">Profesional / Clínico</strong>
                  </div>

                  <div className="spec-row-item">
                    <div className="spec-label">
                      <Award size={14} className="text-teal" />
                      <span>Certificación</span>
                    </div>
                    <span className="spec-cert-chip">
                      <Check size={12} /> FDA / CE Med
                    </span>
                  </div>

                  <div className="spec-row-item">
                    <div className="spec-label">
                      <ShieldCheck size={14} className="text-teal" />
                      <span>Garantía</span>
                    </div>
                    <strong className="spec-val-text">2 Años Oficial</strong>
                  </div>

                </div>

                {/* Card Footer & Purchase Action */}
                <div className="card-bottom-footer">
                  <div className="price-tag-row">
                    <span className="price-amount">${prod.price?.toLocaleString()} MXN</span>
                    <span className="price-tax">IVA Incluido</span>
                  </div>

                  <button
                    className={`btn ${isFeatured ? "btn-primary" : "btn-accent"} btn-card-action`}
                    onClick={() => handleBuyClick(prod)}
                    disabled={addedItem === prod.id}
                  >
                    {addedItem === prod.id ? (
                      <>
                        <Check size={16} /> Añadido
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} /> Añadir al Carrito
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        .compare-section {
          padding: 5rem 1.5rem 6rem 1.5rem;
          background: var(--bg-primary);
          position: relative;
        }

        .compare-header {
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .compare-subtitle {
          color: var(--text-secondary);
          max-width: 620px;
        }

        .scroll-indicator-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.76rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--text-tertiary);
          background: var(--bg-secondary);
          padding: 0.3rem 0.85rem;
          border-radius: 50px;
          margin-top: 0.5rem;
        }

        .bounce-anim {
          animation: bounceFloat 1.6s infinite ease-in-out;
        }

        @keyframes bounceFloat {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(3px); }
        }

        /* Container Wrapper with Side Progress Rail & Laser */
        .compare-cards-stage-wrapper {
          position: relative;
          max-width: 1140px;
          margin: 0 auto;
          padding-left: 1.5rem;
        }

        /* Scroll-Synced Laser Sweep Bar */
        .compare-scroll-laser-bar {
          position: absolute;
          left: -20px;
          right: -20px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #06b6d4, var(--accent-color), transparent);
          box-shadow: 0 0 12px #06b6d4, 0 0 24px var(--accent-color);
          z-index: 15;
          pointer-events: none;
          border-radius: 99px;
        }

        /* Side Progress Rail */
        .compare-side-progress-track {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: rgba(13, 148, 136, 0.12);
          border-radius: 99px;
        }

        .compare-side-progress-fill {
          width: 100%;
          background: linear-gradient(180deg, var(--accent-color) 0%, var(--secondary-accent) 100%);
          box-shadow: 0 0 10px var(--accent-color);
          border-radius: 99px;
        }

        /* 3 Cards Stage */
        .compare-cards-stage {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          padding-top: 1.75rem;
          align-items: stretch;
          perspective: 1000px;
        }

        @media (max-width: 900px) {
          .compare-cards-stage {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .compare-cards-stage-wrapper {
            padding-left: 0;
          }
          .compare-side-progress-track {
            display: none;
          }
        }

        /* Single Unified Motion Card */
        .compare-tier-card {
          position: relative;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
          transition: border-color 0.25s ease;
        }

        .featured-tier-card {
          background: #ffffff !important;
          border-width: 1.5px;
        }

        /* Floating Badge */
        .spotlight-floating-chip {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          color: var(--white);
          font-size: 0.72rem;
          font-weight: 800;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
          padding: 0.35rem 0.95rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(13, 148, 136, 0.35);
          z-index: 20;
        }

        /* Top Header */
        .card-top-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.1rem;
        }

        .tier-pill-badge {
          font-size: 0.75rem;
          font-weight: 800;
          font-family: var(--font-heading);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }

        .tier-badge-subtle {
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }

        .tier-badge-teal {
          background: var(--accent-light);
          color: var(--accent-dark);
        }

        .tier-badge-copper {
          background: #ffedd5;
          color: #c2410c;
        }

        .card-product-visual {
          width: 90px;
          height: 90px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem;
          box-shadow: var(--shadow-sm);
        }

        .card-svg-container {
          width: 100%;
          height: 100%;
        }

        .card-svg-container svg {
          width: 100%;
          height: 100%;
        }

        .card-img-fit {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .card-title-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          text-align: center;
        }

        .card-brand-name {
          font-size: 0.68rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .card-product-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        /* Internal Specs List */
        .card-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 1.2rem 0;
        }

        .spec-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          transition: transform 0.2s ease;
        }

        .spec-label {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-secondary);
        }

        .spec-val-text {
          color: var(--text-primary);
          font-weight: 600;
          text-align: right;
        }

        .spec-cert-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #ccfbf1;
          color: #0f766e;
          font-weight: 800;
          font-size: 0.72rem;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        /* Card Footer */
        .card-bottom-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .price-tag-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }

        .price-amount {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .price-tax {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .btn-card-action {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 700;
          transition: all 0.25s ease;
      `}</style>
    </section>
  );
}

