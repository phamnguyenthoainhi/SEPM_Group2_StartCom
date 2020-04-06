import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';


import Post from './components/Post';
import PostForm from './components/PostForm';
const 
class App() extends Component {
  return (
    <Provider store={store }>
      <div className="App">
        <PostForm/>
        <hr />
        <Post/>
      </div>
    </Provider>
   
  );
}

export default App;
