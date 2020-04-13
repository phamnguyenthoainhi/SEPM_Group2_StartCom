import React, { Component } from 'react'
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core';
import style from './style';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {registerBI} from '../../actions/businessideas/BIActions';


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
            name: '',
            date:' ',
            description: '',
            needInvestor: false,
            needConsultant: false

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    

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
            needInvestor: this.state.needInvestor,
            needConsultant: this.state.needConsultant
        };
        
        this.props.registerBI(businessIdea);
    }


    
    render() {
        const {classes} = this.props;
        console.log(this.state.needInvestor);
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
                            <FormControlLabel control={<CustomCheckbox checked={this.state.needInvestor} onChange={this.onChange} name="needInvestor" />}
                            label="Looking for an investor" className={classes.checkbox} />
                            <FormControlLabel control={<CustomCheckbox checked={this.state.needConsultant} onChange={this.onChange} name="needConsultant" />}
                            label="Looking for an consultant" className={classes.checkbox}/>
<br/>
                            <Button variant="contained" type='submit' className={classes.button}>Submit</Button>
                                
                               
                            </div> 
                    </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
      registerBusinessIdea: (businessIdea) => dispatch(registerBI(businessIdea))
    }
  }
export default connect(mapDispatchToProps, { registerBI })(withStyles(style)(RegisterBI));
