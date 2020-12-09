import React, {Fragment, useState} from "react";
import PropTypes from 'prop-types';
import Form from './Form'
import updateError from "./Form"
import error from "./Form"

export const booked_dates = [];
export var dup_error = false;

/* <button onclick={() => {toggleDiv("appointment_list")}}> Show/Hide </button>
    <h3> !ERROR GOES HERE! </h3>*/

//  This class represents the created appointment(s)
const Appointment = ({ appointment, deletedAppointment }) => (
<>
  <div id="appointment_list" className="appointment">
    
    <Fragment>
          <script>
            Form.error = false;
            Form.updateError = false;
           </script>
    </Fragment>

    <script>
        Form.error = false;
        Form.updateError = false;
    </script>

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
            {CaptureData(appointment, Form)}
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
      APPOINTMENT ID: <span>{parseID(appointment)}</span>
    </p>
       <div>
        <Fragment>
            <form>
                <label> </label>
                <label> Last Name: </label>
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="Last Name"
                />

                <label> </label>
                <label> Appointment ID: </label>
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="ID"
                />

                <label> </label>
                <label> New Date: </label>
                <input
                  type="date"
                  className="u-full-width"
                  placeholder="ID"
                />

            </form>
        </Fragment>
    </div>
    <label>  </label>
    <button type="submit" className="u-full-width button-primary">
      EDIT
    </button>

    <button
      className="delete button u-full-width"
      onClick={() => {deletedAppointment(appointment.id); booked_dates.length = 0}}
    >
      Delete &times;

    </button>
   </div> 
   </>
);

Appointment.propTypes = 
{
  appointment: PropTypes.array.isRequired,
  deletedAppointment: PropTypes.func.isRequired
};

export function CaptureData(appointment, Form)
{
    //  dup_error = false;
    //  base case: if the new date's in the array, 
    //  don't add a duplicate.
    if (!isInArray(booked_dates, appointment))
    {
        booked_dates.push(appointment.date);
        dup_error = false;
        console.log("This date isn't in the array. Adding!");
    }
    else if (isInArray(booked_dates, appointment))
    {
        dup_error = true;
        console.log("This date's already in the array. Error!");
    }

    //console.log(dup_error)
    //console.log(booked_dates)

    //  Return the bool tracking duplicate dates
    return (dup_error);
}

// Helper method determining if the date is already in array of dates
export function isInArray(booked_dates, appointment) 
{
    return (booked_dates.find(item => {return item === appointment.date}) || []).length > 0;
}

function parseID(appointment)
{
    var str = String(appointment.id)
    var result = str.substring(0,13)
    return(result)
}

function toggleDiv(id) 
{
    var div = document.getElementById(id);
    div.style.display = div.style.display === "none" ? "block" : "none";
}

function hideList() 
{
  var x = document.getElementById("appointment_list");
  
  if (x.style.display === "none") 
  {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

export default Appointment;