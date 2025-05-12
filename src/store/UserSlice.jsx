import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_USERS_API}`
  );
  return response.json();
});

export const fetchTodos = createAsyncThunk("users/fetchTodos", async () => {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_TODOS_API}`
  );
  return response.json();
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
