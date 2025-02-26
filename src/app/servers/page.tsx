"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";

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

export default function ServersPage() {
    const [servidores, setServidores] = useState<Servidor[]>([]);

    useEffect(() => {
        const fetchServidores = async () => {
            const querySnapshot = await getDocs(collection(db, "servidores"));
            const servidoresData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Servidor[];
            setServidores(servidoresData);
        };
        fetchServidores();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <h1 className="text-3xl font-bold mb-6">Servidores</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servidores.map((servidor) => (
                    <motion.div
                        key={servidor.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <h2 className="text-xl font-semibold">{servidor.nome}</h2>
                        <p className="text-gray-600">{servidor.tipo}</p>
                        <p className="text-gray-600">Idade: {servidor.idade}</p>
                        <p className="text-gray-600">
                            Responsável: {servidor.nomeResponsavel}
                        </p>
                        <p className="text-gray-600">
                            Telefone: {servidor.telefoneResponsavel}
                        </p>
                        <Link
                            href={`/servers/${servidor.id}`}
                            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Ver detalhes
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}