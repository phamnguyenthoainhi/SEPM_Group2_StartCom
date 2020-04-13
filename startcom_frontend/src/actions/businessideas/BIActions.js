import {REGISTER_BI, READ_BI} from '../actionTypes';

export const registerBI = (BIData) => dispatch => {
    console.log("test "+ JSON.stringify(BIData));
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/post_business_idea', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
        
    })
    .then(res => res.json())
    .then(() => dispatch(
        fetchBI()
    ))    
}
export const fetchBI = () => dispatch =>  {
   
        fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then (res => res.json())
        .then(businessIdeas => 
            dispatch({
            type: READ_BI,
            payload: businessIdeas
        }))
     
}


