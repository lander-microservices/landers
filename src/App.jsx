import React from "react";
import ReactDOM from "react-dom";

import Lander1 from "./pages/lander1"
import "./index.css";

const App = () => (
    
  <>
    <Lander1 init={()=> {}} number="(800)888888" callClickCb={()=>{}} />
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
