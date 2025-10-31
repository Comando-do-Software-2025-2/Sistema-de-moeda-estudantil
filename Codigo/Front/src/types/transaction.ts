export interface Transaction {
  id: string;
  amount: number;
  description: string;
  senderName: string;
  receiverName: string;
  createdAt: Date;
  type: 'sent' | 'received';
}

export interface TransactionFormData {
  studentEmail: string;
  amount: number;
  description: string;
}