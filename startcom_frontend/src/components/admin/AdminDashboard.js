import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './AdminDashboardStyle.js';

import {fetchUnverifiedEmails, VerifiedEmails} from '../../actions/admin/adminActions.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from "@material-ui/core/CircularProgress";

const ColorCircularProgress = withStyles({
    root: {
      color: '#3C5155'
      
    },
  })(CircularProgress);
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id :'',
            email: '',
            loading: false,
            success: false,
            unverifiedEmails: [],
            open: false,
            loadingVerify: false
        };
        
    }
    componentDidMount() { 
        this.props.fetchUnverifiedEmails();
        
    }
    componentDidUpdate(prevProps) {
        if (this.props.unverifiedEmails !== prevProps.unverifiedEmails ) {
            this.setState({
                unverifiedEmails: this.props.unverifiedEmails
            })
        }
        if (this.props.loadingVerify !== prevProps.loadingVerify ) {
            this.setState({
                loadingVerify: this.props.loadingVerify
            })
        }
        if (this.props.loading !== prevProps.loading) {
            this.setState({
                loading: this.props.loading
            })
        }
        if (this.props.success !== prevProps.success && this.props.success === true) {
            // this.setState({
            //     success: this.props.success
            // })
            console.log('success');
            this.handleClickOpen();
        }
        
    }
    verify = (key) => {
        // this.handleClickOpen()
        this.props.VerifiedEmails(key)
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
        
    };
    handleClose = () => {
        this.setState({
            open: false
        })
        this.props.fetchUnverifiedEmails()
        
        
    
    };


    render() {
        const {classes} = this.props; 
        
        return (
            <div className={classes.container}>
                <Typography className={classes.title}>List of Unverified Investors</Typography>
                {this.state.loading ? 
                    ( 
                    <div className={classes.skeletoncontainer}>
                        
                        <Skeleton className={classes.skeleton} animation="wave" />
                        
                        <Skeleton className={classes.skeleton} animation="wave" />
                        <Skeleton className={classes.skeleton} animation="wave" />
                        
                    

                    </div>
                    ) 
                    :
                    ( 
                        <div className='tablecontainer'>
                            <table className="table">
                                <tbody >
                                    {this.state.unverifiedEmails.map((row) => (
                                        <tr key ={row.id} >
                                            <td component="th" className={classes.cell} style={{paddingLeft: "70px"}}>
                                            {row.email}
                                            </td>
                                            <td style={{textAlign: 'center'}} className={classes.cell}>
                                                {this.state.loadingVerify
                                                ? 
                                                (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                                                :
                                                (<Button className ={classes.verifyBtn} onClick={()=> this.verify(row.id)}>Verify</Button>)
                                                }

                                            </td>
                                        </tr>))
                                    } 
                                    
                                    
                                </tbody>
                            </table>

                        </div>
                        
                    )
                } 
                
                 
                    <Dialog 
                            className={classes.dialog}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                > 
                                <DialogContent>
                                   
                                                <Typography gutterBottom className={classes.text}>
                                                Verify Email Sucessfully!
                                                </Typography>
                                           
                                    
                                </DialogContent>
    
                            </Dialog> 
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchUnverifiedEmails: () => dispatch(fetchUnverifiedEmails()),
    VerifiedEmails: (id) => dispatch(VerifiedEmails(id))

  
})
const mapStateToProps = state => ({
    unverifiedEmails: state.unverifiedEmails.unverifiedEmails,
    loading: state.emailLoading.emailLoading,
    success: state.verifySuccess.verifySuccess,
    loadingVerify: state.loadingVerify.loadingVerify
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AdminDashboard));

