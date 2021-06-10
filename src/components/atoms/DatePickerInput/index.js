import React from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

const DatePickerInput = ({date, label, onUpdate}) => {
  const handleDateChange = date => {
    onUpdate(date)
  }

  return (
    <div className="date-picker-input">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {label && <label htmlFor="date">{label}</label>}
        <DatePicker name="date" value={date} onChange={handleDateChange} />
        <TimePicker name="date" value={date} onChange={handleDateChange} />
      </MuiPickersUtilsProvider>
    </div>
  )
}

DatePickerInput.propTypes = {
  date: PropTypes.object.isRequired,
  label: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default DatePickerInput
