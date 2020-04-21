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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    form: {
    marginLeft: '30px',
    marginTop: '80px',
    }, divider: {
    minWidth: '10px',
    height: 'auto',
    display: 'inline-block',
    },
    empresariais: {
    position: 'absolute',
    top: '15vh',
    marginLeft: '32%',
    backgroundColor: '#282828', 
    width: '65%',
    height: '80vh',
    borderRadius: '15px 80px 15px',
    overflowY: 'auto',
    },
    cards: {
    display: 'inline-block',    
    backgroundColor: '#white',
    height: '10vh',
    width: '95%',
    borderRadius: '15px 30px 15px',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    },
    cardContent: {
    display: 'inline-block', 
    },
    buttonCard: {
    display: 'inline-block',    
    marginLeft: '75%',
    },
    }));

export default function Empresarial(props){
    
    const COLLECTION_NAME = "empresariais";


    const classes = useStyles();
    console.log(props)
    
    const defaultState = {
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
    }


    const [state, setState] = useState(defaultState);
    
    const [empresarial , setEmpresarial] = useState([])


    const [errorCnpj, setErrorCnpj] = useState({
        helperText: ""
    })

    const [editing, setEditing] = useState(null);


    const onSubmit = (event)=>{
        event.preventDefault();
        if (editing !== null){
            database.collection(COLLECTION_NAME).doc(editing).update(state).catch((e)=>{
                console.log(e);
            })
        } else {
            database.collection(COLLECTION_NAME).add({...state, uid: props.user[0]}).catch((e)=>{
                console.log(e);
            })
        }
    }

    const consultaCEP = (event) => {
        const {name, value} = event.currentTarget;
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
        const unsubscribe = database.collection(COLLECTION_NAME).where('uid', '==', props.user[0])
        .onSnapshot((query) => {
            let docs = [];
            query.forEach((doc) => {
                const data  = doc.data();
                docs.push({
                    _key: doc.id,
                    data: data,
                })
            })
            setEmpresarial(docs)
        })
        return unsubscribe;
    },[])



    const editElem = (key) =>{
        setEditing(key);
        let enty = empresarial.filter((e)=> e._key == key);
        setState(enty[0].data);
    }
    const deleteElem = (key) =>{
        if (window.confirm("Você tem certeza que deseja deletar?")){
            database.collection(COLLECTION_NAME).doc(key).delete().then(()=>{      
                setEmpresarial(empresarial.filter((e)=> e._key !== key));
                alert("Deletado com sucesso!")
            }).catch(()=>{
                alert("Erro ao deletar")
            })
        }
    }
    
    
    const _draw_row = (row) =>{
        return(
            <Card key={row._key} className={classes.cards}>
            <CardContent>
            <p className={classes.cardContent}>{row.data.fantasia}</p>   
            <div className={classes.buttonCard}> 
                <IconButton onClick={()=>deleteElem(row._key)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={()=>editElem(row._key)}>
                    <EditIcon />
                </IconButton>   
            </div>            
            </CardContent> 
            </Card> 
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
    }



    return(
        <div className="Empresarial">
            <Header/>
            <div className={classes.form}>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <p>Insira os dados do empresarial</p> <br />
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" name="nome" label="Nome" value={state.nome} size="small" id="standard-size-small"/> <div className={classes.divider}  />
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" name="fantasia" value={state.fantasia} label="Nome fantasia" size="small" id="standard-size-small"/> <br/>
                    <br/>
                    <TextField required variant="outlined" name="cnpj" disabled={editing !== null} label="CNPJ" value={state.cnpj} error={errorCnpj.helperText.length === 0 ? false: true} helperText={errorCnpj.helperText} onBlur={(e)=>_validateCNPJ(e)} onChange={(e)=>{e.target.value = cnpj.format(e.target.value); handleChange(e);}} size="small" id="standard-size-small"/>  <div className={classes.divider} />                 
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" type="email" value={state.email} name="email" label="E-mail" size="small" id="standard-size-small"/> <br/>
                    <br/>
                    <TextField required variant="outlined" size="small" id="standard-size-small" value={state.cep} name="cep" onChange={(e)=>{e.target.value = _maskCEP(e.target.value); handleChange(e)}} onBlur={(e)=>consultaCEP(e)} label="CEP"/> <div className={classes.divider} />                   
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" size="small" id="standard-size-small" name="logradouro" value={state.rua} label="Logradouro"/><br/>
                    <br/>
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" value={state.numero} size="small" name="numero" id="standard-size-small" label="Numero"/>  <div className={classes.divider} />                  
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" value={state.cidade} size="small" name="cidade" id="standard-size-small" label="Cidade"/> <br/>
                    <br/>
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" value={state.estado} size="small" name="estado" id="standard-size-small" label="Estado"/> <div className={classes.divider} />
                    <TextField onChange={(e)=>handleChange(e)} required variant="outlined" value={state.comp} size="small" name="comp" id="standard-size-small" label="Complemento"/>
                    <br/> <br />
                    <Button type="submit" variant="contained" color="default">{editing == null ? "Criar" : "Editar"}</Button> 
                </form>
            </div>
            {/* <style>borderRadius: '15px 100px 15px',</style> 
            style={{ overflow-y: scroll }}*/}
            <div className={classes.empresariais}>
                {empresarial.map((e)=>_draw_row(e))}
            </div>
        </div>
    );
}
