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


class Firebase {

    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);


        // Referenciando a database para acessar em outros locais
        this.app = app.database();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password);
    } 

    logout() {
        return app.auth().signOut();
    }

    async register(email, password, name) {
        await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            name: name
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

    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null;
        }

        const uid = app.auth().currentUser.uid;

        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }

}

export default new Firebase();