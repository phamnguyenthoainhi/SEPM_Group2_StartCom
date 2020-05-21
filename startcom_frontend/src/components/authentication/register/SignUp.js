import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './signUpStyle';
import {registerAccount} from '../../../actions/anonymoususers/AnonymoususersActions';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputAdornment from "@material-ui/core/InputAdornment";
import DoneIcon from '@material-ui/icons/Done';
import Typography from "@material-ui/core/Typography";

const ColorCircularProgress = withStyles({
    root: {
      color: '#3C5155'
      
    },
  })(CircularProgress);

const CustomRadio = withStyles({
    root: {
      color: '#3C5155',
      '&$checked': {
        color: '#E3CFB5',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  




class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: "",
            signUpPassword: "",
            signUpConfirmPassword: "",
            type: 'startupowner',
            loading: '',
            success: false,

            formSignUpErrors: {
                emailError: "",
                passwordError: "",
                confirmPassError: ""
            },
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.registerLoading !== prevProps.registerLoading) {
            this.setState({
                loading: this.props.registerLoading
            })
        }
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
            } else if (this.props.registerMessage.code === "auth/invalid-email") {
                
                this.setState({
                    formSignUpErrors: {
                        emailError: this.props.registerMessage.message,
                        passwordError: '',
                        confirmPassError: ""
                    },
                })
            }
            else if (this.props.registerMessage.code === undefined) {
                console.log('success')
                this.setState({
                    signUpEmail: "",
                    signUpPassword: "",
                    signUpConfirmPassword: "",
                    type: '',
                    success: true,
                    loading: false
                })
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
            };
            this.props.registerAccount(user);
        }
    };


    render() {
        const {classes} = this.props;

        return (
            <div className="form-container sign-up-container">
                <form className={classes.form}>
                    <Typography className={classes.title} variant='h4' style ={{color: '#3C5155', marginBottom: 20}}>Create your account</Typography>
                    <TextField
                        variant='outlined'
                        type="email"
                        name="signUpEmail"
                        placeholder="Email"
                        className={classes.textField}
                        helperText={this.state.formSignUpErrors.emailError}
                        error={!!this.state.formSignUpErrors.emailError}
                        id="signUpEmail"
                        onChange={this.handleChange}
                        value={this.state.signUpEmail}
                        InputLabelProps={{className: classes.input}}
                        InputProps={{
                            className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon style={{color: '#3C5155'}}/>
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        variant='outlined'
                        type="password"
                        name="signUpPassword"
                        placeholder="Password"
                        className={classes.textField}
                        helperText={this.state.formSignUpErrors.passwordError}
                        error={!!this.state.formSignUpErrors.passwordError}
                        id="signUpPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpPassword}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={{
                            className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon style={{color: '#3C5155'}}/>
                                </InputAdornment>
                            ),
                        }}
                
                    >
                    </TextField>
                    <TextField
                        variant='outlined'
                        type="password"
                        name="signUpConfirmPassword"
                        placeholder="Confirm Password"
                        className={classes.textField}
                        helperText={this.state.formSignUpErrors.confirmPassError}
                        error={!!this.state.formSignUpErrors.confirmPassError}
                        id="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.signUpConfirmPassword}
                        fullWidth
                        InputLabelProps={{className: classes.input}}
                        InputProps={{
                            className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpenIcon style={{color: '#3C5155'}}/>
                                </InputAdornment>
                            ),
                        }}
                       
                    >
                    </TextField>
                    <FormControl component="fieldset">
                            <RadioGroup row aria-label="type" name="type" value={this.state.type} onChange={this.handleChange} required>
                                <FormControlLabel  value="startupowner" control={<CustomRadio />}  label={<Typography className={classes.formControlLabel}>Startup Owner</Typography>}/>
                                <FormControlLabel value="investor" control={<CustomRadio />}  label={<Typography className={classes.formControlLabel}>Investor</Typography>} />
                                <FormControlLabel value="consultant" control={<CustomRadio />}  label={<Typography className={classes.formControlLabel}>Consultant</Typography>} />
                            </RadioGroup>
                </FormControl>

                    {
                    this.state.loading === true ? (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                    :
                    
                    ((this.state.success === false && (this.state.loading === '' || this.state.loading === false)) ? 
                    (<Button
                            variant="contained"
                           onClick={this.signUpWithEmail}
                           className={classes.registerBtn}

                        > Register </Button>)
                    : 
                    
                    (<Button
                            variant="contained"
                           
                           className={classes.successBtn}
                            startIcon={<DoneIcon />}
    
                        > Registered</Button>))
                    }
                </form>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    registerMessage: state.usersReducer.registerMessage,
    registerLoading: state.usersReducer.registerLoading
});

const mapDispatchToProps = dispatch => ({
    registerAccount : (user) => dispatch(registerAccount(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
