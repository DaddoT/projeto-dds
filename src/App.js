import React from 'react';
import Header from './components/Header';
import Inputs from './components/InputsLogin';
import SignUpUser from './components/SignUpUser';
import SignUpEmpresa from './components/SignUpEmpresa';
import SignUpEmpresarial from './components/SignUpEmpresarial';
import Profile from './components/Profile';
import Options from './components/Options';
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
      <AboutPage />
    </Route>
    <Route path="/profile">
      <ProfilePage />
    </Route>
    <Route path="/pricing">
      <PricingPage />
    </Route>
    <Route path="/home">
      <HomePage />
    </Route>
    <Route path="/signup">
      <SignUpUserPage />
    </Route>
  </Switch>
</Router>
);
}

function HomePage() {
return (
<div className="Home">
  <Header />
  <Inputs />
  </div>
);
}

function AboutPage() {
return (
  <div className="About">
  <Header />
  <AboutText />
  </div>
);
}

function PricingPage() {
return (
  <div className="Pricing">
  <Header />
  <PricingCard />
  </div>
);
}

function SignUpUserPage() {
  return (  
    <div className="SignUp">
    <Header />
    <SignUpUser />
    </div>
  );
}

function SignUpEmpresaPage() {
  return (  
    <div className="SignUp">
    <Header />
    <SignUpEmpresa />
    </div>
  );
}

function SignUpEmpresarialPage() {
  return (  
    <div className="SignUp">
    <Header />
    <SignUpEmpresarial />
    </div>
  );
}

function OptionsPage() {
  return (  
    <div className="Options">
    <Header />
    <Options />
    </div>
  );
}

function ProfilePage() {
  return (  
    <div className="Profile">
    <Header />
    <Profile />
    </div>
  );
}