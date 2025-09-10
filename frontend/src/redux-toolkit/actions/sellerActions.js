import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loadSeller = createAsyncThunk(
  "seller/load",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/seller/getSeller`,
        {
          withCredentials: true,
        }
      );
      return data.seller;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load seller"
      );
    }
  }
);

export const getAllSellers = createAsyncThunk(
  "getSellers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/seller/get-all-sellers-admin`,
        { withCredentials: true }
      );
      return data.sellers;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch all sellers"
      );
    }
  }
);
