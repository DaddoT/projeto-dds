import React from 'react';
import { TextField } from '@material-ui/core';

//import './.css';

export default function AboutText() {
    return(
        <div>
            <TextField label="Nome"/>
            <TextField label="Nome fantasia"/>
            <TextField label="CNPJ"/>
            <TextField label="e-mail"/>
            <TextField label="CEP"/>
            <TextField label="Logradouro"/>
            <TextField label="Numero"/>
            <TextField label="Estado"/>
            <TextField label="Complemento"/>


        </div>
    );
}