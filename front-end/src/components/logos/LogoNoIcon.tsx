import { routes } from "../../utils/constants";

const firtLetterStyle = {
  v1: {
    color: "var(--color-white-03)",
    fontSize: "25px",
  },
  v2: {
    color: "var(--color-secondary)",
    fontSize: "25px",
  },
};
const color = {
  v1: "var(--color-secondary)",
  v2: "var(--color-black-01)",
};

export const LogoBrandName = ({ variant = "v1" }: { variant: "v1" | "v2" }) => {
  return (
    <a href={routes.home} className="logo">
      <h4 className="brand-name bold">
        <span style={firtLetterStyle[variant]}>X</span>
        <span style={{ color: color[variant] }}>
          press <br />
          &nbsp;&nbsp;
          <span style={firtLetterStyle[variant]}>T</span>
          ruckers
        </span>
      </h4>
    </a>
  );
};
