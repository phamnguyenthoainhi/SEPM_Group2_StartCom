import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './StyleRegisterBI';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {registerBI, resetRegisterStatus } from '../../../actions/businessideas/BIActions';
import Footer from "../../Layout/Footer";

import CircularProgress from "@material-ui/core/CircularProgress";

import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../Layout/Navbar';
import CheckIcon from '@material-ui/icons/Check';
import ImageIcon from '@material-ui/icons/Image';

import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {CATEGORIES} from "../../../utils/categories";
import InputAdornment from "@material-ui/core/InputAdornment";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const CustomCheckbox = withStyles({
    root: {
      color: '#718F94',
      '&$checked': {
        color: '#E3CFB5',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const ColorCircularProgress = withStyles({
    root: {
      color: '#3C5155'
      
    },
  })(CircularProgress);

class RegisterBI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisteredSuccess: '',
            name: '',
            date: '',
            description: '',
            targetFunding: '',
            needInvestor: false,
            needConsultant: false,
            open: false,
            setOpen: false,
            image:'',
            category: '',
            terms: false,
            loading: false,
            errors: {},
            uploadImageComplete: false,
            termsError: false

        };
        this.onSubmit = this.onSubmit.bind(this); 
        this.chooseFile = this.chooseFile.bind(this);
        
    }
    
    componentDidUpdate(prevProps) {
        
        if (this.props.isRegisteredLoading !== prevProps.isRegisteredLoading) {
            this.setState({
                loading: this.props.isRegisteredLoading
            })
        }
        if (this.props.isRegisteredSuccess !== prevProps.isRegisteredSuccess && this.props.isRegisteredSuccess === true) {
            this.handleClickOpen();
            
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        });
        
        setTimeout(this.props.resetRegisterStatus(), 5000);
        this.props.history.push('/profile');
    
    };

    chooseFile = event => {
        this.setState({
            image: event.target.files[0],
            uploadImageComplete: true
        })
    };

    onChange = (e) => {
        if (e.target.name === 'needInvestor' || e.target.name === 'needConsultant' || e.target.name === 'terms') {
            this.setState({
                [e.target.name] : e.target.checked
            })
        }
        
        else {
            this.setState({
                [e.target.name] : e.target.value,
            })

        }
    };

    getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64result = reader.result.split(',')[1];
            callback(base64result)
        };
       
        reader.onerror = function (error) {
        console.log('Error: ', error);
        };
     };

    resetStates = () => {
        this.setState({
            uploadImageComplete: false,
            errors: {}
        })
    };

    handleRegisterBI = (encodedImage) => {
        const {history} = this.props;
        if (sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") !== undefined && sessionStorage.getItem("id") !== '') {
            const businessIdea = {
                name: this.state.name,
                date: this.state.date,
                description: this.state.description,
                targetFunding: this.state.targetFunding,
                image: encodedImage,
                needInvestor: this.state.needInvestor,
                needConsultant: this.state.needConsultant,
                category: this.state.category,
                ownerId: sessionStorage.getItem("id")
            };
            if (this.validateBeforeSubmit(businessIdea)) {
                this.props.registerBI(businessIdea, history);
                this.resetStates()
            }
            // console.log(JSON.stringify(businessIdea))

         } else {
             this.setState({
                 ownerError: "There are some errors happened. Please login and try again!"
             })
         }
     };

    onSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;
        if (this.state.terms === true) {
            if (!(this.state.image === '' || this.state.image === null || this.state.image === undefined)) {
                this.getBase64(this.state.image, this.handleRegisterBI)
            } else {
                if (sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") !== undefined && sessionStorage.getItem("id") !== '') {
                    const businessIdea = {
                        name: this.state.name,
                        date: this.state.date,
                        description: this.state.description,
                        targetFunding: this.state.targetFunding,
                        image: '',
                        needInvestor: this.state.needInvestor,
                        needConsultant: this.state.needConsultant,
                        category: this.state.category,
                        ownerId: sessionStorage.getItem("id")
                    };
                    if (this.validateBeforeSubmit(businessIdea)) {
                        this.props.registerBI(businessIdea, history);
                        this.resetStates()
                    }
                 } else {
                     this.setState({
                         ownerError: "There are some errors happened. Please login and try again!"
                     })
                 }

            }
        }
        else {
            this.setState({
                termsError: true
            })
        }
    };

    validateBeforeSubmit = (data) => {
        const errors = {};
        if (data.name === "") errors.name = "Cannot be empty";
        if (data.category === "") errors.category = "Cannot be empty";
        if (data.description === "") errors.description = "Cannot be empty";
        if (data.date === "") errors.date = "Cannot be empty";
        if (data.targetFunding === "") errors.targetFunding = "Cannot be empty";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };



    render() {
        const {classes} = this.props;
        const { errors, uploadImageComplete, termsError } = this.state;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>
                    <Grid container className={classes.container} style={{marginBottom: 50}}>
                        <Typography variant='h5' className={classes.text}>Register Your Business Idea</Typography>
                    </Grid>

                    <Grid container>
                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Image:
                                </Typography>
                            </Grid>

                            <Grid item md={8} sm={8}>
                                { !uploadImageComplete ? (
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
                                    Name:
                                </Typography>
                            </Grid>

                            <Grid item md={6} sm={6} xs={6}>
                                <TextField
                                    size="small"
                                    className={classes.textField}
                                    name='name'
                                    type="text"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    fullWidth
                                    multiline
                                    helperText={errors.name}
                                    error={!!errors.name}
                                    rows={2}
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{className: classes.input}}
                                >
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Description:
                                </Typography>
                            </Grid>

                            <Grid item md={6} sm={6} xs={6}>
                                <TextField
                                    size="small"
                                    className={classes.textField}
                                    name='description'
                                    required
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    multiline
                                    helperText={errors.description}
                                    error={!!errors.description}
                                    rows={4}
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
                                    Category:
                                </Typography>
                            </Grid>

                            <Grid item md={8} sm={8} xs={8}>
                                <TextField
                                    size="small"
                                    className={classes.textField}
                                    select
                                    type="text"
                                    name="category"
                                    value={this.state.category}
                                    helperText={errors.category}
                                    error={!!errors.category}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    InputLabelProps={{className: classes.input}}
                                    inputProps={{className: classes.input}}
                                >
                                    {CATEGORIES.map(option => (
                                        <MenuItem key={option.id} value={option.name}
                                                  className={classes.input}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Status:
                                </Typography>
                            </Grid>

                            <Grid item md={8} sm={8} xs={8}>
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <CustomCheckbox
                                                checked={this.state.needInvestor}
                                                onChange={this.onChange}
                                                name="needInvestor"
                                            />
                                        }
                                        label={<Typography className={classes.input} color="textSecondary">Need Funding</Typography>}

                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <CustomCheckbox
                                                checked={this.state.needConsultant}
                                                onChange={this.onChange}
                                                name="needConsultant"
                                            />
                                        }
                                        label={<Typography className={classes.input} color="textSecondary">Need Consultancy</Typography>}
                                        className={classes.input}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Date:
                                </Typography>
                            </Grid>

                            <Grid item md={4} sm={4} xs={4}>
                                <TextField
                                    variant='outlined'
                                    onChange={this.onChange}
                                    value = {this.state.date}
                                    name = 'date'
                                    fullWidth
                                    label="Date of Establishment"
                                    className ={classes.input}
                                    helperText={errors.date}
                                    error={!!errors.date}
                                    type = 'date'
                                    required
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true,
                                    }}
                                    inputProps={{className: classes.input}}
                                />
                            </Grid>
                        </Grid>

                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Target funding:
                                </Typography>
                            </Grid>

                            <Grid item md={4} sm={4} xs={4}>
                                <TextField
                                    size="small"
                                    className={classes.textField}
                                    name='targetFunding'
                                    required
                                    type="number"
                                    value={this.state.targetFunding}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    fullWidth
                                    helperText={errors.targetFunding}
                                    error={!!errors.targetFunding}
                                    InputLabelProps={{className: classes.input}}
                                    InputProps={{
                                        className: classes.input,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                $
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                </TextField>
                            </Grid>

                        </Grid>

                        <Grid container className={classes.container} justify='center'>
                            <Grid item md={2} sm={2} xs={2} lg={2}/>
                            <Grid item md={8} sm={8} xs={8} lg={8}>
                                <FormControl component="fieldset">
                                    <FormControlLabel
                                        control={
                                            <CustomCheckbox
                                                checked={this.state.terms}
                                                onChange={this.onChange}
                                                name="terms"
                                                required
                                            />}
                                        label={<Typography className={classes.input}>I agree that all information about my business idea is published</Typography>}
                                        />

                                </FormControl>
                            </Grid>
                            <Grid item md={2} sm={2} xs={2} lg={2}/>
                        </Grid>

                        <Grid container className={classes.btnContainer}>
                            { this.state.loading ? (
                                <Backdrop className={classes.backdrop} open={this.state.loading}>
                                    <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                                </Backdrop>
                            ) : (
                                <Button className={classes.button} onClick={this.onSubmit}>Confirm Registration</Button>
                            )}
                        </Grid>

                            <Dialog
                                className={classes.dialog}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogContent>
                                    <Typography gutterBottom variant='subtitle1' className={classes.dialogText}>
                                        Congratulations, your business idea has been registered successfully!
                                    </Typography>
                                </DialogContent>

                            </Dialog>

                    </Grid>
                </Grid>

                <Snackbar open={termsError} autoHideDuration={1000}>
                    <Alert severity="error" className={classes.input}>
                        Please agree to our terms !
                    </Alert>
                </Snackbar>

                <Footer/>
            </Grid>
            
                
                    
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
      registerBI: (businessIdea, history) => dispatch(registerBI(businessIdea, history)),
      resetRegisterStatus: () => dispatch(resetRegisterStatus())
});

const mapStateToProps = state => ({
    isRegisteredSuccess: state.BIReducer.isRegisteredSuccess,
    isRegisteredLoading: state.BIReducer.isRegisteredLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegisterBI));
