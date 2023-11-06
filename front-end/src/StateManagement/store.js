import { configureStore } from "@reduxjs/toolkit";
import { initialLocationData } from "../utils/constants";

const ACTIONS = {
  // ACTIONS
  SET_CURRENT_LOCATION: "SET_CURRENT_LOCATION",
  SET_DESTINATION: "SET_DESTINATION",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_PROMISE_STATE: "SET_PROMISE_STATE",
  SET_DRIVERS: "SET_DRIVERS",
  SET_SERVICES: "SET_SERVICES",
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

export const setDrivers = (drivers) => {
  return {
    type: ACTIONS.SET_DRIVERS,
    payload: drivers,
  };
};

export const setServices = (services) => {
  return {
    type: ACTIONS.SET_SERVICES,
    payload: services,
  };
};

const initialState = {
  currentLocation: initialLocationData,
  isLoading: false,
  destination: null,
  promiseState: { state: null, message: null },
  drivers: [],
  services: null,
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
    case ACTIONS.SET_DRIVERS:
      return {
        ...state,
        drivers: payload,
      };
    case ACTIONS.SET_SERVICES:
      return {
        ...state,
        services: payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});
