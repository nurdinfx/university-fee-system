import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Department {
  id: string;
  name: string;
}

interface DepartmentState {
  list: Department[];
}

const initialState: DepartmentState = {
  list: [],
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    addDepartment: (state, action: PayloadAction<Department>) => {
      state.list.push(action.payload);
    },
    deleteDepartment: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(d => d.id !== action.payload);
    },
  },
});

export const { addDepartment, deleteDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
