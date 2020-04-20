import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './StyleRegisterBI';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {registerBI, resetRegisterStatus } from '../../../actions/businessideas/BIActions';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../Navbar';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
const CustomCheckbox = withStyles({
    root: {
      color: '#718F94',
      '&$checked': {
        color: '#E3CFB5',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const CustomRadio = withStyles({
    root: {
      color: '#718F94',
      '&$checked': {
        color: '#E3CFB5',
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


class RegisterBI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisteredSuccess: '',
            name: '',
            date:' ',
            description: '',
            targetFunding: '',
            needInvestor: false,
            needConsultant: false,
            open: false,
            setOpen: false,
            image:'',
            chosenfile: '',
            category: ''

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
        this.chooseFile = this.chooseFile.bind(this);
        // this.onChangeSelect = this.onChangeSelect.bind(this); 
        
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.isRegisteredSuccess !== prevProps.isRegisteredSuccess && this.props.isRegisteredSuccess === true) {
            this.handleClickOpen();
            
        }

        else if (this.props.isRegisteredSuccess === false) {
            console.log('false');
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
        })
        
        setTimeout(this.props.resetRegisterStatus(), 5000);
        this.props.history.push('/');
    
    };
    chooseFile = event => {
        console.log(event.target.files[0].name);
        this.setState({
            image: event.target.files[0],
            chosenfile: 'Uploaded file: '+ event.target.files[0].name
        })
        
    }
    // onChangeSelect(e) {
    //     e.preventDefault();
        

        
    //     this.setState({
    //         [e.target.name] : e.target.value,
    //     })
    // }

    
    onChange(e) {
        if (e.target.name === 'needInvestor' || e.target.name === 'needConsultant') {
            this.setState({
                [e.target.name] : e.target.checked

            })
        }  else {
            this.setState({
                [e.target.name] : e.target.value,
            })

        } 
        console.log(this.state.category) 
    }

    getBase64 = (file, callback) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var base64result = reader.result.split(',')[1];
            callback(base64result)
        };
       
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     handleRegisterBI = (encodedimage) => {
         
        const businessIdea = {
            name: this.state.name,
            date: this.state.date,
            description: this.state.description,
            targetFunding: this.state.targetFunding,
            image: encodedimage,
            needInvestor: this.state.needInvestor,
            needConsultant: this.state.needConsultant,
            category: this.state.category
        };
        this.props.registerBI(businessIdea);
        
        

     }

    onSubmit(e) {
        e.preventDefault();
        if (!(this.state.image === '' || this.state.image === null || this.state.image === undefined)) {
            this.getBase64(this.state.image, this.handleRegisterBI)
        } else {
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
           
            this.props.registerBI(businessIdea); 
           
        }
                
    }

  

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formContainer} >
                <Navbar/>
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
                            <Typography className={classes.chosenfile}>{this.state.chosenfile}</Typography>
<br/>
                                <Button color="default"  className={classes.buttonfile} 
                                label='My Label'startIcon={<CloudUploadIcon />}  >
                                    <input type="file" accept="image/*" id='file' style={{display:'none'}} name='image'  onChange={this.chooseFile}/>
                                    <label htmlFor='file' >
                                    
                                            Upload Business Idea Image
                                    </label>
                                </Button>
                                
                            

                            </div>
                           
                            
                            <Grid container spacing={0} className={classes.grid}>
                                <Grid item xs={6}className={classes.leftcolumn}>
                                
                                    <Box className={classes.radiogroup}>
                                        <FormControlLabel control={<CustomCheckbox checked={this.state.needInvestor} onChange={this.onChange} name="needInvestor" />}
                                        label="Looking for an investor" className={classes.checkbox} />
                                        <FormControlLabel control={<CustomCheckbox checked={this.state.needConsultant} onChange={this.onChange} name="needConsultant" />}
                                        label="Looking for an consultant" className={classes.checkbox}/>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} className={classes.rightcolumn}>
                               
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Choose your business category</InputLabel>
                                    <Select
                                    // labelId="demo-controlled-open-select-label"
                                    // id="demo-controlled-open-select"
                                    // open={open}
                                    // onClose={handleClose}
                                    // onOpen={handleOpen}
                                    inputProps={{
                                        name: 'category',
                                        id: 'age-native-simple',
                                      }}
                                    value={this.state.category}
                                    onChange={this.onChange}
                                    >
                                        <MenuItem value = 'technology'>Techology</MenuItem>
                                        <MenuItem value = 'art'>Art</MenuItem>
                                        <MenuItem value = 'community'>Community</MenuItem>
                                        <MenuItem value = 'foodbeverage'>Food & Beverage</MenuItem>
                                        <MenuItem value = 'education'>Education</MenuItem>
                                        <MenuItem value = 'medical'>Medical</MenuItem>
                                        <MenuItem value = 'transportation'>Transportation</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                </Grid>
                            </Grid>
                           
                           <div>
                            <Button variant="contained" type='submit' className={classes.button}>Submit</Button>

                           </div>
                            <Dialog 
                            className={classes.dialog}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                > 
                                <DialogContent>
                                   
                                                <Typography gutterBottom className={classes.text}>
                                                Congratulations, your business idea has been registered sucessfully!
                                                </Typography>
                                           
                                    
                                </DialogContent>
    
                            </Dialog>   
                            </div> 
                    </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
      registerBI: (businessIdea) => dispatch(registerBI(businessIdea)),
      resetRegisterStatus: () => dispatch(resetRegisterStatus())
    
})

const mapStateToProps = state => ({
    isRegisteredSuccess: state.businessIdeas.isRegisteredSuccess,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RegisterBI));
