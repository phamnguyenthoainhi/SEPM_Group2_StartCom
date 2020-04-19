import React, { Component } from 'react'
import {connect} from 'react-redux';
import {fetchBI, registerBI, resetRegisterStatus, updateBI} from '../../../actions/businessideas/BIActions';
import { withStyles } from '@material-ui/core';
import BITemplate from '../../Layout/BITemplate';
import Grid from "@material-ui/core/Grid";
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';

const styles = (theme) => ({
    gridContainer: {

    },

});

class DisplayBIS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date:' ',
            description: '',
            targetFunding: '',
            needInvestor: false,
            needConsultant: false,
        };
    }

    componentDidMount() {
        this.props.fetchBI();
    }

    onBICardClick = (id) => {
        console.log(`Clicked card: ${id}`)
    };


    render() {
        const { classes, businessIdeas } = this.props;
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
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id))
});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeas.businessIdeas,

});



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayBIS));
