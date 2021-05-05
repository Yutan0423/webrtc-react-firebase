import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import AudioVisualiser from './AudioVisualiser';

const useStyles = makeStyles({});

const Video = ({ isLocal, name, rtcClient, videoRef }) => {
  const [muted, setMuted] = useState(rtcClient.initialAudioMuted);
  const refCard = useRef(null);
  const dimensionCard = useDimensions(refCard);

  if(videoRef.current) console.log({isLocal, srcObject: videoRef.current.srcObject});

  const classes = useStyles();

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          muted={isLocal || muted}
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
          rtcClient={rtcClient}
          setMuted={setMuted}
        />
        { !muted && videoRef.current && videoRef.current.srcObject && (
          <AudioAnalyser audio={videoRef.current.srcObject} />
        )}
      </CardActions>
    </Card>
  );
};

export default Video;