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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../Layout/Navbar';
import Box from '@material-ui/core/Box';

import MenuItem from '@material-ui/core/MenuItem';



import Grid from '@material-ui/core/Grid';

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
            date:' ',
            description: '',
            targetFunding: 0,
            needInvestor: false,
            needConsultant: false,
            open: false,
            setOpen: false,
            image:'',
            chosenFile: '',
            category: '',
            terms: false,
            loading: false

        };
        this.onChange = this.onChange.bind(this);
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
        // console.log(event.target.files[0].name);
        this.setState({
            image: event.target.files[0],
            chosenFile: 'Uploaded file: '+ event.target.files[0].name
        })
        
    }

    onChange(e) {
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
        
    }

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

     handleRegisterBI = (encodedImage) => {
         
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
            // console.log(JSON.stringify(businessIdea))
            this.props.registerBI(businessIdea);
         } else {
             this.setState({
                 ownerError: "There are some errors happened. Please login and try again!"
             })
         }
     };

    onSubmit(e) {
        e.preventDefault();

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
                    // console.log(JSON.stringify(businessIdea))
                    this.props.registerBI(businessIdea);
                 } else {
                     this.setState({
                         ownerError: "There are some errors happened. Please login and try again!"
                     })
                 }

            }
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container>
                <Navbar/>
                <Grid item md={2}/>
                <Grid item md={8} className={classes.formContainer} >
                <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                        <label className={classes.title}> Register Your Business Idea </label>
                            <div className={classes.content}>
                            <TextField
                                onChange={this.onChange} 
                                value = {this.state.name} 
                                name = 'name'  
                                fullWidth
                                label="Business Idea Name"
                                required className ={classes.input}
                                
                            />

                            <TextField
                                onChange={this.onChange} 
                                value = {this.state.date} 
                                name = 'date'  
                                fullWidth
                                label="Date of Establishment"
                                className ={classes.input}
                                type = 'date'
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField label="Description of Business Idea"
                                onChange={this.onChange} 
                                value = {this.state.description} 
                                name = 'description'  
                                fullWidth
                                required
                                className ={classes.input}
                            />
                            <TextField label="Target Funding $"
                                onChange={this.onChange} 
                                value = {this.state.targetFunding} 
                                name = 'targetFunding'  
                                fullWidth
                                className ={classes.input}
                                type='number'
                            />
                            <div className={classes.floatitem}>
                            <Typography className={classes.chosenfile}>{this.state.chosenFile}</Typography>
                            <br/>
                                <Button color="default"  className={classes.buttonfile} 
                                label='My Label'startIcon={<CloudUploadIcon />}  >
                                    <input type="file" accept="image/*" id='file' style={{display:'none'}} name='image'  onChange={this.chooseFile}/>
                                    <label htmlFor='file' >
                                    
                                            Upload Business Idea Image
                                    </label>
                                </Button>
                                
                            

                            </div>
                           
                            
                            <Grid container spacing={0}>
                                <Grid item xs={6} className={classes.leftcolumn}>
                                
                                    <Box className={classes.radiogroup}>
                                      
                                        <FormControlLabel control={<CustomCheckbox checked={this.state.needInvestor} onChange={this.onChange} name="needInvestor" />}
                                        label="Looking for an consultant" className={classes.checkbox} />
                                        <br/>
                                        <FormControlLabel control={<CustomCheckbox checked={this.state.needConsultant} onChange={this.onChange} name="needConsultant" />}
                                        label="Looking for an consultant" className={classes.checkbox}/>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} className={classes.rightcolumn}>
                               
                                <FormControl className={classes.formControl}>
                                   
                                    <TextField type ='text' id="select" label ='Choose your business category' value ={this.state.category} select className ={classes.input} onChange={this.onChange} name ='category'>
                                    <MenuItem value = 'Technology' >Techology</MenuItem>
                                        <MenuItem value = 'Art' >Art</MenuItem>
                                        <MenuItem value = 'Community'>Community</MenuItem>
                                        <MenuItem value = 'Food & Beverage'>Food & Beverage</MenuItem>
                                        <MenuItem value = 'Education'>Education</MenuItem>
                                        <MenuItem value = 'Medical'>Medical</MenuItem>
                                        <MenuItem value = 'Transportation'>Transportation</MenuItem>
                                    </TextField>
                                        

                                    
                                </FormControl>
                                
                                </Grid>
                                <Grid item xs={12} >
                                    <FormControl component="fieldset" className={classes.floatitem}>
                                    <FormControlLabel control={<CustomCheckbox checked={this.state.terms} onChange={this.onChange} name="terms" required/>}
                                        label="I agree that all information about my business idea is published" className={classes.terms} />
                                                
                                    </FormControl>
                                </Grid>
                            </Grid>

                           
                           {this.state.loading ? (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                           :
                           <div>
                            <Button variant="contained" type='submit' className={classes.button}>Submit</Button>

                           </div>}
                           
                            <Dialog 
                            className={classes.dialog}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                > 
                                <DialogContent>
                                    <Typography gutterBottom className={classes.text}>
                                    Congratulations, your business idea has been registered successfully!
                                    </Typography>
                                </DialogContent>
    
                            </Dialog>   
                            </div> 
                    </form>
                </Grid>
                <Grid item md={2}/>
                <Footer/>
            </Grid>
            
                
                    
            
        )
    }
}

const mapDispatchToProps = dispatch => ({
      registerBI: (businessIdea) => dispatch(registerBI(businessIdea)),
      resetRegisterStatus: () => dispatch(resetRegisterStatus())
});

const mapStateToProps = state => ({
    isRegisteredSuccess: state.BIReducer.isRegisteredSuccess,
    isRegisteredLoading: state.BIReducer.isRegisteredLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegisterBI));
