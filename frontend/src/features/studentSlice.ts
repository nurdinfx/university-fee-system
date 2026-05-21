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
  list: []
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
