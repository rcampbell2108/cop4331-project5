import React, { Fragment, useState } from "react";
//import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import Appointment from "./Appointment";

//import 
import {booked_dates} from "./Appointment"
import {CaptureData} from "./Appointment"
import {isInArray} from "./Appointment"

var e, result;

/*var e = document.getElementById("ddlViewBy");
var strUser = e.options[e.selectedIndex].text;
duration.value = strUser;*/

/*export const error = useState(false)
export const updateError = useState(false)*/

export const Form = ({makeAppointment, Appointment}) => {

const booked_dates_form = [];
    
    //  Var booked_dates = [];
    const[appointment, updatedAppointment] = useState ({
        reason:'',
        name:'',
        date:'',
        time:'',
        duration:'',
        notes:'',
        phone_number:'',
        email:''
    });

    const [error, updateError] = useState(false)

    //  To read the content and put it in the state
    const updateState = e  => { 
        updatedAppointment({
            ...appointment,
            [e.target.name] : e.target.value,
        })
    }

    //  extract data
    const {reason, name, date, time, duration, notes, phone_number, email} = appointment;

    //  when sending/submitting Form
    const submitAppointment = e => 
    {
      e.preventDefault();

      //    If any of the fields are empty, set error to true. Otherwise error is false by default to hide it
      if(reason.trim() === '' || name.trim() === ''  || date.trim() === ''  || time.trim() === ''  || duration.trim() === '--Please choose an appointment duration--' ||
            notes.trim() === '' || phone_number.trim() === '' || email.trim() === '')
      {
          updateError(true);
          return;
      }

      updateError(false);

      // generate ID
      appointment.id = uuid();
      
      // create appointment
      makeAppointment(appointment);
      
      // restart form
      updatedAppointment({
        reason:'',
        name:'',
        date:'',     /* need to capture date for the lifecycle of the web app, ie globally.  https://fb.me/react-controlled-components */
        time:'',
        notes:'',
        phone_number:'',
        duration:'',
        email:''    
      })
    }

  return (
    <Fragment>
      <h1> Appointment Request </h1>
      {
        //  Every field on the form is mandatory. If a field is empty, display an error
        error ? <p className="error-alert"> ERROR: Please fill the complete form </p>: false
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
          min="09:00" 
          max="17:00" required
        />

        <label> Duration </label>
        <select 
            id="select_id" 
            onChange={() => { GetSelectedText()} }
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

        <button 
            type="submit" 
            className="u-full-width button-primary" /*onclick={captureDate()}*/
            onClick={() => {booked_dates_form.length = 0}}>
          Request appointment
        </button>
    </form>
    </Fragment>
 );

 /*<script>       
    {CaptureData(appointment)}
    {console.log(booked_dates_form + 'form meow')}
</script>*/

/*function 
    if (isInArray(booked_dates, appointment)) 
    {
        updateError(true);
        return;
    }
*/

/*function CaptureData(appointment)
{
    //  base case: if the new date's in the array, 
    
    //  if the new date's in the array already don't add a duplicate.
    if (!isInArray(booked_dates_form, appointment))
    {
        booked_dates_form.push(appointment.date);
       // updateError(true);
    }else if (isInArray(booked_dates_form, appointment)) {
        updateError(true);
        return;
    }
    //booked_dates.length = date_count
    return (console.log(booked_dates_form + 'form meow'));
}*/

// Helper method determining if the date is already in array of dates
function isInArray(booked_dates_form, date) 
{
   return (booked_dates_form.find(item => {return item === date}) || []).length > 0;
}
   function GetSelectedText()  
   {
        {var e = document.getElementById("select_id")}
        {var result = e.options[e.selectedIndex]}
                
        //{console.log("hello")}  
        
        appointment.duration = result.text
        //console.log(appointment.duration);    
        //document.getElementById("result").innerHTML = result;
    }
};

Form.propTypes = 
{
  makeAppointment: PropTypes.func.isRequired
}   

export default Form;

   /* <label>  </label>
    <label>  </label>
    <label for="username">Admin Username:</label>
    <input 
        type="text" 
        id="username" 
        name="username"/>

    <label for="pass">Admin Password (8 characters minimum):</label>
    <input 
        type="password" 
        className="u-full-width"
        id="pass" 
        name="password"
        minlength="8" required/>

    // ***SITE OWNER***        
    <label>  </label>
    <button type="submit" className="u-full-width button-primary" onclick={captureDate()}>
        Owner Signin
    </button>

        <label> </label>
        <label> Last Name </label>
        <input
          type="text"
          name="name"
          className="u-full-width"
          placeholder="Last Name"
          onChange={updateState}
          value={name}
        />

        <label> </label>
        <label> Appointment ID: </label>
        <input
          type="text"
          name="name"
          className="u-full-width"
          placeholder="ID"
          onChange={updateState}
          value={name}
        />

    <label>  </label>
    <button type="submit" className="u-full-width button-primary">
        Edit/Delete Appointment
    </button>*/


      /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
    /*
          <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
      </div>

      <div id="main">
        <button onclick={openNav()}>&#9776; open</button>
      </div>
    function openNav() 
    {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

     Set the width of the side navigation to 0 and the left margin of the page content to 0 
    function closeNav()    
    {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
    */
