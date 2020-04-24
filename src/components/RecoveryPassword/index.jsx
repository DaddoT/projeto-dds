import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { auth } from '../firebase.js';
import './stylesRecovery.css';
import Header from '../Header';

const RecoveryPassword = (props) => {

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


    const [email, setEmail] = useState("");



    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email"){
            setEmail(value);
        }
    };


const recovery_password = (e) =>{
    e.preventDefault();
    auth.sendPasswordResetEmail(email).then(()=>{
    alert("E-mail enviado com sucesso!")
  }).catch((e)=>{
    alert(e.message)
  })
} 


return (
<div>
<Header {...props}/>
<div id="input">
  <form className={classes.textField} autoComplete="off" onSubmit={(e)=>recovery_password(e)}>
    <p>Insira seu email:</p> <br/>
    <TextField label="Email" variant="outlined" type="email" fullWidth name="email" onChange={(event)=>
      onChangeHandler(event)}
       required/> <br /><br />
        <div id="buttons">
          <Button variant="contained" color="default" type="submit" fullWidth>
            Recuperar conta
          </Button> <br /> <br />
        </div>
  </form>
</div>
</div>
);

}

export default RecoveryPassword;