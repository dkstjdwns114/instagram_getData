import React, { Component } from "react";
import Post from "./Post";
import ProfileDetail from "./ProfileDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostDetail from "./PostDetail";
import AxiosData from "./AxiosData";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={AxiosData} />
            <Route exact path="/profileDetail/:id" component={ProfileDetail} />
            <Route exact path="/postDetail/:idx" component={PostDetail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
