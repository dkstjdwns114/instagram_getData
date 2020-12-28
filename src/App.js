import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HashtagPost from "./HashtagPost";
import UsernamePost from "./UsernamePost";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={UsernamePost} />
            <Route
              exact
              path="/profileDetail/:username"
              component={UsernamePost}
            />
            <Route
              exact
              path="/postDetail/:username/:shortcode"
              component={UsernamePost}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
