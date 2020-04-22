import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Skeleton from '@material-ui/lab/Skeleton';



const styles = (theme) => ({
    cardWrapper: {
        maxWidth: 'auto',
        minWidth: 275
    },
    cardContent: {
        padding: 20
    },
    cardTitle: {
        fontFamily: theme.font
    }

});

class BISkeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        const { classes, idea } = this.props;
        const { open } = this.state;
        return (
            <Skeleton>

            </Skeleton>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id))
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BISkeleton));
