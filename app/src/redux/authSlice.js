import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'role',
  initialState: null,
  reducers: {
    setAuthRole: (state, actions) => actions.payload,
  },
});

export const { setAuthRole } = authSlice.actions;
export default authSlice.reducer;
