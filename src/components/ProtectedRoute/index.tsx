"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(auth.currentUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push("/auth/login");
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (user) {
        return <>{children}</>;
    }

    return null;
}