import React from 'react';
import Header from './components/Header';
import Inputs from './components/InputsLogin';
import SingUp from './components/SignUp';
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
return (
<Router>
  {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
  <Switch>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/pricing">
      <Pricing />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
  </Switch>
</Router>
);
}

function Home() {
return (
<div className="Home">
  <Header />
  <Inputs />
  </div>
);
}

function About() {
return (
  <div className="Home">
  <Header />
 
  </div>
);
}

function Pricing() {
return (
  <div className="Home">
  <Header />
  
  </div>
);
}

function SignUp() {
  return (  
    <div className="SignUp">
    <Header />
    <SingUp />
    </div>
  );
}