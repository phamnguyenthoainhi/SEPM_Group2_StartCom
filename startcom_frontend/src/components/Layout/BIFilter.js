import React, { Component } from 'react'
import { filterBI, resetFilter, getAllBIS} from "../../actions/businessideas/BIActions";
import { connect } from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles';
import style from './BIStyle.js';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
const CustomCheckbox = withStyles({
    root: {
        color: '#718F94',
        '&$checked': {
            color: '#E3CFB5',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
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
        this.props.getAllBIS();
        if (this.props.businessIdeas !== undefined){
            this.props.businessIdeas.forEach(idea=>{
                // console.log(idea.category)
                if(!this.state.categories.includes(idea.category)){
                    const current  = this.state.categories
                    current.push(idea.category)
                    this.setState({
                        categories:current
                    })
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
    };

    handleChange = (e) =>{
        let current = [];
        switch (e.target.name){
            case 'investor':
                current = this.state.investor;
                break
            case 'consultant':
                current=this.state.consultant;
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
        const {checkedCategories,consultant,investor,sort} = this.state;
        this.props.filterBI(checkedCategories, consultant,investor, sort, this.props.businessIdeas)
    };

    resetFilter = ()=>{
        this.setState({
            consultant: ["needed","not needed"],
            investor: ["needed","not needed"],
            checkedCategories:[],
            sort: ''
        });
        this.props.resetFilter()
    }

    render() {
        const {classes} = this.props
        const {categories, checkedCategories, investor,consultant} = this.state

        return (

            <div className={classes.filtercontainer}>
                <div className={classes.category}>
                    <label className={classes.filterlabel}>Idea Category</label>
                    {categories.map((category,index)=>{
                        return (
                            <div key={index}>
                                <label>
                                    <CustomCheckbox onChange={this.handleChangeCategories} type="checkbox" name="checkedCategory" value={category} checked={checkedCategories.includes(category)} />{`${category}`}</label>
                            </div>
                        )
                    })}
                </div>
                <Divider  variant="middle" />

                <div className={classes.category}>
                    <label className={classes.filterlabel}>Consultant</label>
                    <div><label><CustomCheckbox onChange={this.handleChange} type='checkbox' name='consultant' value='needed' checked={consultant.includes('needed')} />Needed</label>
                    </div>
                    <div><label><CustomCheckbox onChange={this.handleChange} type = 'checkbox'  name ='consultant' value='not needed' checked={consultant.includes('not needed')} />Not Needed</label>
                    </div>
                </div>

                <Divider  variant="middle" />
                <div className={classes.category}>
                    <label className={classes.filterlabel}>Investor</label>
                    <div><label><CustomCheckbox onChange={this.handleChange} type='checkbox' name='investor' value='needed' checked={investor.includes('needed')} />Needed</label>
                    </div>
                    <div><label><CustomCheckbox onChange={this.handleChange} type = 'checkbox'  name ='investor' value='not needed' checked={investor.includes('not needed')} />Not Needed</label>
                    </div>
                </div>

                <Divider  variant="middle" />
                <div className={classes.category}>
                    <label className={classes.filterlabel}>Sort</label><br/>
                    <div><label><CustomCheckbox type='checkbox' onChange={this.handleChangeSorting} name='sort' value='nameAscending' checked={this.state.sort==='nameAscending'} />Name A-Z</label></div>
                    <div><label><CustomCheckbox type='checkbox' onChange={this.handleChangeSorting} name='sort' value='nameDescending' checked={this.state.sort==='nameDescending'} />Name Z-A</label></div>
                    <div><label><CustomCheckbox type='checkbox' onChange={this.handleChangeSorting} name='sort' value='ascending' checked={this.state.sort==='ascending'} />Target Funding: Ascending</label></div>
                    <div><label><CustomCheckbox type='checkbox' onChange={this.handleChangeSorting} name='sort' value='descending' checked={this.state.sort==='descending'} />Target Funding: Descending</label></div>
                </div>
                <Divider  />
                <Grid container direction='row' style={{padding: 20}} justify='space-evenly'>
                    <Button className={classes.setBtn} onClick= {()=> this.resetFilter()}>Reset Filter</Button>
                    <Button className={classes.filterBtn} onClick={()=> this.filter()}>Apply Filter</Button>
                </Grid>


                <Divider  />
                {/*<div style={{textAlign: "center"}}><Button variant="outlined"  >Apply</Button></div>*/}

            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    getAllBIS: () => dispatch(getAllBIS()),
    filterBI: (categories, consultant,investor, sort, businessIdeas) => dispatch(filterBI(categories,consultant,investor,sort, businessIdeas)),
    resetFilter: ()=> dispatch(resetFilter())
});

const mapStateToProps = state => ({
    businessIdeas: state.businessIdeasData.businessIdeas,

    // category: state.businessIdeasData.category,
    // needConsultant: state.businessIdeas.needConsultant,
    // needInvestor: state.businessIdeas.needInvestor,
    // foundIdeas: state.businessIdeasData.items
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(BIFilter));
