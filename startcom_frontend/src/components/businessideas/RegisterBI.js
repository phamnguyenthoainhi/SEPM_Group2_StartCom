import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './style';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {registerBI, resetRegisterStatus } from '../../actions/businessideas/BIActions';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const CustomCheckbox = withStyles({
    root: {
      color: '#718F94',
      '&$checked': {
        color: '#E3CFB5',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

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
            setOpen: false

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.isRegisteredSuccess !== prevProps.isRegisteredSuccess && this.props.isRegisteredSuccess === true) {
            this.handleClickOpen();
            this.props.resetRegisterStatus();
            
            
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
    
  };


    
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
    }

    onSubmit(e) {
        e.preventDefault();
        const businessIdea = {
            name: this.state.name,
            date: this.state.date,
            description: this.state.description,
            targetFunding: this.state.targetFunding,
            needInvestor: this.state.needInvestor,
            needConsultant: this.state.needConsultant
        };
        this.props.registerBI(businessIdea);
        
        
        
    }

    render() {
        const {classes} = this.props;
        console.log(this.props.isRegisteredSuccess);
        return (
            <div className={classes.formContainer}>
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
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />

                            <TextField label="Description of Business Idea"
                                onChange={this.onChange} 
                                value = {this.state.description} 
                                name = 'description'  
                                fullWidth
                                className ={classes.input}
                            />
                            <TextField label="Target Funding"
                                onChange={this.onChange} 
                                value = {this.state.targetFunding} 
                                name = 'targetFunding'  
                                fullWidth
                                className ={classes.input}
                                type='number'
                            />
                            <FormControlLabel control={<CustomCheckbox checked={this.state.needInvestor} onChange={this.onChange} name="needInvestor" />}
                            label="Looking for an investor" className={classes.checkbox} />
                            <FormControlLabel control={<CustomCheckbox checked={this.state.needConsultant} onChange={this.onChange} name="needConsultant" />}
                            label="Looking for an consultant" className={classes.checkbox}/>
                            <br/>
                            <Button variant="contained" type='submit' className={classes.button}>Submit</Button>

                            <Dialog className={classes.dialog}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                > 
                                <DialogContent>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia className={classes.image}
                                            image={require("../../images/Success.png")}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom className={classes.text}>
                                                Congratulations, your business idea has been registered sucessfully!
                                                </Typography>
                                            </CardContent>
                                            
                                        </CardActionArea>
                                    </Card>
                                    
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
