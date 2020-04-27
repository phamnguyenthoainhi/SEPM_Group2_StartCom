import React, { Component, useContext } from 'react'
import { fetchBI, deleteBI, updateBI } from "../../actions/businessideas/BIActions";
import { connect } from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles';

const IdeaContext = React.createContext();

class BIFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ideas: [],
            items: [],
            sortedIdeas: [],
            foundIdeas: [],
            category: "",
            targerFunding: "",
            minFunding: "",
            maxFunding: "",
            needConsultant: false,
            needInvestor: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchBI();

    };

    componentDidUpdate(prevProps) {
        console.log(JSON.stringify(this.props.businessIdeas))
        if (this.props.businessIdeas !== prevProps.businessIdeas) {
            this.setState({
                items: this.props.businessIdeas
            })
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    // getIdea = category => {
    //     console.log("abcxyz")
    //     // let tempIdeas = this.state.ideas;
    //     const idea = this.state.items.find(idea => idea.category === category);
    //     console.log(idea)
    //     return idea;

    // };

    //filter Idea by Category
    filterCategory = (category) => {
        const sortedIdeas = this.state.items.filter(idea => idea.category === category);
        return sortedIdeas;
    };

    //filter idea by target funding
    filterTargerFunding = (minFunding, maxFunding) => {
        let sortedIdeas = this.state.items.filter(idea => parseFloat(idea.targerFunding) >= minFunding && parseFloat(idea.targerFunding) <= maxFunding);
        return sortedIdeas;

    };

    //filter idea by consultants 
    filterConsultant = (needConsultant) => {
        let sortedIdeas = this.state.items.filter(idea => idea.needConsultant === true);
        return sortedIdeas;
    };

    //filter idea by investor 
    filterInvestor = (needInvestor) => {
        let sortedIdeas = this.state.items.filter(idea => idea.needInvestor === true);
        return sortedIdeas;
    };

    render() {

        return (
            <div>
                <label>Idea Category</label>
                <select name="category" id="category" onChange={this.handleChange} value={this.state.category}> {this.state.category}</select>
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

export default connect(mapStateToProps, mapDispatchToProps)((BIFilter));

