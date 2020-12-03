import React from "react";
import PropTypes from 'prop-types';

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
      onClick={() => deletedAppointment(appointment.id)}
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

export default Appointment;
