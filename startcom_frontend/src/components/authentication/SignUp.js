import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
// import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
// import CheckIcon from "@material-ui/icons/Check";
import withStyles from "@material-ui/core/styles/withStyles";
import {registerAccount} from '../../actions/anonymoususers/AnonymoususersActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const styles = {
    textField: {
        border: "none",
    },
    buttonWrapper: {
        outline: "none",
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },
    formInput: {
        width: "80%",
        backgroundColor: "#eee",
        border: "none",
        padding: "12px 15px",
        margin: "5px 0 ",
        outline: "none",
    },
    successBtn: {
        outline: "none",
        fontFamily: "inherit",
        borderRadius: 20,
        color: "black",
        fontSize: 13,
        padding: "10px 30px",
        // letterSpacing: 1,
        textTransform: "uppercase",
        margin: "10px 0",
        backgroundColor: "rgb(99,151,68)",
        "&:focus": {
            outline: "none"
        }
    },
    icon: {
        color: "white"
    },
    registerBtn: {
        fontFamily: "inherit",
        outline: "none",
        borderRadius: 20,
        border: "1px solid #DDDDDD",
        backgroundColor: "white",
        padding: "10px 30px",
        // letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 350mx ease-in-out",
        margin: "10px 0",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            outline: "none"
        },
        "&:focus": {
            outline: "none"
        }
    },
    input: {
        fontFamily: "'Quicksand', sans-serif;",
    }

};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: "",
            signUpPassword: "",
            signUpConfirmPassword: "",
            type: '',

            formSignUpErrors: {
                emailError: "",
                passwordError: "",
                confirmPassError: ""
            },
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.UI.errors !== state.errors) {
    //         return {
    //             errors: props.UI.errors
    //         }
    //     }
    //     return null;
    // }

    componentDidUpdate(prevProps) {
        if (this.props.registerMessage !== prevProps.registerMessage) {
            if (this.props.registerMessage.code === 'auth/email-already-in-use') {
                this.setState({
                    formSignUpErrors: {
                        emailError: this.props.registerMessage.message,
                        passwordError: "",
                        confirmPassError: ""
                    },
                })
            } else if (this.props.registerMessage.code === 'auth/weak-password') {
                this.setState({
                    formSignUpErrors: {
                        emailError: "",
                        passwordError: this.props.registerMessage.message,
                        confirmPassError: ""
                    },
                })
            } else if (this.props.registerMessage.code === undefined) {
                console.log('Success');
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    signUpWithEmail = (event) => {
        event.preventDefault();
        if (this.state.signUpPassword !== this.state.signUpConfirmPassword) {
            this.setState({
                formSignUpErrors: {
                    emailError: "",
                    passwordError: "",
                    confirmPassError: "Password Confirmation does not match Password"
                },
            })
        } else {
            const user = {
                email: this.state.signUpEmail,
                password: this.state.signUpPassword,
                type: this.state.type
            }
            this.props.registerAccount(user);
        }
       
    };

    render() {
        const {classes} = this.props;
        const {errors} = this.state.formSignUpErrors;
        return (
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create your account</h1>
                    <TextField
                        type="email"
                        name="signUpEmail"
                        placeholder="Email"
                        className={classes.formInput}
                        helperText={this.state.formSignUpErrors.emailError}
                        // error={!!errors.email}
                        id="signUpEmail"
                        onChange={this.handleChange}
                        value={this.state.signUpEmail}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {
                                disableUnderline: true,
                                className: classes.input
                            }}
                    >
                    </TextField>
                    <TextField
                        type="password"
                        name="signUpPassword"
                        placeholder="Password"
                        className={classes.formInput}
                        helperText={this.state.formSignUpErrors.passwordError}
                        // error={!!errors.password}
                        id="signUpPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpPassword}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {
                                disableUnderline: true,
                                className: classes.input
                            }}
                    >
                    </TextField>
                    <TextField
                        type="password"
                        name="signUpConfirmPassword"
                        placeholder="Confirm Password"
                        className={classes.formInput}
                        helperText={this.state.formSignUpErrors.confirmPassError}
                        // error={!!errors.confirmPassword}
                        id="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpConfirmPassword}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={
                            {disableUnderline: true, className: classes.input}}
                    >
                    </TextField>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">You want to register as</FormLabel>
                            <RadioGroup row aria-label="type" name="type" value={this.state.type} onChange={this.handleChange}>
                                <FormControlLabel value="startupowner" control={<Radio />} label="Startup Owner" />
                                <FormControlLabel value="investor" control={<Radio />} label="Investor" />
                                <FormControlLabel value="consultant" control={<Radio />} label="Consultant" />
                            </RadioGroup>
                    </FormControl>
                    {/* {
                    loading ? (<CircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                    : doneSignUp ? (<CheckIcon fontSize="large" style={{marginTop: "5%"}}/>) : (<Button
                        variant="contained"
                       onClick={this.signUpWithEmail}
                       className={classes.registerBtn}
                        disabled={loading}
                    > Đăng Kí </Button>)
                    } */}

                    <Button
                        variant="contained"
                       onClick={this.signUpWithEmail}
                       className={classes.registerBtn}
                        // disabled={loading}
                    > Register </Button>
                </form>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    registerMessage: state.registerMessage.registerMessage
});

const mapDispatchToProps = dispatch => ({
    registerAccount : (user) => dispatch(registerAccount(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));