import { configureStore } from "@reduxjs/toolkit";

const ACTIONS = {
  // ACTIONS
  SET_CURRENT_LOCATION: "SET_CURRENT_LOCATION",
};

export const setCurrentLocation = (location) => {
  // ACTION CREATOR
  return {
    type: ACTIONS.SET_CURRENT_LOCATION,
    payload: location,
  };
};

const initialState = {
  // INITIAL STATE
  currentLocation: [-1.292066, 36.821946],
};

const reducer = (state = initialState, { type, payload }) => {
  // REDUCER
  switch (type) {
    case ACTIONS.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});
