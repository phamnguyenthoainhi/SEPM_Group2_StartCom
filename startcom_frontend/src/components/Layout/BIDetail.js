import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Typography from "@material-ui/core/Typography";


const styles = (theme) => ({
    detailWrapper: {

    },


});

class BIDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idea: {}
        }
    }

    componentDidMount() {
        const businessID = this.props.match.params.id;
        this.props.getBI(businessID);
    }


    render() {
        console.log(this.props.businessIdea);
        const { classes, businessIdea } = this.props;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.detailWrapper}>
                    <Grid item md={2}/>
                    <Grid item md={8}>
                        <Typography>
                            {businessIdea.name}
                        </Typography>
                        <Typography>
                            {businessIdea.description}
                        </Typography>
                        <Typography>
                            {businessIdea.category}
                        </Typography>
                        <Typography>
                            {businessIdea.needConsultant}
                        </Typography>
                        <Typography>
                            {businessIdea.needInvestor}
                        </Typography>
                        <Typography>
                            {businessIdea.targetFunding}
                        </Typography>

                    </Grid>
                    <Grid item md={2}/>
                </Grid>
                <Footer/>
            </Grid>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
    getBI: (id) => dispatch(getBI(id))
});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeas.businessIdea
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BIDetail));
