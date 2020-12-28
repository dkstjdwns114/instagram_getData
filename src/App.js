import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AxiosData from "./AxiosData";
import Username from "./Username";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Username} />
            <Route exact path="/profileDetail/:username" component={Username} />
            <Route
              exact
              path="/postDetail/:username/:shortcode"
              component={Username}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
