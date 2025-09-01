import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllOrdersUser = createAsyncThunk(
  "getAllOrdersUser/load",
  async (userId, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/order/get-all-orders/${userId}`
      );
      return data.orders;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to get all orders for this user!"
      );
    }
  }
);

export const getAllOrdersShop = createAsyncThunk(
  "getAllOrdersShop/load",
  async (shopId, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/order/get-all-seller-orders/${shopId}`
      );
      return data.orders;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }
);
