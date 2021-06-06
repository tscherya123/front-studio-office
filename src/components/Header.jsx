import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { USER, ADMIN, ENGINEER } from '../components/util/accessTypes';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Cookie from "js-cookie";
import Tooltip from '@material-ui/core/Tooltip';
import {getUserImg} from '../components/profileActions';
import Avatar from '@material-ui/core/Avatar';

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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessType: Cookie.getJSON("userType"),
      redirect: null,
      loading: false,
      drawerOpen: false,
      userImg: null,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleGoToProfile = this.handleGoToProfile.bind(this);
    this.fetchUserImg = this.fetchUserImg.bind(this);
  }

  componentDidMount() {
    this.fetchUserImg();
  }

  fetchUserImg() {
    let userId = (Cookie.getJSON("user")).id;
    getUserImg({
      userId
    }).then(resp => {
      this.setState({ userImg: resp.url });
    })
  }

  handleLogOut() {
    this.setState({ redirect: "/sign-in" });
  }

  handleGoToProfile() {
    const {
      accessType,
    } = this.state;
    if (accessType === USER) {
      this.setState({ redirect: "/user/profile" });
    } else if (accessType === ADMIN) {
      this.setState({ redirect: "/admin/profile" });
    } else if (accessType === ENGINEER) {
      this.setState({ redirect: "/engineer/profile" });
    } else {
      this.handleLogOut();
    }
  }

  handleDrawerOpen() {
    this.setState({ drawerOpen: true });
  }

  handleDrawerClose() {
    this.setState({ drawerOpen: false });
  }


  render() {
    const {
      classes,
      headerText,
    } = this.props;

    const {
      redirect,
      loading,
      accessType,
      drawerOpen,
      userImg,
    } = this.state;


    if (redirect) {
      return <Redirect to={this.state.redirect} />
    }

    if (loading) {
      return <LinearProgress />
    }

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: drawerOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {headerText} {accessType}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography>Скрыть панель</Typography>
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {accessType !== ADMIN && (
            <div>
              <List>
                {
                  <Tooltip title="Создать тикет" placement="right">
                    <ListItem button key={"create"}>
                      <ListItemIcon>{<AddCircleOutlineIcon />}</ListItemIcon>
                      <ListItemText primary={"Создать тикет"} />
                    </ListItem>
                  </Tooltip>
                }
                {
                  <Tooltip title="Мои тикеты" placement="right">
                    <ListItem button key={"view"}>
                      <ListItemIcon>{<ListAltIcon />}</ListItemIcon>
                      <ListItemText primary={"Мои тикеты"} />
                    </ListItem>
                  </Tooltip>
                }
              </List>
              <Divider />
            </div>
          )}
          <List>
            {
              <Tooltip title="Профайл" placement="right">
                <ListItem button key={"profile"}>
                  <ListItemIcon>
                    { !userImg && <AccountCircleIcon /> }
                    { userImg && (
                      <Avatar src={userImg} style={{ height: '27px', width: '27px' }}/>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={"Профайл"} />
                </ListItem>
              </Tooltip>
            }
          </List>
          <Divider />
          <List>
            {
              <Tooltip title="Выйти" placement="right">
                <ListItem onClick={this.handleLogOut} button key={"exit"}>
                  <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                  <ListItemText primary={"Выйти"} />
                </ListItem>
              </Tooltip>
            }
          </List>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  accessType: PropTypes.string,
  headerText: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(Header);