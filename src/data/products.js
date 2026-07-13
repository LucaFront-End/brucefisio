// Data mock for Bruce Médica Physiotherapy E-commerce

export const CATEGORIES = [
  "Electroterapia",
  "Terapia Manual",
  "Ejercicio Activo",
  "Movilidad y Camillas",
  "Vendaje y Cuidado"
];

export const BRANDS = [
  "Chattanooga",
  "Theragun",
  "Bruce Pro",
  "Hyperice",
  "Kinesio",
  "Gymnic"
];

export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Pistola de Masaje Bruce Pro Pulse",
    description: "Terapia de percusión profesional con 5 velocidades, motor ultra silencioso y 6 cabezales intercambiables para terapia muscular profunda.",
    price: 3899,
    category: "Terapia Manual",
    brand: "Bruce Pro",
    imageBg: "linear-gradient(135deg, #ccfbf1 0%, #0d9488 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="12" height="35" rx="6" fill="#1e293b"/>
        <rect x="35" y="35" width="40" height="15" rx="7" fill="#0f172a"/>
        <circle cx="75" cy="42.5" r="10" fill="#0d9488"/>
        <rect x="50" y="47" width="10" height="25" rx="3" fill="#475569" transform="rotate(-15 50 47)"/>
        <rect x="30" y="55" width="22" height="8" rx="4" fill="#0d9488"/>
      </svg>
    `,
    variables: {
      name: "Color",
      options: ["Negro Mate", "Gris Titanio", "Blanco Glaciar"]
    }
  },
  {
    id: "prod-2",
    name: "Electroestimulador Chattanooga Intelect",
    description: "Dispositivo de electroterapia de 4 canales para el alivio del dolor y fortalecimiento muscular. Incluye programas preestablecidos clínicos.",
    price: 7499,
    category: "Electroterapia",
    brand: "Chattanooga",
    imageBg: "linear-gradient(135deg, #e0f2fe 0%, #0284c7 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="10" fill="#0f172a"/>
        <rect x="28" y="28" width="44" height="28" rx="4" fill="#1e293b"/>
        <circle cx="38" cy="68" r="5" fill="#0d9488"/>
        <circle cx="50" cy="68" r="5" fill="#38bdf8"/>
        <circle cx="62" cy="68" r="5" fill="#64748b"/>
        <rect x="32" y="32" width="36" height="20" rx="2" fill="#0d9488" fill-opacity="0.2"/>
        <path d="M36 45 Q 43 38, 50 45 T 64 45" stroke="#38bdf8" stroke-width="2" fill="none"/>
      </svg>
    `,
    variables: {
      name: "Canales",
      options: ["2 Canales", "4 Canales Clínico"]
    }
  },
  {
    id: "prod-3",
    name: "Bandas Elásticas Loop de Resistencia",
    description: "Set de bandas de látex natural de alta resistencia para ejercicios de fortalecimiento, rehabilitación y estiramiento muscular.",
    price: 499,
    category: "Ejercicio Activo",
    brand: "Bruce Pro",
    imageBg: "linear-gradient(135deg, #ffedd5 0%, #f97316 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 35 C 40 25, 60 45, 80 35 C 80 45, 60 55, 20 45 Z" fill="#0d9488"/>
        <path d="M20 50 C 40 40, 60 60, 80 50 C 80 60, 60 70, 20 60 Z" fill="#f97316"/>
        <path d="M20 65 C 40 55, 60 75, 80 65 C 80 75, 60 85, 20 75 Z" fill="#64748b"/>
      </svg>
    `,
    variables: {
      name: "Tensión",
      options: ["Suave (Verde)", "Media (Naranja)", "Fuerte (Gris)", "Extra Fuerte (Negro)"]
    }
  },
  {
    id: "prod-4",
    name: "Rodillo de Espuma Hyperice Vyper 3",
    description: "Rodillo de espuma vibratorio de alta intensidad. Acelera el calentamiento y la recuperación con 3 velocidades de vibración potente.",
    price: 2999,
    category: "Terapia Manual",
    brand: "Hyperice",
    imageBg: "linear-gradient(135deg, #f1f5f9 0%, #475569 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="50" height="50" rx="25" fill="#1e293b"/>
        <circle cx="50" cy="50" r="18" fill="#0f172a"/>
        <circle cx="50" cy="50" r="8" fill="#0d9488"/>
        <path d="M28 35 H 72 M28 45 H 72 M28 55 H 72 M28 65 H 72" stroke="#475569" stroke-width="1.5" stroke-dasharray="2 3"/>
      </svg>
    `,
    variables: {
      name: "Tamaño",
      options: ["Estándar (30cm)", "Compacto (20cm)"]
    }
  },
  {
    id: "prod-5",
    name: "Camilla Portátil de Fisioterapia Bruce Confort",
    description: "Camilla de madera de haya de alta calidad, acolchado de espuma de alta densidad de 5cm, ajustable en altura y fácil de transportar.",
    price: 4590,
    category: "Movilidad y Camillas",
    brand: "Bruce Pro",
    imageBg: "linear-gradient(135deg, #fef3c7 0%, #d97706 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="40" width="70" height="12" rx="3" fill="#d97706"/>
        <rect x="20" y="52" width="6" height="28" fill="#78350f" transform="rotate(10 20 52)"/>
        <rect x="74" y="52" width="6" height="28" fill="#78350f" transform="rotate(-10 74 52)"/>
        <rect x="47" y="52" width="6" height="28" fill="#78350f"/>
        <circle cx="25" cy="35" r="4" fill="#d97706"/>
      </svg>
    `,
    variables: {
      name: "Ancho",
      options: ["60 cm", "70 cm Profesional"]
    }
  },
  {
    id: "prod-6",
    name: "Vendaje Neuromuscular Kinesio Tex Classic",
    description: "Cinta kinesiológica elástica de algodón para soporte muscular y articular. Resistente al agua e hipoalergénica con ondas de adhesivo.",
    price: 320,
    category: "Vendaje y Cuidado",
    brand: "Kinesio",
    imageBg: "linear-gradient(135deg, #fae8ff 0%, #d946ef 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="#d946ef" fill-opacity="0.3"/>
        <path d="M25 45 Q 35 30, 50 45 T 75 45 Q 60 70, 50 50 T 25 45" fill="#d946ef"/>
        <circle cx="50" cy="50" r="10" fill="#1e293b"/>
      </svg>
    `,
    variables: {
      name: "Color",
      options: ["Azul Kinesio", "Beige Neutro", "Negro", "Fucsia"]
    }
  },
  {
    id: "prod-7",
    name: "Balón de Ejercicio Suizo Gymnic Plus",
    description: "Pelota de fitness ideal para ejercicios de equilibrio, estabilidad central, yoga, pilates y terapia de rehabilitación de espalda.",
    price: 850,
    category: "Ejercicio Activo",
    brand: "Gymnic",
    imageBg: "linear-gradient(135deg, #dbeafe 0%, #2563eb 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#2563eb"/>
        <path d="M15 50 Q 50 15, 85 50" stroke="#60a5fa" stroke-width="2" fill="none"/>
        <path d="M15 50 Q 50 85, 85 50" stroke="#60a5fa" stroke-width="2" fill="none"/>
        <circle cx="50" cy="50" r="35" stroke="#1d4ed8" stroke-width="3" fill="none"/>
      </svg>
    `,
    variables: {
      name: "Diámetro",
      options: ["55 cm (Estatura < 1.65m)", "65 cm (Estatura 1.65 - 1.85m)", "75 cm (Estatura > 1.85m)"]
    }
  },
  {
    id: "prod-8",
    name: "Dispositivo de Ultrasonido Chattanooga US",
    description: "Ultrasonido terapéutico portátil con frecuencias de 1 y 3 MHz. Ideal para el tratamiento de lesiones musculares profundas.",
    price: 8900,
    category: "Electroterapia",
    brand: "Chattanooga",
    imageBg: "linear-gradient(135deg, #ecfdf5 0%, #059669 100%)",
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="50" height="50" rx="6" fill="#1e293b"/>
        <rect x="33" y="28" width="34" height="20" rx="2" fill="#0f172a"/>
        <circle cx="42" cy="58" r="4" fill="#059669"/>
        <circle cx="58" cy="58" r="4" fill="#34d399"/>
        <rect x="20" y="72" width="16" height="12" rx="3" fill="#64748b" transform="rotate(-20 20 72)"/>
        <path d="M30 76 Q 40 85, 55 60" stroke="#64748b" stroke-width="3" fill="none" stroke-dasharray="2 2"/>
      </svg>
    `,
    variables: {
      name: "Modelo",
      options: ["Estándar Clínico", "Profesional con Batería"]
    }
  }
];
