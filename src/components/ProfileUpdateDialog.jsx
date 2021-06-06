import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {updateUserInfo} from '../components/profileActions';
import Cookie from "js-cookie";
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
      display: 'flex',
    },
});

class ProfileUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                firstName: props.firstName,
                lastName: props.lastName,
                email: props.email,
                phone: props.phone,
            },
            errorMessage: null,
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
    }

    updateFirstName(firstName) {
        this.setState(prevState => ({
            info: {                   // object that we want to update
              ...prevState.info,    // keep all other key-value pairs
              firstName: firstName       // update the value of specific key
            }
          }));
    }

    updateLastName(lastName) {
        this.setState(prevState => ({
            info: {                   // object that we want to update
              ...prevState.info,    // keep all other key-value pairs
              lastName: lastName       // update the value of specific key
            }
          }));
    }
    updateEmail(email) {
        this.setState(prevState => ({
            info: {                   // object that we want to update
              ...prevState.info,    // keep all other key-value pairs
              email: email       // update the value of specific key
            }
          }));
    }
    updatePhone(phone) {
        this.setState(prevState => ({
            info: {                   // object that we want to update
              ...prevState.info,    // keep all other key-value pairs
              phone: phone       // update the value of specific key
            }
          }));
    }

    handleClose() {
        this.props.onClose();
    };

    handleSave() {
        const { info } = this.state;
        console.log(this.state.info);
        let userId = (Cookie.getJSON("user")).id;
        const firstName = info.firstName;
        const lastName = info.lastName;
        const email = info.email;
        const phone = info.phone;
        updateUserInfo({
            userId, firstName, lastName, email, phone
        }).then(resp => {
            this.props.onSave();
        }).catch(e => {
            if (e.message) {
                this.setState({ errorMessage: e.message });
            }
        })
    };

    render() {
    const {
        classes,
    } = this.props;
    const {
        info,
        errorMessage
    } = this.state;
    return (
        <div>
        <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Изменить информацию</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={e => this.updateFirstName(e.target.value)}
                        value={info.firstName}
                        // onBlur={() => this.setState({firstNameEmpty: false, firstNameBadSize: false})}
                        // error={this.state.firstNameEmpty || this.state.firstNameBadSize}
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="Имя"
                        autoFocus
                        error={errorMessage !== null}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={e => this.updateLastName(e.target.value)}
                        value={info.lastName}
                        // onBlur={() => this.setState({lastNameEmpty: false, lastNameBadSize: false})}
                        variant="outlined"
                        // error={this.state.lastNameEmpty || this.state.lastNameBadSize}
                        required
                        fullWidth
                        id="lastName"
                        label="Фамилия"
                        name="lastName"
                        autoComplete="lname"
                        error={errorMessage !== null}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        onChange={e => this.updateEmail(e.target.value)}
                        value={info.email}
                        // onBlur={this.onBlurEmail}
                        variant="outlined"
                        required
                        fullWidth
                        // error={this.state.emailEmpty || this.state.emailBadSize || !this.state.emailValid}
                        // helperText={!this.state.emailValid  ? "Такая почта уже занята. Введите другую"
                        //     :this.state.email.length !== 0 ? 'Почта не занята' : ''}
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        error={errorMessage !== null}
                    />
                    {/* {checkingEmail && <LinearProgress/>} */}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        onChange={e => this.updatePhone(e.target.value)}
                        value={info.phone}
                        // onBlur={this.onBlurPhone}
                        variant="outlined"
                        required
                        // error={this.state.phoneEmpty || this.state.phoneBadSize || !this.state.phoneValid}
                        // helperText={!this.state.phoneValid  ? "Этот номер телефона уже занят. Введите другой"
                        //     : this.state.email.length !== 0 && !this.state.phoneBadSize && !this.state.phoneEmpty ? 'Номер не занят' : 'Формат: +380111111111'}
                        fullWidth
                        name="phone"
                        label="Номер телефона"
                        id="phone"
                        autoComplete="phone"
                        error={errorMessage !== null}
                    />
                    {/* {checkingPhone && <LinearProgress/>} */}
                    </Grid>
                    {errorMessage !== null && (
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{color: "red"}}>
                                {errorMessage}
                            </Typography>
                        </Grid>
                    )}
                    
                </Grid>
                </form>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" onClick={this.handleClose} color="primary">
                Отмена
            </Button>
            <Button variant="contained" onClick={this.handleSave} color="primary">
                Сохранить
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    }
}


ProfileUpdateDialog.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(ProfileUpdateDialog);