import React, { Component } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { RuxProgress } from '@astrouxds/rux-progress/rux-progress.js';



class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contacts: [],
          isLoading: false 
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('http://localhost:3001/contacts')
          .then(response => response.json())
          .then(data => this.setState({ contacts: data.contacts, isLoading: false }));
    }

    onSortAsc(event, sortKey) {
        const sorted = this.state.contacts
        sorted.sort((a,b) =>  (a[sortKey] - b[sortKey]))
        this.setState({sorted})
    }
    onSortDesc(event, sortKey) {
        const sorted = this.state.contacts
        sorted.sort((a,b) => (b[sortKey] - a[sortKey]))
        this.setState({sorted})
    }
    onSortAscState(event, sortKey) {
      const sorted = this.state.contacts
      sorted.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({sorted})
    }
    onSortDescState(event, sortKey) {
      const sorted = this.state.contacts
      sorted.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
      this.setState({sorted})
    }
   
    
    render() {
        const { contacts, isLoading } = this.state;
        const contactSize = contacts.length
        const states = []
        contacts.map (contact =>(
         states.push(contact.contactState)
        ))
        const counts1 = Object.create(null)
        states.forEach(btn => {
          counts1[btn] = counts1[btn] ? counts1[btn] + 1 : 1;
        })
        
        if (isLoading) {
          return <div className="spinner"><rux-progress></rux-progress></div>;
        }

        return (
            <div> 
                <table class="rux-table" >
                  <caption><h1>{contactSize} Total contacts</h1>
                  <h1>{Object.entries(counts1).map(([key, val]) => 
                    <h2 key={key}>{key}: {val}</h2>
                    )}</h1>
                  </caption>
                <thead>
                  <tr>
                    <th>Contact Name<ArrowUpwardIcon onClick={e => this.onSortAsc(e, 'contactName')}/><ArrowDownwardIcon onClick={e => this.onSortDesc(e, 'contactName')} /></th>
                    <th>Contact Status<ArrowUpwardIcon onClick={e => this.onSortAscState(e, 'contactStatus')}/><ArrowDownwardIcon onClick={e => this.onSortDescState(e, 'contactStatus')} /></th>
                    <th>Begin Timestamp</th>
                    <th>End Timestamp</th>
                    <th>Contact State<ArrowUpwardIcon onClick={e => this.onSortAscState(e, 'contactState')}/><ArrowDownwardIcon onClick={e => this.onSortDescState(e, 'contactState')} /></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr class="rux-table__column-head" key={contact.id}>
                      <td>{contact.contactName}</td>
                      <td className="float-container"><div className="float-child">{contact.contactStatus === "caution" ? <rux-status status="caution"></rux-status> : contact.contactStatus === "serious" ? <rux-status status="serious"></rux-status> : contact.contactStatus === "critical" ? <rux-status status="critical"></rux-status> : <rux-status status="normal"></rux-status>}</div><div className="float-child">{contact.contactStatus}</div></td>
                      <td>{contact.contactBeginTimestamp}</td>
                      <td>{contact.contactEndTimestamp}</td>
                      <td>{contact.contactState}</td>
                    </tr>
                  ))}
                </tbody>
              </table>          
          </div>

        );
    }

}

export default Contacts;