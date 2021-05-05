import React, { useRef, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import useDimensions from './hooks/useDimensions';
import VolumeButton from './VolumeButton';
import AudioAnalyser from './AudioAnalyser';

const Video = ({ isLocal, name, rtcClient, videoRef }) => {
  const [muted, setMuted] = useState(rtcClient.initialAudioMuted);
  const refCard = useRef(null);
  const dimensionCard = useDimensions(refCard);
  const refVolumeButton = useRef(null);
  const dimensionsVolumeButton = useDimensions(refVolumeButton);

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          muted={isLocal || muted}
          refVolumeButton={refVolumeButton}
          ref={videoRef}
          width={dimensionCard.width}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { name }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton
          isLocal={isLocal}
          muted={muted}
          refVolumeButton={refVolumeButton}
          rtcClient={rtcClient}
          setMuted={setMuted}
        />
        { !muted && videoRef.current && videoRef.current.srcObject && (
          <AudioAnalyser
            audio={videoRef.current.srcObject}
            width={dimensionCard.width - dimensionsVolumeButton.width -40}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default Video;