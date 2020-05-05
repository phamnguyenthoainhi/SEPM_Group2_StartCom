import React, { Component, useContext } from 'react'
import { fetchBI, deleteBI, updateBI, filterBI, resetFilter } from "../../actions/businessideas/BIActions";
import { connect } from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles';

// const IdeaContext = React.createContext();

class BIFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            consultant: ["needed","not needed"],
            investor: ["needed","not needed"],
            checkedCategories:[],
            sort: ''
        };
//        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchBI();
        
        if (this.props.businessIdeas !== undefined){
            
            this.props.businessIdeas.forEach(idea=>{
                console.log(idea.category)
                if(!this.state.categories.includes(idea.category)){
                    const current  = this.state.categories
                    current.push(idea.category)
                    this.setState({
                        categories:current
                    })
                }
                else{
                    return
                }
            })
        }

    };

    componentDidUpdate(prevProps) {
        if (this.props.businessIdeas !== prevProps.businessIdeas) {
            
            if (this.props.businessIdeas !== undefined){
                this.props.businessIdeas.forEach(idea=>{
                    if(!this.state.categories.includes(idea.category)){
                        const current  = this.state.categories
                        current.push(idea.category)
                        this.setState({
                            categories:current
                        })
                    }
                    else{
                        return
                    }
                })
            }
        }
    };

    handleChangeCategories = (e)=>{
        const current = this.state.checkedCategories
        if(current.includes(e.target.value)){
            const index = current.indexOf(e.target.value)
            current.splice(index,1)
            this.setState({
                [e.target.name]:current
            })
        }
        else{
            current.push(e.target.value)
            this.setState({
                [e.target.name]:current
            })
        }
    }

    handleChange = (e) =>{
        var current = []
        switch (e.target.name){
            case 'investor':
                current = this.state.investor
                break
            case 'consultant':
                current=this.state.consultant
                break
        }
        
        if(current.includes(e.target.value)){
            if(current.length === 1){
                return
            }
            const index = current.indexOf(e.target.value)
            current.splice(index,1)
            this.setState({
                [e.target.name]:current
            })
        }
        else{
            current.push(e.target.value)
            this.setState({
                [e.target.name]:current
            })
        }
    }

    handleChangeSorting = (e)=>{
        if(e.target.value === this.state.sort){
            this.setState({
                [e.target.name]:''
            })
        }
        else{
            this.setState({
                [e.target.name]:e.target.value
            })
        }
        
    }

    filter = ()=>{
        const {checkedCategories,consultant,investor,sort} = this.state
        this.props.filterBI(checkedCategories, consultant,investor, sort, this.props.businessIdeas)
    }

    resetFilter = ()=>{
        this.setState({
            consultant: ["needed","not needed"],
            investor: ["needed","not needed"],
            checkedCategories:[],
            sort: ''
        })
        this.props.resetFilter()
    }

    render() {
        const {foundIdeas} = this.props
        const {categories, checkedCategories, investor,consultant} = this.state

        return (

            <div>
                <label>Idea Category</label>
                {categories.map((category,index)=>{
                    return (
                        <div key={index}>
                            <label>
                            <input onChange={this.handleChangeCategories} type="checkbox" name="checkedCategory" value={category} checked={checkedCategories.includes(category)} />{`${category}`}</label>
                        </div>
                    )
                })}

                

                <label>Consultant</label>
                <div><label><input onChange={this.handleChange} type='checkbox' name='consultant' value='needed' checked={consultant.includes('needed')} />Needed</label>
                </div>
                <div><label><input onChange={this.handleChange} type = 'checkbox'  name ='consultant' value='not needed' checked={consultant.includes('not needed')} /> Not Needed</label>
                </div>

                <label>Investor</label>
                <div><label><input onChange={this.handleChange} type='checkbox' name='investor' value='needed' checked={investor.includes('needed')} />Needed</label>
                </div>
                <div><label><input onChange={this.handleChange} type = 'checkbox'  name ='investor' value='not needed' checked={investor.includes('not needed')} /> Not Needed</label>
                </div>

                <label>Sort</label>
                <div><label><input type='checkbox' onChange={this.handleChangeSorting} name='sort' value='nameAscending' checked={this.state.sort==='nameAscending'} />Name A-Z</label></div>
                <div><label><input type='checkbox' onChange={this.handleChangeSorting} name='sort' value='nameDescending' checked={this.state.sort==='nameDescending'} />Name Z-A</label></div>
                <div><label><input type='checkbox' onChange={this.handleChangeSorting} name='sort' value='ascending' checked={this.state.sort==='ascending'} />Target Funding: Ascending</label></div>
                <div><label><input type='checkbox' onChange={this.handleChangeSorting} name='sort' value='descending' checked={this.state.sort==='descending'} />Target Funding: Descending</label></div>

                <button onClick={()=>this.filter()}>Filter</button>
                <button onClick= {()=>this.resetFilter()}>Reset Filter</button>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchBI: () => dispatch(fetchBI()),
    filterBI: (categories, consultant,investor, sort, businessIdeas) => dispatch(filterBI(categories,consultant,investor,sort, businessIdeas)),
    resetFilter: ()=> dispatch(resetFilter())
});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeas.businessIdeas,
    category: state.businessIdeas.category,
    needConsultant: state.businessIdeas.needConsultant,
    needInvestor: state.businessIdeas.needInvestor,
    foundIdeas: state.businessIdeas.items
});

export default connect(mapStateToProps, mapDispatchToProps)((BIFilter));

