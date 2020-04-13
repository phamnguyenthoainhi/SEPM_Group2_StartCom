import React, { Component } from 'react'
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core';
import style from './style';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {registerBI} from '../../actions/businessideas/BIActions';
class RegisterBI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
            ,
            date:' ',
            description: ''

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const businessIdea = {
            name: this.state.name,
            date: this.state.date,
            description: this.state.description
        };
        console.log(businessIdea)
        this.props.registerBI(businessIdea);
    }


    
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formContainer}>
                    <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                        <a className={classes.title}> Register Your Business Idea </a>
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
                            />

                            <TextField label="Description of Business Idea"
                                onChange={this.onChange} 
                                value = {this.state.description} 
                                name = 'description'  
                                fullWidth
                                className ={classes.input}
                            />

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
