import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { fetchConsultant } from "../../actions/consultant/ConsultantAction";

//Material UI
import logo from '../../images/company_logo.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardActions from '@material-ui/core/CardActions';

const styles = (theme) => ({
    cardWrapper: {
        border: '.5px solid grey',
        "&:hover": {
            cursor: 'pointer',
            border: '.5px solid grey',
        },
    },
    cardImage: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '100%',

    },
    cardContent: {
        padding: '10px 20px'
    },
    cardTitle: {
        fontFamily: theme.font2,
        fontWeight: 700,
        lineHeight: 'normal',
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },
    cardDescription: {
        fontFamily: theme.font2,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    cardCategory: {
        fontFamily: theme.font2,
        fontWeight: 700,
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
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'uppercase',
        color: theme.color.secondary,
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 11
        }
    },
    investorFalse: {
        fontFamily: theme.font1,
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'uppercase',
        color: '#C75D5D',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 11
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
        fontFamily: theme.font2,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },
    value: {
        fontFamily: theme.font2,
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    }
    
});


class ConsultantTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: "",
            image: "",
            email: "",
            type: "",
            verified: "",
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };


    render() {
        const { classes, consultant } = this.props;
        const { cardElevation } = this.state;
        return (
            <CardActionArea onMouseOver={this.onMouseOver}  onMouseOut={this.onMouseOut}>
                    <Card className={classes.cardWrapper} elevation={cardElevation}>
                    {consultant.image ? (
                        <CardMedia
                            component="img"
                            alt="Company Logo"
                            height="140"
                            image={consultant.image}
                            title="Company Logo"
                            className={classes.cardImage}
                        >
                        </CardMedia>
                    ) : (
                        <CardMedia
                            component="img"
                            alt="Company Logo"
                            height="140"
                            image={logo}
                            title="Company Logo"
                            className={classes.cardImage}
                        >
                        </CardMedia>
                    )}


                    <CardContent className={classes.cardContent}>

                    <Typography gutterBottom variant="h5" component="h2">
                    {consultant.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                    {consultant.type}
                </Typography>
                <br />
                <Typography variant="subtitle2" color="textSecondary" component="p" gutterBottom>
                    {consultant.email}
                </Typography>
                <br />
                <Typography>
                   {consultant.email}
                </Typography>
                <Typography variant="subtitle2" component="h2">
                   Verify: {consultant.verified}
                </Typography>
                    </CardContent>
                    <CardActions>
                    <Button variant="contained" onClick={this.handleClickOpen}>Contact</Button>
                </CardActions>
                </Card>
            </CardActionArea>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    // updateBI: (businessIdea, id) => dispatch(updateBI(businessIdea, id)),
    // deleteBI: (id) => dispatch(deleteBI(id)),
    fetchConsultant: () => dispatch(fetchConsultant())

});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConsultantTemplate));

