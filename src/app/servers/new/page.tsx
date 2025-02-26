"use client";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Opções de disponibilidade (dias e horários)
const disponibilidadesOptions = [
    "Sábado 17:00",
    "Sábado 19:00",
    "Domingo 07:00",
    "Domingo 09:00",
    "Domingo 11:00",
    "Domingo 17:30",
    "Domingo 19:30",
];

export default function NewServerPage() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [tipo, setTipo] = useState("Acólito");
    const [nomeResponsavel, setNomeResponsavel] = useState("");
    const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
    const [disponibilidade, setDisponibilidade] = useState<string[]>([]);
    const [novaDisponibilidade, setNovaDisponibilidade] = useState("");
    const router = useRouter();

    // Adicionar uma nova disponibilidade
    const adicionarDisponibilidade = () => {
        if (novaDisponibilidade && !disponibilidade.includes(novaDisponibilidade)) {
            setDisponibilidade([...disponibilidade, novaDisponibilidade]);
            setNovaDisponibilidade("");
        }
    };

    // Remover uma disponibilidade
    const removerDisponibilidade = (disp: string) => {
        setDisponibilidade(disponibilidade.filter((d) => d !== disp));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "servidores"), {
                nome,
                idade: Number(idade),
                tipo,
                nomeResponsavel,
                telefoneResponsavel,
                disponibilidade,
                createdAt: new Date(),
            });
            router.push("/servers");
        } catch (error) {
            console.error("Erro ao cadastrar servidor:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <h1 className="text-3xl font-bold mb-6">Cadastrar Servidor</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="Acólito">Acólito</option>
                    <option value="Coroinha">Coroinha</option>
                </select>
                <input
                    type="text"
                    placeholder="Nome do Responsável"
                    value={nomeResponsavel}
                    onChange={(e) => setNomeResponsavel(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Telefone do Responsável"
                    value={telefoneResponsavel}
                    onChange={(e) => setTelefoneResponsavel(e.target.value)}
                    className="w-full p-2 border rounded"
                />

                {/* Dropdown de disponibilidades */}
                <div className="space-y-2">
                    <label className="block text-gray-700">Disponibilidade</label>
                    <div className="flex gap-2">
                        <select
                            value={novaDisponibilidade}
                            onChange={(e) => setNovaDisponibilidade(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Selecione uma disponibilidade</option>
                            {disponibilidadesOptions.map((disp) => (
                                <option key={disp} value={disp}>
                                    {disp}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={adicionarDisponibilidade}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Adicionar
                        </button>
                    </div>

                    {/* Lista de disponibilidades selecionadas */}
                    <div className="flex flex-wrap gap-2">
                        {disponibilidade.map((disp) => (
                            <div
                                key={disp}
                                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                <span>{disp}</span>
                                <button
                                    type="button"
                                    onClick={() => removerDisponibilidade(disp)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Cadastrar
                </button>
            </form>
        </motion.div>
    );
}