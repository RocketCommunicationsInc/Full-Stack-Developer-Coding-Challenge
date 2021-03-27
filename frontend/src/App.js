import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import HomeContainer from './containers/HomeContainer'
import HomePage from './containers/HomePage'

class App extends Component {

  state = {
  }

  render() {
    return (
      
      <Router>
        <div  >
          <NavigationBar signOut={this.signOut} />
          <div className="header">
          <Route exact path='/' render={routerProps => <HomeContainer {...routerProps} handleUserInfo={this.handleUserInfo} />} />
          <Route exaxt path='/home' render={routerProps => <HomePage {...routerProps}/>  } />
          </div>
        </div>
      </Router>
    );
  }



}

export default App;