import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (_, { getState }) => {
    const { albums } = getState().albums;
    if (albums.length > 0) return albums;

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_ALBUMS_API}`
    );
    return response.json();
  }
);

export const fetchPhotos = createAsyncThunk(
  "albums/fetchPhotos",
  async (_, { getState }) => {
    const { photos } = getState().albums;
    if (photos.length > 0) return photos;

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}${import.meta.env.VITE_PHOTOS_API}`
    );
    return response.json();
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default albumSlice.reducer;
