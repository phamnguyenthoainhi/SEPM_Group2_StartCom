
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCjKVrAR6DPa8PAFZh63Vpj5ZRWP_JJB50",
    authDomain: "startcom-sepm.firebaseapp.com",
    databaseURL: "https://startcom-sepm.firebaseio.com",
    projectId: "startcom-sepm",
    storageBucket: "startcom-sepm.appspot.com",
    messagingSenderId: "330944166534",
    appId: "1:330944166534:web:8c73307caace919153ef07",
    measurementId: "G-C2D5VNYMMD"
})

const initMessaging = firebase.messaging()