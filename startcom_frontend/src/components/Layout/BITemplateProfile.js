import React, { Component} from 'react';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles'

//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import defaultLogo from "../../images/company_logo.png";
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";




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
    },
    header: {
        fontFamily: theme.font2,
        fontWeight: 700,
    },


});

class BITemplateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes, businessIdea } = this.props;
        return (
            <Card elevation={3} className={classes.ideaCard}>
                <CardContent style={{padding: '10px 30px'}}>
                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Image:
                            </Typography>
                        </Grid>

                        <Grid item md={8}>
                            {businessIdea.image === '' ? (
                                    <img src={defaultLogo} className={classes.ideaImage}/>
                                ) :
                                <img src={businessIdea.image} className={classes.ideaImage} />
                            }
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Name:
                            </Typography>
                        </Grid>

                        <Grid item md={8}>
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

                        <Grid item md={8}>
                            <Typography className={classes.text}>
                                {businessIdea.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Date created:
                            </Typography>
                        </Grid>

                        <Grid item md={8}>
                            <Typography className={classes.text}>
                                {businessIdea.date}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Category:
                            </Typography>
                        </Grid>

                        <Grid item md={8}>
                            <Typography className={classes.text}>
                                {businessIdea.category}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.ideaContainer} direction='row'>
                        <Grid item md={4} sm={4} xs={4} lg={4}>
                            <Typography className={classes.header} >
                                Status:
                            </Typography>
                        </Grid>

                        <Grid item md={8}>
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

                        <Grid item md={8}>
                            <Typography className={classes.text}>
                                ${businessIdea.targetFunding}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BITemplateProfile));
