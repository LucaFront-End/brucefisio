import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check, HelpCircle, Activity, Battery, Award, Star, Settings } from "lucide-react";
import { PRODUCTS } from "../data/products";

// We will define COMPARE_ROWS dynamically inside the component

export default function HomeCompare({ onQuickAdd, products = PRODUCTS }) {
  const [addedItem, setAddedItem] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Dynamic products list for the comparison table
  const COMPARE_PRODUCTS = products.slice(0, 3);
  
  const COMPARE_ROWS = [
    {
      key: "therapy",
      label: "Categoría",
      icon: <Activity size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, p.category || "Alta Especialidad"]))
    },
    {
      key: "dose",
      label: "Tecnología Principal",
      icon: <Settings size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, "Alta Eficiencia Clínica"]))
    },
    {
      key: "battery",
      label: "Aplicación",
      icon: <Battery size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, "Profesional / Clínico"]))
    },
    {
      key: "focus",
      label: "Foco de Tratamiento",
      icon: <Star size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, (p.description || "Rehabilitación").substring(0, 38) + "..."]))
    },
    {
      key: "cert",
      label: "Certificación Médica",
      icon: <Award size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, "FDA / CE Profesional"]))
    }
  ];

  const handleBuyClick = (product) => {
    if (!onQuickAdd) return;
    onQuickAdd(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section className="compare-section container">
      <div className="text-center compare-header">
        <span className="section-label">Comparativa de Gama</span>
        <h2>Encuentra la Tecnología Adecuada</h2>
        <p className="compare-subtitle">Compara las especificaciones técnicas y alcances de nuestros equipos insignia.</p>
      </div>

      <div className="compare-table-wrapper glass">
        <div className="compare-grid-layout">
          
          {/* Header Row */}
          <div className="compare-row row-header">
            <div className="cell cell-label font-bold">Especificaciones</div>
            {COMPARE_PRODUCTS.map((prod) => {
              const isColHovered = hoveredCol === prod.id;
              return (
                <div 
                  key={prod.id} 
                  className={`cell cell-product text-center ${isColHovered ? "col-hovered" : ""}`}
                  onMouseEnter={() => setHoveredCol(prod.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="table-product-image-box" style={{ background: prod.imageBg }}>
                    {prod.imageSvg ? (
                      <div 
                        className="table-product-svg"
                        dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                      />
                    ) : (
                      <img src={prod.image} alt={prod.name} className="table-product-svg" style={{ objectFit: "contain" }} />
                    )}
                  </div>
                  <div className="table-product-meta">
                    <span className="table-brand">{prod.brand}</span>
                    <span className="table-name">{prod.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Specifications Rows */}
          {COMPARE_ROWS.map((row, rowIndex) => {
            const isRowHovered = hoveredRow === rowIndex;
            return (
              <div 
                key={row.key} 
                className={`compare-row ${isRowHovered ? "row-hovered" : ""}`}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="cell cell-label">
                  <span className="row-spec-icon">{row.icon}</span>
                  <span className="row-spec-text">{row.label}</span>
                </div>

                {COMPARE_PRODUCTS.map((prod) => {
                  const isColHovered = hoveredCol === prod.id;
                  const val = row.values[prod.id] || Object.values(row.values)[COMPARE_PRODUCTS.indexOf(prod)] || "";
                  
                  return (
                    <div 
                      key={prod.id} 
                      className={`cell cell-value ${isColHovered ? "col-hovered" : ""}`}
                      onMouseEnter={() => setHoveredCol(prod.id)}
                      onMouseLeave={() => setHoveredCol(null)}
                    >
                      {row.key === "cert" ? (
                        <span className="table-cert-badge">
                          <Check size={12} className="text-teal" />
                          {val}
                        </span>
                      ) : row.key === "battery" ? (
                        <span className="table-battery-value">
                          <Battery size={14} className="text-teal" />
                          {val}
                        </span>
                      ) : (
                        <span className="table-cell-text">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Footer Action Row */}
          <div className="compare-row row-footer">
            <div className="cell cell-label font-bold">Inversión</div>
            {COMPARE_PRODUCTS.map((prod) => {
              const isColHovered = hoveredCol === prod.id;
              return (
                <div 
                  key={prod.id} 
                  className={`cell cell-product-footer text-center ${isColHovered ? "col-hovered" : ""}`}
                  onMouseEnter={() => setHoveredCol(prod.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="table-price">${prod.price.toLocaleString()} MXN</div>
                  <button 
                    onClick={() => handleBuyClick(prod)}
                    className={`btn btn-accent btn-table-buy ${addedItem === prod.id ? "success" : ""}`}
                    disabled={addedItem === prod.id}
                  >
                    {addedItem === prod.id ? <Check size={14} /> : <ShoppingCart size={14} />}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        .compare-section {
          padding: 6rem 2rem;
          background: var(--bg-primary);
        }

        .compare-header {
          margin-bottom: 4rem;
        }

        .compare-subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        /* Glassmorphic Table panel */
        .compare-table-wrapper {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          overflow-x: auto;
        }

        .compare-grid-layout {
          min-width: 800px;
          display: flex;
          flex-direction: column;
        }

        /* Row framework */
        .compare-row {
          display: grid;
          grid-template-columns: 1fr repeat(3, 1.1fr);
          border-bottom: 1px solid var(--border-color);
          transition: background var(--transition-fast);
        }

        .compare-row:last-child {
          border-bottom: none;
        }

        .compare-row.row-hovered {
          background: var(--bg-secondary);
        }

        /* Cell Framework */
        .cell {
          padding: 1.5rem 1.25rem;
          display: flex;
          align-items: center;
          transition: all var(--transition-fast);
        }

        .cell-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          gap: 0.65rem;
        }

        .row-spec-icon {
          color: var(--accent-color);
          display: flex;
          align-items: center;
        }

        .cell-product {
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
          padding: 2rem 1rem;
        }

        .cell-value {
          font-size: 0.82rem;
          color: var(--text-secondary);
          justify-content: center;
          text-align: center;
        }

        /* Column hover highlights */
        .cell.col-hovered {
          background: rgba(13, 148, 136, 0.03);
          box-shadow: inset 1px 0 0 rgba(13, 148, 136, 0.1), inset -1px 0 0 rgba(13, 148, 136, 0.1);
        }

        /* Header elements */
        .table-product-image-box {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          box-shadow: var(--shadow-sm);
        }

        .table-product-svg {
          width: 100%;
          height: 100%;
        }

        .table-product-svg svg {
          width: 100%;
          height: 100%;
        }

        .table-product-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .table-brand {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .table-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        /* Dynamic cell elements */
        .table-cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #ccfbf1;
          color: #0f766e;
          font-weight: 700;
          font-family: var(--font-heading);
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
        }

        .table-battery-value {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Footer purchase cell */
        .cell-product-footer {
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .cell-product-footer.col-hovered {
          background: rgba(13, 148, 136, 0.03);
          box-shadow: inset 1px 0 0 rgba(13, 148, 136, 0.1), inset -1px 0 0 rgba(13, 148, 136, 0.1);
        }

        .table-price {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .btn-table-buy {
          padding: 0.5rem 1.25rem;
          border-radius: 8px;
          font-size: 0.8rem;
        }

        .btn-table-buy.success {
          background: #25d366;
          border-color: #22c55e;
        }
      `}</style>
    </section>
  );
}
