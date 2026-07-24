import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { Check, ShoppingBag, ArrowRight, Zap, Shield, HelpCircle, Activity, Award } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import HighSpecialty from "./components/HighSpecialty";
import AboutUs from "./components/AboutUs";
import Community from "./components/Community";
import Contact from "./components/Contact";
import FeaturedRotary from "./components/FeaturedRotary";
import SpecialtyCurtain from "./components/SpecialtyCurtain";
import HomeQuiz from "./components/HomeQuiz";
import HomeCompare from "./components/HomeCompare";
import HomeReviews from "./components/HomeReviews";
import HomeCTA from "./components/HomeCTA";

// Mock Data
import { PRODUCTS } from "./data/products";
import { fetchProductsFromWix, fetchProductById } from "./data/wixService";

function ProductPageWrapper({ products, loadingWix, onAddToCart, onQuickAdd, onOpenProductModal }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [fullProduct, setFullProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const basicProduct = products.find(p => p.slug === slug || p.id === slug);

  useEffect(() => {
    if (!basicProduct) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    fetchProductById(basicProduct.id).then(res => {
      if (res) {
        setFullProduct(res);
      } else {
        setFullProduct(basicProduct); // fallback
      }
      setLoading(false);
    });
  }, [basicProduct]);

  if (loading && !fullProduct) {
    return (
      <div className="loading-container" style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--bg-dark)',
        color: 'var(--white)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: '3px solid var(--border-color)',
            borderTopColor: 'var(--accent-color)',
            marginBottom: '20px'
          }}
        />
        <p style={{ letterSpacing: '1px', opacity: 0.8 }}>Cargando especificaciones del equipo...</p>
      </div>
    );
  }

  if (!fullProduct) {
    if (loadingWix) return <div style={{padding: '10rem', textAlign: 'center'}}>Cargando catálogo...</div>;
    return <div style={{padding: '10rem', textAlign: 'center'}}><h2>Producto no encontrado</h2><button className="btn btn-primary mt-4" onClick={()=>navigate('/shop')}>Volver a tienda</button></div>;
  }
  
  return <ProductPage 
            product={fullProduct} 
            onBack={() => navigate("/shop")} 
            onAddToCart={onAddToCart} 
            onQuickAdd={onQuickAdd} 
            onOpenProductModal={onOpenProductModal} 
            products={products} 
          />;
}

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [loadingWix, setLoadingWix] = useState(true);

  // Fetch catalog dynamically on mount
  useEffect(() => {
    async function loadDynamicCatalog() {
      try {
        const remoteProducts = await fetchProductsFromWix();
        if (remoteProducts && remoteProducts.length > 0) {
          setProducts(remoteProducts);
        }
      } catch (err) {
        console.error("Error cargando el catálogo dinámico, usando local fallback", err);
      } finally {
        setLoadingWix(false);
      }
    }
    loadDynamicCatalog();
  }, []);

  const [activeTab, setActiveTab] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  
  // States for Shop filtering
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 4000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Sync activeTab with route to handle direct navigation
    const path = location.pathname.split("/")[1] || "home";
    setActiveTab(path);
  }, [location.pathname]);

  const handleAddToCart = (newItems) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];

      newItems.forEach(newItem => {
        const existingItemIndex = updatedItems.findIndex(item => 
          item.product.id === newItem.product.id && item.variantValue === newItem.variantValue
        );

        if (existingItemIndex > -1) {
          updatedItems[existingItemIndex].quantity += newItem.quantity;
        } else {
          updatedItems.push(newItem);
        }
      });

      return updatedItems;
    });
  };

  const handleQuickAdd = (product) => {
    // Safely get the first option or fallback to null
    const defaultOption = product.variables?.options?.[0];
    const optionVal = typeof defaultOption === 'object' ? defaultOption.value : defaultOption;

    const quickItem = {
      product,
      variantName: product.variables?.name || "Opción",
      variantValue: optionVal || "Única",
      quantity: 1
    };

    handleAddToCart([quickItem]);
    
    // Open the cart drawer to give immediate feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, variantValue, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, variantValue);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.product.id === productId && item.variantValue === variantValue)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, variantValue) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.product.id === productId && item.variantValue === variantValue)
      )
    );
  };

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const handleCheckout = () => {
    setIsCheckoutSuccess(true);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categoriesList = Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();
  const brandsList = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();

  // Subpage wrapper transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <div className="app-wrapper">
      {/* Premium Global Wix Catalog Preloader */}
      <AnimatePresence>
        {loadingWix && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "var(--bg-primary)",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem"
            }}
          >
            {/* Spinning Brand Rings */}
            <div style={{ position: "relative", width: "80px", height: "80px" }}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "4px dashed var(--accent-color)"
                }}
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "3px dashed var(--secondary-accent)",
                  opacity: 0.7
                }}
              />
              {/* Bruce Médica Symbol / Letter B */}
              <div style={{
                position: "absolute",
                top: "22px",
                left: "22px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--accent-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--white)",
                fontWeight: "900",
                fontSize: "1.2rem",
                fontFamily: "var(--font-heading)"
              }}>
                B
              </div>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <h3 style={{ 
                fontFamily: "var(--font-heading)", 
                fontSize: "1.6rem", 
                fontWeight: "800",
                color: "var(--text-primary)",
                marginBottom: "0.6rem"
              }}>
                Conectando con Bruce Médica...
              </h3>
              <p style={{ 
                color: "var(--text-secondary)", 
                fontSize: "0.95rem",
                letterSpacing: "0.5px"
              }}>
                Sincronizando catálogo en vivo de fisioterapia y alta especialidad
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Top Header */}
      <Navbar 
        setCategoryFilter={setCategoryFilter}
        setBrandFilter={setBrandFilter}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categoriesList}
        brands={brandsList}
      />

      {/* Main Page Views switcher */}
      <main className="main-content-flow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Hero onShopClick={() => navigate("/shop")} onSpecialtyClick={() => navigate("/specialty")} onQuickAdd={handleQuickAdd} onOpenProductModal={handleOpenProductModal} products={products} />
                <FeaturedRotary onOpenProductModal={handleOpenProductModal} onQuickAdd={handleQuickAdd} products={products} />
                <SpecialtyCurtain onExploreClick={() => navigate("/specialty")} />
                <HomeQuiz onOpenProductModal={handleOpenProductModal} onQuickAdd={handleQuickAdd} products={products} />
                <HomeCompare onQuickAdd={handleQuickAdd} products={products} />
                <HomeReviews onOpenProductModal={handleOpenProductModal} products={products} />
                <HomeCTA />
              </motion.div>
            } />
            
            <Route path="/shop" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Shop categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} brandFilter={brandFilter} setBrandFilter={setBrandFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onOpenProductModal={handleOpenProductModal} onQuickAdd={handleQuickAdd} products={products} />
              </motion.div>
            } />
            
            <Route path="/specialty" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <HighSpecialty />
              </motion.div>
            } />

            <Route path="/about" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <AboutUs />
              </motion.div>
            } />

            <Route path="/community" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Community />
              </motion.div>
            } />

            <Route path="/contact" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Contact />
              </motion.div>
            } />

            <Route path="/product/:slug" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ProductPageWrapper products={products} loadingWix={loadingWix} onAddToCart={handleAddToCart} onQuickAdd={handleQuickAdd} onOpenProductModal={handleOpenProductModal} />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <footer className="editorial-footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <div className="footer-logo-block">
              <div className="footer-logo-icon">B</div>
              <h4>Bruce <span>Médica</span></h4>
            </div>
            <p>
              Equipamiento y soluciones tecnológicas de nivel premium para clínicas de rehabilitación 
              y fisioterapeutas en todo México. Respaldado por certificaciones internacionales.
            </p>
            <div className="social-links-footer">
              <a href="#facebook" onClick={e => e.preventDefault()}>FB</a>
              <a href="#instagram" onClick={e => e.preventDefault()}>IG</a>
              <a href="#linkedin" onClick={e => e.preventDefault()}>LN</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h5>Navegación</h5>
            <ul>
              <li><button onClick={() => setActiveTab("shop")}>Tienda Online</button></li>
              <li><button onClick={() => setActiveTab("specialty")}>Alta Especialidad</button></li>
              <li><button onClick={() => setActiveTab("about")}>Sobre Nosotros</button></li>
              <li><button onClick={() => setActiveTab("community")}>Comunidad Médica</button></li>
              <li><button onClick={() => setActiveTab("contact")}>Contacto y Soporte</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5>Alta Especialidad</h5>
            <ul>
              <li><button onClick={() => setActiveTab("specialty")}>Cureo Radiofrecuencia</button></li>
              <li><button onClick={() => setActiveTab("specialty")}>Chelt Laser Criofisio</button></li>
              <li><a href="#academy" onClick={e => {e.preventDefault(); setActiveTab("community")}}>Certificaciones Clínicas</a></li>
            </ul>
          </div>

          <div className="footer-newsletter-col">
            <h5>Boletín Clínico</h5>
            <p className="newsletter-desc">Recibe actualizaciones sobre lanzamientos de equipos y webinars académicos.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Tu correo institucional..."
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                Unirse
              </button>
            </form>

            <AnimatePresence>
              {newsletterSubscribed && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="newsletter-success-tag"
                >
                  <Check size={12} /> ¡Registro exitoso!
                </motion.span>
              )}
            </AnimatePresence>

            <div className="footer-certification-seal">
              <Award size={14} className="text-accent" />
              <span>Equipamiento Médicamente Certificado</span>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Bruce Médica. Todos los derechos reservados. Diseñado bajo estándares de excelencia clínica.</p>
          <div className="legal-links">
            <a href="#privacy" onClick={e => e.preventDefault()}>Aviso de Privacidad</a>
            <a href="#terms" onClick={e => e.preventDefault()}>Términos y Condiciones</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Component */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />



      {/* Checkout Success Popup */}
      <AnimatePresence>
        {isCheckoutSuccess && (
          <div className="success-overlay" onClick={() => setIsCheckoutSuccess(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="success-modal glass"
              onClick={e => e.stopPropagation()}
            >
              <div className="success-icon-box">
                <Check size={36} />
              </div>
              <h3>¡Pedido Simulado con Éxito!</h3>
              <p>
                Tu cotización ha sido procesada de forma interna. Recuerda que para envíos reales 
                o confirmación de stock, puedes presionar el botón de **Cotizar por WhatsApp** en el carrito 
                para recibir atención personalizada en tu móvil.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsCheckoutSuccess(false)}
              >
                Volver a la tienda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-primary);
        }
        
        .main-content-flow {
          flex-grow: 1;
        }
        
        /* Home page styles */
        .featured-section {
          padding: 6rem 2rem;
        }
        
        .featured-title-group {
          margin-bottom: 4rem;
        }
        
        .featured-subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        
        .featured-grid {
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        
        .featured-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-medium);
        }
        
        .featured-card:hover {
          border-color: var(--accent-light);
          box-shadow: var(--shadow-md);
        }
        
        .featured-img-box {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .featured-svg {
          width: 60%;
          height: 60%;
          transition: transform var(--transition-medium);
        }
        
        .featured-svg svg {
          width: 100%;
          height: 100%;
        }
        
        .featured-card:hover .featured-svg {
          transform: scale(1.06) translateY(-5px);
        }
        
        .featured-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid var(--border-color);
          flex-grow: 1;
          justify-content: space-between;
        }
        
        .featured-brand {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .featured-info h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        .featured-info p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        .featured-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }
        
        .featured-price {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
        }
        
        .btn-featured-buy {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          border-radius: 8px;
        }
        
        .featured-cta-block {
          display: flex;
          justify-content: center;
        }
        
        /* Specialty Callout Banner */
        .specialty-callout-banner {
          background: var(--text-primary);
          color: var(--white);
          padding: 5rem 0;
          position: relative;
          overflow: hidden;
        }
        
        .banner-grid {
          align-items: center;
        }
        
        .text-white-tag {
          color: var(--accent-color) !important;
          background: rgba(0, 126, 229, 0.15) !important;
          border: 1px solid rgba(0, 126, 229, 0.3);
        }
        
        .specialty-callout-banner h3 {
          color: var(--white);
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1rem 0;
        }
        
        .specialty-callout-banner p {
          color: var(--text-tertiary);
          font-size: 1.05rem;
          margin-bottom: 2rem;
          line-height: 1.7;
          max-width: 550px;
        }
        
        .banner-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 250px;
        }
        
        .banner-c-1 {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 1px dashed rgba(0, 126, 229, 0.3);
          animation: spin 30s linear infinite;
        }
        
        .banner-c-2 {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 126, 229, 0.15) 0%, transparent 70%);
        }
        
        .banner-big-icon {
          z-index: 2;
          filter: drop-shadow(0 8px 16px rgba(0, 126, 229, 0.2));
          animation: bounce 4s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .editorial-footer {
          background: #f8fafc;
          border-top: 1px solid var(--border-color);
          padding: 6rem 0 3rem 0;
          margin-top: 6rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 0.9fr 0.9fr 1.4fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-logo-block {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }

        .footer-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent-color) 0%, #003057 100%);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(0, 126, 229, 0.1);
        }
        
        .footer-brand-col h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0;
        }
        
        .footer-brand-col h4 span {
          color: var(--accent-color);
        }
        
        .footer-brand-col p {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .social-links-footer {
          display: flex;
          gap: 0.75rem;
        }
        
        .social-links-footer a {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        
        .social-links-footer a:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: var(--white);
          transform: translateY(-2px);
        }
        
        .footer-links-col h5, .footer-newsletter-col h5 {
          font-size: 0.85rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }
        
        .footer-links-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        
        .footer-links-col button, .footer-links-col a {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          text-align: left;
          display: inline-block;
        }
        
        .footer-links-col button:hover, .footer-links-col a:hover {
          color: var(--accent-color);
          transform: translateX(4px);
        }
        
        /* Newsletter input form */
        .footer-newsletter-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .newsletter-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .footer-newsletter-form {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }

        .newsletter-input {
          flex-grow: 1;
          font-family: var(--font-body);
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          outline: none;
          font-size: 0.8rem;
          background: var(--white);
          color: var(--text-primary);
          transition: border var(--transition-fast);
        }

        .newsletter-input:focus {
          border-color: var(--accent-color);
        }

        .newsletter-submit-btn {
          background: var(--text-primary);
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.5rem 1.15rem;
          border-radius: 10px;
          transition: all var(--transition-fast);
        }

        .newsletter-submit-btn:hover {
          background: var(--accent-color);
        }

        .newsletter-success-tag {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          color: #003057;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .footer-certification-seal {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .footer-bottom p {
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }
        
        .legal-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .legal-links a {
          font-size: 0.78rem;
          color: var(--text-tertiary);
          transition: color var(--transition-fast);
        }
        
        .legal-links a:hover {
          color: var(--accent-color);
        }
        
        /* Checkout Success Modal */
        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .success-modal {
          background: var(--white);
          border-radius: 28px;
          padding: 3rem;
          width: 100%;
          max-width: 500px;
          text-align: center;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        
        .success-icon-box {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #dcfce7;
          color: #15803d;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.15);
        }
        
        .success-modal h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .success-modal p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .success-modal button {
          width: 100%;
          padding: 0.85rem;
          border-radius: 12px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
