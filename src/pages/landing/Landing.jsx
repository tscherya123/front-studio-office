import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import backgroundImage2 from '../../images/back2.jpeg';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Cookie from "js-cookie";

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {'Дмитрий Черянев'}
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function Landing() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  Cookie.remove("user");
  Cookie.remove("type");
  Cookie.remove("token");
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          STUDIO-OFFICE
        </Typography>
        <Typography component="h1" variant="h5">
          Это место для вашей landing page
        </Typography>
        <Button
            variant="contained"
            component="label"
        >
          Upload File
          <input
              type="file"
              hidden
          />
        </Button>
        <FavoriteIcon></FavoriteIcon>
        <Link href="sign-in" variant="body2">
                    {'Войдите в аккаунт'}
                  </Link>
        
        </div>
    </Container>
  );
}