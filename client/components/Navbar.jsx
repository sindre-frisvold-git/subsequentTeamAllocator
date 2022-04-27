import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <Link to="/">
        <img src="/images/eda-logo.png" alt="EDA Logo" style={{ maxWidth: 40 }} />
      </Link>
    </div>
  );
}

export default Navbar;
