import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI

import { updateBI } from "../../actions/businessideas/BIActions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



const styles = (theme) => ({


});

class UpdateBIForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleChange


    render() {
        console.log(this.props);
        const { open } = this.props;
        return (
            <Dialog open={open} onClose={this.props.close}>
                <DialogTitle id="form-dialog-title">Update business idea </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.close} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateBIForm));
