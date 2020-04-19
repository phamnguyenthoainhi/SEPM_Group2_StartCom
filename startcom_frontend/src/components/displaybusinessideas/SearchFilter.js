import React, { Component } from 'react';
import {IdeaConsumer} from "../../../context";
import IdeaList from "./IdeaList"

export default class SearchFilter extends React.Component {
    constructor(props){
        super(props);
        this.child = React.createRef();
        this.state = {
            minPrice: '',
            maxPrice: '',
            category: ''
        };
        this.updateState = this.updateState.bind(this);
    };


    
    backToPageOne = () => { this.child.current.handlePageChange(1) };

    render() {
        const {minPrice, maxPrice, category} = this.state;
        return (
            <div>
                
            </div>
        )
    }
}
