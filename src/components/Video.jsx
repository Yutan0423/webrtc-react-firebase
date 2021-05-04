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

const useStyles = makeStyles({});

const Video = ({ isLocal, name, videoRef }) => {
  const [muted, setMuted] = useState(true);
  const refCard = useRef(null);
  const dimensionCard = useDimensions(refCard);

  const classes = useStyles();

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          muted={isLocal}
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
        <VolumeButton muted={muted} setMuted={setMuted} />
      </CardActions>
    </Card>
  );
};

export default Video;