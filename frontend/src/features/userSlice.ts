import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Registrar' | 'Accountant' | 'Staff';
  status: 'Active' | 'Inactive';
  lastLogin?: string;
}

interface UserState {
  list: SystemUser[];
}

// Initial demo user (the super admin)
const initialState: UserState = {
  list: [
    {
      id: '1',
      name: 'System Administrator',
      email: 'admin@university.edu',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0]
    }
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<SystemUser>) => {
      state.list.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<SystemUser>) => {
      const index = state.list.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
