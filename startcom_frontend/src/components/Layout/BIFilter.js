import React, { Component, useContext } from 'react'
import { fetchBI, deleteBI, updateBI } from "../../actions/businessideas/BIActions";

const IdeaContext = React.createContext();

export default class BIFilter extends Component {
    state = {
        ideas: [],
        sortedIdeas: [],
        featuredIdeas: [],
        category: "all",
        targerFunding: 0,
        minFunding: 0,
        maxFunding: 0,
        needConsultant: false,
        needInvestor: false
    };

    componentDidMount() {
        this.props.fetchBI();
        
        let ideas = this.formatData(items)
        let featuredIdeas = ideas.filter(idea => idea.featured === true);
        let maxFunding = Math.max(...ideas.map(idea => idea.targerFunding));

        this.setState({
            ideas,
            featuredIdeas,
            sortedIdeas: ideas,
            targerFunding: maxFunding,
            maxFunding,
        })
    };

    formatData(ideas) {
        let tempIdeas = ideas.map(idea => {
            let name = idea.sys.name;
            let idea = { ...idea.field, name };

            return idea;
        });
        return tempIdeas;
    };

    getIdea = category => {
        let tempIdeas = [...this.state.ideas];
        const idea = tempIdeas.find(idea => idea.category === category);
        return idea;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.category === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                [name]: value
            },
            this.filterIdeas
        );
    };
    filterIdeas = () => {
        let {
            ideas,
            name,
            category,
            description,
            date,
            targetFunding,
            needConsultant,
            needInvestor
        } = this.state;

        let tempIdeas = [...ideas];

        //filter by category 
        if (category !== "all") {
            tempIdeas = tempIdeas.filter(idea => idea.category === category);
        };

        //filter by targetFunding
        tempIdeas = tempIdeas.filter(idea => idea.targerFunding <= targetFunding);

        //filter by consultant
        if (needConsultant) {
            tempIdeas = tempIdeas.filter(idea => idea.needConsultant === true);
        };

        //filter by investor 
        if (needInvestor){
            tempIdeas = tempIdeas.filter(idea => idea.needInvestor === true);
        };
        this.setState({
            sortedIdeas: tempIdeas
        });
    };

    render() {
        const {handleChange, categories} = this.props;
        return (
            <section className = "filter-container">
                <form className ="filter-form">
                    {/*Filter by Category*/}
                    <div>
                        <label>Category</label>
                        <select name = "category" 
                        id ="category" 
                        onChange ={handleChange} 
                        className ="form-control" 
                        value ={categories}> {categories} </select>
                    </div>
                </form>
            </section>
        )
    }
}

//get all unique value
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

const IdeaFilter = ({ideas}) => {
    const context = useContext(IdeaContext);
    const {
        handleChange,
        category,
        name, 
        targerFunding,
        minFunding,
        maxFunding,
        needConsultant,
        needInvestor
    } = context;

    //get unique types
    let categories = getUnique(ideas, "category");
    //add all 
    categories = ["all", ...categories];
    //map
    categories = categories.map((item, index)=>(
        <option key ={index} value ={name}> 
        {name}
        </option>
    ))
}
