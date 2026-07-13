import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, CreditCard } from "lucide-react";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Generate WhatsApp Message Link
  const handleWhatsAppQuote = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "5215512345678"; // Placeholder, can be updated easily.
    
    let message = "¡Hola Bruce Médica! 👋\n\nMe gustaría solicitar una cotización para los siguientes productos de fisioterapia:\n\n";
    
    cartItems.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Variación: ${item.variantName}: _${item.variantValue}_\n`;
      message += `   - Cantidad: ${item.quantity} pza(s) × $${item.product.price.toLocaleString()} MXN\n`;
      message += `   - Subtotal: *$${itemSubtotal.toLocaleString()} MXN*\n\n`;
    });

    message += `*Total Estimado:* *$${subtotal.toLocaleString()} MXN*\n\n`;
    message += "Quedo atento a la disponibilidad, formas de pago y costos de envío. ¡Muchas gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="cart-backdrop"
          />

          {/* Slide-out drawer panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="cart-panel glass"
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-title">
                <ShoppingBag size={20} className="text-accent" />
                <h3>Tu Carrito</h3>
                <span className="cart-count-bubble">{totalItems}</span>
              </div>
              <button className="cart-close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Cart list container */}
            <div className="cart-body">
              {cartItems.length === 0 ? (
                <div className="empty-cart-state">
                  <div className="empty-cart-icon">🛒</div>
                  <h4>El carrito está vacío</h4>
                  <p>Agrega productos de nuestro catálogo para comenzar a planificar tu rehabilitación.</p>
                  <button className="btn btn-primary" onClick={onClose}>Explorar Catálogo</button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item, index) => {
                    const uniqueKey = `${item.product.id}-${item.variantValue}`;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={uniqueKey} 
                        className="cart-item"
                      >
                        {/* Mini Image */}
                        <div className="cart-item-img-wrapper" style={{ background: item.product.imageBg }}>
                          <div 
                            className="cart-item-svg"
                            dangerouslySetInnerHTML={{ __html: item.product.imageSvg }}
                          />
                        </div>

                        {/* Product details */}
                        <div className="cart-item-details">
                          <span className="cart-item-brand">{item.product.brand}</span>
                          <h4>{item.product.name}</h4>
                          <span className="cart-item-variant">
                            {item.variantName}: <strong>{item.variantValue}</strong>
                          </span>
                          
                          <div className="cart-item-actions">
                            {/* Stepper */}
                            <div className="cart-stepper">
                              <button 
                                className="cart-stepper-btn"
                                onClick={() => onUpdateQuantity(item.product.id, item.variantValue, item.quantity - 1)}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="cart-stepper-val">{item.quantity}</span>
                              <button 
                                className="cart-stepper-btn"
                                onClick={() => onUpdateQuantity(item.product.id, item.variantValue, item.quantity + 1)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            
                            {/* Remove button */}
                            <button 
                              className="cart-remove-btn"
                              onClick={() => onRemoveItem(item.product.id, item.variantValue)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Item total price */}
                        <div className="cart-item-price-col">
                          <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                          <span className="unit-label">${item.product.price.toLocaleString()} c/u</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Actions */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-totals">
                  <div className="totals-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()} MXN</span>
                  </div>
                  <div className="totals-row total-highlight">
                    <span>Total Estimado</span>
                    <span className="text-accent">${subtotal.toLocaleString()} MXN</span>
                  </div>
                </div>

                <div className="cart-actions-group">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCheckout}
                    className="btn btn-primary btn-cart-action"
                  >
                    <CreditCard size={18} /> Comprar Ahora
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppQuote}
                    className="btn btn-whatsapp btn-cart-action"
                  >
                    <MessageSquare size={18} /> Cotizar por WhatsApp
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
      
      <style>{`
        .cart-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0f172a;
          z-index: 1100;
        }
        
        .cart-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 460px;
          background: var(--white);
          z-index: 1200;
          box-shadow: var(--shadow-lg);
          border-left: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }
        
        .cart-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .cart-header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .cart-header-title h3 {
          font-size: 1.15rem;
          font-weight: 700;
        }
        
        .cart-count-bubble {
          background: var(--accent-light);
          color: var(--accent-dark);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }
        
        .cart-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        
        .cart-close-btn:hover {
          background: var(--text-primary);
          color: var(--white);
        }
        
        .cart-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }
        
        .empty-cart-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding: 2rem;
        }
        
        .empty-cart-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .empty-cart-state h4 {
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .empty-cart-state p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .cart-item-img-wrapper {
          width: 65px;
          height: 65px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          flex-shrink: 0;
        }
        
        .cart-item-svg {
          width: 90%;
          height: 90%;
        }
        
        .cart-item-svg svg {
          width: 100%;
          height: 100%;
        }
        
        .cart-item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        
        .cart-item-brand {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--accent-color);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        
        .cart-item-details h4 {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.3;
        }
        
        .cart-item-variant {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        
        .cart-stepper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-secondary);
          border-radius: 9999px;
          padding: 0.15rem 0.35rem;
        }
        
        .cart-stepper-btn {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }
        
        .cart-stepper-val {
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 15px;
          text-align: center;
        }
        
        .cart-remove-btn {
          color: var(--text-tertiary);
          transition: color var(--transition-fast);
        }
        
        .cart-remove-btn:hover {
          color: #ef4444;
        }
        
        .cart-item-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.15rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
        }
        
        .unit-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }
        
        .cart-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border-color);
          background: rgba(248, 250, 252, 0.5);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .cart-summary-totals {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .totals-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .totals-row.total-highlight {
          border-top: 1px solid var(--border-color);
          padding-top: 0.75rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .cart-actions-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .btn-cart-action {
          width: 100%;
          padding: 0.95rem;
          font-size: 0.95rem;
          border-radius: 12px;
        }

        @media (max-width: 480px) {
          .cart-panel {
            max-width: 100%;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
