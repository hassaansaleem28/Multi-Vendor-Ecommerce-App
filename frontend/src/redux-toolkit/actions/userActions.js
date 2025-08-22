import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const clearErrors = createAction("user/clearErrors");
export const loadUser = createAsyncThunk("user/load", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v2/user/get-user`, {
      withCredentials: true,
    });
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to load user"
    );
  }
});
