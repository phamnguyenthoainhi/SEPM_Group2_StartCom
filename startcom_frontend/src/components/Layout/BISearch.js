import React, { Component } from 'react';
import { searchBI, getAllBIS } from "../../actions/businessideas/BIActions";
import { connect } from 'react-redux';
import style from './BIStyle.js'
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


class BISearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            allOrFound: 'all',
            foundIdeas: [],
            keyword: '',
        };
        this.handleChange = this.handleChange.bind(this);
    };


    componentDidMount() {
        this.props.getAllBIS();
    };


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    search = ()=> {
        this.props.searchBI(this.state.keyword,this.props.businessIdeas)
    };

    resetKeyword = () => {
        this.setState({
            keyword: '',
            name: ''
        })
    };


    render() {
        const { classes } = this.props;
        const { keyword } = this.state;
        return (
            <div>
                <TextField
                    className={classes.searchField}
                    id="outlined-end-adornment"
                    label="Search"
                    name='keyword' fullWidth onChange={this.handleChange} value={keyword}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={()=>this.search()}>
                                <Visibility cursor="pointer"/>
                            </IconButton >
                        </InputAdornment>,
                    }}
                    InputLabelProps={{className: classes.input}}

                />

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAllBIS: () => dispatch(getAllBIS()),
    searchBI: (keyword, businessIdeas) => dispatch(searchBI(keyword,businessIdeas)),

});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeasData.businessIdeas  ,
    foundIdeas: state.businessIdeasData.items,
    name: state.businessIdeasData.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(BISearch));
