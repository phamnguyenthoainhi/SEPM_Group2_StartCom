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
import {sendMessage, getProfile} from '../../actions/users/UserActions';
import CircularProgress from "@material-ui/core/CircularProgress";

const ColorCircularProgress = withStyles({
    root: {
      color: '#3C5155'
      
    },
  })(CircularProgress);
class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactOpen: false,
            sender: '',
            profileSender: '',
            profileReceiver: '',
            profileLoading: false,
            subject: '',
            text: '',
            loading: false,
            success: false
        }
        
    }
    close = () => {
        this.props.handleClose()
    };

    componentDidMount() {
        if (sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") !== undefined && sessionStorage.getItem("id") !== "") {
            this.props.getProfile(sessionStorage.getItem("id"), 'sender')

        }
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.sendMessageLoading !== prevProps.sendMessageLoading) {
            this.setState({
                loading: this.props.sendMessageLoading
            })
        }
        if (this.props.profileSender !== prevProps.profileSender) {
            this.setState({
                profileSender: this.props.profileSender 
            })
            
        }
        if (this.props.profileLoading !== prevProps.profileLoading) {
            this.setState({
                profileLoading: this.props.profileLoading
            })
        }
        if (this.props.sendMessageSuccess !== prevProps.sendMessageSuccess && this.props.sendMessageSuccess === true) {
            this.setState({
                success: this.props.sendMessageSuccess,
                profileSender: '',
                profileReceiver: '',
                subject: "",
                text: "",
                
            })
            
        }
        if (this.props.profileReceiver !== prevProps.profileReceiver) {
            this.setState({
                profileReceiver: this.props.profileReceiver,
                success: false
            })
            
            this.props.getProfile(sessionStorage.getItem("id"), 'sender')
        }
    }
    
    onSubmit = (e, receiverid) => {
        const {history} = this.props;
        e.preventDefault();
            const message = {
                sender: this.state.profileSender.id,
                receiver: this.state.profileReceiver.id,
                subject: this.state.subject,
                text: this.state.text,
            };
            console.log(JSON.stringify(message));
            this.props.sendMessage(message, history);
            this.setState({
                contactOpen: false
            })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
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
                                            
                                            onChange={(e) => this.onChange(e)} 
                                            value = {this.state.subject} 
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
                                                                <ListItemText primary=
                                                                 {this.state.profileSender === undefined ? null : this.state.profileSender.email}
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
                                                        <ListItemText primary=
                                                        
                                                        {this.state.profileReceiver === undefined ? null: this.state.profileReceiver.email}
                                                       
                                                        
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
                                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" cols="100"
                                                                 onChange={(e) => this.onChange(e)} 
                                                                value = {this.state.text} 
                                                                name = 'text' 
                                                                />
                                                            </div>
                                                        </div>
                                            </div>

                                            {this.state.loading ? (
                                                <div className={classes.action}>
                                            <ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "0%"}}/>

                                                </div>
                                            ): 
                                            this.state.success ? (
                                                <div className={classes.action}>
                                                    
                                                            <img src='https://image.flaticon.com/icons/svg/561/561226.svg'height ='40' weight='40' alt="send icon"/>
                                                        
                                                            <Typography className={classes.sendtext} color="textSecondary" gutterBottom>
                                                            Message Sent!
                                                        </Typography>
                                                        
                                                    
                                                </div>
                                            
                                            ) :
                                            
                                            
                                            (<div className={classes.action}>
                                                <Button variant="outlined" className={classes.send} 
                                               
                                                onClick ={(e, receiverid )=>this.onSubmit(e, this.props.profileReceiver.id)}

                                                >Send</Button>
                                            </div>)}
                                           
                    
                                </CardContent>
                                    
                            </Card>
                        
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    sendMessage: (message, history) => dispatch(sendMessage(message, history)),
    getProfile: (id, type) => dispatch(getProfile(id, type))
  
})

const mapStateToProps = state => ({
    sendMessageLoading: state.usersReducer.sendMessageLoading,
    sendMessageSuccess: state.usersReducer.sendMessageSuccess,
    profileLoading: state.usersReducer.profileLoading,
    profileSender: state.usersReducer.profileSender

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Contact));

