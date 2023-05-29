

import {React,useState, useEffect} from "react";
import { createSearchParams,useSearchParams,useNavigate } from "react-router-dom";

import './styles/pop.css'
import male_def_pp from '../imgs/male_def_pp.jpg';
import female_def_pp from '../imgs/fem_def_pp.png';
// import def_pp from '../src/imgs/profile.png'


function ProfileSelector() {
  const [profiles,setProfiles] = useState([]);
  const[searchParams] = useSearchParams();
  const nav = useNavigate();

  const onProfileSelect = (profile) => {
    nav({
      pathname: '/home_pat',
      search: createSearchParams({
        pat_id: profile.patientId
      }).toString()
    });
  };
  
   const get_pat_id = async() => {
    if(searchParams.get('mobile') != undefined)
    {
      const get_profiles_body = {
        'mobile_number' : searchParams.get("mobile")
      }
      await fetch('http://localhost:8090/api/v1/patient/display_profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify(get_profiles_body)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setProfiles(data)
      })
      .catch(error => {
        console.log(error)
      });
    }
    else if(searchParams.get('pat_id') != undefined)
    {
        const getProfilesBody = {
          pat_id : searchParams.get('pat_id')
        }
        await fetch('http://localhost:8090/api/v1/patient/get_all_profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
          },
          body: JSON.stringify(getProfilesBody)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setProfiles(data)
        })    
    }
   }

   const get_default_pic =(gender)=>{
    if(gender==='Female' || gender==='female') 
    {
      return female_def_pp;
    }
    else 
    {
      return  male_def_pp;
    }

   }

  useEffect(() => {
    get_pat_id();
  }, [])

  return (
    <div className="popup-overlay">
      <div className="popup">
        {/* <div className="popup-close">
          &times;
        </div> */}
        <div className="popup-header">
          <h2>Select User</h2>
        </div>
        <div className="popup-profiles">
          {profiles.map((profile) => (
            <div
              className="popup-profile"
              key={profile.patientId}
              onClick={() => onProfileSelect(profile)}>
              <img className="profilepics" src={get_default_pic(profile.gender)} alt={profile.name} />
              <h3>{profile.name}</h3>
              <p>{profile.age} years old</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileSelector;

















// function ProfileSelector() {

//    const p1 = {id: 1, avatar: "./imgs/p1.jpeg",name:"Veer", age: 21}
//    const p2 = {id: 2, avatar: "./imgs/p2.jpeg",name:"Rocky", age: 47}
//    const p3 = {id: 3, avatar: "./imgs/p3.jpeg",name:"Ethan", age: 63}

//    const profiles = [p1,p2,p3];

//    const onProfileSelect = () => {alert("Prof selected");};
//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <div className="popup-close" >
//           &times;
//         </div>
//         <div className="popup-header">
//           {/* <img src="/netflix-logo.png" alt="Netflix logo" width="60" /> */}
//           <h2>Select User</h2>
//         </div>
//         <div className="popup-profiles">
//           {profiles.map((profile) => (
//             <div
//               className="popup-profile"
//               key={profile.id}
//               onClick={() => onProfileSelect(profile)}
//             >
//               <img src="p1.jpeg" alt={profile.name} />
//               <h3>{profile.name}</h3>
//               <p>{profile.age} years old</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileSelector;
