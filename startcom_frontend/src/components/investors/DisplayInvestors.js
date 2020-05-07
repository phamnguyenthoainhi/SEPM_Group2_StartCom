import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { fetchInvestor } from '../../actions/investor/InvestorAction';
import InvestorTemplate from '../Layout/InvestorTemplate';
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


 class DisplayInvestors extends Component {
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
        this.props.fetchInvestor();
    };

    onBICardClick = (id) => {
        console.log(`Clicked card: ${id}`)
    };



    render() {
        const { classes, investors } = this.props;

        return (
            <Grid container className={classes.contentContainer}>
            
                <Navbar />

                {investors.map((investor, index) => (
                    <Grid item md={4} key={index} onClick={() => this.onBICardClick(investor.name)} style={{ padding: 20 }}>
                        <InvestorTemplate investor={investor} />
                    </Grid>
                ))}

                <Footer />
            </Grid>

        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchInvestor: () => dispatch(fetchInvestor()),
    // updateBI: (businessIdea, id) => dispatch(updateBI(businessIdea, id))
});

const mapStateToProps = state => ({
    investors: state.investors.investors,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayInvestors));
