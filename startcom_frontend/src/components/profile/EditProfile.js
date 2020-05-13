import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from "react-router-dom";
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

import CircularProgress from "@material-ui/core/CircularProgress";
import defaultLogo from "../../images/company_logo.png";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from "@material-ui/lab/Alert";
import {getUser, editProfile} from "../../actions/users/UserActions";


const styles = (theme) => ({
    containerWrapper: {
        padding: "50px 300px",
        [theme.breakpoints.down('md')]: {
            padding: "50px 200px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "50px 150px",
        },
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.primary3,
        [theme.breakpoints.down('sm')]: {
            fontSize: 22
        },
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
           fontSize: 14
        },
    },

    ideaContainer: {
        padding: "15px 0"
    },
    button: {
        fontSize: 15,
        padding: 10,
        margin: "0 15px",
        outline: "none",
        textDecoration: "none",
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        transition: "all 350ms ease-in-out",
        fontWeight: 600,
        "&:hover": {
            color: theme.color.primary2,
            backgroundColor: theme.color.contrast,
        },

    },
    btnContainer: {
        marginTop: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    avatar: {
        borderRadius: '50%',
        objectFit: 'cover',
        width: 200,
        height: 200
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
    },

    textField: {
        // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        //     borderColor: theme.color.primary1
        // },
        // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        //     borderColor: theme.color.primary2
        // },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.color.primary1
        }
    },

    input: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    changeImgBtn: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.secondary,
        margin: "0 10px",
        [theme.breakpoints.down('sm')]: {
            fontSize: 10
        },
    },
    removeImgBtn: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: '#C75D5D',
        margin: "0 10px",
        [theme.breakpoints.down('sm')]: {
            fontSize: 10
        },
    },
    progressContainer: {
        padding: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    buttonFile: {
        border: '1px dashed black',
        transition: "all 350ms ease-in-out",
        color: theme.color.primary3,
        textTransform: 'inherit',
        '&:hover':{
            backgroundColor: theme.color.primary2,
            color: theme.color.primary1,

        }
    },
    completeBtn: {
        backgroundColor: theme.color.secondary,
        color: theme.color.primary1,
        textTransform: 'inherit',
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
    },

    label: {
        margin: 0,
        fontSize: 16,
        fontFamily: theme.font2,
        fontWeight: 400,
    }



});


const CustomCheckbox = withStyles({
    root: {
        color: '#718F94',
        '&$checked': {
            color: '#E3CFB5',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            image:'',
            facebook: '',
            linkedIn: '',
            email: '',

            uploadImageComplete: false,
            chosenFile: '',
            errors: {}

        }
    }

    componentDidMount() {
        // const userID = this.props.match.params.id;
        // this.props.getUser(userID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user !== prevProps.user) {
            if (this.props.user.image !== null && this.props.user.image !== undefined && this.props.user.image !== '' ) {
                this.setState({
                    image: this.props.user.image
                })
            }
            if (this.props.user.username !== null && this.props.user.username !== undefined && this.props.user.username !== '' ) {
                this.setState({
                    username: this.props.user.username
                })
            }
            if (this.props.user.facebook !== null && this.props.user.facebook !== undefined && this.props.user.facebook !== '' ) {
                this.setState({
                    facebook: this.props.user.facebook
                })
            }
            if (this.props.user.linkedIn !== null && this.props.user.linkedIn !== undefined && this.props.user.linkedIn !== '' ) {
                this.setState({
                    linkedIn: this.props.user.linkedIn
                })
            }
            this.setState({
                email: this.props.user.email
            })
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    removeImage = () => {
        this.setState({
            image: ''
        })
    };

    chooseFile = event => {
        console.log(event.target.files[0].name);
        this.setState({
            chosenFile: event.target.files[0],
            uploadImageComplete: true
        });
        console.log(this.state.chosenFile)
    };

    getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let base64result = reader.result.split(',')[1];
            callback(base64result)
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    handleUpdateProfile = (encodedImage) => {
        const userID = this.props.match.params.id;
        const user = {
            username: this.state.username,
            image: encodedImage,
            email: this.state.email,
            facebook: this.state.facebook,
            linkedIn: this.state.linkedIn
        };
        if (this.validateBeforeSubmit(user)) {
            this.props.editProfile(user,userID);
            console.log(this.state);
            this.resetStates()
        }

    };

    submit = () => {
        const userID = this.props.match.params.id;
        if (!(this.state.chosenFile === '' || this.state.chosenFile === null || this.state.chosenFile === undefined) &&
        (this.state.image === '' || this.state.image === null || this.state.image === undefined)){
            this.getBase64(this.state.chosenFile, this.handleUpdateProfile)
        }
        if( !(this.state.image === '' || this.state.image === null || this.state.image === undefined)) {
            const user = {
                image: this.state.image,
                username: this.state.username,
                email: this.state.email,
                facebook: this.state.facebook,
                linkedIn: this.state.linkedIn,
            };
            if (this.validateBeforeSubmit(user)) {
                this.props.editProfile(user,userID);
                console.log(this.state);
                this.resetStates()
            }
        }

        else {
            const user = {
                image: '',
                username: this.state.username,
                email: this.state.email,
                facebook: this.state.facebook,
                linkedIn: this.state.linkedIn,
            };

            if (this.validateBeforeSubmit(user)) {
                this.props.editProfile(user,userID);
                console.log(this.state);
                this.resetStates()
            }
        }

    };

    resetStates = () => {
        this.setState({
            chosenFile: '',
            uploadImageComplete: false
        })
    };


    validateBeforeSubmit = (data) => {
        const errors = {};
        let regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
        if (data.username === "") errors.username = "Cannot be empty";

        if(!(data.facebook === "")) {
            if (!data.facebook.match(regex)) {
                errors.facebook = "Incorrect URL format"
            }
        }

        if(!(data.linkedIn === "")) {
            if (!data.linkedIn.match(regex)) {
                errors.linkedIn = "Incorrect URL format"
            }
        }

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };


    render() {
        // console.log(this.props.businessIdea);
        const { classes, doneUpdateProfile, updating, userLoading } = this.props;
        const { errors, uploadImageComplete } = this.state;
        return (
            <Grid container>
                <Navbar/>

                <Grid container className={classes.containerWrapper}>
                    <Grid container className={classes.contentContainer}>
                        <Grid container className={classes.container} style={{marginBottom: 50}}>
                            <Typography variant='h5' className={classes.text}>Edit Your Profile</Typography>
                        </Grid>

                        {userLoading ? (
                            <Grid container className={classes.progressContainer}>
                                <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                            </Grid>
                        ): (
                            <Grid container>
                                <Grid container className={classes.ideaContainer} direction='row'>
                                    <Grid item md={4} sm={4} xs={4} lg={4}>
                                        <Typography className={classes.header} >
                                            Avatar:
                                        </Typography>
                                    </Grid>

                                    <Grid item md={8} sm={8}>
                                        {this.state.image ? (
                                            <Grid container>
                                                <img src={this.state.image} alt="Profile" className={classes.avatar}/>
                                                <Grid container
                                                      // className={classes.container}
                                                >
                                                    <Button
                                                        startIcon={<DeleteIcon />}
                                                        className={classes.removeImgBtn}
                                                        onClick={this.removeImage}
                                                    >Remove image</Button>
                                                </Grid>

                                            </Grid>

                                        ) :  !uploadImageComplete ? (
                                            <Button
                                                variant='outlined'
                                                className={classes.buttonFile}
                                                startIcon={<ImageIcon />}  >
                                                <input type="file" accept="image/*" id='file' style={{display:'none'}} name='image'  onChange={this.chooseFile}/>
                                                <label htmlFor='file' className={classes.label} >
                                                    Upload image
                                                </label>
                                            </Button>

                                        ) : (
                                            <Button
                                                disabled
                                                className={classes.completeBtn}
                                                endIcon={<CheckIcon/>}
                                            >
                                                Upload Completed
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid container className={classes.ideaContainer} direction='row'>
                                    <Grid item md={4} sm={4} xs={4} lg={4}>
                                        <Typography className={classes.header} >
                                            Username:
                                        </Typography>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={6}>
                                        <TextField
                                            size="small"
                                            className={classes.textField}
                                            name='username'
                                            type="text"
                                            required
                                            value={this.state.username}
                                            onChange={this.onChange}
                                            variant='outlined'
                                            fullWidth
                                            helperText={errors.username}
                                            error={!!errors.username}
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid container className={classes.ideaContainer} direction='row'>
                                    <Grid item md={4} sm={4} xs={4} lg={4}>
                                        <Typography className={classes.header} >
                                            Email
                                        </Typography>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={6}>
                                        <TextField
                                            disabled
                                            size="small"
                                            className={classes.textField}
                                            name='email'
                                            required
                                            type="text"
                                            value={this.state.email}
                                            variant='outlined'
                                            fullWidth
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid container className={classes.ideaContainer} direction='row'>
                                    <Grid item md={4} sm={4} xs={4} lg={4}>
                                        <Typography className={classes.header} >
                                            Facebook:
                                        </Typography>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={6}>
                                        <TextField
                                            size="small"
                                            className={classes.textField}
                                            name='facebook'
                                            type="text"
                                            required
                                            value={this.state.facebook}
                                            onChange={this.onChange}
                                            variant='outlined'
                                            fullWidth
                                            helperText={errors.facebook}
                                            error={!!errors.facebook}
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid container className={classes.ideaContainer} direction='row'>
                                    <Grid item md={4} sm={4} xs={4} lg={4}>
                                        <Typography className={classes.header} >
                                            Linkedin:
                                        </Typography>
                                    </Grid>

                                    <Grid item md={6} sm={6} xs={6}>
                                        <TextField
                                            size="small"
                                            className={classes.textField}
                                            name='linkedIn'
                                            type="text"
                                            required
                                            value={this.state.linkedIn}
                                            onChange={this.onChange}
                                            variant='outlined'
                                            fullWidth
                                            helperText={errors.linkedIn}
                                            error={!!errors.linkedIn}
                                            InputLabelProps={{className: classes.input}}
                                            InputProps={{className: classes.input}}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid container className={classes.btnContainer}>
                                    { updating ? (
                                        <Backdrop className={classes.backdrop} open={updating}>
                                            <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                                        </Backdrop>
                                    ) : (
                                        <Button className={classes.button} onClick={this.submit}>Save Changes</Button>
                                    )}

                                    <Button className={classes.button} component={Link} to="/profile">Back to Profile</Button>
                                </Grid>
                        </Grid>
                        )}
                    </Grid>

                </Grid>
                <Footer/>

                <Snackbar open={doneUpdateProfile} autoHideDuration={5000} style={{backgroundColor: '#90B494'}}>
                    <Alert severity="success" className={classes.input}>
                        Successfully update profile !
                    </Alert>
                </Snackbar>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    editProfile: (user,id) => dispatch(editProfile(user,id)),
    getUser: (id) => dispatch(getUser(id))

});

const mapStateToProps = state => ({
    user: state.usersReducer.user,
    updating: state.UI.updating,
    doneUpdateProfile: state.UI.doneUpdateProfile,
    userLoading: state.usersReducer.userLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
