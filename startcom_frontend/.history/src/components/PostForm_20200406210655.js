import React, { Component } from 'react'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []

        }
    }


    render() {
       const item = this.state.posts.map(post => (
           <div key = {post.id}>
               <h3>
                   {post.title}
               </h3>
       <p>{post.body}</p>  
           </div>
       ));
        return (
            <div> 
                <h1>Post</h1>
                {item}
            </div>
        )
    }
}

export default PostForm;
