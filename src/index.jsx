
/*const mountedApp= createRoot(document.getElementById('root'))
mountedApp.render(<div>hello world!</div>);*/

// test api fetching
/*fetch("https://tarotapi.dev/api/v1/cards/random?n=10")
  .then(function (response) {
    console.log("HTTP status:", response.status);
    return response.json();
  })
  .then(function (response) {
    console.log("Tarot API data:", response);
  })
  .catch(function (error) {
    console.error("Fetch failed:", error);
  });*/


import { reactiveModel } from "./mobxReactiveModel.js";
import { createElement, Fragment } from "react";
import { ReactRoot } from "./reactjs/ReactRoot.jsx";
import { createRoot } from "react-dom/client";

window.React = { createElement, Fragment }; // needed in the lab because it works with both React and Vue

const mountedApp = createRoot(document.getElementById('root'));
mountedApp.render(<ReactRoot model={reactiveModel} />);
