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
        padding: 40
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

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
        this.searchByname = this.searchByname.bind(this)
        // this.filterIdeas = this.filter.bind(this)
    }

    componentDidMount() {
        this.props.fetchBI();
    };

    onBICardClick = (id) => {
        console.log(`Clicked card: ${id}`)
    };

    searchByname = (name) => {
        let businessIdeas = this.state.keywords.filter(businessIdea => businessIdea.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
        console.log(businessIdeas)
        return businessIdeas;
        // const id = this.props.sortedIdeas.id;
    };

    render() {
        const { classes, businessIdeas, filteredIdeas ,filtered} = this.props;
        
        return (
            (filtered) ? 
            <Grid container className={classes.gridContainer}>
                <Navbar />

                <BISearch triggerParentUpdate={this.searchByname} />
                <BIFilter triggerParentUpdate={this.filterIdeas} />

                {filteredIdeas.map((idea, index) => (
                    <Grid item md={4} key={index} onClick={() => this.onBICardClick(idea.name)} style={{ padding: 20 }}>
                        <BITemplate idea={idea} />
                    </Grid>
                ))}

                <Footer />
            </Grid>:
            <Grid container className={classes.gridContainer}>
                <Navbar />

                <BISearch triggerParentUpdate={this.searchByname} />
                <BIFilter triggerParentUpdate={this.filterIdeas} />

                {businessIdeas.map((idea, index) => (
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
    filteredIdeas: state.businessIdeas.filteredIdeas,
    filtered: state.businessIdeas.filtered

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayBIS));
