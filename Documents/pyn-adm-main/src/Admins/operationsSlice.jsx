
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchOperationsData = createAsyncThunk(
  'operations/fetchOperationsData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_OPERATIONS_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch operations data');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  operations: null,
  success: false,
  loading: false,
  error: null,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    logOut: (state) => {
        state.customer = null;
        state.success = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperationsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperationsData.fulfilled, (state, action) => {
        state.loading = false;
        state.operations = action.payload.data;
        state.success = true;
      })
      .addCase(fetchOperationsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = operationsSlice.actions;
export default operationsSlice.reducer;
