import React, { useState, useEffect } from "react";
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';

import "./styles/waitingpage.css";

const WaitingPage = () => {
    const nav = useNavigate()
    const [queueCount, setqueueCount] = useState(-1);
    const[searchParams] = useSearchParams();
  
    useEffect(() => {
        //Api call to get the just finished appointment. 
        const get_curr_app_body = {
            appId : searchParams.get("app_id")
        }

        const intervalId = setInterval(async() => {
            fetch('http://localhost:8090/api/v1/appointment/get_queue_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                },
                body: JSON.stringify(get_curr_app_body)
            })
            .then((response) => response.json())
            .then(async(obj) => {
                console.log(obj)
                if(obj.doctor_live == false) 
                {
                  const set_status_body = {
                    appId : searchParams.get("app_id"),
                    value : 'cancelled'
                  }
                  await fetch('http://localhost:8090/api/v1/appointment/set_status', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*' 
                    },
                    body: JSON.stringify(set_status_body)
                  }).then((response)=>{
                    nav({
                      // pathname: '/select_doc',
                      // search: createSearchParams({
                      //   pat_id: searchParams.get("pat_id")
                      // }).toString()
                      pathname: '/call_summary',
                      search: createSearchParams({
                          pat_id: searchParams.get("pat_id"),
                          doc_id: searchParams.get("doc_id"),
                          app_id: searchParams.get("app_id")
                      }).toString()
                    });
                    
                  })
                  
                }  
                if(obj.status === 'live')
                {
                    nav({
                        pathname: '/patient_call',
                        search: createSearchParams({
                          doc_id: searchParams.get("doc_id"),
                          pat_id: searchParams.get("pat_id"),
                          app_id: searchParams.get("app_id")
                        }).toString()
                    });
                } 
                else {
                  setqueueCount(obj.count);
                }
            });
        }, 5000);
      
        // Return a cleanup function that clears the interval when the component unmounts
        return () => {
          clearInterval(intervalId); // Stop the interval
        };
      }, []);

    return (
    <div className="waiting-page">
      <div className="loading-spinner"></div>
      <p className="waiting-text">You are added to the Queue. Please wait for your turn ..... </p>
      <p>Number of appointments ahead in the queue : </p>
      {
        (queueCount == -1)?(
          <p> Loading...</p>
        ):<p>{queueCount}</p>

      }
    </div>
  );
};

export default WaitingPage;