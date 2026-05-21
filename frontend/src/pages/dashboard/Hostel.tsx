import { useState } from 'react';
import { Plus, Trash2, Home } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const INITIAL_HOSTELS = [
  { id: 'H-Alpha', name: 'Alpha Boys Hostel', capacity: 200, occupied: 180, warden: 'Mr. John Doe', type: 'Boys' },
  { id: 'H-Beta', name: 'Beta Girls Hostel', capacity: 150, occupied: 145, warden: 'Mrs. Jane Smith', type: 'Girls' },
  { id: 'H-Gamma', name: 'Gamma International', capacity: 100, occupied: 60, warden: 'Dr. Emily Chen', type: 'Co-ed' },
];

export default function Hostel() {
  const [hostels, setHostels] = useState(INITIAL_HOSTELS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHostel, setNewHostel] = useState({ id: '', name: '', capacity: 100, occupied: 0, warden: '', type: 'Boys' });

  const handleAddHostel = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `H-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setHostels([...hostels, { ...newHostel, id: generatedId, capacity: Number(newHostel.capacity), occupied: 0 }]);
    setIsAddModalOpen(false);
    setNewHostel({ id: '', name: '', capacity: 100, occupied: 0, warden: '', type: 'Boys' });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHostels(hostels.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hostel Management</h1>
          <p className="text-muted-foreground">Manage hostel rooms, allocations, and warden details.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Allocate Room
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add Hostel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {hostels.map(hostel => (
          <Card key={hostel.id} className="border-border/50 shadow-soft hover:shadow-glow transition-all cursor-pointer relative group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{hostel.name}</h3>
                    <p className="text-xs text-muted-foreground">{hostel.type} Hostel</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => handleDelete(hostel.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-medium">{hostel.occupied} / {hostel.capacity}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(hostel.occupied / hostel.capacity) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground pt-2 border-t border-border">
                  <span className="font-medium">Warden:</span> {hostel.warden}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Hostel">
        <form onSubmit={handleAddHostel} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hostel Name</label>
            <Input required value={newHostel.name} onChange={e => setNewHostel({...newHostel, name: e.target.value})} placeholder="e.g. Delta Block" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hostel Type</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newHostel.type} 
              onChange={e => setNewHostel({...newHostel, type: e.target.value})}
            >
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Co-ed">Co-ed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Capacity</label>
            <Input type="number" required value={newHostel.capacity} onChange={e => setNewHostel({...newHostel, capacity: Number(e.target.value)})} min="10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Warden Name</label>
            <Input required value={newHostel.warden} onChange={e => setNewHostel({...newHostel, warden: e.target.value})} placeholder="e.g. Mr. Smith" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Hostel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
