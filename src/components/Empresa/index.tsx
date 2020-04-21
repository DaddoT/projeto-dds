import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';
import cep from 'cep-promise'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
form: {
marginLeft: '30px',
marginTop: '80px',
}, divider: {
minWidth: '10px',
height: 'auto',
display: 'inline-block',
}, empresas: {
position: 'absolute',
top: '15vh',
marginLeft: '32%',
backgroundColor: '#282828', 
width: '65%',
height: '80vh',
borderRadius: '15px 100px 15px',
overflowY: 'scroll',
},
cards: {
display: 'inline-block',    
backgroundColor: '#white',
height: '30vh',
<<<<<<< HEAD
width: '95%',
=======
width: '25%',
>>>>>>> c1456e98f1366eecd9d90754980d0256eee94211
borderRadius: '15px 50px 15px',
marginTop: '20px',
marginBottom: '20px',
marginLeft: '20px',
},
buttonCard: {
display: 'inline',
<<<<<<< HEAD
marginTop: '8%',
marginLeft: '45%',
=======
marginTop: '72%',
marginLeft: '18%',
>>>>>>> c1456e98f1366eecd9d90754980d0256eee94211
width: '90%',
},
cardContent: {
marginTop: '10%',
marginLeft: '10%',
},
}));



//import './.css';

export default function Empresa(props:any) {
    const classes = useStyles();
    console.log(props)

    const [state, setState] = useState({
        rua: "",
        estado:"",
        cidade:""
    });
    

    const onSubmit = (event:any)=>{
        console.log(event);
        event.preventDefault();
    }

    const consultaCEP = (event:any) => {
        const {name, value} = event.currentTarget;
        console.log(name);
        console.log(value);

        //var self:Empresa = this;

        cep(value).then((e)=>{
            console.log(e); 
            setState({
                rua: e.street,
                estado: e.state,
                cidade: e.city
            })
        })
    }

    const _maskCEP = (val:String) => {
        return val
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{5})(\d{1,3})/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    return(
        <div className="Empresa">
            <Header/>
            <div className={classes.form}>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <p>Insira os dados da empresa</p> <br />
                    <TextField variant="outlined" name="name" label="Nome" size="small" id="standard-size-small"/> <div className={classes.divider} />
                    <TextField variant="outlined" name="name-f" label="Nome fantasia" size="small" id="standard-size-small"/> <br/>
                    <br/>
                    <TextField variant="outlined" name="cnpj" label="CNPJ" size="small" id="standard-size-small"/>  <div className={classes.divider} />                 
                    <TextField variant="outlined" name="email" label="E-mail" size="small" id="standard-size-small"/> <br/>
                    <br/>
                    <TextField variant="outlined" size="small" id="standard-size-small" name="cep" onChange={(e)=>e.target.value = _maskCEP(e.target.value)} onBlur={(e)=>consultaCEP(e)} label="CEP"/> <div className={classes.divider} />                   
                    <TextField variant="outlined" size="small" id="standard-size-small" name="logradouro" value={state.rua} onChange={(e)=>console.log("fsfjdskfd")} label="Logradouro"/><br/>
                    <br/>
                    <TextField variant="outlined" size="small" id="standard-size-small" label="Numero"/>  <div className={classes.divider} />                  
                    <TextField variant="outlined" size="small" id="standard-size-small" value={state.cidade} label="Cidade"/> <br/>
                    <br/>
                    <TextField variant="outlined" size="small" id="standard-size-small" value={state.estado} label="Estado"/> <div className={classes.divider} />
                    <TextField variant="outlined" size="small" id="standard-size-small" label="Complemento"/>
                    <br/> <br />
                    <Button type="submit" variant="contained" color="default">Criar</Button> 
                </form>
            </div>
            {/* <style>borderRadius: '15px 100px 15px',</style> */}
            <div className={classes.empresas}>
            <Card className={classes.cards}>
            <CardContent className={classes.cardContent}>
                <Button className={classes.buttonCard}>Solicitar acesso</Button>
            </CardContent> 
            </Card> 
            </div>
        </div>
    );
}