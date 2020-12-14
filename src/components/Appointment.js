//  ***Russell Campbell
//  ***COP4331 Fall 2020
//  ***Appointment.js

//  ***This module the user's appointment with their data listed

import React, {Fragment, useState} from "react";
import PropTypes from 'prop-types';
import Form from './Form'
import updated_error from "./Form"
import error from "./Form"

export const booked_dates = [];

//  boolean tracking if the date's already in the array of booked dates
export var is_duplicate_date = false;

//  start and end indicies of the truncated appointment ID
const truncate_ID_start =  0;
const truncate_ID_end   = 13;


//  This represents the created appointment(s)
const Appointment = ({ appointment, deleted_appointment }) => (
    <>
      <div id="appointment_list" className="appointment">
    
        <p>
          Name: <span>{appointment.name}</span>
        </p>

        <p>
          Email: <span>{appointment.email}</span>
        </p>

        <p>
          Phone Number: <span>{appointment.phone_number}</span>
        </p>

        <p>
          Reason/Appointment Type: <span>{appointment.reason}</span> 
        </p>
    
        <p>
          Date: <span>{appointment.date}</span>
          <script>
                { bookDate(appointment, Form) }
          </script> 
        </p>
    
        <p>
          Time: <span>{appointment.time}</span>
        </p>

        <p>
          Duration: <span>{appointment.duration}</span>
        </p>
    
        <p>
          Notes: <span>{appointment.notes}</span>
        </p>
    
        <p>
          APPOINTMENT ID: <span>{truncateID(appointment)}</span>
        </p>

        <button
          className="delete button u-full-width"
          onClick={() => {deleted_appointment(appointment.id); booked_dates.length = 0} }
        >
          Delete &times;

        </button>

       </div> 
    </>
);

Appointment.propTypes = 
{
  appointment: PropTypes.array.isRequired,
  deleted_appointment: PropTypes.func.isRequired
};

//  If the incoming date isn't in the array, add it to the list of booked dates.
//  If the incoming date's in the array, don't add a duplicate and throw 
//  an error for the user to choose another date
export function bookDate(appointment, Form)
{
    if (!isInArray(booked_dates, appointment))
    {
        booked_dates.push(appointment.date);
        is_duplicate_date = false;
    }
    else if (isInArray(booked_dates, appointment))
    {
        is_duplicate_date = true;
    }

    //  Return the bool tracking duplicate dates
    return (is_duplicate_date);
}

//  Helper method determining if the date is already in array of dates
export function isInArray(booked_dates, appointment) 
{
    return (booked_dates.find(item => {return item === appointment.date}) || []).length > 0;
}

//  Truncate the ID to make it look nicer
function truncateID(appointment)
{
    var str = String(appointment.id);
    var result = str.substring(truncate_ID_start, truncate_ID_end);
    return(result);
}

export default Appointment;