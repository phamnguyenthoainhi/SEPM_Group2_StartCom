import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import logo from '../../images/company_logo.png';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";

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
                <Card className={classes.cardWrapper} elevation={cardElevation}>
                    {idea.image ? (
                        <CardMedia
                            component="img"
                            alt="Company Logo"
                            height="140"
                            image={idea.image}
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
                        {idea.needInvestor ? (
                            <Typography className={classes.investorTrue} variant="subtitle2">
                                Funding
                            </Typography>
                        ) : (
                            <Typography className={classes.investorFalse} variant="subtitle2">
                                Funding Closed
                            </Typography>
                        )}

                        <Grid container style={{height: 150}} direction='column'>
                            <Typography variant="subtitle1" component="h5" className={classes.cardTitle} gutterBottom>
                                {idea.name}
                            </Typography>

                            <Typography variant="subtitle2"  component="p" gutterBottom className={classes.cardDescription}>
                                {idea.description}
                            </Typography>
                        </Grid>

                        <Typography gutterBottom variant="subtitle1" className={classes.cardCategory}>
                            {idea.category}
                        </Typography>

                        <Grid container direction="row" justify='space-between'>
                            <Typography variant="subtitle2" className={classes.cardFunding}>
                                Target Funding:
                            </Typography>
                            <Typography variant="subtitle2" className={classes.value}>
                               ${idea.targetFunding}
                            </Typography>
                        </Grid>

                        {idea.needInvestor ? (
                            <div className={classes.dividerTrue}/>
                        ) : (
                            <div className={classes.dividerFalse}/>
                        )}


                    </CardContent>
                </Card>
            </CardActionArea>
        )
    }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BITemplate));
