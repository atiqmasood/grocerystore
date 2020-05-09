import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '15rem',
    height: '17rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

export default function AppCard({mediaTitle, mediaImage, content, footer}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
            className={classes.media}
            image={mediaImage}
            title={mediaTitle || ''}
        />
        <CardContent>
            {content && content}
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {footer && footer}
      </CardActions>
    </Card>
  );
}