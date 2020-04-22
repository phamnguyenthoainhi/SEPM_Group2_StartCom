import React, {Component} from 'react';

import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import style from './LoginStyle'
//Material UI
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//Material UI Icons
// import CheckIcon from "@material-ui/icons/Check";
import DoneIcon from '@material-ui/icons/Done';
import {login} from '../../../actions/anonymoususers/AnonymoususersActions'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",
            loginFormError: {
                emailError: "",
                passwordError: ""
            },
            loading: false,
            success: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.loginLoading !== prevProps.loginLoading) {
            this.setState({
                loading: this.props.loginLoading
            })
        }
        if (this.props.loginMessage !== prevProps.loginMessage) {
            if (this.props.loginMessage.code === 'auth/user-not-found') {
                this.setState({
                    loginFormError: {
                        emailError: this.props.loginMessage.message,
                        passwordError: ""
                    }
                })
            } else if (this.props.loginMessage.code === 'auth/invalid-email') {
                this.setState({
                    loginFormError: {
                        emailError: this.props.loginMessage.message,
                        passwordError: ""
                    }
                })
            }
            else if (this.props.loginMessage.code === 'auth/wrong-password') {
                this.setState({
                    loginFormError: {
                        emailError: '',
                        passwordError: this.props.loginMessage.message
                    }
                })
            }
            else if (this.props.loginMessage.code === undefined) {
                this.setState({
                    success: true
                })
                window.location.replace("http://localhost:3000/");
            }
        }
    }

   

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    loginWithEmail = (event) => {
        event.preventDefault();
        const account = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }
        this.props.login(account);

    };


    render() {
        const {classes} = this.props;
        
        return (
            <div className="form-container sign-in-container">
                <form className={classes.form}>
                    <h1 className="title" style ={{color: '#3C5155'}}>Login</h1>
                    <TextField type="text"
                               name="loginEmail"
                               placeholder="Email"
                               className={classes.formInput}
                               helperText = {this.state.loginFormError.emailError}
                               id="loginEmail"
                               onChange={this.handleChange}
                               value={this.state.loginEmail}
                               
                    />
                    <TextField
                        type="password"
                        name="loginPassword"
                        placeholder="Password"
                        className={classes.formInput}
                        helperText = {this.state.loginFormError.passwordError}
                        id="loginPassword"
                        onChange={this.handleChange}
                        value={this.state.loginPassword}
                    />

{
                    this.state.loading === true ? (<CircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                    :
                    
                    ((this.state.success === false && (this.state.loading === '' || this.state.loading === false)) ? 
                    (<Button
                        variant="contained"
                              onClick={this.loginWithEmail}
                              className={classes.registerBtn}
                              // disabled={loading}
                    > Login</Button>)
                    :  ''
                    
                   

                    )}    
                
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loginMessage: state.loginMessage.loginMessage,
    loginLoading: state.loginLoading.loginLoading
});

const mapDispatchToProps = dispatch => ({
    login: (account) => dispatch(login(account))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));