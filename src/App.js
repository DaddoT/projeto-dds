import React, { Component } from 'react';
import Header from './components/Header';
import Inputs from './components/InputsLogin';
import SignUpUser from './components/SignUpUser';
import Profile from './components/Profile';
import Options from './components/Options';
import AboutText from './components/AboutText';
import PricingCard from './components/PricingCard';
import { fb, database, auth } from './components/firebase.js';

import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { render } from '@testing-library/react';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
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
    loading: true
  }

  componentDidMount(){
    this.authListner = auth.onAuthStateChanged((user)=>{
      if (user) {
        this.setState({
          auth: true,
          loading: false,
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
      return (<h1>loading..</h1>)
    }
    console.log(this.state)
    return (
      <Router>
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <PrivateRoute authed={this.state.auth} path='/profile' component={ProfilePage} />
          <Route path="/pricing">
            <PricingPage />
          </Route>
          <PublicRoute authed={this.state.auth} path="/home" component={HomePage}/>
          <PublicRoute authed={this.state.auth} path="/signup" component={SignUpUserPage}/>
        </Switch>
      </Router>);
  } 
}


// function AuthRoute({ children, ...rest }){
  


//   return (<Route
//   {...rest}
//   render={({ location }) =>{
//     auth.onAuthStateChanged(function(user) {
//       if (!user) {
//         <Redirect
//         to={{
//           pathname: "/signin",
//           state: { from: location }
//         }}/>
//         return;
//       }
//     });
//   }}
    

// />)

// }

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

// function SignUpEmpresaPage() {
//   return (  
//     <div className="SignUp">
//     <Header />
//     <SignUpEmpresa />
//     </div>
//   );
// }

// function SignUpEmpresarialPage() {
//   return (  
//     <div className="SignUp">
//     <Header />
//     <SignUpEmpresarial />
//     </div>
//   );
// }

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