import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

export const updateUser = createAsyncThunk(
  "updateUser/load",
  async ({ email, password, fullName, phoneNumber }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/user/update-user-info`,
        { email, password, fullName, phoneNumber },
        { withCredentials: true }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const updateAddresses = createAsyncThunk(
  "updateAddresses/load",
  async (
    { country, city, zipCode, address1, address2, addressType },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v2/user/update-user-addresses`,
        { country, city, zipCode, address1, address2, addressType },
        { withCredentials: true }
      );
      if (data?.success) toast.success("User Addresses Updated Successfully!");
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update addresses"
      );
    }
  }
);
export const deleteAddress = createAsyncThunk(
  "deleteAddress/load",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/v2/user/delete-user-address/${id}`,
        { withCredentials: true }
      );
      console.log(data.user);
      if (data?.success) toast.success("User address deleted successfully!");
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete address!"
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers/load",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/user/get-all-users`,
        { withCredentials: true }
      );
      return data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch all users!"
      );
    }
  }
);
