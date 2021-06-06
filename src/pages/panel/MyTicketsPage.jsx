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
import Menu from './Menu';
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
import ProfileUpdateDialog from '../../components/ProfileUpdateDialog';
import AddBirthdayDialog from '../../components/AddBirthdayDialog';
import PasswordUpdateDialog from '../../components/PasswordUpdateDialog';
import {getInfoForProfile, updateAvatar, updateBirthday} from '../../components/profileActions';
import { formatDate } from '../../components/util/dateUtil';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import LockIcon from '@material-ui/icons/Lock';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  input: {
    display: 'none',
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFailed: false,
      user: null,
      selectedFileAvatar: null,
      isFilePickedAvatar: false,
      openEditDialog: false,
      openAddBirthdayDialog: false,
      openPasswordUpdateDialog: false,
    };

    this.changeHandlerAvatar = this.changeHandlerAvatar.bind(this);
    this.handleClickOpenEditDialog = this.handleClickOpenEditDialog.bind(this);
    this.handleClickOpenAddBirthdayDialog = this.handleClickOpenAddBirthdayDialog.bind(this);
    this.handleClickOpenPasswordUpdateDialog = this.handleClickOpenPasswordUpdateDialog.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    let userId = (Cookie.getJSON("user")).id;
    getInfoForProfile({userId}).then(resp => {
      this.setState({ user: resp });
    }).catch(e => {
      console.log(e);
      this.setState({ loadingFailed: true });
    })
  }

  changeHandlerAvatar(event){
    const {
      selectedFileAvatar,
    } = this.state;
    console.log(event);
    this.setState({ selectedFileAvatar: event.target.files[0] });
    this.setState({ isFilePickedAvatar: true });
    console.log(this.state.selectedFileAvatar);
    let userId = (Cookie.getJSON("user")).id;
    let file = event.target.files[0];
    updateAvatar({avatarImg: file, id: userId
    }).then(resp => {
      this.fetchUser();
    });
  };

  handleClickOpenEditDialog() {
    this.setState({ openEditDialog: true });
  }

  handleClickOpenAddBirthdayDialog() {
    this.setState({ openAddBirthdayDialog: true });
  }

  handleClickOpenPasswordUpdateDialog() {
    this.setState({ openPasswordUpdateDialog: true });
  }

  render() {
    const {
      classes,
    } = this.props;

    const {
      user,
      loadingFailed,
      openEditDialog,
      openAddBirthdayDialog,
      openPasswordUpdateDialog,
    } = this.state;

    return (
      <div className={classes.root}>
      <CssBaseline />
      <Header headerText={"Профайл"}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {user === null && !loadingFailed && (<LinearProgress />)}
        {!loadingFailed && user !== null && (
          <div>
            <Paper elevation={3} style={{marginBottom: 20, padding:20}}>
              <Grid container justify="center">
                <Grid container item xs={12} justify="center">
                  <input className={classes.input} id="icon-button-file"  
                    type="file"
                    accept=".jpg,.jpeg"
                    multiple={false}
                    onChange={(event) => this.changeHandlerAvatar(event)}
                  />
                  <label htmlFor="icon-button-file">
                  <Tooltip title="Загрузить фото" placement="right">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <Avatar style={{ height: '100px', width: '100px' }} alt={user.username} src={user.profileImg}>
                        {user.profileImg === null ? user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase() : null}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  </label>
                </Grid>
                <Grid container item xs={12} justify="center">
                  <Typography variant="h4">
                    {user.username}
                  </Typography>
                </Grid>
                <Grid container item xs={12} justify="center">
                  <Typography>
                    {user.firstName}{" "}{user.lastName}
                  </Typography>
                </Grid>
                <Grid container item xs={12} justify="center">
                  <Typography>
                    {user.email}
                  </Typography>
                </Grid>
                <Grid container item xs={12} justify="center">
                  <Typography>
                    {user.phone}
                  </Typography>
                </Grid>
                {user.birthDate === null && (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    endIcon={<CakeIcon></CakeIcon>}
                    onClick={this.handleClickOpenAddBirthdayDialog}
                  >
                    Добавить дату рождения
                  </Button>
                )}
                {user.birthDate !== null && (
                  <Grid container item xs={12} justify="center">
                    <Typography>
                    <CakeIcon></CakeIcon>{" "}{formatDate(user.birthDate)}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
            <Paper elevation={3} style={{padding:20}}>
              <Grid container justify="center">
                <Grid container spacing={2} item xs={12} justify="center" style={{flexDirection: "row", flexWrap: "nowrap"}}>
                  <Grid item >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<CreateIcon></CreateIcon>}
                      onClick={this.handleClickOpenEditDialog}
                    >
                      Изменить информацию
                    </Button>
                  </Grid>
                  <Grid item >
                    <input
                      accept=".jpg,.jpeg"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(event) => this.changeHandlerAvatar(event)}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<PersonIcon></PersonIcon>}
                        component="span"
                      >
                        Изменить аватар
                      </Button>
                    </label>
                  </Grid>
                  <Grid item >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<LockIcon></LockIcon>}
                      onClick={this.handleClickOpenPasswordUpdateDialog}
                    >
                      Изменить пароль
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Typography>
              {`Аккаунт зарегестрирован ${formatDate(user.created)}`}
            </Typography>
          </div>
        )}
        {loadingFailed && (
          <div>
            Загрузка неуспешна
          </div>
        )}
        {user !== null && (
          <div>
            {openEditDialog && (
              <ProfileUpdateDialog 
                open={openEditDialog} 
                onSave={() => {
                  this.fetchUser();
                  this.setState({ openEditDialog: false });
                }} 
                onClose={() => {
                  this.setState({ openEditDialog: false });
                }}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                phone={user.phone}
              />
            )}
            <PasswordUpdateDialog 
              open={openPasswordUpdateDialog}
              onSave={() => {
                this.setState({ openPasswordUpdateDialog: false });
              }}
              onClose={() => {
                this.setState({ openPasswordUpdateDialog: false });
              }}
            />
            
            <AddBirthdayDialog open={openAddBirthdayDialog} 
              onSave={(date) => {
                let userId = (Cookie.getJSON("user")).id;
                updateBirthday({
                  userId, date
                }).then(resp => {
                  console.log(resp);
                  this.setState(prevState => ({
                    user: {                   // object that we want to update
                      ...prevState.user,    // keep all other key-value pairs
                      birthDate: date       // update the value of specific key
                    }
                  }));
                  this.setState({ openAddBirthdayDialog: false });
                }).catch(e => {
                  console.log(e);
                });
              }} 
              onClose={() => {
                this.setState({ openAddBirthdayDialog: false });
              }}
            />
          </div>
        )}
        
      </main>
    </div>
      );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(ProfilePage);