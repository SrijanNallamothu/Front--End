import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Logincg from './Patient/Login';
import Regc from './Patient/Register';
import ProfileSelector from './Patient/SelectProfile';
import Regdoc from './Doctor/Register';
import Logindoc from './Doctor/Login';
import DocHome from './Doctor/DocHome';
import Page1 from './PreHome';
import DoctorList from './Patient/SelectDocApp';
import DoctorCall from './Doctor/DoctorCall'
import PatientCall from './Patient/PatientCall'
import Homepat from './Patient/HomePage';
import Modal from './Patient/UploadRecords';
import PatList from './Patient/ManageProfiles';
import AddProf from './Patient/AddProfile';
import AppoinHist from './Patient/AppHistory';
import WaitingPage from './Patient/WaitingPage'
import DocAppoinHist from './Doctor/AppHistory';
import DisplayFiles  from './Patient/ViewRecords';
import CallSummary from './Patient/CallSummary';

function App() 
{
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Page1 />} />
      <Route exact path="/login_p" element={<Logincg />} />     
      <Route exact path="/register_p" element={<Regc />} />
      <Route exact path="/login_doc" element={<Logindoc />} />
      <Route path="/register_doc" element={<Regdoc />} />
      <Route path="/DocHome" element={<DocHome />} />
      <Route path="/select_doc" element={<DoctorList />} />
      <Route path="/selectprofile" element={<ProfileSelector/>}/> 
      <Route path="/patient_call" element={<PatientCall/>}/> 
      <Route path="/doctor_call" element={<DoctorCall/>}/> 
      <Route path="/home_pat" element={<Homepat/>}/> 
      <Route path="/upload_records" element={<Modal/>}/> 
      <Route path="/patlist" element={<PatList/>}/>
      <Route path="/addprof" element={<AddProf/>}/> 
      <Route path="/appoinhist" element={<AppoinHist/>}/> 
      <Route path="/waiting_page" element={<WaitingPage/>}/> 
      <Route path="/DocAppoinHist" element={<DocAppoinHist/>}/> 
      <Route path="/view_records" element={<DisplayFiles/>}/>
      <Route path="/call_summary" element={<CallSummary/>}/>
    </Routes>
  </Router>    
  );
}
export default App;