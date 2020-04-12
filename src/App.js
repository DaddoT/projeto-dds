import React from 'react';
import Header from './components/Header';
import Inputs from './components/InputsLogin';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import AboutText from './components/AboutText';
import PricingCard from './components/PricingCard';
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
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/pricing">
      <Pricing />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/signup">
      <SignUpPage />
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
  <div className="About">
  <Header />
  <AboutText />
  </div>
);
}

function Pricing() {
return (
  <div className="Pricing">
  <Header />
  <PricingCard />
  </div>
);
}

function SignUpPage() {
  return (  
    <div className="SignUp">
    <Header />
    <SignUp />
    </div>
  );
}