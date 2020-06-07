import React from 'react';
// import { Link, useHistory } from "react-router-dom";
// import { database, auth, } from '../firebase.js';
import Header from '../Header';


const Index = (props)=> {
    console.log(props.user);
    return (

        <div>
            <Header {...props}/>        
        </div>
    )
}

export default Index;