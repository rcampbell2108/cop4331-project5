//  ***Russell Campbell
//  ***COP4331 Fall 2020
//  ***Form.js

//  ***This module handles the user's data entry for the appointment 

import React, { Fragment, useState } from "react";
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

import Appointment from "./Appointment";
import {booked_dates} from "./Appointment"
import {bookDate} from "./Appointment"
import {isInArray} from "./Appointment"
import is_duplicate_date from "./Appointment"

var e, result;


export const Form = ({created_appointment}) => {

    const booked_dates_form = [];
    
    const[appointment, updated_appointment] = useState ({
        reason:'',
        name:'',
        date:'',
        time:'',
        duration:'',
        notes:'',
        phone_number:'',
        email:''
    });

    const [error, updated_error] = useState(false)
    const [duplicate_error, updated_duplicate_error] = useState(false)

    //  To read the content and put it in the state
    const updateState = e  => { 
        updated_appointment({
            ...appointment,
            [e.target.name] : e.target.value,
        })
    }

    //  Extract data
    const {reason, name, date, time, duration, notes, phone_number, email} = appointment;

    //  When sending/submitting Form
    const submitted_appointment = e => 
    {
        e.preventDefault();

        //  If any of the fields are empty, set error to true. Otherwise error is false by default to hide it
        if(reason.trim() === '' || name.trim() === ''  || date.trim() === ''  || time.trim() === ''  || duration.trim() === '--Please choose an appointment duration--' ||
            notes.trim() === '' || phone_number.trim() === '' || email.trim() === '')
        {
            updated_error(true);
            return;
        }
     
        // If the error is is_duplicate_date = false;
        if (bookDate(appointment, Form) === true)
        {
            updated_duplicate_error(true);
            return;
        }
     
        updated_duplicate_error(false)
        updated_error(false);

        // generate unique appointment ID
        appointment.id = uuid();
      
        // create appointment
        created_appointment(appointment);
      
        // restart form
        updated_appointment({
            reason:'',
            name:'',
            date:'',     
            notes:'',
            phone_number:'',
            duration:'',
            email:''    
        })
    }

    return (
        <Fragment>
            <h1> Please enter your information </h1>
            {
                //  Every field on the form is mandatory. If a field is empty, display an error
                error ? <p className="error-alert"> ERROR: Please fill the complete form </p>: false
            }
            {
                //  User cannot book two appointments on the same day. If a date is unavailable, throw an error
                duplicate_error ? <p className="error-alert"> ERROR: Duplicate. Please select a different date </p>: false
            } 
            <form  
                onSubmit={submitted_appointment}
            >
            <label> Name </label>
            <input
              type="text"
              name="name"
              className="u-full-width"
              placeholder="Enter your first and last name"
              onChange={updateState}
              value={name}
            />

            <label> Subject Type </label>
            <input
              type="text"
              name="reason"
              className="u-full-width"
              placeholder="Reason for appointment"
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
              min="09:00" 
              max="17:00" required
            />

            <label> Duration </label>
            <select 
                id="select_id" 
                onChange={() => { getDurationSelection()} }
            > 
                <option value="">--Please choose an appointment duration--</option>
                <option value="duration">15 Minutes</option>
                <option value="duration">30 Minutes</option>
                <option value="duration">45 Minutes</option>
                <option value="duration">60 Minutes</option>
            </select>

            <label> Phone Number </label>
            <input
              type="tel"
              name="phone_number"
              className="u-full-width"
              placeholder="(###)-###-####"
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

            <button 
                type="submit" 
                className="u-full-width button-primary">
              Request Appointment
            </button>

        </form>
        </Fragment>
    );

    //  Helper method determining if the date is already in array of dates
    function isInArray(booked_dates_form, date) 
    {
       return (booked_dates_form.find(item => {return item === date}) || []).length > 0;
    }

    //  Capture the selection in the duration field
    function getDurationSelection()  
    {
        {var e = document.getElementById("select_id")}
        {var result = e.options[e.selectedIndex]}
        
        appointment.duration = result.text
    }
};

Form.propTypes = 
{
  created_appointment: PropTypes.func.isRequired
}   

export default Form;