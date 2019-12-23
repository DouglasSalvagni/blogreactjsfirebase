import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBgJfuGH9BcSiaKkAOtUAsQLQrxW0zMtt0",
    authDomain: "reactapp-53fd2.firebaseapp.com",
    databaseURL: "https://reactapp-53fd2.firebaseio.com",
    projectId: "reactapp-53fd2",
    storageBucket: "reactapp-53fd2.appspot.com",
    messagingSenderId: "841382590506",
    appId: "1:841382590506:web:4dedbf6cbc456e60806b53",
    measurementId: "G-KVF4XKDCH6"
  };
  // Initialize Firebase


class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app.database();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    } 

    async register(email, password, nome) {
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

}

export default new Firebase();