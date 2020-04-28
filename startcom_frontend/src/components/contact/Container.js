import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './ContactStyle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Contact from './Contact';
class Container extends Component {
    render() {
        const {classes} = this.props;
        
        return (
            <div>
                <Grid container  spacing={2}>
                <Grid item xs={4} className={classes.grid} >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {/* be{bull}nev{bull}o{bull}lent */}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
                <Grid item xs={4} className={classes.grid} >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {/* be{bull}nev{bull}o{bull}lent */}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
                <Grid item xs={4} className={classes.grid}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                        {/* be{bull}nev{bull}o{bull}lent */}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>


                </Grid>
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    // registerBI: (businessIdea) => dispatch(registerBI(businessIdea)),
    // resetRegisterStatus: () => dispatch(resetRegisterStatus())
  
})

const mapStateToProps = state => ({
//   isRegisteredSuccess: state.businessIdeas.isRegisteredSuccess,
//   isRegisteredLoading: state.businessIdeas.isRegisteredLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Container));

