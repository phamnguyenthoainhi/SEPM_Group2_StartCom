import React from "react";
import ContentCard from "./Card";
import { Grid } from "@material-ui/core";

const Content = () =>{
    return (
        <Grid container spacing = {3}>
            <Grid item xs = {12} sm = {4}>
                <ContentCard />
            </Grid>
            <Grid item xs = {4} sm = {4} >
                <ContentCard/>
            </Grid>
            <Grid item xs = {4} sm = {4}>
                <ContentCard/>
            </Grid>
        </Grid>
    
    
    );
};

export default Content;