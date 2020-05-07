import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { fetchBI, updateBI } from '../../../actions/businessideas/BIActions';
import BITemplate from '../../Layout/BITemplate';
import { connect } from 'react-redux';
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import BISearch from "../../Layout/BISearch"
import BIFilter from "../../Layout/BIFilter"

import { withStyles } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

//import { withStyles } from '@material-ui/core';
//import MoreVertIcon from '@material-ui/icons/MoreVert';

//import {IconButton } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardHeader from '@material-ui/core/CardHeader'; 

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
            needInvestor: '',
            needConsultant: '',
            foundIdeas: [],
            keywords: [],
            afterFilter: []
        };
        this.searchByname = this.searchByname.bind(this)
        // this.filterIdeas = this.filter.bind(this)
    }

    componentDidMount() {
        this.props.fetchBI();
    };

    onBICardClick = (id) => {
        console.log(`Clicked card: ${id}`)
    };

    componentDidUpdate(prevProps) {
        if (this.props.businessIdeas !== prevProps.businessIdeas) {
            this.setState({
                keywords: this.props.businessIdeas,
                afterFilter: this.props.businessIdeas
            })
        }
    }

    searchByname = (name) => {

        let businessIdeas = this.state.keywords.filter((businessIdea) => businessIdea.name.toLowerCase().includes(name.toLowerCase()))

        this.setState({
            afterFilter: businessIdeas
        })
        return businessIdeas;

    };

    filterIdeasCategory = (category) => {

        let businessIdeas = this.state.keywords.filter((businessIdea) => businessIdea.category === category)
        this.setState({
            afterFilter: businessIdeas
        })
        return businessIdeas
    };

    filterIdeasConsultant = (needConsultant) => {

        let businessIdeas = this.state.keywords.filter((businessIdea) => businessIdea.needConsultant === true)
        this.setState({
            afterFilter: businessIdeas
        })
        return businessIdeas
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.contentContainer}>
                <Navbar />
            
                {this.state.afterFilter.map((idea, index) => (
                    <Grid item md={4} key={index} onClick={() => this.onBICardClick(idea.name)} style={{ padding: 20 }}>
                        <BITemplate idea={idea} />
                    </Grid>
                ))}

                <Footer />
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchBI: () => dispatch(fetchBI()),
    updateBI: (businessIdea, id) => dispatch(updateBI(businessIdea, id))
});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeas.businessIdeas,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayBIS));
