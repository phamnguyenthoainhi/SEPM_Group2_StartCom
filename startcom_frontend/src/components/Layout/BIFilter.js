import React, { Component, useContext } from 'react'
import { fetchBI, deleteBI, updateBI, filterBICategory, filterBIConsultant, filterBIInvestor } from "../../actions/businessideas/BIActions";
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
                <select name="category" id="category" onChange={(e) => this.props.filterBICategory(this.props.businessIdeas, e.target.value)} value={this.state.category}> {this.state.category}
                    <option value= "">All</option>
                    <option value= "techno">Technology</option>
                    <option vlaue= "business">Business</option>
                </select>

                <label>Need Consultant</label>
                <select name="Need Consultant" id="needConsultant" onChange={(e) => this.props.filterBIConsultant(this.props.businessIdeas, e.target.value)} value={this.state.needConsultant}> {this.state.needConsultant}
                    <option value= "">All</option>
                    <option value= "true">Available</option>
                    <option vlaue= "false">UNavailable</option>
                </select>

                <label>Need Investor</label>
                <select name="Need Investor" id="needInvestor" onChange={(e) => this.props.filterBIInvestor(this.props.businessIdeas, e.target.value)} value={this.state.needConsultant}> {this.state.needConsultant}
                    <option value= "">All</option>
                    <option value= "true">Available</option>
                    <option vlaue= "false">UNavailable</option>
                </select>
                
            </div>

        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchBI: () => dispatch(fetchBI()),
    filterBICategory: () => dispatch(filterBICategory()),
    filterBIConsultant: () => dispatch(filterBIConsultant()),
    filterBIInvestor: () => dispatch(filterBIInvestor()),
});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeas.items,
    category: state.businessIdeas.category,
    needConsultant: state.businessIdeas.needConsultant,
    needInvestor: state.businessIdeas.needInvestor
});

export default connect(mapStateToProps, mapDispatchToProps)((BIFilter));

