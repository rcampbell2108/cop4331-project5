import React, {Fragment, useState} from "react";
import PropTypes from 'prop-types';


const booked_dates = [];
//const error
    var error = false;
    const updateError = false;



// this class represents the created appointment(s)
const Appointment = ({ appointment, deletedAppointment }) => (
  <div className="appointment">

  <Fragment>
    <h3> !ERROR GOES HERE! </h3>
    {
        error ? <p className="error-alert"> Requested appointment unavailable. Please select a different date. </p>: false
    }
  </Fragment>

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
            {CaptureData(appointment)}
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
      APPOINTMENT ID: <span>{appointment.id}</span>
    </p>

    <button
      className="delete button u-full-width"
      onClick={() => {deletedAppointment(appointment.id); booked_dates.length = 0}}
    >
      Delete &times;

    </button>
   </div>   
);

Appointment.propTypes = 
{
  appointment: PropTypes.array.isRequired,
  deletedAppointment: PropTypes.func.isRequired
};

function CaptureData(appointment)
{
    
/*<Fragment>
     <p className="error-alert"> Requested appointment unavailable. Please select a different date. </p>
     </Fragment>*/
    //  base case: if the new date's in the array, 
    
    //  if the new date's in the array already don't add a duplicate.
    if (!isInArray(booked_dates, appointment))
    {
        booked_dates.push(appointment.date);
        error = false;
        //{displayError()}
    }
    else if (isInArray(booked_dates, appointment))
    {
        error = true;
    }
    

    //booked_dates.length = date_count
    return (console.log(booked_dates));
}

// Helper method determining if the date is already in array of dates
function isInArray(booked_dates, appointment) 
{
  return (booked_dates.find(item => {return item === appointment.date}) || []).length > 0;
}


function displayError()
{
    ;
   /* return(    
   <Fragment>
       
    </Fragment>)*/
}

export default Appointment;