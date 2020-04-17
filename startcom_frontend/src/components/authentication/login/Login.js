import React, {Component} from 'react';

import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import style from './LoginStyle'
//Material UI
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField";
// import CircularProgress from "@material-ui/core/CircularProgress";
//Material UI Icons
// import CheckIcon from "@material-ui/icons/Check";




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",
            errors: {}
        };
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.UI.errors !== state.errors) {
    //         return {
    //             errors: props.UI.errors
    //         }
    //     }
    //     return null;
    // }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    loginWithEmail = (event) => {
        // event.preventDefault();
        // this.props.signInWithEmail({
        //     email: this.state.loginEmail,
        //     password: this.state.loginPassword
        // }, this.props.history);
    };


    render() {
        const {classes} = this.props;
        // const {errors} = this.state;
        return (
            <div className="form-container sign-in-container">
                <form className={classes.form}>
                    <h1 className="title">Login</h1>
                    <TextField type="text"
                               name="loginEmail"
                               placeholder="Email"
                               className={classes.formInput}
                              
                               id="loginEmail"
                               onChange={this.handleChange}
                               value={this.state.loginEmail}
                               InputLabelProps={{className: classes.input}}
                               InputProps={
                                   {
                                       disableUnderline: true,
                                       className: classes.input
                                   }}
                    />
                    <TextField
                        type="password"
                        name="loginPassword"
                        placeholder="Password"
                        className={classes.formInput}
                        
                        id="loginPassword"
                        onChange={this.handleChange}
                        value={this.state.loginPassword}
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {
                                disableUnderline: true,
                                className: classes.input
                            }}
                    />
                    {/*<Typography variant="body2" className={classes.customError}>{errors.general}</Typography>*/}
                    {/*{loading ? (*/}
                    {/*    <CircularProgress variant="indeterminate" size={32} className={classes.progress}/>*/}
                    {/*) : doneSignIn ? (<CheckIcon fontSize="large" className={classes.tick} />) : (<Button*/}
                    {/*    variant="contained"*/}
                    {/*    onClick={this.loginWithEmail}*/}
                    {/*    className={doneSignIn ? classes.successBtn : classes.registerBtn}*/}
                    {/*    disabled={loading}*/}
                    {/*> Đăng Nhập </Button>)}*/}
                <Button
                  variant="contained"
                        onClick={this.loginWithEmail}
                        className={classes.registerBtn}
                        // disabled={loading}
                    > Log In </Button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    // UI: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    // signInWithEmail: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login));