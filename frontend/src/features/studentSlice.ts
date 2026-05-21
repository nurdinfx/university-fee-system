import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  status: 'Active' | 'Graduating' | 'Suspended';
}

interface StudentState {
  list: Student[];
}

const initialState: StudentState = {
  list: [
    { id: 'STU001', name: 'Alice Johnson', email: 'alice.j@university.edu', department: 'Computer Science', year: '3rd Year', status: 'Active' },
    { id: 'STU002', name: 'Bob Smith', email: 'bob.s@university.edu', department: 'Business Admin', year: '2nd Year', status: 'Active' },
    { id: 'STU003', name: 'Charlie Brown', email: 'charlie.b@university.edu', department: 'Mechanical Eng', year: '4th Year', status: 'Graduating' },
    { id: 'STU004', name: 'Diana Prince', email: 'diana.p@university.edu', department: 'Arts & Humanities', year: '1st Year', status: 'Active' },
    { id: 'STU005', name: 'Evan Wright', email: 'evan.w@university.edu', department: 'Computer Science', year: '3rd Year', status: 'Suspended' },
  ]
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Omit<Student, 'id'> & { id?: string }>) => {
      const nextId = `STU${String(state.list.length + 1).padStart(3, '0')}`;
      state.list.unshift({ ...action.payload, id: action.payload.id || nextId } as Student);
    },
    editStudent: (state, action: PayloadAction<Student>) => {
      const idx = state.list.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(s => s.id !== action.payload);
    }
  }
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
