import firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaseSignallingClient {
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

    setPeerNames(localPeerName, remotePeerName) {
        this.localPeerName = localPeerName;
        this.remotePeerName = remotePeerName;
    }

    get targetRef() {
        return this.database.ref(this.remotePeerName);
    }

    async sendOffer(sessionDescription) {
        await this.targetRef.set({
            type: 'offer',
            sender: this.localPeerName,
            sessionDescription
        });
    }

    async sendAnswer(sessionDescription) {
        await this.targetRef.set({
            type: 'answer',
            sender: this.localPeerName,
            sessionDescription
        });
    }

    async sendCandidate(candidate) {
        await this.targetRef.set({
            type: 'candidate',
            sender: this.localPeerName,
            candidate
        });
    }

    async remove(path) {
        await this.database.ref(path).remove();
    }
}