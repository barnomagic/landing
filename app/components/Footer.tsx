"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#3D2B1F",
        padding: "60px 0 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 80px",
        }}
        className="footer-container"
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 48,
            borderBottom: "1px solid rgba(254,252,248,0.1)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.625rem",
                color: "#FEFCF8",
                letterSpacing: "0.04em",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              Pausa
            </a>
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(254,252,248,0.45)",
                maxWidth: 240,
              }}
            >
              Muebles artesanales diseñados para hacer de tu casa un lugar
              donde quieras quedarte.
            </p>
            {/* Social links — minimal */}
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {["IG", "TH", "PIN"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    color: "rgba(254,252,248,0.3)",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#C17B5C")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(254,252,248,0.3)")
                  }
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Nav col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                color: "#8B9467",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Navegar
            </span>
            {[
              { label: "Nosotros", href: "#nosotros" },
              { label: "Colección", href: "#coleccion" },
              { label: "Por qué elegirnos", href: "#por-que" },
              { label: "Contacto", href: "#contacto" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(254,252,248,0.5)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#FEFCF8")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(254,252,248,0.5)")
                }
              >
                {label}
              </a>
            ))}
          </div>

          {/* Info col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                color: "#8B9467",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Taller
            </span>
            {[
              "Palermo Soho",
              "Buenos Aires",
              "Lun–Vie 10–18 h",
              "Sáb 10–14 h",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(254,252,248,0.5)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Contact col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                color: "#8B9467",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Contacto
            </span>
            {[
              "hola@pausamuebles.com.ar",
              "+54 11 4567-8901",
            ].map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(254,252,248,0.5)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: "rgba(254,252,248,0.25)",
            }}
          >
            © {year} Pausa Muebles. Todos los derechos reservados.
          </span>
          <span
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "0.8125rem",
              fontStyle: "italic",
              color: "rgba(254,252,248,0.18)",
            }}
          >
            Hecho con tiempo. Buenos Aires.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-container {
            padding: 0 24px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
