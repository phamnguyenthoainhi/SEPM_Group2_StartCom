import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import logo from '../../images/company_logo.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';



const styles = (theme) => ({

    cardWrapper: {
        maxWidth: 'auto',
        minWidth: 'auto',
        minHeight: 400,
        [theme.breakpoints.down('sm')]: {

        },
        "&:hover": {
            cursor: 'pointer',
        },


    },
    cardContent: {
        padding: 20
    },
    cardTitle: {
        fontFamily: theme.font1,
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            fontSize: 22
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 20
        }
    },
    cardDescription: {
        fontFamily: theme.font1,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    cardCategory: {
        fontFamily: theme.font1,
        fontWeight: 600,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },

    investorTrue: {
        fontFamily: theme.font1,
        fontSize: 15,
        fontWeight: 600,
        color: theme.color.secondary,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 13
        }
    },
    investorFalse: {
        fontFamily: theme.font1,
        fontSize: 15,
        fontWeight: 600,
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
    cardFunding: {
        fontFamily: theme.font1,
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },
    dividerTrue: {
        borderRadius: 30,
        padding: 3,
        backgroundColor: theme.color.secondary
    },
    dividerFalse: {
        borderRadius: 30,
        padding: 3,
        backgroundColor: '#C75D5D'
    }


});

class BITemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idea:{
                cardElevation: 1,
            }

        }
    }

    // componentDidMount() {
    //     this.setState({
    //         idea: this.props.idea
    //     })
    // }

    // handleChange = (event) => {
    //     this.setState({[event.target.name]: event.target.value})
    // };

    // handleClickOpen = () => {
    //     this.setState({
    //         open: true
    //     })
    // };
    //
    // handleClose = () => {
    //     this.setState({
    //         open: false
    //     })
    // };

    // delete = () => {
    //     const id = this.props.idea.id;
    //     this.props.deleteBI(id)
    // };

    // submit = () => {
    //     const id = this.props.idea.id;
    //     const businessIdea = {
    //         name: this.state.name,
    //         description: this.state.description,
    //         targetFunding: this.state.targetFunding,
    //         date: this.state.date
    //     };
    //
    //     console.log(`
    //     ID: ${this.props.idea.id}
    //     Name: ${this.state.name}
    //     Description: ${this.state.description}
    //     Target Funding: ${this.state.targetFunding}
    //     Date: ${this.state.date}
    //     `);
    //     this.props.updateBI(businessIdea,id);
    //     this.handleClose()
    // };
    onMouseOver = () => {
        this.setState({
            cardElevation: 8
        })
    };

    onMouseOut = () => {
        this.setState({
            cardElevation: 1
        })
    };


    render() {

        const { classes, idea } = this.props;
        const { cardElevation } = this.state;
        return (
            <CardActionArea onMouseOver={this.onMouseOver}  onMouseOut={this.onMouseOut}>
                <Card className={classes.cardWrapper} elevation={cardElevation} >
                    <CardMedia
                        component="img"
                        alt="Company Logo"
                        height="140"
                        image={logo}
                        title="Company Logo"
                    >

                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        {idea.needInvestor ? (
                            <Typography className={classes.investorTrue} variant="subtitle2" gutterBottom>
                                Funding
                            </Typography>
                        ) : (
                            <Typography className={classes.investorFalse} variant="subtitle2" gutterBottom>
                                Funding Closed
                            </Typography>
                        )}

                        <Typography variant="h5" component="h5" className={classes.cardTitle}>
                            {idea.name}
                        </Typography>
                        <Typography variant="subtitle2"  component="p" gutterBottom className={classes.cardDescription}>
                            {idea.description}
                        </Typography>
                        <br/>
                        <Typography gutterBottom variant="subtitle1" className={classes.cardCategory}>
                            {idea.category}
                        </Typography>
                        {idea.needConsultant ? (
                            <Chip
                                className={classes.consultantTrue}
                                label="Consultancy Required"
                            />
                            ) : (
                            <Chip
                                className={classes.consultantFalse}
                                label="Consultancy Occupied"/>
                        )}

                        <Typography variant="subtitle1" className={classes.cardFunding}>
                            Target Funding: $ {idea.targetFunding}
                        </Typography>
                        <div className={classes.dividerTrue}></div>
                    </CardContent>
                </Card>
            </CardActionArea>


        )
    }
}

const mapDispatchToProps = dispatch => ({
    // updateBI: (businessIdea,id) => dispatch(updateBI(businessIdea,id)),
    // deleteBI: (id) => dispatch(deleteBI(id))
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BITemplate));
