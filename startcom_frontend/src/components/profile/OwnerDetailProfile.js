import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {getBIByOwnerID} from "../../actions/businessideas/BIActions";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import defaultUser from '../../images/default.png';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import BITemplateProfile from "../Layout/template/BITemplateProfile";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Switch from "@material-ui/core/Switch";
import {getChosenProfile, getUser} from "../../actions/users/UserActions";

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

const CustomSwitch = withStyles({
    switchBase: {
        color: '#C75D5D',
        '&$checked': {
            color: '#90B494',
        },
        '&$checked + $track': {
            backgroundColor: '#90B494',
        },
    },
    checked: {},
    track: {},
})(Switch);

class OwnerDetailProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            email: '',
            username: '',
            image: '',
            facebook: '',
            linkedIn: '',
            biography: '',
            openBiography: false
        }
    }


    componentDidMount() {
        const userID = this.props.match.params.id;
        this.props.getChosenProfile(userID);
        this.props.getBIByOwnerID(userID)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.profile !== prevProps.profile) {
        //     if (this.props.profile !== '' && this.props.profile !== undefined && this.props.profile !== null) {
        //         this.setState({
        //             profile: this.props.profile
        //         })
        //     }
        // }
    }

    openBiography = () => {
        this.setState({
            openBiography: !this.state.openBiography
        })
    };

    render() {
        console.log(this.props.profile);
        const { classes, businessIdea, loading, fetching, profile} = this.props;
        const { openBiography } = this.state;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Grid container className={classes.avatarContainer} style={{marginBottom: 10}}>
                                <Typography variant='h6' className={classes.header}>
                                    Portfolio
                                </Typography>
                            </Grid>
                            <Grid container direction='column' spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    {fetching ? (
                                        <Grid container className={classes.progressContainer}>
                                            <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                                        </Grid>
                                    ): (
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

                                                    <FormControlLabel
                                                        value="start"
                                                        control={<CustomSwitch color="primary" checked={openBiography} onChange={this.openBiography} />}
                                                        label={<Typography variant="subtitle2" className={classes.email}> {openBiography ? "Display bio" : "Hidden bio"}</Typography>}
                                                        labelPlacement="top"
                                                    />

                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Grid>

                                <Grow in={openBiography}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card className={classes.card}>
                                            <CardContent style={{padding: "10px 30px"}}>
                                                <Grid container className={classes.container} direction='column'>
                                                    <Typography variant="subtitle2" className={classes.title}>
                                                        Biography
                                                    </Typography>
                                                    <Typography variant="subtitle2" className={classes.email}>
                                                        {profile.biography ? profile.biography : ""}
                                                    </Typography>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grow>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <Grid container className={classes.avatarContainer} style={{marginBottom: 10}}>
                                <Typography variant='h6' className={classes.header}>
                                    Business idea
                                </Typography>
                            </Grid>

                            <Grid container className={classes.avatarContainer}>
                                <Grid item lg={12} md={12} sm={12}>

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

            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    getBIByOwnerID: (ownerID) => dispatch(getBIByOwnerID(ownerID)),
    getChosenProfile: (id) => dispatch(getChosenProfile(id))
});

const mapStateToProps = state => ({
    profile: state.usersReducer.profile,
    fetching: state.usersReducer.fetching,
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OwnerDetailProfile));
