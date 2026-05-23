import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import teacherReducer from './teacherSlice';
import financeReducer from './financeSlice';
import departmentReducer from './departmentSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    finance: financeReducer,
    departments: departmentReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
