export default function Home() {
  return (
      <div className="min-h-screen bg-gray-100">


        {/* Conteúdo Principal */}
        <main className="pt-16"> {/* Espaçamento para a Navbar fixa */}
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Bem-vindo ao Gerenciador de Escalas
            </h1>
            <p className="text-gray-600">
              Gerencie escalas de acólitos e coroinhas de forma simples e eficiente.
            </p>
          </div>
        </main>
      </div>
  );
}