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
                    <TextField variant="filled" name="name" label="Nome"/> <div className={classes.divider} />
                    <TextField variant="filled" name="name-f" label="Nome fantasia"/>
                    <br/>
                    <TextField variant="filled" name="cnpj" label="CNPJ"/>  <div className={classes.divider} />                 
                    <TextField variant="filled" name="email" label="e-mail"/>
                    <br/>
                    <TextField variant="filled" name="cep" onChange={(e)=>e.target.value = _maskCEP(e.target.value)} onBlur={(e)=>consultaCEP(e)} label="CEP"/> <div className={classes.divider} />                   
                    <TextField variant="filled" name="logradouro" value={state.rua} onChange={(e)=>console.log("fsfjdskfd")} label="Logradouro"/>
                    <br/>
                    <TextField variant="filled" label="Numero"/>  <div className={classes.divider} />                  
                    <TextField variant="filled" value={state.cidade} label="Cidade"/>
                    <br/>
                    <TextField variant="filled" value={state.estado} label="Estado"/> <div className={classes.divider} />
                    <TextField variant="filled" label="Complemento"/>
                    <br/> <br />
                    <Button type="submit" variant="contained" color="default">Criar</Button> 
                </form>
            </div>

        </div>
    );
}