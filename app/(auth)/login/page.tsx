"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Persona = {
  nombre: string;
  sexo: string;
};

const STORAGE_KEY = "personas_form_data";

const Page = () => {
  const router = useRouter();
  const [personas, setPersonas] = useState<Persona[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          { nombre: "", sexo: "" },
          { nombre: "", sexo: "" },
        ];
  });

  const updatePersona = (
    index: number,
    field: keyof Persona,
    value: string,
  ) => {
    const updated = [...personas];
    updated[index][field] = value;
    setPersonas(updated);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-[#27272A] shadow-2xl p-8 border border-zinc-800">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#10B981]">
            Ruleta de la pasion
          </h1>
          <p className="text-zinc-400 mt-2">
            Ingresa los nombres de los participantes que daran rienda suelta a
            sus deseos.
          </p>
        </div>

        <div className="space-y-6">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl bg-[#18181B] p-5"
            >
              <div>
                <label className="block text-sm text-zinc-300 mb-2">
                  Nombre persona {index + 1}
                </label>
                <input
                  type="text"
                  value={persona.nombre}
                  onChange={(e) =>
                    updatePersona(index, "nombre", e.target.value)
                  }
                  placeholder={`Nombre ${index + 1}`}
                  className="w-full rounded-xl border border-zinc-700 bg-[#27272A] px-4 py-3 text-white outline-none focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-300 mb-2">Sexo</label>
                <select
                  value={persona.sexo}
                  onChange={(e) => updatePersona(index, "sexo", e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-[#27272A] px-4 py-3 text-white outline-none focus:border-[#10B981]"
                >
                  <option value="">Selecciona</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
          ))}

          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-[#10B981] py-3 font-semibold text-black transition hover:opacity-90"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
