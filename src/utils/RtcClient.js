import FirebaseSinallingClient from './FirebaseSignallingClient';

export default class RtcClient {
    constructor(setRtcClient) {
        const config = {
            iceServers: [{url: "stun:stun.stunprotocol.org"}]
        };
        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.FirebaseSinallingClient = new FirebaseSinallingClient();
        this.localPeerName = '';
        this.remotePeerName = '';
        this._setRtcClient = setRtcClient;
        this.mediaStream = null;
    }

    setRtcClient() {
        this._setRtcClient(this);
    }

    async getUserMedia() {
        try {
            const constraints = { audio: true, video: true };
            this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch(error) {
            console.error(error);
        }

    }

    async setMediaStream () {
        await this.getUserMedia();
        this.addTracks();
        this.setRtcClient();
    }

    addTracks() {
        this.addAudioTrack();
        this.addVideoTrack();
    }

    addAudioTrack() {
        this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
    }

    addVideoTrack() {
        this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
    }

    get audioTrack() {
        return this.mediaStream.getAudioTracks()[0];
    }

    get VideoTrack() {
        return this.mediaStream.getVideoTracks()[0];
    }

    startListening(localPeerName) {
        this.localPeerName = localPeerName;
        this.setRtcClient();
        this.FirebaseSinallingClient.database
            .ref(localPeerName)
            .on('value', (snapshot) => {
                const data = snapshot.val();
            });
    }

}