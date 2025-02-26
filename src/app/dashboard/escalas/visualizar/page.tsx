"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import { Missa } from "@/@types/missa";

export default function VisualizarEscalasPage() {
    const [escalas, setEscalas] = useState<Missa[]>([]); // Use o tipo Missa
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEscalas = async () => {
            const missasRef = collection(db, "missas");
            const missasSnapshot = await getDocs(missasRef);
            const escalasData = missasSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Missa[]; // Converta os dados para o tipo Missa
            setEscalas(escalasData);
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
                            Servidores escalados: {missa.escala.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}