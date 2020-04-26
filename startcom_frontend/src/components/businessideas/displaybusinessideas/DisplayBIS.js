import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getAllBIS} from '../../../actions/businessideas/BIActions';
import { withStyles } from '@material-ui/core';
import BITemplate from '../../Layout/BITemplate';
import Grid from "@material-ui/core/Grid";
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import BISkeleton from "../../Layout/BISkeleton";

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

class DisplayBIS extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.getAllBIS();
    }

    onBICardClick = (id) => {
        window.open(`/detail/${id}`, '_blank');
    };

    render() {
        const { classes, businessIdeas, loading } = this.props;
        return (
            <Grid container className={classes.gridContainer}>
                <Navbar/>
                {loading ? (
                    <BISkeleton/>
                ) : (
                    <Grid container className={classes.contentContainer}>
                        {businessIdeas.map((idea,index) => (
                            <Grid item md={4} lg={3} sm={4} xs={6} key={index} onClick={() => this.onBICardClick(idea.id)} style={{padding: 20}}>
                                <BITemplate  idea={idea} loading={loading} />
                            </Grid>
                        ))}
                    </Grid>
                )}


                <Footer/>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAllBIS: () => dispatch(getAllBIS())
});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeas.businessIdeas,
    loading: state.UI.loading
});



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayBIS));
