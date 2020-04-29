import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import defaultLogo from '../../images/company_logo.png';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import UpdateBIForm from "./UpdateBIForm";



const styles = (theme) => ({

});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idea: {},
            toggleUpdate: false,
            openUpdateForm: false,
            openDeleteDialog: false
        }
    }


    componentDidMount() {
        const businessID = this.props.match.params.id;
        this.props.getBI(businessID);
    }


    toggleUpdateForm = () => {
        this.setState({
            toggleUpdate: !this.state.toggleUpdate
        })
    };

    openDeleteDialog = () => {
        this.setState({
            openDeleteDialog: true
        })
    };

    closeDeleteDialog = () => {
        this.setState({
            openDeleteDialog: false
        })
    };

    delete = (id) => {
        this.props.deleteBI(id);
        console.log("Delete successfully")
    };

    render() {
        // console.log(this.props.businessIdea);
        const { classes, businessIdea } = this.props;
        return (
            <Grid container>
                <Navbar/>

                <Footer/>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeasData.businessIdea
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
