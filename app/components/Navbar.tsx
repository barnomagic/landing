"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#F5F0E8",
        transition: "box-shadow 0.3s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(61,43,31,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 80px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="px-6 md:px-20"
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "1.625rem",
            color: "#3D2B1F",
            letterSpacing: "0.04em",
            textDecoration: "none",
            fontWeight: 400,
          }}
        >
          Pausa
        </a>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ gap: 40, alignItems: "center" }}
        >
          {["Nosotros", "Colección", "Contacto"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace("ó", "o")}`}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.875rem",
                color: "#3D2B1F",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#C17B5C")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#3D2B1F")
              }
            >
              {link}
            </a>
          ))}
          <a
            href="#coleccion"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.875rem",
              backgroundColor: "#C17B5C",
              color: "#FEFCF8",
              padding: "10px 24px",
              borderRadius: 4,
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#3D2B1F")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.backgroundColor = "#C17B5C")
            }
          >
            Ver colección
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#3D2B1F",
            padding: 4,
          }}
          aria-label="Menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#F5F0E8",
            borderTop: "1px solid rgba(61,43,31,0.1)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {["Nosotros", "Colección", "Contacto"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace("ó", "o")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "1rem",
                color: "#3D2B1F",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
