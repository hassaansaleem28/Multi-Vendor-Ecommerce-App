import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const createProduct = createAsyncThunk(
  "product/load",
  async (newForm, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/product/create-product`,
        newForm
      );
      return data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const getAllProductsShop = createAsyncThunk(
  "allProducts/load",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/product/get-all-products-shop/${id}`
      );
      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load all products"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct/load",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/v2/product/delete-shop-product/${id}`,
        { withCredentials: true }
      );
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete the product"
      );
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "getAllProducts/load",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/product/get-all-products`
      );
      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load all products"
      );
    }
  }
);

export const getAllProductsAdmin = createAsyncThunk(
  "getAllProductsAdmin/load",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/product/get-all-products-admin`,
        { withCredentials: true }
      );
      return data.products;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to load all products for admin!"
      );
    }
  }
);
