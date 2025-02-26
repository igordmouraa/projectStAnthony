"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {cn} from "@/lib/utils";

const nav_items = [
    { label: "Servidores", href: "/servers" },
    { label: "Cadastrar Servidor", href: "/servers/new" },
];

export default function Navbar() {
    const [user, setUser] = useState(auth.currentUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/auth/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-800">
                    Santo Antônio
                </Link>

                <div className="flex items-center gap-6">
                    {nav_items.map((item) => (
                        <NavItem key={item.label} label={item.label} href={item.href} />
                    ))}


                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        >
                            Sair
                        </button>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

// Componente NavItem
type NavItemProps = {
    label: string;
    href: string;
};

const NavItem = ({ label, href }: NavItemProps) => {
    const pathName = usePathname();
    const isActive = pathName === href;

    return (
        <Link
            href={href}
            className={cn(
                "text-gray-600 hover:text-blue-600 transition-colors duration-300 relative",
                isActive && "text-blue-600 font-semibold"
            )}
        >
            {label}
            {isActive && (
                <span className="absolute left-0 top-full mt-1 h-[2px] w-full bg-blue-600" />
            )}
        </Link>
    );
};