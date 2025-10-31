import { Transaction } from '@/types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 50,
    description: 'Participação excelente em aula',
    senderName: 'Prof. Silva',
    receiverName: 'João Aluno',
    createdAt: new Date('2023-10-30'),
    type: 'sent'
  },
  {
    id: '2',
    amount: 30,
    description: 'Apresentação do trabalho',
    senderName: 'Prof. Maria',
    receiverName: 'Ana Aluna',
    createdAt: new Date('2023-10-29'),
    type: 'received'
  }
];

export const mockStudents = [
  { id: '1', name: 'João Aluno', email: 'joao@aluno.com' },
  { id: '2', name: 'Ana Aluna', email: 'ana@aluno.com' }
];