import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';
import cep from 'cep-promise'
import {cnpj} from 'cpf-cnpj-validator';
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

export default function Empresarial(props){
    
    const classes = useStyles();
    console.log(props)
    

    const [state, setState] = useState({
        nome: "",
        fantasia: "",
        cnpj: "",
        email: "",
        cep: "",
        rua: "",
        numero: "",
        comp: "",
        estado:"",
        cidade:"",
    });


    const [errorCnpj, setErrorCnpj] = useState({
        helperText: ""
    })
    

    const onSubmit = (event)=>{
        event.preventDefault();
        
    }

    const consultaCEP = (event) => {
        const {name, value} = event.currentTarget;
        console.log(name);
        console.log(value);

        //var self:Empresa = this;

        cep(value).then((e)=>{
            console.log(e); 
            setState({
                ... state,
                rua: e.street,
                estado: e.state,
                cidade: e.city
            })
        })
    }

    const _maskCEP = (val) => {
        return val
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{5})(\d{1,3})/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const _validateCNPJ = (e)=>{
        let cnpjj  = e.currentTarget.value;
        if (cnpj.isValid(cnpjj)){
            setErrorCnpj({
                helperText:"",
            })
        } else {
            setErrorCnpj({
                helperText: "CNPJ invalido",
            })
        }
    }

    const handleChange = (e)=>{
        const {name, value} = e.currentTarget;
        
        console.log(name);
        setState({
            ...state, 
            [name]: value
        });
        console.log(state);
    }



    return(
        <div className="Empresarial">
            <Header/>
            <div className={classes.form}>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <p>Insira os dados do empresarial</p> <br />
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" name="nome" label="Nome" size="small" id="standard-size-small"/> <div className={classes.divider}  />
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" name="fantasia" label="Nome fantasia" size="small" id="standard-size-small"/> <br/>
                    <br/>
                    <TextField required variant="outlined" name="cnpj" label="CNPJ" error={errorCnpj.helperText.length === 0 ? false: true} helperText={errorCnpj.helperText} onBlur={(e)=>_validateCNPJ(e)} onChange={(e)=>{e.target.value = cnpj.format(e.target.value); handleChange(e);}} size="small" id="standard-size-small"/>  <div className={classes.divider} />                 
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" type="email" name="email" label="E-mail" size="small" id="standard-size-small"/> <br/>
                    <br/>
                    <TextField required variant="outlined" size="small" id="standard-size-small" value={state.cep} name="cep" onChange={(e)=>{e.target.value = _maskCEP(e.target.value); handleChange(e)}} onBlur={(e)=>consultaCEP(e)} label="CEP"/> <div className={classes.divider} />                   
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" size="small" id="standard-size-small" name="logradouro" value={state.rua} label="Logradouro"/><br/>
                    <br/>
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" size="small" name="numero" id="standard-size-small" label="Numero"/>  <div className={classes.divider} />                  
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" size="small" name="cidade" id="standard-size-small" label="Cidade"/> <br/>
                    <br/>
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" size="small" name="estado" id="standard-size-small" label="Estado"/> <div className={classes.divider} />
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" size="small" name="comp" id="standard-size-small" label="Complemento"/>
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