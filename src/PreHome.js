
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PreHome.css'

function Page1() {
  const nav = useNavigate();
  const nav_doc_login = () => {nav('/login_doc')}
  const nav_pat_login = () => {nav('/login_p')}

  
  return (
  <div>
    <div className="button-container">
      <button className="pg1-button" id="doctor" onClick={nav_doc_login}>Doctor Login</button>
      <button className="pg1-button" id="patient" onClick={nav_pat_login}>Patient Login</button>
    </div>

    <div className="about-us">
      <h2>About Us</h2>
      <p>Welcome to [Tele-Consultation Healthcare], where we are dedicated to providing high-quality, convenient and affordable healthcare services to all of our patients. Our team of experienced and compassionate healthcare professionals are committed to your health and well-being, and we pride ourselves on delivering exceptional patient care. At [Tele-Consultation Healthcare], we understand that visiting the doctor's office can be a daunting task, especially in the current times. That's why we've created an easy and convenient way for you to access healthcare services from the comfort of your own home. Our teleconsultation platform allows you to schedule virtual appointments with our healthcare professionals, all from your smartphone, tablet or computer. No more waiting in crowded waiting rooms or spending hours traveling to and from appointments. Our team of healthcare professionals consists of doctors, nurses, and other specialists, who have years of experience in their respective fields. They are dedicated to providing personalized and compassionate care to each and every patient, and will work with you to develop a treatment plan that suits your specific needs. We also offer a range of services to cater to your healthcare needs, including general medical consultations, mental health counseling, and specialist consultations. Our teleconsultation platform allows you to schedule appointments at a time that works for you, and our team will work with you to ensure that you receive the care you need, when you need it. At [Tele-Consultation Healthcare], we are committed to delivering exceptional patient care, and we believe that healthcare should be affordable and accessible to all. That's why we offer competitive pricing and accept a range of insurance plans to ensure that you receive the care you need without breaking the bank. Thank you for choosing [Tele-Consultation Healthcare] for your healthcare needs. We look forward to working with you to achieve optimal health and well-being.</p>
    </div>
  </div>
  );
}

export default Page1;
