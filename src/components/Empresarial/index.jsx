import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';
import cep from 'cep-promise'
import {cnpj} from 'cpf-cnpj-validator';
import { makeStyles } from '@material-ui/core/styles';
import { fb, database, auth } from '../firebase.js';
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
    }, empresariais: {
    position: 'absolute',
    top: '15vh',
    marginLeft: '32%',
    backgroundColor: '#282828', 
    width: '65%',
    height: '80vh',
    borderRadius: '15px 80px 15px',
    overflowY: 'scroll',
    },
    cards: {
    display: 'inline-block',    
    backgroundColor: '#white',
    height: '30vh',
    width: '25%',
    borderRadius: '15px 50px 15px',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    },
    buttonCard: {
    display: 'inline',
    marginTop: '72%',
    marginLeft: '18%',
    width: '90%',
    },
    cardContent: {
    marginTop: '10%',
    marginLeft: '10%',
    },
    }));

export default function Empresarial(props){
    
    const COLLECTION_NAME = "empresariais";


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
    const [empresarial , setEmpresarial] = useState([])


    const [errorCnpj, setErrorCnpj] = useState({
        helperText: ""
    })
    

    const onSubmit = (event)=>{
        event.preventDefault();

        database.collection(COLLECTION_NAME).add({...state, uid: props.user[0]}).catch((e)=>{
            console.log(e);
        })
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
    
    
    //

    useEffect(() => {
        const unsubscribe = database.collection('empresariais')
        .onSnapshot((query) => {
            let docs = [];
            query.forEach((doc) => {
                const { fantasia } = doc.data();
                docs.push({
                    uid: doc.id,
                    fantasia: fantasia,
                })
            })
            setEmpresarial(docs)
        })
        return unsubscribe;
    },[])

    const list_empresarial = ()=>{
        let queryRef = database.collection(COLLECTION_NAME).where('uid', '==', props.user[0]);
        queryRef.get().then((snapshot)=>{
            snapshot.forEach(doc => {
                _draw_row(doc.data());
                console.log(doc)
            });
        })
    }

    const _draw_row = (row) =>{
        console.log(row)
        return(
        <List dense>
        <Card className={classes.cards} variant="outlined">
            <CardContent>
                
            </CardContent> 
        </Card> 
        </List>
        );
    }
    //

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
        list_empresarial()
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
            {/* <style>borderRadius: '15px 100px 15px',</style> 
            style={{ overflow-y: scroll }}*/}
            <div onLoad={(e)=>{list_empresarial()}} className={classes.empresariais}>
            <Card className={classes.cards}>
            <CardContent className={classes.cardContent}>
                <Button className={classes.buttonCard}>Solicitar acesso</Button>
            </CardContent> 
            </Card> 
            </div>
        </div>
    );
}
