import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import SignUp from "./register/SignUp";
import SignIn from "./login/Login";
import './authentication.css';

const styles = {
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

};


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // const auth = sessionStorage.getItem("FBIdToken");
        // if (auth) {
        //     window.location.href = "/home";
        // } else {
        //     this.handleAnimation()
        // }
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
            </div>
        );
    }
}

Authentication.propTypes = {
    // UI: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    // signUp: PropTypes.func
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Authentication));
