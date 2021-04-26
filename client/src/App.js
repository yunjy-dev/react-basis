import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage    from "./components/views/LandingPage/LandingPage";
import RegisterPage   from "./components/views/RegisterPage/RegisterPage";
import LoginPage      from "./components/views/LoginPage/LoginPage";
import AboutPage      from "./components/views/AboutPage/AboutPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}