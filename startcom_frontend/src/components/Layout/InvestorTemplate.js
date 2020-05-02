import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { fetchInvestor } from "../../actions/investor/InvestorAction";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { CardMedia } from '@material-ui/core';

const styles = (theme) => ({
    cardWrapper: {
        maxWidth: 275,
        padding: 20

    },
    media: {
        width: "200px",
        height: "100px"
    }

});


class InvestorTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: "",
            image: "",
            email: "",
            type: "",
            verified: "",
        }
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };


    render() {
        const { classes, investor } = this.props;
        const { open } = this.state;
        return (
            <Card className={classes.cardWrapper}>
                <CardMedia
                    className={classes.media}
                    image={investor.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {investor.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                        {investor.type}
                    </Typography>
                    <br />
                    <Typography variant="subtitle2" color="textSecondary" component="p" gutterBottom>
                        {investor.email}
                    </Typography>
                    <br />
                    <Typography>
                       {investor.email}
                    </Typography>
                    <Typography variant="subtitle2" component="h2">
                       Verify: {investor.verified}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={this.handleClickOpen}>More Info</Button>
                </CardActions>
            </Card>
        )
    };
}
const mapDispatchToProps = dispatch => ({
    // updateBI: (businessIdea, id) => dispatch(updateBI(businessIdea, id)),
    // deleteBI: (id) => dispatch(deleteBI(id)),
    fetchInvestor: () => dispatch(fetchInvestor())

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InvestorTemplate));

