import React, { Component } from 'react'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []

        }
    }


    render() {
       
        return (
            <div> 
                <h1>Post</h1>
                {item}
            </div>
        )
    }
}

export default PostForm;
