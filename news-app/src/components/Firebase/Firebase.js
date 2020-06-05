import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "",
    authDomain: "news-app-21a45.firebaseapp.com",
    databaseURL: "https://news-app-21a45.firebaseio.com",
    projectId: "news-app-21a45",
    storageBucket: "news-app-21a45.appspot.com",
    messagingSenderId: "570938653373",
    appId: "1:570938653373:web:f22ce001cfb58a5e3595d4",
    measurementId: "G-4HVVFZVBF3"
};

class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
      this.auth=app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
}
   
export default Firebase;