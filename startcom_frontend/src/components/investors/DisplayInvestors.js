import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import UserTemplate from "../Layout/template/UserTemplate";
import UserSkeleton from "../skeleton/UserSkeleton";
import Typography from "@material-ui/core/Typography";
import {getAllInvestors} from "../../actions/investors/InvestorActions";

const styles = (theme) => ({
    containerWrapper: {
        padding: 50
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 20
    }

});

class DisplayInvestors extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.getAllInvestors();
    }


    onBICardClick = (type, id) => {
        const userID = sessionStorage.getItem("id");
        const userType = sessionStorage.getItem("type");
        if (userID !== id) {
            window.open(`/profile/detail/${type}/${id}`, '_blank');
        } else {
            window.open(`/profile/${userType}/${userID}`, '_blank');
        }
    };


    render() {
        console.log(this.props.consultants);
        console.log(this.props.loading);
        const { classes, investors, loading} = this.props;

        let investorsMarkup = !loading ? (
            <Grid container className={classes.containerWrapper}>
                <Grid container className={classes.container}>
                    <Typography variant='h5' className={classes.header}>
                        Meet our legitimate investors
                    </Typography>
                </Grid>

                {investors.filter(investor => investor.verified === true).map((investor, index) =>(
                    <Grid item md={3} lg={3} sm={4} xs={6} key={index} onClick={() => this.onBICardClick(investor.type, investor.id)} style={{padding: 20}}>
                        <UserTemplate user={investor} userType={investor.type}/>
                    </Grid>
                    ))}
            </Grid>
        ) : ( <UserSkeleton />);

        return (
            <Grid container>
                <Navbar />
                {investorsMarkup}
                <Footer />
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAllInvestors: () => dispatch(getAllInvestors())
});

const mapStateToProps = (state) => ({
    loading: state.investorsReducer.loading,
    investors: state.investorsReducer.investors
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayInvestors));
