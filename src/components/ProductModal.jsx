import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart, Check } from "lucide-react";

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  // Track quantities for each variable option
  // State format: { "Negro Mate": 0, "Gris Titanio": 2, ... }
  const [quantities, setQuantities] = useState({});
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      // Initialize all options with 0 quantity
      const initialQuantities = {};
      product.variables.options.forEach(optObj => {
        const option = typeof optObj === 'object' ? optObj.value : optObj;
        initialQuantities[option] = 0;
      });
      setQuantities(initialQuantities);
      setIsAdded(false);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleIncrement = (option) => {
    setQuantities(prev => ({
      ...prev,
      [option]: (prev[option] || 0) + 1
    }));
  };

  const handleDecrement = (option) => {
    setQuantities(prev => ({
      ...prev,
      [option]: Math.max(0, (prev[option] || 0) - 1)
    }));
  };

  const totalItems = Object.values(quantities).reduce((acc, curr) => acc + curr, 0);
  const totalPrice = totalItems * product.price;

  const handleAddClick = () => {
    if (totalItems === 0) return;

    // Filter out options with 0 quantity
    const itemsToAdd = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([variantValue, qty]) => ({
        product,
        variantName: product.variables.name,
        variantValue,
        quantity: qty
      }));

    onAddToCart(itemsToAdd);
    setIsAdded(true);
    
    // Reset confirmation status after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="modal-content glass"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="modal-grid">
            {/* Left: Product Info & Image */}
            <div className="modal-visual-column">
              <div className="modal-image-wrapper" style={{ background: product.imageBg }}>
                {product.imageSvg ? (
                  <div 
                    className="modal-svg-container"
                    dangerouslySetInnerHTML={{ __html: product.imageSvg }}
                  />
                ) : (
                  <img src={product.image} alt={product.name} className="modal-prod-img" />
                )}
              </div>
              <div className="modal-info-meta">
                <span className="modal-brand">{product.brand}</span>
                <h2 className="modal-title">{product.name}</h2>
                <span className="modal-category">{product.category}</span>
                <div className="modal-description" dangerouslySetInnerHTML={{ __html: product.rawDescription || product.description }} />
                <div className="modal-base-price">
                  Precio unitario: <span>${product.price.toLocaleString()} MXN</span>
                </div>
              </div>
            </div>

            {/* Right: Variable configuration */}
            <div className="modal-config-column">
              <div className="config-header">
                <h3>Configurar Variantes</h3>
                <p>Elige las cantidades de cada opción de {product.variables.name}:</p>
              </div>

              <div className="variants-list">
                {product.variables.options.map((optObj) => {
                  const option = typeof optObj === 'object' ? optObj.value : optObj;
                  const img = typeof optObj === 'object' ? optObj.image : null;
                  const qty = quantities[option] || 0;
                  return (
                    <div key={option || Math.random()} className={`variant-row ${qty > 0 ? "active-row" : ""}`}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {img && <img src={img} alt={option} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} />}
                        <span className="variant-label">{option}</span>
                      </div>
                      
                      <div className="stepper">
                        <button 
                          className="stepper-btn" 
                          onClick={() => handleDecrement(option)}
                          disabled={qty === 0}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="stepper-value">{qty}</span>
                        <button 
                          className="stepper-btn" 
                          onClick={() => handleIncrement(option)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Summary */}
              <div className="config-summary">
                <div className="summary-row">
                  <span>Total de unidades:</span>
                  <span className="bold">{totalItems} pzas</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal estimado:</span>
                  <span className="bold text-accent">${totalPrice.toLocaleString()} MXN</span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={totalItems > 0 && !isAdded ? { scale: 1.02 } : {}}
                whileTap={totalItems > 0 && !isAdded ? { scale: 0.98 } : {}}
                className={`btn btn-accent btn-add-cart-modal ${totalItems === 0 ? "disabled" : ""} ${isAdded ? "success" : ""}`}
                disabled={totalItems === 0 || isAdded}
                onClick={handleAddClick}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> ¡Añadido con éxito!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Agregar al Carrito
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          
          .modal-content {
            background: var(--white);
            border-radius: 28px;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-lg);
            border: 1px solid rgba(255, 255, 255, 0.6);
          }
          
          .modal-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            transition: all var(--transition-fast);
            z-index: 10;
          }
          
          .modal-close:hover {
            background: var(--text-primary);
            color: var(--white);
          }
          
          .modal-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            min-height: 500px;
          }
          
          /* Visual Column */
          .modal-visual-column {
            padding: 2.5rem;
            border-right: 1px solid var(--border-color);
          }
          
          .modal-image-wrapper {
            width: 100%;
            height: 240px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          
          .modal-prod-img {
            max-width: 80%;
            max-height: 85%;
            object-fit: contain;
            filter: drop-shadow(0 15px 25px rgba(15, 23, 42, 0.15));
          }

          .modal-svg-container {
            width: 60%;
            height: 100%;
            filter: drop-shadow(0 15px 25px rgba(15, 23, 42, 0.15));
          }
          
          .modal-svg-container svg {
            width: 100%;
            height: 100%;
          }
          
          .modal-info-meta {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .modal-brand {
            font-family: var(--font-heading);
            color: var(--accent-color);
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          
          .modal-title {
            font-size: 1.75rem;
            font-weight: 700;
          }
          
          .modal-category {
            font-size: 0.85rem;
            background: var(--bg-secondary);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            width: fit-content;
            color: var(--text-secondary);
            font-weight: 500;
          }
          
          .modal-description {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin: 1rem 0;
          }
          
          .modal-base-price {
            font-family: var(--font-heading);
            font-size: 0.95rem;
            color: var(--text-secondary);
          }
          
          .modal-base-price span {
            font-weight: 700;
            font-size: 1.15rem;
            color: var(--text-primary);
          }
          
          /* Config Column */
          .modal-config-column {
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: rgba(248, 250, 252, 0.5);
          }
          
          .config-header {
            margin-bottom: 2rem;
          }
          
          .config-header h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }
          
          .config-header p {
            font-size: 0.85rem;
            color: var(--text-secondary);
          }
          
          .variants-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-grow: 1;
            overflow-y: auto;
            max-height: 220px;
            padding-right: 0.5rem;
          }
          
          .variant-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.85rem 1rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            background: var(--white);
            transition: all var(--transition-fast);
          }
          
          .variant-row.active-row {
            border-color: var(--accent-color);
            box-shadow: 0 4px 12px rgba(0, 126, 229, 0.05);
            background: var(--accent-light);
          }
          
          .variant-label {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--text-primary);
          }
          
          .stepper {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--bg-secondary);
            border-radius: 9999px;
            padding: 0.25rem 0.5rem;
          }
          
          .stepper-btn {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-primary);
            box-shadow: var(--shadow-sm);
            transition: all var(--transition-fast);
          }
          
          .stepper-btn:hover:not(:disabled) {
            background: var(--text-primary);
            color: var(--white);
          }
          
          .stepper-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .stepper-value {
            font-family: var(--font-heading);
            font-weight: 600;
            font-size: 0.95rem;
            min-width: 20px;
            text-align: center;
          }
          
          .config-summary {
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: var(--text-secondary);
          }
          
          .summary-row .bold {
            font-weight: 700;
            color: var(--text-primary);
            font-size: 1.05rem;
          }
          
          .summary-row .text-accent {
            color: var(--accent-color);
            font-size: 1.25rem;
          }
          
          .btn-add-cart-modal {
            width: 100%;
            padding: 1rem;
            font-size: 1rem;
            border-radius: 14px;
          }
          
          .btn-add-cart-modal.disabled {
            opacity: 0.5;
            background: var(--text-tertiary);
            cursor: not-allowed;
            pointer-events: none;
          }
          
          .btn-add-cart-modal.success {
            background: #25d366;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.2);
          }

          @media (max-width: 768px) {
            .modal-overlay {
              padding: 0;
            }
            .modal-content {
              border-radius: 0;
              max-height: 100vh;
              height: 100%;
            }
            .modal-grid {
              grid-template-columns: 1fr;
            }
            .modal-visual-column {
              border-right: none;
              border-bottom: 1px solid var(--border-color);
              padding: 1.5rem;
            }
            .modal-config-column {
              padding: 1.5rem;
            }
            .modal-image-wrapper {
              height: 180px;
            }
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
}
