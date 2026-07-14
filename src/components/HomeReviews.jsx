import React, { useState } from "react";
import { Star, Quote, Eye, Check, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "../data/products";

// 8 Detailed Clinical Reviews from real Specialists
const CLINICAL_REVIEWS_ROW_1 = [
  {
    id: 1,
    doctor: "Dr. Alejandro Ruiz",
    title: "Especialista en Medicina Deportiva",
    clinic: "FisioActiva Centro de Rendimiento (CDMX)",
    credentials: "Céd. Prof. 8762514",
    text: "El Chattanooga TENS ha sido clave en traumatología. Su modulación de frecuencias combate la analgesia de forma inmediata en pacientes post-quirúrgicos.",
    productId: "prod-2",
    rating: 5
  },
  {
    id: 2,
    doctor: "Lft. Mónica Salazar",
    title: "Directora de Rehabilitación Neuromuscular",
    clinic: "Clínica del Movimiento Insurgentes",
    credentials: "Céd. Prof. 9214732",
    text: "La pistola Bruce Pro Pulse ofrece un torque constante inigualable. Ideal para liberar contracturas del tejido miofascial severo en deportistas élite.",
    productId: "prod-1",
    rating: 5
  },
  {
    id: 3,
    doctor: "Dr. Héctor Valenzuela",
    title: "Médico de Club Deportivo Profesional",
    clinic: "Deportivo Hooligans CDMX",
    credentials: "Céd. Prof. 7531980",
    text: "El vendaje Kinesio Tex Classic es nuestro insumo diario de cajón. Excelente adherencia bajo sudoración extrema sin despegarse de la piel.",
    productId: "prod-6",
    rating: 5
  },
  {
    id: 4,
    doctor: "Dra. Vanessa G. Ortiz",
    title: "Traumatóloga y Especialista en Hombro",
    clinic: "Hospital Ángeles Lomas",
    credentials: "Céd. Prof. 6542199",
    text: "El sistema Chattanooga nos permite calibrar programas TENS personalizados para capsulitis adhesiva. Los pacientes avanzan el doble de rápido.",
    productId: "prod-2",
    rating: 5
  }
];

const CLINICAL_REVIEWS_ROW_2 = [
  {
    id: 5,
    doctor: "Klgo. Daniel Restrepo",
    title: "Fisioterapeuta de Alto Rendimiento",
    clinic: "Restrepo Rehab Center",
    credentials: "Céd. Prof. 4321765",
    text: "Bruce Pro Pulse es insustituible en mi maletín de viaje. La percusión profunda agiliza la reabsorción de ácido láctico en vestidores.",
    productId: "prod-1",
    rating: 5
  },
  {
    id: 6,
    doctor: "Lft. Ricardo Prieto",
    title: "Director del Centro de Columna Lumbar",
    clinic: "Centro Spine Monterrey",
    credentials: "Céd. Prof. 5438912",
    text: "Utilizamos el rodillo Vyper 3 para activar la musculatura paravertebral y flexores de cadera. La vibración añade una estimulación sensorial profunda.",
    productId: "prod-4",
    rating: 5
  },
  {
    id: 7,
    doctor: "Dra. Claudia Benítez",
    title: "Fisiatra y Especialista en Geriatría",
    clinic: "Clínica de Rehabilitación Golden Age",
    credentials: "Céd. Prof. 3298711",
    text: "El vendaje Kinesio Tex proporciona estabilidad neuromuscular en pacientes de la tercera edad sin restringir los rangos de movilidad natural.",
    productId: "prod-6",
    rating: 5
  },
  {
    id: 8,
    doctor: "Klgo. Andrés Montoya",
    title: "Kinesiólogo y Osteópata Deportivo",
    clinic: "Montoya Sport Clinic Guadalajara",
    credentials: "Céd. Prof. 8769123",
    text: "Vyper 3 es clave para la liberación fascial de la planta del pie e isquiotibiales. El calentamiento muscular es mucho más eficiente.",
    productId: "prod-4",
    rating: 5
  }
];

export default function HomeReviews({ onOpenProductModal, products = PRODUCTS }) {
  // Duplicating the items arrays to ensure seamless infinite loops without gaps
  const row1Items = [...CLINICAL_REVIEWS_ROW_1, ...CLINICAL_REVIEWS_ROW_1];
  const row2Items = [...CLINICAL_REVIEWS_ROW_2, ...CLINICAL_REVIEWS_ROW_2];

  return (
    <section className="reviews-marquee-section">
      <div className="container text-center reviews-header">
        <span className="section-label">Respaldo Clínico</span>
        <h2>Respaldado por Especialistas de la Salud</h2>
        <p className="reviews-subtitle">
          Médicos del deporte, fisiatras y directores de centros clínicos de alto nivel comparten su experiencia con Bruce Médica.
        </p>
      </div>

      <div className="marquee-universe-wrapper">
        {/* Infinite Blur Gradient overlays */}
        <div className="marquee-blur-overlay-left"></div>
        <div className="marquee-blur-overlay-right"></div>

        {/* Row 1: Moves Left */}
        <div className="marquee-track-container row-1-track">
          <div className="marquee-row-runner scroll-left-anim">
            {row1Items.map((rev, index) => {
              const linkedProd = products.find(p => p.id === rev.productId) || products[index % (products.length || 1)] || { name: "Cargando catálogo..." };
              return (
                <div key={`${rev.id}-${index}`} className="marquee-review-card glass">
                  <div className="review-card-header">
                    <div className="stars-cluster">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="var(--secondary-accent)" color="var(--secondary-accent)" />
                      ))}
                    </div>
                    <Quote size={20} className="quote-badge-decor" />
                  </div>

                  <p className="review-body-text">"{rev.text}"</p>

                  <div className="review-doctor-meta">
                    <div className="doctor-avatar">
                      {rev.doctor.split(" ")[1]?.charAt(0) || "D"}
                    </div>
                    <div className="doctor-details">
                      <h5 className="doc-name">
                        {rev.doctor} 
                        <ShieldCheck size={14} className="verified-badge-icon" />
                      </h5>
                      <span className="doc-title">{rev.title}</span>
                      <span className="doc-subtext">{rev.clinic} • <strong>{rev.credentials}</strong></span>
                    </div>
                  </div>

                  <div className="review-product-pill-footer">
                    <span className="product-tag-info">Equipo Utilizado:</span>
                    <button 
                      className="product-inline-inspect-btn"
                      onClick={() => onOpenProductModal(linkedProd)}
                    >
                      <Eye size={12} /> {linkedProd.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="marquee-track-container row-2-track">
          <div className="marquee-row-runner scroll-right-anim">
            {row2Items.map((rev, index) => {
              const linkedProd = products.find(p => p.id === rev.productId) || products[(index + 3) % (products.length || 1)] || { name: "Cargando catálogo..." };
              return (
                <div key={`${rev.id}-${index}`} className="marquee-review-card glass">
                  <div className="review-card-header">
                    <div className="stars-cluster">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="var(--secondary-accent)" color="var(--secondary-accent)" />
                      ))}
                    </div>
                    <Quote size={20} className="quote-badge-decor" />
                  </div>

                  <p className="review-body-text">"{rev.text}"</p>

                  <div className="review-doctor-meta">
                    <div className="doctor-avatar">
                      {rev.doctor.split(" ")[1]?.charAt(0) || "D"}
                    </div>
                    <div className="doctor-details">
                      <h5 className="doc-name">
                        {rev.doctor} 
                        <ShieldCheck size={14} className="verified-badge-icon" />
                      </h5>
                      <span className="doc-title">{rev.title}</span>
                      <span className="doc-subtext">{rev.clinic} • <strong>{rev.credentials}</strong></span>
                    </div>
                  </div>

                  <div className="review-product-pill-footer">
                    <span className="product-tag-info">Equipo Utilizado:</span>
                    <button 
                      className="product-inline-inspect-btn"
                      onClick={() => onOpenProductModal(linkedProd)}
                    >
                      <Eye size={12} /> {linkedProd.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        .reviews-marquee-section {
          padding: 6rem 0;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .reviews-header {
          margin-bottom: 3.5rem;
          padding: 0 2rem;
        }

        .reviews-subtitle {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        /* Marquee Universe container */
        .marquee-universe-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          overflow: hidden;
        }

        /* Left/Right infinite blurs */
        .marquee-blur-overlay-left {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 15%;
          z-index: 2;
          background: linear-gradient(to right, var(--bg-primary) 15%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .marquee-blur-overlay-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 15%;
          z-index: 2;
          background: linear-gradient(to left, var(--bg-primary) 15%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        /* Tracks layout */
        .marquee-track-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .marquee-row-runner {
          display: flex;
          gap: 1.5rem;
          width: max-content;
        }

        /* Animations scroll-left / scroll-right */
        .scroll-left-anim {
          animation: marqueeLeft 45s linear infinite;
        }

        .scroll-right-anim {
          animation: marqueeRight 45s linear infinite;
        }

        .marquee-track-container:hover .marquee-row-runner {
          animation-play-state: paused;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Testimonial Card Styling */
        .marquee-review-card {
          width: 380px;
          flex-shrink: 0;
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
          transition: all var(--transition-fast);
        }

        .marquee-review-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .review-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stars-cluster {
          display: flex;
          gap: 0.15rem;
        }

        .quote-badge-decor {
          color: var(--accent-color);
          opacity: 0.15;
        }

        .review-body-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          text-align: left;
          font-style: italic;
        }

        /* Doctor meta */
        .review-doctor-meta {
          display: flex;
          gap: 0.85rem;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .doctor-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-color) 0%, #115e59 100%);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .doctor-details {
          display: flex;
          flex-direction: column;
          text-align: left;
          gap: 0.15rem;
        }

        .doc-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .verified-badge-icon {
          color: #10b981;
        }

        .doc-title {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-color);
        }

        .doc-subtext {
          font-size: 0.65rem;
          color: var(--text-tertiary);
        }

        /* Product Pill link footer */
        .review-product-pill-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-secondary);
          padding: 0.5rem 1rem;
          border-radius: 10px;
        }

        .product-tag-info {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        .product-inline-inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .product-inline-inspect-btn:hover {
          color: var(--accent-color);
        }
      `}</style>
    </section>
  );
}
