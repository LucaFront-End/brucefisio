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

  // Rich categories with high-quality real images
  const categoriesList = [
    { 
      name: "Electroterapia", 
      count: "14 Equipos", 
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300&auto=format&fit=crop"
    },
    { 
      name: "Terapia Manual", 
      count: "18 Equipos", 
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&auto=format&fit=crop"
    },
    { 
      name: "Ejercicio Activo", 
      count: "22 Equipos", 
      image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=300&auto=format&fit=crop"
    },
    { 
      name: "Movilidad & Camillas", 
      count: "9 Equipos", 
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=300&auto=format&fit=crop"
    },
    { 
      name: "Vendaje & Cuidado", 
      count: "35 Productos", 
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop"
    },
    { 
      name: "Alta Especialidad VR", 
      count: "5 Sistemas", 
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=300&auto=format&fit=crop"
    }
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

  // Hero Slides configuration
  const heroSlides = [
    {
      badge: "NUEVO LANZAMIENTO BIOMÉDICO",
      title: "Electroestimulador Chattanooga Intelect® Advanced",
      subtitle: "Estándar de oro clínico con 4 canales independientes y protocolos anatómicos 3D.",
      price: "$7,499 MXN",
      oldPrice: "$8,900 MXN",
      discount: "15% OFF",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
    },
    {
      badge: "TECNOLOGÍA DE PERCUSIÓN",
      title: "Pistola de Masaje Bruce Pro Pulse™ 5V",
      titleHighlight: "Recuperación Profunda",
      subtitle: "Motor ultra silencioso sin escobillas y 6 cabezales de grado fisioterapéutico.",
      price: "$3,899 MXN",
      oldPrice: "$4,599 MXN",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const currentHero = heroSlides[currentSlide];

  const handleWhatsAppQuote = () => {
    const text = `Hola Bruce Médica, solicito información y cotización para equipar mi clínica de fisioterapia.`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="ecom-home-wrapper">
      {/* 1. TOP PROMO TICKER BAR */}
      <div className="ecom-top-ticker">
        <div className="ticker-content">
          <span className="ticker-badge"><Zap size={13} /> OPORTUNIDAD CLÍNICA</span>
          <p>
            ¡Hasta <strong>25% OFF</strong> en Sistemas de Electroterapia! Envíos asegurados a todo México.
          </p>
        </div>
        <div className="ticker-right">
          <span><ShieldCheck size={14} /> Soporte Biomédico 24/7</span>
          <span className="divider">|</span>
          <span><Truck size={14} /> Facturación e IVA Incluido</span>
        </div>
      </div>

      <div className="container ecom-container">

        {/* 2. HERO ECOM SECTION (Main Banner + Right Side Bento Cards) */}
        <section className="ecom-hero-grid">
          {/* Main Hero Slider Banner */}
          <div className="ecom-hero-main-card">
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
                  <span className="price-label">Precio Especial</span>
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
                  Ver Especificaciones <ArrowRight size={16} />
                </button>
              </div>

              <div className="hero-slider-dots">
                {heroSlides.map((_, i) => (
                  <button 
                    key={i} 
                    className={`dot ${currentSlide === i ? "active" : ""}`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
            </div>

            {/* High Resolution Product Image Stage */}
            <div className="hero-main-img-stage">
              <div className="img-glow-backdrop"></div>
              <img 
                src={currentHero.image} 
                alt="Product Hero Showcase" 
                className="hero-real-product-img"
              />
              <div className="hero-badge-floating">
                <ShieldCheck size={16} className="text-blue" />
                <div>
                  <strong>Garantía 2 Años</strong>
                  <span>Directa Bruce Médica</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Stacked Bento Cards */}
          <div className="ecom-hero-side-bento">
            {/* Bento Card 1 */}
            <div className="side-bento-card bento-card-blue" onClick={() => navigate("/specialty")}>
              <img 
                src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=400&auto=format&fit=crop" 
                alt="THEAL Laser" 
                className="bento-bg-img"
              />
              <div className="bento-card-overlay">
                <span className="bento-badge">ALTA ESPECIALIDAD</span>
                <h3>Láser THEAL 92W</h3>
                <p>Potencia de grado hospitalario para analgesia inmediata.</p>
                <div className="bento-footer">
                  <span>Ver Ficha Técnica <ChevronRight size={16} /></span>
                  <div className="bento-price-tag">12 MSI</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="side-bento-card bento-card-dark" onClick={() => navigate("/specialty")}>
              <img 
                src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=400&auto=format&fit=crop" 
                alt="CUREO VR" 
                className="bento-bg-img"
              />
              <div className="bento-card-overlay">
                <span className="bento-badge badge-green">NEURO-REHABILITACIÓN</span>
                <h3>CUREO® 5.0 VR</h3>
                <p>Realidad virtual inmersiva clínica para terapia funcional.</p>
                <div className="bento-footer">
                  <span>Solicitar Demo <ChevronRight size={16} /></span>
                  <div className="bento-price-tag tag-green">DEMO GRATIS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CATEGORY CIRCULAR THUMBNAILS BAR */}
        <section className="ecom-categories-section">
          <div className="section-header">
            <div>
              <span className="sub-tag">CATEGORÍAS DESTACADAS</span>
              <h2 className="section-title">Explora por especialidad médica</h2>
            </div>
            <button className="btn-link-all" onClick={() => navigate("/shop")}>
              Ver todas las categorías <ArrowRight size={16} />
            </button>
          </div>

          <div className="categories-pill-grid">
            {categoriesList.map((cat, idx) => (
              <motion.div 
                key={idx}
                className="category-pill-card"
                whileHover={{ y: -6, scale: 1.03 }}
                onClick={() => navigate("/shop")}
              >
                <div className="cat-pill-img-box">
                  <img src={cat.image} alt={cat.name} className="cat-pill-img" />
                </div>
                <div className="cat-pill-info">
                  <h4>{cat.name}</h4>
                  <span>{cat.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. HOT DEALS / FLASH SALES SECTION WITH COUNTDOWN TIMER */}
        <section className="ecom-flash-section">
          <div className="flash-header-banner">
            <div className="flash-title-block">
              <div className="flame-badge"><Flame size={16} /> OFERTAS RELÁMPAGO</div>
              <h2>¡Descuentos Exclusivos de la Semana!</h2>
              <p>Precios especiales de importación directa con cupo de stock limitado.</p>
            </div>

            {/* Countdown Clock */}
            <div className="flash-timer-box">
              <span className="timer-label"><Clock size={15} /> Finaliza en:</span>
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
                  <span className="num">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="lbl">Seg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flash Deals Product Grid (4 Curated Items) */}
          <div className="flash-products-grid">
            {flashDeals.map((prod) => {
              const progressPct = Math.round((prod.soldCount / prod.totalStock) * 100);
              const isWished = wishlist.includes(prod.id);

              return (
                <div key={prod.id} className="ecom-product-card flash-card">
                  {/* Badges */}
                  <div className="card-badge-container">
                    {prod.badge && <span className="card-badge badge-red">{prod.badge}</span>}
                    <span className="card-badge badge-blue">12 MSI</span>
                  </div>

                  {/* Wishlist Button */}
                  <button 
                    className={`btn-wishlist ${isWished ? "active" : ""}`}
                    onClick={(e) => toggleWishlist(prod.id, e)}
                  >
                    <Heart size={16} fill={isWished ? "#ef4444" : "none"} />
                  </button>

                  {/* Image Stage */}
                  <div className="product-card-stage" onClick={() => onOpenProductModal(prod)}>
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
                    <span className="prod-category">{prod.category}</span>
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
                      <span className="price-main">${prod.price.toLocaleString("es-MX")} MXN</span>
                      {prod.originalPrice > prod.price && (
                        <span className="price-old">${prod.originalPrice.toLocaleString("es-MX")}</span>
                      )}
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="stock-progress-block">
                      <div className="stock-text">
                        <span>Vendidos: <strong>{prod.soldCount}</strong></span>
                        <span>Disponibles: <strong>{prod.totalStock - prod.soldCount}</strong></span>
                      </div>
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="btn-add-cart" onClick={() => onQuickAdd(prod)}>
                      <ShoppingCart size={16} /> Agregar al Carrito
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
                Todos
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
              return (
                <div key={prod.id} className="ecom-product-card">
                  {/* Badges */}
                  <div className="card-badge-container">
                    {prod.badge && <span className="card-badge badge-blue">{prod.badge}</span>}
                  </div>

                  {/* Wishlist */}
                  <button 
                    className={`btn-wishlist ${isWished ? "active" : ""}`}
                    onClick={(e) => toggleWishlist(prod.id, e)}
                  >
                    <Heart size={16} fill={isWished ? "#ef4444" : "none"} />
                  </button>

                  {/* Image Stage */}
                  <div className="product-card-stage" onClick={() => onOpenProductModal(prod)}>
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="product-real-img"
                    />
                  </div>

                  {/* Body */}
                  <div className="product-card-body">
                    <span className="prod-category">{prod.category}</span>
                    <h3 className="prod-title" onClick={() => onOpenProductModal(prod)}>
                      {prod.name}
                    </h3>

                    {/* Ratings */}
                    <div className="prod-rating-row">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star size={13} key={i} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span className="rating-val">{prod.rating}</span>
                      <span className="reviews-cnt">({prod.reviewsCount})</span>
                    </div>

                    {/* Price */}
                    <div className="prod-price-row">
                      <span className="price-main">${prod.price.toLocaleString("es-MX")} MXN</span>
                      {prod.originalPrice > prod.price && (
                        <span className="price-old">${prod.originalPrice.toLocaleString("es-MX")}</span>
                      )}
                    </div>

                    <div className="stock-status">
                      <span className="dot-green"></span> En Stock — Envío Inmediato
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

        {/* 6. PROMO BENTO BANNERS */}
        <section className="ecom-mid-banners-grid">
          <div className="mid-banner-card banner-gradient-blue" onClick={() => navigate("/contact")}>
            <img 
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600&auto=format&fit=crop" 
              alt="Financiamiento" 
              className="mid-banner-bg-img"
            />
            <div className="mid-banner-content">
              <span className="mid-tag">FINANCIAMIENTO CORPORATIVO</span>
              <h3>Equipa tu Consultorio hasta en 12 MSI</h3>
              <p>Aceptamos tarjetas de crédito corporativas y leasing biomédico directo.</p>
              <button className="btn-banner-action">
                Solicitar Cotización <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="mid-banner-card banner-gradient-dark" onClick={() => navigate("/about")}>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop" 
              alt="Capacitación" 
              className="mid-banner-bg-img"
            />
            <div className="mid-banner-content">
              <span className="mid-tag tag-green">CAPACITACIÓN INCLUIDA</span>
              <h3>Certificación Biomédica Gratuita</h3>
              <p>Entrenamiento técnico oficial para todo tu equipo de fisioterapeutas.</p>
              <button className="btn-banner-action btn-green">
                Academia Bruce <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* 7. SPOTLIGHT TRENDING PRODUCT FEATURE */}
        <section className="ecom-spotlight-section">
          <div className="spotlight-card">
            <div className="spotlight-left-info">
              <span className="spotlight-tag"><TrendingUp size={14} /> PRODUCTO ESTRELLA DEL MES</span>
              <h2>Pistola de Masaje Bruce Pro Pulse™</h2>
              <p>
                Terapia de percusión de grado profesional. Diseñada para desinflamar fibras musculares profundas y acelerar la recuperación articular de tus pacientes.
              </p>

              <div className="spotlight-highlights">
                <div className="hl-item">
                  <CheckCircle2 size={18} className="text-blue" />
                  <span>5 Velocidades variables de alta amplitud percutiva</span>
                </div>
                <div className="hl-item">
                  <CheckCircle2 size={18} className="text-blue" />
                  <span>Motor ultra silencioso QuietGlide™ de 60W</span>
                </div>
                <div className="hl-item">
                  <CheckCircle2 size={18} className="text-blue" />
                  <span>Incluye 6 cabezales anatómicos e estuche rígido</span>
                </div>
              </div>

              <div className="spotlight-price-box">
                <div>
                  <span className="sp-price-lbl">Precio Especial Clínica</span>
                  <div className="sp-price">$3,899 MXN</div>
                </div>
                <button className="btn-spotlight-buy" onClick={() => navigate("/shop")}>
                  <ShoppingBag size={18} /> Comprar Ahora
                </button>
              </div>
            </div>

            <div className="spotlight-right-img">
              <div className="spotlight-glow"></div>
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" 
                alt="Bruce Pro Pulse" 
                className="spotlight-real-img"
              />
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS FROM VERIFIED CLINICS */}
        <section className="ecom-testimonials-section">
          <div className="section-header text-center">
            <span className="sub-tag">RESEÑAS VERIFICADAS</span>
            <h2 className="section-title">Confianza de las mejores clínicas de México</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star size={14} key={i} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="test-quote">
                "El equipo Láser THEAL revolucionó mi consulta. Mis pacientes con inflamaciones severas sienten alivio desde la primera sesión. La atención de Bruce Médica fue impecable."
              </p>
              <div className="test-author">
                <div className="avatar">Dr</div>
                <div>
                  <h4>Dr. Alejandro Morales</h4>
                  <span>Director en Clínica KineFit — CDMX</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star size={14} key={i} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="test-quote">
                "Compré la pistola Bruce Pro Pulse y dos camillas. La entrega fue súper rápida y la garantía de 2 años me da una tranquilidad total en el día a día."
              </p>
              <div className="test-author">
                <div className="avatar bg-blue">Lic</div>
                <div>
                  <h4>Lic. Valeria Ramos</h4>
                  <span>Fisioterapeuta Deportiva — Guadalajara</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star size={14} key={i} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="test-quote">
                "La capacitación presencial que incluyeron con el electroestimulador hizo que todo mi equipo supiera sacarle el 100% al aparato desde el primer día."
              </p>
              <div className="test-author">
                <div className="avatar bg-green">Dr</div>
                <div>
                  <h4>Dr. Roberto Garza</h4>
                  <span>Centro de Rehabilitación Garza — Monterrey</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. CTA WHATSAPP & NEWSLETTER BAR */}
        <section className="ecom-cta-bar">
          <div className="cta-left-text">
            <h2>¿Dudas sobre qué equipo requiere tu consultorio?</h2>
            <p>Habla directamente con un Asesor Biomédico especializado por WhatsApp y recibe cotización formal inmediata.</p>
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
