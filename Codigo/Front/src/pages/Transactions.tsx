import { Navbar } from "@/components/Navbar";
import { SendCoins } from "@/components/SendCoins";
import { TransactionHistory } from "@/components/TransactionHistory";
import { Coins, PiggyBank } from "lucide-react";

export default function Transactions() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Background com gradiente */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-900 via-slate-900 to-black" />

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PiggyBank className="h-12 w-12 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Gerenciamento de Moedas
            </h1>
            <p className="text-lg text-white/80">
              Envie moedas para alunos e acompanhe seu histórico de transações
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário de envio */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <Coins className="h-5 w-5 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Enviar Moedas</h2>
              </div>
              <SendCoins />
            </div>

            {/* Histórico de transações */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}