import React, { useState } from 'react';
import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';


const getMedia = async () => {
  const constraints = {
    audio: true,
    video: true,
  }

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch(err) {
    /* エラーを処理 */
    console.error(err);
  }
}

getMedia();

const App = () => {
  const [localPeerName, setLocalPeerName] = useState('');
  const [localRemoteName, setRemotePeerName] = useState('');
  return (
    <>
      <InputFormLocal
        localPeerName={localPeerName}
        setLocalPeerName={setLocalPeerName}
      />
      <InputFormRemote
        localRemoteName={localRemoteName}
        setRemotePeerName={setRemotePeerName}
      />
    </>
  );
}

export default App;
