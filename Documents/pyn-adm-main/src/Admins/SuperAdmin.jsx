import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchSuperAdminData = createAsyncThunk(
  'superAdmin/fetchSuperAdminData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_SUPER_ADMIN_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch super admin data');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  superAdmin: null, 
  success: false,
  loading: false,
  error: null,
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperAdminData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdminData.fulfilled, (state, action) => {
        state.loading = false;
        state.superAdmin = action.payload.data; 
        state.success = true;
      })
      .addCase(fetchSuperAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default superAdminSlice.reducer;
