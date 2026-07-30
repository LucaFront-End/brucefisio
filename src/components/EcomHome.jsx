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
    { name: "Ejercicio Activo", count: "22 Equipos", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=300&auto=format&fit=crop" }
  ];

  // Official Brands showcase list with official SVG brand logos
  const brandListShowcase = [
    { 
      id: "chattanooga", 
      name: "Chattanooga®", 
      tagline: "Estándar de Oro en Electroterapia & Ultrasonido Clínico",
      origin: "EE. UU.",
      svgLogo: (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1188 95" height="18" style={{ maxWidth: "120px" }}>
          <path d="M0 0 C9.36635898 7.43472115 16.48364705 16.56886464 18.72265625 28.57421875 C20.25828298 43.04371572 18.96297784 56.03422621 9.98828125 67.83203125 C1.10094857 78.17732077 -9.85969905 85.0188789 -23.62060547 86.46240234 C-41.05210168 87.55473939 -55.23139751 84.8019267 -69.02734375 73.53125 C-77.52996298 65.64260546 -82.64264373 55.28997642 -83.31640625 43.75390625 C-83.86240353 28.32058946 -80.68679565 16.5425107 -69.96875 5 C-51.45779107 -12.70613463 -20.92692934 -14.35717615 0 0 Z M-56 23.1875 C-60.61777084 29.85326526 -61.09060195 37.30455256 -60 45.1875 C-57.87526597 52.03177601 -54.17210799 57.46796223 -48 61.1875 C-38.94501248 65.63849233 -30.93477009 66.68678415 -21.3125 63.5625 C-13.3506044 60.35749965 -8.69893247 55.86989821 -5 48.1875 C-2.89155783 41.4123725 -3.08987122 33.52357362 -5.97265625 27.02734375 C-10.54368515 18.84120453 -17.25333206 15.10305598 -26 12.1875 C-37.98339161 11.07488678 -47.97628132 13.88812098 -56 23.1875 Z " transform="translate(833,8.8125)"></path>
          <path d="M0 0 C0.95519531 0.65935547 0.95519531 0.65935547 1.9296875 1.33203125 C11.11382984 8.41402546 16.40753356 19.7270139 18 31 C18.89146377 44.20052115 16.68407376 55.13630951 9 66 C8.33871094 66.95519531 8.33871094 66.95519531 7.6640625 67.9296875 C0.72926649 76.94893086 -11.03583148 82.61653899 -22 85 C-40.76385354 86.46482113 -55.13737873 84.09500259 -70.21484375 72.26171875 C-77.32669571 65.88698772 -83.40497797 55.42012991 -84.17700195 45.79272461 C-84.61444949 28.72878511 -82.77357615 16.24138071 -70.75 3.3125 C-51.33038142 -15.00469482 -21.21513455 -14.67318539 0 0 Z M-57 22 C-61.59221864 28.52228155 -62.73686697 35.76629817 -61.4375 43.5625 C-59.67772597 50.36378884 -54.92699937 56.31208928 -49 60 C-40.39930582 64.02110377 -32.60284186 65.51378355 -23.375 62.875 C-15.57136482 59.89693428 -10.7371367 55.54294209 -6.91015625 48.1484375 C-3.82793491 40.87280773 -4.28255382 33.38353729 -7.03125 26.06640625 C-10.54368515 18.84120453 -17.25333206 15.10305598 -26 12.1875 C-37.98339161 11.07488678 -47.97628132 13.88812098 -56 23.1875 Z " transform="translate(947,10)"></path>
          <path d="M0 0 C4.83532331 3.37386981 8.68851302 6.21040684 11.26171875 11.578125 C9.02293832 13.73592636 6.7689162 15.87710956 4.51171875 18.015625 C3.56039063 18.93311523 3.56039063 18.93311523 2.58984375 19.86914062 C1.97109375 20.45244141 1.35234375 21.03574219 0.71484375 21.63671875 C0.14926758 22.17611084 -0.41630859 22.71550293 -0.99902344 23.27124023 C-2.96157965 24.74591225 -4.29312835 25.35109274 -6.73828125 25.578125 C-9.11328125 23.390625 -9.11328125 23.390625 -11.73828125 20.578125 C-17.92346411 15.68751529 -25.73009764 12.90029316 -33.67578125 13.30078125 C-41.98586296 14.41823542 -48.24430006 17.09674627 -53.73828125 23.578125 C-58.34869905 30.2462999 -58.83726709 37.69409611 -57.73828125 45.578125 C-55.63773579 52.16579311 -52.48947694 56.78233584 -46.73828125 60.578125 C-38.90857377 64.42429709 -31.64720872 65.86303807 -23.11328125 63.453125 C-18.41289069 61.73952435 -16.41737115 59.79972121 -13.73828125 55.578125 C-13.07828125 53.268125 -12.41828125 50.958125 -11.73828125 48.578125 C-18.33828125 48.578125 -24.93828125 48.578125 -31.73828125 48.578125 C-31.73828125 43.958125 -31.73828125 39.338125 -31.73828125 34.578125 C-17.87828125 34.578125 -4.01828125 34.578125 10.26171875 34.578125 C10.26171875 51.078125 10.26171875 67.578125 10.26171875 84.578125 C6.96171875 84.578125 3.66171875 84.578125 0.26171875 84.578125 C-2.36328125 81.578125 -2.36328125 81.578125 -3.73828125 78.578125 C-4.19976563 78.90425781 -4.66125 79.23039062 -5.13671875 79.56640625 C-5.78898437 80.00339844 -6.44125 80.44039063 -7.11328125 80.890625 C-7.73976563 81.31988281 -8.36625 81.74914062 -9.01171875 82.19140625 C-16.44652732 85.97272006 -23.84751994 87.11201426 -32.11328125 87.015625 C-33.48963745 87.00426514 -33.48963745 87.00426514 -34.89379883 86.99267578 C-46.41229927 86.71374789 -55.27854923 83.02639557 -64.73828125 76.578125 C-66.28515625 75.52625 -66.28515625 75.52625 -67.86328125 74.453125 C-77.17975577 66.22489964 -81.46128422 55.19969788 -82.55078125 43.203125 C-83.28030483 28.00471706 -78.76553706 16.02793267 -68.73828125 4.578125 C-49.8982175 -12.29546745 -20.87444908 -13.31124289 0 0 Z " transform="translate(1057.73828125,8.421875)"></path>
          <path d="M0 0 C0.9583374 0.00523682 1.9166748 0.01047363 2.90405273 0.01586914 C4.45576172 0.02070313 4.45576172 0.02070313 6.03881836 0.02563477 C7.12743164 0.03401367 8.21604492 0.04239258 9.33764648 0.05102539 C10.97636719 0.05779297 10.97636719 0.05779297 12.64819336 0.06469727 C15.35723144 0.07652713 18.06616248 0.09300996 20.77514648 0.11352539 C28.60473122 16.17437949 36.35979188 32.25882612 43.8293457 48.4909668 C46.79792216 54.91998196 49.82286008 61.31576893 52.91967773 67.68383789 C53.26759369 68.39948914 53.61550964 69.11514038 53.97396851 69.85247803 C55.67709649 73.35164 57.38653175 76.84758496 59.10327148 80.34008789 C59.71920773 81.60047972 60.33509569 82.86089514 60.95092773 84.12133789 C61.496604 85.23138184 62.04228027 86.34142578 62.60449219 87.48510742 C63.77514648 90.11352539 63.77514648 90.11352539 63.77514648 92.11352539 C55.85514648 92.11352539 47.93514648 92.11352539 39.77514648 92.11352539 C37.79514648 88.15352539 35.81514648 84.19352539 33.77514648 80.11352539 C9.02514648 79.61852539 9.02514648 79.61852539 -16.22485352 79.11352539 C-17.21485352 82.08352539 -18.20485352 85.05352539 -19.22485352 88.11352539 C-19.88485352 89.43352539 -20.54485352 90.75352539 -21.22485352 92.11352539 C-29.14485352 92.11352539 -37.06485352 92.11352539 -45.22485352 92.11352539 C-44.31213233 87.54991944 -42.91197639 84.04658656 -40.86547852 79.95336914 C-40.52483368 79.25959671 -40.18418884 78.56582428 -39.83322144 77.85102844 C-39.1003017 76.35917961 -38.36489791 74.86854908 -37.6272583 73.37902832 C-35.6703172 69.42576063 -33.73296502 65.46292126 -31.79516602 61.50024414 C-31.40461029 60.70240509 -31.01405457 59.90456604 -30.61166382 59.08255005 C-27.09638414 51.88552437 -23.70124118 44.63826265 -20.34985352 37.36352539 C-16.27435212 28.52691234 -12.16542541 19.70875992 -7.97485352 10.92602539 C-7.50837402 9.94472656 -7.04189453 8.96342773 -6.5612793 7.95239258 C-6.13572754 7.06326172 -5.71017578 6.17413086 -5.27172852 5.25805664 C-4.89886719 4.47793213 -4.52600586 3.69780762 -4.1418457 2.89404297 C-2.72292808 0.13894015 -2.72292808 0.13894015 0 0 Z M8.77514648 28.11352539 C4.67726627 36.21349122 0.62164561 44.32806503 -3.22485352 52.55102539 C-3.52721924 53.19499268 -3.82958496 53.83895996 -4.14111328 54.50244141 C-5.60320721 57.19772502 -5.60320721 57.19772502 -6.22485352 60.11352539 C3.67514648 60.11352539 13.57514648 60.11352539 23.77514648 60.11352539 C21.23519108 52.45471047 21.23519108 52.45471047 18.07592773 45.20336914 C17.58930664 44.19467773 17.10268555 43.18598633 16.60131836 42.14672852 C16.10180664 41.12514648 15.60229492 40.10356445 15.08764648 39.05102539 C14.5765332 37.99463867 14.06541992 36.93825195 13.53881836 35.84985352 C12.28910775 33.26867552 11.03447527 30.69002069 9.77514648 28.11352539 C9.44514648 28.11352539 9.11514648 28.11352539 8.77514648 28.11352539 Z " transform="translate(1123.224853515625,0.886474609375)"></path>
          <path d="M0 0 C7.59 0 15.18 0 23 0 C33.17794727 20.15632695 42.90993832 40.52300663 52.37646484 61.02197266 C54.8293515 66.33266454 57.29248651 71.63669427 59.81640625 76.9140625 C60.24147461 77.80287109 60.66654297 78.69167969 61.10449219 79.60742188 C61.88687885 81.23797386 62.67248318 82.86698742 63.46191406 84.49414062 C66 89.78282588 66 89.78282588 66 92 C58.08 92 50.16 92 42 92 C40.02 88.04 38.04 84.08 36 80 C19.83 80 3.66 80 -13 80 C-14.98 83.96 -16.96 87.92 -19 92 C-26.92 92 -34.84 92 -43 92 C-40.74992423 85.24977268 -40.74992423 85.24977268 -39.23510742 82.07543945 C-38.89635086 81.36122833 -38.5575943 80.64701721 -38.20857239 79.91116333 C-37.84454819 79.15286224 -37.48052399 78.39456116 -37.10546875 77.61328125 C-36.7216655 76.80680145 -36.33786224 76.00032166 -35.94242859 75.16940308 C-34.69417528 72.54880358 -33.44092479 69.93062939 -32.1875 67.3125 C-31.3221715 65.4985763 -30.45710158 63.68452922 -29.59228516 61.87036133 C-24.19512045 50.55630074 -18.7697011 39.25579412 -13.3203125 27.96679688 C-8.83164524 18.66716901 -4.40767244 9.33828906 0 0 Z M11 28 C8.86128497 32.39536275 6.72510623 36.79194518 4.59130859 41.18969727 C3.86447287 42.68678373 3.13693501 44.18352952 2.40869141 45.67993164 C1.36437845 47.82610134 0.322565 49.97346818 -0.71875 52.12109375 C-1.04685669 52.79401962 -1.37496338 53.4669455 -1.7130127 54.16026306 C-3.30884771 56.95809676 -3.30884771 56.95809676 -4 60 C6.23 60 16.46 60 27 60 C19.81244035 43.85061056 19.81244035 43.85061056 12 28 C11.67 28 11.34 28 11 28 Z " transform="translate(1123.224853515625,0.886474609375)"></path>
          <path d="M0 0 C7.59 0 15.18 0 23 0 C33.17794727 20.15632695 42.90993832 40.52300663 52.37646484 61.02197266 C54.8293515 66.33266454 57.29248651 71.63669427 59.81640625 76.9140625 C60.24147461 77.80287109 60.66654297 78.69167969 61.10449219 79.60742188 C61.88687885 81.23797386 62.67248318 82.86698742 63.46191406 84.49414062 C66 89.78282588 66 89.78282588 66 92 C58.08 92 50.16 92 42 92 C40.02 88.04 38.04 84.08 36 80 C19.83 80 3.66 80 -13 80 C-14.98 83.96 -16.96 87.92 -19 92 C-26.92 92 -34.84 92 -43 92 C-40.74992423 85.24977268 -40.74992423 85.24977268 -39.23510742 82.07543945 C-38.89635086 81.36122833 -38.5575943 80.64701721 -38.20857239 79.91116333 C-37.84454819 79.15286224 -37.48052399 78.39456116 -37.10546875 77.61328125 C-36.7216655 76.80680145 -36.33786224 76.00032166 -35.94242859 75.16940308 C-34.69417528 72.54880358 -33.44092479 69.93062939 -32.1875 67.3125 C-31.3221715 65.4985763 -30.45710158 63.68452922 -29.59228516 61.87036133 C-24.19512045 50.55630074 -18.7697011 39.25579412 -13.3203125 27.96679688 C-8.83164524 18.66716901 -4.40767244 9.33828906 0 0 Z M11 28 C8.86128497 32.39536275 6.72510623 36.79194518 4.59130859 41.18969727 C3.86447287 42.68678373 3.13693501 44.18352952 2.40869141 45.67993164 C1.36437845 47.82610134 0.322565 49.97346818 -0.71875 52.12109375 C-1.04685669 52.79401962 -1.37496338 53.4669455 -1.7130127 54.16026306 C-3.30884771 56.95809676 -3.30884771 56.95809676 -4 60 C6.23 60 16.46 60 27 60 C19.81244035 43.85061056 19.81244035 43.85061056 12 28 C11.67 28 11.34 28 11 28 Z " transform="translate(12,28)"></path>
        </svg>
      ),
      products: [
        {
          id: "b-chat-1",
          name: "Electroestimulador Chattanooga Intelect® 4C",
          price: 7499,
          badge: "CLÍNICO APROBADO",
          image: "/images/hero_electroterapia.png",
          specs: "4 Canales • Pantalla Táctil • 25+ Protocolos"
        },
        {
          id: "b-chat-2",
          name: "Ultrasonido Terapéutico Chattanooga US Pro",
          price: 8900,
          badge: "FOTOTERAPIA",
          image: "/images/hero_ultrasonido.png",
          specs: "1 & 3 MHz Dual • Cabezal Ergonómico 5cm²"
        }
      ]
    },
    { 
      id: "brucepro", 
      name: "Bruce Pro™", 
      tagline: "Tecnología de Terapia de Percusión & Ergonomía Profesional",
      origin: "Bruce Médica",
      svgLogo: (
        <svg viewBox="0 0 200 40" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="30" height="30" rx="8" fill="url(#bruceGrad)"/>
          <text x="11" y="27" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#ffffff">B</text>
          <text x="40" y="26" fontFamily="sans-serif" fontWeight="900" fontSize="20" fill="currentColor">BRUCE <tspan fill="#007EE5">PRO</tspan></text>
          <defs>
            <linearGradient id="bruceGrad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#007EE5"/>
              <stop offset="1" stopColor="#003057"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      products: [
        {
          id: "b-bruce-1",
          name: "Pistola de Masaje Bruce Pro Pulse™ 5V",
          price: 3899,
          badge: "BESTSELLER",
          image: "/images/hero_massage_gun.png",
          specs: "Motor 60W • 6 Cabezales • Estuche Rígido"
        },
        {
          id: "b-bruce-2",
          name: "Camilla Portátil Madera de Haya Bruce Confort",
          price: 4590,
          badge: "RESISTENCIA 250KG",
          image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
          specs: "Espuma 5cm • Tensores de Acero • Bolsa de Viaje"
        }
      ]
    },
    { 
      id: "hyperice", 
      name: "Hyperice / Theragun", 
      tagline: "Recuperación de Alto Rendimiento Deportivo & Vibración Terapéutica",
      origin: "EE. UU.",
      svgLogo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138 18" fill="none" height="18" style={{ maxWidth: "130px" }}>
          <g transform="scale(0.09063)" fill="currentColor">
            <polygon points="400 0.01 240 160.01 320 160.01 480 0.01 400 0.01"></polygon>
            <polygon points="290 57.51 240 107.51 132.5 107.51 80 160.01 0 160.01 160 0.01 240 0.01 182.5 57.51 290 57.51"></polygon>
            <path d="M772.43,160h-28V89.38H668V160H640V0h28V66.21H744.4V0h28Z"></path>
            <path d="M790.08,178.55H800c11.48,0,16.33-.88,21.63-16.33l1.33-2.87-43-118.08h28.69l26.93,85.19,26.92-85.19H889.4L847.68,159.79c-11,30.68-19,38.84-45.68,38.84H790.08Z"></path>
            <path d="M922.5,57.16c7.06-11.7,19.42-18.54,35.31-18.54,28.91,0,51,24.06,51,62,0,38.18-22.07,62.24-51,62.24-15.89,0-28.25-6.84-35.31-18.54v54.29H896.23V41.27H922.5Zm58.93,43.48c0-24.94-11-40.61-29.36-40.61-17.21,0-30.68,13.24-30.68,40.61s13.47,40.83,30.68,40.83C970.39,141.47,981.43,125.8,981.43,100.64Z"></path>
            <path d="M1076.55,141c13.68,0,24.49-5.52,29.13-16.55h25.82c-5.52,19-23.17,38.4-53.85,38.4-38.18,0-60-29.13-60-63.12,0-35.76,24.5-61.14,58.26-61.14,36.42,0,59.15,29.58,56.95,69.52h-88.51C1046.09,130.21,1061.54,141,1076.55,141Zm29.57-52.09c-.66-18.54-14.79-29.79-30.24-29.79-12.36,0-29.35,7.28-31.56,29.79Z"></path>
            <path d="M1195.94,67.31c-16.55,0-26,6.63-26,30.46V160h-26.26V41.27h25.82V62.46c6.4-13.24,17.88-21.19,32.22-21.41,2,0,4.86.22,6.84.44V68Q1201.9,67.32,1195.94,67.31Z"></path>
            <path d="M1243.39,26.48h-26.26V0h26.26Zm0,133.53h-26.26V41.27h26.26Z"></path>
            <path d="M1339.62,81.88c-2.21-12.58-13.25-21.41-27.59-21.41-16.33,0-31.12,12.14-31.12,40.17,0,28.25,15,40.39,30.46,40.39,12.8,0,25.82-5.74,29.13-21.63h25.6c-5.3,27.81-29.79,43.48-55.18,43.48-34.42,0-57.16-26.71-57.16-62s23-62.24,58.27-62.24c25.82,0,48.77,16.78,53.19,43.26Z"></path>
            <path d="M1431.43,141c13.68,0,24.49-5.52,29.13-16.55h25.82c-5.52,19-23.17,38.4-53.85,38.4-38.18,0-60-29.13-60-63.12,0-35.76,24.5-61.14,58.26-61.14,36.42,0,59.15,29.58,57,69.52H1399.2C1401,130.21,1416.42,141,1431.43,141ZM1461,88.94c-.66-18.54-14.79-29.79-30.24-29.79-12.36,0-29.35,7.28-31.56,29.79Z"></path>
          </g>
        </svg>
      ),
      products: [
        {
          id: "b-hyp-1",
          name: "Rodillo Vibratorio Hyperice Vyper 3",
          price: 2999,
          badge: "VIBRACIÓN 3V",
          image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
          specs: "Espuma Alta Densidad • Batería 2h • Bluetooth"
        }
      ]
    },
    { 
      id: "kinesio", 
      name: "Kinesio Tex®", 
      tagline: "Cintas Neuromusculares & Vendaje Funcional Hipoalergénico",
      origin: "Japón",
      svgLogo: (
        <svg viewBox="0 0 240 55" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "130px" }}>
          <circle cx="25" cy="27" r="18" stroke="#00A0E3" strokeWidth="2.5"/>
          <circle cx="25" cy="27" r="12" stroke="#00A0E3" strokeWidth="2"/>
          <circle cx="25" cy="27" r="6" stroke="#00A0E3" strokeWidth="1.5"/>
          <text x="52" y="32" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="24" fill="currentColor">KINESIO</text>
          <text x="53" y="44" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7.5" fill="#00A0E3">Dr. Kenzo Kase Since 1979</text>
        </svg>
      ),
      products: [
        {
          id: "b-kin-1",
          name: "Kit de Vendajes Kinesiológicos Kinesio Classic (10 Rollos)",
          price: 2499,
          badge: "GRADO CLÍNICO",
          image: "/images/cat_vendaje.png",
          specs: "100% Algodón • Resistente al Agua • Adhesivo en Onda"
        }
      ]
    },
    { 
      id: "gymnic", 
      name: "Gymnic® Italia", 
      tagline: "Cinesiterapia, Reeducación Postural & Balones Terapéuticos",
      origin: "Italia",
      svgLogo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.4 50.7" height="18" style={{ maxWidth: "120px" }}>
          <path fill="#E40D2C" d="M23.6,34.1c0,3.2-1.1,5.9-3.4,8.2c-2.2,2.2-4.9,3.4-8.1,3.4c-2.8,0-5.2-0.9-7.4-2.7c-2.1-1.7-3.4-3.9-3.9-6.6h4.8c0.5,1.4,1.3,2.5,2.5,3.3c1.2,0.9,2.5,1.3,4,1.3c1.9,0,3.5-0.7,4.9-2.1c1.3-1.3,2-3,2-4.9v-2.3c-2,1.5-4.3,2.3-6.9,2.3c-3.2,0-5.9-1.1-8.2-3.4c-2.2-2.3-3.4-5-3.4-8.2c0-3.2,1.1-5.9,3.4-8.1c2.3-2.3,5-3.4,8.2-3.4h11.5V34.1z M19,15.7h-6.9c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2.1,3-2.1,4.9c0,1.9,0.7,3.5,2.1,4.9c1.3,1.4,3,2.1,4.9,2.1c1.9,0,3.5-0.7,4.9-2.1c1.3-1.3,2-3,2-4.9V15.7z"/>
          <path fill="#E40D2C" d="M51.4,34c0,3.2-1.1,5.9-3.4,8.2c-2.2,2.2-4.9,3.4-8.1,3.4c-2.8,0-5.2-0.9-7.4-2.7c-2.1-1.7-3.4-3.9-3.9-6.6h4.8c0.5,1.4,1.3,2.5,2.5,3.3c1.2,0.9,2.5,1.3,4,1.3c1.9,0,3.5-0.7,4.9-2.1c1.3-1.3,2-3,2-4.9v-2.3c-2,1.5-4.3,2.3-6.9,2.3c-3.2,0-5.9-1.1-8.2-3.4c-2.2-2.3-3.4-5-3.4-8.2V11h4.6v11.5c0,1.9,0.7,3.5,2,4.9c1.3,1.4,3,2.1,4.9,2.1c1.9,0,3.5-0.7,4.9-2.1c1.3-1.3,2-3,2-4.9V11h4.6V34z"/>
          <path fill="#E40D2C" d="M85.6,11c3.2,0,5.9,1.1,8.2,3.4c2.2,2.2,3.4,4.9,3.4,8.1v11.5h-4.6V22.6c0-1.9-0.7-3.5-2-4.9c-1.4-1.3-3-2-4.9-2c-1.9,0-3.5,0.7-4.9,2c-1.3,1.3-2,3-2,4.9v11.5h-4.6V22.6c0-1.9-0.7-3.5-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2.1,3-2.1,4.9v11.5h-4.6V22.6c0-3.2,1.1-5.9,3.4-8.1c2.3-2.3,5-3.4,8.2-3.4c3.8,0,6.9,1.5,9.2,4.6C78.7,12.6,81.8,11,85.6,11z"/>
          <path fill="#E40D2C" d="M113.1,11c3.2,0,5.9,1.1,8.1,3.4c2.3,2.2,3.4,4.9,3.4,8.1v11.5H120V22.6c0-1.9-0.7-3.5-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2.1,3-2.1,4.9v11.5h-4.6V22.6c0-3.2,1.1-5.9,3.4-8.1C107.2,12.2,109.9,11,113.1,11z"/>
          <path fill="#E40D2C" d="M134,6.4c-0.6,0.6-1.4,1-2.3,1c-0.9,0-1.7-0.3-2.3-1c-0.6-0.6-1-1.4-1-2.3c0-0.9,0.3-1.7,1-2.3c0.6-0.6,1.4-0.9,2.3-0.9c0.9,0,1.7,0.3,2.3,0.9c0.6,0.6,1,1.4,1,2.3C135,5,134.7,5.8,134,6.4z M129.5,11v23.1h4.6V11H129.5z"/>
          <path fill="#E40D2C" d="M161.1,29.5l-2.2,4.6h-8.2c-3.2,0-5.9-1.1-8.2-3.4c-2.2-2.3-3.4-5-3.4-8.2c0-3.2,1.1-5.9,3.4-8.1c2.3-2.3,5-3.4,8.2-3.4c2.8,0,5.2,0.9,7.3,2.7c2.1,1.7,3.4,3.9,4,6.6h-4.8c-0.5-1.4-1.3-2.5-2.5-3.3c-1.2-0.8-2.5-1.3-4-1.3c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2.1,3-2.1,4.9c0,1.9,0.7,3.5,2.1,4.9c1.3,1.4,3,2.1,4.9,2.1H161.1z"/>
          <circle fill="#999B9D" cx="206.3" cy="25.1" r="20"/>
        </svg>
      ),
      products: [
        {
          id: "b-gym-1",
          name: "Balón de Ejercicio Suizo Gymnic Plus 65cm",
          price: 850,
          badge: "ANTI-ESTALLIDO",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
          specs: "Soporta hasta 300kg • Libre de Látex • Fabricación Italiana"
        }
      ]
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
                    {(currentBrandObj?.products || []).map((prod) => (
                      <div key={prod.id} className="brand-product-card" onClick={() => onOpenProductModal(prod)}>
                        <div className="brand-prod-img-box">
                          <span className="brand-prod-badge">{prod.badge}</span>
                          <img src={prod.image} alt={prod.name} className="brand-prod-img" />
                        </div>
                        <div className="brand-prod-content">
                          <span className="brand-prod-specs">{prod.specs}</span>
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
