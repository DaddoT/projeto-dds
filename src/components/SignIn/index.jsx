import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from "react-router-dom";
import { fb, auth } from '../firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../Header";


export default function SignIn(props) {
  var history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTo: theme.spacing(1),
      width: '35ch',
    },
    inputs: {
      display: 'flex',
      marginTop: '2.5%',
      marginLeft: '20px',
    },
    divider: {
      width: '10px',
      height: 'auto',
      display: 'inline-block',
    },
    links: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      textDecoration: 'none',
      color: 'rgb(39, 39, 39)',
    },

  }));

  const signUpGoogle = () => {
    var provider = new fb.auth.GoogleAuthProvider();
    auth.languageCode = "pt";
    console.log(provider);
    fb.auth().signInWithPopup(provider).then(function (result) {
    }).catch((error) => {
      //mostrar os erros
      console.log(error);
    });

  }


  const Login = (event) => {
    event.preventDefault()
    if (email === '' || password === '') {
      alert('Preencher todos os campos')
    } else {
      auth.signInWithEmailAndPassword(email, password).then((e) => {
        history.push("profile");
      }).catch((e) => {
        alert(e.message);
      })

      const obj = { email: email, password: password }
      console.log(obj)
    }

  };

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <div>
      <Header {...props} />

      <div className={classes.paper}>

        <div className={classes.inputs}>
          <form onSubmit={(e) => Login(e)} className={classes.textField} noValidate autoComplete="off">
            <p className={classes.links}> Insira seu email:</p> <br /> <br />
            <TextField label="Email" variant="outlined" type="email" fullWidth name="userEmail" value={email} id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            /> <br /> <br />

            <p className={classes.links}>Insira sua senha:</p> <br /> <br />
            <TextField label="Senha" variant="outlined" type="password" fullWidth name="userPassword" value={password}
              id="userPassword" onChange={(event) => onChangeHandler(event)}
            /> <br /><br />

            <Button type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit} variant="contained" color="default" type="submit">
              Log in
            </Button> <br /> <br />
            <Button type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit} variant="contained" onClick={() => signUpGoogle()} color="default">
              Sign-in com Google
            </Button> <br /> <br />
            <Link to="/recovery" className={classes.links}>Esqueci minha senha</Link> <br /> <br />

            <p className={classes.links}>Ainda não possui uma conta?</p> <br /> <br />
            <Button type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit} variant="contained" color="default">
              <Link to="/signup" className={classes.links}>
                SignUp
              </Link>
            </Button> <br />
          </form>
        </div>
      </div>

    </div>
  );
}