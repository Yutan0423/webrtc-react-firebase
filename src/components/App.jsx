import React, { useReducer, useState } from 'react';
import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';
import RtcClient from '../utils/RtcClient';
import VideoArea from './VideoArea';

const App = () => {
  const [rtcClient, _setRtcClient] = useState(new RtcClient());
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  // setRtcClientは変化するが、再レンダリングはしないため、このような関数を定義する。
  const setRtcClient = (rtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  }

  return (
    <>
      <InputFormLocal rtcClient={rtcClient}  setRtcClient={setRtcClient} />
      <InputFormRemote rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  );
}

export default App;
