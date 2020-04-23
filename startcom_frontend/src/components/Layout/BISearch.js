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

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};


class BIsearch extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      name: '',
      allOrFound: 'all',
      foundIdeas: ""

    };
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });

  };

  updateState(e) {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  handleDetail = (name) => {
    const idea = this.getIdea(name);
    this.setState({})
  };

  //set all and set found value
  setAll = () => { this.setState({ allOrFound: "all" }) };
  setFound = () => { this.setState({ allOrFound: "found" }) };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  searchBI = (name) => {
    let matchingIdeas = this.state.ideas.filter(idea => idea.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    this.setState({ foundIdeas: matchingIdeas })
  }

  backToPageOne = () => { this.child.current.handlePageChange(1) };

  render() {
    let filterIdeas = this.props.ideas;

    const { name } = this.props;
    return (
      <div>
      {/*
        <h5>Search By Name</h5>
        <input list="IdeaList" type="text" placeholder="name" value={name} onChange={this.updateState}></input>
        
        <datalist id="IdeaList">
          {filterIdeas.map(
            (name, i) => <option value={name} key={i}></option>
          )}
        </datalist>

        <button className="btn btn-primary" onClick={() => { filterIdeas.searchBI(name); filterIdeas.setFound(); this.backToPageOne() }}>Search</button>
        <br /><br />
          */}
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchBI: () => dispatch(fetchBI()),
  updateBI: (businessIdea, id) => dispatch(updateBI(businessIdea, id))
});

const mapStateToProps = state => ({
  businessIdeas: state.businessIdeas.businessIdeas,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BIsearch));