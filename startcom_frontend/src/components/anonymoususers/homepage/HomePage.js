import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './StyleHomePage';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import Hidden from "@material-ui/core/Hidden";
import {getUser} from '../../../actions/users/UserActions'




class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== "" && sessionStorage.getItem("token") !== undefined
            && sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") !== "" && sessionStorage.getItem("id") !== undefined
        ) {
            this.props.getUser(sessionStorage.getItem("id"))
        }

    }
    joinUs = () => {
        this.props.history.push('/auth')
    };

    toRegisterBI = () => {
        this.props.history.push('/registerBI')
    };
    toProfile = () => {
        this.props.history.push('/profile')
    };

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({
                user: this.props.user
            })
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Navbar/>
                <Grid container spacing={0} style={{}}>
                    <Grid item xs={12} sm={12} md={6} className={classes.leftColumn}>

                        <Box fontWeight="fontWeightLight" m={1} className={classes.welcomeTitle} >
                            Welcome !
                        </Box>
                        <Box fontWeight="fontWeightLight" m={1}>
                            Established in 2020 with a simple idea from origin and has been growing into an incredible opportunity for startup community.
                            Out goal is to develop a community platform that can connect startup owners, investors and consultants together.
                        </Box>

                        {
                            (sessionStorage.getItem('token') !== '' && sessionStorage.getItem('token') !== null) ?
                                (sessionStorage.getItem("type") === "startupowner" ?

                                        (this.state.user.haveBI === true ?
                                                <Button variant="contained" className={classes.joinButton} onClick = {() => this.toProfile()}>My Profile</Button>
                                                :
                                                <Button variant="contained" className={classes.joinButton} onClick = {() => this.toRegisterBI()}>Register Business Idea</Button>
                                        )
                                        :
                                        null
                                )
                                :
                                <Button variant="contained" className={classes.joinButton} onClick = {() => this.joinUs()}>Join Us</Button>
                        }

                    </Grid>
                    <Hidden only={['sm', 'xs']}>
                        <Grid item xs={6} md={6} className={classes.rightColumn}>
                            <CardMedia className={classes.media} image={require("../../../images/community.svg")}/>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} className={classes.row}>
                        <Grid container alignItems='center'>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={12} xs={12}>
                                <img src={require("../../../images/logo.png")} className={classes.avatar} alt="App's Symbol"/>
                            </Grid>

                            <Grid item md={7}>
                                <Box fontWeight="fontWeightLight" m={1} className={classes.rowTitle}>
                                    Make a True Impact
                                </Box>
                                <Box fontWeight="fontWeightLight" m={1} color='#E3CFB5' className={classes.rowSubTitle}>
                                    StartCom is focused on bringing about chances. We’ve built and fueled our vision with time, resources, and passion, but we need your help to strengthen its connection.
                                </Box>
                            </Grid>
                            <Grid item md={1}/>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} className={classes.below}>
                        <Grid container>
                            <Grid item md={4} sm={12} xs={12}>
                                <Box>
                                    <img src={require("../../../images/community.png")} alt="Community" />
                                </Box>
                                <Box fontWeight="fontWeightLight" m={1} className={classes.belowTitle}>
                                    Expanding business connection
                                </Box>

                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <Box>
                                    <img src={require("../../../images/idea.png")} alt="Idea"/>
                                </Box>
                                <Box fontWeight="fontWeightLight" m={1} className={classes.belowTitle}>
                                    Publicize your idea for potential investors
                                </Box>
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <Box>
                                    <img src={require("../../../images/funding.png")} alt="Funding" />
                                </Box>
                                <Box fontWeight="fontWeightLight" m={1} className={classes.belowTitle}>
                                    Raising capital with ease
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Footer />
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.usersReducer.user,

});

const mapDispatchToProps = dispatch => ({
    getUser: (id) => dispatch(getUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(HomePage));
