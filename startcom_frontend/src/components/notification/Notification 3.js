import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './Style.js';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        
    }

    componentDidMount() { 
        
        
    }
    componentDidUpdate(prevProps) {
        
        
    }
    onClick =() => {
        // window.location.replace('https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin')
    }


    render() {
        const {classes} = this.props; 
        
        return (
            <div className={classes.container}>
                <Card className={classes.root} onClick= {() => this.onClick()}>
                    <CardContent>
                        <Grid container spacing={2}>
                        <Grid item lg={12} className={classes.top}>
                                            <IconButton  aria-label="add an alarm" className={classes.closebtn} onClick={this.close} size="small" >
                                                <CloseIcon fontSize="inherit"/>
                                            </IconButton>
                        </Grid>
                            
                            <Grid item lg={2} className={classes.middleleft}>
                            <img src='https://image.flaticon.com/icons/svg/1157/1157000.svg'height ='25' weight='25' alt="bellicon"/>

                            </Grid>
                            <Grid item lg={10} className={classes.middleright}>
                            <Typography className={classes.content}>ABC just sent you an email message</Typography>
                                
                            </Grid>
                           
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
   

  
})
const mapStateToProps = state => ({
   
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Notification));

