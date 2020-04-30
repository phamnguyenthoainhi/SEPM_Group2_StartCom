import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    skeletonWrapper: {
        padding: '50px 100px',
        [theme.breakpoints.down('sm')]: {
            padding: '50px 60px',
        },
    },
    titleSke: {
        height: 50,
        width: 550,
        backgroundColor: '#a4a4a4',
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            height: 30,
            width: 400,
        }
    },
    descriptionSke: {
        height: 30,
        width: 550,
        backgroundColor: '#a4a4a4',
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            height: 25,
            width: 400,
        }
    },
    categorySke: {
        width: 130,
        height: 20,
        backgroundColor: '#a4a4a4',
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            width: 90,
            height: 20,
        }
    },
    imageSke: {
        height: 350,
        width: 'auto',
        backgroundColor: '#a4a4a4',
        [theme.breakpoints.down('sm')]: {
            height: 300
        },
        [theme.breakpoints.down('xs')]: {
            height: 250
        }

    },
    divider: {
        height: 10,
        width: 'auto',
        backgroundColor: '#a4a4a4'
    },
    fundingSke: {
        width: 300,
        height: 100,
        backgroundColor: '#a4a4a4',
        [theme.breakpoints.down('sm')]: {
            width: 250,
            height: 80,
        },
        [theme.breakpoints.down('xs')]: {
            height: 60,
            width: 200,
        }
    },
    container: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center'
        }
    },
    buttonSke: {
        width: 'auto',
        height: 50,
        margin: '10px 0',
        backgroundColor: '#a4a4a4',
        [theme.breakpoints.down('sm')]: {
            height: 40,
        },
        [theme.breakpoints.down('xs')]: {
            height: 30
        }
    },


});

class BIDetailSkeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { classes } = this.props;
        return (
                <Grid container className={classes.skeletonWrapper}>
                    <Grid container>
                        <Grid item md={7} sm={6} xs={12}>
                            <Skeleton variant="rect" className={classes.titleSke}/>
                            <Skeleton variant="rect" className={classes.descriptionSke}/>
                            <Skeleton variant="rect" className={classes.categorySke}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item md={7} sm={6} xs={12}>
                            <Skeleton variant="rect" className={classes.imageSke}/>
                        </Grid>

                        <Grid item md={5} sm={6} xs={12}>
                            <Skeleton  variant="rect" className={classes.divider} />
                            <Grid container style={{padding: "20px 0"}} direction='column' className={classes.container}>
                                <Skeleton variant="rect" className={classes.fundingSke}/>
                            </Grid>

                            <Grid container direction='column'>
                                <Skeleton variant="rect" className={classes.buttonSke}/>
                                <Skeleton variant="rect" className={classes.buttonSke}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BIDetailSkeleton));
