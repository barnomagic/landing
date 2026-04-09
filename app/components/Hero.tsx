"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Each element has its own parallax speed — higher = disappears faster
  const p = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px)`,
    willChange: "transform",
  });

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0E8",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          alignItems: "center",
          minHeight: "calc(100vh - 68px)",
        }}
        className="hero-grid"
      >
        {/* Left — text */}
        <div
          style={{
            padding: "80px 60px 80px 80px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
          className="hero-text"
        >
          {/* Eyebrow */}
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              color: "#8B9467",
              textTransform: "uppercase",
            }}
          >
            Diseño de interiores · Buenos Aires
          </span>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#3D2B1F",
              letterSpacing: "-0.01em",
            }}
          >
            El living que
            <br />
            <em style={{ fontStyle: "italic", color: "#C17B5C" }}>
              siempre
            </em>
            <br />
            imaginaste.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(61, 43, 31, 0.68)",
              maxWidth: 420,
            }}
          >
            Muebles artesanales diseñados para hacer de tu casa un lugar donde
            quieras quedarte. Cada pieza, una invitación a la pausa.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#coleccion"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                backgroundColor: "#C17B5C",
                color: "#FEFCF8",
                padding: "14px 36px",
                borderRadius: 4,
                textDecoration: "none",
                transition: "background-color 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#3D2B1F")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#C17B5C")
              }
            >
              Ver colección
            </a>
            <a
              href="#nosotros"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                border: "1.5px solid #3D2B1F",
                color: "#3D2B1F",
                padding: "14px 36px",
                borderRadius: 4,
                textDecoration: "none",
                transition: "background-color 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#E8D5B7";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
              }}
            >
              Nuestra historia
            </a>
          </div>

          {/* Stat bar */}
          <div
            style={{
              display: "flex",
              gap: 40,
              paddingTop: 16,
              borderTop: "1px solid rgba(61,43,31,0.1)",
              marginTop: 8,
            }}
          >
            {[
              { num: "12+", label: "años de oficio" },
              { num: "340", label: "piezas entregadas" },
              { num: "100%", label: "materiales naturales" },
            ].map(({ num, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#3D2B1F",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(61,43,31,0.55)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — editorial composition */}
        <div
          style={{
            position: "relative",
            height: "100%",
            minHeight: 560,
            display: "flex",
            alignItems: "stretch",
          }}
          className="hero-visual"
        >
          {/* Main warm block */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: "10%",
              backgroundColor: "#E8D5B7",
              ...p(-0.12),
            }}
          />

          {/* Terracota accent */}
          <div
            style={{
              position: "absolute",
              top: "12%",
              left: "5%",
              width: "55%",
              height: "42%",
              backgroundColor: "#C17B5C",
              opacity: 0.22,
              ...p(0.55),
            }}
          />

          {/* Sofa silhouette */}
          <div
            style={{
              position: "absolute",
              bottom: "18%",
              left: "15%",
              right: "8%",
              height: "32%",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              ...p(0.35),
            }}
          >
            {/* Backrest */}
            <div
              style={{
                backgroundColor: "#B8954A",
                height: "40%",
                borderRadius: "4px 4px 0 0",
                opacity: 0.85,
              }}
            />
            {/* Seat */}
            <div
              style={{
                backgroundColor: "#C17B5C",
                height: "60%",
                opacity: 0.75,
              }}
            />
          </div>

          {/* Coffee table */}
          <div
            style={{
              position: "absolute",
              bottom: "8%",
              left: "38%",
              width: "35%",
              height: "7%",
              backgroundColor: "#3D2B1F",
              opacity: 0.6,
              borderRadius: 2,
              ...p(0.75),
            }}
          />

          {/* Plant dot */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "14%",
              width: 48,
              height: 72,
              backgroundColor: "#8B9467",
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              opacity: 0.7,
              ...p(0.90),
            }}
          />

          {/* Window light stripe */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: "22%",
              width: 3,
              height: "100%",
              backgroundColor: "#B8954A",
              opacity: 0.18,
              ...p(0.20),
            }}
          />

          {/* Editorial caption */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: "16%",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: `rotate(180deg) translateY(${-scrollY * 0.65}px)`,
              willChange: "transform",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              color: "rgba(61,43,31,0.35)",
              textTransform: "uppercase",
            }}
          >
            Colección Otoño · 2026
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-text {
            padding: 48px 24px !important;
          }
          .hero-visual {
            min-height: 320px !important;
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
