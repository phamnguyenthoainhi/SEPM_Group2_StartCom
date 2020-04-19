const admin = require('firebase-admin');
const firebase = require('../config/config');
const db = admin.firestore()

const { sendEmail, uploadImage } = require('./utilities');

exports.signUp = (req, res) => {
    const user = req.body
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((cred) => {
            delete user.password;
            return Promise.all([createUser(user, cred.user.uid), sendEmail({
                from: "Startcom", to: user.email, subject: "Welcome", text: "Welcome to Startcom!"
            })])
                .then((results) => {
                    return res.json(results[0])
                })
        })
        .catch((error) => {
            console.log(error)
            return res.json(error);
        })
}

exports.signIn = (req, res) => {
    var user = {}
    return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((cred) => {
            user.id = cred.user.uid;
            return cred.user.getIdToken();
        })
        .then((token) => {
            user.token = token
            return res.json(user);
        })
        .catch((error) => {
            console.log(error)
            return res.json(error)
        })
}

exports.editProfile = (req, res) => {
    if (req.user.uid === req.params.id) {
        var user = req.body
        if (user.image && !user.image.includes("https://storage.googleapis.com/startcom-sepm.appspot.com/images/")) {
            const imageUpdate = uploadImage(user.image, req.params.id)
            const ideaUpdate = imageUpdate.then((url) => {
                user.image = url
                return db.collection('User').doc(req.params.id).update(req.body)
                    .then(() => {
                        user.id = req.params.id
                        return user
                    })
                    .catch(error => {
                        console.log(error)
                        return error
                    })
            })
            return Promise.all([imageUpdate, ideaUpdate])
                .then(results => {
                    return res.json(results[1])
                })
                .catch(error => {
                    console.log(error)
                    return res.json(error)
                })
        }
        else {
            return db.collection('User').doc(req.params.id).update(user)
                .then(() => {
                    user.id = req.params.id
                    return res.json(req.body)
                })
                .catch((error) => {
                    console.log(error);
                    return res.json(error);
                })
        }
    }
    else {
        return res.status(403).send('Unauthorized');
    }

}

exports.getAllInvestors = (req, res) => {
    const investors = [];
    return db.collection('User').where('type', '==', 'investor').get()
        .then((query) => {
            query.forEach(doc => {
                var investor = doc.data();
                investor.id = doc.id;
                investors.push(investor);
            })
            return res.json(investors);
        })
        .catch((error) => {
            console.log(error);
            return res.json(error);
        })
}

exports.getAllConsultants = (req, res) => {
    const consultants = [];
    return db.collection('User').where('type', '==', 'consultant').get()
        .then((query) => {
            query.forEach(doc => {
                var consultant = doc.data();
                consultant.id = doc.id;
                consultants.push(consultant);
            })
            return res.json(consultants);
        })
        .catch((error) => {
            console.log(error);
            return res.json(error);
        })
}

exports.deleteAccount = (userRecord) => {
    return db.collection('User').doc(userRecord.uid).delete()
        .then(() => { return null })
        .catch(error => {
            console.log(error);
            return error;
        })
}

exports.deleteUser = (req,res)=>{
    if (req.user.uid === req.params.id) {
        return admin.auth().deleteUser(req.params.id)
            .then(()=>{
                return res.status(200).send('Success')
            })
            .catch(error=>{
                console.log(error)
                return res.json(error)
            })
    }
    else{
        return res.status(403).send('Unauthorized')
    }
}

function createUser(user, id) {
    const newUser = user
    if (newUser.type && newUser.type === "investor") {
        newUser.verified = false
    }
    return db.collection('User').doc(id).set(newUser)
        .then(() => {
            newUser.id = id
            return newUser
        })
        .catch(error => {
            console.log(error);
            return error;
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

exports.validateFirebaseIdToken = async (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found authorization header');
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.log('no token')
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('decoded token: ', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    }
    catch (error) {
        console.log('error verifying token');
        console.log(error);
        res.status(403).send('Unauthorized');
        return;
    }
}