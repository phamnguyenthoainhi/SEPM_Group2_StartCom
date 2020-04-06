import React, { Component } from 'react'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []

        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then (res => res.json())
        .then(data => this.setState({posts: data}))
    }

    render() {
       const item = this.state.posts.map(post => (


        
       ))
        return (
            <div>
                <h1>Post</h1>
                <h1>H2</h1>
            </div>
        )
    }
}

export default Post;
