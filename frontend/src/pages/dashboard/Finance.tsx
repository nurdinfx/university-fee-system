import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../features/store';
import { addTransaction, updateTransactionStatus, deleteTransaction } from '../../features/financeSlice';
import { Plus, Search, Filter, Trash2, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

export default function Finance() {
  const dispatch = useDispatch();
  const finance = useSelector((state: RootState) => state.finance);
  const transactions = finance.list;

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'invoice' | 'expense'>('invoice');

  // Form Fields
  const [name, setName] = useState('');
  const [type, setType] = useState('Tuition Fee');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Pending');

  const openInvoiceModal = () => {
    setModalType('invoice');
    setName('');
    setType('Tuition Fee');
    setAmount('');
    setStatus('Pending');
    setIsModalOpen(true);
  };

  const openExpenseModal = () => {
    setModalType('expense');
    setName('Vendor');
    setType('Server Maintenance');
    setAmount('');
    setStatus('Paid');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    dispatch(addTransaction({
      student: name,
      type,
      amount: modalType === 'expense' ? -numericAmount : numericAmount,
      date: new Date().toISOString().split('T')[0],
      status: modalType === 'expense' ? 'Completed' : status
    }));

    setIsModalOpen(false);
  };

  const handlePayInvoice = (id: string) => {
    dispatch(updateTransactionStatus({ id, status: 'Paid' }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this financial record?')) {
      dispatch(deleteTransaction(id));
    }
  };

  const filteredTxns = transactions.filter(t =>
    t.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance & Fee Management</h1>
          <p className="text-muted-foreground">Manage student fee invoices, expenses, payroll, and collection stats.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openExpenseModal} className="gap-2">
            <Plus className="w-4 h-4" /> Add Expense
          </Button>
          <Button onClick={openInvoiceModal} className="gap-2">
            <Plus className="w-4 h-4" /> Generate Invoice
          </Button>
        </div>
      </div>

      {/* Financial Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-soft bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-emerald-600">Total Revenue (Month)</p>
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-emerald-700">
              ${finance.totalRevenue.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-soft bg-destructive/5 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-destructive">Total Expenses (Month)</p>
              <ArrowDownRight className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold text-destructive">
              ${finance.totalExpenses.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-soft bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-amber-600">Pending Fee Payments</p>
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-amber-600">
              ${finance.pendingPayments.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card className="border-border/50 shadow-soft">
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search invoices by ID, name, or type..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Invoice ID</th>
                  <th className="px-6 py-4 font-medium">Recipient / Payer</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-muted-foreground">
                      No transaction records found.
                    </td>
                  </tr>
                ) : (
                  filteredTxns.map((txn) => (
                    <tr key={txn.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-medium">{txn.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{txn.student}</p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{txn.type}</td>
                      <td className="px-6 py-4 text-muted-foreground">{txn.date}</td>
                      <td className={`px-6 py-4 font-bold ${txn.amount > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                        {txn.amount > 0 ? `+$${txn.amount.toLocaleString()}` : `-$${Math.abs(txn.amount).toLocaleString()}`}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          txn.status === 'Paid' || txn.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                          txn.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {(txn.status === 'Pending' || txn.status === 'Overdue') && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handlePayInvoice(txn.id)} 
                              title="Mark as Paid"
                              className="h-8 w-8 text-emerald-600 hover:bg-emerald-500/10"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(txn.id)} 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Finance Modals */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalType === 'invoice' ? 'Generate Student Fee Invoice' : 'Log Institutional Expense'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {modalType === 'invoice' ? 'Student Name' : 'Payee / Vendor Name'}
            </label>
            <Input 
              placeholder={modalType === 'invoice' ? "e.g. Alice Johnson" : "e.g. AWS Cloud Services"} 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Type</label>
              {modalType === 'invoice' ? (
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none"
                  value={type} 
                  onChange={e => setType(e.target.value)}
                >
                  <option value="Tuition Fee">Tuition Fee</option>
                  <option value="Hostel Fee">Hostel Fee</option>
                  <option value="Library Fine">Library Fine</option>
                  <option value="Exam Fee">Exam Fee</option>
                </select>
              ) : (
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none"
                  value={type} 
                  onChange={e => setType(e.target.value)}
                >
                  <option value="Server Maintenance">Server Maintenance</option>
                  <option value="Faculty Salary">Faculty Salary</option>
                  <option value="Lab Equipment">Lab Equipment</option>
                  <option value="Utilities">Utilities</option>
                </select>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($ USD)</label>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                required 
              />
            </div>
          </div>
          {modalType === 'invoice' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Status</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none"
                value={status} 
                onChange={e => setStatus(e.target.value as any)}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          )}
          <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">
              {modalType === 'invoice' ? 'Generate & Send' : 'Record Expense'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
