import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Função para gerar escalas automáticas
export async function gerarEscalasAutomaticamente() {
    // 1. Definir os horários das missas pré-definidas
    const missasPredefinidas = [
        { diaSemana: "Sábado", hora: "17:00" },
        { diaSemana: "Sábado", hora: "19:00" },
        { diaSemana: "Domingo", hora: "07:00" },
        { diaSemana: "Domingo", hora: "09:00" },
        { diaSemana: "Domingo", hora: "11:00" },
        { diaSemana: "Domingo", hora: "17:30" },
        { diaSemana: "Domingo", hora: "19:30" },
    ];

    // 2. Para cada missa, encontrar servidores disponíveis
    for (const missa of missasPredefinidas) {
        const { diaSemana, hora } = missa;

        // 3. Buscar servidores disponíveis para o dia e horário da missa
        const servidoresRef = collection(db, "servidores");
        const qServidores = query(
            servidoresRef,
            where("disponibilidade", "array-contains", `${diaSemana} ${hora}`)
        );
        const servidoresSnapshot = await getDocs(qServidores);

        // 4. Filtrar servidores por tipo (acólitos e coroinhas)
        const acolitos = servidoresSnapshot.docs
            .filter((doc) => doc.data().tipo === "Acólito")
            .map((doc) => doc.id);

        const coroinhas = servidoresSnapshot.docs
            .filter((doc) => doc.data().tipo === "Coroinha")
            .map((doc) => doc.id);

        // 5. Verificar se há servidores suficientes
        if (acolitos.length < 2 || coroinhas.length < 1) {
            console.warn(
                `Não há servidores suficientes para a missa de ${diaSemana} às ${hora}.`
            );
            continue; // Pula para a próxima missa
        }

        // 6. Selecionar aleatoriamente os servidores necessários
        const escala = [
            ...selecionarAleatoriamente(acolitos, 2), // 2 acólitos
            ...selecionarAleatoriamente(coroinhas, 1), // 1 coroinha
        ];

        // 7. Criar ou atualizar o documento da missa no Firestore
        const missaRef = doc(db, "missas", `${diaSemana}-${hora}`);
        await setDoc(
            missaRef,
            {
                data: new Date().toISOString().split("T")[0], // Data atual
                hora,
                diaSemana,
                tipo: "Pré-definida",
                escala,
            },
            { merge: true } // Cria o documento se não existir ou atualiza se existir
        );
    }
}

// Função para selecionar itens aleatoriamente de um array
function selecionarAleatoriamente(array: string[], quantidade: number): string[] {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Embaralha o array
    return shuffled.slice(0, quantidade); // Retorna a quantidade desejada
}