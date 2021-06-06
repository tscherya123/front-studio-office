import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Copyright from '../components/Copyright';
import Cookie from 'js-cookie';
import {signup, checkCredentialExist} from '../components/signupActions';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { Redirect } from "react-router-dom";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      password: '',

      badCredentials: false,
      goodCredentials: false,
      loading: false,
      redirect: null,

      usernameValid: true,
      emailValid: true,
      phoneValid: true,
      redirect: null,
    };
    Cookie.remove('user');
    Cookie.remove('type');
    Cookie.remove('token');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlurUsername = this.onBlurUsername.bind(this);
    this.onBlurEmail = this.onBlurEmail.bind(this);
    this.onBlurPhone = this.onBlurPhone.bind(this);
  }

  handleSubmit() {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    } = this.state;

    if (this.validate()) {
      signup({
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
      }).then(response => {
        this.setState({ redirect: "/sign-in"});
        console.log(response);
      }).catch(e => {
        console.log(e);
      });
    }

  }

  validate() {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    } = this.state;

    let hasErrors = false;

    if (firstName === '') {
      this.setState({firstNameEmpty: true});
      hasErrors = true;
    }
    if (lastName === '') {
      this.setState({lastNameEmpty: true});
      hasErrors = true;
    }
    if (username === '') {
      this.setState({usernameEmpty: true});
      hasErrors = true;
    }
    if (email === '') {
      this.setState({emailEmpty: true});
      hasErrors = true;
    }
    if (phone === '') {
      this.setState({phoneEmpty: true});
      hasErrors = true;
    }
    if (password === '') {
      this.setState({passwordEmpty: true});
      hasErrors = true;
    }

    if (firstName.length > 200) {
      this.setState({firstNameBadSize: true});
      hasErrors = true;
    }
    if (lastName.length > 200) {
      this.setState({lastNameBadSize: true});
      hasErrors = true;
    }
    if (username.length > 100) {
      this.setState({usernameBadSize: true});
      hasErrors = true;
    }
    if (email.length > 100) {
      this.setState({emailBadSize: true});
      hasErrors = true;
    }
    if (phone.length > 13 || phone.length < 13) {
      this.setState({phoneBadSize: true});
      hasErrors = true;
    }
    if (password.length < 6 || password.length > 40) {
      this.setState({passwordBadSize: true});
      hasErrors = true;
    }

    return !hasErrors;
  }

  onBlurUsername() {
    this.setState({
      usernameValid: true,
      usernameEmpty: false,
      usernameBadSize: false
    });

    const {username} = this.state;

    if (username.length > 100) {
      this.setState({usernameBadSize: true});
      return;
    }
    if (username === '') {
      this.setState({usernameEmpty: true});
      return;
    }

    this.setState({checkingUsername: true});
    const type = "username";
    const credential = username;
    checkCredentialExist({credential, type}).then(response => {
      this.setState({usernameValid: true});
      this.setState({checkingUsername: false});
    }).catch(e => {
      this.setState({usernameValid: false});
      this.setState({checkingUsername: false});
    });
  }

  onBlurEmail() {
    this.setState({
      emailValid: true,
      emailEmpty: false, 
      emailBadSize: false
    });

    const {email} = this.state;

    if (email.length > 100) {
      this.setState({emailBadSize: true});
      return;
    }
    if (email === '') {
      this.setState({emailEmpty: true});
      return;
    }

    this.setState({checkingEmail: true});
    const type = "email";
    const credential = email;
    checkCredentialExist({credential, type}).then(response => {
      this.setState({emailValid: true});
      this.setState({checkingEmail: false});
    }).catch(e => {
      this.setState({emailValid: false});
      this.setState({checkingEmail: false});
    });
  }

  onBlurPhone() {
    this.setState({
      phoneValid: true, 
      phoneEmpty: false, 
      phoneBadSize: false
    });
    const {phone} = this.state;
    if (phone.length > 13 || phone.length < 13) {
      this.setState({phoneBadSize: true});
      return;
    }
    if (phone === '') {
      this.setState({phoneEmpty: true});
      return;
    }
    this.setState({checkingPhone: true});
    const type = "phone";
    const credential = phone;
    checkCredentialExist({credential, type}).then(response => {
      this.setState({phoneValid: true});
      this.setState({checkingPhone: false});
    }).catch(e => {
      this.setState({phoneValid: false});
      this.setState({checkingPhone: false});
    });
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      checkingUsername,
      checkingEmail,
      checkingPhone,
      redirect,
    } = this.state;
    if (redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Typography component="h1" variant="h3">
              STUDIO-OFFICE
            </Typography>
            <Typography component="h1" variant="h5">
              Создать аккаунт
            </Typography>
            <Avatar className={classes.avatar}>
              <AccountCircleIcon/>
            </Avatar>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      onChange={e => this.setState({firstName: e.target.value})}
                      onBlur={() => this.setState({firstNameEmpty: false, firstNameBadSize: false})}
                      error={this.state.firstNameEmpty || this.state.firstNameBadSize}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Имя"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      onChange={e => this.setState({lastName: e.target.value})}
                      onBlur={() => this.setState({lastNameEmpty: false, lastNameBadSize: false})}
                      variant="outlined"
                      error={this.state.lastNameEmpty || this.state.lastNameBadSize}
                      required
                      fullWidth
                      id="lastName"
                      label="Фамилия"
                      name="lastName"
                      autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      onChange={e => this.setState({username: e.target.value})}
                      onBlur={this.onBlurUsername}
                      variant="outlined"
                      required
                      error={this.state.usernameEmpty || this.state.usernameBadSize || !this.state.usernameValid}
                      helperText={!this.state.usernameValid  ? "Такой никнейм уже занят. Введите другой"
                      :this.state.username.length !== 0 ? 'Никнейм свободен' : ''}
                      fullWidth
                      id="username"
                      label="Никнейм"
                      name="username"
                      autoComplete="login"
                      valid
                  />
                  {checkingUsername && <LinearProgress/>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      onChange={e => this.setState({email: e.target.value})}
                      onBlur={this.onBlurEmail}
                      variant="outlined"
                      required
                      fullWidth
                      error={this.state.emailEmpty || this.state.emailBadSize || !this.state.emailValid}
                      helperText={!this.state.emailValid  ? "Такая почта уже занята. Введите другую"
                          :this.state.email.length !== 0 ? 'Почта не занята' : ''}
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                  />
                  {checkingEmail && <LinearProgress/>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      onChange={e => this.setState({phone: e.target.value})}
                      onBlur={this.onBlurPhone}
                      variant="outlined"
                      required
                      error={this.state.phoneEmpty || this.state.phoneBadSize || !this.state.phoneValid}
                      helperText={!this.state.phoneValid  ? "Этот номер телефона уже занят. Введите другой"
                          : this.state.email.length !== 0 && !this.state.phoneBadSize && !this.state.phoneEmpty ? 'Номер не занят' : 'Формат: +380111111111'}
                      fullWidth
                      name="phone"
                      label="Номер телефона"
                      id="phone"
                      autoComplete="phone"
                  />
                  {checkingPhone && <LinearProgress/>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      onChange={e => this.setState({password: e.target.value})}
                      onBlur={() => this.setState({passwordEmpty: false, passwordBadSize: false})}
                      variant="outlined"
                      error={this.state.passwordEmpty || this.state.passwordBadSize}
                      helperText={"Пароль должен быть от 6 до 40 символов"}
                      required
                      fullWidth
                      name="password"
                      label="Пароль"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                  onClick={this.handleSubmit}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                Подтвердить
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link href="sign-in" variant="body2">
                    Уже есть аккаунт? Войти
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright/>
          </Box>
        </Container>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(SignUpPage);