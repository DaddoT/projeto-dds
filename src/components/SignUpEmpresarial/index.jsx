import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { database } from '../firebase.js';
import './stylesSignUpEmpresarial.css';
// import { Link } from "react-router-dom";

const SignUp = () => {
    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    // const [displayName, setDisplayName] = useState("");
    // const [error, setError] = useState(null);
    const createUserWithEmailAndPasswordHandler = (event) => {
      event.preventDefault()
        if ( nome === '' || password === '' ) {
          alert('Preencher todos os campos')
        } else {
          const obj = { nome: nome , password: password }
          console.log(obj)
          addUser(obj)    
        }
    };

    const addUser = (obj) => {
      database.collection('empresarial')
      .add(obj)
      .then((doc) => {})
      .catch((err) => {
          console.log(err)
      })
    
  }

    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      if (name === "nome") {
        setNome(value);
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
  <p>Insira o nome do empresarial:</p>
  <TextField 
  label="Nome do empresarial" 
  variant="outlined" 
  fullWidth
  name="nome"
  onChange = {(event) => onChangeHandler(event)} 
  /> <br /><br />

  <p>Insira sua senha:</p>
  <TextField 
  label="Senha" 
  variant="outlined" 
  type="password" 
  fullWidth
  name="password"
  onChange = {(event) => onChangeHandler(event)}
  /> <br /><br />

  <div id="buttons">

  <Button variant="contained" color="default" type="submit" fullWidth> 
    Criar conta 
  </Button> <br /> <br />
  <p>Já possui uma conta?</p>  <br /> <br />
    <Button variant="contained" color="default" fullWidth> <Link to="/home"> 
      Faça login </Link>
    </Button> <br /> <br />
    <p>___________________________________</p>
  </div>
</form>
</div>

);

}

export default SignUp;