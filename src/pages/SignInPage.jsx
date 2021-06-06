import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import VpnKey from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import backgroundImage1 from '../images/back1.jpg';
import * as PropTypes from 'prop-types';
import Copyright from '../components/Copyright';
import {auth, checkAdmin, checkEngineer, checkUser} from '../components/loginActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import { ADMIN, ENGINEER, USER } from '../components/util/accessTypes';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${backgroundImage1})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ?
            theme.palette.grey[50] :
            theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatarGood: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  avatarBad: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      badCredentials: false,
      goodCredentials: false,
      loading: false,
      redirect: null,
      errorMessageFromBackEnd: null,
    };
    this.submitAuth = this.submitAuth.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    Cookie.remove("user");
    Cookie.remove("type");
    Cookie.remove("token");
    Cookie.remove("userType");
  }

  submitAuth(e) {
    e.preventDefault();
    this.setState({loading: true});
    auth({
      username: this.state.username,
      password: this.state.password,
    }).then(response => {
      console.log(response);
      console.log('resp token', response.token);
      Cookie.set("token", response.token);
      Cookie.set("type", response.type);
      Cookie.set("user", response);
      
      const token =  Cookie.get("token") ? Cookie.get("token") : null;
      console.log('cookie token', token);
      console.log('cookie all', Cookie.get());
      this.setState({loading: false});
      this.setState({goodCredentials: true});
      this.setState({badCredentials: false});

      checkAdmin().then(resp => {
        console.log('SUCCESS', resp);
        Cookie.set("userType", ADMIN);
        this.setState({ redirect: "/checkAccess" });
      }).catch(e => {
        console.log(e);
      });

      checkEngineer().then(resp => {
        console.log('SUCCESS', resp);
        Cookie.set("userType", ENGINEER);
        this.setState({ redirect: "/checkAccess" });
      }).catch(e => {
        console.log(e);
      });

      checkUser().then(resp => {
        Cookie.set("userType", USER);
        console.log('SUCCESS', resp);
        this.setState({ redirect: "/checkAccess" });
      }).catch(e => {
        console.log(e);
      });

    }).catch(e => {
      if (e.message !== null) {
        this.setState({errorMessageFromBackEnd: e.message});
      }
      this.setState({badCredentials: true});
      console.log(e);
      console.log(e.status);
      console.log(e.error);
      this.setState({loading: false});
    });
  }

  handleSubmit() {
    console.log(this.state.username);
    console.log(this.state.password);
  }

  render() {
    const {
      classes,
    } = this.props;
    
    const {
      username,
      password,
      badCredentials,
      goodCredentials,
      loading,
      redirect,
      errorMessageFromBackEnd
    } = this.state;


    if (redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline/>
          <Grid item xs={false} sm={4} md={7} className={classes.image}/>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Typography component="h1" variant="h3">
                STUDIO-OFFICE
              </Typography>
              <Typography component="h1" variant="h5">
                Аутентификация
              </Typography>
              <Avatar className={(goodCredentials) ? classes.avatarGood : ((badCredentials) ? classes.avatarBad : classes.avatar )}>
                <VpnKey/>
              </Avatar>
              <form className={classes.form} onSubmit={e => this.submitAuth(e)} noValidate>
                <TextField
                    onChange={e => this.setState({username: e.target.value})}
                    onBlur={e => {
                      this.setState({badCredentials: false});
                      this.setState({errorMessageFromBackEnd: false});
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    error={badCredentials}
                    fullWidth
                    id="email"
                    label="Никнейм, почта или номер телефона"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    onChange={e => this.setState({password: e.target.value})}
                    onBlur={e => {
                      this.setState({badCredentials: false});
                      this.setState({errorMessageFromBackEnd: false});
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    error={badCredentials}
                    helperText={(badCredentials) ? 'Данные введены некоректно' : '' }
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {loading ? (<LinearProgress />) : ''}
                {errorMessageFromBackEnd != null && (
                  <Typography variant="body1" style={{color: "red"}}>
                    {errorMessageFromBackEnd}
                  </Typography>
                )}
                <Button
                    // onClick={this.submitAuth}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Войти
                </Button>
                <Grid container justify='center'>
                  <Grid item>
                    <Link href="sign-up" variant="body2">
                      {'Ещё нет аккаунта? Создать аккаунт'}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright/>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
    );
  }
}

SignInPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(SignInPage);