export default class RtcClient {
    constructor() {
        const config = {
            iceServers: [{url: "stun:stun.stunprotocol.org"}]
        };
        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.localPeerName = '';
        this.remotePeerName = '';
    }
}