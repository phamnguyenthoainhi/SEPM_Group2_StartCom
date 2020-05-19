import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";





const styles = (theme) => ({

    ideaCard: {
        border: '.5px solid grey',
    },
    chipTrue: {
        color: theme.color.primary2,
        backgroundColor: theme.color.secondary,
        fontFamily: theme.font2,
        marginRight: 10
    },
    chipFalse: {
        backgroundColor: '#C75D5D',
        fontFamily: theme.font2,
        marginRight: 10
    },
    ideaContainer: {
        padding: "15px 0"
    },
    ideaImage: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%'
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    cancelBtn: {
        fontSize: 15,
        fontFamily: theme.font1,
        color: "#C75D5D",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    },
    confirmBtn: {
        fontSize: 15,
        fontFamily: theme.font1,
        color: theme.color.secondary,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    },
    dialogTitle: {
        padding: '12px 24px 5px 24px',
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontSize: 20,
        fontWeight: 600,
    },
    dialogSubtitle: {
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontWeight: 500,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },



});

class UserTemplateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { classes, user } = this.props;
        return (
            <Card elevation={3} className={classes.ideaCard}>
                <CardContent style={{padding: '10px 30px'}}>
                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Biography:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            <Typography className={classes.text}>
                                {user.biography ? user.biography : null}
                            </Typography>
                        </Grid>
                    </Grid>

                    {this.props.user.type === 'consultant' ? (
                        <Grid container>
                            <Grid container className={classes.ideaContainer} direction='row'>
                                <Grid item md={4} sm={4} xs={4} lg={4}>
                                    <Typography className={classes.header} >
                                        Occupation:
                                    </Typography>
                                </Grid>

                                <Grid item md={8} sm={8}>
                                    <Typography className={classes.text}>
                                        {user.occupation ? user.occupation : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.ideaContainer} direction='row'>
                                <Grid item md={4} sm={4} xs={4} lg={4}>
                                    <Typography className={classes.header} >
                                        Year of experience:
                                    </Typography>
                                </Grid>

                                <Grid item md={8} sm={8}>
                                    <Typography className={classes.text}>
                                        {user.experience ? user.experience : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container className={classes.ideaContainer} direction='row'>
                                <Grid item md={4} sm={4} xs={4} lg={4}>
                                    <Typography className={classes.header} >
                                        Acquired skills:
                                    </Typography>
                                </Grid>

                                <Grid item md={8} sm={8}>
                                    <Typography className={classes.text}>
                                        {user.skills ? user.skills : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        null
                    )}
                </CardContent>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserTemplateProfile));
