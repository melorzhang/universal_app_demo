import React from "react";
import NavBar from "coms/NavBar";

const Home = () => (
  <div>
    <h1 className="f20">hello react!</h1>
    <NavBar />
    <img src={require("assets/images/demo.png")} alt="" />
    <img src={require("assets/images/demo_big.jpg")} alt="" />
  </div>
);
export default Home;