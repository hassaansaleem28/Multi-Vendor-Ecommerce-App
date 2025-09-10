import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const createEvent = createAsyncThunk(
  "events/load",
  async (newForm, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/events/create-event`,
        newForm,
        {
          headers: {
            "Content-type": "mulitpart/form-data",
          },
        }
      );
      return data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load events"
      );
    }
  }
);

export const getAllEventsShop = createAsyncThunk(
  "allEventsShop/load",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/events/get-all-events-shop/${id}`
      );
      return data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load all events"
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "deleteEvent/load",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}/api/v2/events/delete-shop-event/${id}`,
        { withCredentials: true }
      );
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete the event"
      );
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "allEvents/load",
  async (__, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/events/get-all-events`
      );
      return data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get all events"
      );
    }
  }
);

export const getAllEventsAdmin = createAsyncThunk(
  "getAllEventsAdmin/load",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v2/events/get-all-events-admin`,
        {
          withCredentials: true,
        }
      );
      return data.events;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get all events for admin!"
      );
    }
  }
);
