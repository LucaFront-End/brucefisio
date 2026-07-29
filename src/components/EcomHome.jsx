import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Sparkles, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Star, 
  Heart, 
  Eye, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  Award, 
  MessageCircle,
  TrendingUp,
  Percent,
  Layers,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EcomHome.css";

export default function EcomHome({ onQuickAdd, onOpenProductModal, products = [] }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [activeFlagship, setActiveFlagship] = useState("chelt");
  const [wishlist, setWishlist] = useState([]);
  
  // Active Hero Slide Index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Live Countdown Timer state for Flash Deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 38,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Minimalist compact categories list
  const categoriesList = [
    { name: "Electroterapia", count: "14 Equipos", image: "/images/hero_ultrasonido.png" },
    { name: "Terapia Percutiva", count: "18 Equipos", image: "/images/hero_massage_gun.png" },
    { name: "Alta Especialidad", count: "5 Sistemas", image: "/images/hero_vr.png" },
    { name: "Camillas & Mobiliario", count: "9 Equipos", image: "/images/cat_camilla.png" },
    { name: "Ejercicio Activo", count: "22 Equipos", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=300&auto=format&fit=crop" },
    { name: "Vendaje & Insumos", count: "35 Productos", image: "/images/cat_vendaje.png" }
  ];

  // Map products with enhanced real images and e-commerce fields
  const enhancedProducts = products.map((p, index) => {
    const defaultImages = [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583912267670-657592e4abf0?q=80&w=800&auto=format&fit=crop"
    ];

    const imgSrc = p.image || p.mediaUrl || defaultImages[index % defaultImages.length];
    const discounts = [15, 20, 25, 10, 30, 0];
    const discount = discounts[index % discounts.length];
    const originalPrice = discount > 0 ? Math.round(p.price / (1 - discount / 100)) : Math.round(p.price * 1.18);
    const rating = (4.8 + (index % 3) * 0.1).toFixed(1);
    const reviewsCount = 24 + index * 15;
    const soldCount = 6 + index * 4;
    const totalStock = soldCount + 4 + (index % 3);
    const badge = index === 0 ? "Bestseller" : index === 1 ? "OFERTA FLASH" : index === 2 ? "NUEVO" : discount > 0 ? `-${discount}%` : null;

    return {
      ...p,
      image: imgSrc,
      discount,
      originalPrice,
      rating,
      reviewsCount,
      soldCount,
      totalStock,
      badge
    };
  });

  // Curated lists to avoid repetition
  const flashDeals = enhancedProducts.slice(0, 4);
  const trendingProducts = enhancedProducts.slice(0, 4);
  
  const filteredProducts = enhancedProducts.slice(0, 8).filter(p => {
    if (activeTab === "bestsellers") return p.rating >= 4.8 || p.badge === "Bestseller";
    if (activeTab === "deals") return p.discount > 0;
    if (activeTab === "new") return p.badge === "NUEVO" || p.id.includes("3") || p.id.includes("5");
    return true;
  });

  const spotlightProduct = enhancedProducts[1] || enhancedProducts[0] || {};

  // Hero Slides with generated studio product photography
  const heroSlides = [
    {
      badge: "⚡ EQUIPO BIOMÉDICO DE ALTA ESPECIALIDAD",
      title: "Electroterapia Clínica Chattanooga Intelect® 4C",
      subtitle: "Estándar de oro en clínicas de fisioterapia. 4 canales independientes, protocolos prediseñados y estimulación de alta precisión.",
      price: "$7,499 MXN",
      oldPrice: "$8,900 MXN",
      discount: "15% OFF",
      badgeColor: "#007EE5",
      image: "/images/hero_electroterapia.png",
      rating: "4.9 ★★★★★ (140+ Reseñas)"
    },
    {
      badge: "🔥 TOP SELLER TERAPIA PERCUTIVA",
      title: "Pistola de Masaje Profesional Bruce Pro Pulse™",
      subtitle: "Terapia de percusión profunda con motor ultra silencioso de 60W y 6 cabezales anatómicos intercambiables.",
      price: "$3,899 MXN",
      oldPrice: "$4,599 MXN",
      discount: "20% OFF",
      badgeColor: "#f97316",
      image: "/images/hero_massage_gun.png",
      rating: "5.0 ★★★★★ (320+ Vendidos)"
    },
    {
      badge: "🔬 ALTA POTENCIA TISULAR",
      title: "Sistemas Láser Terapéutico THEAL 92W",
      subtitle: "Fotobiomodulación directa para desinflamar rápidamente y acelerar la regeneración en lesiones complejas.",
      price: "$12,990 MXN",
      oldPrice: "$15,500 MXN",
      discount: "25% OFF",
      badgeColor: "#10b981",
      image: "/images/hero_laser.png",
      rating: "4.9 ★★★★★ (Grado Hospitalario)"
    }
  ];

  const currentHero = heroSlides[currentSlide];

  const nextHeroSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto-play hero slider
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(heroTimer);
  }, [heroSlides.length]);

  const handleWhatsAppQuote = () => {
    const text = `Hola Bruce Médica, solicito información y cotización para equipar mi clínica de fisioterapia.`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="ecom-home-wrapper">
      <div className="container ecom-container">

        {/* 1. HERO ECOM SECTION (Light Luxury Main Banner + 3 Right Side Bento Cards) */}
        <section className="ecom-hero-grid">
          {/* Main Hero Slider Banner */}
          <div className="ecom-hero-main-card">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                className="hero-main-content-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="hero-main-content">
                  <div className="hero-main-badge">
                    <Sparkles size={14} /> {currentHero.badge}
                  </div>
                  <h1 className="hero-main-title">
                    {currentHero.title}
                  </h1>
                  <p className="hero-main-subtitle">
                    {currentHero.subtitle}
                  </p>

                  <div className="hero-main-price-row">
                    <div className="price-tag">
                      <span className="price-label">Precio Especial Clínica</span>
                      <span className="current-price">{currentHero.price}</span>
                      <span className="old-price">{currentHero.oldPrice}</span>
                    </div>
                    <div className="hero-discount-pill">-{currentHero.discount} HOY</div>
                  </div>

                  <div className="hero-main-actions">
                    <button className="btn-ecom-primary" onClick={() => navigate("/shop")}>
                      <ShoppingBag size={18} /> Comprar Ahora
                    </button>
                    <button className="btn-ecom-secondary" onClick={() => navigate("/specialty")}>
                      Ficha Técnica <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="hero-slider-nav-row">
                    <div className="hero-slider-dots">
                      {heroSlides.map((_, i) => (
                        <button 
                          key={i} 
                          className={`dot ${currentSlide === i ? "active" : ""}`}
                          onClick={() => setCurrentSlide(i)}
                        />
                      ))}
                    </div>
                    <div className="hero-arrows-inline">
                      <button className="hero-nav-arrow-inline" onClick={prevHeroSlide} aria-label="Anterior">
                        <ChevronLeft size={18} />
                      </button>
                      <button className="hero-nav-arrow-inline" onClick={nextHeroSlide} aria-label="Siguiente">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Studio Product Image Stage */}
                <div className="hero-main-img-stage">
                  <div className="img-glow-backdrop"></div>
                  <img 
                    src={currentHero.image} 
                    alt={currentHero.title} 
                    className="hero-real-product-img"
                  />
                  <div className="hero-badge-floating floating-top">
                    <Star size={15} fill="#f59e0b" color="#f59e0b" />
                    <span>{currentHero.rating}</span>
                  </div>
                  <div className="hero-badge-floating floating-bottom">
                    <ShieldCheck size={16} className="text-blue" />
                    <div>
                      <strong>Garantía 2 Años</strong>
                      <span>Directa Bruce Médica</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side 4 Advantage & Solution Hub Cards */}
          <div className="ecom-hero-side-bento">
            {/* Bento Card 1: FINANCIAMIENTO */}
            <div className="side-bento-card bento-card-light-blue" onClick={() => navigate("/contact")}>
              <div className="bento-text-side">
                <span className="bento-tag tag-blue">FACILIDADES DE PAGO</span>
                <h3>Equipa en 12 MSI</h3>
                <p>Tarjetas corporativas y leasing directo.</p>
                <div className="bento-price-row">
                  <span className="bento-price">HASTA 12 MESES</span>
                  <span className="bento-action-link">Cotizar <ChevronRight size={14} /></span>
                </div>
              </div>
              <div className="bento-icon-wrapper icon-blue">
                <CreditCard size={28} />
              </div>
            </div>

            {/* Bento Card 2: ALTA ESPECIALIDAD */}
            <div className="side-bento-card bento-card-light-green" onClick={() => navigate("/specialty")}>
              <div className="bento-text-side">
                <span className="bento-tag tag-green">ALTA ESPECIALIDAD</span>
                <h3>Láser THEAL & VR</h3>
                <p>Fotobiomodulación y Neuro-Rehab 3D.</p>
                <div className="bento-price-row">
                  <span className="bento-price text-green">TECNOLOGÍA TOP</span>
                  <span className="bento-action-link">Ver Equipos <ChevronRight size={14} /></span>
                </div>
              </div>
              <div className="bento-icon-wrapper icon-green">
                <Sparkles size={28} />
              </div>
            </div>

            {/* Bento Card 3: ENVÍOS PRIORITARIOS */}
            <div className="side-bento-card bento-card-light-orange" onClick={() => navigate("/about")}>
              <div className="bento-text-side">
                <span className="bento-tag tag-orange">LOGÍSTICA CLÍNICA</span>
                <h3>Envío Asegurado 24h</h3>
                <p>Despacho prioritario directo a tu clínica.</p>
                <div className="bento-price-row">
                  <span className="bento-price text-orange">COBERTURA 100%</span>
                  <span className="bento-action-link">Ver Tiempos <ChevronRight size={14} /></span>
                </div>
              </div>
              <div className="bento-icon-wrapper icon-orange">
                <Truck size={28} />
              </div>
            </div>

            {/* Bento Card 4: CAPACITACIÓN & CERTIFICACIÓN */}
            <div className="side-bento-card bento-card-light-purple" onClick={() => navigate("/about")}>
              <div className="bento-text-side">
                <span className="bento-tag tag-purple">ACADEMIA BRUCE</span>
                <h3>Capacitación Incluida</h3>
                <p>Certificación técnica para tu personal.</p>
                <div className="bento-price-row">
                  <span className="bento-price text-purple">CURSOS OFICIALES</span>
                  <span className="bento-action-link">Conocer <ChevronRight size={14} /></span>
                </div>
              </div>
              <div className="bento-icon-wrapper icon-purple">
                <Award size={28} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROMO TICKER BAR (MOVED BELOW HERO) */}
        <div className="ecom-top-ticker ecom-ticker-below-hero">
          <div className="ticker-content">
            <span className="ticker-badge"><Zap size={13} /> OFERTA ESPECIAL</span>
            <p>
              ¡Hasta <strong>25% OFF</strong> en Equipos de Electroterapia! Envíos sin costo a todo México.
            </p>
          </div>
          <div className="ticker-right">
            <span><ShieldCheck size={14} /> Soporte Biomédico 24/7</span>
            <span className="divider">|</span>
            <span><Truck size={14} /> Facturación e IVA Incluido</span>
          </div>
        </div>

        {/* 3. MINIMALIST COMPACT CATEGORIES BAR */}
        <section className="ecom-categories-minimal-bar">
          <div className="categories-minimal-grid">
            {categoriesList.map((cat, idx) => (
              <motion.div 
                key={idx}
                className="category-minimal-pill"
                whileHover={{ y: -3, scale: 1.02 }}
                onClick={() => navigate("/shop")}
              >
                <div className="cat-mini-thumb">
                  <img src={cat.image} alt={cat.name} className="cat-mini-img" />
                </div>
                <div className="cat-mini-text">
                  <span className="cat-mini-name">{cat.name}</span>
                  <span className="cat-mini-count">{cat.count}</span>
                </div>
                <ChevronRight size={14} className="cat-mini-arrow" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. HOT DEALS / FLASH SALES SECTION WITH HIGH URGENCY */}
        <section className="ecom-flash-section urgency-mode">
          <div className="flash-header-banner">
            <div className="flash-title-block">
              <div className="flame-badge pulse-red">
                <Flame size={16} className="text-red-fire" /> ⚡ OFERTAS RELÁMPAGO DE ALTA DEMANDA
              </div>
              <h2>¡Liquidación Flash — Hasta 30% OFF!</h2>
              <p>Precios directos de fábrica por tiempo limitado. Una vez finalizado el contador o agotado el cupo asignado, volverán a tarifa regular.</p>
            </div>

            {/* Live Countdown Clock */}
            <div className="flash-timer-box urgency-timer">
              <div className="timer-live-row">
                <span className="live-pulse-dot"></span>
                <span className="timer-label">VENTA EN VIVO | FINALIZA EN:</span>
              </div>
              <div className="timer-digits">
                <div className="digit-unit">
                  <span className="num">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="lbl">Horas</span>
                </div>
                <span className="colon">:</span>
                <div className="digit-unit">
                  <span className="num">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="lbl">Min</span>
                </div>
                <span className="colon">:</span>
                <div className="digit-unit">
                  <span className="num num-seconds">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="lbl">Seg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flash Deals Product Grid */}
          <div className="flash-products-grid">
            {flashDeals.map((prod) => {
              const progressPct = Math.min(92, Math.max(70, Math.round((prod.soldCount / prod.totalStock) * 100)));
              const remainingStock = Math.max(2, prod.totalStock - prod.soldCount);
              const isWished = wishlist.includes(prod.id);

              return (
                <div key={prod.id} className="ecom-product-card flash-card-urgent">
                  {/* Image Stage */}
                  <div className="product-card-stage" onClick={() => onOpenProductModal(prod)}>
                    {/* Badges inside stage */}
                    <div className="card-badge-container">
                      <span className="card-badge badge-fire-red">🔥 {prod.discount > 0 ? `-${prod.discount}% OFF` : "OFERTA RELÁMPAGO"}</span>
                      <span className="card-badge badge-blue">12 MSI</span>
                    </div>

                    {/* Wishlist Button inside stage */}
                    <button 
                      className={`btn-wishlist ${isWished ? "active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id, e); }}
                    >
                      <Heart size={16} fill={isWished ? "#ef4444" : "none"} />
                    </button>

                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="product-real-img"
                    />
                    <div className="quick-view-overlay">
                      <button className="btn-quick-view">
                        <Eye size={15} /> Vista Rápida
                      </button>
                    </div>
                  </div>

                  {/* Product Body */}
                  <div className="product-card-body">
                    <span className="prod-category text-fire">{prod.category}</span>
                    <h3 className="prod-title" onClick={() => onOpenProductModal(prod)}>
                      {prod.name}
                    </h3>

                    {/* Star Ratings */}
                    <div className="prod-rating-row">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star size={13} key={i} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span className="rating-val">{prod.rating}</span>
                      <span className="reviews-cnt">({prod.reviewsCount})</span>
                    </div>

                    {/* Price Block */}
                    <div className="prod-price-row">
                      <span className="price-main price-fire">${prod.price.toLocaleString("es-MX")} MXN</span>
                      {prod.originalPrice > prod.price && (
                        <span className="price-old">${prod.originalPrice.toLocaleString("es-MX")}</span>
                      )}
                    </div>

                    {/* Urgency Stock Progress Bar */}
                    <div className="stock-progress-block urgency-stock">
                      <div className="stock-text">
                        <span>🔥 Vendido: <strong>{progressPct}%</strong></span>
                        <span className="stock-urgent-tag">¡Solo {remainingStock} disp.!</span>
                      </div>
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill fire-fill" style={{ width: `${progressPct}%` }}></div>
                      </div>
                    </div>

                    {/* Urgent Action Button */}
                    <button className="btn-add-cart btn-fire-action" onClick={() => onQuickAdd(prod)}>
                      <Zap size={16} /> ¡Aprovechar Oferta!
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. FEATURED PRODUCTS WITH CATEGORY TAB FILTERS */}
        <section className="ecom-featured-section">
          <div className="section-header">
            <div>
              <span className="sub-tag">CATÁLOGO CLÍNICO SELECCIONADO</span>
              <h2 className="section-title">Equipamiento Destacado</h2>
            </div>

            {/* Filter Tabs */}
            <div className="ecom-tabs-bar">
              <button 
                className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                Todos los Equipos
              </button>
              <button 
                className={`tab-btn ${activeTab === "bestsellers" ? "active" : ""}`}
                onClick={() => setActiveTab("bestsellers")}
              >
                🔥 Más Vendidos
              </button>
              <button 
                className={`tab-btn ${activeTab === "deals" ? "active" : ""}`}
                onClick={() => setActiveTab("deals")}
              >
                🏷️ Ofertas Especiales
              </button>
              <button 
                className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
                onClick={() => setActiveTab("new")}
              >
                ✨ Nuevos Ingresos
              </button>
            </div>
          </div>

          {/* Grid of Curated Products */}
          <div className="ecom-products-grid">
            {filteredProducts.map((prod) => {
              const isWished = wishlist.includes(prod.id);
              // Clean title if ALL CAPS
              const formattedName = prod.name && prod.name === prod.name.toUpperCase() && prod.name.length > 5
                ? prod.name.toLowerCase().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
                : prod.name;

              return (
                <div key={prod.id} className="ecom-product-card">
                  {/* Image Stage */}
                  <div className="product-card-stage" onClick={() => onOpenProductModal(prod)}>
                    {/* Badges inside stage */}
                    <div className="card-badge-container">
                      {prod.badge && (
                        <span className={`card-badge ${prod.badge.includes("OFF") || prod.badge.includes("%") ? "badge-red" : prod.badge === "Bestseller" ? "badge-gold" : "badge-blue"}`}>
                          {prod.badge}
                        </span>
                      )}
                      {prod.price > 2000 && <span className="card-badge badge-green">12 MSI</span>}
                    </div>

                    {/* Wishlist Button inside stage */}
                    <button 
                      className={`btn-wishlist ${isWished ? "active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id, e); }}
                    >
                      <Heart size={16} fill={isWished ? "#ef4444" : "none"} />
                    </button>

                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="product-real-img"
                    />
                    <div className="quick-view-overlay">
                      <button className="btn-quick-view">
                        <Eye size={15} /> Vista Rápida
                      </button>
                    </div>
                  </div>

                  {/* Product Card Body */}
                  <div className="product-card-body">
                    <span className="prod-category">{prod.category || "Fisioterapia"}</span>
                    <h3 className="prod-title" onClick={() => onOpenProductModal(prod)} title={prod.name}>
                      {formattedName}
                    </h3>

                    {/* Star Ratings */}
                    <div className="prod-rating-row">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star size={13} key={i} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span className="rating-val">{prod.rating}</span>
                      <span className="reviews-cnt">({prod.reviewsCount})</span>
                    </div>

                    {/* Price Block */}
                    <div className="prod-price-row">
                      <span className="price-main">${prod.price.toLocaleString("es-MX")} MXN</span>
                      {prod.originalPrice > prod.price && (
                        <span className="price-old">${prod.originalPrice.toLocaleString("es-MX")}</span>
                      )}
                    </div>

                    <div className="stock-status">
                      <span className="dot-green"></span> En Stock Directo — Envío 24h
                    </div>

                    <button className="btn-add-cart" onClick={() => onQuickAdd(prod)}>
                      <ShoppingCart size={16} /> Agregar al Carrito
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. TRUST & VALUE PROPOSITIONS GRID */}
        <section className="ecom-trust-pillars-section">
          <div className="section-header">
            <div>
              <span className="sub-tag">RESPALDO Y GARANTÍA BIOMÉDICA</span>
              <h2 className="section-title">¿Por qué las mejores clínicas eligen Bruce Médica?</h2>
            </div>
          </div>

          <div className="trust-pillars-grid">
            {/* Pillar 1 */}
            <div className="trust-pillar-card" onClick={() => navigate("/about")}>
              <div className="pillar-icon-box icon-blue">
                <ShieldCheck size={26} />
              </div>
              <h3>Garantía Biomédica 2 Años</h3>
              <p>Respaldo directo de fábrica sin intermediarios. Equipo de sustitución temporal disponible durante mantenimientos.</p>
              <span className="pillar-link">Conocer Cobertura <ChevronRight size={15} /></span>
            </div>

            {/* Pillar 2 */}
            <div className="trust-pillar-card" onClick={() => navigate("/about")}>
              <div className="pillar-icon-box icon-green">
                <Truck size={26} />
              </div>
              <h3>Logística Clínica Prioritaria</h3>
              <p>Empaque especial de alta protección y seguro total de carga asegurado a cualquier clínica en México.</p>
              <span className="pillar-link text-green">Tiempos de Entrega <ChevronRight size={15} /></span>
            </div>

            {/* Pillar 3 */}
            <div className="trust-pillar-card" onClick={() => navigate("/contact")}>
              <div className="pillar-icon-box icon-purple">
                <CreditCard size={26} />
              </div>
              <h3>Hasta 12 MSI y Leasing</h3>
              <p>Equipa tu consultorio hoy mismo con tarjetas corporativas o arrendamiento 100% deducible de impuestos.</p>
              <span className="pillar-link text-purple">Opciones de Pago <ChevronRight size={15} /></span>
            </div>

            {/* Pillar 4 */}
            <div className="trust-pillar-card" onClick={() => navigate("/about")}>
              <div className="pillar-icon-box icon-orange">
                <Award size={26} />
              </div>
              <h3>Capacitación Incluida</h3>
              <p>Certificación técnica e instrucción paso a paso para que tu equipo de fisioterapeutas domine los equipos.</p>
              <span className="pillar-link text-orange">Academia Bruce <ChevronRight size={15} /></span>
            </div>
          </div>
        </section>

        {/* 7. FLAGSHIP BIOMEDICAL SPOTLIGHT (CHELT & CUREO VR DUAL EXPERIENCE) */}
        <section className="ecom-flagship-spotlight-section">
          {/* Section Header with Flagship Switcher Pills */}
          <div className="flagship-header-row">
            <div>
              <span className="sub-tag">TECNOLOGÍA DE ALTA ESPECIALIDAD BRUCE</span>
              <h2 className="section-title">Nuestros Equipos Médicos Insignia</h2>
            </div>
            
            <div className="flagship-toggle-pills">
              <button 
                className={`flagship-pill-btn ${activeFlagship === "chelt" ? "active-chelt" : ""}`}
                onClick={() => setActiveFlagship("chelt")}
              >
                <Sparkles size={15} /> CHELT — Láser THEAL 92W
              </button>
              <button 
                className={`flagship-pill-btn ${activeFlagship === "cureo" ? "active-cureo" : ""}`}
                onClick={() => setActiveFlagship("cureo")}
              >
                <Zap size={15} /> CUREO® 5.0 — Realidad Virtual VR
              </button>
            </div>
          </div>

          {/* Dynamic Showcase Container */}
          <AnimatePresence mode="wait">
            {activeFlagship === "chelt" ? (
              <motion.div 
                key="chelt-spotlight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flagship-hero-card theme-chelt"
              >
                <div className="flagship-left-details">
                  <div className="flagship-badge-row">
                    <span className="flagship-tag-pill tag-blue">🔬 FOTOBIOMODULACIÓN DUAL</span>
                    <span className="flagship-spec-pill">92W Potencia Máxima</span>
                  </div>

                  <h2 className="flagship-title">Sistemas Láser THEAL 92W CHELT</h2>
                  <p className="flagship-desc">
                    El estándar de oro en bioestimulación tisular. Combina hasta 4 longitudes de onda ópticas simultáneas para analgesia inmediata, desinflamación profunda e hipertermia tisular modulada.
                  </p>

                  <div className="flagship-feature-grid">
                    <div className="f-feat-item">
                      <CheckCircle2 size={18} className="text-blue" />
                      <span>Emisión continua y pulsada súper acelerada</span>
                    </div>
                    <div className="f-feat-item">
                      <CheckCircle2 size={18} className="text-blue" />
                      <span>Control térmico continuo por escáner infrarrojo</span>
                    </div>
                    <div className="f-feat-item">
                      <CheckCircle2 size={18} className="text-blue" />
                      <span>Resultados analgésicos desde la 1ª sesión clínica</span>
                    </div>
                  </div>

                  <div className="flagship-action-bar">
                    <div className="flagship-price-tag">
                      <span className="sp-price-lbl">Financiamiento Especial</span>
                      <div className="sp-price">12 MSI / Leasing Directo</div>
                    </div>
                    <button className="btn-flagship-action btn-chelt" onClick={() => navigate("/specialty")}>
                      Solicitar Demostración Clínica <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="flagship-right-media">
                  <div className="flagship-image-wrapper">
                    <img 
                      src="/images/chelt_theal_treatment.png" 
                      alt="Tratamiento CHELT Láser THEAL 92W" 
                      className="flagship-hero-img"
                    />
                    <div className="flagship-floating-badge badge-top-right">
                      <span>⚡ 92 Watts</span>
                      <small>Fototerapia Médica</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="cureo-spotlight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flagship-hero-card theme-cureo"
              >
                <div className="flagship-left-details">
                  <div className="flagship-badge-row">
                    <span className="flagship-tag-pill tag-green">🧠 NEURO-REHABILITACIÓN CLÍNICA 3D</span>
                    <span className="flagship-spec-pill spec-green">Software Grado Médico CE</span>
                  </div>

                  <h2 className="flagship-title">CUREO® 5.0 VR System</h2>
                  <p className="flagship-desc">
                    Plataforma de realidad virtual clínica inmersiva para reentrenamiento motor, cognitivo y sensorial. Diseñada para acelerar la neuroplasticidad cerebral en extremidades superiores, inferiores y tronco.
                  </p>

                  <div className="flagship-feature-grid">
                    <div className="f-feat-item">
                      <CheckCircle2 size={18} className="text-green" />
                      <span>Más de 50 módulos gamificados con biofeedback activo</span>
                    </div>
                    <div className="f-feat-item">
                      <CheckCircle2 size={18} className="text-green" />
                      <span>Seguimiento kinemático en tiempo real de articulaciones</span>
                    </div>
                    <div className="f-feat-item">
                      <CheckCircle2 size={18} className="text-green" />
                      <span>Evaluación biomédica automatizada por paciente</span>
                    </div>
                  </div>

                  <div className="flagship-action-bar">
                    <div className="flagship-price-tag">
                      <span className="sp-price-lbl">Demostración In Situ</span>
                      <div className="sp-price text-green">Prueba Gratis en Tu Clínica</div>
                    </div>
                    <button className="btn-flagship-action btn-cureo" onClick={() => navigate("/specialty")}>
                      Solicitar Asesoría CUREO <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="flagship-right-media">
                  <div className="flagship-image-wrapper">
                    <img 
                      src="/images/cureo_vr_patient.png" 
                      alt="Rehabilitación con CUREO 5.0 VR" 
                      className="flagship-hero-img"
                    />
                    <div className="flagship-floating-badge badge-top-right badge-green">
                      <span>🎮 VR 5.0</span>
                      <small>Neuro-Rehab 3D</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 8. TESTIMONIALS FROM VERIFIED CLINICS (INFINITE MARQUEE LOOP) */}
        <section className="ecom-testimonials-section">
          <div className="section-header text-center">
            <span className="sub-tag">RESEÑAS Y TESTIMONIOS VERIFICADOS</span>
            <h2 className="section-title">Confianza de las mejores clínicas de México</h2>
          </div>

          <div className="reviews-marquee-container">
            {/* Side Fade Blur Overlays */}
            <div className="marquee-fade fade-left"></div>
            <div className="marquee-fade fade-right"></div>

            <div className="reviews-marquee-track">
              {[
                {
                  id: 1,
                  quote: "El equipo Láser THEAL revolucionó mi consulta. Mis pacientes con inflamaciones severas sienten alivio desde la primera sesión. La atención de Bruce Médica fue impecable.",
                  name: "Dr. Alejandro Morales",
                  title: "Director en Clínica KineFit — CDMX",
                  avatar: "Dr",
                  colorClass: ""
                },
                {
                  id: 2,
                  quote: "Compré la pistola Bruce Pro Pulse y dos camillas. La entrega fue súper rápida y la garantía de 2 años me da una tranquilidad total en el día a día.",
                  name: "Lic. Valeria Ramos",
                  title: "Fisioterapeuta Deportiva — Guadalajara",
                  avatar: "Lic",
                  colorClass: "bg-blue"
                },
                {
                  id: 3,
                  quote: "La capacitación presencial que incluyeron con el electroestimulador hizo que todo mi equipo supiera sacarle el 100% al aparato desde el primer día.",
                  name: "Dr. Roberto Garza",
                  title: "Centro de Rehabilitación Garza — Monterrey",
                  avatar: "Dr",
                  colorClass: "bg-green"
                },
                {
                  id: 4,
                  quote: "Implementamos el sistema CUREO VR en nuestro módulo neurológico y el enganche de los pacientes ha sido espectacular. Gran inversión para la clínica.",
                  name: "Lic. Sofía Mendoza",
                  title: "Especialista en Neuro-Rehabilitación — Puebla",
                  avatar: "Lic",
                  colorClass: "bg-purple"
                },
                {
                  id: 5,
                  quote: "Los esquemas de leasing en 12 MSI nos permitieron renovar todo el equipamiento de fisioterapia de la clínica sin descapitalizarnos. Excelente servicio.",
                  name: "Dr. Carlos Benítez",
                  title: "Director MedFit — Querétaro",
                  avatar: "Dr",
                  colorClass: ""
                },
                {
                  id: 6,
                  quote: "El soporte técnico y los mantenimientos preventivos son inmediatos. Es raro encontrar proveedores de equipo médico tan serios en México.",
                  name: "Lic. Mariana Torres",
                  title: "Clínica TraumaFix — Mérida",
                  avatar: "Lic",
                  colorClass: "bg-orange"
                },
                // Duplicated set for seamless loop
                {
                  id: 7,
                  quote: "El equipo Láser THEAL revolucionó mi consulta. Mis pacientes con inflamaciones severas sienten alivio desde la primera sesión. La atención de Bruce Médica fue impecable.",
                  name: "Dr. Alejandro Morales",
                  title: "Director en Clínica KineFit — CDMX",
                  avatar: "Dr",
                  colorClass: ""
                },
                {
                  id: 8,
                  quote: "Compré la pistola Bruce Pro Pulse y dos camillas. La entrega fue súper rápida y la garantía de 2 años me da una tranquilidad total en el día a día.",
                  name: "Lic. Valeria Ramos",
                  title: "Fisioterapeuta Deportiva — Guadalajara",
                  avatar: "Lic",
                  colorClass: "bg-blue"
                },
                {
                  id: 9,
                  quote: "La capacitación presencial que incluyeron con el electroestimulador hizo que todo mi equipo supiera sacarle el 100% al aparato desde el primer día.",
                  name: "Dr. Roberto Garza",
                  title: "Centro de Rehabilitación Garza — Monterrey",
                  avatar: "Dr",
                  colorClass: "bg-green"
                },
                {
                  id: 10,
                  quote: "Implementamos el sistema CUREO VR en nuestro módulo neurológico y el enganche de los pacientes ha sido espectacular. Gran inversión para la clínica.",
                  name: "Lic. Sofía Mendoza",
                  title: "Especialista en Neuro-Rehabilitación — Puebla",
                  avatar: "Lic",
                  colorClass: "bg-purple"
                },
                {
                  id: 11,
                  quote: "Los esquemas de leasing en 12 MSI nos permitieron renovar todo el equipamiento de fisioterapia de la clínica sin descapitalizarnos. Excelente servicio.",
                  name: "Dr. Carlos Benítez",
                  title: "Director MedFit — Querétaro",
                  avatar: "Dr",
                  colorClass: ""
                },
                {
                  id: 12,
                  quote: "El soporte técnico y los mantenimientos preventivos son inmediatos. Es raro encontrar proveedores de equipo médico tan serios en México.",
                  name: "Lic. Mariana Torres",
                  title: "Clínica TraumaFix — Mérida",
                  avatar: "Lic",
                  colorClass: "bg-orange"
                }
              ].map((test, index) => (
                <div key={`${test.id}-${index}`} className="testimonial-card-marquee">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star size={14} key={i} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className="test-quote">"{test.quote}"</p>
                  <div className="test-author">
                    <div className={`avatar ${test.colorClass}`}>{test.avatar}</div>
                    <div>
                      <h4>{test.name}</h4>
                      <span>{test.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CTA WHATSAPP & CONSULTING BAR */}
        <section className="ecom-cta-bar">
          <div className="cta-glow-bg"></div>
          <div className="cta-left-text">
            <span className="cta-top-tag"><Sparkles size={14} /> ASESORÍA BIOMÉDICA EN TIEMPO REAL</span>
            <h2>¿Dudas sobre qué equipo requiere tu consultorio?</h2>
            <p>Habla directamente con nuestros Ingenieros Biomédicos por WhatsApp y recibe asesoría técnica + cotización formal en minutos.</p>
          </div>

          <div className="cta-right-actions">
            <button className="btn-cta-whatsapp" onClick={handleWhatsAppQuote}>
              <MessageCircle size={20} /> Asesoría por WhatsApp
            </button>
            <button className="btn-cta-shop" onClick={() => navigate("/shop")}>
              Ver Catálogo Completo <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
