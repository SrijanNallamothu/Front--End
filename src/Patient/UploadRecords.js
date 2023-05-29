import React, { useState, useEffect} from 'react';
import file_icon from './imgs/fileicon.svg';
import './styles/UploadRecords.css';

function Modal ({toggle, upload_type, pat_id, app_id})  {
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleFileUpload = (event) => {
    const newFiles = [...files];
    const newNames = [...names];
    const newDescriptions = [...descriptions];
    for (let i = 0; i < event.target.files.length; i++) {
      newFiles.push(event.target.files[i]);
      newNames.push(event.target.files[i].name);
      newDescriptions.push("-");
    }
    setFiles(newFiles);
    setNames(newNames);
    setDescriptions(newDescriptions);
  };

  const handleNameChange = (event, index) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };

  const handleDescriptionChange = (event, index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    const newNames = [...names];
    const newDescriptions = [...descriptions];
    newFiles.splice(index, 1);
    newNames.splice(index, 1);
    newDescriptions.splice(index, 1);
    setFiles(newFiles);
    setNames(newNames);
    setDescriptions(newDescriptions);
  };


  const handleAddFiles = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = ".pdf,.png";
    fileInput.addEventListener("change", handleFileUpload);
    fileInput.click();
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }
    formData.append('names',names)
    formData.append('descriptions', descriptions)
    formData.append('patId', parseInt(pat_id))
    formData.append('appId', app_id)
    console.log(names)
    console.log(descriptions)
  
    fetch('http://localhost:8090/api/v1/health_records/upload', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*' 
      },
      body: formData
    })
    .then(response => {
      // Handle the response from the server
      console.log(response);
      toggle("close");
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });

  };


  return (
    <div className='upload-files-modal'>
      <div className="upload-files-modal-content">
        <form className="FileUploader" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="FileUploader-header">
            <h2>Upload Health Records {upload_type}</h2>
          </div>
          {files.map((file, index) => (
            <div className="FileUploader-file" key={index}>
              <div>
              <img
                className="FileUploader-preview"
                src={file_icon}
                alt={`Uploaded file ${index}`}
              />
                <button type="button" onClick={() => handleRemoveFile(index)}>
                    Remove
                </button>
              </div>
              <div className="FileUploader-details">
                <div className="FileUploader-detail">
                  <label htmlFor={`name-${index}`}>Name:</label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    value={names[index]}
                    onChange={(event) => handleNameChange(event, index)}
                  />
                </div>
                <div className="FileUploader-detail">
                  <label htmlFor={`description-${index}`}>Description:</label>
                  <textarea 
                    placeholder='(optional)'
                    rows="2" cols="70"
                    type="text"
                    id={`description-${index}`}
                    value={descriptions[index]}
                    onChange={(event) => handleDescriptionChange(event, index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddFiles}> Add Files</button>
          <button className="FileUploader-submit" type="submit">
            Submit
          </button>
        </form>
        <button className="upload-files-modal-close" onClick={toggle("close")}>
            Close
        </button> 
        </div>
       </div>    
  );
};

export default Modal;
