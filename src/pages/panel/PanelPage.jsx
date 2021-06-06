import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import backgroundImage1 from '../../images/back1.jpg';
import * as PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import {checkAdmin, checkEngineer, checkUser} from '../../components/loginActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Menu from './../panel/Menu';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookie from "js-cookie";
import { USER, ADMIN, ENGINEER } from '../../components/util/accessTypes';
import Header from '../../components/Header';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class PanelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loading: true,
      accessType: Cookie.get("userType"),
    };
    this.checkAccessType = this.checkAccessType.bind(this);
    this.checkAccessType();
  }

  checkAccessType() {
    const {loading, redirect, accessType} = this.state;

    if (accessType === USER) {
      checkUser().then(resp => {
        console.log('SUCCESS', resp);
        this.setState({ loading: false });
        this.setState({ redirect: "/user/profile" });
      }).catch(e => {
        this.setState({ loading: false });
        this.submitUnAuth();
      });
    } else if (accessType === ADMIN) {
      checkAdmin().then(resp => {
        console.log('SUCCESS', resp);
        this.setState({ loading: false });
        this.setState({ redirect: "/admin/profile" });
      }).catch(e => {
        this.setState({ loading: false });
        this.submitUnAuth();
      });
    } else if (accessType === ENGINEER) {
      checkEngineer().then(resp => {
        console.log('SUCCESS', resp);
        this.setState({ loading: false });
        this.setState({ redirect: "/engineer/profile" });
      }).catch(e => {
        this.setState({ loading: false });
        this.submitUnAuth();
      });
    }
  }

  submitUnAuth() {
    this.setState({ redirect: "/sign-in" });
  }

  render() {
    const {
      redirect,
      loading,
    } = this.state;
    return (
      <div>
        {loading && (<LinearProgress />)}
        {!loading && redirect !== null && (<Redirect to={redirect}/>)}
      </div>
      );
  }
}

PanelPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(PanelPage);