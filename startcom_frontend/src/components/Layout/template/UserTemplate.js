import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';
import defaultUser from '../../../images/default.png';
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    cardWrapper: {
        border: '.5px solid grey',
        "&:hover": {
            cursor: 'pointer',
            border: '.5px solid grey',
        },
    },
    cardContent: {
        padding: '20px 20px 0 20px',
        justifyContent: 'center',
        alignContent: 'center',
    },
    avatar: {
        borderRadius: '50%',
        objectFit: 'cover',
        width: 100,
        height: 100,
        [theme.breakpoints.down('sm')]: {
            width: 85,
            height: 85,
        },
        [theme.breakpoints.down('xs')]: {
            width: 80,
            height: 80,
        }
    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontFamily: theme.font2,
        fontWeight: 700,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },

    title: {
        textTransform: 'inherit',
        fontFamily: theme.font2,
        fontWeight: 700,
        color: theme.color.secondary,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14
        }
    },
    text: {
        fontFamily: theme.font2,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12
        }
    },

});

class UserTemplate extends Component {
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
        const { classes, user, userType } = this.props;
        const { cardElevation } = this.state;
        return (
            <CardActionArea onMouseOver={this.onMouseOver}  onMouseOut={this.onMouseOut}>
                <Card className={classes.cardWrapper} elevation={cardElevation}>
                    <CardContent className={classes.cardContent}>
                        <Grid container className={classes.container}>
                            <img src={user.image ? user.image : defaultUser} className={classes.avatar}/>
                        </Grid>

                        <Grid container className={classes.container}>
                            <Typography className={classes.username} variant='subtitle1' style={{height: 40}}>
                                {user.username ? user.username : user.email}
                            </Typography>
                        </Grid>

                        <Grid container className={classes.container} direction='column' style={{height: 80}}>
                            <Typography variant="subtitle1" className={classes.title}>
                                Occupation
                            </Typography>
                            <Typography variant="subtitle2" className={classes.text}>
                                {user.occupation ? user.occupation : null}
                            </Typography>
                        </Grid>

                        <Grid container className={classes.container} direction='column' style={{height: 80}}>
                            <Typography variant="subtitle1" className={classes.title}>
                                Year of experience
                            </Typography>
                            <Typography variant="subtitle2" className={classes.text}>
                                {user.experience ? user.experience : null }
                            </Typography>
                        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserTemplate));
