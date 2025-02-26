"use client";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-600 text-white p-4 mt-6"
        >
            <div className="container mx-auto text-center">
                <p>© 2024 Gerenciador de Escalas. Todos os direitos reservados.</p>
            </div>
        </motion.footer>
    );
}