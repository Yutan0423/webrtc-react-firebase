import React from 'react';
import { IconButton } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const VolumeButton = ({ isLocal, muted, rtcClient, setMuted }) => {
    const Icon = muted ? VolumeOffIcon : VolumeUpIcon;

    return (
        <IconButton
            aria-label="switch mute"
            onClick={() => {
                setMuted((previousState) => !previousState);
                // 以下はローカル側だけ実行可能。
                if(isLocal) rtcClient.toggleAudio();
            }}
        >
          <Icon />
        </IconButton>
    );
};

export default VolumeButton;