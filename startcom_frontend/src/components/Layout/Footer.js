import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../../images/trans_logo.png';
import withStyles from '@material-ui/core/styles/withStyles'


//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({

    logoContainer: {
        [theme.breakpoints.down('sm')]: {
            textAlign: "center"
        },
    },
    navContainer: {
        marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
            marginTop: 0,
            marginBottom: 15
        }
    },
    mediaContainer: {
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            paddingTop: 15,
        }
    },

    footerWrapper: {
        backgroundColor: theme.color.primary3,
        bottom: 0,
        padding: '30px 50px',
        [theme.breakpoints.down('sm')]: {
            padding: '30px 50px'
        }
    },
    description: {
        marginBottom: 5,
        fontFamily: "'Raleway', sans-serif;",
        fontSize: 14,
        color: theme.color.primary1,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    copyright: {
        fontFamily: "'Raleway', sans-serif;",
        fontSize: 13,
        color: theme.color.primary1,
        textDecoration: 'none',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        "&:focus": {
            textDecoration: 'none',
        },
        "&:hover": {
            textDecoration: 'none',
            color: theme.color.primary1,
        },
    },
    navBtn: {
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        color: theme.color.primary1,
        fontWeight: 600,
        fontSize: 16,
        transition: "all 350ms ease-in-out",
        "&:hover": {
            backgroundColor: "transparent",
            color: theme.color.secondary,
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
    },
    iconBtn: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        "&:hover": {
            textDecoration: 'none',
            backgroundColor: 'transparent',
        },
        "&:focus": {
            textDecoration: 'none',
        },
    }
});


class Footer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.footerWrapper}>
                <Grid item sm={12} md={6} className={classes.logoContainer}>
                    <img src={logo} style={{width: 150, height: 80}} alt='logo'/>

                </Grid>

                <Grid item sm={12} md={6}>
                    <Grid container justify='flex-end' className={classes.navContainer}>
                        <Button className={classes.navBtn} component={Link} to="/displayBIS">Startups</Button>
                        <Button className={classes.navBtn} component={Link} to="/displayConsultants">Consultants</Button>
                        <Button className={classes.navBtn} component={Link} to="/displayInvestors">Investors</Button>
                    </Grid>
                </Grid>

                <Grid item sm={12} md={6}>
                    <Typography paragraph className={classes.description}>
                        A business community provides services for young entrepreneurs
                    </Typography>
                    <Grid item sm={12} md={12} className={classes.copyright}>
                        © 2020 StartCom. All rights reserved. |
                        <a href="/#" className={classes.copyright}> Privacy Policy </a>
                        |
                        <a href="/#" className={classes.copyright}> Terms of Service </a>
                    </Grid>
                </Grid>

                <Grid item sm={12} md={6} className={classes.mediaContainer}>
                    <IconButton href="https://www.facebook.com/" style={{ backgroundColor: "transparent" }}>
                        <i
                            style={{color: "#E3CFB5", fontSize: "25px"}}
                            className="fab fa-facebook-square"/>
                    </IconButton>

                    <IconButton href="https://www.linkedin.com/" className={classes.iconBtn}>
                        <i
                            className="fab fa-linkedin"
                            style={{color: "#E3CFB5", fontSize: "25px"}}
                        />
                    </IconButton>

                    <IconButton href="https://github.com" className={classes.iconBtn}>
                        <i
                            className="fab fa-github-square"
                            style={{color: "#E3CFB5", fontSize: "25px"}}/>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Footer);
