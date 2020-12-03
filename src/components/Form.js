import React, { Fragment, useState } from "react";
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';



const Form = ({makeAppointment}) => {

    //var booked_dates = [];
    const[appointment, updatedAppointment] = useState ({
        reason:'',
        name:'',
        date:'',
        time:'',
        notes:'',
        phone_number:'',
        email:''
    });

    const [error, updateError] = useState(false)

    // to read the content and put it in the state
    const updateState = e  =>{ 
        updatedAppointment({
            ...appointment,
            [e.target.name] : e.target.value,
        })
    }

    // extract data
    const {reason, name, date, time, notes, phone_number, email} = appointment;

    // when sending/submitting Form
    const submitAppointment = e => 
    {
      e.preventDefault();
 
      // Validate
      if(reason.trim() === '' || name.trim() === ''  || date.trim() === ''  || time.trim() === ''  || notes.trim() === ''
          || phone_number.trim() === '' || email.trim() === '' )
      {
          updateError(true);
          return;
      }

      updateError(false);

      // generate ID
      appointment.id = uuid();
      
      //create appointment
      makeAppointment(appointment);
      
      // restart form
      updatedAppointment({
        reason:'',
        name:'',
        date:'',     /* need to capture date for the lifecycle of the web app, ie globally.  https://fb.me/react-controlled-components */
        time:'',
        notes:'',
        phone_number:'',
        email:''
      })
    }


  return (
    <Fragment>
      <h1> Appointment Request </h1>
      {
        error ? <p className="error-alert"> Please fill the complete form </p>: false
      } 
      <form  
      onSubmit={submitAppointment/*, booked_dates.push(date), console.log(booked_dates)*/}
      >

        <label> Name </label>
        <input
          type="text"
          name="name"
          className="u-full-width"
          placeholder="Name"
          onChange={updateState}
          value={name}
        />

        <label> Subject/Apointment Type </label>
        <input
          type="text"
          name="reason"
          className="u-full-width"
          placeholder="Reason for Appointment"
          onChange={updateState}
          value={reason}
        />

        <label> Date </label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={updateState}
          value={date}
        />

        <label> Time </label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={updateState}
          value={time}
        />

        <label> Phone Number </label>
        <input
          type="tel"
          name="phone_number"
          className="u-full-width"
          placeholder="(###) - ### - ####"
          onChange={updateState}
          value={phone_number}
        />

        <label> Email </label>
        <input
          type="email"
          name="email"
          className="u-full-width"
          onChange={updateState}
          placeholder="me@domain.com"
          value={email}
        />

        <label> Extra Notes </label>
        <textarea
          name="notes"
          className="u-full-width"
          onChange={updateState}
          placeholder="Please provide any additional notes."
          value={notes}
        ></textarea>

        <button type="submit" className="u-full-width button-primary" /*onclick={captureDate()}*/>
          Request appointment
        </button>

        

      </form>
    </Fragment>
  );

};

Form.propTypes = 
{
  makeAppointment: PropTypes.func.isRequired
}
export default Form;
