import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, RotateCcw, AlertTriangle, ChevronDown, Award, Star, Zap, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PRODUCTS } from "../data/products";

const CLINICAL_REVIEWS = [
  {
    initials: "CD",
    author: "Clínica Deportiva V.",
    badge: "Compra Verificada",
    rating: 5,
    text: "Excelente calidad en los materiales. Lo incorporamos de inmediato en nuestros protocolos de rehabilitación post-operatoria y ha resistido el uso rudo diario sin problemas.",
    date: "Hace 2 semanas",
    color: "#007EE5"
  },
  {
    initials: "DR",
    author: "Dr. Roberto M.",
    badge: "Compra Verificada",
    rating: 5,
    text: "El envío fue increíblemente rápido. El equipo superó las expectativas técnicas y el soporte de Bruce Médica resolvió todas nuestras dudas de configuración.",
    date: "Hace 1 mes",
    color: "#4f46e5"
  },
  {
    initials: "FI",
    author: "FisioIntegral",
    badge: "Compra Verificada",
    rating: 5,
    text: "Buscábamos durabilidad y definitivamente este producto la tiene. A nuestros pacientes les encanta el confort y nos permite realizar sesiones más largas y efectivas.",
    date: "Hace 2 meses",
    color: "#0284c7"
  },
  {
    initials: "AM",
    author: "Ana María P.",
    badge: "Compra Verificada",
    rating: 5,
    text: "Atención al cliente de primer nivel. Me asesoraron perfectamente para elegir el modelo que necesitaba mi clínica. 100% recomendados.",
    date: "Hace 3 meses",
    color: "#db2777"
  }
];

export default function ProductPage({ product, onBack, onAddToCart, onQuickAdd, onOpenProductModal, products = PRODUCTS }) {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("benefits");
  
  // Stock simulated scarcity timer
  const [stockCount, setStockCount] = useState(3);
  
  // Carousel state, ref, and autoplay logic
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const maxIndex = CLINICAL_REVIEWS.length - 1;
      let nextIndex = direction === "left" ? activeIndex - 1 : activeIndex + 1;
      
      if (nextIndex < 0) nextIndex = maxIndex;
      if (nextIndex > maxIndex) nextIndex = 0;

      carouselRef.current.scrollTo({
        left: nextIndex * containerWidth,
        behavior: "smooth"
      });
      setActiveIndex(nextIndex);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const containerWidth = carouselRef.current.clientWidth;
      if (containerWidth > 0) {
        const index = Math.round(scrollLeft / containerWidth);
        if (index !== activeIndex && index >= 0 && index < CLINICAL_REVIEWS.length) {
          setActiveIndex(index);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth;
        const maxIndex = CLINICAL_REVIEWS.length - 1;
        let nextIndex = activeIndex + 1;
        if (nextIndex > maxIndex) {
          nextIndex = 0;
        }
        carouselRef.current.scrollTo({
          left: nextIndex * containerWidth,
          behavior: "smooth"
        });
        setActiveIndex(nextIndex);
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Dynamic Main Image, Price, and SKU
  const [mainImage, setMainImage] = useState(product?.image);
  const [displayPrice, setDisplayPrice] = useState(product?.price || 0);
  const [displaySku, setDisplaySku] = useState(product?.sku || "");

  // Helper to find variant data and update display values
  const updateDisplayForVariant = (variantVal) => {
    if (!product) return;
    
    let targetPrice = product.price;
    let targetSku = product.sku;
    let targetImage = product.image;

    // 1. Get image from variables options (Wix stores images in the choice options)
    if (product.variables?.options) {
      const optObj = product.variables.options.find(o => {
        const val = typeof o === 'object' ? o.value : o;
        return val === variantVal;
      });
      if (optObj && typeof optObj === 'object' && optObj.image) {
        targetImage = optObj.image;
      }
    }

    // 2. Get price and SKU from full variants array
    if (product.variants && product.variants.length > 0 && variantVal) {
      const optionName = product.variables?.name;
      const matched = product.variants.find(v => {
        return v.choices && v.choices[optionName] === variantVal;
      });

      if (matched) {
        if (matched.price > 0) targetPrice = matched.price;
        if (matched.sku) targetSku = matched.sku;
        if (matched.image) targetImage = matched.image; // Fallback if image exists here
      }
    }

    setDisplayPrice(targetPrice);
    setDisplaySku(targetSku);
    setMainImage(targetImage);
  };

  // Initialize default variant
  useEffect(() => {
    if (product?.variables?.options?.length > 0) {
      const firstOpt = product.variables.options[0];
      const defaultVal = typeof firstOpt === 'object' ? firstOpt.value : firstOpt;
      setSelectedVariant(defaultVal);
      updateDisplayForVariant(defaultVal);
    } else {
      setSelectedVariant("");
      setDisplayPrice(product?.price || 0);
      setDisplaySku(product?.sku || "");
      setMainImage(product?.image);
    }
  }, [product]);

  // Update display values whenever selectedVariant changes
  useEffect(() => {
    if (selectedVariant) {
      updateDisplayForVariant(selectedVariant);
    }
  }, [selectedVariant]);

  if (!product) return null;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddClick = () => {
    const cartItem = {
      product: {
        ...product,
        price: displayPrice,
        sku: displaySku,
        image: mainImage || product.image
      },
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
      `- Precio Unitario: $${displayPrice.toLocaleString()} MXN\n\n` +
      `¿Podrían confirmarme disponibilidad de entrega inmediata?`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5215555750108?text=${encoded}`, "_blank");
  };

  // Find 3 related products (same category or alternative)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  // If we don't have enough, fill with others
  if (relatedProducts.length < 3) {
    const ids = relatedProducts.map(p => p.id);
    const fillers = products.filter(p => p.id !== product.id && !ids.includes(p.id)).slice(0, 3 - relatedProducts.length);
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
            {product.imageSvg ? (
              <div 
                className="showcase-svg-wrapper"
                dangerouslySetInnerHTML={{ __html: product.imageSvg }}
              />
            ) : (
              <img src={mainImage || product.image} alt={product.name} className="showcase-prod-img" />
            )}
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
          {displaySku && (
            <div className="product-sku-badge" style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginTop: '0.5rem',
              opacity: 0.8
            }}>
              SKU: <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{displaySku}</span>
            </div>
          )}

          {/* Rating stars row */}
          <div className="product-reviews-quick-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--secondary-accent)" color="var(--secondary-accent)" />)}
            </div>
            <span className="review-count">5.0 (42 Reseñas verificadas)</span>
          </div>

          <div className="pricing-urgency-card glass">
            <div className="price-tag">${displayPrice.toLocaleString()} MXN</div>
            
            {/* Urgent stock alert */}
            <div className="scarcity-alert-bar">
              <AlertTriangle size={14} className="text-red-alert" />
              <span className="text-red-alert font-bold">
                🔥 ¡Quedan pocas unidades en stock! Envío prioritario gratis hoy.
              </span>
            </div>
          </div>

          <div className="product-description-para" dangerouslySetInnerHTML={{ __html: product.rawDescription || product.description }} />

          {/* Dynamic Variant selector */}
          {product.variables && (
            <div className="product-configurator-block">
              <span className="config-label">Seleccionar {product.variables.name}:</span>
              
              <div className="config-pills-row">
                {product.variables.options.map((optObj) => {
                  const opt = typeof optObj === 'object' ? optObj.value : optObj;
                  const img = typeof optObj === 'object' ? optObj.image : null;
                  const isSelected = selectedVariant === opt;
                  return (
                    <button
                      key={opt || Math.random()}
                      onClick={() => {
                        setSelectedVariant(opt);
                        if (img) setMainImage(img);
                      }}
                      className={`config-pill-btn glass ${isSelected ? "selected" : ""} ${img ? "has-img" : ""}`}
                    >
                      {img && <img src={img} alt={opt} className="variant-swatch-img" />}
                      {!img && isSelected && <Check size={12} className="pill-check-icon" />}
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
          {product.additionalInfoSections && product.additionalInfoSections.length > 0 && (
            <div className="product-clinical-accordions-deck">
              {product.additionalInfoSections.map((section, idx) => (
                <div key={idx} className="clinical-accordion-item glass">
                  <button 
                    className="accordion-trigger-header"
                    onClick={() => setActiveAccordion(activeAccordion === `section-${idx}` ? null : `section-${idx}`)}
                  >
                    <span>{section.title || "Información Adicional"}</span>
                    <ChevronDown size={16} className={`arrow-icon ${activeAccordion === `section-${idx}` ? "rotate" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {activeAccordion === `section-${idx}` && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="accordion-content-viewport"
                      >
                        <div dangerouslySetInnerHTML={{ __html: section.description }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Product Reviews Section */}
      <div className="product-reviews-section">
        <div className="reviews-header-container">
          <div className="reviews-title-block">
            <h3>Opiniones Clínicas Verificadas</h3>
            <div className="overall-rating">
              <span className="rating-score">5.0</span>
              <div className="stars-lg">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--secondary-accent)" color="var(--secondary-accent)" />)}
              </div>
              <span className="rating-count">Basado en opiniones reales</span>
            </div>
          </div>

          <div className="carousel-controls">
            <button className="control-btn prev" onClick={() => scrollCarousel("left")} aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button className="control-btn next" onClick={() => scrollCarousel("right")} aria-label="Siguiente">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="reviews-carousel-outer">
          <div className="reviews-carousel-container">
            <div 
              className="reviews-carousel" 
              ref={carouselRef}
              onScroll={handleScroll}
            >
              {CLINICAL_REVIEWS.map((review, index) => (
                <div key={index} className="review-card">
                  <Quote className="review-quote-icon" size={48} />
                  <div className="review-author">
                    <div className="author-avatar" style={{ background: review.color }}>
                      {review.initials}
                    </div>
                    <div className="author-info">
                      <h4>{review.author}</h4>
                      <span className="verified-badge">
                        <Check size={10} /> {review.badge}
                      </span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--secondary-accent)" color="var(--secondary-accent)" />
                    ))}
                  </div>
                  <p className="review-body">"{review.text}"</p>
                  <span className="review-date">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel indicator dots */}
        <div className="carousel-indicators">
          {CLINICAL_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${activeIndex === idx ? "active" : ""}`}
              onClick={() => {
                if (carouselRef.current) {
                  const containerWidth = carouselRef.current.clientWidth;
                  carouselRef.current.scrollTo({
                    left: idx * containerWidth,
                    behavior: "smooth"
                  });
                  setActiveIndex(idx);
                }
              }}
              aria-label={`Ir a reseña ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Cross-Sell Related Section */}
      <div className="related-cross-sell-section">
        <h3 className="cross-sell-title">Equipamiento Complementario Recomendado</h3>
        
        <div className="related-products-deck grid-3">
          {relatedProducts.map((prod) => (
            <div key={prod.id} className="related-product-card glass">
              <div className="card-image-box" style={{ background: prod.imageBg }}>
                {prod.imageSvg ? (
                  <div 
                    className="card-svg"
                    dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                  />
                ) : (
                  <img src={prod.image} alt={prod.name} className="card-prod-img" />
                )}
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
          position: sticky;
          top: 100px;
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

        .showcase-prod-img {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
          z-index: 1;
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
          background: rgba(0, 126, 229, 0.08);
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

        .config-pill-btn.has-img {
          padding-left: 0.45rem;
        }

        .variant-swatch-img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-color);
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

        .related-product-card .card-prod-img {
          width: 70%;
          height: 70%;
          object-fit: contain;
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

        .product-reviews-section {
          padding: 4rem 0;
          margin-bottom: 3rem;
          border-top: 1px solid var(--border-color);
        }

        .reviews-header-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          gap: 1.5rem;
        }

        .reviews-title-block h3 {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }

        .overall-rating {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stars-lg {
          display: flex;
          gap: 0.15rem;
        }

        .rating-score {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .rating-count {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          border: 1px solid var(--border-color);
        }

        .carousel-controls {
          display: flex;
          gap: 0.75rem;
        }

        .control-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--white);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .control-btn:hover {
          background: var(--accent-color);
          color: var(--white);
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .reviews-carousel-container {
          position: relative;
          width: 100%;
          border-radius: 28px;
          border: 1px solid var(--border-color);
          background: var(--white);
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.03);
          overflow: hidden;
        }

        .reviews-carousel-outer {
          max-width: 760px;
          margin: 0 auto;
          position: relative;
        }

        /* Fade overlay effects disabled for single card deck */
        .reviews-carousel-container::before,
        .reviews-carousel-container::after {
          display: none;
        }

        .reviews-carousel {
          display: flex;
          overflow-x: auto;
          gap: 0;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Hide standard scrollbar in Firefox */
        }

        /* Hide scrollbars for Chrome/Safari */
        .reviews-carousel::-webkit-scrollbar {
          display: none;
        }

        .review-card {
          min-width: 100%;
          max-width: 100%;
          scroll-snap-align: center;
          flex-shrink: 0;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: transparent;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          border: none;
          box-shadow: none;
        }

        .review-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(to right, var(--accent-color), var(--accent-dark));
        }

        .review-quote-icon {
          position: absolute;
          right: 2.5rem;
          top: 2.5rem;
          color: rgba(0, 126, 229, 0.07);
          pointer-events: none;
          transform: scaleX(-1); /* mirror quote design */
        }

        .review-author {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .author-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .author-info h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #007EE5;
          background: rgba(16, 185, 129, 0.08);
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
        }

        .review-stars {
          display: flex;
          gap: 0.25rem;
        }

        .review-body {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          flex-grow: 1;
          font-style: italic;
        }

        .review-date {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-tertiary);
          opacity: 0.35;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
        }

        .indicator-dot.active {
          width: 28px;
          border-radius: 12px;
          background: var(--accent-color);
          opacity: 1;
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
          .reviews-header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .carousel-controls {
            align-self: flex-end;
          }
          .review-card {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
