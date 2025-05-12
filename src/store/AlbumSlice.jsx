import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { albums } = getState().albums;
      if (albums.length > 0) return albums;

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_ALBUMS_API}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching albums:", error);
      return rejectWithValue(error.message || "Failed to fetch albums");
    }
  }
);

export const fetchPhotos = createAsyncThunk(
  "albums/fetchPhotos",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { photos } = getState().albums;
      if (photos.length > 0) return photos;

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_PHOTOS_API}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching photos:", error);
      return rejectWithValue(error.message || "Failed to fetch photos");
    }
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    photos: [],
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
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
        state.error = null;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
        state.error = null;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearErrors } = albumSlice.actions;
export default albumSlice.reducer;
