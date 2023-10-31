import React from "react";

export const Rating = ({ value, text = false }) => {
  return (
    <>
      {!value ? (
        <div></div>
      ) : (
        <div style={{ color: "var(--color-secondary)" }} className="rating">
          {text && (
            <span style={{ color: "var(--color-black-01)" }}>
              <b>Rating {value}</b>:
            </span>
          )}
          &nbsp;
          <span>
            <i
              className={
                value >= 1
                  ? "fa-solid fa-star"
                  : value >= 0.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                value >= 2
                  ? "fa-solid fa-star"
                  : value >= 1.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                value >= 3
                  ? "fa-solid fa-star"
                  : value >= 2.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                value >= 4
                  ? "fa-solid fa-star"
                  : value >= 3.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                value >= 5
                  ? "fa-solid fa-star"
                  : value >= 4.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span> {text || ""} </span>
        </div>
      )}
    </>
  );
};
