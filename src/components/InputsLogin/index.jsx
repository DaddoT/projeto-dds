import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import "./styles.css";
// import { database } from '../firebase.js';
import { makeStyles } from '@material-ui/core/styles';

  export default function Inputs() {

  
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

//   const Login = (obj) => {
//   database.collection('users')
//   .doc(obj)
//   .then((doc) => {})
//   .catch((err) => {
//       console.log(err)
//   })
// }
  
  // export default function Inputs() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [error, setError] = useState(null);
    // const signInWithEmailAndPasswordHandler = 
    //         (event,email, password) => {
    //             event.preventDefault();
    // };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if(name === 'userEmail') {
        setEmail(value);
    }
    else if(name === 'userPassword'){
      setPassword(value);
    }
};

return (
<div id="inputs">
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


    <Button variant="contained" color="default" type="submit">
      Log in
    </Button> <br></br> <br></br>
    <a href="a.com">Esqueci minha senha</a> <br></br> <br></br>
    
    <p2>Ainda não possui uma conta?</p2>  <br></br> <br></br>
    <Button variant="contained" color="default"> <Link to="/signup"> 
      Registre-se </Link>
    </Button> <br></br> 
      
      
    
    </form> 
</div>
);
}
