import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import TextField from '@material-ui/core/TextField';
import {CATEGORIES} from "../../utils/categories";
import defaultUser from '../../images/default.png';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import defaultLogo from "../../images/company_logo.png";
import Chip from '@material-ui/core/Chip';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CloudUploadIcon from "@material-ui/core/SvgIcon/SvgIcon";


const styles = (theme) => ({
    containerWrapper: {
        // [theme.breakpoints.down('md')]: {
        //     padding: "50px 250px",
        // },
        // [theme.breakpoints.down('sm')]: {
        //     padding: "50px 150px",
        // },
    },
    headerContainer: {
        padding: "20px 65px",
        backgroundColor: theme.color.secondary
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.primary3
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
    },

    contentContainer: {
        padding: "50px 300px",
    },
    ideaContainer: {
        padding: "15px 0"
    },
    button: {
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        '&:hover':{
            backgroundColor: theme.color.contrast
        },
        clear: 'left',
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
    }

});

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idea: {

            },
            toggleUpdate: false,
            openUpdateForm: false,
            openDeleteDialog: false,
            name:'',
            description:'',
            category: '',
            image:'',
            needConsultant: false,
            needInvestor: false,
            targetFunding: 0

        }
    }



    componentDidMount() {
        const businessID = "V2BTqcwWe3IOgmhEAbd0";
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

    chooseFile = event => {
        console.log(event.target.files[0].name);
        this.setState({
            image: event.target.files[0],
            chosenFile: 'Uploaded file: '+ event.target.files[0].name
        })
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



    submit = () => {
        console.log(`
            Name: ${this.state.name}
            Description: ${this.state.description}
            Category: ${this.state.category}
            Need consultant: ${this.state.needConsultant}
            Need investor: ${this.state.needInvestor}
            Target funding: ${this.state.targetFunding}
        `)
    };


    // toggleUpdateForm = () => {
    //     this.setState({
    //         toggleUpdate: !this.state.toggleUpdate
    //     })
    // };
    //
    // openDeleteDialog = () => {
    //     this.setState({
    //         openDeleteDialog: true
    //     })
    // };
    //
    // closeDeleteDialog = () => {
    //     this.setState({
    //         openDeleteDialog: false
    //     })
    // };
    //
    // delete = (id) => {
    //     this.props.deleteBI(id);
    //     console.log("Delete successfully")
    // };

    render() {
        // console.log(this.props.businessIdea);
        const { classes, user, loading, doneUpdateBI } = this.props;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>
                    <Grid container className={classes.headerContainer}>
                        <Typography className={classes.text}>
                            Edit Profile
                        </Typography>
                    </Grid>

                    <Grid container className={classes.contentContainer}>

                        <Grid container className={classes.ideaContainer} direction='column'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Name:
                                </Typography>
                            </Grid>

                            <Grid item md={8}>
                                <TextField
                                    className={classes.input}
                                    name='name'
                                    type="text"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    fullWidth
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

                            <Grid item md={8}>
                                <TextField
                                    className={classes.input}
                                    name='description'
                                    required
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    fullWidth
                                    multiline
                                    rowsMax={2}
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

                            <Grid item md={8}>
                                <TextField
                                    fullWidth
                                    className={classes.input}
                                    select
                                    type="text"
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    // helperText={errors.city}
                                    // error={!!errors.city}
                                    // InputLabelProps={{className: classes.input}}
                                    // inputProps={{className: classes.input}}
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
                                    Image:
                                </Typography>
                            </Grid>

                            <Grid item md={8}>
                                {this.state.image ? (
                                    <Grid container>
                                        <img src={this.state.image} alt="Profile" className={classes.ideaImage}/>
                                    </Grid>

                                ) : (
                                    <Button color="primary"
                                            label='My Label' startIcon={<CloudUploadIcon />}  >
                                        <input type="file" accept="image/*" id='file' style={{display:'none'}} name='image'  onChange={this.chooseFile}/>
                                        <label htmlFor='file' >
                                            Upload Business Idea Image
                                        </label>
                                    </Button>
                                )}
                            </Grid>
                        </Grid>





                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Status:
                                </Typography>
                            </Grid>

                            <Grid item md={8}>
                                <Grid item>
                                    <FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.needInvestor}
                                                    onChange={this.onChange}
                                                    name="needInvestor"
                                                />
                                            }
                                            label="Need Funding"
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.needConsultant}
                                                    onChange={this.onChange}
                                                    name="needConsultant"
                                                />
                                            }
                                            label="Need Consultancy"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.ideaContainer} direction='row'>
                            <Grid item md={4} sm={4} xs={4} lg={4}>
                                <Typography className={classes.header} >
                                    Funding target:
                                </Typography>
                            </Grid>

                            <Grid item md={8}>
                                <TextField
                                    className={classes.input}
                                    name='targetFunding'
                                    required
                                    type="number"
                                    value={this.state.targetFunding}
                                    onChange={this.onChange}
                                    variant='outlined'
                                    fullWidth
                                >
                                </TextField>
                            </Grid>

                            <Grid container className={classes.btnContainer}>
                                <Button className={classes.button} onClick={this.submit}>Save changes</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Footer/>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
    getBI: (id) => dispatch(getBI(id)),

});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading,
    doneUpdateBI: state.UI.doneUpdateBI
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
