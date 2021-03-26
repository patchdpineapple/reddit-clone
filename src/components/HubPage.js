import React from 'react'
import "./HubPage.css"
import { useParams } from "react-router-dom";

function HubPage({allPosts}) {

    let {name} = useParams();

    

    return (
        <div className="HubPage">
            <h1>/{name}</h1>
        </div>
    )
}

export default HubPage
