import React, {Component} from 'react';

import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import style from './LoginStyle'
//Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import {login, postEmailResetPassword} from '../../../actions/anonymoususers/AnonymoususersActions'

const ColorCircularProgress = withStyles({
    root: {
      color: '#3C5155'
      
    },
  })(CircularProgress);
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
            success: false,
            postEmail: '',
            postEmailSuccess: false,
            postEmailLoading: false,
            postEmailFail: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.loginLoading !== prevProps.loginLoading) {
            this.setState({
                loading: this.props.loginLoading
            })
        }
        if (this.props.postEmailLoading !== prevProps.postEmailLoading) {
            console.log(this.props.postEmailLoading)
            this.setState({
                postEmailLoading: this.props.postEmailLoading
            })
        }
        if (this.props.postEmailSuccess !== prevProps.postEmailSuccess) {
            this.setState({
                postEmailSuccess: this.props.postEmailSuccess,
                postEmail: '',
                postEmailLoading: false,
                postEmailFail: false,
            })
        }
        if (this.props.postEmailFail !== prevProps.postEmailFail) {
            console.log(this.props.postEmailFail)
            this.setState({
                postEmailFail: this.props.postEmailFail
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
            else if (this.props.loginMessage.id !== undefined) {
                this.setState({
                    success: true
                });
                console.log(this.props.loginMessage)
                sessionStorage.setItem("id", this.props.loginMessage.id);
                sessionStorage.setItem("token", this.props.loginMessage.token);
                sessionStorage.setItem("type", this.props.loginMessage.type)

                this.props.history.push('/')
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
        };
        this.props.login(account);

    };
    passwordRetrieve = () => {
        document.getElementById('form').style.display= 'none'
        document.getElementById('hidden').style.display = 'block'


    };
    back = () => {
        document.getElementById('form').style.display= 'block'
        document.getElementById('hidden').style.display = 'none'
    };
    sendEmailReset = (e) => {
        e.preventDefault()
        const email = {
            "email" : this.state.postEmail
        };
        this.props.postEmailResetPassword(email)

    }


    render() {
        const {classes} = this.props;
        console.log(this.state.postEmailLoading)
        return (
            <div className="form-container sign-in-container">
                <form className={classes.form}  >
                    <div id ="form">
                    <h1 className="title" style ={{color: '#3C5155'}}>Login</h1>
                    <TextField type="text"
                               name="loginEmail"
                               placeholder="Email"
                               className={classes.formInput}
                               helperText = {this.state.loginFormError.emailError}
                               error = {!!this.state.loginFormError.emailError}
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
                        error = {!!this.state.loginFormError.passwordError}
                        id="loginPassword"
                        onChange={this.handleChange}
                        value={this.state.loginPassword}
                    />
                    <Button onClick= {() => this.passwordRetrieve()} className={classes.passwordbtn}style={{textTransform: 'none'}}>Forgot your password?</Button>
                    <br/>
                    {
                    this.state.loading === true ? (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                    :
                    
                    ((this.state.success === false && (this.state.loading === '' || this.state.loading === false)) ? 
                    (<Button
                        variant="contained"
                              onClick={this.loginWithEmail}
                              className={classes.registerBtn}
                             
                    > Login</Button>)
                    :  ''
                    
                   

                    )}
                    </div>
                    <div id='hidden' style={{display:'none', width: "100%"}}>
                    <div style={{textAlign: "left"}}>
                    <Button onClick= {() => this.back()} className={classes.passwordbtn} style={{textTransform: 'none', marginBottom: "40px"}}>Back to Login</Button>
                    </div>
                    {this.state.postEmailSuccess ? "Email Confirmed! Please check your email":
                    (<div>
                    <h2 className="title" style ={{color: '#3C5155', marginBottom: "20px"}}>Reset Password</h2>
                    <TextField type="text"
                               name="postEmail"
                               placeholder="Enter your email"
                               className={classes.formInput}
                               onChange={this.handleChange}
                               value={this.state.postEmail}
                               required
                               fullWidth
                               helperText= {this.state.postEmailFail}
                    /><br/>
                    {this.state.postEmailLoading ?  (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>) : <Button type='submit' className={classes.registerBtn} onClick={(e)=> this.sendEmailReset(e)}>Submit</Button>}

                    </div>)}


                    </div>

                </form>
                <form id='password' className={classes.hidden} >


                </form>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loginMessage: state.usersReducer.loginMessage,
    loginLoading: state.usersReducer.loginLoading,
    postEmailLoading: state.usersReducer.postEmailLoading,
    postEmailSuccess: state.usersReducer.postEmailSuccess,
    postEmailFail: state.usersReducer.postEmailFail,
});

const mapDispatchToProps = dispatch => ({
    login: (account) => dispatch(login(account)),
    postEmailResetPassword: (email) => dispatch(postEmailResetPassword(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));
