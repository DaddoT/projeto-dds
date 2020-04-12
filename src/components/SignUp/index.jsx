import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { database } from '../firebase.js';
import './style.css';
// import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [displayName, setDisplayName] = useState("");
    // const [error, setError] = useState(null);
    const createUserWithEmailAndPasswordHandler = (event) => {
      event.preventDefault()
      // const value = event.target.content.value
      // if ( value !== '' ) {
          const obj = { email: email , password: password }
          console.log(obj)
          addUser(obj)
          // event.target.content.value = '';
      // }
    };

    const addUser = (obj) => {
      database.collection('users')
      .add(obj)
      .then((doc) => {})
      .catch((err) => {
          console.log(err)
      })
    
  }

    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      console.log(value)
      console.log(name)
      if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      } 
      // else if (name === "displayName") {
        // setDisplayName(value);
      // }
    };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '35ch',
    },
  }));

  const classes = useStyles();

return (
<div id="input">
<form className={classes.textField} noValidate autoComplete="off" onSubmit={createUserWithEmailAndPasswordHandler}> {/* onSubmit={onChangeHandler}  onSubmit={createUserWithEmailAndPasswordHandler}*/}
  <p>Insira seu email:</p>
  <TextField 
  label="Email" 
  variant="filled" 
  type="email" 
  fullWidth
  name="email"
  // value = {email}
  // id="userEmail"
  onChange = {(event) => onChangeHandler(event)} 
  /> <br></br><br></br>

  <p>Insira sua senha:</p>
  <TextField 
  label="Senha" 
  variant="filled" 
  type="password" 
  fullWidth
  name="password"
  // value = {password}
  // id="userPassword"
  onChange = {(event) => onChangeHandler(event)}
  /> <br></br><br></br>

  <div id="buttons">

  <Button variant="contained" color="default" type="submit" fullWidth> 
    Sign up 
  </Button> <br></br> <br></br>
  <p>Já possui uma conta?</p>  <br></br> <br></br>
    <Button variant="contained" color="default" fullWidth> <Link to="/home"> 
      Faça login </Link>
    </Button> <br></br> <br></br>
    <p>_________________________________________</p>
  </div>
</form>
</div>

);

}

export default SignUp;