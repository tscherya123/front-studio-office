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
import {checkUser} from '../../components/loginActions';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  centered: {
    height: '100vh', /* Magic here */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loading: true,
    };
    checkUser().then(resp => {
      console.log('SUCCESS', resp);
      this.setState({ loading: false });
    }).catch(e => {
      this.setState({ redirect: "/sign-in" });
    });
    this.submitUnAuth = this.submitUnAuth.bind(this);
  }

  componentDidMount() {

  }

  submitUnAuth() {
    this.setState({ redirect: "/sign-in" });
  }

  render() {
    const {
      classes,
    } = this.props;
    
    const {
      redirect,
      loading,
    } = this.state;


    if (redirect) {
      return <Redirect to={this.state.redirect} />
    }

    if (loading) {
      return <LinearProgress />
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
                Вы юзер
              </Typography>
              <form className={classes.form} noValidate>
                <Button
                    onClick={this.submitUnAuth}
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Выйти
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
    );
  }
}

UserPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(UserPage);