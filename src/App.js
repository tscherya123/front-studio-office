import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignInSide from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Landing from './pages/landing/Landing';
import AdminPage from './pages/panel/AdminPage';
import UserPage from './pages/panel/UserPage';
import EngineerPage from './pages/panel/EngineerPage';
import PanelPage from './pages/panel/PanelPage';
import ProfilePage from './pages/panel/ProfilePage';
import { USER, ADMIN, ENGINEER } from './components/util/accessTypes';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route path="/welcome" component={Landing}/>
              <Route path="/sign-in" component={SignInSide}/>
              <Route path="/sign-up" component={SignUpPage}/>
              <Route path="/checkAccess" component={PanelPage}/>
              <Route path="/admin/profile" component={ProfilePage} />
              <Route path="/user/profile" component={ProfilePage} />
              <Route path="/engineer/profile" component={ProfilePage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
