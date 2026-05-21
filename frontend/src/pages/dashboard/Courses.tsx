import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const INITIAL_COURSES = [
  { id: 'CS101', name: 'Introduction to Computer Science', department: 'Computer Science', credits: 4, teacher: 'Dr. Alan Turing', status: 'Active' },
  { id: 'MATH201', name: 'Calculus II', department: 'Mathematics', credits: 3, teacher: 'Ada Lovelace', status: 'Active' },
  { id: 'PHY301', name: 'Quantum Mechanics', department: 'Physics', credits: 4, teacher: 'Dr. Robert Oppenheimer', status: 'Active' },
  { id: 'BUS101', name: 'Principles of Management', department: 'Business Admin', credits: 3, teacher: 'Pending', status: 'Draft' },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ id: '', name: '', department: '', credits: 3, teacher: '', status: 'Active' });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses([...courses, { ...newCourse, credits: Number(newCourse.credits) }]);
    setIsAddModalOpen(false);
    setNewCourse({ id: '', name: '', department: '', credits: 3, teacher: '', status: 'Active' });
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
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
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Add Department
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
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
                    <td className="px-6 py-4 text-muted-foreground">{course.department}</td>
                    <td className="px-6 py-4 text-muted-foreground">{course.teacher}</td>
                    <td className="px-6 py-4 text-muted-foreground">{course.credits} Cr</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Course">
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
            <Input required value={newCourse.department} onChange={e => setNewCourse({...newCourse, department: e.target.value})} placeholder="e.g. Computer Science" />
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
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
