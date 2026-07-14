import React from "react";
import { motion as motionFramer } from "framer-motion";
import { SlidersHorizontal, ShoppingCart, Eye, AlertCircle, RotateCcw } from "lucide-react";
import { PRODUCTS } from "../data/products";

export default function Shop({ 
  categoryFilter, 
  setCategoryFilter, 
  brandFilter, 
  setBrandFilter, 
  searchQuery, 
  setSearchQuery,
  onOpenProductModal, 
  onQuickAdd,
  products = PRODUCTS
}) {
  const categoriesList = Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();
  const brandsList = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();

  // Helper to normalize text (accents, casing)
  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filter products based on active filters
  const filteredProducts = products.filter(prod => {
    const matchesCategory = categoryFilter ? prod.category === categoryFilter : true;
    const matchesBrand = brandFilter ? prod.brand === brandFilter : true;

    let matchesSearch = true;
    if (searchQuery) {
      const searchTokens = normalizeText(searchQuery).split(/\s+/).filter(Boolean);
      
      const nameNorm = normalizeText(prod.name);
      const descNorm = normalizeText(prod.description || prod.rawDescription);
      const brandNorm = normalizeText(prod.brand);
      const catNorm = normalizeText(prod.category);
      const skuNorm = normalizeText(prod.sku);

      // Collect variant details (choices, SKUs)
      const variantSearchTerms = [];
      if (prod.variants && Array.isArray(prod.variants)) {
        prod.variants.forEach(v => {
          if (v.sku) variantSearchTerms.push(normalizeText(v.sku));
          if (v.choices) {
            Object.values(v.choices).forEach(val => {
              variantSearchTerms.push(normalizeText(val));
            });
          }
        });
      }

      // Collect variable option values
      if (prod.variables && Array.isArray(prod.variables.options)) {
        prod.variables.options.forEach(o => {
          const val = typeof o === "object" ? o.value : o;
          if (val) variantSearchTerms.push(normalizeText(val));
        });
      }

      const combinedText = [
        nameNorm,
        descNorm,
        brandNorm,
        catNorm,
        skuNorm,
        ...variantSearchTerms
      ].join(" ");

      matchesSearch = searchTokens.every(token => combinedText.includes(token));
    }

    return matchesCategory && matchesBrand && matchesSearch;
  });

  const clearFilters = () => {
    setCategoryFilter(null);
    setBrandFilter(null);
    setSearchQuery("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="shop-page container">
      {/* Search & Active Info Header */}
      <div className="shop-header">
        <div>
          <h2 className="heading-section">Tienda de Fisioterapia</h2>
          <p className="shop-subtitle">Explora productos clínicos de alta gama y rehabilitación avanzada.</p>
        </div>
        
        {(categoryFilter || brandFilter || searchQuery) && (
          <motionFramer.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="btn btn-secondary btn-clear-filters"
          >
            <RotateCcw size={16} /> Limpiar Filtros
          </motionFramer.button>
        )}
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar glass">
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <SlidersHorizontal size={16} className="text-accent" />
              Categorías
            </h3>
            <ul className="filter-list">
              <li>
                <button 
                  className={`filter-btn ${!categoryFilter ? "active" : ""}`}
                  onClick={() => setCategoryFilter(null)}
                >
                  Todas las categorías
                </button>
              </li>
              {categoriesList.map(cat => (
                <li key={cat}>
                  <button 
                    className={`filter-btn ${categoryFilter === cat ? "active" : ""}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section border-top">
            <h3 className="sidebar-title">Marcas</h3>
            <ul className="filter-list">
              <li>
                <button 
                  className={`filter-btn ${!brandFilter ? "active" : ""}`}
                  onClick={() => setBrandFilter(null)}
                >
                  Todas las marcas
                </button>
              </li>
              {brandsList.map(brand => (
                <li key={brand}>
                  <button 
                    className={`filter-btn ${brandFilter === brand ? "active" : ""}`}
                    onClick={() => setBrandFilter(brand)}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="shop-main-content">
          {searchQuery && (
            <div className="search-result-tag">
              Resultados para: <strong>"{searchQuery}"</strong> ({filteredProducts.length} productos)
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <motionFramer.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="no-results-state glass"
            >
              <AlertCircle size={40} className="text-accent" />
              <h3>No se encontraron productos</h3>
              <p>Prueba ajustando tus filtros de marca, categoría o limpia la barra de búsqueda.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Limpiar Filtros</button>
            </motionFramer.div>
          ) : (
            <motionFramer.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid-3 product-grid"
            >
              {filteredProducts.map(prod => (
                <motionFramer.div 
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  key={prod.id} 
                  className="product-card glass"
                >
                  {/* Image container with hover overlays */}
                  <div className="prod-img-container" style={{ background: prod.imageBg }}>
                    {prod.imageSvg ? (
                      <div 
                        className="prod-card-svg"
                        dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                      />
                    ) : (
                      <img src={prod.image} alt={prod.name} className="prod-card-img" />
                    )}
                    
                    {/* Hover actions panel */}
                    <div className="prod-hover-overlay">
                      <motionFramer.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onOpenProductModal(prod)}
                        className="overlay-action-btn view-more-overlay"
                      >
                        <Eye size={18} /> Ver Detalles
                      </motionFramer.button>
                      <motionFramer.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onQuickAdd(prod)}
                        className="overlay-action-btn add-cart-overlay"
                      >
                        <ShoppingCart size={18} /> Compra Rápida
                      </motionFramer.button>
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="prod-details">
                    <div className="prod-brand-row">
                      <span className="prod-brand">{prod.brand}</span>
                      <span className="prod-category-tag">{prod.category}</span>
                    </div>
                    
                    <h3 className="prod-title" onClick={() => onOpenProductModal(prod)}>
                      {prod.name}
                    </h3>
                    
                    <p className="prod-desc-truncated">{prod.description}</p>
                    
                    <div className="prod-price-row">
                      <div className="price-label">
                        <span>Desde</span>
                        <h4>${prod.price.toLocaleString()} MXN</h4>
                      </div>
                      
                      <button 
                        className="prod-add-btn" 
                        onClick={() => onOpenProductModal(prod)}
                        title="Configurar y Agregar al Carrito"
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </motionFramer.div>
              ))}
            </motionFramer.div>
          )}
        </main>
      </div>

      <style>{`
        .shop-page {
          padding: 4rem 2rem;
          min-height: 80vh;
        }
        
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
        }
        
        .shop-subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        
        .btn-clear-filters {
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          border-radius: 9999px;
        }
        
        .shop-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        
        /* Sidebar Filters */
        .shop-sidebar {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          position: sticky;
          top: calc(var(--navbar-height) + 20px);
          max-height: calc(100vh - var(--navbar-height) - 40px);
          overflow-y: auto;
        }
        
        .sidebar-section {
          padding-bottom: 1.5rem;
        }
        
        .sidebar-section.border-top {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }
        
        .sidebar-title {
          font-size: 1.05rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .filter-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .filter-btn {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          width: 100%;
          text-align: left;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          transition: all var(--transition-fast);
        }
        
        .filter-btn:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding-left: 1rem;
        }
        
        .filter-btn.active {
          background: var(--accent-light);
          color: var(--accent-dark);
          font-weight: 600;
          padding-left: 1rem;
        }
        
        /* Main catalog */
        .shop-main-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .search-result-tag {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        
        .no-results-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          border-radius: 24px;
          border: 1px solid var(--border-color);
          gap: 1.25rem;
        }
        
        .no-results-state h3 {
          font-size: 1.3rem;
          font-weight: 700;
        }
        
        .no-results-state p {
          max-width: 400px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        
        /* Cards */
        .product-card {
          background: var(--white);
          border-radius: 20px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: border-color var(--transition-medium), box-shadow var(--transition-medium);
        }
        
        .product-card:hover {
          border-color: var(--accent-light);
          box-shadow: var(--shadow-md);
        }
        
        .prod-img-container {
          height: 200px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .prod-card-img {
          width: 75%;
          height: 75%;
          object-fit: contain;
          transition: transform var(--transition-medium);
        }
        
        .product-card:hover .prod-card-img {
          transform: scale(1.08) translateY(-5px);
        }

        .prod-card-svg {
          width: 70%;
          height: 70%;
          transition: transform var(--transition-medium);
        }
        
        .prod-card-svg svg {
          width: 100%;
          height: 100%;
        }
        
        .product-card:hover .prod-card-svg {
          transform: scale(1.08) translateY(-5px);
        }
        
        /* Hover overlay */
        .prod-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.25);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          opacity: 0;
          transition: opacity var(--transition-medium);
          padding: 1.5rem;
        }
        
        .prod-img-container:hover .prod-hover-overlay {
          opacity: 1;
        }
        
        .overlay-action-btn {
          width: 100%;
          max-width: 180px;
          padding: 0.65rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: var(--shadow-sm);
        }
        
        .view-more-overlay {
          background: var(--white);
          color: var(--text-primary);
        }
        
        .view-more-overlay:hover {
          background: var(--text-primary);
          color: var(--white);
        }
        
        .add-cart-overlay {
          background: var(--accent-color);
          color: var(--white);
        }
        
        .add-cart-overlay:hover {
          background: var(--accent-dark);
        }
        
        /* Info Details */
        .prod-details {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.75rem;
        }
        
        .prod-brand-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .prod-brand {
          font-size: 0.75rem;
          color: var(--accent-color);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-heading);
        }
        
        .prod-category-tag {
          font-size: 0.7rem;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-weight: 500;
        }
        
        .prod-title {
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: color var(--transition-fast);
          line-height: 1.3;
        }
        
        .prod-title:hover {
          color: var(--accent-color);
        }
        
        .prod-desc-truncated {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }
        
        .prod-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }
        
        .price-label span {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          display: block;
        }
        
        .price-label h4 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .prod-add-btn {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-color);
          background: var(--accent-light);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all var(--transition-fast);
        }
        
        .prod-add-btn:hover {
          background: var(--accent-color);
          color: var(--white);
        }

        @media (max-width: 1024px) {
          .shop-layout {
            grid-template-columns: 1fr;
          }
          .shop-sidebar {
            position: relative;
            top: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .sidebar-section.border-top {
            border-top: none;
            padding-top: 0;
          }
        }

        @media (max-width: 580px) {
          .shop-sidebar {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .shop-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .btn-clear-filters {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
