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
  ChevronLeft,
  Activity,
  HeartPulse
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EcomHome.css";

export default function EcomHome({ onQuickAdd, onOpenProductModal, products = [], setCategoryFilter }) {
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

  const handleCategoryClick = (cat) => {
    const targetFilter = cat.filterName || cat.name;
    if (setCategoryFilter) {
      setCategoryFilter(targetFilter);
    }
    navigate(`/shop?category=${encodeURIComponent(targetFilter)}`);
  };

  // Minimalist compact categories list (5 items for 1 clean horizontal row)
  const categoriesList = [
    { name: "Electroterapia", count: "14 Equipos", image: "/images/hero_ultrasonido.png" },
    { name: "Terapia Manual", count: "18 Equipos", image: "/images/hero_massage_gun.png" },
    { name: "Alta Especialidad", count: "5 Sistemas", image: "/images/hero_vr.png" },
    { name: "Camillas & Mobiliario", count: "9 Equipos", image: "/images/cat_camilla.png" },
    { name: "Ejercicio Activo", count: "22 Equipos", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=300&auto=format&fit=crop" }
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

  // 1. DEDICATED FLASH DEALS (4 EXCLUSIVE OFFERS FOR FLASH SALES)
  const flashDeals = [
    {
      id: "flash-1",
      name: "Pistola de Masaje Bruce Pro Pulse™ 5V",
      description: "Terapia de percusión profunda con motor ultra silencioso de 60W y 6 cabezales ergonómicos.",
      price: 3899,
      originalPrice: 4899,
      discount: 20,
      badge: "20% OFF",
      category: "Terapia Manual",
      image: "/images/hero_massage_gun.png",
      rating: "5.0",
      reviewsCount: 320,
      soldCount: 14,
      totalStock: 16
    },
    {
      id: "flash-2",
      name: "Ultrasonido Terapéutico US Pro 3MHz",
      description: "Ondas profundas de 1 y 3 MHz para tratamiento acelerado de tejidos inflamados.",
      price: 8900,
      originalPrice: 11500,
      discount: 22,
      badge: "22% OFF",
      category: "Electroterapia",
      image: "/images/hero_ultrasonido.png",
      rating: "4.9",
      reviewsCount: 185,
      soldCount: 9,
      totalStock: 12
    },
    {
      id: "flash-3",
      name: "Kit de Vendajes Kinesiológicos (10 Rollos)",
      description: "Algodón elástico de alta adherencia y resistencia al agua para clínicas.",
      price: 2499,
      originalPrice: 3500,
      discount: 28,
      badge: "28% OFF",
      category: "Vendaje y Cuidado",
      image: "/images/cat_vendaje.png",
      rating: "4.8",
      reviewsCount: 94,
      soldCount: 22,
      totalStock: 25
    },
    {
      id: "flash-4",
      name: "Camilla Médica Hidráulica Pro Treatment",
      description: "Estructura reforzada de acero con ajuste hidráulico suave para consulta intensiva.",
      price: 12400,
      originalPrice: 14900,
      discount: 16,
      badge: "16% OFF",
      category: "Movilidad y Camillas",
      image: "/images/cat_camilla.png",
      rating: "4.9",
      reviewsCount: 62,
      soldCount: 5,
      totalStock: 6
    }
  ];

  // 2. DEDICATED FEATURED PRODUCTS (VARIED REAL DISTINCT ITEMS PER CATEGORY)
  const catalogFeaturedList = [
    {
      id: "feat-1",
      name: "Electroestimulador Chattanooga Intelect® 4C",
      description: "Estándar de oro en electroterapia clínica. 4 canales independientes.",
      price: 7499,
      originalPrice: 8900,
      discount: 15,
      badge: "Bestseller",
      category: "Electroterapia",
      catKey: "electro",
      image: "/images/hero_electroterapia.png",
      rating: "4.9",
      reviewsCount: 142
    },
    {
      id: "feat-2",
      name: "Láser de Alta Potencia THEAL 92W",
      description: "Fotobiomodulación directa para acelerar regeneración muscular profunda.",
      price: 12990,
      originalPrice: 15500,
      discount: 16,
      badge: "ALTA ESPECIALIDAD",
      category: "Alta Especialidad",
      catKey: "especialidad",
      image: "/images/chelt_laser_showcase.png",
      rating: "4.9",
      reviewsCount: 58
    },
    {
      id: "feat-3",
      name: "Sistema de Realidad Virtual CUREO® 5.0 VR",
      description: "Rehabilitación neuro-motora inmersiva con biofeedback en tiempo real.",
      price: 18500,
      originalPrice: 21000,
      discount: 12,
      badge: "VR NEURO-REHAB",
      category: "Alta Especialidad",
      catKey: "especialidad",
      image: "/images/cureo_vr_showcase.png",
      rating: "5.0",
      reviewsCount: 39
    },
    {
      id: "feat-4",
      name: "Rodillo Vibratorio Hyperice Vyper 3",
      description: "Rodillo de espuma de alta densidad con 3 niveles de vibración asistida.",
      price: 2999,
      originalPrice: 3499,
      discount: 14,
      badge: "MÚSCULO PROFUNDO",
      category: "Terapia Manual",
      catKey: "manual",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
      rating: "4.8",
      reviewsCount: 110
    },
    {
      id: "feat-5",
      name: "Balón de Ejercicio Suizo Gymnic Plus 65cm",
      description: "Resistencia anti-estallido para cinesiterapia y entrenamiento de postura.",
      price: 850,
      originalPrice: 1050,
      discount: 19,
      badge: "CINESITERAPIA",
      category: "Ejercicio Activo",
      catKey: "ejercicio",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      rating: "4.7",
      reviewsCount: 215
    },
    {
      id: "feat-6",
      name: "Bandas Elásticas Loop de Resistencia (Set 5)",
      description: "Set de látex natural para fortalecimiento graduado en clínica.",
      price: 499,
      originalPrice: 650,
      discount: 23,
      badge: "POPULAR",
      category: "Ejercicio Activo",
      catKey: "ejercicio",
      image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=800&auto=format&fit=crop",
      rating: "4.8",
      reviewsCount: 340
    },
    {
      id: "feat-7",
      name: "Camilla Portátil Madera de Haya Bruce Confort",
      description: "Acolchado de 5cm con sistema tensor de acero de alta resistencia.",
      price: 4590,
      originalPrice: 5300,
      discount: 13,
      badge: "MOVILIDAD",
      category: "Movilidad y Camillas",
      catKey: "camillas",
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
      rating: "4.9",
      reviewsCount: 88
    },
    {
      id: "feat-8",
      name: "Gel Conductor Electroterapia 5 Litros",
      description: "Gel de alta viscosidad no irritante para electrodos y ecografía.",
      price: 380,
      originalPrice: 450,
      discount: 15,
      badge: "INSUMOS",
      category: "Vendaje y Cuidado",
      catKey: "camillas",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
      rating: "4.9",
      reviewsCount: 165
    }
  ];

  // Filter Featured Products by active category tab
  const filteredProducts = catalogFeaturedList.filter(p => {
    if (activeTab === "all") return true;
    return p.catKey === activeTab;
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
                <Layers size={14} /> Todos
              </button>
              <button 
                className={`tab-btn ${activeTab === "electro" ? "active" : ""}`}
                onClick={() => setActiveTab("electro")}
              >
                <Zap size={14} /> Electroterapia
              </button>
              <button 
                className={`tab-btn ${activeTab === "manual" ? "active" : ""}`}
                onClick={() => setActiveTab("manual")}
              >
                <Activity size={14} /> Terapia Manual
              </button>
              <button 
                className={`tab-btn ${activeTab === "especialidad" ? "active" : ""}`}
                onClick={() => setActiveTab("especialidad")}
              >
                <Sparkles size={14} /> Alta Especialidad
              </button>
              <button 
                className={`tab-btn ${activeTab === "ejercicio" ? "active" : ""}`}
                onClick={() => setActiveTab("ejercicio")}
              >
                <HeartPulse size={14} /> Ejercicio & Rehab
              </button>
              <button 
                className={`tab-btn ${activeTab === "camillas" ? "active" : ""}`}
                onClick={() => setActiveTab("camillas")}
              >
                <ShieldCheck size={14} /> Camillas & Insumos
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
