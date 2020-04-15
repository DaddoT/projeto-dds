import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from "react-router-dom";
import { database, auth, } from '../firebase.js';
import './stylesSignUpUser.css';


// import { Link } from "react-router-dom";

const SignUp = () => {

  var history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event) => {
  event.preventDefault()
  if ( email === '' || password === '' ) {
    alert('Preencher todos os campos')
  } else {
    const obj = { email: email , password: password }
    console.log(obj)
    addUser(obj)
  }
};

const addUser = (obj) => {
  auth.createUserWithEmailAndPassword(obj.email, obj.password).then(()=>{
    history.push("profile");
  }).catch((reason)=>{
    alert(reason.message);
  })
}

const onChangeHandler = event => {
const { name, value } = event.currentTarget;
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
  <form className={classes.textField} noValidate autoComplete="off" onSubmit={createUserWithEmailAndPasswordHandler}>
    {/* onSubmit={onChangeHandler} onSubmit={createUserWithEmailAndPasswordHandler}*/}
    <p>Insira seu email:</p>
    <TextField label="Email" variant="filled" type="email" fullWidth name="email" onChange={(event)=>
      onChangeHandler(event)}
      /> <br></br><br></br>

      <p>Insira sua senha:</p>
      <TextField label="Senha" variant="filled" type="password" fullWidth name="password" onChange={(event)=>
        onChangeHandler(event)}
        /> <br></br><br></br>

        <div id="buttons">

          <Button variant="contained" color="default" type="submit" fullWidth>
            Criar conta
          </Button> <br></br> <br></br>
          <p>Já possui uma conta?</p> <br></br> <br></br>
          <Button variant="contained" color="default" fullWidth>
            <Link to="/home">
            Faça login </Link>
          </Button> <br></br> <br></br>
          <p>___________________________________</p> <br></br>
        </div>
  </form>
</div>

);

}

export default SignUp;