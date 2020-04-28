import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './ContactStyle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Contact from './Contact';
import {getProfile} from '../../actions/users/UserActions';
class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactOpen: false,
            
            profileReceiver: {},
            profileLoadingReceiver: false,
            sender: '',
            receiver: ''
        }
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidUpdate(prevProps) {
       console.log(this.props)
        if (this.props.profileLoading !== prevProps.profileLoading) {
            this.setState({
                loading: this.props.profileLoading
            })
        }
        if (this.props.profileReceiver !== prevProps.profileReceiver) {
            this.setState({
                profileReceiver: this.props.profileReceiver
            })
        }
    }

    handleOpen() {

        var x = document.getElementById("mydiv");
        x.style.display = 'block'
        this.setState({
            contactOpen: true,
           
        })

        this.props.getProfile('rxUdzWLlcdgiwszQwicMrjhPSQR2', 'receiver');
    }
    

    handleClose() {
        
        var x = document.getElementById("mydiv");
        x.style.display = 'none';
        this.setState({
            contactOpen: false
        })
        
    }






    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.state.contactOpen ? 
                (
                <Grid container  spacing={2}>
                    <Grid item xs={9} >
                            <Grid container  spacing={2}>
                                    <Grid item xs={4} className={classes.grid} >
                                    <Card className={classes.root}>
                                       
                                           
                                        <CardActions>
                                            <Button size="small" onClick={
                                        () => this.handleOpen()}>Contact</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                                    <Grid item xs={4} className={classes.grid} >
                                    <Card className={classes.root}>
                                       
                                           
                                        <CardActions>
                                            <Button size="small" onClick={
                                        () => this.handleOpen()}>Contact</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                                    <Grid item xs={4} className={classes.grid}>
                                    <Card className={classes.root}>
                                       
                                           
                                        <CardActions>
                                            <Button size="small"onClick={
                                        () => this.handleOpen()} >Contact</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>

                                </Grid>
                    </Grid>
                    <Grid item xs={3}>
                
                                {/* } */}
                                <Contact id='mydiv' handleClose={this.handleClose} profileReceiver = {this.state.profileReceiver} 
                                
                                />

                                
                    </Grid>
                    
                </Grid>
                )
                :
                (
                <Grid container  spacing={2}>
                    <Grid item xs={12}>
                            <Grid container  spacing={2}>
                                    <Grid item xs={4} className={classes.grid} >
                                    <Card className={classes.root}>
                                        <CardActions>
                                            <Button size="small" onClick={
                                        () => this.handleOpen()}>Contact</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                                    <Grid item xs={4} className={classes.grid} >
                                    <Card className={classes.root}>
                                        <CardActions>
                                            <Button size="small" onClick={
                                        () => this.handleOpen()}>Contact</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                                    <Grid item xs={4} className={classes.grid}>
                                    <Card className={classes.root}>
                                    <CardActions>
                                            <Button size="small" onClick={
                                        () => this.handleOpen()}>Contact</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>

                                </Grid>
                    </Grid>
                    <Grid item xs={false}>
                                <Contact id='mydiv' handleClose={this.handleClose}/>
                    </Grid>
                    
                </Grid>
                )
            }
                
                
               
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    getProfile: (id, type) => dispatch(getProfile(id, type))
  
})

const mapStateToProps = state => ({
    profileLoading: state.profileLoading.profileLoading,
    profileReceiver: state.profileReceiver.profileReceiver
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Container));

