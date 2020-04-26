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
import CheckIcon from "@material-ui/icons/Check";

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



const styles = (theme) => ({
    dialogTitle: {
        padding: '12px 24px 5px 24px',
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center'
    },
    dialogSubtitle: {
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontWeight: 500,
    },
    input: {
        marginBottom: "30px",
        fontSize: '20px',
        '& label.Mui-focused': {
            color: theme.color.primary1,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.color.primary1,
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: theme.color.primary3,
        }
    },
    cancelBtn: {

        fontSize: 15,
        fontFamily: theme.font1,
        color: "#C75D5D",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },

    },
    confirmBtn: {
        fontSize: 15,
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    }

});

class UpdateBIForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            description: '',
            targetFunding: '',
            errors: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snap) {
        if (this.props.businessIdea !== prevProps.businessIdea) {
            this.setState({
                name: this.props.businessIdea.name,
                date: this.props.businessIdea.date,
                description: this.props.businessIdea.description,
                targetFunding: this.props.businessIdea.targetFunding
            })
        }
    }

    handleDateChange = (chosenDate) => {
        this.setState({date: chosenDate});
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    submit = () => {
        const id = this.props.businessIdea.id;
        const businessIdea = {
            name: this.state.name,
            description: this.state.description,
            targetFunding: this.state.targetFunding,
            date: this.state.date
        };

        this.props.updateBI(businessIdea,id);
    };


    render() {
        const { classes, open, businessIdea, loading, doneUpdateBI } = this.props;
        const { errors } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.props.close}
                PaperProps={{
                    style: {

                    },
                }}
            >
                <Typography variant="h6" className={classes.dialogTitle}>Update this business idea</Typography>
                <DialogContent>
                    <TextField
                        onChange={this.handleChange}
                        value = {this.state.name}
                        name = 'name'
                        fullWidth
                        label="Business Idea Name"
                        required
                        className ={classes.input}
                        helperText={errors.name}
                        error={!!errors.name}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            textFieldStyle={{width: '100%'}}
                            openTo="year"
                            autoOk
                            format="dd/MM/yyyy"
                            label="Date of birth"
                            views={["year", "month", "date"]}
                            value={this.state.date}
                            onChange={this.handleDateChange}
                        />
                    </MuiPickersUtilsProvider>

                    {/*<TextField*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    value = {this.state.date}*/}
                    {/*    name = 'date'*/}
                    {/*    fullWidth*/}
                    {/*    label="Date of Establishment"*/}
                    {/*    className ={classes.input}*/}
                    {/*    type = 'date'*/}
                    {/*    required*/}
                    {/*    InputLabelProps={{*/}
                    {/*        shrink: true,*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <TextField label="Description of Business Idea"
                               onChange={this.handleChange}
                               value = {this.state.description}
                               name = 'description'
                               fullWidth
                               required
                               className ={classes.input}
                               helperText={errors.name}
                               error={!!errors.name}
                    />
                    <TextField label="Target Funding $"
                               onChange={this.handleChange}
                               value = {this.state.targetFunding}
                               name = 'targetFunding'
                               fullWidth
                               className ={classes.input}
                               type='number'
                               required
                               helperText={errors.name}
                               error={!!errors.name}
                    />
                </DialogContent>
                <DialogActions>
                    { doneUpdateBI ? (
                        <CheckIcon fontSize="large"/>
                    ) : loading ? (
                        <CircularProgress variant="indeterminate" size={30} style={{color: '#3C5155'}}/>
                    ) :
                        <div>
                            <Button onClick={this.props.close} className={classes.cancelBtn}>
                                Cancel
                            </Button>
                            <Button onClick={this.submit} className={classes.confirmBtn}>
                            Confirm
                            </Button>
                        </div>
                    }

                </DialogActions>
            </Dialog>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
});

const mapStateToProps = state => ({
    loading: state.UI.loading,
    doneUpdateBI: state.UI.doneUpdateBI
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateBIForm));
