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
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 

const styles = theme => ({
    root: {
      display: 'flex',
    },
});

class AddBirthdayDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleClose() {
        this.props.onClose();
    };

    handleSave() {
        const { selectedDate } = this.state;
        this.props.onSave(selectedDate);
    };

    handleDateChange(date) {
        this.setState({ selectedDate: date });
    }

    render() {
    const { selectedDate } = this.state;
    return (
        <div>
        <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Добавить дату рождения</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Выберите дату рождения. Выбрать дату можно только один раз, будьте внимательны.
            </DialogContentText>
            <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Дата рождения"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    disableFuture                    
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
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


AddBirthdayDialog.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
};

export default withStyles(styles, {withTheme: true})(AddBirthdayDialog);