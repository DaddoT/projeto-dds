import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';
import cep from 'cep-promise'
import { cnpj } from 'cpf-cnpj-validator';
import { makeStyles } from '@material-ui/core/styles';
import { database } from '../firebase.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        marginTop: '10px',
        marginLeft: '30px',
    },
    divider: {
        minWidth: '10px',
        height: 'auto',
        display: 'inline-block',
    },
    empresariais: {
        position: 'static',
        top: '2vh',
        marginLeft: '0%',
        marginRight: '5%',
        backgroundColor: 'rgba(255,255,255,0)',
        width: '90%',
        height: '85vh',
        borderRadius: '15px 80px 15px',
        overflowY: 'auto',
    },
    cards: {
        // display: 'inline-block',
        backgroundColor: 'rgba(255,255,255,0.5)',
        // height: '15vh',
        width: '100%',
        borderRadius: '15px 30px 15px',
        // marginTop: '20px',
        // marginBottom: '20px',
        // marginLeft: '20px',
        minWidth: 300,
    },
    cardContent: {
        display: 'inline-block',

    },
    buttonCard: {
        display: 'inline-block',
        marginLeft: '60%',
        width:'75%',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Empresa(props) {

    const COLLECTION_NAME = "empresa";


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
        estado: "",
        cidade: "",
        empresaMae: ""
    }


    const [state, setState] = useState(defaultState);

    const [empresa, setEmpresa] = useState([])
    const [empresaMae, setEmpresaMae] = useState([])


    const [errorCnpj, setErrorCnpj] = useState({
        helperText: ""
    })

    const [editing, setEditing] = useState(null);
    const [selectKey, setSelectKey] = useState("");


    const onSubmit = (event) => {
        event.preventDefault();
        if (editing !== null) {
            database.collection(COLLECTION_NAME).doc(editing).update(state).catch((e) => {
                console.log(e);
            })
        } else {
            database.collection(COLLECTION_NAME).add({ ...state, uid: props.user[0] }).catch((e) => {
                console.log(e);
            })
        }
    }

    const consultaCEP = (event) => {
        const { value } = event.currentTarget;
        cep(value).then((e) => {
            console.log(e);
            setState({
                ...state,
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
                    const data = doc.data();

                    docs.push({
                        _key: doc.id,
                        data: data,
                    })
                })

                setEmpresa(docs)
            })
        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = database.collection("empresariais").where('uid', '==', props.user[0])
            .onSnapshot((query) => {
                let docs = [];
                query.forEach((doc) => {
                    const data = doc.data();
                    docs.push({
                        _key: doc.id,
                        data: data,
                    })
                })
                setEmpresaMae(docs)
            })
        return unsubscribe;
    }, [])



    const editElem = (key) => {
        setEditing(key);
        let enty = empresa.filter((e) => e._key === key);
        setState(enty[0].data);
        setSelectKey(enty[0].data.empresaMae.id)
    }
    const deleteElem = (key) => {
        // if (window.confirm("Você tem certeza que deseja deletar?")){
        database.collection(COLLECTION_NAME).doc(key).delete().then(() => {
            setEmpresa(empresa.filter((e) => e._key !== key));
            alert("Deletado com sucesso!")
        }).catch(() => {
            alert("Erro ao deletar")
        })
        // }    
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const _draw_row = (row) => {
        return (
            <Card key={row._key} className={classes.cards}>
                <CardContent>
                    <p className={classes.cardContent}>{row.data.fantasia}</p>
                    <div className={classes.buttonCard}>
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                <DeleteIcon />
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                <EditIcon />
                            </Button>

                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"ação necessaria!"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        este evento excluirá o acesso da lista!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Disagree
                                    </Button>
                                    <Button onClick={() => deleteElem(row._key)} color="primary">
                                        Agree
                                    </Button>
                                </DialogActions>
                                {/* <IconButton >
                                    <EditIcon />
                                </IconButton> */}
                            </Dialog>

                        </div>
                        {/* <IconButton onClick={() => deleteElem(row._key)}>
                            <DeleteIcon />
                        </IconButton> */}
                    </div>
                </CardContent>
            </Card>
        );
    }


    const _maskCEP = (val) => {
        return val
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{5})(\d{1,3})/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const _validateCNPJ = (e) => {
        let cnpjj = e.currentTarget.value;
        if (cnpj.isValid(cnpjj)) {
            setErrorCnpj({
                helperText: "",
            })
        } else {
            setErrorCnpj({
                helperText: "CNPJ invalido",
            })
        }
    }

    const handleChange = (e, ref = false, doc = "") => {
        const { name, value } = e.currentTarget;
        // if (ref === true){
        //     setState({
        //         ...state, 
        //         [name]: database.doc(doc+"/"+value).ref
        //     });
        // } else {
        setState({
            ...state,
            [name]: value
        });
        //}
    }



    return (
        <div className="Empresa">
            <Header {...props} />

            <div className={classes.root}>
                {/* <div className={classes.form}> */}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={classes.form}>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <p>Insira os dados da empresa</p> <br />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" name="nome" label="Nome" value={state.nome} size="small" id="standard-size-small" /> <div className={classes.divider} />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" name="fantasia" value={state.fantasia} label="Nome fantasia" size="small" id="standard-size-small" /> <br />
                            <br />
                            <TextField required variant="outlined" name="cnpj" disabled={editing !== null} label="CNPJ" value={state.cnpj} error={errorCnpj.helperText.length === 0 ? false : true} helperText={errorCnpj.helperText} onBlur={(e) => _validateCNPJ(e)} onChange={(e) => { e.target.value = cnpj.format(e.target.value); handleChange(e); }} size="small" id="standard-size-small" />  <div className={classes.divider} />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" type="email" value={state.email} name="email" label="E-mail" size="small" id="standard-size-small" /> <br />
                            <br />
                            <TextField required variant="outlined" size="small" id="standard-size-small" value={state.cep} name="cep" onChange={(e) => { e.target.value = _maskCEP(e.target.value); handleChange(e) }} onBlur={(e) => consultaCEP(e)} label="CEP" /> <div className={classes.divider} />
                            {/* <TextField onChange={(e) => handleChange(e)} required variant="outlined" size="small" id="standard-size-small" name="logradouro" value={state.rua} label="Logradouro" /><br /> */}
                            <br />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" value={state.numero} size="small" name="numero" id="standard-size-small" label="Numero" />  <div className={classes.divider} />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" value={state.cidade} size="small" name="cidade" id="standard-size-small" label="Cidade" /> <br />
                            <br />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" value={state.estado} size="small" name="estado" id="standard-size-small" label="Estado" /> <div className={classes.divider} />
                            <TextField onChange={(e) => handleChange(e)} required variant="outlined" value={state.comp} size="small" name="comp" id="standard-size-small" label="Complemento" />
                            <br />
                            <br />
                            {/* <Select native value={selectKey} variant="outlined" size="small"name="empresaMae" required onChange={(e)=>handleChange(e, true,"empresariais")}>
                                <option aria-label="None" value="">Selecione uma empresa</option>
                                {empresaMae.map((e)=>{
                                    return (<option value={e._key}>{e.data.fantasia}</option>)
                                })}
                                </Select> */}
                            <br /> 
                            <Button type="submit" variant="contained" color="default">{editing == null ? "Criar" : "Editar"}</Button>
                        </form>
                        </div>


                    </Grid>
                    {/* </div> */}

                    {/* </div> */}
                    {/* <style>borderRadius: '15px 100px 15px',</style> 
                            style={{ overflow-y: scroll }}*/}

                    {/* <Grid container spacing={3}> */}
                    <Grid item xs={6}>
                        <div className={classes.empresariais}>
                            {empresa.map((e) => _draw_row(e))}
                        </div>
                    </Grid>

                </Grid>

            </div>
        </div >
    );
}
