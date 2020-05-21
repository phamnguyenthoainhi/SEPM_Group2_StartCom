import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import defaultLogo from "../../../images/company_logo.png";
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import {deleteBI, updateBI} from "../../../actions/businessideas/BIActions";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";





const styles = (theme) => ({

    ideaCard: {
        border: '.5px solid grey',
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
    },
    ideaContainer: {
        padding: "15px 0"
    },
    ideaImage: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%'
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
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
        color: theme.color.secondary,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: 'transparent',
        },
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },



});

class BITemplateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false
        }
    }

    openUpdateForm = (id) => {
        window.open(`/edit_bi/${id}`, '_self');
    };

    openDeleteDialog = () => {
        this.setState({
            openDeleteDialog: true
        })
    };

    closeDeleteDialog = () => {
        this.setState({
            openDeleteDialog: false
        });
    };

    delete = (id) => {
        this.props.deleteBI(id);
        this.closeDeleteDialog();
    };

    render() {
        const { classes, businessIdea } = this.props;
        const { openDeleteDialog } = this.state;
        const userID = sessionStorage.getItem("id");
        return (
            <Card elevation={3} className={classes.ideaCard}>
                <CardContent style={{padding: '10px 30px'}}>
                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Image:
                            </Typography>
                        </Grid>

                        <Grid item md={6} sm={6} lg={6} xs={6}>
                            {businessIdea.image === '' ? (
                                    <img src={defaultLogo} className={classes.ideaImage} alt="Idea"/>
                                ) :
                                <img src={businessIdea.image} className={classes.ideaImage} alt="Idea"/>
                            }
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Name:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            <Typography className={classes.text}>
                                {businessIdea.name}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Description:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            <Typography className={classes.text}>
                                {businessIdea.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Category:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            <Typography className={classes.text}>
                                {businessIdea.category}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Created:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            <Typography className={classes.text}>
                                {businessIdea.date}
                            </Typography>
                        </Grid>
                    </Grid>



                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Status:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            {businessIdea.needConsultant ? (
                                <Chip label="Consultancy Required" className={classes.chipTrue}/>
                            ) : (
                                <Chip label="Consultancy Occupied" className={classes.chipFalse}/>
                            )}

                            {businessIdea.needInvestor ? (
                                <Chip label="Funding" className={classes.chipTrue}/>
                            ) : (
                                <Chip label="Funding Closed" className={classes.chipFalse}/>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Funding target:
                            </Typography>
                        </Grid>

                        <Grid item md={8} sm={8}>
                            <Typography className={classes.text}>
                                ${ parseInt(businessIdea.targetFunding).toLocaleString('en')}
                            </Typography>
                        </Grid>
                    </Grid>

                    {userID === businessIdea.ownerId ? (
                        <Grid container direction='row'>
                            <Tooltip title="Edit this idea">
                                <IconButton className={classes.iconBtn} style={{marginLeft: 'auto'}} onClick={() => this.openUpdateForm(businessIdea.id)}>
                                    <i
                                        className="fas fa-edit"
                                        style={{color: "#90B494", fontSize: "25px"}}
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete this idea">
                                <IconButton className={classes.iconBtn} onClick={this.openDeleteDialog}>
                                    <i
                                        className="fas fa-trash-alt"
                                        style={{color: "#C75D5D", fontSize: "25px"}}
                                    />
                                </IconButton>
                            </Tooltip>

                        </Grid>
                    ) : null}

                </CardContent>

                <Dialog
                    keepMounted
                    className={classes.dialog}
                    open={openDeleteDialog}
                    onClose={this.closeDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        style: {
                            // backgroundColor: '#90B494',
                        },
                    }}
                >
                    <Typography variant="h6" className={classes.dialogTitle}>Do you want to discard this business idea ?</Typography>
                    <DialogContent>
                        <Typography variant="subtitle1" className={classes.dialogSubtitle}>
                            If you delete this business idea. All of its information will be permanently delete from the database.
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
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    deleteBI: (id) => dispatch(deleteBI(id)),
});

const mapStateToProps = state => ({
    deleting: state.UI.deleting,
    doneDeleteBI: state.UI.doneDeleteBI
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BITemplateProfile));
