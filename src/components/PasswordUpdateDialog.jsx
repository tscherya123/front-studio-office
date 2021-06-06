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
import {updateUserInfo} from './profileActions';
import Cookie from "js-cookie";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import {userCheckPassword, userUpdatePassword} from '../components/profileActions';
import { green, red } from '@material-ui/core/colors';

const styles = theme => ({
    root: {
      display: 'flex',
      width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    instructionsFinalGood: {
        color: '#00c853',
    },
    instructionsFinalBad: {
        color: '#d50000',
    },
});

function getSteps() {
    return ['Введите текущий пароль', 'Введите новый пароль', 'Введите новый пароль ещё раз'];
  }

class PasswordUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: getSteps(),
            passwordCurrent: '',
            passwordNew: '',
            passwordNewAgain: '',
            step1Error: false,
            step2Error: false,
            step3Error: false,
            step4Error: false,
        };
        

        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
    }

    handleNext() {
        const {passwordCurrent, passwordNew, passwordNewAgain} = this.state;
        let userId = (Cookie.getJSON("user")).id;
        switch (this.state.activeStep) {
            case 0:
                userCheckPassword({
                    userId, 
                    password: passwordCurrent
                }).then(resp=> {
                    if (resp.answer === true) {
                        this.setState({ activeStep: this.state.activeStep + 1 });
                    } else {
                        this.setState({ step1Error: true });                        
                    }
                }).catch(e => {
                    console.log(e);
                    this.setState({ step1Error: true });   
                })
                break;
            case 1:
                if (passwordNew && passwordNew.length >= 6) {
                    this.setState({ activeStep: this.state.activeStep + 1 });
                } else {
                    this.setState({ step2Error: true });   
                }
                break;
            case 2:
                if (passwordNewAgain && passwordNew === passwordNewAgain) {
                    userUpdatePassword({ 
                        userId, 
                        oldPassword: passwordCurrent,
                        newPassword: passwordNew,
                     }).then(response => {
                        Cookie.set("token", response.token);
                        Cookie.set("type", response.type);
                        Cookie.set("user", response);
                        this.setState({ activeStep: this.state.activeStep + 1 });
                     }).catch(e => {
                        this.setState({ step4Error: true });
                        this.setState({ activeStep: this.state.activeStep + 1 });
                     })
                } else {
                    this.setState({ step3Error: true });   
                }
                break;
            default:
              return 'Unknown stepIndex';
          }
        
    };

    handleSave() {
        this.props.onSave();
    };
    handleClose() {
        this.props.onClose();
    };

    getStepContent(stepIndex) {
        const {step1Error, step2Error, step3Error, step4Error, passwordNew, passwordNewAgain} = this.state;
        switch (stepIndex) {
            case 0:
              return (
              <div>
                <TextField
                    onChange={e => {
                        this.setState({passwordCurrent: e.target.value});
                        this.setState({step1Error: false});
                    }}
                    variant="outlined"
                    margin="normal"
                    required
                    error={step1Error}
                    helperText={(step1Error) ? 'Пароль неверный' : '' }
                    fullWidth
                    name="password"
                    label="Текущий пароль"
                    type="password"
                    id="passwordCurrent"
                    autoComplete="current-password"
                />
              </div>
              );
            case 1:
                return (
                    <div>
                      <TextField
                          onChange={e => this.setState({passwordNew: e.target.value})}
                          variant="outlined"
                          margin="normal"
                          required
                          value={passwordNew}
                          error={step2Error}
                          helperText={(step2Error) ? 'Данные введены некоректно' : 'Пароль должен быть больше 6 символов' }
                          fullWidth
                          name="password"
                          label="Новый пароль"
                          type="password"
                          id="passwordNew"
                          autoComplete="current-password"
                      />
                    </div>
                    );
            case 2:
                              return (
                    <div>
                      <TextField
                          onChange={e => this.setState({passwordNewAgain: e.target.value})}
                          variant="outlined"
                          margin="normal"
                          required
                          value={passwordNewAgain}
                          error={step3Error}
                          helperText={(step3Error) ? 'Пароли не совпадают' : '' }
                          fullWidth
                          name="password"
                          label="Повторите новый пароль"
                          type="password"
                          id="passwordNewOneMoreTime"
                          autoComplete="current-password"
                      />
                    </div>
                    );
            default:
              return 'Unknown stepIndex';
          }
    }

    render() {
    const {
        classes,
    } = this.props;
    const {
        steps,
        activeStep,
        step4Error,
    } = this.state;

    // после последнего шага
    // activeStep === steps.length

    return (
        <div>
        <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Изменить пароль</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={step4Error ? classes.instructionsFinalBad : classes.instructionsFinalGood}>
                                {step4Error ? "Произошла неизвестная ошибка. Попробуйте ещё раз позже." : "Пароль успешно обновлен."}
                            </Typography>
                            <Button onClick={this.handleClose} variant="contained" color="primary">Закрыть</Button>
                        </div>
                    ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            {this.getStepContent(activeStep)}
                        </Typography>
                        <div>
                        <Button variant="contained" color="primary" onClick={this.handleNext}>
                            {activeStep === steps.length - 1 ? 'Дальше' : 'Дальше'}
                        </Button>
                        </div>
                    </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
            {activeStep !== steps.length && (
                <Button variant="contained" onClick={this.handleClose} color="primary">
                    Отмена
                </Button>
            )}
            </DialogActions>
        </Dialog>
        </div>
    );
    }
}


PasswordUpdateDialog.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
};

export default withStyles(styles, {withTheme: true})(PasswordUpdateDialog);