import React, { Component} from 'react';
import { Link } from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../../images/trans_logo.png';
import defaultUser from '../../images/default.png';
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Grid from "@material-ui/core/Grid";
import {adminId} from '../../actions/admin/authorization';
import {getUser} from "../../actions/users/UserActions";
import Menu from "@material-ui/core/Menu";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const styles = (theme) => ({
    appBar: {
        backgroundColor: theme.color.primary3,
        position: 'relative',
        justifyContent: 'center'
    },
    toolbar: {
        backgroundColor: theme.color.primary3,
        padding: "0 50px"
    },
    logoBtn: {
        // marginRight: 'auto',
        textDecoration: 'none',
        outline: 'none',
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&:focus": {
            outline: "none",
            border: "none"
        },

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
    btnGroupContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm','xs')]: {
            justifyContent: 'space-between'
        },
    },
    avatarBtnContainer: {
        justifyContent: 'flex-end'
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
    },
    popoverMenu: {
        width: 300,
        height: 300
    },
    text: {
        fontFamily: "'Raleway', sans-serif;",
        textTransform: "inherit",
        color: theme.color.primary1,
        fontSize: 15,
        fontWeight: 600,
    },


});

const StyledMenu = withStyles({
    paper: {
        backgroundColor: '#3C5155',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
            image: '',
            anchorEl: null,
            open: false
        }
    }

    componentDidMount() {
        const userID = sessionStorage.getItem("id");
        this.props.getUser(userID)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user !== prevProps.user) {
            this.setState({
                image: this.props.user.image,
            })
        }
    }

    toggleDrawer = () => {
        this.setState({
            openDrawer: !this.state.openDrawer
        })
    };

    toggleMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
            open: !this.state.open
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: false
        })
    };

    logout = () => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("type");
        sessionStorage.removeItem("token");
        window.location.reload()
    };

    render() {
        const { classes } = this.props;
        const { openDrawer, anchorEl, open } = this.state;
        const auth = sessionStorage.getItem("token");
        const userID = sessionStorage.getItem("id");

        return (
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Grid container direction='row' className={classes.btnGroupContainer}>
                        <Grid item md={3}>
                            <Button
                                component={Link}
                                to="/"
                                className={classes.logoBtn}
                            >
                                <img src={logo} alt="logo" style={{ width: 150, height: 80}}/>
                            </Button>
                        </Grid>

                        <Grid item md={6}>
                            <Grid container justify='center'>
                                <Hidden only={['sm', 'xs']}>
                                    <Button className={classes.navBtn} component={Link} to="/displayBIS">Startups</Button>
                                    <Button className={classes.navBtn} component={Link} to="/displayConsultants">Consultants</Button>
                                    <Button className={classes.navBtn} component={Link} to="/displayInvestors">Investors</Button>
                                    {userID === adminId ?  <Button className={classes.navBtn} component={Link} to="/admin">Verify Board</Button> : null}
                                </Hidden>
                            </Grid>
                        </Grid>

                        <Grid item md={3}>

                                <Hidden only={['sm', 'xs']}>
                                    {(userID !== null && userID !== undefined && userID !== '') ?

                                        (
                                            <Grid container className={classes.avatarBtnContainer}>
                                                <IconButton onClick={this.toggleMenu}>
                                                    <Avatar
                                                        src={this.state.image ? this.state.image : defaultUser}
                                                    />
                                                </IconButton>

                                                <StyledMenu
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={this.handleClose}
                                                >
                                                    <MenuItem
                                                        to={this.props.user.type !== 'startupowner' ? `/profile/${this.props.user.type}/${this.props.user.id}` : "/profile"}

                                                        component={Link} >
                                                        <ListItemIcon>
                                                            <AccountBoxIcon style={{color: '#E3CFB5'}}/>
                                                        </ListItemIcon>
                                                        <Typography className={classes.text}>My Profile</Typography>
                                                    </MenuItem>

                                                    <MenuItem onClick={() => this.logout()}>
                                                        <ListItemIcon>
                                                            <ExitToAppIcon style={{color: '#E3CFB5'}}/>
                                                        </ListItemIcon>
                                                        <Typography className={classes.text}>Logout</Typography>
                                                    </MenuItem>
                                                </StyledMenu>
                                            </Grid>

                                        ) :  (
                                            <Grid container justify='center'>
                                                <Button variant='outlined' className={classes.signUpBtn} component={Link} to="/auth">Login</Button>
                                            </Grid>
                                        )
                                    }
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
                                            <ListItem button component={Link} to="/startups" className={classes.mobileNavBtn}>
                                                <Typography className={classes.mobileNavText}>Startups</Typography>
                                            </ListItem>
                                            <ListItem button component={Link} to="/consultants" className={classes.mobileNavBtn}>
                                                <Typography className={classes.mobileNavText}>Consultants</Typography>
                                            </ListItem>
                                            <ListItem button component={Link} to="/investors" className={classes.mobileNavBtn}>
                                                <Typography className={classes.mobileNavText}>Investors</Typography>
                                            </ListItem>

                                            {auth ?  <ListItem button component={Link} to="/profile" className={classes.mobileNavBtn}>
                                                <Typography className={classes.mobileNavText}>My Profile</Typography>
                                            </ListItem> : null}

                                            {auth ?  <ListItem button className={classes.mobileNavBtn}>
                                                <Typography className={classes.mobileNavText} style={{color: '#C75D5D'}}>Logout</Typography>
                                            </ListItem> : null}


                                            {userID === adminId ?  <ListItem button component={Link} to="/investors" className={classes.mobileNavBtn}>
                                                <Typography className={classes.mobileNavText}>Verify Board</Typography>
                                            </ListItem> : null}
                                        </List>
                                    </Drawer>
                                </Hidden>

                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>


        )
    }
}
const mapDispatchToProps = dispatch => ({
    getUser: (id) => dispatch(getUser(id))
});

const mapStateToProps = (state) => ({
    user: state.usersReducer.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
