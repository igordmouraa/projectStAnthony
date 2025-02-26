"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Servidor {
    id: string;
    nome: string;
    idade: number;
    tipo: string;
    nomeResponsavel: string;
    telefoneResponsavel: string;
    disponibilidade: string[];
    createdAt: Date;
}

export default function ServidorDetailsPage() {
    const { id } = useParams();
    const [servidor, setServidor] = useState<Servidor | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchServidor = async () => {
            const docRef = doc(db, "servidores", id as string);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setServidor({ id: docSnap.id, ...docSnap.data() } as Servidor);
            }
        };
        fetchServidor();
    }, [id]);

    // Função para remover uma disponibilidade
    const removerDisponibilidade = async (disp: string) => {
        if (!servidor) return;

        const novasDisponibilidades = servidor.disponibilidade.filter((d) => d !== disp);

        try {
            await updateDoc(doc(db, "servidores", servidor.id), {
                disponibilidade: novasDisponibilidades,
            });
            setServidor({ ...servidor, disponibilidade: novasDisponibilidades });
        } catch (error) {
            console.error("Erro ao remover disponibilidade:", error);
        }
    };

    if (!servidor) {
        return <div>Carregando...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <h1 className="text-3xl font-bold mb-6">{servidor.nome}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">Idade: {servidor.idade}</p>
                <p className="text-gray-600">Tipo: {servidor.tipo}</p>
                <p className="text-gray-600">
                    Responsável: {servidor.nomeResponsavel}
                </p>
                <p className="text-gray-600">
                    Telefone: {servidor.telefoneResponsavel}
                </p>
                <h2 className="text-xl font-semibold mt-4">Disponibilidade</h2>
                <ul className="list-disc list-inside">
                    {servidor.disponibilidade.map((disp, index) => (
                        <li key={index} className="text-gray-600 flex items-center gap-2">
                            {disp}
                            <button
                                onClick={() => removerDisponibilidade(disp)}
                                className="text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}