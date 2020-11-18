import React, { Component } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { RuxProgress } from '@astrouxds/rux-progress/rux-progress.js';



class Alerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          alerts: [],
          isLoading: false 
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('http://localhost:3001/alerts')
          .then(response => response.json())
          .then(data => this.setState({ alerts: data.alerts, isLoading: false }));
    }

    onSortAsc(sortKey) {
        const sorted = this.state.alerts
        sorted.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({sorted})
    }
    onSortDesc(sortKey) {
        const sorted = this.state.alerts
        sorted.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
        this.setState({sorted})
    }
    render() {
        const { alerts, isLoading } = this.state;
        const alertSize = alerts.length
        if (isLoading) {
          return <div className="auth"><rux-progress></rux-progress></div>;
        }
        return (
            <div>            
                <table class="rux-table" >
                <caption><h1>{alertSize} Total Alerts</h1></caption>
                <thead>
                  <tr>
                    <th>Error ID</th>
                    <th>Error Severity<ArrowUpwardIcon onClick={e => this.onSortAsc('errorSeverity')}/><ArrowDownwardIcon onClick={e => this.onSortDesc('errorSeverity')} /></th>
                    <th>Error Message</th>
                    <th>Error Category<ArrowUpwardIcon onClick={e => this.onSortAsc('errorCategory')}/><ArrowDownwardIcon onClick={e => this.onSortDesc('errorCategory')} /></th>
                    <th>Error Time</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map(alert => (
                    <tr class="rux-table__column-head" key={alert.id}>
                      <td>{alert.errorId}</td>
                      <td className="float-container"><div className="float-child">{alert.errorSeverity === "caution" ? <rux-status status="caution"></rux-status> : alert.errorSeverity === "serious" ? <rux-status status="serious"></rux-status> : <rux-status status="critical"></rux-status> }</div><div className="float-child">{alert.errorSeverity}</div></td>
                      <td>{alert.errorMessage}</td>
                      <td>{alert.errorCategory}</td>
                      <td>{alert.errorTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>          
          </div>

        );
    }

}

export default Alerts;