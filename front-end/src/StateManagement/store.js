import { configureStore } from "@reduxjs/toolkit";

const ACTIONS = {
  // ACTIONS
  SET_CURRENT_LOCATION: "SET_CURRENT_LOCATION",
  SET_DESTINATION: "SET_DESTINATION",
  SET_IS_LOADING: "SET_IS_LOADING",
};

export const setCurrentLocation = (location) => {
  return {
    type: ACTIONS.SET_CURRENT_LOCATION,
    payload: location,
  };
};

export const setIsLoading = (isLoading) => {
  return {
    type: ACTIONS.SET_IS_LOADING,
    payload: isLoading,
  };
};

export const setDestination = (destination) => {
  return {
    type: ACTIONS.SET_DESTINATION,
    payload: destination,
  };
};

const initialState = {
  currentLocation: {
    bounds: {
      northeast: {
        lat: "-1.16067",
        lng: "37.10487",
      },
      southwest: {
        lat: "-1.44488",
        lng: "36.66470",
      },
    },
    formatted: "Nairobi, Kenya",
    geometry: {
      lat: "-1.292066",
      lng: "36.821946",
    },
    name: "Nairobi",
  },
  isLoading: false,
  destination: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: payload,
      };
    case ACTIONS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ACTIONS.SET_DESTINATION:
      return {
        ...state,
        destination: payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});
