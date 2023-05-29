import './styles/doc_appoin_hist.css'
import def_pp from '../imgs/profile.png'


import React, { useState, useEffect } from 'react';

import { useSearchParams,createSearchParams, useNavigate } from 'react-router-dom';




function DocAppoinHist() {

  const nav = useNavigate()


  const[searchParams] = useSearchParams();
  const [prof_name, setprofname] = useState('')
  const[appoinlist, settappoinlist] = useState([])

  useEffect(() => {
    console.log(searchParams.get('doc_id'))
  //  get_prof_name_by_id()
    get_appoin_history()
    
    console.log("Received pat_id: ", searchParams.get("doc_id"));
    console.log("Received profilename pat_id: ", prof_name);

    
  }, [])

  const get_appoin_history = async() =>{

    const getappoinhist = {docId: searchParams.get("doc_id")}
    await fetch('http://localhost:8090/api/v1/appointment/get_doctor_appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify(getappoinhist)
  
    })
    .then(response => response.json())
    .then(data => {
      console.log("Online docs apoin list get profff: ",data)
      settappoinlist(data)  
     // console.log("After set profname ",prof_name)     
    })
    .catch(error => {
      console.log(error)
    });
  }

    const navToHome = () =>{
      nav({
        pathname: '/DocHome',
        search: createSearchParams({
          doc_id: searchParams.get('doc_id')
        }).toString()
      });
    }
  
    const navToMngProfile = () =>{
      nav({
        pathname: '/patlist',
        search: createSearchParams({
          doc_id: searchParams.get('doc_id')
        }).toString()
      });
    }
  
    const navToAppHis = () =>{
      nav({
        pathname: '/DocAppoinHist',
        search: createSearchParams({
          doc_id: searchParams.get('doc_id')
        }).toString()
      });

    }
    
    
      return (
        <div>
      <div className="navbar">
        <div>
          <button className="nav-button" onClick={navToHome}>Home</button>
          {/* <button onClick={navToMngProfile} className="nav-button">Manage Profile</button> */}
          <button className="nav-button" onClick={navToAppHis}>Appointment History</button>

            {/* <a href="#">Edit Profile</a>
            <a href="#">Appointment History</a> */}
        </div>
        <div>
        {/* <button className="nav-button1"><img  />{prof_name}</button> */}

          <button className="nav-button" >Logout</button>
        </div>
      </div>
          <div className="appointment-history">
          <h1>Patient Appointment History</h1>
          {appoinlist.length == 0? "No appointments":
            <ul className="doctor-list">
              {appoinlist.map(appointment => (
                <li key={appointment.appointment.appointmentId}>
                  <div className="doctor-profile">
                    <img className="doctor-photo" src={def_pp} alt="Doctor" />
                    <div className="doctor-info">
                      <div className="doctor-name">{appointment.name}</div>
                      <div className="info-label"><b>Call Start Time:</b> {appointment.appointment.startTime}</div>
                      {/* <div className="info-value">{doctor.startTime}</div> */}
                      <div className="info-label"><b>Call End Time:</b> {appointment.appointment.endTime}</div>
                      {/* <div className="info-value">{doctor.endTime}</div> */}
                      <div className="info-label"><b>Status: </b>{appointment.appointment.status}</div>
                      {/* <div className="info-value">{doctor.endTime}</div> */}
                      
                      <button>View Details</button>
                    </div>
                    
                  </div>
                </li>
              ))}
            </ul>}
          </div>
        </div>
      );
}

export default DocAppoinHist;
























// const AppoinHist = () => {

  

// const DoctorProfile = ({ startTime, endTime, name, photo }) => {
//   return (
//     <div className="doctor-profile">
//       <img className="doctor-photo" src={photo} alt={name} />
//       <div className="doctor-info">
//         <div className="info-label">Call Start Time:</div>
//         <div className="info-value">{startTime}</div>
//       </div>
//       <div className="doctor-info">
//         <div className="info-label">Call End Time:</div>
//         <div className="info-value">{endTime}</div>
//       </div>
//       <div className="doctor-info">
//         <div className="info-label">Doctor Name:</div>
//         <div className="info-value">{name}</div>
//       </div>
//     </div>
//   );
// };


//   const doctors = [
//     {
//       id: 1,
//       name: 'Dr. John Doe',
//       startTime: '9:00 AM',
//       endTime: '10:00 AM',
//     },
//     {
//       id: 2,
//       name: 'Dr. Jane Doe',
//       startTime: '10:00 AM',
//       endTime: '11:00 AM',
//     },
//     {
//       id: 3,
//       name: 'Dr. Joe Smith',
//       startTime: '11:00 AM',
//       endTime: '12:00 PM',
//     },
//   ];

//   return (
//     <div>
//       <nav className="navbar">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               Home
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               Help
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               Logout
//             </a>
//           </li>
//         </ul>
//       </nav>
//       <div className="doctor-list">
//         {doctors.map((doctor) => (
//           <DoctorProfile
//             key={doctor.id}
//             name={doctor.name}
//             startTime={doctor.startTime}
//             endTime={doctor.endTime}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppoinHist;
