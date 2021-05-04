import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Providers } from "./context";

ReactDOM.render(
  <Router>
    <Providers>
      <App />
    </Providers>
  </Router>,
  document.getElementById("root")
);
