import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'
//Material UI
import Grid from '@material-ui/core/Grid';
import {deleteBI, updateBI, getBI} from "../../actions/businessideas/BIActions";
import {getProfile} from '../../actions/users/UserActions';
import Navbar from "./Navbar";
import Footer from "./Footer";
import defaultLogo from '../../images/company_logo.png';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import UpdateBIForm from "./UpdateBIForm";
import Chip from '@material-ui/core/Chip';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// import BITemplate from "./BITemplate";
import BIDetailSkeleton from "../skeleton/BIDetailSkeleton";
import Contact from '../contact/Contact'


const styles = (theme) => ({
    companyLogo: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%'
    },

    detailWrapper: {
        padding: '50px 100px',
        
        [theme.breakpoints.down('sm')]: {
            padding: '50px 60px',
        },
    },
    title: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: 32
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 30
        }
    },
    description: {
        fontFamily: theme.font2,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },
    date: {
        fontFamily: theme.font2,
    },

    category: {
        fontWeight: 300,
        fontSize: 18,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },

    investorTrue: {
        border: 'none',
        margin: "10px 0",
        fontSize: 20,
        padding: "10px 0",
        textTransform: "inherit",
        fontFamily: theme.font2,
        fontWeight: 700,
        backgroundColor: theme.color.secondary,
        color: theme.color.primary2,
        "&:hover": {
            backgroundColor: theme.color.secondary,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    investorFalse: {
        border: 'none',
        margin: "10px 0",
        fontSize: 20,
        padding: "10px 0",
        textTransform: "inherit",
        fontFamily: theme.font2,
        fontWeight: 700,
        color: '#C75D5D',
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    consultantTrue: {
        border: 'none',
        padding: "10px 0",
        fontSize: 20,
        textTransform: "inherit",
        fontFamily: theme.font2,
        fontWeight: 700,
        backgroundColor: theme.color.secondary,
        color: theme.color.primary2,
        "&:hover": {
            backgroundColor: theme.color.secondary,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    consultantFalse: {
        border: 'none',
        padding: "10px 0",
        fontSize: 20,
        textTransform: "inherit",
        fontFamily: theme.font2,
        fontWeight: 700,
        backgroundColor: '#C75D5D',
        color: theme.color.primary2,
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    funding: {
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            fontSize: 28
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13,
            textAlign: 'center'
        }
    },
    currency: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: 32
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 28,
            textAlign: 'center'
        }
    },
    buttonGroup: {
        textAlign: 'center',
        justifyContent: 'center'
    },
    donateBtn: {
        margin: 10,
        fontSize: 14,
        padding: '10px 20px',
        backgroundColor: theme.color.primary3,
        color: theme.color.primary1,
        fontFamily: "'Raleway', sans-serif;",
        transition: "all 350ms ease-in-out",

    },
    updateBtn: {
        margin: 10,
        fontSize: 14,
        padding: '10px 20px',
        backgroundColor: theme.color.secondary,
        color: theme.color.primary2,
        fontFamily: "'Raleway', sans-serif;",
        transition: "all 350ms ease-in-out",

    },
    deleteBtn: {
        margin: 10,
        fontSize: 14,
        padding: '10px 20px',
        backgroundColor: "#C75D5D",
        color: theme.color.primary1,
        fontFamily: "'Raleway', sans-serif;",
        transition: "all 350ms ease-in-out",
    },
    dialogTitle: {
        padding: '12px 24px 5px 24px',
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontSize: 20,
        fontWeight: 600,
    },
    dialogSubtitle: {
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontWeight: 500,
    },

    chip: {
        padding: "20px 0",
        border: "none",
        fontFamily: theme.font2,
        fontWeight: 700,
        fontSize: 16
    },
    dividerTrue: {
        padding: 3,
        backgroundColor: theme.color.secondary
    },
    dividerFalse: {
        padding: 3,
        backgroundColor: '#C75D5D'
    }

});

class BIDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idea: {},
            contactOpen: false,
            profileReceiver: {},
            profileLoadingReceiver: false,
            sender: '',
            receiver: ''
        }
    }

    componentDidMount() {
        const businessID = this.props.match.params.id;
        this.props.getBI(businessID);
    }

    componentDidUpdate(prevProps) {
        console.log(this.props)
         if (this.props.profileLoading !== prevProps.profileLoading) {
             this.setState({
                 loading: this.props.profileLoading
             })
         }
         if (this.props.profileReceiver !== prevProps.profileReceiver) {
             this.setState({
                 profileReceiver: this.props.profileReceiver
             })
         }
    }

    backProject = (ownerId) => {
        var x = document.getElementById("mydiv");
        x.style.display = 'block'

        this.setState({
            contactOpen: true,
           
        })
        this.props.getProfile(ownerId, 'receiver');

    } 
    handleClose = () => {
        
        var x = document.getElementById("mydiv");
        x.style.display = 'none';

        this.setState({
            contactOpen: false
        })
        
    }

    render() {
        // console.log(this.props.businessIdea);
        const { classes, businessIdea, loading } = this.props;
        console.log(JSON.stringify(businessIdea))
        
        let detailMarkup = !loading ? (
            <Grid container className={classes.detailWrapper}>
                <Grid container>
                    <Grid item md={7} sm={6}>
                        <Typography variant="h4" component="h4"  gutterBottom className={classes.title}>
                            {businessIdea.name}
                        </Typography>
                        <Typography variant="subtitle1"  component="p" gutterBottom className={classes.description}>
                            {businessIdea.description}
                        </Typography>
                        <Chip variant="outlined" icon={<LocalOfferIcon/>} label={businessIdea.category}  className={classes.chip}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item md={7} sm={6}>
                        {businessIdea.image === '' ? (
                                <img src={defaultLogo} className={classes.companyLogo}/>
                            ) :
                            <img src={businessIdea.image} className={classes.companyLogo} />
                        }
                    </Grid>

                    <Grid item md={5} sm={6} xs={12}>
                        {businessIdea.needInvestor ? (
                            <div className={classes.dividerTrue}/>
                        ) : (
                            <div className={classes.dividerFalse}/>
                        )}
                        <Grid container style={{padding: "20px 0"}} direction='column'>
                            <Typography variant="h4" className={classes.funding}>
                                Target funding
                            </Typography>
                            <Typography variant="h3" className={classes.currency}>
                                ${businessIdea.targetFunding}
                            </Typography>


                        </Grid>

                        <Grid container direction='column' justify='space-between'>
                            {businessIdea.needConsultant ? (
                                <Button
                                    variant='outlined'
                                    className={classes.consultantTrue}
                                >
                                    Consultancy in need
                                </Button>
                            ) : (
                                <Button
                                    variant='outlined'
                                    className={classes.consultantFalse}
                                    disabled
                                >
                                    Consultancy occupied
                                </Button>
                            )}

                            {businessIdea.needInvestor ? (
                            (sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") !== undefined && sessionStorage.getItem("id") !== "") ? 

                                <Button
                                    variant='outlined'
                                    className={classes.investorTrue}
                                    onClick = {(ownerid) => this.backProject(businessIdea.ownerId)}>
                                    Back this project
                                </Button> : null


                            ) : (
                                <Button
                                    variant='outlined'
                                    className={classes.investorFalse}
                                    disabled
                                >
                                    Funding closed
                                </Button>
                            )}

                        </Grid>
                        {/*<Grid container className={classes.buttonGroup}>*/}
                        {/*    <Button className={classes.donateBtn}>Back it</Button>*/}
                        {/*    <Button className={classes.updateBtn} onClick={this.toggleUpdateForm}>Update</Button>*/}
                        {/*    <Button className={classes.deleteBtn} onClick={this.openDeleteDialog}>Delete</Button>*/}
                        {/*</Grid>*/}
                    </Grid>
                </Grid>
            </Grid>

        ) : ( <BIDetailSkeleton />);

        return (
            <Grid container>
                <Navbar/>
                

                {this.state.contactOpen ? 
                (
                    <Grid container >
                        <Grid item lg={9} md ={8} sm = {12} xs ={12}>
                        {detailMarkup}
                        </Grid>
                        <Grid item lg={3} md ={4} sm = {12} xs ={12} >

                        <Contact id='mydiv' handleClose={this.handleClose} profileReceiver = {this.state.profileReceiver} 
                                
                                />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container>
                    <Grid item xs={12} >
                    {detailMarkup}
                    </Grid>
                    <Grid item xs={0} >
                    <Contact id='mydiv' handleClose={this.handleClose} profileReceiver = {this.state.profileReceiver}/>
                    </Grid>
                </Grid>
                    
                )}
                
                
                <Footer/>
            </Grid>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
    getBI: (id) => dispatch(getBI(id)),
    getProfile: (id, type) => dispatch(getProfile(id, type))
});

const mapStateToProps = state => ({
    businessIdea: state.businessIdeasData.businessIdea,
    loading: state.businessIdeasData.loading,
    profileLoading: state.usersReducer.profileLoading,
    profileReceiver: state.usersReducer.profileReceiver

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BIDetail));
