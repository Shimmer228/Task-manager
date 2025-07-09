import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/boards`;


export const createBoard = createAsyncThunk("board/create", async () => {
  const res = await axios.post(API);
  return res.data.id as string;
});

const boardSlice = createSlice({
  name: "board",
  initialState: {
    id: "",
  },
  reducers: {
    setBoardId: (state, action) => {
      state.id = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.id = action.payload;
    });
  }
});

export const { setBoardId } = boardSlice.actions;
export default boardSlice.reducer;
