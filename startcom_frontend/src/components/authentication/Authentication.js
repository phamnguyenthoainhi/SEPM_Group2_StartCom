import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import SignUp from "./register/SignUp";
import SignIn from "./login/Login";
import './authentication.css';
import Snackbar from "@material-ui/core/Snackbar";
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
                                <h1>Welcome back</h1>
                                <p>
                                    Keep in touch with us by using your private account
                                </p>
                                <button className="custom-btn ghost" id="signIn" onClick={() => this.handleAnimation()}>
                                    Login
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hi !</h1>
                                <p>Leave your information and start the journey with us</p>
                                <button className="custom-btn ghost" id="signUp" onClick={() => this.handleAnimation()}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Snackbar open={openAuthenticationSnackbar} autoHideDuration={5000}>
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
