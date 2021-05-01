import { useEffect, useReducer, useState } from 'react';

import RtcClient from '../../utils/RtcClient';

const useRtcClient = () => {
    const [rtcClient, _setRtcClient] = useState(null);
    const [, forceRender] = useReducer((boolean) => !boolean, false);

    // setRtcClientは変化するが、再レンダリングはしないため、このような関数を定義する。
    const setRtcClient = (rtcClient) => {
      _setRtcClient(rtcClient);
      forceRender();
    }

    useEffect(() => {
      const client = new RtcClient(setRtcClient);
      client.setRtcClient();
    }, []);

    return rtcClient;
};

export default useRtcClient;