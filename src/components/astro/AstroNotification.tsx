import React, { Component } from 'react';
import { RuxNotification } from "@astrouxds/rux-notification";
import { findDOMNode } from 'react-dom';

class AstroNotification extends Component<any> {

    componentDidMount(){
        let container = findDOMNode(this);

        let notification = new RuxNotification();
        for(let key of Object.keys(this.props)){
            if(key !== "children"){
                let value = this.props[key];
                notification[key] = value;
            }
        }
        if(container){
            container.appendChild(notification);
        }
    }

    render(){
        return <div style={{display: "inline"}}/>
    }
}

export default AstroNotification
