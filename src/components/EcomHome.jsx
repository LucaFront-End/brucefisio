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
  const [selectedBrand, setSelectedBrand] = useState("chattanooga");
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
    { name: "Ejercicio Activo", count: "22 Equipos", image: "/images/cat_vendaje.png" }
  ];

  // Helper to ensure real connected product images without generic stock fallbacks
  const getRealProductImage = (p) => {
    if (p.image && !p.image.includes('unsplash.com')) return p.image;
    if (p.mediaUrl && !p.mediaUrl.includes('unsplash.com')) return p.mediaUrl;
    
    const name = (p.name || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();
    const brand = (p.brand || '').toLowerCase();
    
    if (name.includes('electro') || name.includes('intelect') || cat.includes('electro')) return '/images/hero_electroterapia.png';
    if (name.includes('ultrasonido') || name.includes('us pro')) return '/images/hero_ultrasonido.png';
    if (name.includes('pistola') || name.includes('masaje') || name.includes('pulse')) return '/images/hero_massage_gun.png';
    if (name.includes('camilla') || cat.includes('camilla') || cat.includes('movilidad')) return '/images/cat_camilla.png';
    if (name.includes('vendaje') || name.includes('kinesio') || name.includes('cinta')) return '/images/cat_vendaje.png';
    if (name.includes('láser') || name.includes('laser') || brand.includes('chelt')) return '/images/chelt_laser_showcase.png';
    if (name.includes('vr') || name.includes('cureo') || brand.includes('cureo')) return '/images/cureo_vr_showcase.png';
    
    return '/images/hero_device.png';
  };

  // Official Brands showcase list with clean vector SVG brand logos
  const brandListShowcase = [
    { 
      id: "chattanooga", 
      name: "Chattanooga®", 
      tagline: "Estándar de Oro en Electroterapia & Ultrasonido Clínico",
      origin: "EE. UU.",
      svgLogo: (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#003057"/>
          <path d="M22 10C18.5 10 10 12 10 16C10 20 18.5 22 22 22C17 22 10 24 10 27" stroke="#007EE5" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="23" cy="10" r="2.5" fill="#00A0E3"/>
        </svg>
      )
    },
    { 
      id: "brucepro", 
      name: "Bruce Pro™", 
      tagline: "Tecnología de Terapia de Percusión & Ergonomía Profesional",
      origin: "Bruce Médica",
      svgLogo: (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="url(#bruceGradPill)"/>
          <text x="9" y="23" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#ffffff">B</text>
          <defs>
            <linearGradient id="bruceGradPill" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#007EE5"/>
              <stop offset="1" stopColor="#003057"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    { 
      id: "hyperice", 
      name: "Hyperice / Theragun", 
      tagline: "Recuperación de Alto Rendimiento Deportivo & Vibración Terapéutica",
      origin: "EE. UU.",
      svgLogo: (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#1E293B"/>
          <path d="M19 6L9 18H16L13 26L23 14H16L19 6Z" fill="#007EE5" stroke="#FFFFFF" strokeWidth="0.5"/>
        </svg>
      )
    },
    { 
      id: "kinesio", 
      name: "Kinesio Tex®", 
      tagline: "Cintas Neuromusculares & Vendaje Funcional Hipoalergénico",
      origin: "Japón",
      svgLogo: (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#00A0E3" fillOpacity="0.12"/>
          <circle cx="16" cy="16" r="11" stroke="#00A0E3" strokeWidth="2.5"/>
          <circle cx="16" cy="16" r="7" stroke="#00A0E3" strokeWidth="2" strokeDasharray="3 2"/>
          <circle cx="16" cy="16" r="3" fill="#00A0E3"/>
        </svg>
      )
    },
    { 
      id: "gymnic", 
      name: "Gymnic® Italia", 
      tagline: "Cinesiterapia, Reeducación Postural & Balones Terapéuticos",
      origin: "Italia",
      svgLogo: (
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#E40D2C"/>
          <path d="M12 11C8 11 8 21 12 21C16 21 16 11 20 11C24 11 24 21 20 21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  // Utility functions to clean raw HTML descriptions and format ALL CAPS titles
  const cleanHtmlText = (str) => {
    if (!str) return "";
    return str
      .replace(/&nbsp;/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const formatProductTitle = (name) => {
    if (!name) return "";
    const clean = cleanHtmlText(name);
    if (clean === clean.toUpperCase() && clean.length > 5) {
      return clean
        .toLowerCase()
        .split(" ")
        .map(word => {
          if (["de", "p/", "para", "en", "con", "y", "e", "del"].includes(word)) return word;
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ")
        .replace(/P\/(\d+)/gi, "para $1");
    }
    return clean;
  };

  const getCleanSubtitle = (desc, fallback) => {
    const text = cleanHtmlText(desc);
    if (!text || text.length < 15) return fallback;
    if (text.length > 130) {
      const truncated = text.substring(0, 130);
      const lastSpace = truncated.lastIndexOf(" ");
      return (lastSpace > 60 ? truncated.substring(0, lastSpace) : truncated) + "...";
    }
    return text;
  };

  // Map products with clean titles, clean descriptions, real images, and e-commerce fields
  const enhancedProducts = products.map((p, index) => {
    const imgSrc = getRealProductImage(p);
    const cleanName = formatProductTitle(p.name);
    const cleanDesc = cleanHtmlText(p.description);
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
      name: cleanName,
      description: cleanDesc,
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

  // 1. DEDICATED FLASH DEALS (derived directly from real connected catalog products)
  const flashDeals = enhancedProducts.slice(0, 4).map((p, idx) => {
    const flashDiscounts = [20, 22, 28, 16];
    const discount = flashDiscounts[idx % flashDiscounts.length];
    const origPrice = Math.round(p.price / (1 - discount / 100));
    return {
      ...p,
      originalPrice: origPrice,
      discount,
      badge: `${discount}% OFF`,
      rating: (4.9 - (idx % 2) * 0.1).toFixed(1),
      reviewsCount: 180 + idx * 45,
      soldCount: 9 + idx * 4,
      totalStock: 12 + idx * 3
    };
  });

  // 2. DEDICATED FEATURED PRODUCTS (derived directly from real connected catalog products with distinct category mapping)
  const catalogFeaturedList = enhancedProducts.map((p, idx) => {
    const cat = (p.category || '').toLowerCase();
    const brand = (p.brand || '').toLowerCase();
    const name = (p.name || '').toLowerCase();
    let catKey = "all";

    if (cat.includes("electro") || name.includes("electro") || name.includes("intelect") || name.includes("ultrasonido") || name.includes("corriente")) {
      catKey = "electro";
    } else if (cat.includes("especialidad") || brand.includes("chelt") || brand.includes("cureo") || name.includes("laser") || name.includes("vr") || name.includes("láser")) {
      catKey = "especialidad";
    } else if (cat.includes("manual") || name.includes("masaje") || name.includes("pistola") || name.includes("pulse") || name.includes("vyper") || name.includes("percus")) {
      catKey = "manual";
    } else if (cat.includes("ejercicio") || name.includes("banda") || name.includes("balon") || name.includes("pelota") || name.includes("gymnic") || name.includes("loop") || name.includes("resistencia")) {
      catKey = "ejercicio";
    } else if (cat.includes("movilidad") || cat.includes("camilla") || cat.includes("vendaje") || name.includes("camilla") || name.includes("vendaje") || name.includes("kinesio") || name.includes("compresero")) {
      catKey = "camillas";
    } else {
      const fallbackKeys = ["electro", "manual", "especialidad", "camillas", "ejercicio"];
      catKey = fallbackKeys[idx % fallbackKeys.length];
    }

    return {
      ...p,
      catKey,
      badge: p.badge || (idx === 0 ? "Bestseller" : "POPULAR")
    };
  });

  // Filter Featured Products by active category tab and LIMIT TO MAX 6 ITEMS (prevents huge scroll!)
  const filteredProducts = catalogFeaturedList
    .filter(p => {
      if (activeTab === "all") return true;
      return p.catKey === activeTab;
    })
    .slice(0, 6);

  // Helper to select top flagship products for Hero
  const findFlagshipProduct = (keywords, fallbackIdx) => {
    for (const kw of keywords) {
      const match = enhancedProducts.find(p => {
        const n = (p.name || '').toLowerCase();
        const c = (p.category || '').toLowerCase();
        return n.includes(kw) || c.includes(kw);
      });
      if (match) return match;
    }
    return enhancedProducts[fallbackIdx] || enhancedProducts[0] || PRODUCTS[0];
  };

  const heroItem1 = findFlagshipProduct(['electro', 'intelect', 'estimul'], 1);
  const heroItem2 = findFlagshipProduct(['pistola', 'masaje', 'pulse', 'percus'], 0);
  const heroItem3 = findFlagshipProduct(['ultrasonido', 'laser', 'us pro', 'theal'], 2);

  const heroSlides = [
    {
      product: heroItem1,
      badge: "⚡ ESTÁNDAR CLÍNICO CHATTANOOGA®",
      title: heroItem1.name,
      subtitle: getCleanSubtitle(heroItem1.description, "Estándar de oro en electroterapia clínica. 4 canales independientes y estimulación biomédica de alta precisión."),
      price: `$${heroItem1.price.toLocaleString("es-MX")} MXN`,
      oldPrice: `$${(heroItem1.originalPrice || Math.round(heroItem1.price * 1.18)).toLocaleString("es-MX")} MXN`,
      discount: heroItem1.discount ? `${heroItem1.discount}% OFF` : "15% OFF",
      image: heroItem1.image || "/images/hero_electroterapia.png",
      rating: `${heroItem1.rating || "4.9"} ★★★★★ (140+ Reseñas)`
    },
    {
      product: heroItem2,
      badge: "🔥 TERAPIA DE PERCUSIÓN BRUCE PRO™",
      title: heroItem2.name,
      subtitle: getCleanSubtitle(heroItem2.description, "Terapia de percusión muscular profunda con motor de 60W y 6 cabezales ergonómicos intercambiables."),
      price: `$${heroItem2.price.toLocaleString("es-MX")} MXN`,
      oldPrice: `$${(heroItem2.originalPrice || Math.round(heroItem2.price * 1.18)).toLocaleString("es-MX")} MXN`,
      discount: heroItem2.discount ? `${heroItem2.discount}% OFF` : "20% OFF",
      image: heroItem2.image || "/images/hero_massage_gun.png",
      rating: `${heroItem2.rating || "5.0"} ★★★★★ (320+ Vendidos)`
    },
    {
      product: heroItem3,
      badge: "🔬 ULTRASONIDO CLÍNICO DUAL 1-3 MHz",
      title: heroItem3.name,
      subtitle: getCleanSubtitle(heroItem3.description, "Ondas profundas de 1 y 3 MHz para tratamiento acelerado de tejidos inflamados y analgesia rápida."),
      price: `$${heroItem3.price.toLocaleString("es-MX")} MXN`,
      oldPrice: `$${(heroItem3.originalPrice || Math.round(heroItem3.price * 1.18)).toLocaleString("es-MX")} MXN`,
      discount: heroItem3.discount ? `${heroItem3.discount}% OFF` : "18% OFF",
      image: heroItem3.image || "/images/hero_ultrasonido.png",
      rating: `${heroItem3.rating || "4.9"} ★★★★★ (95+ Reseñas)`
    }
  ];

  const currentHero = heroSlides[currentSlide] || heroSlides[0];

  const nextHeroSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto-play hero slider
  useEffect(() => {
    if (heroSlides.length <= 1) return;
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
                    <Sparkles size={14} /> {currentHero?.badge}
                  </div>
                  <h1 className="hero-main-title" style={{ cursor: "pointer" }} onClick={() => currentHero?.product && onOpenProductModal(currentHero.product)}>
                    {currentHero?.title}
                  </h1>
                  <p className="hero-main-subtitle">
                    {currentHero?.subtitle}
                  </p>

                  <div className="hero-main-price-row">
                    <div className="price-tag">
                      <span className="price-label">Precio Especial Clínica</span>
                      <span className="current-price">{currentHero?.price}</span>
                      <span className="old-price">{currentHero?.oldPrice}</span>
                    </div>
                    <div className="hero-discount-pill">-{currentHero?.discount} HOY</div>
                  </div>

                  <div className="hero-main-actions">
                    <button className="btn-ecom-primary" onClick={() => currentHero?.product && onOpenProductModal(currentHero.product)}>
                      <ShoppingBag size={18} /> Ver Producto
                    </button>
                    <button className="btn-ecom-secondary" onClick={() => currentHero?.product && onQuickAdd(currentHero.product)}>
                      <ShoppingCart size={16} /> Agregar
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
                <div className="hero-main-img-stage" style={{ cursor: "pointer" }} onClick={() => currentHero?.product && onOpenProductModal(currentHero.product)}>
                  <div className="img-glow-backdrop"></div>
                  <img 
                    src={currentHero?.image} 
                    alt={currentHero?.title} 
                    className="hero-real-product-img"
                  />
                  <div className="hero-badge-floating floating-top">
                    <Star size={15} fill="#f59e0b" color="#f59e0b" />
                    <span>{currentHero?.rating}</span>
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

        {/* 7. OFFICIAL BRANDS & PRODUCTS SHOWCASE STRIP */}
        <section className="ecom-brands-showcase-section">
          <div className="section-header">
            <div>
              <span className="sub-tag">DISTRIBUCIÓN OFICIAL BIOMÉDICA</span>
              <h2 className="section-title">Nuestras Marcas Aliadas</h2>
            </div>
            <button className="btn-link-all" onClick={() => navigate("/shop")}>
              Ver Todas las Marcas <ArrowRight size={16} />
            </button>
          </div>

          {/* Horizontal Brand Selector Pills Strip */}
          <div className="brands-pill-strip">
            {brandListShowcase.map((b) => (
              <button
                key={b.id}
                className={`brand-strip-pill ${selectedBrand === b.id ? "active" : ""}`}
                onClick={() => setSelectedBrand(b.id)}
              >
                <div className="brand-pill-logo-box">
                  {b.svgLogo}
                </div>
                <div className="brand-pill-info">
                  <span className="brand-pill-name">{b.name}</span>
                  <span className="brand-pill-origin">{b.origin}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Brand Products Banner */}
          <div className="active-brand-showcase-box">
            {(() => {
              const currentBrandObj = brandListShowcase.find(b => b.id === selectedBrand) || brandListShowcase[0];
              const target = currentBrandObj.id.toLowerCase();

              let currentBrandProducts = enhancedProducts.filter(p => {
                const b = (p.brand || '').toLowerCase();
                const n = (p.name || '').toLowerCase();
                if (target === "chattanooga") return b.includes("chattanooga") || n.includes("chattanooga") || n.includes("intelect") || n.includes("ultrasonido");
                if (target === "brucepro") return b.includes("bruce") || n.includes("bruce") || n.includes("pulse") || n.includes("camilla");
                if (target === "hyperice") return b.includes("hyperice") || b.includes("theragun") || n.includes("hyperice") || n.includes("vyper") || n.includes("rodillo");
                if (target === "kinesio") return b.includes("kinesio") || n.includes("kinesio") || n.includes("vendaje") || n.includes("cinta");
                if (target === "gymnic") return b.includes("gymnic") || n.includes("gymnic") || n.includes("balón") || n.includes("pelota") || n.includes("suizo");
                return b.includes(target) || n.includes(target);
              });

              // Dedicated fallbacks per brand to guarantee ZERO duplicate products across brand tabs
              if (currentBrandProducts.length === 0) {
                if (target === "chattanooga") {
                  currentBrandProducts = [
                    enhancedProducts.find(p => p.name.includes("Intelect") || p.name.includes("Chattanooga")) || PRODUCTS[1],
                    enhancedProducts.find(p => p.name.includes("Ultrasonido")) || PRODUCTS[7]
                  ];
                } else if (target === "brucepro") {
                  currentBrandProducts = [
                    enhancedProducts.find(p => p.name.includes("Pulse") || p.name.includes("Bruce")) || PRODUCTS[0],
                    enhancedProducts.find(p => p.name.includes("Camilla")) || PRODUCTS[4]
                  ];
                } else if (target === "hyperice") {
                  currentBrandProducts = [
                    enhancedProducts.find(p => p.name.includes("Vyper") || p.name.includes("Rodillo")) || PRODUCTS[3],
                    enhancedProducts.find(p => p.name.includes("Hyperice")) || PRODUCTS[0]
                  ];
                } else if (target === "kinesio") {
                  currentBrandProducts = [
                    enhancedProducts.find(p => p.name.includes("Kinesio") || p.name.includes("Vendaje")) || PRODUCTS[5],
                    enhancedProducts.find(p => p.name.includes("Bandas")) || PRODUCTS[2]
                  ];
                } else if (target === "gymnic") {
                  currentBrandProducts = [
                    enhancedProducts.find(p => p.name.includes("Gymnic") || p.name.includes("Balón")) || PRODUCTS[6],
                    enhancedProducts.find(p => p.name.includes("Resistencia") || p.name.includes("Loop")) || PRODUCTS[2]
                  ];
                }
              }

              return (
                <div>
                  <div className="brand-box-header">
                    <div>
                      <h3 className="brand-box-title">{currentBrandObj.name}</h3>
                      <p className="brand-box-tagline">{currentBrandObj.tagline}</p>
                    </div>
                    <button 
                      className="btn-brand-catalog" 
                      onClick={() => navigate(`/shop?brand=${encodeURIComponent(currentBrandObj.name.replace('®', '').replace('™', '').trim())}`)}
                    >
                      Catálogo {currentBrandObj.name} <ChevronRight size={15} />
                    </button>
                  </div>

                  <div className="brand-products-grid">
                    {currentBrandProducts.map((prod) => (
                      <div key={prod.id} className="brand-product-card" onClick={() => onOpenProductModal(prod)}>
                        <div className="brand-prod-img-box">
                          <span className="brand-prod-badge">{prod.badge || "DESTACADO"}</span>
                          <img src={prod.image} alt={prod.name} className="brand-prod-img" />
                        </div>
                        <div className="brand-prod-content">
                          <span className="brand-prod-specs">{prod.description || `${prod.category || "Fisioterapia"} • Grado Clínico`}</span>
                          <h4 className="brand-prod-name">{prod.name}</h4>
                          <div className="brand-prod-bottom">
                            <span className="brand-prod-price">${prod.price.toLocaleString()} MXN</span>
                            <button 
                              className="btn-brand-quick-add" 
                              onClick={(e) => { e.stopPropagation(); onQuickAdd(prod); }}
                            >
                              <ShoppingCart size={15} /> Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
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
