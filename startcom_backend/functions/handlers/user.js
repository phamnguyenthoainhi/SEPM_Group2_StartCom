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
        .then((cred)=>{
            delete user.password;
            return Promise(createUser(user, cred.user.uid));
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
    if(req.user.uid === req.params.id){
        return db.collection('User').doc(req.params.id).update(req.body)
            .then(()=>{
                return res.json(req.body)
            })
            .catch((error)=>{
                console.log(error);
                return res.json(error);
            })
    }
    else{
        res.status(403).send('Unauthorized');
        return;
    }

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
    return db.collection('User').doc(userRecord.uid).delete()
        .then(()=>{return null})
        .catch(error=>{
            console.log(error);
            return res.json(error)
        })
}

function createUser(user,id){
    return db.collection('User').doc(id).set(user)
        .then(()=> {return null})
        .catch(error=>{
            console.log(error);
            return res.json(error);
        })
}

// function deleteUser(id){
//     return db.collection('User').doc(id).delete()
//         .then(()=>{
//             return null;
//         })
//         .catch(error=>{
//             console.log(error);
//             return res.json(error);
//         })
// }

exports.validateFirebaseIdToken =async (req,res,next)=>{
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        console.log('Found authorization header');
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else{
        console.log('no token')
        res.status(403).send('Unauthorized');
        return;
    }

    try{
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('decoded token: ', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    }
    catch(error){
        console.log('error verifying token');
        console.log(error);
        res.status(403).send('Unauthorized');
        return;
    }
}