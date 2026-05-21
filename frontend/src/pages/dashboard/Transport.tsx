import { useState } from 'react';
import { Plus, Search, Filter, Bus, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const INITIAL_ROUTES = [
  { id: 'R-01', routeName: 'City Center - Campus', vehicleNo: 'DL-01-A-1234', driver: 'Mike Johnson', capacity: 40, enrolled: 35 },
  { id: 'R-02', routeName: 'North Suburbs - Campus', vehicleNo: 'DL-01-B-5678', driver: 'Sarah Connor', capacity: 40, enrolled: 40 },
  { id: 'R-03', routeName: 'East Side - Campus', vehicleNo: 'DL-01-C-9012', driver: 'Tom Hanks', capacity: 30, enrolled: 15 },
];

export default function Transport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({ id: '', routeName: '', vehicleNo: '', driver: '', capacity: 40, enrolled: 0 });

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setRoutes([...routes, { ...newRoute, capacity: Number(newRoute.capacity), enrolled: 0 }]);
    setIsAddModalOpen(false);
    setNewRoute({ id: '', routeName: '', vehicleNo: '', driver: '', capacity: 40, enrolled: 0 });
  };

  const handleDelete = (id: string) => {
    setRoutes(routes.filter(r => r.id !== id));
  };

  const filteredRoutes = routes.filter(r => 
    r.routeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transport Management</h1>
          <p className="text-muted-foreground">Manage bus routes, drivers, and student transport allocations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Add Vehicle
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add Route
          </Button>
        </div>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by Route, Vehicle, or Driver..." 
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
                  <th className="px-6 py-4 font-medium">Route Info</th>
                  <th className="px-6 py-4 font-medium">Vehicle No</th>
                  <th className="px-6 py-4 font-medium">Driver</th>
                  <th className="px-6 py-4 font-medium text-center">Occupancy</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route) => (
                  <tr key={route.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                          <Bus className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{route.routeName}</p>
                          <p className="text-xs text-muted-foreground">{route.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{route.vehicleNo}</td>
                    <td className="px-6 py-4 text-muted-foreground">{route.driver}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">{route.enrolled}</span> / <span className="text-muted-foreground">{route.capacity}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        route.enrolled >= route.capacity ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {route.enrolled >= route.capacity ? 'Full' : 'Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(route.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Route">
        <form onSubmit={handleAddRoute} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Route ID</label>
            <Input required value={newRoute.id} onChange={e => setNewRoute({...newRoute, id: e.target.value})} placeholder="e.g. R-04" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Route Name</label>
            <Input required value={newRoute.routeName} onChange={e => setNewRoute({...newRoute, routeName: e.target.value})} placeholder="e.g. West Side - Campus" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Vehicle No</label>
            <Input required value={newRoute.vehicleNo} onChange={e => setNewRoute({...newRoute, vehicleNo: e.target.value})} placeholder="e.g. DL-01-D-1111" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Driver</label>
            <Input required value={newRoute.driver} onChange={e => setNewRoute({...newRoute, driver: e.target.value})} placeholder="e.g. John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Capacity</label>
            <Input type="number" required value={newRoute.capacity} onChange={e => setNewRoute({...newRoute, capacity: Number(e.target.value)})} min="10" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Route</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
