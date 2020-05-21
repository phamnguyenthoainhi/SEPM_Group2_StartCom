import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getAllBIS} from '../../../actions/businessideas/BIActions';
import { withStyles } from '@material-ui/core';
import BITemplate from '../../Layout/template/BITemplate';
import Grid from "@material-ui/core/Grid";
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import BISkeleton from "../../skeleton/BISkeleton";
import BISearch from "../../Layout/BISearch";
import BIFilter from "../../Layout/BIFilter";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    gridContainer: {
        flexGrow: 1,
        padding: 10
    },
    contentContainer: {
        padding: 80,
        [theme.breakpoints.down('sm')]: {
            padding: 40
        }
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 400,
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
        const { classes, businessIdeas, loading, filteredIdeas, filtered } = this.props;

        let ideaMarkup = !loading ? (
                <Grid container>
                    {businessIdeas.map((idea,index) => (
                        <Grid item md={4} lg={4} sm={4} xs={6} key={index} onClick={() => this.onBICardClick(idea.id)} style={{padding: 20}}>
                            <BITemplate  idea={idea} loading={loading} />
                        </Grid>
                    ))}
                </Grid>
        ) : ( <BISkeleton />);


        return (
            (filtered) ?
                <div>
                    <Navbar />
                    <Grid container >
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <BIFilter/>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9} lg={9} >
                            
                            <div style={{ marginRight: '30px', marginLeft: '15px', marginTop: '20px', marginBottom: '20px' }}><BISearch/></div>

                            <Grid container className={classes.gridContainer}>
                                {filteredIdeas.length === 0 ? (
                                    <Grid container justify='center'>
                                        <Typography variant='subtitle1' className={classes.text}>There are no result match with the filter</Typography>
                                    </Grid>
                                ) : (
                                    <Grid container direction='row'>
                                    {filteredIdeas.map((idea, index) => (
                                        <Grid item xs={12} sm={12} md={6} lg={4} key={index} onClick={() => this.onBICardClick(idea.id)} style={{ padding: 20 }}>
                                            <BITemplate idea={idea} />
                                        </Grid>
                                        ))}
                                    </Grid>
                                )}

                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer />
                </div> :
                <div>
                    <Navbar />
                    <Grid container>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <BIFilter/>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9} lg={9}>
                        
                            <div style={{ marginRight: '30px', marginLeft: '15px', marginTop: '20px', marginBottom: '20px' }}><BISearch/></div>
                            <Grid container className={classes.gridContainer}>
                              {ideaMarkup}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer />
                </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAllBIS: () => dispatch(getAllBIS())
});

const mapStateToProps = (state) => ({
    businessIdeas: state.businessIdeasData.businessIdeas,
    loading: state.businessIdeasData.loading,
    filteredIdeas: state.businessIdeasData.filteredIdeas,
    filtered: state.businessIdeasData.filtered
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayBIS));
