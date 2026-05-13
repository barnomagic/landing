"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre"),
  email: z.string().trim().email("Email inválido"),
  tipo: z.enum(["catalogo-customizable", "bespoke", "otro"]),
  mensaje: z.string().trim().min(10, "Contanos un poco más"),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { tipo: "otro" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error ?? "No pudimos enviar el mensaje.");
        setStatus("error");
        return;
      }
      reset();
      setStatus("ok");
    } catch {
      setErrorMessage("Sin conexión. Probá de nuevo.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-ink/20 bg-offwhite px-4 py-3 text-base text-ink placeholder:text-stone transition-colors focus:border-oxblood focus:outline-none";
  const labelClass =
    "mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-stone";

  if (status === "ok") {
    return (
      <div
        role="status"
        className="border border-oxblood/40 bg-offwhite p-8"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-oxblood">
          Mensaje enviado
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-ink">
          Gracias por escribir.
        </h3>
        <p className="mt-4 text-base leading-[1.7] text-cement">
          Recibimos tu mensaje. Si querés agilizar, podés continuar la
          conversación por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">No completar</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div>
        <label htmlFor="nombre" className={labelClass}>
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          className={inputClass}
          aria-invalid={!!errors.nombre}
          {...register("nombre")}
        />
        {errors.nombre && (
          <p className="mt-2 text-xs text-oxblood">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-oxblood">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tipo" className={labelClass}>
          Tipo de consulta
        </label>
        <select
          id="tipo"
          className={inputClass}
          aria-invalid={!!errors.tipo}
          {...register("tipo")}
        >
          <option value="catalogo-customizable">Catálogo customizable</option>
          <option value="bespoke">Diseño bespoke desde cero</option>
          <option value="otro">Otro / consulta general</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass}>
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows={5}
          className={`${inputClass} resize-y`}
          aria-invalid={!!errors.mensaje}
          placeholder="Contanos el espacio, el uso, las medidas si las tenés."
          {...register("mensaje")}
        />
        {errors.mensaje && (
          <p className="mt-2 text-xs text-oxblood">{errors.mensaje.message}</p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <p
          role="alert"
          className="border border-oxblood/40 bg-offwhite px-4 py-3 text-sm text-oxblood"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex cursor-pointer items-center justify-center gap-2 bg-oxblood px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-offwhite transition-colors duration-200 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
