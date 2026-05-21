import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Trash2, Edit, Building2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const INITIAL_DEPARTMENTS = [
  { id: 'DEP-01', name: 'Computer Science' },
  { id: 'DEP-02', name: 'Mathematics' },
  { id: 'DEP-03', name: 'Physics' },
  { id: 'DEP-04', name: 'Business Admin' },
];

const INITIAL_COURSES = [
  { id: 'CS101', name: 'Introduction to Computer Science', department: 'Computer Science', credits: 4, teacher: 'Dr. Alan Turing', status: 'Active' },
  { id: 'MATH201', name: 'Calculus II', department: 'Mathematics', credits: 3, teacher: 'Ada Lovelace', status: 'Active' },
  { id: 'PHY301', name: 'Quantum Mechanics', department: 'Physics', credits: 4, teacher: 'Dr. Robert Oppenheimer', status: 'Active' },
  { id: 'BUS101', name: 'Principles of Management', department: 'Business Admin', credits: 3, teacher: 'Pending', status: 'Draft' },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for Courses
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ id: '', name: '', department: INITIAL_DEPARTMENTS[0].name, credits: 3, teacher: '', status: 'Active' });

  // State for Departments
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const [newDept, setNewDept] = useState({ name: '' });

  // Handlers for Courses
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses([...courses, { ...newCourse, credits: Number(newCourse.credits) }]);
    setIsAddCourseModalOpen(false);
    setNewCourse({ id: '', name: '', department: departments[0]?.name || '', credits: 3, teacher: '', status: 'Active' });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Handlers for Departments
  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DEP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setDepartments([...departments, { id: newId, name: newDept.name }]);
    setIsAddDeptModalOpen(false);
    setNewDept({ name: '' });
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses & Departments</h1>
          <p className="text-muted-foreground">Manage academic curriculum, departments, and course assignments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsAddDeptModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add Department
          </Button>
          <Button className="gap-2" onClick={() => setIsAddCourseModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add Course
          </Button>
        </div>
      </div>

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
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{course.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 inline-block ${
                            course.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
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
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No courses found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Course Modal */}
      <Modal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)} title="Add New Course">
        <form onSubmit={handleAddCourse} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Code</label>
            <Input required value={newCourse.id} onChange={e => setNewCourse({...newCourse, id: e.target.value})} placeholder="e.g. CS101" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Course Name</label>
            <Input required value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} placeholder="e.g. Intro to Computer Science" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <select 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newCourse.department} 
              onChange={e => setNewCourse({...newCourse, department: e.target.value})}
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
              {departments.length === 0 && <option value="" disabled>No departments available</option>}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Instructor</label>
            <Input required value={newCourse.teacher} onChange={e => setNewCourse({...newCourse, teacher: e.target.value})} placeholder="e.g. Dr. Alan Turing" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Credits</label>
            <Input type="number" required value={newCourse.credits} onChange={e => setNewCourse({...newCourse, credits: Number(e.target.value)})} min="1" max="6" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddCourseModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={departments.length === 0}>Add Course</Button>
          </div>
        </form>
      </Modal>

      {/* Add Department Modal */}
      <Modal isOpen={isAddDeptModalOpen} onClose={() => setIsAddDeptModalOpen(false)} title="Add New Department">
        <form onSubmit={handleAddDepartment} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Department Name</label>
            <Input required value={newDept.name} onChange={e => setNewDept({ name: e.target.value })} placeholder="e.g. Computer Science" />
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
