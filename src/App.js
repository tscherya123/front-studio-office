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
import MyTicketsPage from './pages/panel/MyTicketsPage';
import FreeTicketsPage from './pages/panel/FreeTicketsPage';
import TicketsPage from './pages/panel/TicketsPage';
import CreateTicketPage from './pages/panel/CreateTicketPage';
import CreateTicketUpdater from './pages/panel/CreateTicketUpdater';
import AllTicketsPage from './pages/panel/AllTicketsPage';
import AllUsersPage from './pages/panel/AllUsersPage';
import { USER, ADMIN, ENGINEER } from './components/util/accessTypes';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path='/' component={SignInSide}/>
              <Route path="/welcome" component={SignInSide}/>
              <Route path="/sign-in" component={SignInSide}/>
              <Route path="/sign-up" component={SignUpPage}/>
              <Route path="/checkAccess" component={PanelPage}/>
              <Route path="/profile" component={ProfilePage} />
              <Route exact path="/myTickets" component={MyTicketsPage} />
              <Route exact path="/freeTickets" component={FreeTicketsPage} />
              <Route exact path="/allTickets" component={AllTicketsPage} />
              <Route exact path="/allUsers" component={AllUsersPage} />
              <Route path="/createTicket" component={CreateTicketPage} />
              <Route exact path="/anotherTicket" component={CreateTicketUpdater} />
              <Route path="/ticket/:id" component={TicketsPage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
