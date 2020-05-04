import React, { Component} from 'react';
import { Link } from "react-router-dom";
// import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles'
// import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../../images/trans_logo.png';
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Grid from "@material-ui/core/Grid";


const styles = (theme) => ({
    appBar: {
        backgroundColor: theme.color.primary3,
        position: 'relative',
    },
    toolbar: {
        backgroundColor: theme.color.primary3,
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
    },
    drawerPaper: {
        backgroundColor: theme.color.secondary,
        padding: 30,
    },
    mobileNavText: {
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        color: theme.color.primary3,
        fontSize: 20,
        fontWeight: 600,
    },
    mobileNavBtn: {
        justifyContent: 'center',
        padding: 10
    }
});


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false
        }
    }

    toggleDrawer = () => {
        this.setState({
            openDrawer: !this.state.openDrawer
        })
    };

    render() {
        const { classes } = this.props;
        const { openDrawer} = this.state;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Button
                        component={Link}
                        to="/#"
                        className={classes.logoBtn}
                    >
                        <img src={logo} alt="logo" style={{ width: 150, height: 80}}/>
                    </Button>
                    <Hidden only={['sm', 'xs']}>
                        <Button className={classes.navBtn} component={Link} to="/dashboard">Dashboard</Button>
                        <Button className={classes.navBtn} component={Link} to="/startups">Startups</Button>
                        <Button className={classes.navBtn} component={Link} to="/consultants">Consultants</Button>
                        <Button className={classes.navBtn} component={Link} to="/investors">Investors</Button>
                       
                            {(sessionStorage.getItem("id") !== null && sessionStorage.getItem("id") !== undefined && sessionStorage.getItem("id") !== '') ?
                            "Logout": "Sign Up"
                        }
                         <Button variant='outlined' className={classes.signUpBtn} component={Link} to="/auth">Sign Up
                            
                            </Button>
                    </Hidden>

                    <Hidden mdUp>
                        <IconButton style={{color: "#E3CFB5"}} onClick={this.toggleDrawer}>
                            <MenuRoundedIcon style={{fontSize: 40}}/>
                        </IconButton>
                        <Drawer
                            anchor='top'
                            variant="temporary"
                            open={openDrawer}
                            onClose={this.toggleDrawer}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <Grid container justify="flex-end">
                                <IconButton onClick={this.toggleDrawer}>
                                    <CloseRoundedIcon style={{fontSize: 30, color: "#3C5155"}} />
                                </IconButton>
                            </Grid>
                            <List>
                                <ListItem button component={Link} to="/dashboard" className={classes.mobileNavBtn}>
                                    <Typography className={classes.mobileNavText}>Dashboard</Typography>
                                </ListItem>
                                <ListItem button component={Link} to="/startups" className={classes.mobileNavBtn}>
                                    <Typography className={classes.mobileNavText}>Startups</Typography>
                                </ListItem>
                                <ListItem button component={Link} to="/consultants" className={classes.mobileNavBtn}>
                                    <Typography className={classes.mobileNavText}>Consultants</Typography>
                                </ListItem>
                                <ListItem button component={Link} to="/investors" className={classes.mobileNavBtn}>
                                    <Typography className={classes.mobileNavText}>Investors</Typography>
                                </ListItem>
                            </List>
                        </Drawer>
                    </Hidden>
                </Toolbar>
            </AppBar>


        )
    }
}

export default withStyles(styles)(Navbar);