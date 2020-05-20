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
import {CATEGORIES} from "../../utils/categories";
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";

import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from "@material-ui/lab/Alert";


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
    ideaImage: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%'
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
    },

    textField: {
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
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
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

class EditBusinessIdea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            category: '',
            image:'',
            needConsultant: false,
            needInvestor: false,
            targetFunding: 0,

            uploadImageComplete: false,
            chosenFile: '',
            errors: {}

        }
    }

    componentDidMount() {
        const businessID = this.props.match.params.id;
        this.props.getBI(businessID);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.businessIdea !== prevProps.businessIdea) {
            this.setState({
                image: this.props.businessIdea.image,
                name: this.props.businessIdea.name,
                description: this.props.businessIdea.description,
                category: this.props.businessIdea.category,
                needConsultant: this.props.businessIdea.needConsultant,
                needInvestor: this.props.businessIdea.needInvestor,
                targetFunding: this.props.businessIdea.targetFunding
            })
        }
    }

    onChange = (e) => {
        if (e.target.name === 'needInvestor' || e.target.name === 'needConsultant' || e.target.name === 'terms') {
            this.setState({
                [e.target.name] : e.target.checked
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value,
            })
        }
    };

    removeImage = () => {
        this.setState({
            image: ''
        })
    };

    resetStates = () => {
        this.setState({
            chosenFile: '',
            uploadImageComplete: false,
            errors: {}
        })
    };


    chooseFile = event => {
        // console.log(event.target.files[0].name);
        this.setState({
            chosenFile: event.target.files[0],
            uploadImageComplete: true
        });
        // console.log(this.state.chosenFile)
    };

    getBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let base64result = reader.result.split(',')[1];
            callback(base64result)
        };

        reader.onerror = function (error) {
            // console.log('Error: ', error);
        };
    };

    handleUpdateBI = (encodedImage) => {
        const {history} = this.props;
        const businessID = this.props.match.params.id;
        const businessIdea = {
            name: this.state.name,
            date: this.state.date,
            description: this.state.description,
            targetFunding: this.state.targetFunding,
            image: encodedImage,
            needInvestor: this.state.needInvestor,
            needConsultant: this.state.needConsultant,
            category: this.state.category
        };
        if (this.validateBeforeSubmit(businessIdea)) {
            this.props.updateBI(businessIdea,businessID, history);
            // console.log(this.state);
            this.resetStates()
        }

    };

    submit = () => {
        const {history} = this.props;
        const businessID = this.props.match.params.id;
        if (!(this.state.chosenFile === '' || this.state.chosenFile === null || this.state.chosenFile === undefined) &&
            (this.state.image === '' || this.state.image === null || this.state.image === undefined)){
            this.getBase64(this.state.chosenFile, this.handleUpdateBI)
        }
        if( !(this.state.image === '' || this.state.image === null || this.state.image === undefined)) {
            const businessIdea = {
                name: this.state.name,
                date: this.state.date,
                description: this.state.description,
                targetFunding: this.state.targetFunding,
                image: this.state.image,
                needInvestor: this.state.needInvestor,
                needConsultant: this.state.needConsultant,
                category: this.state.category
            };
            if (this.validateBeforeSubmit(businessIdea)) {
                this.props.updateBI(businessIdea,businessID, history);
                // console.log(this.state);
                this.resetStates()
            }

        }

        else {
            const businessIdea = {
                name: this.state.name,
                date: this.state.date,
                description: this.state.description,
                targetFunding: this.state.targetFunding,
                image: '',
                needInvestor: this.state.needInvestor,
                needConsultant: this.state.needConsultant,
                category: this.state.category
            };

            if (this.validateBeforeSubmit(businessIdea)) {
                this.props.updateBI(businessIdea,businessID, history);
                // console.log(this.state);
                this.resetStates()
            }


        }

    };

    validateBeforeSubmit = (data) => {
        const errors = {};
        if (data.name === "") errors.name = "Cannot be empty";
        if (data.description === "") errors.description = "Cannot be empty";
        if (data.targetFunding === "") errors.targetFunding = "Cannot be empty";

        if (Object.keys(errors).length !== 0) {
            this.setState({errors: errors});
            return false
        }
        return true;
    };


    render() {
        const { classes, loading, doneUpdateBI, updating } = this.props;
        const { errors, uploadImageComplete } = this.state;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>
                    <Grid container className={classes.contentContainer}>
                        <Grid container className={classes.container} style={{marginBottom: 50}}>
                            <Typography variant='h5' className={classes.text}>Edit Your Business Idea</Typography>
                        </Grid>

                        {loading ? (
                            <Grid container className={classes.progressContainer}>
                                <CircularProgress variant="indeterminate" size={40} style={{color: '#3C5155'}}/>
                            </Grid>
                        ): (
                            <Grid container>
                                <Grid container className={classes.ideaContainer} direction='row'>
                                    <Grid item md={4} sm={4} xs={4} lg={4}>
                                        <Typography className={classes.header} >
                                            Image:
                                        </Typography>
                                    </Grid>

                                    <Grid item md={8} sm={8}>
                                        {this.state.image ? (
                                            <Grid container justify='center'>
                                                <img src={this.state.image} alt="Profile" className={classes.ideaImage}/>
                                                <Grid container className={classes.container}>
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

                <Snackbar open={doneUpdateBI} autoHideDuration={5000}>
                    <Alert severity="success" className={classes.input}>
                        Successfully update business idea !
                    </Alert>
                </Snackbar>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id, history) => dispatch(updateBI(businessIdea,id, history)),
    deleteBI: (id) => dispatch(deleteBI(id)),
    getBI: (id) => dispatch(getBI(id)),

});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading,
    updating: state.UI.updating,
    doneUpdateBI: state.UI.doneUpdateBI
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditBusinessIdea));
