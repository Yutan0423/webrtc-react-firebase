import firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaaseSinallingClient {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBYVKIqG8590PYUv4OLHKlETKQ8XaKFfnk",
            authDomain: "webrtc-react-firebase-fa357.firebaseapp.com",
            databaseURL: "https://webrtc-react-firebase-fa357-default-rtdb.firebaseio.com",
            projectId: "webrtc-react-firebase-fa357",
            storageBucket: "webrtc-react-firebase-fa357.appspot.com",
            messagingSenderId: "199725548136",
            appId: "1:199725548136:web:dbc48052b788941b7b71dd"
        };
        if(firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.localPeerName = '';
        this.remotePeerName = '';
    }
}