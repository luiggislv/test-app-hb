import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAkhDYWL_Eq7hk-hshP0ccp3f5d95nyqQs",
    authDomain: "test-app-hb.firebaseapp.com",
    databaseURL: "https://test-app-hb.firebaseio.com",
    projectId: "test-app-hb",
    storageBucket: "test-app-hb.appspot.com",
    messagingSenderId: "129110207113",
    appId: "1:129110207113:web:abd4205d698dbee434f458"
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {auth, db}