import './styles/appoin_hist.css'
import def_pp from '../imgs/profile.png'
import jspdf from "jspdf"

import React, { useState, useEffect } from 'react';

import { useSearchParams,createSearchParams, useNavigate } from 'react-router-dom';

function AppoinHist() {

  const nav = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const[searchParams] = useSearchParams();
  const [prof_name, setprofname] = useState('')
  const[appoinlist, settappoinlist] = useState([])

  useEffect(() => {
    console.log(searchParams.get('pat_id'))
    get_prof_name_by_id()
    get_appoin_history()
    
    console.log("Received pat_id: ", searchParams.get("pat_id"));
    console.log("Received profilename pat_id: ", prof_name);

  }, [])

  const get_appoin_history = async() =>{

    const getappoinhist = {patId: searchParams.get("pat_id")}
    await fetch('http://localhost:8090/api/v1/appointment/get_patient_appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify(getappoinhist)
  
    })
    .then(response => response.json())
    .then(data => {
      console.log("Online apoin list get profff: ",data)
      settappoinlist(data)  
    })
    .catch(error => {
      console.log(error)
    });
  }

  const get_prof_name_by_id = async() => {

    const getpatidbody = {pat_id: searchParams.get("pat_id")}
    await fetch('http://localhost:8090/api/v1/patient/get_patient_by_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify(getpatidbody)
  
    })
    .then(response => response.json())
    .then(data => {
      console.log("Online docs list get profff: ",data)
      setprofname(data.name)  
      console.log("After set profname ",prof_name)     
    })
    .catch(error => {
      console.log(error)
    });
  
  }
  
      const navToHome = () =>{
        nav({
          pathname: '/home_pat',
          search: createSearchParams({
            pat_id: searchParams.get('pat_id')
          }).toString()
        });
      }
    
      const navToMngProfile = () =>{
        nav({
          pathname: '/patlist',
          search: createSearchParams({
            pat_id: searchParams.get('pat_id')
          }).toString()
        });
      }
    
      const navToAppHis = () =>{
        nav({
          pathname: '/appoinhist',
          search: createSearchParams({
            pat_id: searchParams.get('pat_id')
          }).toString()
        });
      }

      const generatePDF = (data,appointment_id, doc_name, doc_spec) => {
        const doc = new jspdf();
        let line_number = 0; 
        
        doc.setFont('Arial, sans-serif', 'bold');
        doc.setFontSize(24);
        doc.text('Tele Consultation Platform - Prescriptions', 10, line_number*10+5 + 10);
        doc.setLineWidth(0.5);
        doc.setDrawColor(180, 180, 180);
        doc.line(10, 22, 200, 22); // x1, y1, x2, y2

        doc.setFont('Arial, sans-serif', 'normal');
        doc.setFontSize(14);
        
        line_number+=1;
        line_number+=1;
        doc.text('Appointment Id: ' + appointment_id, 10, line_number*10 + 10);
        line_number+=1;
        doc.text('Patient Name: ' + prof_name, 10, line_number*10 + 10);
        line_number+=1;
        // doc.text('Gender: ', 10, line_number*10 + 10);
        // line_number+=1;
        doc.text('Doctor Consulted: Dr.' + doc_name + ' (' + doc_spec +')', 10, line_number*10 + 10);
        line_number+=1;
        doc.line(10, 54, 200, 54); // x1, y1, x2, y2
        line_number+=1;

        if(data.length == 0) {
          doc.text('No prescriptions for this appointment', 10, line_number*10 + 10);
        }
        else{
          for(let i = 0;i<data.length;i++)
          {
            doc.text(String(i+1) + '. Medicine Name : ' + data[i].medName, 10, line_number*10 + 10);
            line_number+=1;
            doc.text('    Quantity : ' + data[i].quantity, 10, line_number*10 + 10);
            line_number+=1;
            doc.text('    Description : ' + data[i].description, 10, line_number*10 + 10);
            line_number+=1;
            line_number+=1;
          }
        }
        const pdfData = doc.output();
        const pdfUrl = URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
        const iframe = document.querySelector('.appHis-popup iframe');
        iframe.src = pdfUrl;
        setShowPopup(true);
        document.getElementById("pres-view-popup").style.display = 'block';
      };
      
      const viewPrescription = async(appId, doc_name, doc_spec) =>{
          const getpresbody = {appId: appId}
          await fetch('http://localhost:8090/api/v1/prescription/get_prescription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify(getpresbody)
          })
          .then(response => response.json())
          .then(data => {
            console.log("Prescriptions: ",data)
            generatePDF(data,appId, doc_name, doc_spec);
          })
          .catch(error => {
            console.log(error)
          });
      } 
      
      const closePopup = () => {
        setShowPopup(false);
        document.getElementById("pres-view-popup").style.display = 'none';
      };
    
      return (
      <div>
        <div className="navbar">
          <div>
            <button onClick={navToHome} className="nav-button">Home</button>
            <button onClick={navToMngProfile} className="nav-button">Manage Profile</button>
            <button onClick={navToAppHis} className="nav-button">Appointment History</button>

              {/* <a href="#">Edit Profile</a>
              <a href="#">Appointment History</a> */}
          </div>
          <div>
          <button className="nav-button1"><img  />{prof_name}</button>

            <button className="nav-button" >Logout</button>
          </div>
        </div>
        <div className="appointment-history">
          <h1>Appointment History</h1>
          <ul className="doctor-list">
            {appoinlist.map(appointment => (
              <li key={appointment.appointment.appointmentId}>
                <div className="doctor-profile">
                  <img className="doctor-photo" src={def_pp} alt="Doctor" />
                  <div className="doctor-info">
                    <p className="doctor-name">{appointment.name}</p>
                    <div className="doctor-spec"><b>{appointment.specialization}</b></div>
                    <div className="info-label"><b>Call Start Time:</b> {appointment.appointment.startTime}</div>
                    {/* <div className="info-value">{doctor.startTime}</div> */}
                    <div className="info-label"><b>Call End Time:</b> {appointment.appointment.endTime}</div>
                    {/* <div className="info-value">{doctor.endTime}</div> */}
                    <div className="info-label"><b>Status: </b>{appointment.appointment.status}</div>
                    {/* <div className="info-value">{doctor.endTime}</div> */}
                    
                    <button onClick={()=>viewPrescription(appointment.appointment.appointmentId,appointment.name,appointment.specialization)}>View Prescriptions</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div id="pres-view-popup" className="appHis-popup">
            <button onClick={closePopup}>Close</button>
            <iframe id="pdf-frame" title="pdf" src="" width="100%" height="100%"></iframe>
          </div>
        </div>
      </div>
      );
}

export default AppoinHist;
