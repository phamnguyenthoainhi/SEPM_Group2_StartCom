import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getAllBIS} from '../../../actions/businessideas/BIActions';
import { withStyles } from '@material-ui/core';
import BITemplate from '../../Layout/BITemplate';
import Grid from "@material-ui/core/Grid";
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
import BISkeleton from "../../skeleton/BISkeleton";
import BISearch from "../../Layout/BISearch";
import BIFilter from "../../Layout/BIFilter";

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
            name: '',
            date: ' ',
            description: '',
            image: '',
            category: '',
            targetFunding: '',
            needInvestor: false,
            needConsultant: false,
            foundIdeas: [],
        };
        // this.filterIdeas = this.filter.bind(this)
    }

    componentDidMount() {
        this.props.getAllBIS();
    }

    onBICardClick = (id) => {
        window.open(`/detail/${id}`, '_blank');
    };

    searchByName = (name) => {
        let businessIdeas = this.state.keywords.filter(businessIdea => businessIdea.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
        console.log(businessIdeas);
        return businessIdeas;
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
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                            <BIFilter triggerParentUpdate={this.filterIdeas} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={9} >
                            <div style={{ marginRight: '30px', marginLeft: '15px', marginTop: '20px', marginBottom: '20px' }}><BISearch triggerParentUpdate={this.searchByname} /></div>

                            <Grid container className={classes.gridContainer}>
                                {filteredIdeas.map((idea, index) => (
                                    <Grid item xs={12} sm={12} md={6} lg={4} key={index} onClick={() => this.onBICardClick(idea.name)} style={{ padding: 20 }}>
                                        <BITemplate idea={idea} />
                                    </Grid>
                                ))}


                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer />
                </div> :
                <div>
                    <Navbar />
                    <Grid container>
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                            <BIFilter
                                // triggerParentUpdate={this.filterIdeas}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={8} lg={9}>
                            <div style={{ marginRight: '30px', marginLeft: '15px', marginTop: '20px', marginBottom: '20px' }}><BISearch triggerParentUpdate={this.searchByname} /></div>
                            <Grid container className={classes.gridContainer}>
                              {ideaMarkup}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer />
                </div>
        )
            {/*<Grid container className={classes.gridContainer}>*/}
            {/*    <Navbar/>*/}
            {/*    {ideaMarkup}*/}
            {/*    <Footer/>*/}
            {/*</Grid>*/}
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
