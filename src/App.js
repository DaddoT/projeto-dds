import React, { Component } from 'react';
import Header from './components/Header';
import Inputs from './components/InputsLogin';
import SignUpUser from './components/SignUpUser';
import Profile from './components/Profile';
import AboutText from './components/AboutText';
import PricingCard from './components/PricingCard';
import Loader from './components/Loader';
import { fb, database, auth } from './components/firebase.js';
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import { render } from '@testing-library/react'
import Empresa from './components/Empresa';
import Empresarial from './components/Empresarial';



function PrivateRoute ({component: Component, authed, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component user={user} {...props} />
        : <Redirect to={{pathname: '/signup', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/profile' />}
    />
  )
}



export default class App extends Component {

  state = {
    auth: false,
    loading: true,
    user: null
  }

  componentDidMount(){
    this.authListner = auth.onAuthStateChanged((user)=>{
      if (user) {
        this.setState({
          auth: true,
          loading: false,
          user: [
            user.uid,
            user.email,
          ]
        })
      } else {
        this.setState({
          auth: false,
          loading: false
        })
      }

    })

    console.log(this.state);
  }

  componentWillUnmount(){
    this.authListner();
  }

  render(){
    if (this.state.loading){
      return (<Loader />)
    }
    console.log(this.state)
    return (
      <Router>
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <PrivateRoute authed={this.state.auth} user={this.state.user} path='/profile' component={Profile} />
          <PrivateRoute authed={this.state.auth} user={this.state.user} path='/empresa' component={Empresa} />
          <PrivateRoute authed={this.state.auth} user={this.state.user} path='/empresarial' component={Empresarial} />
          <Route path="/pricing">
            <PricingPage />
          </Route>
          <PublicRoute authed={this.state.auth} path="/home" component={HomePage}/>
          <PublicRoute authed={this.state.auth} path="/signup" component={SignUpUserPage}/>
        </Switch>
      </Router>);
  } 
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

