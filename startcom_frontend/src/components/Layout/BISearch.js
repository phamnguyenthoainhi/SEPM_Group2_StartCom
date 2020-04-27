/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { fetchBI, updateBI } from "../../actions/businessideas/BIActions";
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
      keywords: [],
    };
    this.handleChange = this.handleChange.bind(this);
    // this.searchByname = this.searchByname.bind(this);
  };
  

  componentDidMount() {
    this.props.fetchBI();
  };

  componentDidUpdate(prevProps) {
    console.log(JSON.stringify(this.props.businessIdeas))
    if (this.props.businessIdeas !== prevProps.businessIdeas) {
      this.setState({
        keywords: this.props.businessIdeas
      })
    }
  };

  // searchByname = (name) => {
  //   let businessIdeas = this.state.keywords.filter(businessIdea => businessIdea.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  //   console.log(businessIdeas)
  //   return businessIdeas;
  //   // const id = this.props.sortedIdeas.id;
  // };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  backToPageOne = () => { this.child.current.handlePageChange(1) };

  render() {
    // console.log(this.searchByname("hello"));
    // console.log(this.searchByname("test"));
    const { classes } = this.props;

    return (
      <div className={classes}>
        <div className="container">
          <h1 className=""> Search for An Idea</h1>
          <form id="searchForm">
            <TextField id="standard-basic" label="Standard" onChange={this.props.handleChange} value={this.props.name} />
            <button type="submit" className="btn btn-primary btn-bg mt-3" onClick={this.props.triggerParentUpdate}>
              Search
            </button>

          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchBI: () => dispatch(fetchBI()),

});

const mapStateToProps = state => ({
  businessIdeas: state.businessIdeas.businessIdeas,
});

export default connect(mapStateToProps, mapDispatchToProps)((BIsearch));