import React, { Component } from 'react'
//import { connect } from 'react-redux';
//import { fetchBI, registerBI, resetRegisterStatus, updateBI } from '../../../actions/businessideas/BIActions';
//import BITemplate from '../../Layout/BITemplate';
import { IdeaConsumer } from "../../../context";

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
//import { withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader'; 

const styles = (theme) => ({
    gridContainer: {
        padding: 20
    },
});

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    padding: 20
});

const classes = useStyles();

class DisplayBIS extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: ' ',
            description: '',
            imgSc: '',
            targetFunding: '',
            needInvestor: false,
            needConsultant: false,
        };
    };

    render() {
        const { name, date, description, targetFunding, needInvestor, needConsultant, imgSc } = this.props.idea;

        return (
            <Grid container className={classes.gridContainer}>
                <IdeaConsumer>
                    <Card>
                        {/*Picture of the card*/}
                        <CardMedia style ={{height : "150px"}}
                            className={classes.media}
                            image={imgSc}
                        />

                        {/*Header and name of the card*/}
                        <CardHeader
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            } name={name} />

                        {/*content of the card*/}
                        <CardContent>
                            <Typography description={description} />
                            <Typography targetFunding={targetFunding} />
                            <Typography date={date} />
                        </CardContent>


                        
                        {/*Button of the card*/}
                        <CardActions>
                            <Button size="small" color="primary"> Book Now</Button>
                        </CardActions>
                    </Card>
                </IdeaConsumer>
            </Grid>

        )
    }
}

// const mapDispatchToProps = dispatch => ({
//     fetchBI: () => dispatch(fetchBI()),
//     updateBI: (businessIdea, id) => dispatch(updateBI(businessIdea, id))
// });

// const mapStateToProps = state => ({
//     businessIdeas: state.businessIdeas.businessIdeas,

// });
export default DisplayBIS;


// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayBIS));
