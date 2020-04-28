import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './ContactStyle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
class Contact extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.right}>
                <Card className={classes.root}>
                    <CardContent >
                       
                                <div className={classes.closesection}>
                                <IconButton  aria-label="add an alarm" className={classes.closebtn} >
                                    <CloseIcon />
                                </IconButton>
                                </div>
                                <div className={classes.sender}>
                 
                            
                       
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            From:
                                            </Typography>
                                            <List >
                                                <ListItem>
                                                    <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Photos"
                                                    //  secondary="Jan 9, 2014"
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </List>
                                </div>

                                <div className={classes.receiver}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    To:
                                    </Typography>
                                    <List >
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Photos" 
                                            // secondary="Jan 9, 2014" 
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </List>
                                </div>

                                <div className={classes.messageContent}>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Content:
                                        </Typography>
                                        
                                            <div class="form-group">
                                                
                                                <div className={classes.messagearea}>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="11" cols="100"></textarea>
                                                </div>
                                            </div>
                                </div>

                                <div className={classes.action}>
                                    <Button className={classes.send}>Send</Button>
                                </div>
                        
                    </CardContent>
                        
                </Card>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    // registerBI: (businessIdea) => dispatch(registerBI(businessIdea)),
    // resetRegisterStatus: () => dispatch(resetRegisterStatus())
  
})

const mapStateToProps = state => ({
//   isRegisteredSuccess: state.businessIdeas.isRegisteredSuccess,
//   isRegisteredLoading: state.businessIdeas.isRegisteredLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Contact));

