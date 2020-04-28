import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './ContactStyle';
import Card from '@material-ui/core/Card';
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
import TextField from '@material-ui/core/TextField';
import '../../custom.css'

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactOpen: false
        }
        
    }
    close = () => {
        this.props.handleClose()
    }

    

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.right} >  
                            <Card className={classes.rootcontact} id='mydiv' style={{display: 'none'}}>
                                <CardContent >
                                
                                            <div className={classes.closesection}>
                                            <IconButton  aria-label="add an alarm" className={classes.closebtn} onClick={this.close} >
                                                <CloseIcon />
                                            </IconButton>
                                            </div>
                                            <Typography className={classes.subject} color="textSecondary" gutterBottom>
                                                        Subject:
                                            </Typography>
                                            <TextField 
                                            
                                            // onChange={this.onChange} 
                                            // value = {this.state.name} 
                                            name = 'subject'  
                                            fullWidth
                
                                            required 
                                            className ={classes.input}
                                            
                                            />
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
                                                        
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </List>
                                            </div>

                                            <div className={classes.messageContent}>
                                            
                                        
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Content:
                                                    </Typography>
                                                    
                                                        <div className="form-group">
                                                            
                                                            <div className={classes.messagearea}>
                                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" cols="100"></textarea>
                                                            </div>
                                                        </div>
                                            </div>

                                            <div className={classes.action}>
                                                <Button variant="outlined" className={classes.send} id ='closeBtn'>Send</Button>
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

