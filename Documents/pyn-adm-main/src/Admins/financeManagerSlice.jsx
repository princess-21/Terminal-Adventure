import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch finance manager data (firstname, lastname, email only)
export const fetchFinanceManagerData = createAsyncThunk(
  'financeManager/fetchFinanceManagerData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_FINANCE_MANAGER_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch finance manager data');
      }

      return data; // Expecting API response with firstname, lastname, email
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  financeManager: null,
  success: false,
  loading: false,
  error: null,
};

const financeManagerSlice = createSlice({
  name: 'financeManager',
  initialState,
  reducers: {
    logOut: (state) => {
        state.customer = null;
        state.success = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceManagerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceManagerData.fulfilled, (state, action) => {
        state.loading = false;
        state.financeManager = action.payload.data; // API should provide firstname, lastname, email
        state.success = true;
      })
      .addCase(fetchFinanceManagerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = financeManagerSlice.actions;
export default financeManagerSlice.reducer;
