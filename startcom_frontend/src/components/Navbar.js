import React, { Component} from 'react';
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../images/trans_logo.png';


const styles = (theme) => ({
    toolbar: {
        backgroundColor: theme.color.primary3,
        padding: '0 50px'
    },
    logoBtn: {
        textDecoration: 'none',
        outline: 'none',
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },
        marginRight: 'auto'
    },
    navBtn: {
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        color: theme.color.primary1,
        fontWeight: 600,
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
    signUpBtn: {
        marginLeft: 'auto',
        outline: "none",
        textDecoration: "none",
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        transition: "all 350ms ease-in-out",
        color: theme.color.primary3,
        backgroundColor: theme.color.primary1,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: theme.color.secondary,
            color: theme.color.primary2
        },
    }

});



class Navbar extends Component {
    render() {
        const { classes } = this.props;
        return(
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Button
                        component={Link}
                        to="/#"
                        className={classes.logoBtn}
                    >
                        <img src={logo} alt="logo" style={{ width: 150, height: 80}}/>
                    </Button>
                    <Button className={classes.navBtn} component={Link} to="/dashboard">Dashboard</Button>
                    <Button className={classes.navBtn} component={Link} to="/startups">Startups</Button>
                    <Button className={classes.navBtn} component={Link} to="/consultants">Consultants</Button>
                    <Button className={classes.navBtn} component={Link} to="/investors">Investors</Button>
                    <Button variant='outlined' className={classes.signUpBtn} component={Link} to="/signup">Sign Up</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar);
