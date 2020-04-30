const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
//const firebase = require('../config/config');
const admin = require('firebase-admin');
//const storageRef = firebase.storage().ref()
const storage = admin.storage()
const email = functions.config().gmail.email;
const password = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
})

exports.sendEmail = (data) => {

    return mailTransport.sendMail(data)
        .then(() => { return null })
        .catch(error => { console.log(error) })
}

exports.uploadImage = (imageString, name) => {

    var extension = ''
    if (imageString.charAt(0) === '/') {
        extension = 'jpg'
    }
    else if (imageString.charAt(0) === 'i') {
        extension = 'png'
    }
    else {
        console.log('error: invalid file type')
        return 'error: invalid file type'
    }

    const time = Date.now()
    const fileName = `${name.replace(/ /g, '')}-${time}.${extension}`

    //console.log(`Test:${firebase.storage.TaskState.RUNNING}`);
    try {
        const imageBuffer = Buffer.from(imageString, 'base64')
        const imageByteArray = new Uint8Array(imageBuffer);

        const file = storage.bucket().file(`images/${fileName}`);
        const option = {
            predefinedAcl: 'publicRead',
        }
        return file.save(imageByteArray, option)
            .then(result => {
                const url = `https://storage.googleapis.com/startcom-sepm.appspot.com/images/${fileName}`
                return url
            })
            .catch(error => {
                console.log(error)
                return error
            })

    }
    catch (error) {
        console.log(error)
        return error
    }

}

exports.uploadMultipleImages = (imageStringList, name) => {
    const urlList = []
    const option = {
        predefinedAcl: 'publicRead',
    }
    const promises = []

    imageStringList.forEach((imageString, index) => {
        var extension = ''
        if (imageString.charAt(0) === '/') {
            extension = 'jpg'
        }
        else if (imageString.charAt(0) === 'i') {
            extension = 'png'
        }
        else {
            console.log('error: invalid file type')
            return 'error: invalid file type'
        }

        const time = Date.now()
        const fileName = `${name.replace(/ /g, '')}-${index}-${time}.${extension}`
        const url = `https://storage.googleapis.com/startcom-sepm.appspot.com/images/${fileName}`
        urlList.push(url)
        
        const imageBuffer = Buffer.from(imageString, 'base64')
        const imageByteArray = new Uint8Array(imageBuffer);
        const file = storage.bucket().file(`images/${fileName}`);
        promises.push(file.save(imageByteArray,option))
    })

    return Promise.all(promises)
        .then(()=>{
            return urlList
        })
        .catch(error=>{
            console.log(error)
            return error
        })

}