import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'; 
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ContentCard = (props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const {title, subtitle, date, imgSc, price, hour} = props;

  return (
      
    <Card>
        <CardMedia
            className={classes.media}
            image= {imgSc}
        />
        <CardHeader
        action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
        }
        title= {title}
        />

    <CardMedia style = {{heigh: "150px"}}
        className={classes.media}
        image= {imgSc}
    />
    <CardContent>
        <Typography price = {price}/>
        <Typography hour = {hour}/>
    </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Book Now
        </Button>
        
      </CardActions>
    </Card>
  );
};
export default ContentCard;