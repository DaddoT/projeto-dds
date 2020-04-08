import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./styles.css";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

  export default function TextButtons() {

    return (
    
      <div className="Buttons">
        <header id ="main-header"> 
        <Button > <p>About </p></Button>
        <Button > <p>Pricing </p></Button>
        <Button > <p>Link </p></Button>
        </header>

    <React.Fragment>
      <div className="Container"> 
        <Container fixed>
          <Typography component="div" id="container" />
        </Container>
      </div>
      </React.Fragment>
        
        <div id="inputs">
          <form className="Inputs" noValidate autoComplete="off">
            <TextField label="Email" variant="filled" type="email"/> <br></br><br></br>
            <TextField label="Senha" variant="filled" type="password"/> <br></br><br></br>
            <Button variant="contained" color="primary">
            Log in
            </Button>
          </form>
        </div>
      </div>
    );
  }