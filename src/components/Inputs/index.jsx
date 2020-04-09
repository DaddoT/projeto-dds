import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./styles.css";

// export default function Inputs() {

  
  import { makeStyles } from '@material-ui/core/styles';
  // import TextField from '@material-ui/core/TextField';
  
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
  
  export default function LayoutTextFields() {
    const classes = useStyles();

return (
<div id="inputs">
<form className={classes.textField} noValidate autoComplete="off" >
  <TextField label="Email" variant="filled" type="email" fullWidth/> <br></br><br></br>
  <TextField label="Senha" variant="filled" type="password" fullWidth/> <br></br><br></br>
  <div id="buttons">
  <Button variant="contained" color="default">
  Sign in
  </Button>
  <div id="divider"/>
  <Button variant="contained" color="primary">
  Sign up
  </Button> <br></br> <br></br>
  <a href="google.com">Esqueci minha senha</a>
  </div>
</form>
</div>
);
}
