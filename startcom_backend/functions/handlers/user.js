const admin = require('firebase-admin');
const firebase = require('../config/config');
const db = admin.firestore()

exports.signUp = (req,res) =>{
    const user = req.body
    return firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
        // .then((cred)=>{
        //     // Promise(createUser(req.body));
        //     return cred.user.getIdToken();
        // })
        // .then((token)=>{
        //     return res.json(token);
        // })
        .then(()=>{
            delete user.password;
            return Promise(createUser(user));
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

exports.editProfile = (req,res) =>{
    return db.collection('User').doc(req.params.id).update(req.body)
        .then(()=>{
            return res.json(req.body)
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error);
        })

}

exports.getAllInvestors = (req,res) =>{
    const investors =[];
    return db.collection('User').where('type','==','investor').get()
        .then((query)=>{
            query.forEach(doc=>{
                var investor = doc.data();
                investor.id = doc.id;
                investors.push(investor);
            })
            return res.json(investors);
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error);
        })
}

exports.getAllConsultants = (req,res) => {
    const consultants =[];
    return db.collection('User').where('type','==','consultant').get()
        .then((query)=>{
            query.forEach(doc=>{
                var consultant = doc.data();
                consultant.id=doc.id;
                consultants.push(consultant);
            })
            return res.json(consultants);
        })
        .catch((error)=>{
            console.log(error);
            return res.json(error);
        })
}

exports.deleteAccount = (userRecord) =>{
    return db.collection('User').where('email','==',userRecord.email).get()
        .then((query)=>{
            return deleteUser(query.docs[0].id);
        })
}

function createUser(user){
    return db.collection('User').add(user)
        .then((doc)=> {return null})
        .catch(error=>{
            console.log(error);
            return res.json(error);
        })
}

function deleteUser(id){
    return db.collection('User').doc(id).delete()
        .then(()=>{
            return null;
        })
        .catch(error=>{
            console.log(error);
            return res.json(error);
        })
}