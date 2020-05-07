import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { fetchConsultant } from '../../actions/consultant/ConsultantAction';
import ConsultantTemplate from '../Layout/ConsultantTemplate';
import { connect } from 'react-redux';
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

import { withStyles } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    gridContainer: {
        flexGrow: 1,
    },
    contentContainer: {
        padding: 80,
        [theme.breakpoints.down('sm')]: {
            padding: 40
        }
    }

});

 class DisplayConsultant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: '',
            name: "",
            image: "",
            email: "",
            type: "",
            verified: "",
        }
    };

    componentDidMount() {
        this.props.fetchConsultant();
    };

    onBICardClick = (id) => {
        console.log(`Clicked card: ${id}`)
    };



    render() {
        const { classes, consultants } = this.props;

        return (
            <Grid container className={classes.contentContainer}>
                <Navbar />

                {consultants.map((consultant , index) => (
                    <Grid item md={4} key={index} onClick={() => this.onBICardClick(consultant.name)} style={{ padding: 20 }}>
                        <ConsultantTemplate consultant={consultants} />
                    </Grid>
                ))}
                <Footer />
            </Grid>

        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchConsultant: () => dispatch(fetchConsultant()),
});

const mapStateToProps = state => ({
    consultants: state.consultants.consultants,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayConsultant));
