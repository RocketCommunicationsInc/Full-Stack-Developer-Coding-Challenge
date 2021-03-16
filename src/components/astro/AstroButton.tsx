import React, { Component } from 'react';
import { RuxButton } from "@astrouxds/rux-button";
import { findDOMNode } from 'react-dom';

class AstroButton extends Component<any> {

    componentDidMount(){
        let container = findDOMNode(this);

        let button = new RuxButton();
        for(let key of Object.keys(this.props)){
            if(key !== "children"){
                let value = this.props[key];
                button[key] = value;
            }
        }

        container.appendChild(button);
    }

    render(){

    return (
        <div style={{display: "inline"}}/>
    );
  }
}

export default AstroButton
