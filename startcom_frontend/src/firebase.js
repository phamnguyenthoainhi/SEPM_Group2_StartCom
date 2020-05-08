import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCjKVrAR6DPa8PAFZh63Vpj5ZRWP_JJB50",
    authDomain: "startcom-sepm.firebaseapp.com",
    databaseURL: "https://startcom-sepm.firebaseio.com",
    projectId: "startcom-sepm",
    storageBucket: "startcom-sepm.appspot.com",
    messagingSenderId: "330944166534",
    appId: "1:330944166534:web:8c73307caace919153ef07",
    measurementId: "G-C2D5VNYMMD"
};
firebase.initializeApp(firebaseConfig)



export default firebase;