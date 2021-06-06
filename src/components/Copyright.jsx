import {Component} from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';

class Copyright extends Component {
  render() {
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
}

export default Copyright;