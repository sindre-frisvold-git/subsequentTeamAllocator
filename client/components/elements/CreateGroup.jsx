import React from "react";
import { Link } from "react-router-dom";

function CreateGroup() {
  return (
    <Link to="/group/new">
      <div>NEW</div>
    </Link>
  );
}

export default CreateGroup;
