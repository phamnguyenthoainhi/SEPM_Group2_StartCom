import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";



const styles = (theme) => ({
    containerWrapper: {
        padding: 50
    },

    cardContent: {
        padding: 0
    },
    cardWrapper: {
        border: '.5px solid grey',
    },
    avatarSke: {
        height: 100,
        width: 100,
        backgroundColor: '#a4a4a4'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    usernameSke: {
        width: 150,
        height: 30,
        backgroundColor: '#a4a4a4',
        margin: 10
    },

    container: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    textSke: {
        width: 170,
        height: 15,
        backgroundColor: '#a4a4a4',
        margin: 5
    },

    titleSke: {
        width: 150,
        height: 15,
        backgroundColor: '#a4a4a4',
        margin: 5
    },


});

class UserSkeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.containerWrapper}>
                {Array.from({length: 4}).map((item, index) => (
                    <Grid item md={4} lg={3} sm={4} xs={6} key={index} style={{padding: 20}}>
                        <Card className={classes.cardWrapper}>
                            <Grid container className={classes.avatarContainer} direction='column'>
                                <Skeleton variant="circle" className={classes.avatarSke}/>
                                <Skeleton variant="rect" className={classes.usernameSke}/>
                            </Grid>
                            <CardContent className={classes.cardContent}>
                                <Grid container className={classes.container}>
                                    <Skeleton variant="rect" className={classes.titleSke}/>
                                    <Skeleton variant="rect" className={classes.textSke}/>
                                </Grid>

                                <Grid container className={classes.container}>
                                    <Skeleton variant="rect" className={classes.titleSke}/>
                                    <Skeleton variant="rect" className={classes.textSke}/>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


        )
    }
}

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserSkeleton));
