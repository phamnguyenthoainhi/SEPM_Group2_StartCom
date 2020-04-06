import React, { Component } from 'react'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body:''

        }
    }


    render() {
       
        return (
            <div> 
                <h1>Add</h1>
                <form>

                    <label>Title:</label> <br/>
                    <input type ='text' name='title'/> <br/>
                    <label>Body:</label> <br/>
                    <textarea name='body' /><br/>
                    <button type ='submit'> Add</button>
                </form>
                
            </div>
        )
    }
}

export default PostForm;
