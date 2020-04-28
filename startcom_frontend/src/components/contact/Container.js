import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './ContactStyle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Contact from './Contact';
class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactOpen: false
        }
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen() {

        var x = document.getElementById("mydiv");
        x.style.display = 'block'
        this.setState({
            contactOpen: true
        })
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
                                <Contact id='mydiv' handleClose={this.handleClose}/>
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
    // registerBI: (businessIdea) => dispatch(registerBI(businessIdea)),
    // resetRegisterStatus: () => dispatch(resetRegisterStatus())
  
})

const mapStateToProps = state => ({
//   isRegisteredSuccess: state.businessIdeas.isRegisteredSuccess,
//   isRegisteredLoading: state.businessIdeas.isRegisteredLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Container));

