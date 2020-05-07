import React, { Component } from 'react';
import { fetchBI, updateBI, searchBI } from "../../actions/businessideas/BIActions";
import { connect } from 'react-redux';
import style from './BIStyle.js'
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
//import SearchBar from 'material-ui-search-bar';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Visibility from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


class BIsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      allOrFound: 'all',
      foundIdeas: [],
      keyword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    // this.searchByname = this.searchByname.bind(this);
  };


  componentDidMount() {
    this.props.fetchBI();
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  backToPageOne = () => { this.child.current.handlePageChange(1) };

  search = ()=>{
    this.props.searchBI(this.state.keyword,this.props.businessIdeas)
  }

  render() {
    // console.log(this.searchByname("hello"));
    // console.log(this.searchByname("test"));
    
    const { classes } = this.props;

    return (
      <div>
          <TextField
          className={classes.searchfield}
          id="outlined-end-adornment"
          label="Search"
          name='keyword' fullWidth onChange={this.handleChange} value={this.state.keyword} 
          InputProps={{
            endAdornment: <InputAdornment position="end">
                  <IconButton>
                  <Visibility onClick={()=>this.search()}/>
                  </IconButton >
              </InputAdornment>,
          }}
          
        />

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchBI: () => dispatch(fetchBI()),
  searchBI: (keyword, businessIdeas) => dispatch(searchBI(keyword,businessIdeas)),
  filterBICategory: () => dispatch()


});

const mapStateToProps = state => ({
  businessIdeas: state.businessIdeas.businessIdeas  ,
  foundIdeas: state.businessIdeas.items,
  name: state.businessIdeas.name,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(BIsearch));