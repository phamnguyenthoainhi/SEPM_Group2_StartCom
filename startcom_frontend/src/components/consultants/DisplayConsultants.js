import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { getAllConsultants } from "../../actions/consultants/ConsultantActions";
import UserTemplate from "../Layout/template/UserTemplate";
import UserSkeleton from "../skeleton/UserSkeleton";
import Typography from "@material-ui/core/Typography";

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

class DisplayConsultants extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.getAllConsultants();
    }

    onBICardClick = (type, id) => {
        window.open(`/profile/${type}/${id}`, '_blank');
    };


    render() {
        console.log(this.props.consultants);
        console.log(this.props.loading);
        const { classes, consultants, loading} = this.props;

        let consultantsMarkup = !loading ? (
            <Grid container className={classes.containerWrapper}>
                <Grid container className={classes.container}>
                    <Typography variant='h5' className={classes.header}>
                        Meet our consultants
                    </Typography>
                </Grid>
                {consultants.map((consultant,index) => (
                    <Grid item md={3} lg={3} sm={4} xs={6} key={index} onClick={() => this.onBICardClick(consultant.type, consultant.id)} style={{padding: 20}}>
                        <UserTemplate user={consultant} />
                    </Grid>
                ))}
            </Grid>
        ) : ( <UserSkeleton />);


        return (
                <Grid container>
                    <Navbar />

                    {consultantsMarkup}
                    <Footer />
                </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAllConsultants: () => dispatch(getAllConsultants())
});

const mapStateToProps = (state) => ({
    loading: state.consultantsReducer.loading,
    consultants: state.consultantsReducer.consultants
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayConsultants));
