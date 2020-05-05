import React, { Component } from 'react';
import { fetchBI, updateBI, searchBI } from "../../actions/businessideas/BIActions";
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  cardWrapper: {
    maxWidth: 275,
    padding: 20

  },
  media: {
    width: "200px",
    height: "100px"
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }

});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },

}));

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
    const { foundIdeas } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes}>
        <div className="container">
          <h1 className=""> Search for An Idea</h1>
          <form id="searchForm">
            <TextField id="standard-basic" label="Search" name='keyword' onChange={this.handleChange} value={this.state.keyword} />
          </form>
          <button className="btn btn-primary btn-bg mt-3" onClick={()=>this.search()}>
            Search
            </button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)((BIsearch));