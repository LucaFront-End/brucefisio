import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Check, Activity, Battery, Award, Star, Settings, ShieldCheck, Zap, Cpu } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function HomeCompare({ onQuickAdd, products = PRODUCTS }) {
  const [addedItem, setAddedItem] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const sectionRef = useRef(null);

  // Scroll Progress binding for the Laser Scan Matrix Sweep
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 80%"]
  });

  const laserTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const laserOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  // Dynamic products list for the comparison table
  const COMPARE_PRODUCTS = products.slice(0, 3);
  
  const COMPARE_ROWS = [
    {
      key: "therapy",
      label: "Categoría Clínica",
      icon: <Activity size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, p.category || "Alta Especialidad"]))
    },
    {
      key: "dose",
      label: "Tecnología Principal",
      icon: <Settings size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, p.specs?.power || "4.4 MHz / Laser 92W"]))
    },
    {
      key: "freq",
      label: "Potencia / Frecuencia",
      icon: <Zap size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, p.specs?.frequency || "Ajuste Digital Pro"]))
    },
    {
      key: "app",
      label: "Aplicación Terapéutica",
      icon: <Cpu size={14} />,
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
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, "FDA / CE Médica"]))
    },
    {
      key: "guarantee",
      label: "Garantía Oficial",
      icon: <ShieldCheck size={14} />,
      values: Object.fromEntries(COMPARE_PRODUCTS.map(p => [p.id, "2 Años Oficial Bruce"]))
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
      {/* Section Editorial Header */}
      <div className="text-center compare-header">
        <span className="section-label">Matriz Comparativa de Gama</span>
        <h2>Encuentra la Tecnología Adecuada</h2>
        <p className="compare-subtitle">
          Compara las especificaciones técnicas y alcances clínicos de nuestros equipos insignia.
        </p>
      </div>

      {/* Comparative Table Wrapper with Laser Matrix */}
      <div className="compare-table-wrapper glass">
        
        {/* Laser Scan Sweep Bar (Synced with Scroll) */}
        <motion.div 
          style={{ top: laserTop, opacity: laserOpacity }} 
          className="laser-scan-matrix-bar"
        />

        <div className="compare-grid-layout">
          
          {/* Sticky Product Header Row */}
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
                  <div className="table-product-image-box" style={{ background: prod.imageBg || "var(--bg-secondary)" }}>
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
                    <span className="table-brand">{prod.brand || "Bruce Médica"}</span>
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
                      {row.key === "cert" || row.key === "guarantee" ? (
                        <span className="table-cert-badge">
                          <Check size={12} className="text-teal" />
                          {val}
                        </span>
                      ) : row.key === "app" ? (
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
                  <div className="table-price">${prod.price?.toLocaleString()} MXN</div>
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
          padding: 5rem 2rem 6rem 2rem;
          background: var(--bg-primary);
          position: relative;
        }

        .compare-header {
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.85rem;
        }

        .compare-subtitle {
          color: var(--text-secondary);
          max-width: 620px;
          line-height: 1.6;
        }

        /* Glassmorphic Table panel */
        .compare-table-wrapper {
          position: relative;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 0;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
          overflow: hidden;
        }

        /* Laser Scan Bar Sweeping Effect */
        .laser-scan-matrix-bar {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--accent-color) 30%, #06b6d4 70%, transparent 100%);
          box-shadow: 0 0 12px var(--accent-color), 0 0 24px #06b6d4;
          z-index: 25;
          pointer-events: none;
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
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          transition: background var(--transition-fast);
          position: relative;
        }

        .compare-row:last-child {
          border-bottom: none;
        }

        .compare-row.row-hovered {
          background: rgba(13, 148, 136, 0.025);
        }

        /* Sticky Header Row */
        .compare-row.row-header {
          position: sticky;
          top: var(--navbar-height);
          z-index: 20;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          border-bottom: 2px solid var(--border-color);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
        }

        /* Cell Framework */
        .cell {
          padding: 1.25rem 1.25rem;
          display: flex;
          align-items: center;
          transition: all var(--transition-fast);
        }

        .cell-label {
          font-family: var(--font-heading);
          font-size: 0.88rem;
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
          gap: 0.75rem;
          padding: 1.5rem 1rem;
        }

        .cell-value {
          font-size: 0.84rem;
          color: var(--text-secondary);
          justify-content: center;
          text-align: center;
        }

        /* Column hover highlights */
        .cell.col-hovered {
          background: rgba(13, 148, 136, 0.04);
          box-shadow: inset 1px 0 0 rgba(13, 148, 136, 0.12), inset -1px 0 0 rgba(13, 148, 136, 0.12);
        }

        /* Header elements */
        .table-product-image-box {
          width: 70px;
          height: 70px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(0, 0, 0, 0.06);
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
          color: var(--accent-color);
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
          background: rgba(13, 148, 136, 0.1);
          color: var(--accent-dark);
          font-weight: 700;
          font-family: var(--font-heading);
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.76rem;
          border: 1px solid rgba(13, 148, 136, 0.2);
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
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          background: rgba(248, 250, 252, 0.6);
        }

        .cell-product-footer.col-hovered {
          background: rgba(13, 148, 136, 0.04);
          box-shadow: inset 1px 0 0 rgba(13, 148, 136, 0.12), inset -1px 0 0 rgba(13, 148, 136, 0.12);
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
          transition: all 0.2s ease;
        }

        .btn-table-buy.success {
          background: #25d366;
          border-color: #22c55e;
        }
      `}</style>
    </section>
  );
}
