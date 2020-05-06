import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
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


// const ColorCircularProgress = withStyles({
//     root: {
//         color: '#3C5155'
//     },
// })(CircularProgress);

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



});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idea: {},
            toggleUpdate: false,
            openUpdateForm: false,
            openDeleteDialog: false
        }
    }


    componentDidMount() {
        const businessID = "V2BTqcwWe3IOgmhEAbd0";
        this.props.getBI(businessID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log(this.props.businessIdea);
        const { classes, user, businessIdea, loading } = this.props;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Card className={classes.card}>
                                <CardContent style={{padding: "40px 50px"}}>
                                    <Grid container className={classes.avatarContainer} direction='column'>
                                        <img
                                            src={defaultUser}
                                            className={classes.avatar}
                                            alt="User's Avatar"
                                        />
                                    </Grid>
                                    <Grid container className={classes.infoContainer} direction='column'>
                                        <Typography className={classes.username} variant='h6'>
                                            Triet Nguyen
                                        </Typography>
                                        <Button className={classes.button}>Edit Profile</Button>
                                    </Grid>

                                    <Divider variant='fullWidth'/>

                                    <Grid container className={classes.container} direction='column'>
                                        <Typography variant="subtitle2" className={classes.title}>
                                            Email
                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.email}>
                                           manhtrietvt@gmail.com
                                        </Typography>
                                    </Grid>

                                    <Grid container className={classes.container} direction='column'>
                                        <Typography variant="subtitle2" className={classes.title}>
                                            Contact
                                        </Typography>
                                        <Grid container className={classes.mediaBtn}>
                                            <IconButton href="#" style={{ backgroundColor: "transparent" }}>
                                                <i
                                                    style={{color: "#90B494", fontSize: "30px"}}
                                                    className="fab fa-facebook-square"/>
                                            </IconButton>

                                            <IconButton href="#" style={{ backgroundColor: "transparent" }}>
                                                <i
                                                    className="fab fa-linkedin"
                                                    style={{color: "#90B494", fontSize: "30px"}}
                                                />
                                            </IconButton>
                                        </Grid>

                                    </Grid>

                                </CardContent>
                            </Card>
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
                                    ): (
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
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
    getBI: (id) => dispatch(getBI(id)),

});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
