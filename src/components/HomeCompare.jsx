import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Check, Activity, Battery, Award, Star, Settings, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function HomeCompare({ onQuickAdd, products = PRODUCTS }) {
  const [addedItem, setAddedItem] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const sectionRef = useRef(null);

  // Track scroll progress of the compare section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3D Spotlight Animations for Featured Column (Middle product)
  const featuredScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.98, 1.05, 0.98]);
  const featuredY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -18, 0]);
  const featuredShadow = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    [
      "0px 4px 14px rgba(15, 23, 42, 0.05)",
      "0px 24px 60px rgba(13, 148, 136, 0.22)",
      "0px 4px 14px rgba(15, 23, 42, 0.05)"
    ]
  );
  const featuredBorder = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    [
      "rgba(226, 232, 240, 1)",
      "rgba(13, 148, 136, 0.85)",
      "rgba(226, 232, 240, 1)"
    ]
  );

  // Side Columns Animations (dim and scale down subtly when featured column peaks)
  const sideOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.75, 1]);
  const sideScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.97, 1]);

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
    <section ref={sectionRef} className="compare-section container">
      <div className="text-center compare-header">
        <span className="section-label">Comparativa de Gama</span>
        <h2 className="display-large" style={{ fontSize: "2.5rem" }}>Encuentra la Tecnología Adecuada</h2>
        <p className="compare-subtitle">Compara las especificaciones técnicas y alcances de nuestros equipos insignia.</p>
      </div>

      <div className="compare-table-wrapper">
        <div className="compare-grid-layout">
          
          {/* Header Row */}
          <div className="compare-row row-header">
            <div className="cell cell-label font-bold">Especificaciones</div>
            {COMPARE_PRODUCTS.map((prod, colIdx) => {
              const isFeatured = colIdx === 1; // Middle product is featured
              const isColHovered = hoveredCol === prod.id;
              const ColumnWrapper = motion.div;

              return (
                <ColumnWrapper
                  key={prod.id} 
                  style={
                    isFeatured 
                      ? { scale: featuredScale, y: featuredY, boxShadow: featuredShadow, borderColor: featuredBorder, zIndex: 10 }
                      : { opacity: sideOpacity, scale: sideScale }
                  }
                  className={`cell cell-product text-center ${isFeatured ? "featured-column-head" : ""} ${isColHovered ? "col-hovered" : ""}`}
                  onMouseEnter={() => setHoveredCol(prod.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  {isFeatured && (
                    <div className="featured-spotlight-badge">
                      <Sparkles size={12} /> RECOMENDADO CLÍNICO
                    </div>
                  )}

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
                </ColumnWrapper>
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

                {COMPARE_PRODUCTS.map((prod, colIdx) => {
                  const isFeatured = colIdx === 1;
                  const isColHovered = hoveredCol === prod.id;
                  const val = row.values[prod.id] || Object.values(row.values)[COMPARE_PRODUCTS.indexOf(prod)] || "";
                  const ColumnCell = motion.div;

                  return (
                    <ColumnCell 
                      key={prod.id} 
                      style={
                        isFeatured 
                          ? { scale: featuredScale, y: featuredY, zIndex: 10 }
                          : { opacity: sideOpacity, scale: sideScale }
                      }
                      className={`cell cell-value ${isFeatured ? "featured-column-body" : ""} ${isColHovered ? "col-hovered" : ""}`}
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
                    </ColumnCell>
                  );
                })}
              </div>
            );
          })}

          {/* Footer Action Row */}
          <div className="compare-row row-footer">
            <div className="cell cell-label font-bold">Inversión</div>
            {COMPARE_PRODUCTS.map((prod, colIdx) => {
              const isFeatured = colIdx === 1;
              const isColHovered = hoveredCol === prod.id;
              const ColumnFooter = motion.div;

              return (
                <ColumnFooter 
                  key={prod.id} 
                  style={
                    isFeatured 
                      ? { scale: featuredScale, y: featuredY, boxShadow: featuredShadow, borderColor: featuredBorder, zIndex: 10 }
                      : { opacity: sideOpacity, scale: sideScale }
                  }
                  className={`cell cell-product-footer text-center ${isFeatured ? "featured-column-foot" : ""} ${isColHovered ? "col-hovered" : ""}`}
                  onMouseEnter={() => setHoveredCol(prod.id)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="table-price">${prod.price?.toLocaleString()} MXN</div>
                  <button 
                    onClick={() => handleBuyClick(prod)}
                    className={`btn ${isFeatured ? "btn-primary" : "btn-accent"} btn-table-buy ${addedItem === prod.id ? "success" : ""}`}
                    disabled={addedItem === prod.id}
                  >
                    {addedItem === prod.id ? <Check size={14} /> : <ShoppingCart size={14} />}
                  </button>
                </ColumnFooter>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        .compare-section {
          padding: 5.5rem 2rem;
          background: var(--bg-primary);
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
          max-width: 600px;
        }

        /* Glassmorphic Table panel */
        .compare-table-wrapper {
          padding: 1rem 0;
          overflow-x: auto;
        }

        .compare-grid-layout {
          min-width: 820px;
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
          background: rgba(244, 245, 247, 0.5);
        }

        /* Cell Framework */
        .cell {
          padding: 1.35rem 1.25rem;
          display: flex;
          align-items: center;
          transition: background var(--transition-fast);
          background: var(--white);
        }

        .cell-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          gap: 0.65rem;
          background: transparent;
        }

        .row-spec-icon {
          color: var(--accent-color);
          display: flex;
          align-items: center;
        }

        .cell-product {
          position: relative;
          flex-direction: column;
          justify-content: center;
          gap: 0.85rem;
          padding: 2.2rem 1rem 1.5rem 1rem;
          border-top: 1px solid var(--border-color);
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        .featured-column-head {
          background: #ffffff !important;
          border-color: rgba(13, 148, 136, 0.4) !important;
        }

        .featured-spotlight-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-color);
          color: var(--white);
          font-size: 0.68rem;
          font-weight: 800;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.35);
        }

        .featured-column-body {
          background: #ffffff !important;
          border-left: 1px solid rgba(13, 148, 136, 0.25) !important;
          border-right: 1px solid rgba(13, 148, 136, 0.25) !important;
        }

        .featured-column-foot {
          background: #ffffff !important;
          border-bottom: 1px solid rgba(13, 148, 136, 0.4) !important;
          border-left: 1px solid rgba(13, 148, 136, 0.25) !important;
          border-right: 1px solid rgba(13, 148, 136, 0.25) !important;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .cell-value {
          font-size: 0.82rem;
          color: var(--text-secondary);
          justify-content: center;
          text-align: center;
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
        }

        /* Column hover highlights */
        .cell.col-hovered {
          background: rgba(13, 148, 136, 0.03) !important;
        }

        /* Header elements */
        .table-product-image-box {
          width: 75px;
          height: 75px;
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
          border-bottom: 1px solid var(--border-color);
          border-left: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
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
