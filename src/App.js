import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

function App() 
{
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  
  if (!initialAppointments) 
  {
    initialAppointments = [];
  }

  // array of appointments
  const [appointments, savedAppointments] = useState(initialAppointments);

  // use effect to do operations when the state changes
  useEffect(() => {
    let initialAppointments = JSON.parse(localStorage.getItem('appointments'));

    if (initialAppointments) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } 
    else {
      localStorage.setItem('appointments', JSON.stringify([]));
    }

  }, [appointments]);

  // function to take appointment and add new
  const makeAppointment = appointment => {
    savedAppointments([...appointments, appointment]);
  };

  const deletedAppointment = id => {
    const newAppointments = appointments.filter(appointment => appointment.id !== id );
    savedAppointments(newAppointments);
  }

  const title =
    appointments.length === 0 ? "No appointments" : "Manage Appointments";

  // Header
  return (
    <Fragment>
      <h1> Appointment System </h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form makeAppointment={makeAppointment} />
          </div>
          <div className="one-half column">
            <h2> {title}</h2>
            {appointments.map((appointment) => (
              <Appointment key={appointment.id} appointment={appointment} deletedAppointment={deletedAppointment} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );


}

export default App;