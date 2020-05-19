import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './AdminDashboardStyle.js';
import Backdrop from '@material-ui/core/Backdrop';
import {fetchUnverifiedEmails, VerifiedEmails, deleteUser} from '../../actions/admin/adminActions.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from '../Layout/Navbar.js';


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
            loadingVerify: false,
            deleteLoading: false,
            deleteSuccess: false
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
        if (this.props.deleteLoading !== prevProps.deleteLoading ) {
            this.setState({
                deleteLoading: this.props.deleteLoading
            })
        }
        if (this.props.deleteSuccess !== prevProps.deleteSuccess ) {
            this.setState({
                deleteSuccess: this.props.deleteSuccess
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
        if ((this.props.success !== prevProps.success && this.props.success === true) || (this.props.deleteSuccess !== prevProps.deleteSuccess && this.props.deleteSuccess === true)) {
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

    delete = (id) => {
        this.props.deleteUser(id)
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
            <div >
                 <Navbar/>
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
                                                {/* {this.state.loadingVerify
                                                ? 
                                                (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                                                : */}
                                                <Button className ={classes.verifyBtn} onClick={()=> this.verify(row.id)}>Verify</Button>
                                                {/* } */}
                                                {/* {this.state.deleteLoading
                                                ? 
                                                (<ColorCircularProgress variant="indeterminate" size={32} style={{marginTop: "5%"}}/>)
                                                : */}
                                                <Button className ={classes.deleteBtn} onClick={()=> this.delete(row.id)}>Decline</Button>
                                                {/* } */}

                                            </td>
                                        </tr>))
                                    } 
                                    
                                    
                                </tbody>
                            </table>
                            {this.state.deleteLoading ? 
                            (<Backdrop className={classes.backdrop} open={true} >
                            <ColorCircularProgress variant="indeterminate" size={50} style={{marginTop: "5%"}}/>
                            </Backdrop>) : null}
                            {this.state.loadingVerify ? 
                            (<Backdrop className={classes.backdrop} open={true} >
                            <ColorCircularProgress variant="indeterminate" size={50} style={{marginTop: "5%"}}/>
                            </Backdrop>) : null}

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
                                                Success!
                                                </Typography>
                                </DialogContent>
    
                            </Dialog> 
                            
            </div>
            
            </div>
            
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchUnverifiedEmails: () => dispatch(fetchUnverifiedEmails()),
    VerifiedEmails: (id) => dispatch(VerifiedEmails(id)),
    deleteUser: (id) => dispatch(deleteUser(id))

  
})
const mapStateToProps = state => ({
    unverifiedEmails: state.adminReducer.unverifiedEmails,
    loading: state.adminReducer.emailLoading,
    success: state.adminReducer.verifySuccess,
    loadingVerify: state.adminReducer.loadingVerify,
    deleteLoading: state.adminReducer.deleteLoading,
    deleteSuccess: state.adminReducer.deleteSuccess,
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AdminDashboard));

