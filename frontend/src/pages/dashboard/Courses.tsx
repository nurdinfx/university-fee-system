import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../features/store';
import { addDepartment, deleteDepartment } from '../../features/departmentSlice';
import { Plus, Search, Filter, BookOpen, Trash2, Edit, Building2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

interface Course {
  id: string;
  name: string;
  department: string;
  credits: number;
  teacher: string;
  status: 'Active' | 'Draft';
}

export default function Courses() {
  const dispatch = useDispatch();
  const departments = useSelector((state: RootState) => state.departments.list);

  const [searchTerm, setSearchTerm] = useState('');

  // Courses state — starts empty, user adds all courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Course>({
    id: '', name: '', department: '', credits: 3, teacher: '', status: 'Active'
  });

  // Departments add modal
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');

  // Open add course modal — pre-select first available department
  const openAddCourseModal = () => {
    setNewCourse({
      id: '', name: '',
      department: departments[0]?.name || '',
      credits: 3, teacher: '', status: 'Active'
    });
    setIsAddCourseModalOpen(true);
  };

  // Handlers for Courses
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses(prev => [...prev, { ...newCourse, credits: Number(newCourse.credits) }]);
    setIsAddCourseModalOpen(false);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Handlers for Departments
  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DEP-${Date.now()}`;
    dispatch(addDepartment({ id: newId, name: newDeptName.trim() }));
    setIsAddDeptModalOpen(false);
    setNewDeptName('');
  };

  const handleDeleteDepartment = (id: string) => {
    if (window.confirm('Delete this department? Courses assigned to it will remain but show the old name.')) {
      dispatch(deleteDepartment(id));
    }
  };

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses & Departments</h1>
          <p className="text-muted-foreground">Manage academic curriculum, departments, and course assignments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsAddDeptModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add Department
          </Button>
          <Button className="gap-2" onClick={openAddCourseModal} disabled={departments.length === 0}>
            <Plus className="w-4 h-4" /> Add Course
          </Button>
        </div>
      </div>

      {/* Departments List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Departments
          <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {departments.length}
          </span>
        </h2>
        {departments.length === 0 ? (
          <div className="border border-dashed border-border rounded-xl p-8 text-center text-muted-foreground">
            <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="font-medium">No departments yet</p>
            <p className="text-xs mt-1 opacity-60">Click "Add Department" above to create the first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {departments.map(dept => (
              <div
                key={dept.id}
                className="flex items-center justify-between gap-2 bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{dept.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteDepartment(dept.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex-shrink-0"
                  title="Delete department"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Courses Table */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Courses
          <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {courses.length}
          </span>
        </h2>

        {departments.length === 0 && (
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm">
            ⚠️ You must add at least one department before you can add courses.
          </div>
        )}

        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-0">
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses by code or name..."
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
                    <th className="px-6 py-4 font-medium">Course Info</th>
                    <th className="px-6 py-4 font-medium">Course Code</th>
                    <th className="px-6 py-4 font-medium">Department</th>
                    <th className="px-6 py-4 font-medium">Instructor</th>
                    <th className="px-6 py-4 font-medium">Credits</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <BookOpen className="w-8 h-8 opacity-30" />
                          <p>No courses added yet.</p>
                          <p className="text-xs opacity-60">
                            {departments.length === 0
                              ? 'Add a department first, then you can add courses.'
                              : 'Click "Add Course" to create the first course.'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <tr key={course.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{course.name}</p>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 inline-block ${
                                course.status === 'Active'
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {course.status}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">{course.id}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3 h-3" /> {course.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{course.teacher}</td>
                        <td className="px-6 py-4 text-muted-foreground">{course.credits} Cr</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost" size="icon"
                              onClick={() => handleDeleteCourse(course.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
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
      </div>

      {/* ── Add Course Modal ── */}
      <Modal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)} title="Add New Course">
        <form onSubmit={handleAddCourse} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Code</label>
            <Input required value={newCourse.id} onChange={e => setNewCourse({ ...newCourse, id: e.target.value })} placeholder="e.g. CS101" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Name</label>
            <Input required value={newCourse.name} onChange={e => setNewCourse({ ...newCourse, name: e.target.value })} placeholder="e.g. Introduction to Computer Science" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <select
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={newCourse.department}
              onChange={e => setNewCourse({ ...newCourse, department: e.target.value })}
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Instructor</label>
              <Input required value={newCourse.teacher} onChange={e => setNewCourse({ ...newCourse, teacher: e.target.value })} placeholder="e.g. Dr. Alan Turing" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Credits</label>
              <Input type="number" required value={newCourse.credits} onChange={e => setNewCourse({ ...newCourse, credits: Number(e.target.value) })} min="1" max="6" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={newCourse.status}
              onChange={e => setNewCourse({ ...newCourse, status: e.target.value as 'Active' | 'Draft' })}
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddCourseModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Course</Button>
          </div>
        </form>
      </Modal>

      {/* ── Add Department Modal ── */}
      <Modal isOpen={isAddDeptModalOpen} onClose={() => setIsAddDeptModalOpen(false)} title="Add New Department">
        <form onSubmit={handleAddDepartment} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Department Name</label>
            <Input
              required
              value={newDeptName}
              onChange={e => setNewDeptName(e.target.value)}
              placeholder="e.g. Computer Science"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddDeptModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Department</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
