import React, {Component} from 'react'
import DataTable from '../components/DataTable'
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
            this.state.alerts ? 
            <div>
                made it to this page!
                <DataTable table={this.state.alerts} columns={ALERTCOLUMNS}/>
                <DataTable table={this.state.contacts} columns={CONTACTCOLUMNS}/>
            </div>
            : <div>
                made it to this page!
            </div>
        )
    }
}

export default HomePage