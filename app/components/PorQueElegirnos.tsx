"use client";

const razones = [
  {
    numero: "01",
    titulo: "Madera con historia",
    cuerpo:
      "Trabajamos solo con maderas macizas de origen trazable: roble, cedro, pino radiata. Sin MDF, sin laminados, sin atajos.",
  },
  {
    numero: "02",
    titulo: "Fabricación local",
    cuerpo:
      "Todo se hace en nuestro taller de Palermo Soho. Podés visitarnos, ver el proceso, tocar los materiales antes de decidir.",
  },
  {
    numero: "03",
    titulo: "Diseño a tu medida",
    cuerpo:
      "Cada espacio es distinto. Diseñamos junto con vos la pieza que encaja exactamente donde tiene que estar.",
  },
  {
    numero: "04",
    titulo: "Garantía de por vida",
    cuerpo:
      "Las piezas Pausa se fabrican para durar más que una tendencia. Si algo falla, lo reparamos. Sin letra chica.",
  },
];

export default function PorQueElegirnos() {
  return (
    <section
      id="por-que"
      style={{
        backgroundColor: "#3D2B1F",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          backgroundColor: "#C17B5C",
          opacity: 0.06,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "30%",
          height: "50%",
          backgroundColor: "#B8954A",
          opacity: 0.05,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 80px",
          position: "relative",
        }}
        className="elegirnos-container"
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            marginBottom: 80,
            alignItems: "end",
          }}
          className="elegirnos-header"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                color: "#8B9467",
                textTransform: "uppercase",
              }}
            >
              Por qué Pausa
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 2.8vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "#FEFCF8",
                letterSpacing: "-0.01em",
              }}
            >
              Hay muebles
              <br />
              y hay{" "}
              <em style={{ fontStyle: "italic", color: "#C17B5C" }}>
                muebles.
              </em>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(254,252,248,0.6)",
              maxWidth: 400,
            }}
          >
            La diferencia no siempre se ve a primera vista. Se siente con los
            años. Cuando el living que armaste sigue tan firme como el primer
            día — y luce mejor con el paso del tiempo.
          </p>
        </div>

        {/* Reasons grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            backgroundColor: "rgba(254,252,248,0.08)",
          }}
          className="elegirnos-grid"
        >
          {razones.map((r) => (
            <div
              key={r.numero}
              style={{
                backgroundColor: "#3D2B1F",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(193,123,92,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#3D2B1F";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "rgba(184,149,74,0.3)",
                  lineHeight: 1,
                }}
              >
                {r.numero}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#FEFCF8",
                  lineHeight: 1.3,
                }}
              >
                {r.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "rgba(254,252,248,0.55)",
                }}
              >
                {r.cuerpo}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div
          style={{
            marginTop: 80,
            paddingTop: 48,
            borderTop: "1px solid rgba(254,252,248,0.08)",
            display: "flex",
            gap: 40,
            alignItems: "flex-start",
          }}
          className="elegirnos-quote"
        >
          <div
            style={{
              width: 3,
              height: 80,
              backgroundColor: "#C17B5C",
              flexShrink: 0,
              marginTop: 4,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <blockquote
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#FEFCF8",
                lineHeight: 1.5,
              }}
            >
              "El mejor mueble es el que no notás porque ya es parte de tu
              casa."
            </blockquote>
            <cite
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.875rem",
                color: "rgba(254,252,248,0.4)",
                fontStyle: "normal",
                letterSpacing: "0.04em",
              }}
            >
              — Martín Soto, maestro artesano
            </cite>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .elegirnos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .elegirnos-container {
            padding: 0 24px !important;
          }
          .elegirnos-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }
          .elegirnos-grid {
            grid-template-columns: 1fr !important;
          }
          .elegirnos-quote {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
