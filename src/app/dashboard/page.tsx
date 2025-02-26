"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
    const router = useRouter();

    // Verifica se o usuário está autenticado
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/auth/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <p className="text-gray-600 mb-8">Bem-vindo ao painel de controle.</p>

                {/* Cards de Funcionalidades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card: Gerar Escalas Automáticas */}
                    <Link href="/dashboard/escalas/gerar">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">Gerar Escalas</h2>
                            <p className="text-gray-600">
                                Gere escalas automáticas para as missas da semana.
                            </p>
                        </motion.div>
                    </Link>

                    {/* Card: Visualizar Escalas */}
                    <Link href="/dashboard/escalas/visualizar">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">Visualizar Escalas</h2>
                            <p className="text-gray-600">
                                Veja as escalas geradas para as missas.
                            </p>
                        </motion.div>
                    </Link>

                    {/* Card: Gerenciar Servidores */}
                    <Link href="/dashboard/servidores">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">Gerenciar Servidores</h2>
                            <p className="text-gray-600">
                                Cadastre, edite ou exclua servidores (acólitos e coroinhas).
                            </p>
                        </motion.div>
                    </Link>

                    {/* Card: Gerenciar Missas */}
                    <Link href="/dashboard/missas">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">Gerenciar Missas</h2>
                            <p className="text-gray-600">
                                Adicione, edite ou exclua missas especiais.
                            </p>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}