"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();


    const publicRoutes = ["/", "/auth/login"];


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user && !publicRoutes.includes(pathname)) {

                router.push("/auth/login");
            }
        });

        return () => unsubscribe();
    }, [pathname, router]);

    return (
        <html lang="pt-BR">
        <body className={`${inter.className} bg-gray-100`}>
        <Navbar />
        <main className="min-h-screen p-6">{children}</main>
        <Footer />
        </body>
        </html>
    );
}