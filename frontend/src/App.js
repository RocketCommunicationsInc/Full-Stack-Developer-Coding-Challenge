import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import IndexContainer from './containers/IndexContainer'
import Authentication from './containers/Authentication'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/index" component={IndexContainer} />
                <Route path="/" exact component={Authentication} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
