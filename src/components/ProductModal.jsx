import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Truck,
  Star,
  Zap,
  Info,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchVariantPrices } from "../data/wixService";

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [addedVariants, setAddedVariants] = useState({});
  const [customerNotes, setCustomerNotes] = useState("");
  // Separate price map fetched async — updates prices without rebuilding variant structure
  const [variantPrices, setVariantPrices] = useState({});

  // Safely clean raw HTML descriptions
  const cleanDescription = (str) => {
    if (!str) return "Equipamiento biomédico de grado clínico profesional.";
    return str
      .replace(/&nbsp;/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Build resolved list of variant objects matching 100% with Wix Store and ProductPage prices & images
  const getResolvedVariants = (prod) => {
    if (!prod) return [];
    
    const basePrice = Number(prod.price) > 0 ? Number(prod.price) : 0;
    
    // 1. If product has real variants from Wix Stores API (with choices & prices)
    if (prod.variants && prod.variants.length > 0) {
      return prod.variants.map((v, idx) => {
        const choiceVal = v.choices ? Object.values(v.choices).join(" / ") : `Versión ${idx + 1}`;
        const price = Number(v.price) > 0 ? Number(v.price) : basePrice;
        
        let variantImg = v.image;
        if (!variantImg && prod.variables?.options) {
          const matchedOpt = prod.variables.options.find(o => {
            const val = typeof o === 'object' ? o.value : o;
            return val === choiceVal || choiceVal.includes(val) || (typeof val === 'string' && choiceVal.toLowerCase().includes(val.toLowerCase()));
          });
          if (matchedOpt && typeof matchedOpt === 'object' && matchedOpt.image) {
            variantImg = matchedOpt.image;
          }
        }

        return {
          id: v.id || `${prod.id}-v-${idx}`,
          value: choiceVal,
          image: variantImg || prod.image,
          price: price,
          sku: v.sku || prod.sku || "",
          badge: idx === 0 ? "PRINCIPAL" : "OPCIÓN"
        };
      });
    }

    // 2. If product has variables.options defined (bulk query doesn't include variant prices)
    const rawOptions = prod.variables?.options || [];
    if (rawOptions.length > 0) {
      return rawOptions.map((opt, idx) => {
        const valueName = typeof opt === 'object' ? (opt.value || opt.name || `Opción ${idx+1}`) : String(opt);
        const optImg = typeof opt === 'object' && opt.image ? opt.image : prod.image;
          
        return {
          id: `${prod.id}-v-${idx}`,
          value: valueName,
          image: optImg || prod.image,
          // Price will be updated by variantPrices state once async fetch resolves
          price: basePrice,
          sku: prod.sku || "",
          badge: idx === 0 ? "POPULAR" : "OPCIÓN"
        };
      });
    }

    // 3. Single product default option (100% matching product.price!)
    return [
      {
        id: `${prod.id}-single`,
        value: "Unidad Estándar",
        image: prod.image,
        price: basePrice,
        sku: prod.sku || "",
        badge: "INCLUIDO"
      }
    ];
  };

  const baseVariants = getResolvedVariants(product);
  // Overlay individual prices from async fetch — preserving images & structure
  const variants = baseVariants.map(v => ({
    ...v,
    price: variantPrices[v.value] !== undefined ? variantPrices[v.value] : v.price
  }));

  useEffect(() => {
    // Reset prices map on product change
    setVariantPrices({});
    if (product && isOpen) {
      const initialQty = {};
      baseVariants.forEach(v => {
        initialQty[v.value] = 1;
      });
      setQuantities(initialQty);
      setAddedVariants({});
      setCustomerNotes("");

      // Fetch individual variant prices if bulk query didn't include them
      if (product?.id && (!product.variants || product.variants.length === 0) && product.variables?.options?.length > 0) {
        fetchVariantPrices(product.id).then(priceMap => {
          if (Object.keys(priceMap).length > 0) {
            setVariantPrices(priceMap);
          }
        }).catch(err => console.warn("Variant prices fetch failed, using base price", err));
      }
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleIncrement = (variantValue) => {
    setQuantities(prev => ({
      ...prev,
      [variantValue]: (prev[variantValue] || 1) + 1
    }));
  };

  const handleDecrement = (variantValue) => {
    setQuantities(prev => ({
      ...prev,
      [variantValue]: (prev[variantValue] || 1) > 1 ? prev[variantValue] - 1 : 1
    }));
  };

  const handleAddSingleVariant = (variant) => {
    const qty = quantities[variant.value] || 1;
    
    onAddToCart([{
      product: {
        ...product,
        price: variant.price
      },
      variantName: product.variables?.name || "Opción / Versión",
      variantValue: variant.value,
      quantity: qty,
      notes: customerNotes
    }]);

    setAddedVariants(prev => ({ ...prev, [variant.value]: true }));
    setTimeout(() => {
      setAddedVariants(prev => ({ ...prev, [variant.value]: false }));
    }, 2000);
  };

  const handleGoToFullDetails = () => {
    onClose();
    const targetPath = product.slug ? `/product/${product.slug}` : `/product/${product.id}`;
    navigate(targetPath);
  };

  return (
    <AnimatePresence>
      <div className="quickbuy-modal-overlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="quickbuy-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="quickbuy-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} />
          </button>

          <div className="quickbuy-modal-grid">
            {/* LEFT COLUMN: Main Image & Features */}
            <div className="quickbuy-left-col">
              <div className="quickbuy-img-stage">
                <span className="quickbuy-badge-tag">{product.badge || "OFERTA RÁPIDA"}</span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="quickbuy-main-img" 
                />
              </div>

              <div className="quickbuy-info-meta">
                <span className="quickbuy-category-pill">
                  {product.brand || "BRUCE MÉDICA"} • {product.category || "Grado Clínico"}
                  {product.sku && <span style={{ marginLeft: "8px", opacity: 0.95, fontWeight: "700" }}>| SKU: {product.sku}</span>}
                </span>
                <h2 className="quickbuy-product-title">{product.name}</h2>
                <div className="quickbuy-rating-row">
                  <div className="quickbuy-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="rating-score">4.9</span>
                  <span className="reviews-count">(120+ reseñas verificadas)</span>
                </div>

                <p className="quickbuy-short-desc">
                  {cleanDescription(product.description).substring(0, 160)}...
                </p>

                <div className="quickbuy-guarantee-pills">
                  <span><ShieldCheck size={14} /> Garantía 12 Meses</span>
                  <span><Truck size={14} /> Envío Inmediato 24h</span>
                </div>

                {/* Direct link to full product page */}
                <button className="quickbuy-btn-full-details" onClick={handleGoToFullDetails}>
                  <Eye size={16} /> Ver especificaciones completas <ExternalLink size={14} />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Independent Variant Rows */}
            <div className="quickbuy-right-col">
              <div className="quickbuy-variants-header">
                <h3 className="quickbuy-section-title">
                  <Zap size={18} className="icon-fire" /> Seleccionar Opciones & Versiones
                </h3>
                <p className="quickbuy-section-subtitle">
                  Elige la cantidad de cada opción y agrégalas al carrito de forma independiente:
                </p>
              </div>

              {/* INDEPENDENT VARIANT ROWS LIST */}
              <div className="quickbuy-variants-list">
                {variants.map((v) => {
                  const qty = quantities[v.value] || 1;
                  const isSuccess = addedVariants[v.value];
                  const currentSku = v.sku || product.sku;

                  return (
                    <div key={v.id} className="quickbuy-variant-item-card">
                      {/* Image Thumbnail */}
                      <div className="variant-thumb-box">
                        <img src={v.image} alt={v.value} className="variant-thumb-img" />
                      </div>

                      {/* Variant Info */}
                      <div className="variant-info-box">
                        <div className="variant-title-badge-row">
                          <span className="variant-option-name">{v.value}</span>
                          {v.badge && <span className="variant-tag-badge">{v.badge}</span>}
                        </div>
                        <span className="variant-price">${v.price.toLocaleString("es-MX")} MXN</span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.78rem", marginTop: "2px" }}>
                          <span className="variant-stock-status">✓ En Stock</span>
                          {currentSku && (
                            <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>• SKU: {currentSku}</span>
                          )}
                        </div>
                      </div>

                      {/* Stepper Quantity & Independent Add Button */}
                      <div className="variant-actions-box">
                        <div className="quickbuy-stepper">
                          <button 
                            className="stepper-btn" 
                            onClick={() => handleDecrement(v.value)}
                            disabled={qty <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="stepper-qty">{qty}</span>
                          <button 
                            className="stepper-btn" 
                            onClick={() => handleIncrement(v.value)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          className={`btn-add-variant-independent ${isSuccess ? "added-success" : ""}`}
                          onClick={() => handleAddSingleVariant(v)}
                        >
                          {isSuccess ? (
                            <>
                              <Check size={16} /> ¡Agregado!
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={15} /> Agregar
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* OPTIONAL CUSTOMER NOTES INPUT */}
              <div className="quickbuy-notes-block">
                <label className="notes-label">
                  <Info size={14} /> Observaciones especiales para tu pedido (opcional):
                </label>
                <textarea 
                  className="notes-textarea"
                  placeholder="Ej. Requiero factura fiscal, preferencia de color o instrucciones de entrega..."
                  rows={2}
                  maxLength={500}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                />
                <span className="notes-counter">{customerNotes.length}/500</span>
              </div>

              {/* BOTTOM FOOTER LINK */}
              <div className="quickbuy-footer-bar">
                <button className="quickbuy-link-details-bottom" onClick={handleGoToFullDetails}>
                  Ver detalles completos en página individual →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .quickbuy-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .quickbuy-modal-card {
          background: #ffffff;
          border-radius: 28px;
          width: 100%;
          max-width: 1060px;
          max-height: 92vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 48, 87, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .quickbuy-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .quickbuy-close-btn:hover {
          background: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
          transform: rotate(90deg);
        }

        .quickbuy-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
          padding: 2rem;
        }

        @media (max-width: 868px) {
          .quickbuy-modal-grid {
            grid-template-columns: 1fr;
            padding: 1.25rem;
            gap: 1.5rem;
          }
        }

        /* LEFT COL */
        .quickbuy-left-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quickbuy-img-stage {
          background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
          border-radius: 20px;
          padding: 1.5rem;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid #e2e8f0;
        }

        .quickbuy-badge-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #007EE5;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 900;
          padding: 0.3rem 0.75rem;
          border-radius: 50px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .quickbuy-main-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .quickbuy-info-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quickbuy-category-pill {
          font-size: 0.75rem;
          font-weight: 800;
          color: #007EE5;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .quickbuy-product-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
        }

        .quickbuy-rating-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
        }

        .quickbuy-stars {
          display: flex;
          gap: 2px;
        }

        .rating-score {
          font-weight: 800;
          color: #0f172a;
        }

        .reviews-count {
          color: #64748b;
        }

        .quickbuy-short-desc {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.5;
          margin-top: 0.25rem;
        }

        .quickbuy-guarantee-pills {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
          font-weight: 700;
          color: #059669;
          margin-top: 0.25rem;
        }

        .quickbuy-guarantee-pills span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #ecfdf5;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
          border: 1px solid rgba(5, 150, 105, 0.2);
        }

        .quickbuy-btn-full-details {
          margin-top: 0.75rem;
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          color: #0f172a;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .quickbuy-btn-full-details:hover {
          background: #007EE5;
          color: #ffffff;
          border-color: #007EE5;
          box-shadow: 0 6px 18px rgba(0, 126, 229, 0.25);
        }

        /* RIGHT COL */
        .quickbuy-right-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .quickbuy-variants-header {
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 0.75rem;
        }

        .quickbuy-section-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 900;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon-fire {
          color: #f59e0b;
        }

        .quickbuy-section-subtitle {
          font-size: 0.82rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        .quickbuy-variants-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-height: 420px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }

        .quickbuy-variant-item-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }

        .quickbuy-variant-item-card:hover {
          border-color: #007EE5;
          box-shadow: 0 8px 24px rgba(0, 126, 229, 0.12);
          transform: translateY(-1px);
        }

        .variant-thumb-box {
          width: 58px;
          height: 58px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          padding: 0.25rem;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .variant-thumb-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .variant-info-box {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .variant-title-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .variant-option-name {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: #0f172a;
        }

        .variant-tag-badge {
          font-size: 0.62rem;
          font-weight: 900;
          background: #e0f2fe;
          color: #0284c7;
          padding: 0.15rem 0.5rem;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .variant-price {
          font-size: 0.95rem;
          font-weight: 900;
          color: #007EE5;
          margin-top: 0.1rem;
        }

        .variant-stock-status {
          font-size: 0.7rem;
          color: #10b981;
          font-weight: 600;
        }

        .variant-actions-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .quickbuy-stepper {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border-radius: 50px;
          padding: 0.2rem;
          border: 1px solid #cbd5e1;
        }

        .stepper-btn {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .stepper-btn:hover:not(:disabled) {
          background: #007EE5;
          color: #ffffff;
          border-color: #007EE5;
        }

        .stepper-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .stepper-qty {
          width: 28px;
          text-align: center;
          font-weight: 900;
          font-size: 0.85rem;
          color: #0f172a;
        }

        .btn-add-variant-independent {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 0.55rem 1rem;
          border-radius: 10px;
          font-weight: 800;
          font-size: 0.82rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .btn-add-variant-independent:hover {
          background: #007EE5;
          box-shadow: 0 4px 14px rgba(0, 126, 229, 0.3);
        }

        .btn-add-variant-independent.added-success {
          background: #10b981;
          color: #ffffff;
        }

        /* NOTES BLOCK */
        .quickbuy-notes-block {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .notes-label {
          font-size: 0.78rem;
          font-weight: 800;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .notes-textarea {
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 0.5rem;
          font-size: 0.8rem;
          color: #0f172a;
          resize: none;
          outline: none;
        }

        .notes-textarea:focus {
          border-color: #007EE5;
        }

        .notes-counter {
          font-size: 0.68rem;
          color: #94a3b8;
          text-align: right;
        }

        .quickbuy-footer-bar {
          display: flex;
          justify-content: flex-end;
        }

        .quickbuy-link-details-bottom {
          background: transparent;
          border: none;
          color: #007EE5;
          font-weight: 800;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: underline;
        }

        .quickbuy-link-details-bottom:hover {
          color: #003057;
        }
      `}</style>
    </AnimatePresence>
  );
}
