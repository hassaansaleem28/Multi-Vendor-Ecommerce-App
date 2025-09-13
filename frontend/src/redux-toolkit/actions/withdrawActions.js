import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllWithdraws = createAsyncThunk(
  "getAllWithdraws/load",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/withdraw-request/get-all-withdraw-requests`,
        { withCredentials: true }
      );
      return data.withdraws;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load withdrawss"
      );
    }
  }
);
