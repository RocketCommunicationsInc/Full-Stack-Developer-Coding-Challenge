import React, {Component} from 'react'
import SortingTable from '../components/SortingTable'
import {ALERTCOLUMNS} from '../components/AlertColumns'
import {CONTACTCOLUMNS} from '../components/ContactColumns'


class HomePage extends Component {

   state = {    
   }

   getInfo (database) {
       let token = localStorage.getItem("token")
       fetch(`http://localhost:3000/${database}`,{
           method: "GET",
           headers: {
               Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({[database]: data})
        })
   }

    componentDidMount() {
        let token = localStorage.getItem("token")
        token ? (
        fetch(`http://localhost:3000/api/v1/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                user: data.user.username
            })
        })
        .then(this.getInfo('contacts'))
        .then(this.getInfo('alerts'))
        )
     : this.props.history.push("/") 
    }

    


    render() {
        return(
            this.state.contacts && this.state.alerts ? 
            <div>
                <p>{`total contacts: ${this.state.contacts.length}`}</p>
                <SortingTable table={this.state.contacts} columns={CONTACTCOLUMNS}/> <SortingTable table={this.state.alerts} columns={ALERTCOLUMNS}/>
                
            </div>
            : <div>
                Loading data...
            </div>
        )
    }
}

export default HomePage