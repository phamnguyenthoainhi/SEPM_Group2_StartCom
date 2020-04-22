import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI} from "../../actions/businessideas/BIActions";


const styles = (theme) => ({


});

class BIDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        const { classes, idea } = this.props;
        return (
            <Grid>

            </Grid>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id))
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BIDetail));
