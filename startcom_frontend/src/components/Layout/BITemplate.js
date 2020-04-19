import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI

import logo from '../../images/company_logo.png';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import {deleteBI, updateBI} from "../../actions/businessideas/BIActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import CardMedia from "@material-ui/core/CardMedia";


const styles = (theme) => ({
    cardWrapper: {
        maxWidth: 'auto',
        minWidth: 275
    },
    cardContent: {
        padding: 20
    },
    cardTitle: {
        fontFamily: theme.font
    }

});

class BITemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: '',
            name: "",
            description: "",
            date: "",
            targetFunding: "",
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

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

    delete = () => {
        const id = this.props.idea.id;
        this.props.deleteBI(id)
    };

    submit = () => {
        const id = this.props.idea.id;
        const businessIdea = {
            name: this.state.name,
            description: this.state.description,
            targetFunding: this.state.targetFunding,
            date: this.state.date
        };

        console.log(`
        ID: ${this.props.idea.id}
        Name: ${this.state.name}
        Description: ${this.state.description}
        Target Funding: ${this.state.targetFunding}
        Date: ${this.state.date}
        `);
        this.props.updateBI(businessIdea,id);
        this.handleClose()

    };

    render() {

        const { classes, idea } = this.props;
        const { open } = this.state;
        return (
            <Card className={classes.cardWrapper}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={logo}
                    title="Company Logo"
                >

                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                        {idea.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                        Business
                    </Typography>
                    <br/>
                    <Typography variant="subtitle2"  color="textSecondary" component="p" gutterBottom>
                        {idea.description}
                    </Typography>
                    <br/>
                    <Typography variant="h6" component="h2">
                        Funding Target: $ {idea.targetFunding}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={this.handleClickOpen}>Update</Button>
                    <Button variant="contained" onClick={this.delete}>Delete</Button>
                </CardActions>

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Adjust the information
                        </DialogContentText>
                        <TextField
                            value={this.state.name}
                            onChange={this.handleChange}
                            autoFocus
                            id="name"
                            name="name"
                            label="Business Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            onChange={this.handleChange}
                            autoFocus
                            name="description"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={this.state.description}
                        />
                        <TextField
                            onChange={this.handleChange}
                            autoFocus
                            name="targetFunding"
                            id="targetFunding"
                            label="Target Funding"
                            type="number"
                            fullWidth
                            value={this.state.targetFunding}
                        />
                        <TextField
                            onChange={this.handleChange}
                            autoFocus
                            id="date"
                            name="date"
                            label="Date"
                            type="date"
                            fullWidth
                            value={this.state.date}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.submit} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>


        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id))
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BITemplate));
