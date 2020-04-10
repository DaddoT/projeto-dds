import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAU0_Fevv9dZiArXWwzoxd_7nVnTP0HqfE",
    authDomain: "projeto-dds-3e0d0.firebaseapp.com",
    databaseURL: "https://projeto-dds-3e0d0.firebaseio.com",
    projectId: "projeto-dds-3e0d0",
    storageBucket: "projeto-dds-3e0d0.appspot.com",
    messagingSenderId: "509888701387",
    appId: "1:509888701387:web:64c044335319bada488c4e",
    measurementId: "G-9CY5ZTLH7P"
  };

  // APP instance
export const app = firebase.initializeApp(firebaseConfig);
// DB instance
export const database = firebase.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();