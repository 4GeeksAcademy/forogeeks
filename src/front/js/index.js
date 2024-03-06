//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//import your own components
import Layout from "./layout";

// STYLES
import "../css/styles.css";
import "../css/bootstrap.css";

//JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";


//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
