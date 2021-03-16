import React, { Component } from 'react';
import Contact from '../model/Contact';
import Alert from '../model/Alert';
import { FaArrowUp, FaArrowDown, FaArrowsAltV } from 'react-icons/fa';
import '../astro.core.css';
import '../App.css';

enum Direction {
  None, Up, Down
}
interface Sorter {
  direction: Direction,
  field: string
}

interface LocalState {
  alertSorter: Sorter;
  contactSorter: Sorter;
}

interface DashboardProps {
    contacts: Contact[],
    alerts: Alert[],
    states: Set<string>
}

interface DateTimeFormatOptions {
  localeMatcher?: "best fit" | "lookup";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
  formatMatcher?: "best fit" | "basic";
  hour12?: boolean;
  timeZone?: string;
}

class Dashboard extends Component<DashboardProps, LocalState> {

  state = {
    alertSorter: {
      direction: Direction.None,
      field: ""
    },
    contactSorter: {
      direction: Direction.None,
      field: ""
    }
  }

  render(){
    let alerts = this.props.alerts;
    let contacts = this.props.contacts;
    let states = Array.from(this.props.states);
    let alertSorter = this.state.alertSorter;
    let contactSorter = this.state.contactSorter;

    function renderDate(date: Date): string {
      let options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return date.toLocaleDateString("en-US", options);
    }

    function renderAlert(alert: Alert): React.ReactElement {
        return <tr key={alert.errorId}>
            <td>{alert.errorMessage}</td>
            <td>{alert.errorCategory}</td>
            <td>{renderDate(new Date(alert.errorTime))}</td>
        </tr>
    }

    function renderContact(contact: Contact): React.ReactElement{
      return <tr key = {contact._id}>
        <td>{contact.contactName}</td>
        <td>{contact.contactStatus}</td>
        <td>{renderDate(new Date(contact.contactBeginTimestamp))}</td>
        <td>{renderDate(new Date(contact.contactEndTimestamp))}</td>
      </tr>
    }

    let self = this;
    function sortAlertColumn(field: string){
      return () => {
        let dir = Direction.Up;
        if(self.state.alertSorter.field === field){
          switch(self.state.alertSorter.direction){
            case Direction.Up: {
              dir = Direction.Down; 
              break;
            }
            case Direction.Down: {
              dir = Direction.None; 
              break;
            }
            default: {
              dir = Direction.Up
            }
          }
        }
        self.setState({
          alertSorter: {
            direction: dir,
            field: field
          }
        });
      }
    };

    function sortContactColumn(field: string){
      return () => {
        let dir = Direction.Up;
        if(self.state.contactSorter.field === field){
          switch(self.state.contactSorter.direction){
            case Direction.Up: {
              dir = Direction.Down; 
              break;
            }
            case Direction.Down: {
              dir = Direction.None; 
              break;
            }
            default: {
              dir = Direction.Up
            }
          }
        }
        self.setState({
          contactSorter: {
            direction: dir,
            field: field
          }
        });
      }
    };

    function renderSorter(sorter: Sorter, field: string, onclicker: (string) => () => void): React.ReactElement {
      if(sorter.field === field){
        switch(sorter.direction){
          case Direction.Up: return <FaArrowUp className="clickable" onClick={onclicker(field)}/>
          case Direction.Down: return <FaArrowDown className="clickable" onClick={onclicker(field)}/>
          default: return <FaArrowsAltV className="clickable" onClick={onclicker(field)}/>
        }
      } else {
        return <FaArrowsAltV className="clickable" onClick={onclicker(field)}/>
      }
    }

    let sortedAlerts = [...alerts];
    switch(alertSorter.direction){
      case Direction.Up: {
        sortedAlerts.sort(function(a1, a2){
          return (a1[alertSorter.field] > a2[alertSorter.field]) ? 1 : -1
        });
        break;
      }
      case Direction.Down: {
        sortedAlerts.sort(function(a1, a2){
          return (a1[alertSorter.field] < a2[alertSorter.field]) ? 1 : -1
        });
        break;
      }
    }

    let sortedContacts = [...contacts];
    switch(contactSorter.direction){
      case Direction.Up: {
        sortedContacts.sort(function(a1, a2){
          return (a1[contactSorter.field] > a2[contactSorter.field]) ? 1 : -1
        });
        break;
      }
      case Direction.Down: {
        sortedContacts.sort(function(a1, a2){
          return (a1[contactSorter.field] < a2[contactSorter.field]) ? 1 : -1
        });
        break;
      }
    }

    return (
      <div className="background">
          <h1 style={{textAlign: "center"}}>Dashboard</h1>
          <p style={{padding: "10px"}}>Welcome to the Dashboard!  You can sort a table by clicking on the arrow key next to the column title.  
            Clicking it multiple times will toggle between Ascending, Descending, and Unsorted.  Choosing a different column to sort by will
            reset the previous column to Unsorted.</p>
            <div>
            <h2 style={{textAlign: "center"}}>Contacts ({contacts.length})</h2>
            Distinct States:
            {states.map((s: string) => {
                return<span key={s} style={{padding: "10px"}}>{s}</span>
            })}
            <br/>
            <br/>
            <table>
              <thead>
                <tr>
                  <td>Name {renderSorter(this.state.contactSorter, "contactName", sortContactColumn)}</td>
                  <td>Status {renderSorter(this.state.contactSorter, "contactStatus", sortContactColumn)}</td>
                  <td>Start {renderSorter(this.state.contactSorter, "contactBeginTimestamp", sortContactColumn)}</td>
                  <td>End {renderSorter(this.state.contactSorter, "contactEndTimestamp", sortContactColumn)}</td>
                </tr>
              </thead>
              <tbody>
                {sortedContacts.map(renderContact)}
              </tbody>
            </table>
          </div>
          <div style={{marginBottom: "20px"}}>
            <h2 style={{textAlign: "center"}}>Alerts ({alerts.length})</h2>
            <table>
              <thead>
                <tr>
                  <td>Message {renderSorter(this.state.alertSorter, "errorMessage", sortAlertColumn)}</td>
                  <td>Category {renderSorter(this.state.alertSorter, "errorCategory", sortAlertColumn)}</td>
                  <td>Time {renderSorter(this.state.alertSorter, "errorTime", sortAlertColumn)}</td>
                </tr>
              </thead>
              <tbody>
              {sortedAlerts.map(renderAlert)}
              </tbody>
            </table>
          </div>
         
      </div>
    );
  }
}
export default Dashboard
