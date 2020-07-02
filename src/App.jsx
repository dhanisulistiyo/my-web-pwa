import React from "react";
import logo from "./logo.svg";
import "./themes/App.css";

class App extends React.Component {
  componentDidMount() {
    const elem = document.getElementById("startingLoader");
    window.onload = () => {
      if (elem) {
        elem.remove();
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
