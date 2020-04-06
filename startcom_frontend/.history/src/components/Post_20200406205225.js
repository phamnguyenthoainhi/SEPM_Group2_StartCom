import React, { Component } from 'react'

class Post extends Component {

    componentDMount() {
        console.log("Hello");
    }

    render() {
        return (
            <div>
                <h1>Post</h1>
            </div>
        )
    }
}

export default Post;
