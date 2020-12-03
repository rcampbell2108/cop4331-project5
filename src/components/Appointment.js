import React from "react";
import PropTypes from 'prop-types';


const booked_dates = [];

// this class represents the created appointment(s)
const Appointment = ({ appointment, deletedAppointment }) => (

  <div className="appointment">

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

//{booked_dates.length = 0};
/*
      <script>
            {CaptureData(appointment)},
            {date_count++}
      </script> 
*/

Appointment.propTypes = 
{
  appointment: PropTypes.array.isRequired,
  deletedAppointment: PropTypes.func.isRequired
};

function CaptureData(appointment) 
{

    if (!isInArray(booked_dates, appointment))
    {
        booked_dates.push(appointment.date);
    }

    //booked_dates.length = date_count
    return (console.log(booked_dates));
}

// Helper method determining if the date is already in array of dates
function isInArray(booked_dates, appointment) 
{
  return (booked_dates.find(item => {return item == appointment.date}) || []).length > 0;
}

export default Appointment;