import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI, getBIByOwnerID} from "../../actions/businessideas/BIActions";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import defaultUser from '../../images/default.png';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import BITemplateProfile from "../Layout/BITemplateProfile";
import {getUser} from "../../actions/users/UserActions";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const styles = (theme) => ({
    containerWrapper: {
        padding: "50px 80px",
        [theme.breakpoints.down('md')]: {
            padding: "50px 250px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "50px 150px",
        },
    },
    card: {
        border: '.5px solid grey',
        [theme.breakpoints.between('xs', 'md')]: {
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
        },
    },
    avatar: {
        borderRadius: '50%',
        height: "100px",
        width: "100px",
    },
    username: {
        fontFamily: theme.font2,
        fontWeight: 700,
        textAlign: 'center'
    },
    infoContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        padding: "10px 0 20px 0"
    },
    avatarContainer: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    button: {
        marginTop: 5,
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        fontSize: 13,
        transition: "all 350ms ease-in-out",
        color: theme.color.primary2,
        backgroundColor: theme.color.secondary,
        fontWeight: 600,
        "&:hover": {
            color: theme.color.primary2,
            backgroundColor: theme.color.contrast,
        },
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: theme.font2,
        fontWeight: 700,
        color: '#a4a4a4',
    },
    email: {
        fontFamily: theme.font2,
        fontWeight: 400,
    },
    container: {
        padding: "10px 0"
    },
    mediaBtn: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
    },

    progressContainer: {
        padding: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
    iconBtn: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        "&:hover": {
            textDecoration: 'none',
            backgroundColor: 'transparent',
        },
        "&:focus": {
            textDecoration: 'none',
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },



});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            email: '',
            username: '',
            avatar: '',
            facebook: '',
            linkedIn: ''
        }
    }


    componentDidMount() {
        const userID = sessionStorage.getItem("id");
        this.props.getBIByOwnerID(userID)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.businessIdea !== prevProps.businessIdea) {
            if (this.props.user.avatar !== '' && this.props.user.avatar !== undefined && this.props.user.avatar !== null) {
                this.setState({
                    avatar: this.props.user.avatar
                })
            }
        }
    }

    render() {
        console.log(this.props.businessIdea);
        const { classes, user, businessIdea, loading, userLoading, doneDeleteBI, deleting } = this.props;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            {userLoading ? (
                                <Grid container className={classes.progressContainer}>
                                    <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                                </Grid>
                            ): (
                                <Card className={classes.card}>
                                    <CardContent style={{padding: "40px 50px"}}>
                                        <Grid container className={classes.avatarContainer} direction='column'>
                                            <img
                                                src={user.avatar ? user.avatar : defaultUser}
                                                className={classes.avatar}
                                                alt="User's Avatar"
                                            />
                                        </Grid>
                                        <Grid container className={classes.infoContainer} direction='column'>
                                            <Typography className={classes.username} variant='h6'>
                                                {user.username ? user.username : user.email}
                                            </Typography>
                                            <Grid container justify='center'>
                                                <Button className={classes.button}>Edit Profile</Button>
                                            </Grid>

                                        </Grid>

                                        <Divider variant='fullWidth'/>

                                        <Grid container className={classes.container} direction='column'>
                                            <Typography variant="subtitle2" className={classes.title}>
                                                Email
                                            </Typography>
                                            <Typography variant="subtitle2" className={classes.email}>
                                                {user.email}
                                            </Typography>
                                        </Grid>

                                        <Grid container className={classes.container} direction='column'>
                                            <Typography variant="subtitle2" className={classes.title}>
                                                Contact
                                            </Typography>
                                            <Grid container className={classes.mediaBtn}>
                                                {user.facebook ? (
                                                    <IconButton href={user.facebook} className={classes.iconBtn}>
                                                        <i
                                                            style={{color: "#90B494", fontSize: "30px"}}
                                                            className="fab fa-facebook-square"/>
                                                    </IconButton>
                                                ) : null}

                                                {user.linkedIn ? (
                                                    <IconButton href={user.linkedIn} className={classes.iconBtn}>
                                                        <i
                                                            className="fab fa-linkedin"
                                                            style={{color: "#90B494", fontSize: "30px"}}
                                                        />
                                                    </IconButton>
                                                ) : null}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <Grid container className={classes.avatarContainer} style={{marginBottom: 10}}>
                                <Typography variant='h6' className={classes.header}>
                                    Business idea
                                </Typography>
                            </Grid>

                            <Grid container className={classes.avatarContainer}>
                                <Grid item lg={12} md={12} sm={12}>

                                    { deleting ? (
                                        <Backdrop className={classes.backdrop} open={deleting}>
                                            <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                                        </Backdrop>
                                    ) : null }

                                    {loading ? (
                                        <Grid container className={classes.progressContainer}>
                                            <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                                        </Grid>
                                    ): businessIdea.error ? (
                                        <Grid container className={classes.infoContainer} direction='column'>
                                            <Typography variant="subtitle1" className={classes.email}>{businessIdea.error}</Typography>
                                            <Button component={Link} to="/registerBI" className={classes.button}>Register Yours Now</Button>
                                        </Grid>
                                    ) : (
                                       <BITemplateProfile businessIdea={businessIdea}/>
                                    )}
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Footer/>

                <Snackbar open={doneDeleteBI} autoHideDuration={4000} style={{backgroundColor: '#90B494'}}>
                    <Alert severity="success" className={classes.input}>
                        Successfully delete business idea !
                    </Alert>
                </Snackbar>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    getBIByOwnerID: (ownerID) => dispatch(getBIByOwnerID(ownerID))
});

const mapStateToProps = state => ({
    user: state.usersReducer.user,
    userLoading: state.usersReducer.userLoading,
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading,
    deleting: state.UI.deleting,
    doneDeleteBI: state.UI.doneDeleteBI
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
