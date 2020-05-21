import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import SignUp from "./register/SignUp";
import SignIn from "./login/Login";
import './authentication.css';
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert/Alert";

const styles = (theme) => ({
    textField: {
        border: "none",
    },

    registerBtn: {
        fontFamily: "'Montserrat', sans-serif'",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        color: "black",
        fontSize: 13,
        padding: "12px 45px",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "10px 0",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
            border: "1px solid black"
        }
    },
    input: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    title: {
        fontFamily: theme.font2,
        [theme.breakpoints.down('md')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 26
        },
    },
    subTitle: {
        fontFamily: theme.font2,
        padding: 15,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        },
    }

});


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleAnimation() {

        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }


    render() {
        const { classes, openAuthenticationSnackbar} = this.props;
        return (
            <div className="body">
                <div className="container" id="container">
                    <SignUp history={this.props.history}/>
                    <SignIn history={this.props.history}/>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <Typography variant='h4' className={classes.title}>Welcome back</Typography>
                                <Typography paragraph className={classes.subTitle} variant='subtitle2'>
                                    Keep in touch with us by using your private account
                                </Typography>
                                <button className="custom-btn ghost" id="signIn" onClick={() => this.handleAnimation()}>
                                    Login
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <Typography variant='h4' className={classes.title}>Hi !</Typography>
                                <Typography paragraph variant='subtitle2' className={classes.subTitle}>Leave your information and start the journey with us</Typography>
                                <button className="custom-btn ghost" id="signUp" onClick={() => this.handleAnimation()}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Snackbar open={openAuthenticationSnackbar} autoHideDuration={2000}>
                    <Alert severity="warning" className={classes.input}>
                        Validation key expired. Please login again !
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    openAuthenticationSnackbar: state.UI.openAuthenticationSnackbar
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
