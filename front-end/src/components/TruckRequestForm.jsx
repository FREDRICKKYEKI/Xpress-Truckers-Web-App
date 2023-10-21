import React from "react";

export const TruckRequestForm = () => {
  return (
    <div className="truck-request-form">
      <h5 className="text-center">Search For Truck</h5>

      <div class="mb-1 form-group">
        <label for="origin">Where are you now?</label>
        <input id="origin" type="text" class="form-control" />
      </div>

      <div class="mb-1 form-group">
        <label for="destination">Destination</label>
        <input id="destination" type="text" class="form-control" />
        <ul data-role="places" class="places-list"></ul>
      </div>

      <div class="input-group mb-2 justify-content-between">
        <label class="form-check-label fs-6" for="services">
          Vehicle Type:
        </label>
        <select id="v-type" class="custom-select p-2 w-100">
          <option selected>Choose...</option>
          <option value="pickup">Pickup (small)</option>
          <option value="van">Lorry (medium)</option>
          <option value="other">Truck (Large)</option>
        </select>
      </div>

      <label class="form-check-label" for="services">
        Choose a service
      </label>
      <div id="services" class="mb-0 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label data-role="service" class="form-check-label" for="exampleCheck1">
          Moving out
        </label>
      </div>
      <div class="mb-0 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck2" />
        <label data-role="service" class="form-check-label" for="exampleCheck2">
          Transport Construction Materials
        </label>
      </div>
      <div class="mb-0 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck3" />
        <label data-role="service" class="form-check-label" for="exampleCheck3">
          Transport Farm Produce
        </label>
      </div>
      <div class="mb-2 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck4" />
        <label data-role="service" class="form-check-label" for="exampleCheck4">
          Long Distance Transportation
        </label>
      </div>
      <button class="btn btn-primary w-100" type="submit">
        Request Truck
      </button>
    </div>
  );
};
