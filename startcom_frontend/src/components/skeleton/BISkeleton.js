import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";



const styles = (theme) => ({
    container: {
        padding: 80,
        [theme.breakpoints.down('sm')]: {
            padding: 40
        }
    },
    cardContent: {
        padding: '10px 20px'
    },
    cardWrapper: {
        border: '.5px solid grey',
    },
    imageSke: {
        height: 140,
        width: 'auto',
        backgroundColor: '#a4a4a4'
    },
    investorSke: {
        width: 120,
        height: 20,
        backgroundColor: '#a4a4a4',
        margin: "10px 0"
    },
    bodySke: {
        width: 'auto',
        height: 100,
        margin: '10px 0',
        backgroundColor: '#a4a4a4',
    },
    categorySke: {
        width: 130,
        height: 20,
        backgroundColor: '#a4a4a4',
        margin: "10px 0"
    },
    fundingSke: {
        width: 'auto',
        backgroundColor: '#a4a4a4',
        height: 30
    },
    skeletonWrapper: {
        padding: 20,

    }
});

class BISkeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.container}>
                {Array.from({length: 4}).map((item, index) => (
                    <Grid item md={4} lg={3} sm={4} xs={6} key={index} style={{padding: 20}}>
                        <Card className={classes.cardWrapper}>
                            <Skeleton variant="rect" className={classes.imageSke}/>
                            <CardContent className={classes.cardContent}>
                                <Skeleton variant="rect" className={classes.investorSke}/>
                                <Skeleton variant="rect" className={classes.bodySke}/>
                                <Skeleton variant="rect" className={classes.categorySke}/>
                                <Skeleton variant="rect" className={classes.fundingSke}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BISkeleton));
