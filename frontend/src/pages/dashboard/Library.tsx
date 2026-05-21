import React, { useState } from 'react';
import { Plus, Search, Filter, Book, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const INITIAL_BOOKS = [
  { id: 'ISBN-9780131103627', title: 'The C Programming Language', author: 'Brian W. Kernighan', copies: 12, available: 4, category: 'Computer Science' },
  { id: 'ISBN-9780201896831', title: 'The Art of Computer Programming', author: 'Donald E. Knuth', copies: 5, available: 1, category: 'Computer Science' },
  { id: 'ISBN-9780321573513', title: 'Algorithms', author: 'Robert Sedgewick', copies: 20, available: 15, category: 'Mathematics' },
  { id: 'ISBN-9780465026562', title: 'Gödel, Escher, Bach', author: 'Douglas Hofstadter', copies: 8, available: 0, category: 'Cognitive Science' },
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ id: '', title: '', author: '', copies: 1, available: 1, category: '' });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks([...books, { ...newBook, copies: Number(newBook.copies), available: Number(newBook.copies) }]);
    setIsAddModalOpen(false);
    setNewBook({ id: '', title: '', author: '', copies: 1, available: 1, category: '' });
  };

  const handleDelete = (id: string) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management</h1>
          <p className="text-muted-foreground">Manage books, issuing, returning, and library fines.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Issue Book
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add New Book
          </Button>
        </div>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by Title, Author, or ISBN..." 
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
                  <th className="px-6 py-4 font-medium">Book Details</th>
                  <th className="px-6 py-4 font-medium">ISBN</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium text-center">Copies</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                          <Book className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{book.title}</p>
                          <p className="text-xs text-muted-foreground">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{book.id}</td>
                    <td className="px-6 py-4 text-muted-foreground">{book.category}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">{book.available}</span> / <span className="text-muted-foreground">{book.copies}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        book.available > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {book.available > 0 ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Book">
        <form onSubmit={handleAddBook} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">ISBN</label>
            <Input required value={newBook.id} onChange={e => setNewBook({...newBook, id: e.target.value})} placeholder="e.g. ISBN-1234567890" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Book Title</label>
            <Input required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} placeholder="e.g. Introduction to React" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Input required value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} placeholder="e.g. Jane Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input required value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value})} placeholder="e.g. Technology" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Copies</label>
            <Input type="number" required value={newBook.copies} onChange={e => setNewBook({...newBook, copies: Number(e.target.value)})} min="1" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Book</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
