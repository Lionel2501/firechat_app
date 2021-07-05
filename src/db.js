import firebase from "firebase/app";
import "firebase/database";

const config = {
    apiKey: "AIzaSyC9qP1dGa6VySUebCfpOPCO5GZJ6iNk7iQ",
    authDomain: "firevuechat-5c751.firebaseapp.com",
    projectId: "firevuechat-5c751",
    storageBucket: "firevuechat-5c751.appspot.com",
    messagingSenderId: "686886410508",
    appId: "1:686886410508:web:1e979cb45b9d3314cb1129",
    measurementId: "G-55KP0XHGLD"
}

const db = firebase.initializeApp(config)

export default db;