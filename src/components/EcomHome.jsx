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
  Percent, 
  Award, 
  MessageCircle,
  TrendingUp,
  Headphones,
  Check,
  RotateCcw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EcomHome.css";

export default function EcomHome({ onQuickAdd, onOpenProductModal, products = [] }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  
  // Live Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
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

  // Categories list with icons & counts
  const categoriesList = [
    { name: "Electroterapia", count: "14 Equipos", icon: "⚡", bg: "#e0f2fe" },
    { name: "Terapia Manual", count: "18 Equipos", icon: "🖐️", bg: "#dcfce7" },
    { name: "Ejercicio Activo", count: "22 Equipos", icon: "🏋️", bg: "#fef3c7" },
    { name: "Movilidad y Camillas", count: "9 Equipos", icon: "🛋️", bg: "#f3e8ff" },
    { name: "Vendaje y Cuidado", count: "35 Prod.", icon: "🩹", bg: "#ffe4e6" },
    { name: "Alta Especialidad", count: "5 Sistemas", icon: "🔬", bg: "#e0e7ff" }
  ];

  // Map products with enhanced e-commerce mock fields
  const enhancedProducts = products.map((p, index) => {
    const discounts = [15, 20, 25, 10, 30, 0];
    const discount = discounts[index % discounts.length];
    const originalPrice = discount > 0 ? Math.round(p.price / (1 - discount / 100)) : p.price;
    const rating = (4.7 + (index % 4) * 0.1).toFixed(1);
    const reviewsCount = 18 + index * 12;
    const soldCount = 4 + index * 3;
    const totalStock = soldCount + 3 + (index % 4);
    const badge = index === 0 ? "Bestseller" : index === 1 ? "Oferta Flash" : index === 2 ? "Nuevo" : discount > 0 ? `-${discount}%` : null;
    
    return {
      ...p,
      discount,
      originalPrice,
      rating,
      reviewsCount,
      soldCount,
      totalStock,
      badge
    };
  });

  const flashDeals = enhancedProducts.slice(0, 4);
  
  const filteredProducts = enhancedProducts.filter(p => {
    if (activeTab === "bestsellers") return p.rating >= 4.8 || p.badge === "Bestseller";
    if (activeTab === "deals") return p.discount > 0;
    if (activeTab === "new") return p.badge === "Nuevo" || p.id.includes("3") || p.id.includes("5");
    return true;
  });

  const spotlightProduct = enhancedProducts[0] || {};

  const handleWhatsAppQuote = () => {
    const text = `Hola Bruce Médica, me interesa solicitar asesoría para equipar mi clínica de fisioterapia.`;
    window.open(`https://wa.me/5215555750108?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="ecom-home-wrapper">
      {/* 1. TOP PROMO TICKER BAR */}
      <div className="ecom-top-ticker">
        <div className="ticker-content">
          <span className="ticker-badge"><Zap size={14} /> OFERTA CLÍNICA</span>
          <p>
            ¡Hasta <strong>25% OFF</strong> en Sistemas de Electroterapia + Envíos Asegurados Gratis en compras mayores a $2,999 MXN
          </p>
        </div>
        <div className="ticker-right">
          <span><ShieldCheck size={14} /> Soporte Biomédico 24/7</span>
          <span className="divider">|</span>
          <span><Truck size={14} /> Envíos a todo México</span>
        </div>
      </div>

      <div className="container ecom-container">

        {/* 2. HERO ECOM SECTION (Main Banner + Right Side Stacked Bento) */}
        <section className="ecom-hero-grid">
          {/* Main Hero Banner */}
          <div className="ecom-hero-main-card">
            <div className="hero-main-content">
              <div className="hero-main-badge">
                <Sparkles size={14} /> TECNOLOGÍA MÉDICA CERTIFICADA
              </div>
              <h1 className="hero-main-title">
                Equipamiento Clínico de <span className="highlight-blue">Alta Especialidad</span>
              </h1>
              <p className="hero-main-subtitle">
                Diseñada para desinflamar rápido, no fallar nunca y maximizar la rentabilidad de tus sesiones diarias.
              </p>

              <div className="hero-main-price-row">
                <div className="price-tag">
                  <span className="price-label">Desde</span>
                  <span className="current-price">$3,899 MXN</span>
                  <span className="old-price">$4,599 MXN</span>
                </div>
                <div className="hero-discount-pill">-15% OFF ESTA SEMANA</div>
              </div>

              <div className="hero-main-actions">
                <button className="btn-ecom-primary" onClick={() => navigate("/shop")}>
                  <ShoppingBag size={18} /> Explorar Catálogo
                </button>
                <button className="btn-ecom-secondary" onClick={() => navigate("/specialty")}>
                  Ver Alta Especialidad <ArrowRight size={16} />
                </button>
              </div>

              <div className="hero-trust-micro">
                <span><CheckCircle2 size={15} className="text-blue" /> Garantía de 2 Años</span>
                <span><CheckCircle2 size={15} className="text-blue" /> Envío Express 24-48h</span>
                <span><CheckCircle2 size={15} className="text-blue" /> Facturación Inmediata</span>
              </div>
            </div>

            <div className="hero-main-img-stage">
              <div className="img-glow-backdrop"></div>
              {spotlightProduct.imageSvg ? (
                <div 
                  className="hero-product-svg"
                  dangerouslySetInnerHTML={{ __html: spotlightProduct.imageSvg }}
                />
              ) : (
                <div className="hero-product-placeholder">⚡</div>
              )}
              
              <div className="floating-stat-badge stat-top-right">
                <Flame size={16} className="text-orange" />
                <div>
                  <strong>+320 Clínicas</strong>
                  <span>Equipadas en México</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Bento Banners */}
          <div className="ecom-hero-side-bento">
            {/* Top Right Offer Card */}
            <div className="side-bento-card bento-blue" onClick={() => navigate("/specialty")}>
              <div className="bento-badge">OFERTA ESPECIAL</div>
              <h3>Sistemas Láser THEAL 92W</h3>
              <p>Potencia de grado hospitalario para analgesia inmediata.</p>
              <div className="bento-footer">
                <span className="bento-link">Ver Especificaciones <ChevronRight size={16} /></span>
                <div className="bento-pill-tag">HASTA 12 MSI</div>
              </div>
            </div>

            {/* Bottom Right Offer Card */}
            <div className="side-bento-card bento-dark" onClick={() => navigate("/specialty")}>
              <div className="bento-badge badge-green">REHABILITACIÓN VR</div>
              <h3>CUREO® 5.0 Sensor</h3>
              <p>Realidad virtual inmersiva clínica para neuro-rehabilitación.</p>
              <div className="bento-footer">
                <span className="bento-link">Solicitar Demo Virtual <ChevronRight size={16} /></span>
                <div className="bento-pill-tag tag-green">DEMO GRATIS</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TRUST BADGES FEATURE BAR */}
        <section className="ecom-trust-bar">
          <div className="trust-item">
            <div className="trust-icon-box"><Truck size={22} /></div>
            <div>
              <h4>Envío Asegurado</h4>
              <p>Despacho directo a tu clínica en todo México</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box"><ShieldCheck size={22} /></div>
            <div>
              <h4>Garantía Biomédica 2 Años</h4>
              <p>Reemplazo express y soporte continuo</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box"><CreditCard size={22} /></div>
            <div>
              <h4>Pagos Seguros y MSI</h4>
              <p>Tarjetas, transferencias y financiamiento</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box"><Award size={22} /></div>
            <div>
              <h4>Certificación Clínica</h4>
              <p>Capacitación oficial incluida con tu equipo</p>
            </div>
          </div>
        </section>

        {/* 4. CATEGORY CIRCULAR ICON PILLS BAR */}
        <section className="ecom-categories-section">
          <div className="section-header">
            <div>
              <span className="sub-tag">EXPLORAR POR CATEGORÍA</span>
              <h2 className="section-title">Encuentra el equipo ideal para tu espacio</h2>
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
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => navigate("/shop")}
              >
                <div className="cat-pill-icon" style={{ background: cat.bg }}>
                  <span>{cat.icon}</span>
                </div>
                <div className="cat-pill-info">
                  <h4>{cat.name}</h4>
                  <span>{cat.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. HOT FLASH DEALS SECTION WITH COUNTDOWN TIMER & PROGRESS BAR */}
        <section className="ecom-flash-section">
          <div className="flash-header-banner">
            <div className="flash-title-block">
              <div className="flame-badge"><Flame size={18} /> OFERTA RELÁMPAGO</div>
              <h2>¡Descuentos Exclusivos de la Semana!</h2>
              <p>Precios especiales con cupo limitado de importación directa.</p>
            </div>

            {/* Countdown Clock */}
            <div className="flash-timer-box">
              <span className="timer-label"><Clock size={16} /> La oferta termina en:</span>
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

          {/* Flash Deals Product Grid */}
          <div className="flash-products-grid">
            {flashDeals.map((prod) => {
              const progressPct = Math.round((prod.soldCount / prod.totalStock) * 100);
              const isWished = wishlist.includes(prod.id);

              return (
                <div key={prod.id} className="ecom-product-card flash-card">
                  {/* Badge */}
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

                  {/* Product Stage */}
                  <div className="product-card-stage" onClick={() => onOpenProductModal(prod)}>
                    <div className="stage-glow" style={{ background: prod.imageBg }}></div>
                    {prod.imageSvg ? (
                      <div 
                        className="card-svg-thumb"
                        dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                      />
                    ) : (
                      <div className="card-img-placeholder">⚙️</div>
                    )}

                    <div className="quick-view-overlay">
                      <button className="btn-quick-view">
                        <Eye size={16} /> Vista Rápida
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
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
                      <div className="price-group">
                        <span className="price-main">${prod.price.toLocaleString("es-MX")} MXN</span>
                        {prod.discount > 0 && (
                          <span className="price-old">${prod.originalPrice.toLocaleString("es-MX")} MXN</span>
                        )}
                      </div>
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

        {/* 6. FEATURED PRODUCTS TABBED SECTION */}
        <section className="ecom-featured-section">
          <div className="section-header">
            <div>
              <span className="sub-tag">CATÁLOGO SELECCIONADO</span>
              <h2 className="section-title">Productos Destacados para Fisioterapia</h2>
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

          {/* Grid of Products */}
          <div className="ecom-products-grid">
            {filteredProducts.map((prod) => {
              const isWished = wishlist.includes(prod.id);
              return (
                <div key={prod.id} className="ecom-product-card">
                  {/* Badge */}
                  <div className="card-badge-container">
                    {prod.badge && <span className="card-badge badge-blue">{prod.badge}</span>}
                  </div>

                  {/* Wishlist Button */}
                  <button 
                    className={`btn-wishlist ${isWished ? "active" : ""}`}
                    onClick={(e) => toggleWishlist(prod.id, e)}
                  >
                    <Heart size={16} fill={isWished ? "#ef4444" : "none"} />
                  </button>

                  {/* Stage */}
                  <div className="product-card-stage" onClick={() => onOpenProductModal(prod)}>
                    <div className="stage-glow" style={{ background: prod.imageBg }}></div>
                    {prod.imageSvg ? (
                      <div 
                        className="card-svg-thumb"
                        dangerouslySetInnerHTML={{ __html: prod.imageSvg }}
                      />
                    ) : (
                      <div className="card-img-placeholder">⚡</div>
                    )}
                  </div>

                  {/* Body */}
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
                      <div className="price-group">
                        <span className="price-main">${prod.price.toLocaleString("es-MX")} MXN</span>
                        {prod.discount > 0 && (
                          <span className="price-old">${prod.originalPrice.toLocaleString("es-MX")} MXN</span>
                        )}
                      </div>
                    </div>

                    <div className="stock-status">
                      <span className="dot-green"></span> En Stock — Envío inmediato
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

        {/* 7. DUAL MID PROMO BENTO BANNERS */}
        <section className="ecom-mid-banners-grid">
          <div className="mid-banner-card banner-gradient-blue" onClick={() => navigate("/contact")}>
            <div className="mid-banner-content">
              <span className="mid-tag">FINANCIAMIENTO CLÍNICO</span>
              <h3>Equipa tu Consultorio hasta en 12 MSI</h3>
              <p>Aceptamos todas las tarjetas de crédito corporativas y leasing biomédico.</p>
              <button className="btn-banner-action">
                Solicitar Cotización a Medida <ArrowRight size={16} />
              </button>
            </div>
            <div className="mid-banner-graphic">
              <CreditCard size={80} className="banner-icon-bg" />
            </div>
          </div>

          <div className="mid-banner-card banner-gradient-dark" onClick={() => navigate("/about")}>
            <div className="mid-banner-content">
              <span className="mid-tag tag-green">CAPACITACIÓN OFICIAL</span>
              <h3>Certificación Biomédica Incluida</h3>
              <p>Entrenamiento presencial u online para todo tu equipo de fisioterapeutas.</p>
              <button className="btn-banner-action btn-green">
                Conocer la Academia Bruce <ArrowRight size={16} />
              </button>
            </div>
            <div className="mid-banner-graphic">
              <Award size={80} className="banner-icon-bg" />
            </div>
          </div>
        </section>

        {/* 8. SPOTLIGHT TRENDING PRODUCT FEATURE */}
        <section className="ecom-spotlight-section">
          <div className="spotlight-card">
            <div className="spotlight-left-info">
              <span className="spotlight-tag"><TrendingUp size={14} /> PRODUCTO ESTRELLA DEL MES</span>
              <h2>Electroestimulador Chattanooga Intelect Advanced</h2>
              <p>
                El estándar de oro en clínicas de fisioterapia en todo el mundo. 4 canales independientes, protocolos clínicos prediseñados y pantalla táctil de alta definición.
              </p>

              <div className="spotlight-highlights">
                <div className="hl-item">
                  <CheckCircle2 size={18} className="text-blue" />
                  <span>Alivio inmediato del dolor crónico y agudo</span>
                </div>
                <div className="hl-item">
                  <CheckCircle2 size={18} className="text-blue" />
                  <span>Fortalecimiento muscular en recuperaciones post-quirúrgicas</span>
                </div>
                <div className="hl-item">
                  <CheckCircle2 size={18} className="text-blue" />
                  <span>Pantalla táctil a color con guía anatómica 3D</span>
                </div>
              </div>

              <div className="spotlight-price-box">
                <div>
                  <span className="sp-price-lbl">Precio Especial Clínica</span>
                  <div className="sp-price">$7,499 MXN</div>
                </div>
                <button className="btn-spotlight-buy" onClick={() => navigate("/shop")}>
                  <ShoppingBag size={18} /> Comprar Ahora
                </button>
              </div>
            </div>

            <div className="spotlight-right-img">
              <div className="spotlight-glow"></div>
              <div className="spotlight-img-box">
                <div className="badge-3d">3D PREVIEW</div>
                {spotlightProduct.imageSvg ? (
                  <div 
                    className="spotlight-svg"
                    dangerouslySetInnerHTML={{ __html: spotlightProduct.imageSvg }}
                  />
                ) : (
                  <div className="spotlight-placeholder">⚡</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 9. TESTIMONIALS FROM VERIFIED CLINICS */}
        <section className="ecom-testimonials-section">
          <div className="section-header text-center">
            <span className="sub-tag">TESTIMONIOS REALES</span>
            <h2 className="section-title">Lo que dicen los fisioterapeutas líderes en México</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star size={14} key={i} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="test-quote">
                "El equipo Láser THEAL revolucionó mi consulta. Mis pacientes con inflamaciones severas sienten alivio desde la primera sesión. La atención de Bruce Médica fue de 10."
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

        {/* 10. NEWSLETTER & WHATSAPP SUPPORT BAR */}
        <section className="ecom-cta-bar">
          <div className="cta-left-text">
            <h2>¿Tienes dudas sobre qué equipo necesita tu clínica?</h2>
            <p>Habla directamente con un Asesor Biomédico especializado por WhatsApp y recibe cotización inmediata.</p>
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
