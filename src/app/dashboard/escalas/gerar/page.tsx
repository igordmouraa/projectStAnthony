"use client";
import { gerarEscalasAutomaticamente } from "@/lib/escalas";
import { useState } from "react";

export default function GerarEscalasPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleGerarEscalas = async () => {
        setLoading(true);
        setMessage("Gerando escalas...");

        try {
            await gerarEscalasAutomaticamente();
            setMessage("Escalas geradas com sucesso!");
        } catch (error) {
            setMessage("Erro ao gerar escalas. Tente novamente.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gerar Escalas Automáticas</h1>
            <button
                onClick={handleGerarEscalas}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {loading ? "Gerando..." : "Gerar Escalas"}
            </button>
            {message && <p className="mt-4 text-gray-600">{message}</p>}
        </div>
    );
}