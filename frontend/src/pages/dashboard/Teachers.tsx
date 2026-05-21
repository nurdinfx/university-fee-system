import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../features/store';
import { addTeacher, editTeacher, deleteTeacher } from '../../features/teacherSlice';
import type { Teacher } from '../../features/teacherSlice';
import { Search, Filter, Trash2, Edit3, UserCheck } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

export default function Teachers() {
  const dispatch = useDispatch();
  const teachers = useSelector((state: RootState) => state.teachers.list);
  const departments = useSelector((state: RootState) => state.departments.list);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [status, setStatus] = useState<'Active' | 'On Leave'>('Active');

  const openAddModal = () => {
    setEditingTeacher(null);
    setName('');
    setEmail('');
    setDepartment(departments[0]?.name || '');
    setDesignation('Assistant Professor');
    setStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setDepartment(teacher.department);
    setDesignation(teacher.designation);
    setStatus(teacher.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingTeacher) {
      dispatch(editTeacher({
        id: editingTeacher.id,
        name,
        email,
        department,
        designation,
        status
      }));
    } else {
      dispatch(addTeacher({
        name,
        email,
        department,
        designation,
        status
      }));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this faculty profile?')) {
      dispatch(deleteTeacher(id));
    }
  };

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Management</h1>
          <p className="text-muted-foreground">Manage faculty profiles, department assignments, and schedules.</p>
        </div>
        <Button onClick={openAddModal} className="gap-2">
          <UserCheck className="w-4 h-4" /> Add New Teacher
        </Button>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search teachers by name, ID, or email..." 
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
                  <th className="px-6 py-4 font-medium">Faculty Info</th>
                  <th className="px-6 py-4 font-medium">Employee ID</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Designation</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <UserCheck className="w-8 h-8 opacity-30" />
                        <p>No faculty records found.</p>
                        <p className="text-xs opacity-60">Click "Add New Teacher" to appoint the first faculty member.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                            {teacher.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{teacher.name}</p>
                            <p className="text-xs text-muted-foreground">{teacher.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{teacher.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">{teacher.department}</td>
                      <td className="px-6 py-4 text-muted-foreground">{teacher.designation}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          teacher.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(teacher)} className="h-8 w-8 hover:text-primary">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(teacher.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
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

      {/* Add/Edit Teacher Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingTeacher ? 'Edit Faculty Details' : 'Appoint New Teacher'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              placeholder="e.g. Dr. Jane Doe" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input 
              type="email" 
              placeholder="name@university.edu" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              {departments.length === 0 ? (
                <p className="text-xs text-destructive p-2 border border-destructive/30 rounded-md bg-destructive/10">
                  No departments yet. Add one from Courses & Depts page first.
                </p>
              ) : (
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={department} 
                  onChange={e => setDepartment(e.target.value)}
                  required
                >
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Designation</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={designation} 
                onChange={e => setDesignation(e.target.value)}
              >
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="HOD">HOD</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={status} 
              onChange={e => setStatus(e.target.value as any)}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={departments.length === 0}>
              {editingTeacher ? 'Save Changes' : 'Appoint'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
