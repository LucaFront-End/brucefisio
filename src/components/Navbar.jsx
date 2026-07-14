import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ChevronDown, Activity, Users, Phone, Info, Award, HelpCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ 
  setCategoryFilter, 
  setBrandFilter, 
  cartItemsCount, 
  onCartClick,
  searchQuery,
  setSearchQuery,
  categories = [],
  brands = []
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'categories' | 'brands' | 'specialty' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path, catFilter = null, brandFilter = null) => {
    setCategoryFilter(catFilter);
    setBrandFilter(brandFilter);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <header className="glass sticky-nav">
      <div className="container nav-container">
        {/* Logo */}
        <div className="logo-container" onClick={() => handleNavClick("/")}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="logo-icon"
          >
            B
          </motion.div>
          <span className="logo-text">Bruce <span className="text-accent">Médica</span></span>
        </div>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-btn link-underline ${location.pathname === "/shop" && "active"}`}
                onClick={() => handleNavClick("/shop")}
              >
                Tienda
              </button>
            </li>

            {/* Categorías Dropdown */}
            <li className="dropdown-li" onMouseEnter={() => setActiveDropdown("categories")} onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="nav-btn dropdown-trigger link-underline"
                onClick={() => toggleDropdown("categories")}
              >
                Categorías <ChevronDown size={14} className={`chevron ${activeDropdown === "categories" ? "rotate" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === "categories" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-menu glass"
                  >
                    <div className="dropdown-grid">
                      {categories.map((cat) => (
                        <button 
                          key={cat} 
                          className="dropdown-item"
                          onClick={() => handleNavClick("/shop", cat, null)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Marcas Dropdown */}
            <li className="dropdown-li" onMouseEnter={() => setActiveDropdown("brands")} onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className="nav-btn dropdown-trigger link-underline"
                onClick={() => toggleDropdown("brands")}
              >
                Marcas <ChevronDown size={14} className={`chevron ${activeDropdown === "brands" ? "rotate" : ""}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === "brands" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-menu glass"
                  >
                    <div className="dropdown-grid">
                      {brands.map((brand) => (
                        <button 
                          key={brand} 
                          className="dropdown-item"
                          onClick={() => handleNavClick("/shop", null, brand)}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Alta Especialidad Dropdown */}
            <li className="dropdown-li" onMouseEnter={() => setActiveDropdown("specialty")} onMouseLeave={() => setActiveDropdown(null)}>
              <button 
                className={`nav-btn dropdown-trigger link-underline ${location.pathname === "/specialty" && "active"}`}
                onClick={() => handleNavClick("/specialty")}
              >
                Alta Especialidad <ChevronDown size={14} className={`chevron ${activeDropdown === "specialty" ? "rotate" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "specialty" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="dropdown-menu glass specialty-dropdown"
                  >
                    <div className="specialty-links">
                      <div className="specialty-card" onClick={() => handleNavClick("/specialty")}>
                        <div className="specialty-card-icon cureo">C</div>
                        <div>
                          <h4>Cureo</h4>
                          <p>Terapia avanzada de regeneración de tejidos</p>
                        </div>
                      </div>
                      <div className="specialty-card" onClick={() => handleNavClick("/specialty")}>
                        <div className="specialty-card-icon chelt">Ch</div>
                        <div>
                          <h4>Chelt</h4>
                          <p>Láser de alta intensidad de tres longitudes de onda</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <button 
                className={`nav-btn link-underline ${location.pathname === "/about" && "active"}`}
                onClick={() => handleNavClick("/about")}
              >
                Nosotros
              </button>
            </li>

            <li>
              <button 
                className={`nav-btn link-underline ${location.pathname === "/community" && "active"}`}
                onClick={() => handleNavClick("/community")}
              >
                Comunidad
              </button>
            </li>

            <li>
              <button 
                className={`nav-btn link-underline ${location.pathname === "/contact" && "active"}`}
                onClick={() => handleNavClick("/contact")}
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>

        {/* Actions Bar */}
        <div className="nav-actions">
          {/* Search bar */}
          <div className="search-wrapper">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  type="text"
                  placeholder="Buscar fisioterapia..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (location.pathname !== "/shop") {
                      navigate("/shop");
                    }
                  }}
                  autoFocus
                />
              )}
            </AnimatePresence>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchQuery("");
                }
              }}
              className="action-btn"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </motion.button>
          </div>

          {/* Cart Trigger */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onCartClick}
            className="action-btn cart-btn"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="cart-badge"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="action-btn mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu glass"
          >
            <ul className="mobile-menu-links">
              <li>
                <button onClick={() => handleNavClick("/shop")}>Tienda</button>
              </li>
              <li>
                <button className="mobile-header-btn">Categorías</button>
                <div className="mobile-sublinks">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => handleNavClick("/shop", cat, null)}>{cat}</button>
                  ))}
                </div>
              </li>
              <li>
                <button className="mobile-header-btn">Marcas</button>
                <div className="mobile-sublinks">
                  {brands.map(brand => (
                    <button key={brand} onClick={() => handleNavClick("/shop", null, brand)}>{brand}</button>
                  ))}
                </div>
              </li>
              <li>
                <button className="mobile-header-btn">Alta Especialidad</button>
                <div className="mobile-sublinks">
                  <button onClick={() => handleNavClick("/specialty")}>Cureo</button>
                  <button onClick={() => handleNavClick("/specialty")}>Chelt</button>
                </div>
              </li>
              <li>
                <button onClick={() => handleNavClick("/about")}>Nosotros</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/community")}>Comunidad</button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/contact")}>Contacto</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .sticky-nav {
          position: sticky;
          top: 1.25rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 90%;
          max-width: 1280px;
          height: 64px;
          z-index: 100;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(13, 148, 136, 0.15);
          border-radius: 99px;
          box-shadow: 0 8px 32px rgba(13, 148, 136, 0.04);
          padding: 0 1.75rem;
          transition: all 0.3s ease;
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent-color) 0%, #115e59 100%);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.15);
        }
        .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .text-accent {
          color: var(--accent-color);
        }
        .desktop-nav {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          list-style: none;
          height: 100%;
        }
        .nav-links li {
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
        }
        .nav-btn {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.95rem;
          border-radius: 99px;
          transition: all var(--transition-fast);
        }
        .nav-btn.active, .nav-btn:hover {
          color: var(--accent-color);
          background: rgba(13, 148, 136, 0.05);
        }
        .dropdown-trigger .chevron {
          transition: transform var(--transition-fast);
        }
        .dropdown-trigger .chevron.rotate {
          transform: rotate(180deg);
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(13, 148, 136, 0.15);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          padding: 1.25rem;
          min-width: 250px;
          z-index: 101;
        }
        .dropdown-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .dropdown-item {
          font-family: var(--font-body);
          text-align: left;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }
        .dropdown-item:hover {
          background: rgba(13, 148, 136, 0.05);
          color: var(--accent-color);
          padding-left: 1.25rem;
        }
        .specialty-dropdown {
          min-width: 320px;
        }
        .specialty-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .specialty-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .specialty-card:hover {
          background: rgba(13, 148, 136, 0.05);
        }
        .specialty-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--white);
          font-family: var(--font-heading);
        }
        .specialty-card-icon.cureo {
          background: linear-gradient(135deg, #0d9488, #0f766e);
        }
        .specialty-card-icon.chelt {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }
        .specialty-card h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
        }
        .specialty-card p {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          line-height: 1.2;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          position: relative;
        }
        .search-input {
          font-family: var(--font-body);
          padding: 0.45rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 9999px;
          outline: none;
          font-size: 0.85rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .action-btn:hover {
          background: rgba(13, 148, 136, 0.05);
          color: var(--accent-color);
        }
        .cart-btn {
          position: relative;
        }
        .cart-badge {
          position: absolute;
          top: 3px;
          right: 3px;
          background: var(--secondary-accent);
          color: var(--white);
          font-size: 0.65rem;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu-btn {
          display: none;
        }
        .mobile-menu {
          display: none;
          position: absolute;
          top: calc(100% + 8px);
          left: 5%;
          right: 5%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(13, 148, 136, 0.15);
          border-radius: 24px;
          max-height: 75vh;
          overflow-y: auto;
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
          z-index: 100;
        }
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          list-style: none;
        }
        .mobile-menu-links button {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-primary);
          text-align: left;
          width: 100%;
        }
        .mobile-header-btn {
          color: var(--text-tertiary) !important;
          font-size: 0.9rem !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.5rem;
        }
        .mobile-sublinks {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-left: 1rem;
          margin-top: 0.5rem;
          border-left: 2px solid var(--border-color);
        }
        .mobile-sublinks button {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
