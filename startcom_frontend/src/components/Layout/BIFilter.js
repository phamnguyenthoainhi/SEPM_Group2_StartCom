import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


class BIFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: '',
            name: "",
            description: "",
            date: "",
            targetFunding: "",
        }
    }
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
    render(){
        return (
            <Autocomplete
              id="grouped-demo"
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
            />
          );
    }
}

export default BIFilter;

