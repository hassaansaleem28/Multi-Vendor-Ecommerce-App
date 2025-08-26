import { createReducer } from "@reduxjs/toolkit";
import { clearErrors } from "../actions/userActions";
import {
  createEvent,
  getAllEventsShop,
  deleteEvent,
  getAllEvents,
} from "../actions/eventActions";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, builder => {
  builder
    // create a event
    .addCase(createEvent.pending, state => {
      state.isLoading = true;
    })
    .addCase(createEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.events = action.payload;
    })
    .addCase(createEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    // get all the events for a shop
    .addCase(getAllEventsShop.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllEventsShop.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase(getAllEventsShop.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete the event
    .addCase(deleteEvent.pending, state => {
      state.isLoading = true;
    })
    .addCase(deleteEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase(deleteEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getAllEvents.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAllEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase(getAllEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    });
});
