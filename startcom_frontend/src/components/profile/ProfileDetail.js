import React, { Component} from 'react';
import {connect} from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import defaultUser from '../../images/default.png';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";


import UserTemplateProfile from "../Layout/template/UserTemplateProfile";
import {getChosenProfile, getProfile} from "../../actions/users/UserActions";
import Contact from '../contact/Contact'
const styles = (theme) => ({
    containerWrapper: {
        padding: "50px 80px",
        [theme.breakpoints.down('md')]: {
            padding: "50px 200px",
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
        objectFit: 'cover',
        borderRadius: '50%',
        height: 100,
        width: 100,
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
        justifyItems: 'center'
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
    }

});

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            image: '',
            biography: '',
            facebook: '',
            linkedIn: '',
            openBiography: false,
            occupation: '',
            yearOfExperience: 0,
            contactOpen: false,
            profileReceiver: {},
        }
        this.handleClose = this.handleClose.bind(this)

    }


    handleOpen(id) {
       
        // console.log("Hello" + id)
        var x = document.getElementById("mydiv");
        x.style.display = 'block'
        this.setState({
            contactOpen: true
           
        })

        this.props.getProfile(id, 'receiver');
    }

    handleClose() {
        
        var x = document.getElementById("mydiv");
        x.style.display = 'none';

        this.setState({
            contactOpen: false
        })
        
    }

    componentDidMount() {
        const auth = sessionStorage.getItem("token");
        const profileID = this.props.match.params.id;
        if (!auth) {
            window.location.href = "/auth";
        }
        this.props.getChosenProfile(profileID)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.profileReceiver !== prevProps.profileReceiver) {
            this.setState({
                profileReceiver: this.props.profileReceiver
            })
        }
    }

    render() {
        // console.log("Profile:", this.props.profile);
        const { classes, fetching, profile} = this.props;
        return (
            <Grid container>
                <Navbar/>
                
                    {this.state.contactOpen ? (
                        <Grid container  spacing={3}>
                        <Grid item lg={9} xs={12} sm={12} md={12}>
                        <Grid container className={classes.containerWrapper} >
                    <Grid container spacing={3}>
                        <Grid container className={classes.avatarContainer} style={{marginBottom: 30}} direction='column'>
                            <Typography variant='h6' className={classes.header} style={{textAlign: 'center'}}>
                                Portfolio
                            </Typography>
                            {profile.type === 'investor' ? (
                                <Typography variant='subtitle2' className={classes.email}>
                                    * Note that your profile can only be publicized after being verified by the admin
                                </Typography>
                            ) : (
                                null
                            )}
                        </Grid>

                        {fetching ? (
                            <Grid container className={classes.progressContainer}>
                                <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                            </Grid>
                        ) : (

                            <Grid container spacing={3} >
                            <Grid item xs={12} sm={12} md={12} lg={4}>
                                <Grid container direction='column' spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card className={classes.card}>
                                            <CardContent style={{padding: "30px 30px"}}>
                                                <Grid container className={classes.avatarContainer} direction='column'>
                                                    <img
                                                        src={profile.image ? profile.image : defaultUser}
                                                        className={classes.avatar}
                                                        alt="User's Avatar"
                                                    />
                                                </Grid>
                                                <Grid container className={classes.infoContainer} direction='column'>
                                                    <Typography className={classes.username} variant='h6'>
                                                        {profile.username ? profile.username : profile.email}
                                                    </Typography>
                                                    <Grid container justify='center'>
                                                        <Button className={classes.button}
                                                        onClick={
                                                            (id) => this.handleOpen(profile.id)}
                                                        >
                                                            Send message</Button>
                                                    </Grid>

                                                </Grid>

                                                <Divider variant='middle'/>

                                                <Grid container className={classes.container} direction='column'>
                                                    <Typography variant="subtitle2" className={classes.title}>
                                                        Email
                                                    </Typography>
                                                    <Typography variant="subtitle2" className={classes.email}>
                                                        {profile.email}
                                                    </Typography>
                                                </Grid>

                                                <Grid container className={classes.container} direction='column'>
                                                    <Typography variant="subtitle2" className={classes.title}>
                                                        Contact
                                                    </Typography>
                                                    <Grid container className={classes.mediaBtn} style={{marginBottom: 10}}>
                                                        {profile.facebook ? (
                                                            <IconButton href={profile.facebook} className={classes.iconBtn}>
                                                                <i
                                                                    style={{color: "#90B494", fontSize: "30px"}}
                                                                    className="fab fa-facebook-square"/>
                                                            </IconButton>
                                                        ) : null}

                                                        {profile.linkedIn ? (
                                                            <IconButton href={profile.linkedIn} className={classes.iconBtn}>
                                                                <i
                                                                    className="fab fa-linkedin"
                                                                    style={{color: "#90B494", fontSize: "30px"}}
                                                                />
                                                            </IconButton>
                                                        ) : null}
                                                    </Grid>
                                                </Grid>

                                                {profile.type === 'investor' ? (
                                                    profile.verified === true ? (
                                                        <Grid container className={classes.avatarContainer}>
                                                            <CheckCircleIcon style={{color: '#90B494', fontSize: 30}}/>
                                                        </Grid>
                                                    ) : null
                                                ) : null}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Grid container className={classes.avatarContainer}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <UserTemplateProfile user={profile}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                                            
                    </Grid>)}
                </Grid>
                </Grid>
                        </Grid>
                        <Grid item lg={3} xs={12} sm={12} md={12}>
                        <Contact id='mydiv' handleClose={this.handleClose} profileReceiver = {this.state.profileReceiver}/>
                        </Grid>
                        </Grid>
                    ) : (
                        <Grid container  spacing={3}>
                        <Grid item lg={12}>
                        <Grid container className={classes.containerWrapper} >
                    <Grid container spacing={3}>
                        <Grid container className={classes.avatarContainer} style={{marginBottom: 30}} direction='column'>
                            <Typography variant='h6' className={classes.header} style={{textAlign: 'center'}}>
                                Portfolio
                            </Typography>
                            {profile.type === 'investor' ? (
                                <Typography variant='subtitle2' className={classes.email}>
                                    * Note that your profile can only be publicized after being verified by the admin
                                </Typography>
                            ) : (
                                null
                            )}
                        </Grid>

                        {fetching ? (
                            <Grid container className={classes.progressContainer}>
                                <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                            </Grid>
                        ) : (
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={4}>
                                <Grid container direction='column' spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card className={classes.card}>
                                            <CardContent style={{padding: "30px 30px"}}>
                                                <Grid container className={classes.avatarContainer} direction='column'>
                                                    <img
                                                        src={profile.image ? profile.image : defaultUser}
                                                        className={classes.avatar}
                                                        alt="User's Avatar"
                                                    />
                                                </Grid>
                                                <Grid container className={classes.infoContainer} direction='column'>
                                                    <Typography className={classes.username} variant='h6'>
                                                        {profile.username ? profile.username : profile.email}
                                                    </Typography>
                                                    <Grid container justify='center'>
                                                        <Button className={classes.button}
                                                        onClick={
                                                            (id) => this.handleOpen(profile.id)}
                                                        >
                                                            Send message</Button>
                                                    </Grid>

                                                </Grid>

                                                <Divider variant='middle'/>

                                                <Grid container className={classes.container} direction='column'>
                                                    <Typography variant="subtitle2" className={classes.title}>
                                                        Email
                                                    </Typography>
                                                    <Typography variant="subtitle2" className={classes.email}>
                                                        {profile.email}
                                                    </Typography>
                                                </Grid>

                                                <Grid container className={classes.container} direction='column'>
                                                    <Typography variant="subtitle2" className={classes.title}>
                                                        Contact
                                                    </Typography>
                                                    <Grid container className={classes.mediaBtn} style={{marginBottom: 10}}>
                                                        {profile.facebook ? (
                                                            <IconButton href={profile.facebook} className={classes.iconBtn}>
                                                                <i
                                                                    style={{color: "#90B494", fontSize: "30px"}}
                                                                    className="fab fa-facebook-square"/>
                                                            </IconButton>
                                                        ) : null}

                                                        {profile.linkedIn ? (
                                                            <IconButton href={profile.linkedIn} className={classes.iconBtn}>
                                                                <i
                                                                    className="fab fa-linkedin"
                                                                    style={{color: "#90B494", fontSize: "30px"}}
                                                                />
                                                            </IconButton>
                                                        ) : null}
                                                    </Grid>
                                                </Grid>

                                                {profile.type === 'investor' ? (
                                                    profile.verified === true ? (
                                                        <Grid container className={classes.avatarContainer}>
                                                            <CheckCircleIcon style={{color: '#90B494', fontSize: 30}}/>
                                                        </Grid>
                                                    ) : null
                                                ) : null}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Grid container className={classes.avatarContainer}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <UserTemplateProfile user={profile}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                                            
                    </Grid>)}
                </Grid>
                </Grid>
                        </Grid>
                        <Grid item lg={false}>
                            <Contact id='mydiv' handleClose={this.handleClose}/>
                        </Grid>
                        </Grid>
                    )}
                    

                
                
                <Footer/>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    getChosenProfile: (id) => dispatch(getChosenProfile(id)),
    getProfile: (id, type) => dispatch(getProfile(id, type))
});

const mapStateToProps = state => ({
    profile: state.usersReducer.profile,
    fetching: state.usersReducer.fetching,
    profileReceiver: state.usersReducer.profileReceiver
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileDetail));
