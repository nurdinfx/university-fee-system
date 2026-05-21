import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  student: string;
  type: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Completed';
}

interface FinanceState {
  list: Transaction[];
  totalRevenue: number;
  totalExpenses: number;
  pendingPayments: number;
}

const initialState: FinanceState = {
  list: [
    { id: 'INV-2026-001', student: 'Alice Johnson', type: 'Tuition Fee', amount: 4500, date: '2026-05-15', status: 'Paid' },
    { id: 'INV-2026-002', student: 'Bob Smith', type: 'Library Fine', amount: 25, date: '2026-05-14', status: 'Pending' },
    { id: 'INV-2026-003', student: 'Charlie Brown', type: 'Hostel Fee', amount: 1200, date: '2026-05-10', status: 'Paid' },
    { id: 'INV-2026-004', student: 'Diana Prince', type: 'Tuition Fee', amount: 4500, date: '2026-05-08', status: 'Overdue' },
    { id: 'EXP-2026-001', student: 'Vendor (IT Supp.)', type: 'Server Maintenance', amount: -850, date: '2026-05-05', status: 'Completed' },
  ],
  totalRevenue: 124500,
  totalExpenses: 34200,
  pendingPayments: 18450,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const prefix = action.payload.amount < 0 ? 'EXP' : 'INV';
      const nextId = `${prefix}-2026-${String(state.list.length + 1).padStart(3, '0')}`;
      const newTxn = { ...action.payload, id: nextId } as Transaction;
      state.list.unshift(newTxn);

      // Dynamically recalculate totals
      if (action.payload.amount > 0) {
        if (action.payload.status === 'Paid') {
          state.totalRevenue += action.payload.amount;
        } else {
          state.pendingPayments += action.payload.amount;
        }
      } else {
        state.totalExpenses += Math.abs(action.payload.amount);
      }
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: 'Paid' | 'Pending' | 'Overdue' | 'Completed' }>) => {
      const idx = state.list.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        const txn = state.list[idx];
        const oldStatus = txn.status;
        txn.status = action.payload.status;

        // If shifting from pending/overdue to paid, adjust pending & revenue stats
        if ((oldStatus === 'Pending' || oldStatus === 'Overdue') && action.payload.status === 'Paid') {
          state.pendingPayments -= txn.amount;
          state.totalRevenue += txn.amount;
        }
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const txn = state.list.find(t => t.id === action.payload);
      if (txn) {
        if (txn.amount > 0) {
          if (txn.status === 'Paid') {
            state.totalRevenue -= txn.amount;
          } else {
            state.pendingPayments -= txn.amount;
          }
        } else {
          state.totalExpenses -= Math.abs(txn.amount);
        }
      }
      state.list = state.list.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTransaction, updateTransactionStatus, deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;
