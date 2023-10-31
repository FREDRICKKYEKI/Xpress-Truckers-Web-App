import { configureStore } from "@reduxjs/toolkit";

const ACTIONS = {
  // ACTIONS
  SET_CURRENT_LOCATION: "SET_CURRENT_LOCATION",
  SET_DESTINATION: "SET_DESTINATION",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_PROMISE_STATE: "SET_PROMISE_STATE",
};

export const setCurrentLocation = (location) => {
  return {
    type: ACTIONS.SET_CURRENT_LOCATION,
    payload: location,
  };
};

export const setDestination = (destination) => {
  return {
    type: ACTIONS.SET_DESTINATION,
    payload: destination,
  };
};

export const setIsLoading = (isLoading) => {
  return {
    type: ACTIONS.SET_IS_LOADING,
    payload: isLoading,
  };
};

export const setPromiseState = (promiseState, message = null) => {
  return {
    type: ACTIONS.SET_PROMISE_STATE,
    payload: { state: promiseState, message: message },
  };
};

const initialLocationData = {
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
};

const initialState = {
  currentLocation: initialLocationData,
  isLoading: false,
  destination: null,
  promiseState: { state: null, message: null },
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
    case ACTIONS.SET_PROMISE_STATE:
      return {
        ...state,
        promiseState: payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});
