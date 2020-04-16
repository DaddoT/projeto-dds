import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from "react-router-dom";
import "./stylesLogin.css";
import { fb, database, auth } from '../firebase.js';
import { makeStyles } from '@material-ui/core/styles';


export default function Inputs() {
var history = useHistory();


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

const signUpGoogle = () => {
var provider = new fb.auth.GoogleAuthProvider();
auth.languageCode = "pt";
console.log(provider);
fb.auth().signInWithPopup(provider).then(function(result) {
  //
}).catch((error)=>{
//mstrar os errors
console.log(error);
});

}


const Login = (event) => {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");


  event.preventDefault()
  if ( email === '' || password === '' ) {
    alert('Preencher todos os campos')
  } else {

    auth.signInWithEmailAndPassword(email, password).then((e)=>{
      history.push("profile");
    }).catch((e)=>{
      alert(e.message);      
    })

    const obj = { email: email , password: password }
    console.log(obj)
    //addUser(obj)
  }

};


// export default function Inputs() {
const classes = useStyles();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// const [error, setError] = useState(null);
// const signInWithEmailAndPasswordHandler =
// (event,email, password) => {
// event.preventDefault();
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
  <form onSubmit={(e)=>Login(e)} className={classes.textField} noValidate autoComplete="off"> {/* onSubmit={onChangeHandler} */}
    <p>Insira seu email:</p>
    <TextField label="Email" variant="filled" type="email" fullWidth name="userEmail" value={email} id="userEmail"
      onChange={(event)=> onChangeHandler(event)}
      /> <br /><br />

      <p>Insira sua senha:</p>
      <TextField label="Senha" variant="filled" type="password" fullWidth name="userPassword" value={password}
        id="userPassword" onChange={(event)=> onChangeHandler(event)}
        /> <br /><br />


        <Button variant="contained" color="default" type="submit">
          Log in
        </Button> <br /> <br />
        <Button variant="contained" onClick={()=>signUpGoogle()} color="default">
          Sign-in com Google
        </Button> <br /> <br />
        <a href="a.com">Esqueci minha senha</a> <br /> <br />

        <p>Ainda não possui uma conta?</p> <br /> <br />
        <Button variant="contained" color="default">
          <Link to="/signup">
          Registre-se </Link>
        </Button> <br />



  </form>
</div>
);
}