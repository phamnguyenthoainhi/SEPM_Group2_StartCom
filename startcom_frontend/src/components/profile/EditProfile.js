import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import defaultUser from '../../images/default.png';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import defaultLogo from "../../images/company_logo.png";
import Chip from '@material-ui/core/Chip';


const styles = (theme) => ({
    containerWrapper: {
        padding: "50px 80px",
        [theme.breakpoints.down('md')]: {
            padding: "50px 250px",
        },
        [theme.breakpoints.down('sm')]: {
            padding: "50px 150px",
        },
    },
    card: {
        border: '.5px solid grey',
        [theme.breakpoints.between('xs', 'md')]: {
            textAlign: 'center',
            justifyContent: 'center',
            alignContent: 'center',
        },
    },
    ideaCard: {
        border: '.5px solid grey',
    },
    avatar: {
        borderRadius: '50%',
        height: "100px",
        width: "100px",
        backgroundColor: 'transparent',
    },
    username: {
        fontFamily: theme.font2,
        fontWeight: 700,
        textAlign: 'center'
    },
    infoContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        padding: "10px 0 20px 0"
    },
    avatarContainer: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    button: {
        marginTop: 5,
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        fontSize: 13,
        transition: "all 350ms ease-in-out",
        color: theme.color.primary2,
        backgroundColor: theme.color.secondary,
        fontWeight: 600,
        "&:hover": {
            color: theme.color.primary2,
            backgroundColor: theme.color.contrast,
        },
    },
    title: {
        textTransform: 'uppercase',
        fontFamily: theme.font2,
        fontWeight: 700,
        color: '#a4a4a4',
    },
    email: {
        fontFamily: theme.font2,
        fontWeight: 400,
    },
    container: {
        padding: "10px 0"
    },
    mediaBtn: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 400,
    },
    progressContainer: {
        padding: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
    ideaContainer: {
        padding: "15px 0"
    },
    ideaImage: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%'
    },
    chipTrue: {
        color: theme.color.primary2,
        backgroundColor: theme.color.secondary,
        fontFamily: theme.font2,
        marginRight: 10
    },
    chipFalse: {
        backgroundColor: '#C75D5D',
        fontFamily: theme.font2,
        marginRight: 10
    }

});

class EditProfile extends Component {
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
        // const businessID = "V2BTqcwWe3IOgmhEAbd0";
        // this.props.getBI(businessID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getBusinessIdea = (id) => {

    };





    // toggleUpdateForm = () => {
    //     this.setState({
    //         toggleUpdate: !this.state.toggleUpdate
    //     })
    // };
    //
    // openDeleteDialog = () => {
    //     this.setState({
    //         openDeleteDialog: true
    //     })
    // };
    //
    // closeDeleteDialog = () => {
    //     this.setState({
    //         openDeleteDialog: false
    //     })
    // };
    //
    // delete = (id) => {
    //     this.props.deleteBI(id);
    //     console.log("Delete successfully")
    // };

    render() {
        console.log(this.props.businessIdea);
        const { classes, user, businessIdea, loading } = this.props;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.containerWrapper}>

                </Grid>
                <Footer/>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
    getBI: (id) => dispatch(getBI(id)),

});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
