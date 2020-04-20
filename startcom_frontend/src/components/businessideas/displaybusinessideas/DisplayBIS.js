import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { fetchBI, updateBI } from '../../../actions/businessideas/BIActions';
import BITemplate from '../../Layout/BITemplate';
import {connect} from 'react-redux';
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
        padding: 20
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
    padding: 20
});

class DisplayBIS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: ' ',
            description: '',
            imgSc: '',
            targetFunding: '',
            needInvestor: false,
            needConsultant: false,
        }
    }

    componentDidMount (){
        this.props.fetchBI();
    };
    onBICardClick = (id) => {
        console.log(`Clicked card: ${id}`)
    };

    render() {
        const { classes, businessIdeas} = this.props;
        return (
            <Grid container className={classes.gridContainer}>
                <Navbar/>
                {businessIdeas.map((idea,index) => (
                    <Grid item md={4} key={index} onClick={() => this.onBICardClick(idea.id)} style={{padding: 20}}>
                        <BITemplate  idea={idea}  />
                    </Grid>
                ))}
                <Footer/>
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
