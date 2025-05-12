import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers", 
  async (_, { getState, rejectWithValue }) => {
    try {
      const { users } = getState().users;
      if (users.length > 0) return users;

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_USERS_API}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "users/fetchTodos", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_TODOS_API}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching todos:", error);
      return rejectWithValue(error.message || "Failed to fetch todos");
    }
  }
);

export const getAvatarUrl = (name, options = {}) => {
  const defaultOptions = {
    name: encodeURIComponent(name || 'User'),
    background: 'random',  
    size: 128,            
    rounded: true,       
    bold: true,     
    format: 'png',      
    uppercase: true    
  };

  const params = { ...defaultOptions, ...options };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `https://ui-avatars.com/api/?${queryString}`;
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
