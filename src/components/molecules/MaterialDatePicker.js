import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

const MaterialDatePicker = ({onUpdate}) => {
  const [selectedDate, handleDateChange] = useState(new Date())

  // Update state in parent component.
  useEffect(() => {
    onUpdate(selectedDate)
  }, [onUpdate, selectedDate])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        name="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <TimePicker
        name="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  )
}

MaterialDatePicker.propTypes = {
  onUpdate: PropTypes.func,
}

export default MaterialDatePicker
