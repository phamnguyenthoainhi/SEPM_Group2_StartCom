import React, { Component } from 'react';
import _ from 'lodash'

const IdeaUrl = "https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas";

const IdeaContext = React.createContext();

class IdeaProvider extends Component {
    state = {
        ideas: [],
        sortedIdea: [],

        ideaDate: [],
        ideaDetails: {},
        foundIdeas: [],
        IdeaTypeId: [],
        featureIdea:[],
        IdeaCategory: 'all',
        imgSc: "",

        allOrFound: 'all',
        needConsultant: false,
        needInvestor: false
    };

    setIdeas = () => {
        fetch(IdeaUrl)
            .then(res => res.json())
            .then(res => res.filter(
                idea =>
                    idea.name &&
                    idea.description &&
                    idea.date &&
                    idea.imgSc &&
                    idea.needConsultant &&
                    idea.needInvestor &&
                    idea.targetFunding
            ))
            .then(res => this.setState({ ideas: res, foundIdeas: res }))
    };

    setIdeaTypes = () => {
        fetch(IdeaUrl)
            .then(res => res.json())
            .then(res => res.filter(
                category =>
                    category.name
            ))
            .then(res => this.setState({ categories: res }));
    };

    setAll = () => { this.setState({ allOrFound: 'all' }) };
    setFound = () => { this.setState({ allOrFound: 'found' }) };

    componentDidMount() {
        this.setIdeas();
        this.setIdeaTypes();
    }

    //Get an idea
    getItem = (name) => this.state.ideas.find(item => item.name === name);

    //Display ideas
    handleDetail = (name) => {
        const idea = this.getItem(name);
        this.setState({ ideaDetails: idea })
    };

    handleChange = event => {
        const target = event.target;
        const value = target.IdeaCategory === "checkbox" ? target.checked : target.value;
        const name = target.name;
        console.log(name, value);
        this.setState(
            {
                [name]: value
            },
            this.filterIdeas
        );
    }

    searchIdeaName = (name) => {
        let matchingIdeas = this.state.ideas.filter(idea => idea.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        this.setState({ foundIdeas: matchingIdeas })
    };

    filterIdeas = () => {
        let {
            ideas,
            IdeaCategory,
            date,
            name,
            needConsultant,
            needInvestor,
            targetFunding
        } = this.state;

        let tempIdeas = [...ideas];
        targetFunding = parseInt(targetFunding);

        //filter by target funding
        tempIdeas = tempIdeas.filter(idea => idea.targetFunding <= targetFunding);

        //filter by category
        if (IdeaCategory !=="all"){
            tempIdeas = tempIdeas.filter (idea =>idea.IdeaCategory === IdeaCategory)
        }

        //filter by consultant
        if (needConsultant){
            tempIdeas = tempIdeas.filter(idea => idea.needConsultant === true);            
        }

        //filter by investor
        if (needInvestor){
            tempIdeas = tempIdeas.filter(idea => idea.needInvestor === true);            
        }
        this.setState({
            sortedIdea: tempIdeas
        });
    };

    render() {
        return (
            <IdeaContext.Provider vaulue={{
                ...this.state,
                setIdeas: this.setIdeas,
                setAll: this.setAll,
                setFound: this.setFound,
                handleDetail: this.handleDetail,
                handleChange: this. handleChange,
                searchIdeaName: this.searchIdeaName,
                getItem: this.getItem,
                filterIdeas: this.filterIdeas
                
            }}>
                {this.props.children}
            </IdeaContext.Provider>
        )
    }
}

//define the Consumer 
const IdeaConsumer= IdeaContext.Consumer;

//Export both Provider and Consumer
export {IdeaConsumer, IdeaProvider};