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

    companyLogo: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%'
    },

    detailWrapper: {
        padding: '50px 100px'
    },
    title: {
        fontFamily: theme.font1,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 22
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 20
        }
    },
    description: {
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    date: {
        fontWeight: 300,
        fontSize: 18
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
        textTransform: 'uppercase',
        fontFamily: theme.font1,
        color: theme.color.secondary,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    investorFalse: {
        textTransform: 'uppercase',
        fontFamily: theme.font1,
        color: '#C75D5D',
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    consultantTrue: {
        fontFamily: theme.font1,
        fontWeight: 600,
        backgroundColor: theme.color.secondary,
        marginBottom: 20
    },
    consultantFalse: {
        fontFamily: theme.font1,
        fontWeight: 600,
        backgroundColor: '#C75D5D',
        color: theme.color.primary2,
        marginBottom: 20
    },
    fundingTrue: {
        textAlign: 'center',
        color: theme.color.secondary,
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },
    fundingFalse: {
        textAlign: 'center',
        color: '#C75D5D',
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },
    buttonGroup: {
        textAlign: 'center',
        justifyContent: 'center'
        // padding: 20
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
    cancelBtn: {

        fontSize: 15,
        fontFamily: theme.font1,
        color: "#C75D5D",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },

    },
    confirmBtn: {
        fontSize: 15,
        fontFamily: theme.font1,
        color: theme.color.primary3,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    }

});

class BIDetail extends Component {
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
        const { openDeleteDialog, toggleUpdate } = this.state;
        return (
            <Grid container>
                <Navbar/>
                <Grid container className={classes.detailWrapper}>
                    <Grid container spacing={5}>
                        <Grid item md={7} sm={6}>
                            {businessIdea.image === '' ? (
                                <img src={defaultLogo} className={classes.companyLogo}/>
                            ) :
                                <img src={businessIdea.image} className={classes.companyLogo} />
                            }
                        </Grid>
                        <Grid item md={5} sm={6}>
                            {businessIdea.needInvestor ? (
                                <Typography className={classes.investorTrue} variant="subtitle1" gutterBottom>
                                    Funding
                                </Typography>
                            ) : (
                                <Typography className={classes.investorFalse} variant="subtitle1" gutterBottom>
                                    Funding Closed
                                </Typography>
                            )}
                            <Typography variant="h4" component="h4" className={classes.title}>
                                {businessIdea.name}
                            </Typography>
                            <Typography variant="subtitle1"  component="p" gutterBottom className={classes.description}>
                                {businessIdea.description}
                            </Typography>
                            <Divider style={{margin: "20px 70px", backgroundColor: '#718F94'}} variant="middle"/>
                            <Typography  variant="subtitle1" className={classes.category}>
                                Category: {businessIdea.category}
                            </Typography>
                            <Typography variant="subtitle1" className={classes.date}>
                                Founded: {businessIdea.date}
                            </Typography>
                            <Divider style={{margin: "20px 70px", backgroundColor: "#718F94"}} variant="middle"/>

                            {/*{businessIdea.needConsultant ? (*/}
                            {/*    <Chip*/}
                            {/*        className={classes.consultantTrue}*/}
                            {/*        label="Consultancy Required"*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    <Chip*/}
                            {/*        className={classes.consultantFalse}*/}
                            {/*        label="Consultancy Occupied"/>*/}
                            {/*)}*/}
                            {businessIdea.needInvestor ? (
                                <Typography variant="h5" className={classes.fundingTrue}>
                                    Target funding: ${businessIdea.targetFunding}
                                </Typography>
                                ) : (
                                <Typography variant="h5" className={classes.fundingFalse}>
                                    Target funding: ${businessIdea.targetFunding}
                                </Typography>
                            )}

                            <Grid container className={classes.buttonGroup}>
                                <Button className={classes.donateBtn}>Back it</Button>
                                <Button className={classes.updateBtn} onClick={this.toggleUpdateForm}>Update</Button>
                                <Button className={classes.deleteBtn} onClick={this.openDeleteDialog}>Delete</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog
                    keepMounted
                    className={classes.dialog}
                    open={openDeleteDialog}
                    onClose={this.closeDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        style: {
                            backgroundColor: '#90B494',
                        },
                    }}
                >
                    <Typography variant="h6" className={classes.dialogTitle}>Do you want to discard this business idea ?</Typography>
                    <DialogContent>
                        <Typography variant="subtitle1" className={classes.dialogSubtitle}>
                            If you delete this business idea. All of its credential will be permanently delete from the database.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteDialog} className={classes.cancelBtn}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.delete(businessIdea.id)} className={classes.confirmBtn}  >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                <UpdateBIForm open={toggleUpdate} close={this.toggleUpdateForm} businessIdea={businessIdea}/>

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
    businessIdea: state.businessIdeasData.businessIdea
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BIDetail));
