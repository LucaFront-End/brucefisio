import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, RotateCcw, AlertTriangle, ChevronDown, Award, Star, Zap } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function ProductPage({ product, onBack, onAddToCart, onQuickAdd, onOpenProductModal }) {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("benefits");
  
  // Stock simulated scarcity timer
  const [stockCount, setStockCount] = useState(3);

  // Initialize default variant
  useEffect(() => {
    if (product?.variables?.options?.length > 0) {
      setSelectedVariant(product.variables.options[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddClick = () => {
    const cartItem = {
      product,
      variantName: product.variables?.name || "Opción",
      variantValue: selectedVariant || "Única",
      quantity
    };
    onAddToCart([cartItem]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsAppQuote = () => {
    const variantText = selectedVariant ? ` (Variante: ${selectedVariant})` : "";
    const message = `Hola! Estoy interesado en adquirir el equipo:\n\n` +
      `- Producto: ${product.name}${variantText}\n` +
      `- Cantidad: ${quantity} unidades\n` +
      `- Precio Unitario: $${product.price.toLocaleString()} MXN\n\n` +
      `¿Podrían confirmarme disponibilidad de entrega inmediata?`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5215555555555?text=${encoded}`, "_blank");
  };

  // Find 3 related products (same category or alternative)
  const relatedProducts = PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  // If we don't have enough, fill with others
  if (relatedProducts.length < 3) {
    const ids = relatedProducts.map(p => p.id);
    const fillers = PRODUCTS.filter(p => p.id !== product.id && !ids.includes(p.id)).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...fillers);
  }

  return (
    <div className="product-page-container container">
      
      {/* Back button */}
      <button className="back-to-shop-link-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Volver al catálogo de la tienda
      </button>

      <div className="product-detail-grid grid-2">
        
        {/* Left Column: Visual Showcase Gallery */}
        <div className="product-visuals-col">
          <div className="product-showcase-glass-frame" style={{ background: product.imageBg }}>
            <div className="showcase-glow-backdrop"></div>
            <div 
              className="showcase-svg-wrapper"
              dangerouslySetInnerHTML={{ __html: product.imageSvg }}
            />
          </div>

          {/* Symmetrical High-tech Parameter Badges */}
          <div className="product-features-grid-specs">
            <div className="feature-spec-cell glass">
              <ShieldCheck size={18} className="text-accent" />
              <div>
                <h5>Garantía</h5>
                <span>2 Años Directa</span>
              </div>
            </div>
            
            <div className="feature-spec-cell glass">
              <Truck size={18} className="text-accent" />
              <div>
                <h5>Envío</h5>
                <span>Express Gratis</span>
              </div>
            </div>

            <div className="feature-spec-cell glass">
              <Award size={18} className="text-accent" />
              <div>
                <h5>Certificación</h5>
                <span>FDA / CE Grado</span>
              </div>
            </div>

            <div className="feature-spec-cell glass">
              <Zap size={18} className="text-accent" />
              <div>
                <h5>Tecnología</h5>
                <span>Bruce Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Converting Information Column */}
        <div className="product-info-buying-col">
          <nav className="product-breadcrumbs">
            <span>Tienda</span> / <span>{product.category}</span> / <span className="active">{product.brand}</span>
          </nav>

          <span className="brand-badge-pill">{product.brand}</span>
          <h1 className="product-primary-title">{product.name}</h1>

          {/* Rating stars row */}
          <div className="product-reviews-quick-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--secondary-accent)" color="var(--secondary-accent)" />)}
            </div>
            <span className="review-count">5.0 (42 Reseñas verificadas)</span>
          </div>

          <div className="pricing-urgency-card glass">
            <div className="price-tag">${product.price.toLocaleString()} MXN</div>
            
            {/* Urgent stock alert */}
            <div className="scarcity-alert-bar">
              <AlertTriangle size={14} className="text-red-alert" />
              <span className="text-red-alert font-bold">
                🔥 ¡Quedan pocas unidades en stock! Envío prioritario gratis hoy.
              </span>
            </div>
          </div>

          <p className="product-description-para">{product.description}</p>

          {/* Dynamic Variant selector */}
          {product.variables && (
            <div className="product-configurator-block">
              <span className="config-label">Seleccionar {product.variables.name}:</span>
              
              <div className="config-pills-row">
                {product.variables.options.map((opt) => {
                  const isSelected = selectedVariant === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariant(opt)}
                      className={`config-pill-btn glass ${isSelected ? "selected" : ""}`}
                    >
                      {isSelected && <Check size={12} className="pill-check-icon" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and CTA actions panel */}
          <div className="product-actions-checkout-panel">
            <div className="qty-picker-container">
              <button className="qty-btn" onClick={handleDecrement}>-</button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={handleIncrement}>+</button>
            </div>

            <button 
              onClick={handleAddClick}
              className={`btn btn-accent btn-add-to-cart-primary ${addedToCart ? "success" : ""}`}
              disabled={addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check size={16} /> ¡Añadido con Éxito!
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Añadir al Carrito
                </>
              )}
            </button>
          </div>

          {/* Direct WhatsApp check option */}
          <button className="whatsapp-quick-quote-primary-btn" onClick={handleWhatsAppQuote}>
            <Zap size={14} /> Cotizar rápido por WhatsApp
          </button>

          {/* Marketplace Verification Badges */}
          <div className="marketplace-verification-box glass">
            <span className="verification-label">Canales Oficiales Autorizados:</span>
            <div className="marketplace-badges-row">
              <div className="marketplace-badge amazon">
                <span className="badge-logo-a">a</span>
                <span className="badge-text">Distribuidor Oficial en <strong>Amazon</strong></span>
              </div>
              <div className="marketplace-badge mercadolibre">
                <span className="badge-logo-m">ml</span>
                <span className="badge-text">MercadoLíder Platinum en <strong>Mercado Libre</strong></span>
              </div>
            </div>
          </div>

          {/* Clinical Accordions */}
          <div className="product-clinical-accordions-deck">
            
            {/* Accordion 1: Benefits */}
            <div className="clinical-accordion-item glass">
              <button 
                className="accordion-trigger-header"
                onClick={() => setActiveAccordion(activeAccordion === "benefits" ? null : "benefits")}
              >
                <span>Beneficios Clínicos</span>
                <ChevronDown size={16} className={`arrow-icon ${activeAccordion === "benefits" ? "rotate" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === "benefits" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="accordion-content-viewport"
                  >
                    <ul>
                      <li>Acelera la reabsorción de edemas y desinflamación linfática.</li>
                      <li>Inhibe señales de dolor de forma no farmacológica por mecanismo de compuerta.</li>
                      <li>Incrementa el rango de movimiento articular hasta en un 35% en sesiones dirigidas.</li>
                      <li>Materiales hipoalergénicos aptos para uso clínico continuo.</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Specs Sheet */}
            <div className="clinical-accordion-item glass">
              <button 
                className="accordion-trigger-header"
                onClick={() => setActiveAccordion(activeAccordion === "specs" ? null : "specs")}
              >
                <span>Ficha Técnica Detallada</span>
                <ChevronDown size={16} className={`arrow-icon ${activeAccordion === "specs" ? "rotate" : ""}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeAccordion === "specs" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="accordion-content-viewport"
                  >
                    <table className="clinical-specs-table">
                      <tbody>
                        <tr>
                          <td>Alimentación</td>
                          <td>Batería de Litio recargable de grado clínico</td>
                        </tr>
                        <tr>
                          <td>Dosificación</td>
                          <td>Controles digitales calibrados por microprocesador</td>
                        </tr>
                        <tr>
                          <td>Certificaciones</td>
                          <td>FDA, CE, Cofepris (Equipamiento Fisioterapéutico)</td>
                        </tr>
                        <tr>
                          <td>Material Estructural</td>
                          <td>Polímeros de alta absorción de impacto</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

      {/* Cross-Sell Related Section */}
      <div className="related-cross-sell-section">
        <h3 className="cross-sell-title">Equipamiento Complementario Recomendado</h3>
        
        <div className="related-products-deck grid-3">
          {relatedProducts.map((prod) => (
            <div key={prod.id} className="related-product-card glass">
              <div className="card-image-box" style={{ background: prod.imageBg }}>
                <div 
                  className="card-svg"
                  dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                />
              </div>
              <div className="card-meta">
                <span className="brand-tag">{prod.brand}</span>
                <h4>{prod.name}</h4>
                <div className="price-tag">${prod.price.toLocaleString()} MXN</div>
              </div>
              <div className="card-actions">
                <button 
                  className="btn btn-secondary btn-inspect"
                  onClick={() => onOpenProductModal(prod)}
                >
                  Ver Detalles
                </button>
                <button 
                  className="btn btn-accent btn-quick-add"
                  onClick={() => onQuickAdd(prod)}
                >
                  <ShoppingCart size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .product-page-container {
          padding: 3rem 2rem 6rem 2rem;
          background: var(--bg-primary);
        }

        .back-to-shop-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          transition: color var(--transition-fast);
        }

        .back-to-shop-link-btn:hover {
          color: var(--accent-color);
        }

        .product-detail-grid {
          align-items: start;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        /* Left visuals frame */
        .product-visuals-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .product-showcase-glass-frame {
          height: 480px;
          border-radius: 28px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .showcase-glow-backdrop {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.45);
          filter: blur(50px);
          z-index: 0;
          pointer-events: none;
        }

        .showcase-svg-wrapper {
          width: 65%;
          height: 65%;
          z-index: 1;
        }

        .showcase-svg-wrapper svg {
          width: 100%;
          height: 100%;
        }

        /* Tech parameter badges */
        .product-features-grid-specs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .feature-spec-cell {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-align: left;
        }

        .feature-spec-cell h5 {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.1rem;
        }

        .feature-spec-cell span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Right buying info */
        .product-info-buying-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .product-breadcrumbs {
          font-family: var(--font-heading);
          font-size: 0.78rem;
          color: var(--text-tertiary);
          margin-bottom: 1.5rem;
        }

        .product-breadcrumbs span.active {
          color: var(--accent-color);
          font-weight: 700;
        }

        .brand-badge-pill {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--accent-color);
          background: rgba(13, 148, 136, 0.08);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .product-primary-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }

        .product-reviews-quick-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }

        .product-reviews-quick-row .stars {
          display: flex;
          gap: 0.1rem;
        }

        .product-reviews-quick-row .review-count {
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Pricing & Scarcity */
        .pricing-urgency-card {
          width: 100%;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pricing-urgency-card .price-tag {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .scarcity-alert-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #fff1f2;
          border: 1px solid #ffe4e6;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
        }

        .text-red-alert {
          color: #e11d48;
          font-size: 0.78rem;
        }

        .product-description-para {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* Configurator variant options */
        .product-configurator-block {
          width: 100%;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .config-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .config-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .config-pill-btn {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.65rem 1.15rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all var(--transition-fast);
        }

        .config-pill-btn:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .config-pill-btn.selected {
          border-color: var(--text-primary);
          background: var(--text-primary);
          color: var(--white);
        }

        .pill-check-icon {
          color: var(--white);
        }

        /* Quantity and checkout actions */
        .product-actions-checkout-panel {
          display: flex;
          gap: 1rem;
          width: 100%;
          margin-bottom: 1rem;
        }

        .qty-picker-container {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          background: var(--white);
        }

        .qty-btn {
          width: 44px;
          height: 44px;
          font-size: 1.2rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast);
        }

        .qty-btn:hover {
          background: var(--bg-secondary);
        }

        .qty-value {
          font-family: var(--font-heading);
          width: 38px;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
          text-align: center;
        }

        .btn-add-to-cart-primary {
          flex-grow: 1;
          height: 46px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
        }

        .btn-add-to-cart-primary.success {
          background: #25d366;
          border-color: #22c55e;
        }

        /* WhatsApp quote trigger */
        .whatsapp-quick-quote-primary-btn {
          width: 100%;
          background: #25d366;
          border: 1px solid #22c55e;
          color: var(--white);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.15);
          transition: all var(--transition-fast);
          margin-bottom: 2.5rem;
        }

        .whatsapp-quick-quote-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.25);
        }

        /* Marketplace Verification badges */
        .marketplace-verification-box {
          width: 100%;
          background: rgba(248, 250, 252, 0.6);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.15rem 1.5rem;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }

        .verification-label {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .marketplace-badges-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .marketplace-badge {
          flex: 1;
          min-width: 180px;
          background: var(--white);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          transition: all var(--transition-fast);
        }

        .marketplace-badge:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .marketplace-badge.amazon:hover {
          border-color: #ff9900;
        }

        .marketplace-badge.mercadolibre:hover {
          border-color: #ffe600;
        }

        .badge-logo-a {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #232f3e;
          color: #ff9900;
          font-family: 'Arial', sans-serif;
          font-weight: 900;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .badge-logo-m {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: #ffe600;
          color: #2d3277;
          font-family: 'Arial', sans-serif;
          font-weight: 800;
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: lowercase;
          line-height: 1;
        }

        .badge-text {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .badge-text strong {
          color: var(--text-primary);
        }

        /* Clinical Accordions */
        .product-clinical-accordions-deck {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .clinical-accordion-item {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
        }

        .accordion-trigger-header {
          width: 100%;
          padding: 1.15rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: background var(--transition-fast);
        }

        .accordion-trigger-header:hover {
          background: var(--bg-secondary);
        }

        .accordion-trigger-header .arrow-icon {
          color: var(--text-tertiary);
          transition: transform 0.25s ease;
        }

        .accordion-trigger-header .arrow-icon.rotate {
          transform: rotate(180deg);
          color: var(--accent-color);
        }

        .accordion-content-viewport {
          padding: 0 1.5rem 1.25rem 1.5rem;
          text-align: left;
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .accordion-content-viewport ul {
          padding-left: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .clinical-specs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .clinical-specs-table td {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .clinical-specs-table tr:last-child td {
          border-bottom: none;
        }

        .clinical-specs-table td:first-child {
          font-weight: 700;
          color: var(--text-primary);
          width: 40%;
        }

        /* Related Cross-Sell Deck */
        .related-cross-sell-section {
          border-top: 1px solid var(--border-color);
          padding-top: 5rem;
          margin-top: 5rem;
          text-align: left;
        }

        .cross-sell-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 2.5rem;
        }

        .related-products-deck {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .related-product-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
          transition: all var(--transition-fast);
        }

        .related-product-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-4px);
        }

        .related-product-card .card-image-box {
          height: 160px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .related-product-card .card-svg {
          width: 60%;
          height: 60%;
        }

        .related-product-card .card-svg svg {
          width: 100%;
          height: 100%;
        }

        .related-product-card .card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .related-product-card .brand-tag {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .related-product-card h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .related-product-card .price-tag {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .related-product-card .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .related-product-card .btn-inspect {
          flex-grow: 1;
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .related-product-card .btn-quick-add {
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
        }

        @media (max-width: 1024px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .product-showcase-glass-frame {
            height: 320px;
          }
          .related-products-deck {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
