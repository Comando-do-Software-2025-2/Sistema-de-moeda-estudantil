import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { TransactionFormData } from '@/types/transaction';
import { toast } from 'sonner';
import { mockStudents } from '@/services/mockData';

export function SendCoins() {
  const [formData, setFormData] = useState<TransactionFormData>({
    studentEmail: '',
    amount: 0,
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Moedas enviadas com sucesso!');
      setFormData({ studentEmail: '', amount: 0, description: '' });
    } catch (error) {
      toast.error('Erro ao enviar moedas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white">
          Email do Aluno
        </label>
        <select
          value={formData.studentEmail}
          onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
          className="mt-1 block w-full rounded-md border border-white/20 bg-white/10 text-white"
          required
        >
          <option value="">Selecione um aluno</option>
          {mockStudents.map(student => (
            <option key={student.id} value={student.email}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">
          Quantidade de Moedas
        </label>
        <Input
          type="number"
          min="1"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          className="mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">
          Descrição
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Enviar Moedas
      </Button>
    </form>
  );
}