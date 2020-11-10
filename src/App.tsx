import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Views/Home";
import { Header } from "./Components/Header";

import "./App.scss";
import { HomeHeader } from "./Views/HomeHeader";
import { Body } from "./Components/Body";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Header>
              <HomeHeader />
            </Header>
            <Body>
              <Home />
            </Body>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
