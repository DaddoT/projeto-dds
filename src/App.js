import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUpUser from './components/SignUpUser';
import Profile from './components/Profile';
import AboutText from './components/AboutText';
import PricingCard from './components/PricingCard';
import Loader from './components/Loader';
import RecoveryPassword from './components/RecoveryPassword';
import { auth } from './components/firebase.js';
import "./styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Empresa from './components/Empresa';
import Empresarial from './components/Empresarial';
import Index from './components/Index';



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

function UnAuthRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/profile' />}
    />
  )
}

function PublicRoute ({component: Component, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props)=><Component user={user} {...props} />}

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

          <PublicRoute user={this.state.user} path='/about' component={AboutText} />
          {/* <PublicRoute user={this.state.user} exact={true} path="/"  component={Index}/> */}
          <PublicRoute user={this.state.user} path='/pricing' component={PricingCard} />


          <PrivateRoute authed={this.state.auth} user={this.state.user} path='/profile' component={Profile} />
          <PrivateRoute authed={this.state.auth} user={this.state.user} path='/empresa' component={Empresa} />
          <PrivateRoute authed={this.state.auth} user={this.state.user} path='/empresarial' component={Empresarial} />


          <UnAuthRoute authed={this.state.auth} path="/signin" component={SignIn}/>
          <UnAuthRoute authed={this.state.auth} path="/" component={SignIn}/>
          <UnAuthRoute authed={this.state.auth} path="/signup" component={SignUpUser}/>
          <UnAuthRoute authed={this.state.auth} path="/recovery" component={RecoveryPassword}/>
          

        </Switch>
      </Router>);
  } 
}



