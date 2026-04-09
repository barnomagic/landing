"use client";

const productos = [
  {
    id: "sillon-pausa",
    nombre: "Sillón Pausa",
    descripcion: "Estructura de roble macizo, tapizado en lino natural crudo. El punto de partida de cualquier living.",
    material: "Roble · Lino",
    medida: "90 × 85 × 80 cm",
    precio: "desde $380.000",
    acento: "#C17B5C",
  },
  {
    id: "mesa-tarde",
    nombre: "Mesa La Tarde",
    descripcion: "Centro de living en madera de cedro recuperado con tapa de vidrio templado. Cada veta, única.",
    material: "Cedro recuperado",
    medida: "110 × 60 × 42 cm",
    precio: "desde $210.000",
    acento: "#B8954A",
  },
  {
    id: "estante-ventana",
    nombre: "Estante Ventana",
    descripcion: "Sistema modular de estantes flotantes. Se arma a medida para cada pared, cada historia.",
    material: "Pino radiata · Hierro",
    medida: "A medida",
    precio: "desde $145.000",
    acento: "#8B9467",
  },
  {
    id: "silla-oficio",
    nombre: "Silla Oficio",
    descripcion: "Diseño sin concesiones. Asiento de cuero natural envejecido, patas torneadas a mano.",
    material: "Roble · Cuero",
    medida: "48 × 52 × 88 cm",
    precio: "desde $165.000",
    acento: "#3D2B1F",
  },
];

export default function Productos() {
  return (
    <section
      id="coleccion"
      style={{
        backgroundColor: "#FEFCF8",
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 80px",
        }}
        className="productos-container"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 24,
          }}
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
              Colección 2026
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#3D2B1F",
                letterSpacing: "-0.01em",
              }}
            >
              Piezas que se quedan.
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.9375rem",
              lineHeight: 1.65,
              color: "rgba(61,43,31,0.6)",
              maxWidth: 340,
              textAlign: "right",
            }}
            className="productos-desc"
          >
            Cada pieza es fabricada en nuestro taller de Palermo.<br />
            Consultá por diseños a medida.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="productos-grid"
        >
          {productos.map((p) => (
            <article
              key={p.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                cursor: "pointer",
              }}
            >
              {/* Visual */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  backgroundColor: "#E8D5B7",
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                {/* Geometric abstraction of the product */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "24px 20px",
                  }}
                >
                  {/* Abstract furniture silhouette */}
                  <div style={{ width: "100%", position: "relative", height: "60%" }}>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "30%",
                        left: "10%",
                        right: "10%",
                        height: "55%",
                        backgroundColor: p.acento,
                        opacity: 0.55,
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "5%",
                        right: "5%",
                        height: "32%",
                        backgroundColor: p.acento,
                        opacity: 0.75,
                      }}
                    />
                    {/* Legs */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-12%",
                        left: "12%",
                        width: "8%",
                        height: "14%",
                        backgroundColor: "#3D2B1F",
                        opacity: 0.5,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-12%",
                        right: "12%",
                        width: "8%",
                        height: "14%",
                        backgroundColor: "#3D2B1F",
                        opacity: 0.5,
                      }}
                    />
                  </div>
                </div>

                {/* Material tag */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    color: "rgba(61,43,31,0.55)",
                    textTransform: "uppercase",
                    backgroundColor: "rgba(245,240,232,0.85)",
                    padding: "4px 8px",
                  }}
                >
                  {p.material}
                </div>
              </div>

              {/* Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "1.125rem",
                      fontWeight: 400,
                      color: "#3D2B1F",
                    }}
                  >
                    {p.nombre}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.8125rem",
                      color: "#8B9467",
                      whiteSpace: "nowrap",
                      marginLeft: 8,
                    }}
                  >
                    {p.medida}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "rgba(61,43,31,0.6)",
                  }}
                >
                  {p.descripcion}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 12,
                    borderTop: "1px solid rgba(61,43,31,0.08)",
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "1rem",
                      color: "#3D2B1F",
                    }}
                  >
                    {p.precio}
                  </span>
                  <a
                    href="#contacto"
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "0.8125rem",
                      color: "#C17B5C",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    Consultar
                    <span style={{ fontSize: "1rem" }}>→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA footer */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 48,
            borderTop: "1px solid rgba(61,43,31,0.1)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="#contacto"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              backgroundColor: "#C17B5C",
              color: "#FEFCF8",
              padding: "14px 40px",
              borderRadius: 4,
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#3D2B1F")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#C17B5C")
            }
          >
            Pedí tu pieza a medida
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .productos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .productos-container {
            padding: 0 24px !important;
          }
          .productos-grid {
            grid-template-columns: 1fr !important;
          }
          .productos-desc {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
