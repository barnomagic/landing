export default function QuienesSomos() {
  return (
    <section
      id="nosotros"
      style={{
        backgroundColor: "#E8D5B7",
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
          alignItems: "center",
        }}
        className="quienes-grid"
      >
        {/* Left — visual composition */}
        <div
          style={{
            position: "relative",
            height: 520,
          }}
          className="quienes-visual"
        >
          {/* Main panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "75%",
              height: "80%",
              backgroundColor: "#C17B5C",
              opacity: 0.18,
              borderRadius: 2,
            }}
          />

          {/* Frame — tall rectangle */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              width: "62%",
              height: "72%",
              border: "1px solid rgba(61,43,31,0.2)",
              borderRadius: 2,
            }}
          />

          {/* Inner warm block */}
          <div
            style={{
              position: "absolute",
              top: 48,
              left: 48,
              width: "58%",
              height: "64%",
              backgroundColor: "#B8954A",
              opacity: 0.12,
            }}
          />

          {/* Artisan mark — circle */}
          <div
            style={{
              position: "absolute",
              bottom: "22%",
              left: "20%",
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "1px solid rgba(61,43,31,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#8B9467",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Vertical rule */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: "18%",
              width: 1,
              height: "100%",
              backgroundColor: "rgba(61,43,31,0.12)",
            }}
          />

          {/* Bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: "15%",
              height: 3,
              backgroundColor: "#8B9467",
              opacity: 0.4,
            }}
          />

          {/* Year label */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: "10%",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              color: "rgba(61,43,31,0.4)",
              textTransform: "uppercase",
            }}
          >
            Est. 2013
          </div>

          {/* Texture dots */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${18 + i * 14}%`,
                right: "8%",
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "#3D2B1F",
                opacity: 0.2,
              }}
            />
          ))}
        </div>

        {/* Right — text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
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
            Nuestra historia
          </span>

          {/* Heading */}
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
            Hacemos muebles como
            <br />
            se hacían antes.{" "}
            <em style={{ fontStyle: "italic", color: "#C17B5C" }}>
              Con tiempo.
            </em>
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(61,43,31,0.72)",
              maxWidth: 440,
            }}
          >
            Somos un taller familiar en el barrio de Palermo, Buenos Aires.
            Desde 2013 diseñamos y fabricamos piezas a medida con maderas
            macizas, linos naturales y acabados hechos a mano — sin atajos, sin
            piezas importadas.
          </p>

          <p
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(61,43,31,0.72)",
              maxWidth: 440,
            }}
          >
            Cada mueble tarda lo que tiene que tardar. Porque creemos que las
            cosas hechas bien merecen el tiempo que piden.
          </p>

          {/* Signature line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 1,
                backgroundColor: "#8B9467",
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1rem",
                fontStyle: "italic",
                color: "rgba(61,43,31,0.6)",
              }}
            >
              Familia Soto, fundadores
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .quienes-grid {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
            gap: 40px !important;
          }
          .quienes-visual {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
