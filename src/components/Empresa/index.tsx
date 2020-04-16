import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';
import cep from 'cep-promise'
import { makeStyles } from '@material-ui/core/styles';

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

            </div>
        </div>
    );
}