import React, { Component } from 'react'

class Post extends Component {
    componentWillMount() {
        fetch('https://jsonplaceholder.typicode');
    }

    

    render() {
       
        return (
            <div>
                <h1>Post</h1>
                <h1>H2</h1>
            </div>
        )
    }
}

export default Post;
