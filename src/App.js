import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";
import Icon from "react";//awesome-react-icons";

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function App() 
{
  // base case(s)
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

    if (initialAppointments) 
    {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } 
    else {
      localStorage.setItem('appointments', JSON.stringify([]));
    }

  }, [appointments]);

  // Function to take appointment and add new
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
  <>
    <div className= "menu">
    <Navigation 
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                //elemBefore: () => <Icon name="inbox" />,
              },
             /* {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },*/
              {
                title: 'NAVIGATE',
                itemId: '/navigate',
                //elemBefore: () => <Icon name="users" />,
                subNav: [
                  {
                    title: 'HOME',
                    itemId: '/navigate/home',
                  },
                  {
                    title: 'EDIT/DELETE',
                    itemId: '/navigate/editdelete',
                  },
                  {
                    title: 'ADMIN',
                    itemId: '/navigate/admin',
                  },

                ],
              },

            ]}
          />
     </div>

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
    </>
  );
}

/*export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <React.Fragment>
      {/* Sidebar Overlay }
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      <div className="absolute right-0">
        <a href="https://github.com/abhijithvijayan/react-minimal-side-navigation">
          View on GitHub
        </a>
      </div>

      <div>
        <button
          className="btn-menu"
          onClick={(): void => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar }
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            react-minimal-side-navigation
          </span>
        </div>

        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Home",
              itemId: "/home",
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "About",
              itemId: "/about",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Projects",
                  itemId: "/about/projects"
                },
                {
                  title: "Members",
                  itemId: "/about/members"
                }
              ]
            },
            {
              title: "Another Tab",
              itemId: "/another",
              subNav: [
                {
                  title: "Teams",
                  itemId: "/another/teams"
                }
              ]
            }
          ]}
        />

        <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Settings",
                itemId: "/settings",
                elemBefore: () => <Icon name="activity" />
              }
            ]}
            onSelect={({ itemId }) => {
              history.push(itemId);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};*/


// prompt for user's last name + appointment ID 
// editing/deleting appointments

/*function myFunction() {
  var person = prompt("Please enter your name", "Harry Potter");
  if (person != null) {
    document.getElementById("demo").innerHTML =
    "Hello " + person + "! How are you today?";
  }
}*/

export default App;