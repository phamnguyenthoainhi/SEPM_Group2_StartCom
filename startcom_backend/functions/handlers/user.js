const admin = require('firebase-admin');
const firebase = require('../config/config');
const db = admin.firestore()

exports.signUp = (req,res) =>{
    
    return firebase.auth().createUserWithEmailAndPassword(req.body.email,req.body.password)
        // .then((cred)=>{
        //     // Promise(createUser(req.body));
        //     return cred.user.getIdToken();
        // })
        // .then((token)=>{
        //     return res.json(token);
        // })
        .then(()=>{
            return Promise(createUser(req.body));
        })
        .catch((error)=>{
            console.log(error)
            return res.json(error);
        })
}

exports.signIn = (req,res) =>{
    return firebase.auth().signInWithEmailAndPassword(req.body.email,req.body.password)
        .then((cred)=>{
            return cred.user.getIdToken();
        })
        .then((token)=>{
            return res.json(token);
        })
        .catch((error)=>{
            console.log(error)
            return res.json(error)
        })
}

function createUser(user){
    return db.collection('User').doc(user.email).set({type:user.type});
}