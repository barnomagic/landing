"use client";

import { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Form submission would connect to an API in production
    setEnviado(true);
  }

  return (
    <section
      id="contacto"
      style={{
        backgroundColor: "#F5F0E8",
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
        className="contacto-grid"
      >
        {/* Left — info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
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
              Hablemos
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
              Tu living empieza
              <br />
              con{" "}
              <em style={{ fontStyle: "italic", color: "#C17B5C" }}>
                una conversación.
              </em>
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(61,43,31,0.68)",
              maxWidth: 400,
            }}
          >
            Contanos de tu espacio. Te respondemos en 24 horas con ideas,
            materiales y una visita a tu casa si lo necesitás.
          </p>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Taller", valor: "Palermo Soho, Buenos Aires" },
              { label: "WhatsApp", valor: "+54 11 4567-8901" },
              { label: "Email", valor: "hola@pausamuebles.com.ar" },
              { label: "Horario", valor: "Lun–Vie 10–18 h · Sáb 10–14 h" },
            ].map(({ label, valor }) => (
              <div key={label} style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    color: "#8B9467",
                    textTransform: "uppercase",
                    minWidth: 72,
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.9375rem",
                    color: "#3D2B1F",
                  }}
                >
                  {valor}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative rule */}
          <div
            style={{
              width: 64,
              height: 2,
              backgroundColor: "#C17B5C",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Right — form */}
        <div
          style={{
            backgroundColor: "#FEFCF8",
            padding: "48px 40px",
            boxShadow: "0 4px 24px rgba(61,43,31,0.08)",
          }}
        >
          {enviado ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "flex-start",
                padding: "24px 0",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#8B9467",
                  opacity: 0.25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "#3D2B1F",
                }}
              >
                Mensaje recibido.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "rgba(61,43,31,0.65)",
                }}
              >
                Te contactamos en menos de 24 horas. Mientras tanto,
                explorá nuestra colección completa.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  htmlFor="nombre"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.06em",
                    color: "rgba(61,43,31,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "1rem",
                    color: "#3D2B1F",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1.5px solid rgba(61,43,31,0.2)",
                    padding: "10px 0",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor =
                      "#C17B5C")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor =
                      "rgba(61,43,31,0.2)")
                  }
                  placeholder="Tu nombre"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.06em",
                    color: "rgba(61,43,31,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "1rem",
                    color: "#3D2B1F",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1.5px solid rgba(61,43,31,0.2)",
                    padding: "10px 0",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor =
                      "#C17B5C")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor =
                      "rgba(61,43,31,0.2)")
                  }
                  placeholder="tu@email.com"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  htmlFor="mensaje"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.06em",
                    color: "rgba(61,43,31,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  ¿Qué tenés en mente?
                </label>
                <textarea
                  id="mensaje"
                  required
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "1rem",
                    color: "#3D2B1F",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1.5px solid rgba(61,43,31,0.2)",
                    padding: "10px 0",
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor =
                      "#C17B5C")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLElement).style.borderBottomColor =
                      "rgba(61,43,31,0.2)")
                  }
                  placeholder="Contanos de tu espacio, qué buscás, medidas..."
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  backgroundColor: "#C17B5C",
                  color: "#FEFCF8",
                  padding: "14px 32px",
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  alignSelf: "flex-start",
                  marginTop: 8,
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
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contacto-grid {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
