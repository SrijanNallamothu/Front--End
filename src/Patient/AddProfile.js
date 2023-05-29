

import React, { useState, useEffect } from "react";
import { useSearchParams, createSearchParams, useNavigate } from "react-router-dom";

import './styles/AddProf.css'


function AddProf() {

  
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const [Name, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setgender] = useState("");
  const [Age, setAge] = useState("");

  const [prof_name, setprofname] = useState('')

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

  

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    if(e.target.value > 99)
    {

    }
    setAge(e.target.value);
  };

  const handlegender= (e) => {
    console.log(e.target.value);
    setgender(e.target.value);
  };


  useEffect(() => {
    console.log(searchParams.get('pat_id'))
    
    get_prof_name_by_id()
    
    console.log("Received pat_id: ", searchParams.get("pat_id"));
    console.log("Received profilename pat_id: ", prof_name);

  }, [])
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const create_patient_body = {
      'pat_id': searchParams.get('pat_id'),
      'name' : Name,
      'age' : Age,
      'gender' : gender,
      'email' : email,
      'consent' : false
    }
    await fetch('http://localhost:8090/api/v1/patient/add_new_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify(create_patient_body)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      nav({
        pathname: '/selectprofile',
        search: createSearchParams({
          pat_id: data.patientId
        }).toString()
      });
    })
    .catch(error => {
      console.log(error)
    });

  };


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


  return (
    <div>
      <div className="navbar">
        <div>
          <button onClick={navToHome} className="nav-button">Home</button>
          <button onClick={navToMngProfile} className="nav-button">Manage Profile</button>
          <button className="nav-button">Appointment History</button>
            {/* <a href="#">Edit Profile</a>
            <a href="#">Appointment History</a> */}
        </div>
        <div>
        <button className="nav-button1"><img  />{prof_name}</button>
          <button className="nav-button" >Logout</button>
        </div>
      </div>


    <div className="addprof-container">
      <h1>Add Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input required type="text" value={Name} onChange={handleFirstNameChange} />


        <label>Age:</label>
        <input required type="number" value={Age} onChange={handleAgeChange} />

        <label id="gen">Gender:</label>
        <select id="gender_dropdown" onChange={handlegender}>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="others">Others</option>
            <option value="Prefer not to say">Prefer not to say</option>
        </select><br/>
        {/* <input type="radio" value="Male" id="male" onChange={handleAgeChange} />
        <label for="male">Male</label>
        <input type="radio" value="Female" id="male" onChange={handleAgeChange} />
        <label for="female">Female</label> */}
        <label>Email:</label>
        <input type="email" value={email} placeholder="(optional)" onChange={handleEmailChange} />
        <button className="Login-doc-button" type="submit">Add Profile</button>
      </form>
    </div>

    </div>
  );
}

export default AddProf;
