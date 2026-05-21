import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  status: 'Active' | 'On Leave';
}

interface TeacherState {
  list: Teacher[];
}

const initialState: TeacherState = {
  list: [
    { id: 'EMP001', name: 'Dr. Robert Oppenheimer', email: 'robert.o@university.edu', department: 'Physics', designation: 'Professor', status: 'Active' },
    { id: 'EMP002', name: 'Prof. Marie Curie', email: 'marie.c@university.edu', department: 'Chemistry', designation: 'HOD', status: 'Active' },
    { id: 'EMP003', name: 'Dr. Alan Turing', email: 'alan.t@university.edu', department: 'Computer Science', designation: 'Associate Professor', status: 'On Leave' },
    { id: 'EMP004', name: 'Ada Lovelace', email: 'ada.l@university.edu', department: 'Mathematics', designation: 'Assistant Professor', status: 'Active' },
  ]
};

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    addTeacher: (state, action: PayloadAction<Omit<Teacher, 'id'> & { id?: string }>) => {
      const nextId = `EMP${String(state.list.length + 1).padStart(3, '0')}`;
      state.list.unshift({ ...action.payload, id: action.payload.id || nextId } as Teacher);
    },
    editTeacher: (state, action: PayloadAction<Teacher>) => {
      const idx = state.list.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
    },
    deleteTeacher: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTeacher, editTeacher, deleteTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
