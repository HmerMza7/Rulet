"use client";

import { useEffect, useRef, useState } from "react";

type Persona = {
  nombre: string;
  sexo: string;
};

const STORAGE_KEY = "personas_form_data";
const COLORES = [
  "#10B981",
  "#F59E0B",
  "#6366F1",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

const RETOS_MASCULINO = [
  "debe dar un masaje de 5 minutos con su pene por los labios inferiores💆‍♀️",
  "debe besar el cuello lentamente 💋",
  "debe susurrar algo atrevido al oído 😏",
  "debe abrazar por detrás durante 1 minuto 🤍",
  "debe dar 3 besos donde la otra persona elija 😘",
  "debe pegarle 5 veces con el pene a su pareja, donde ella elija 💃",
  "debe quitar una prenda lentamente 👕",
  "debe besar las manos suavemente 🫶",
  "debe contar un sueño erotico y que su pareja haga todo lo que el soño 🔥",
  "debe colocarse dulce o mermelada en su pene y que su pareja lo lama🍷",
];

const RETOS_FEMENINO = [
  "debe dar un masaje relajante con sus tetas 💆‍♂️",
  "debe besar lentamente la cabeza del pene de su pareja con sus 4 labios 💋",
  "debe decir algo provocativo al oído 😈",
  "debe sentarse cerca y abrazar por 2 minuto 🤍",
  "debe dar 3 besos sorpresa 😘",
  "debe bailar de forma sensual y desnudarse 💃",
  "debe hacer la paja rusa por 5 minutos 👗",
  "debe acariciar el cabello suavemente ✨",
  "debe decir qué le gustaría hacer después 🔥",
  "debe contar un sueño erotico y que su pareja haga todo lo que ella soño 🔥",
  "debe colocarse dulce o mermelada en sus tetas y que su pareja lo lama🍷",
];

const RETOS_STORAGE_KEY = "retos_usados_por_persona";

function getReto(persona: Persona): string {
  const esMasculino = persona.sexo?.toLowerCase().includes("masc");
  const lista = esMasculino ? RETOS_MASCULINO : RETOS_FEMENINO;

  const raw = localStorage.getItem(RETOS_STORAGE_KEY);
  const historial = raw ? JSON.parse(raw) : {};

  const usados: string[] = historial[persona.nombre] || [];

  // retos disponibles
  let disponibles = lista.filter((reto) => !usados.includes(reto));

  // si ya usó todos, reinicia
  if (disponibles.length === 0) {
    historial[persona.nombre] = [];
    disponibles = [...lista];
  }

  const reto = disponibles[Math.floor(Math.random() * disponibles.length)];

  historial[persona.nombre] = [...(historial[persona.nombre] || []), reto];

  localStorage.setItem(RETOS_STORAGE_KEY, JSON.stringify(historial));

  return reto;
}

function cargarPersonas(): Persona[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data)
      ? data.filter((p: Persona) => p.nombre && p.nombre.trim())
      : [];
  } catch {
    return [];
  }
}

function dibujarRuleta(
  canvas: HTMLCanvasElement,
  personas: Persona[],
  rotacionGrados: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = cx - 4;
  const n = personas.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (n === 0) {
    ctx.fillStyle = "#27272A";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Sin personas", cx, cy);
    return;
  }

  const arco = (2 * Math.PI) / n;
  const offset = (rotacionGrados * Math.PI) / 180 - Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const inicio = offset + i * arco;
    const fin = inicio + arco;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, inicio, fin);
    ctx.closePath();
    ctx.fillStyle = COLORES[i % COLORES.length];
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(inicio + arco / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 13px sans-serif";
    const nombre =
      personas[i].nombre.length > 10
        ? personas[i].nombre.slice(0, 10) + "…"
        : personas[i].nombre;
    ctx.fillText(nombre, r - 10, 4);
    ctx.restore();
  }

  // Centro
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

export default function RuletaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotacionRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const [personas, setPersonas] = useState<Persona[]>(() => cargarPersonas());
  const [girando, setGirando] = useState(false);
  const [seleccionado, setSeleccionado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const error =
    personas.length < 2
      ? "No se encontraron personas. Agrega al menos 2 en el formulario."
      : "";

  useEffect(() => {
    if (canvasRef.current) {
      dibujarRuleta(canvasRef.current, personas, rotacionRef.current);
    }
  }, [personas]);

  function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }

  const girar = () => {
    if (girando || personas.length < 2) return;

    setGirando(true);
    setSeleccionado("");
    setMensaje("");

    const n = personas.length;
    const indexGanador = Math.floor(Math.random() * n);
    const gradosPorSegmento = 360 / n;
    const extraVueltas = 360 * 6;
    const anguloDestino =
      rotacionRef.current +
      extraVueltas +
      (360 - indexGanador * gradosPorSegmento - gradosPorSegmento / 2);

    const duracion = 3000;
    const inicio = performance.now();
    const rotInicio = rotacionRef.current;

    function animar(ahora: number) {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const rot = rotInicio + (anguloDestino - rotInicio) * easeOut(t);

      if (canvasRef.current) {
        dibujarRuleta(canvasRef.current, personas, rot);
      }

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animar);
        return;
      }

      rotacionRef.current = anguloDestino % 360;
      const ganador = personas[indexGanador];
      const reto = getReto(ganador);

      setSeleccionado(ganador.nombre);
      setMensaje(`${ganador.nombre} ${reto}`);
      setGirando(false);
    }

    animFrameRef.current = requestAnimationFrame(animar);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-[#10B981] mb-8">
        Ruleta de tareas
      </h1>

      {/* Ruleta */}
      <div className="relative mb-8">
        {/* Puntero */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[22px] border-l-transparent border-r-transparent border-b-[#F59E0B] z-10" />
        <canvas
          ref={canvasRef}
          width={288}
          height={288}
          className="rounded-full border-4 border-[#27272A]"
        />
      </div>

      {error && !girando && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      <button
        onClick={girar}
        disabled={girando || personas.length < 2}
        className="bg-[#10B981] text-black font-semibold px-8 py-3 rounded-2xl hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {girando
          ? "Girando..."
          : seleccionado
            ? "Girar de nuevo"
            : "Girar ruleta"}
      </button>

      {seleccionado && (
        <div className="mt-8 rounded-2xl bg-[#27272A] border border-zinc-800 p-6 max-w-xl text-center">
          <p className="text-zinc-300 text-lg">🎉 Seleccionado:</p>
          <h2 className="text-2xl font-bold text-[#10B981] mt-2">
            {seleccionado}
          </h2>
          <p className="text-[#F59E0B] mt-4 text-lg">{mensaje}</p>
        </div>
      )}
    </div>
  );
}
