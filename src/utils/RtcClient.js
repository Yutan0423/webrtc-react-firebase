import FirebaseSinallingClient from './FirebaseSignallingClient';

export default class RtcClient {
    constructor(remoteVideoRef, setRtcClient) {
        const config = {
            iceServers: [{url: "stun:stun.stunprotocol.org"}]
        };
        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.FirebaseSinallingClient = new FirebaseSinallingClient();
        this.localPeerName = '';
        this.remotePeerName = '';
        this.remoteVideoRef = remoteVideoRef;
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

    get videoTrack() {
        return this.mediaStream.getVideoTracks()[0];
    }

    async offer() {
        const sessionDescription = await this.createOffer();
        await this.setLocalDescription(sessionDescription);
        await this.sendOffer();
    }

    async createOffer() {
        try {
            return await this.rtcPeerConnection.createOffer();
        } catch(error) {
            console.error(error);
        }
    }

    async setLocalDescription(sessionDescription) {
        try{
            await this.rtcPeerConnection.setLocalDescription(sessionDescription);
        } catch(error) {
            console.error(error);
        }
    }

    async sendOffer() {
        this.FirebaseSinallingClient.setPeerNames(
            this.localPeerName,
            this.remotePeerName
        );

        await this.FirebaseSinallingClient.sendOffer(this.localDescription);
    }

    setOnTrack() {
        this.rtcPeerConnection.onTrack = (rtcTrackEvent) => {
            if(rtcTrackEvent.track.kind !== 'video') return;

            const remoteMediaStream = rtcTrackEvent.stream[0];
            this.remoteVideoRef.current.srcObject = remoteMediaStream;
            this.setRtcClient();
        }

        this.setRtcClient();
    }

    async connect(remotePeerName) {
        this.remotePeerName = remotePeerName;
        this.setOnicecandidateCallback();
        this.setOnTrack();
        await this.offer();
        this.setRtcClient();
    }

    get localDescription() {
        return this.rtcPeerConnection.localDescription.toJSON();
    }

    setOnicecandidateCallback() {
        this.rtcPeerConnection.onicecandidate = ({ candidate }) => {
            if(candidate) {
                console.log({ candidate })
                // TODO: remoteへcandidateを通知する
            }
        }
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