import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
// import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [displayName, setDisplayName] = useState("");
    // const [error, setError] = useState(null);
    // const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    //   event.preventDefault();
    //   setEmail("");
    //   setPassword("");
    //   setDisplayName("");
    // };

    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      if (name === "userEmail") {
        setEmail(value);
      } else if (name === "userPassword") {
        setPassword(value);
      } else if (name === "displayName") {
        // setDisplayName(value);
      }
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
<form className={classes.textField} noValidate autoComplete="off" > {/* onSubmit={onChangeHandler} */}
  <p2>Insira seu email:</p2>
  <TextField 
  label="Email" 
  variant="filled" 
  type="email" 
  fullWidth
  name="userEmail"
  value = {email}
  id="userEmail"
  onChange = {(event) => onChangeHandler(event)} 
  /> <br></br><br></br>

  <p2>Insira sua senha:</p2>
  <TextField 
  label="Senha" 
  variant="filled" 
  type="password" 
  fullWidth
  name="userPassword"
  value = {password}
  id="userPassword"
  onChange = {(event) => onChangeHandler(event)}
  /> <br></br><br></br>

  <div id="buttons">

  <Button variant="contained" color="default" type="submit" fullWidth> 
    Sign up 
  </Button> <br></br> <br></br>
  </div>
</form>
</div>

);

}

export default SignUp;