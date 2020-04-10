import React from 'react';
import Header from './components/Header';
import Inputs from './components/Inputs';
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
    <Route path="/Pricing">
      <Pricing />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
</Router>
);
}

function Home() {
return (
<div className="App">
  <Header />
  <Inputs />
  </div>
);
}

function About() {
return (
  <Header />
);
}

function Pricing() {
return (
  <Header />
);
}



// export default App;


