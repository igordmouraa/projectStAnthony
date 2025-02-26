"use client";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import { Missa } from "@/@types/missa";

export default function VisualizarEscalasPage() {
    const [escalas, setEscalas] = useState<Missa[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEscalas = async () => {
            const missasRef = collection(db, "missas");
            const missasSnapshot = await getDocs(missasRef);
            const escalasData = missasSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Missa[];

            // Buscar os nomes dos servidores para cada missa
            const escalasComNomes = await Promise.all(
                escalasData.map(async (missa) => {
                    const servidoresNomes = await Promise.all(
                        missa.escala.map(async (servidorId) => {
                            const servidorRef = doc(db, "servidores", servidorId);
                            const servidorDoc = await getDoc(servidorRef);
                            return servidorDoc.exists() ? servidorDoc.data().nome : "Servidor não encontrado";
                        })
                    );
                    return {
                        ...missa,
                        escalaNomes: servidoresNomes,
                    };
                })
            );

            setEscalas(escalasComNomes);
            setLoading(false);
        };

        fetchEscalas();
    }, []);

    if (loading) {
        return <p>Carregando escalas...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Escalas Geradas</h1>
            <div className="space-y-4">
                {escalas.map((missa) => (
                    <div key={missa.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">
                            {missa.diaSemana} - {missa.hora}
                        </h2>
                        <p className="text-gray-600">
                            Tipo: {missa.tipo}
                        </p>
                        <p className="text-gray-600">
                            Servidores escalados: {missa.escalaNomes?.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}