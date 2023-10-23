import { NavLink } from "react-router-dom";

export const Logo1 = () => {
  return (
    <a href="/" className="logo">
      <h5
        className="brand-name"
        style={{
          color: "var--color-secondary",
        }}
      >
        <span style={{ color: "var(--color-white-03)", fontSize: "25px" }}>
          X
        </span>
        <span style={{ color: "var(--color-secondary)" }}>
          press <br />
          &nbsp;&nbsp;
          <span style={{ color: "var(--color-white-03)", fontSize: "25px" }}>
            T
          </span>
          ruckers
        </span>
      </h5>
    </a>
  );
};
