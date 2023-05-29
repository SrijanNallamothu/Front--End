import React, { useState, useEffect } from 'react';
import { useSearchParams,createSearchParams, useNavigate } from 'react-router-dom';
import def_pp from '../imgs/profile.png'
import './styles/CallSummary.css'
import jspdf from "jspdf"

function CallSummary(){
    const[searchParams] = useSearchParams();
    const nav = useNavigate();
    const [appointment,setAppointment] = useState({startTime : 'loading...', endTime: 'loading...', status: 'loading...'});
    const [doctor,setDoctor] = useState({name : 'loading...', specialization: 'loading...'});
    const [prof_name, setprofname] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const get_appoin_by_id = async()=>{
        const body = {
            appId : searchParams.get("app_id")
        }
        await fetch('http://localhost:8090/api/v1/appointment/get_appointment_by_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Appointment details ",data)
            setAppointment(data)
        })
        .catch(error => {
            console.log(error)
        });
    }
    const get_doc_by_id = async()=>{
        const body2 = {
            doctorID : searchParams.get("doc_id")
        }
        await fetch('http://localhost:8090/api/v1/doctor/get_doctor_by_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify(body2)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Doctor details ",data)
            setDoctor(data)
        })
        .catch(error => {
            console.log(error)
        });
    }
    useEffect(() => {
        get_prof_name_by_id();
        get_appoin_by_id();
        get_doc_by_id();
    }, [])

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

    const navToHome = () =>{
        nav({
          pathname: '/home_pat',
          search: createSearchParams({
            pat_id: searchParams.get('pat_id')
          }).toString()
        });
      }

      const closePopup = () => {
        setShowPopup(false);
        document.getElementById("pres-view-popup").style.display = 'none';
      };


    return (
        <div className='appointment-summary-page'>
            <h1>Appointment Summary</h1>
            <div>
                <div className="details">
                    <img className="doctor-photo" src={def_pp} alt="Doctor" />
                    <div>
                        <p className="doctor-name">{doctor.name}</p>
                        <div className="doctor-spec"><b>{doctor.specialization}</b></div>
                        <div className="info-label"><b>Call Start Time:</b> {appointment.startTime}</div>
                        <div className="info-label"><b>Call End Time:</b> {appointment.endTime}</div>
                        <div className="info-label"><b>Status: </b>{appointment.status}</div>
                        <span>
                            <button className="app-sumary-btn" onClick={()=>viewPrescription(appointment.appointmentId,doctor.name,doctor.specialization)} style={{marginRight: '40px'}}>View prescription</button>
                            <button className="app-sumary-btn" onClick={navToHome}>Back to home</button>
                        </span>
                    </div>
                    {/* <div>
                        <p className="doctor-name">Dr. Shravan</p>
                        <div className="doctor-spec"><b>Cardiologist</b></div>
                        <div className="info-label"><b>Call Start Time:</b> appointment.startTime</div>
                        <div className="info-label"><b>Call End Time:</b> appointment.endTime</div>
                        <div className="info-label"><b>Status: </b>Completed</div>
                        <span>
                            <button className="app-sumary-btn" onClick={viewPrescription(appointment.appointmentId,doctor.name,doctor.specialization)} style={{marginRight: '40px'}}>View prescription</button>
                            <button className="app-sumary-btn" onClick={navToHome}>Back to home</button>
                        </span>
                    </div> */}
                </div>
            </div>
            <div id="pres-view-popup" className="appHis-popup">
            <button onClick={closePopup}>Close</button>
            <iframe id="pdf-frame" title="pdf" src="" width="100%" height="100%"></iframe>
          </div>
        </div>
    );
  }

export default CallSummary;