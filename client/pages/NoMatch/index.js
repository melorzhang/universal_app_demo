import React from "react";
import { Link } from "react-router-dom";
import NavBar from "coms/NavBar";
const NoMatch = ({ location }) => {
  console.log("come not match!");
  return <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <NavBar/>
    </div>;
};
export default NoMatch;