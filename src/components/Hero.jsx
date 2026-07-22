import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  ShoppingCart, 
  Check, 
  Award, 
  Truck, 
  Eye, 
  Sparkles,
  MessageCircle
} from "lucide-react";
import { PRODUCTS } from "../data/products";

const SMART_CATEGORIES = [
  {
    id: "electroterapia",
    label: "Electroterapia",
    icon: Zap,
    categoryMatch: ["electroterapia", "ultrasonido", "chattanooga"],
    tagline: "Estímulo bio-eléctrico de alta precisión para acelerar la cicatrización y regeneración celular."
  },
  {
    id: "fuerza",
    label: "Fuerza & Ejercicio",
    icon: Activity,
    categoryMatch: ["fuerza", "equilibrio", "ejercicio", "pesas", "pelota", "bandas"],
    tagline: "Sistemas de resistencia progresiva y fortalecimiento muscular de grado clínico."
  },
  {
    id: "muebles",
    label: "Mobiliario & Mesas",
    icon: ShieldCheck,
    categoryMatch: ["mesa", "camilla", "baño", "ducha", "mobiliario"],
    tagline: "Mobiliario ergonómico de alta carga y elevación motorizada para confort profesional."
  },
  {
    id: "compresion",
    label: "Compresión & Soportes",
    icon: Award,
    categoryMatch: ["plantilla", "talonera", "soporte", "compresión", "manga", "rodillera"],
    tagline: "Órtesis ergonómicas y prendas compresivas clínicas para estabilización articular."
  }
];

export default function Hero({ 
  onShopClick, 
  onSpecialtyClick, 
  onQuickAdd, 
  onOpenProductModal, 
  products = PRODUCTS 
}) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  const activeCategory = SMART_CATEGORIES[activeTabIdx];

  // Find best matching product for active category tab
  const categoryProducts = products.filter(p => {
    const pCat = (p.category || "").toLowerCase();
    const pName = (p.name || "").toLowerCase();
    return activeCategory.categoryMatch.some(term => pCat.includes(term) || pName.includes(term));
  });

  const activeProduct = categoryProducts[0] || products[0] || {
    id: "demo-1",
    name: "Equipamiento Bruce Médica",
    price: 3899,
    category: activeCategory.label,
    brand: "Bruce Pro",
    imageBg: "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)"
  };

  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState("");

  useEffect(() => {
    if (activeProduct?.variables?.options?.length > 0) {
      const firstOpt = activeProduct.variables.options[0];
      setSelectedVariant(typeof firstOpt === "object" ? firstOpt.value : firstOpt);
    } else {
      setSelectedVariant("");
    }
  }, [activeProduct]);

  const handleBuyClick = (e) => {
    e.stopPropagation();
    if (!onQuickAdd) return;
    
    // Prepare item for quick add
    const quickProduct = {
      ...activeProduct,
      selectedVariant: selectedVariant || null
    };

    onQuickAdd(quickProduct);
    setAddedItem(activeProduct.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  const handleWhatsAppQuote = (e) => {
    e.stopPropagation();
    const text = `Hola Bruce Médica, me interesa cotizar el equipo: ${activeProduct.name} (Precio: $${activeProduct.price?.toLocaleString()} MXN). ¿Tienen disponibilidad?`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="hero-smart-finder">
      {/* Glow Backdrops */}
      <div className="hero-glow-blob glow-1"></div>
      <div className="hero-glow-blob glow-2"></div>

      <div className="container hero-smart-grid">
        
        {/* Left Column: Smart Finder Controls & Copy */}
        <div className="hero-finder-copy">
          <div className="hero-pulse-badge">
            <span className="pulse-dot"></span>
            Catálogo Sincronizado en Vivo
          </div>

          <h1 className="hero-headline">
            Soluciones Clínicas & <br />
            <span className="text-gradient">Equipamiento Médico</span> <br />
            de Alta Especialidad
          </h1>

          <p className="hero-subtitle">
            Selecciona una especialidad para explorar el equipamiento certificado líder en el sector salud.
          </p>

          {/* Interactive Category Tabs */}
          <div className="smart-category-tabs">
            {SMART_CATEGORIES.map((cat, idx) => {
              const TabIcon = cat.icon;
              const isActive = idx === activeTabIdx;
              return (
                <button
                  key={cat.id}
                  className={`category-tab-pill ${isActive ? "active" : ""}`}
                  onClick={() => setActiveTabIdx(idx)}
                >
                  <TabIcon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tagline for active category */}
          <motion.p 
            key={activeCategory.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="category-active-tagline"
          >
            <Sparkles size={14} className="sparkle-icon" /> {activeCategory.tagline}
          </motion.p>

          {/* Trust Badges Bar */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={16} className="text-accent" />
              <span>Garantía 2 Años</span>
            </div>
            <div className="trust-item">
              <Truck size={16} className="text-accent" />
              <span>Envío Express Gratis</span>
            </div>
            <div className="trust-item">
              <Award size={16} className="text-accent" />
              <span>Certificación FDA/CE</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-ctas-row">
            <button className="btn btn-accent" onClick={onShopClick}>
              Explorar Tienda Completa <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary-quote" onClick={handleWhatsAppQuote}>
              <MessageCircle size={18} /> Cotizar vía WhatsApp
            </button>
          </div>
        </div>

        {/* Right Column: E-Commerce Product Showcase Card */}
        <div className="hero-finder-showcase">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="showcase-card-wrapper"
            >
              {/* Product Card Node */}
              <div 
                className="hero-ecommerce-card glass"
                onClick={() => onOpenProductModal && onOpenProductModal(activeProduct)}
              >
                {/* Image Showcase Box */}
                <div 
                  className="card-image-stage" 
                  style={{ background: activeProduct.imageBg || "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)" }}
                >
                  <span className="card-brand-tag">{activeProduct.brand || "Bruce Médica"}</span>
                  <span className="card-stock-tag">
                    <span className="stock-dot"></span> En Stock
                  </span>

                  {activeProduct.imageSvg ? (
                    <div 
                      className="card-svg-container"
                      dangerouslySetInnerHTML={{ __html: activeProduct.imageSvg }}
                    />
                  ) : (
                    <img 
                      src={activeProduct.image} 
                      alt={activeProduct.name} 
                      className="card-featured-img" 
                    />
                  )}
                </div>

                {/* Product Content & Buying Controls */}
                <div className="card-details-stage">
                  <div className="card-meta-row">
                    <span className="card-category-label">{activeProduct.category || activeCategory.label}</span>
                  </div>

                  <h3 className="card-product-title">{activeProduct.name}</h3>

                  {/* Variants Selector Pill List if available */}
                  {activeProduct.variables?.options?.length > 0 && (
                    <div className="card-variants-row" onClick={(e) => e.stopPropagation()}>
                      <span className="variant-label">{activeProduct.variables.name}:</span>
                      <div className="variant-options-list">
                        {activeProduct.variables.options.slice(0, 3).map((opt, i) => {
                          const val = typeof opt === "object" ? opt.value : opt;
                          const isSelected = selectedVariant === val;
                          return (
                            <button
                              key={i}
                              className={`variant-pill ${isSelected ? "selected" : ""}`}
                              onClick={() => setSelectedVariant(val)}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Price & Action Footer */}
                  <div className="card-footer-action-bar">
                    <div className="price-block">
                      <span className="price-amount">${activeProduct.price?.toLocaleString()} MXN</span>
                      <span className="price-tax">IVA Incluido</span>
                    </div>

                    <div className="card-buttons-group">
                      <button 
                        className="btn-quick-inspect"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenProductModal) onOpenProductModal(activeProduct);
                        }}
                        title="Ver detalles del producto"
                      >
                        <Eye size={16} /> Ver
                      </button>

                      <button 
                        className={`btn-quick-buy ${addedItem === activeProduct.id ? "added" : ""}`}
                        onClick={handleBuyClick}
                        title="Añadir directo al carrito"
                      >
                        {addedItem === activeProduct.id ? (
                          <>
                            <Check size={16} /> ¡Añadido!
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} /> Comprar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Styled JSX CSS Rules */}
      <style>{`
        .hero-smart-finder {
          position: relative;
          padding: 3.5rem 0 5rem 0;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .hero-glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-glow-blob.glow-1 {
          width: 450px;
          height: 450px;
          top: -100px;
          right: -50px;
          background: rgba(13, 148, 136, 0.08);
        }

        .hero-glow-blob.glow-2 {
          width: 380px;
          height: 380px;
          bottom: -80px;
          left: -80px;
          background: rgba(249, 115, 22, 0.06);
        }

        .hero-smart-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-finder-copy {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-pulse-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent-color);
          background: var(--accent-light);
          padding: 0.4rem 0.9rem;
          border-radius: 50px;
          width: fit-content;
          border: 1px solid rgba(13, 148, 136, 0.2);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(13, 148, 136, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(13, 148, 136, 0);
          }
        }

        .hero-headline {
          font-family: var(--font-heading);
          font-size: 2.85rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 580px;
        }

        .smart-category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 0.5rem;
        }

        .category-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          border-radius: 50px;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          background: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .category-tab-pill:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .category-tab-pill.active {
          background: var(--accent-color);
          color: var(--white);
          border-color: var(--accent-color);
          box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
          transform: translateY(-2px);
        }

        .category-active-tagline {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(13, 148, 136, 0.05);
          padding: 0.6rem 1rem;
          border-radius: 12px;
          border-left: 3px solid var(--accent-color);
        }

        .sparkle-icon {
          color: var(--secondary-accent);
          flex-shrink: 0;
        }

        .hero-trust-bar {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .hero-ctas-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }

        .btn-secondary-quote {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          background: #25d366;
          color: var(--white);
          border: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-secondary-quote:hover {
          background: #20ba5a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
        }

        /* Right Column Showcase Card */
        .hero-finder-showcase {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .showcase-card-wrapper {
          width: 100%;
          max-width: 420px;
        }

        .hero-ecommerce-card {
          border-radius: 28px;
          overflow: hidden;
          background: var(--white);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .hero-ecommerce-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
          border-color: rgba(13, 148, 136, 0.3);
        }

        .card-image-stage {
          height: 240px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        .card-brand-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .card-stock-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.25rem 0.65rem;
          border-radius: 50px;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: var(--shadow-sm);
        }

        .stock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }

        .card-featured-img {
          max-height: 180px;
          object-fit: contain;
          transition: transform 0.4s ease;
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
        }

        .hero-ecommerce-card:hover .card-featured-img {
          transform: scale(1.06);
        }

        .card-svg-container {
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-details-stage {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-category-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .card-product-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .card-variants-row {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-top: 0.25rem;
        }

        .variant-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .variant-options-list {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .variant-pill {
          font-size: 0.78rem;
          font-family: var(--font-body);
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .variant-pill:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .variant-pill.selected {
          background: var(--accent-light);
          border-color: var(--accent-color);
          color: var(--accent-dark);
          font-weight: 700;
        }

        .card-footer-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-color);
          margin-top: 0.25rem;
        }

        .price-block {
          display: flex;
          flex-direction: column;
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
          font-weight: 500;
        }

        .card-buttons-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn-quick-inspect {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.55rem 0.85rem;
          border-radius: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-quick-inspect:hover {
          background: var(--white);
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .btn-quick-buy {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.55rem 1.1rem;
          border-radius: 10px;
          background: var(--accent-color);
          color: var(--white);
          border: none;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-quick-buy:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(13, 148, 136, 0.35);
        }

        .btn-quick-buy.added {
          background: #10b981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        @media (max-width: 1024px) {
          .hero-smart-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-headline {
            font-size: 2.25rem;
          }
          .showcase-card-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
