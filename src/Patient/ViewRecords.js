import React, { useEffect, useState } from "react";
import "./styles/displayFiles.css";

const DisplayFiles = () => {
  const [files,setFiles] = useState([]);
  useEffect(() => {
    display_file();
  }, [])

  const display_file = async() => {
    const formData = new FormData();
    formData.append('pat_id', 1)
    await fetch('http://localhost:8090/api/v1/health_records/get_record_by_pat_id',{
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*' 
      },
      // responseType: "json",
      body: formData
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((list) => {
      for(const element of list)
      {
        fetch('data:'+element['headers']['Content-Type']+';base64,' + element['body'].data)
        .then(async(res)=>{
          const blob = await res.blob()
          console.log(blob)
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            setFiles(current => [...current, {name : element.body.name, type: blob.type , url : fileReader.result}])
          };
          fileReader.readAsDataURL(blob);
        })
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  }

  const handleCloseModal = () => {
    setSelectedFile(null);
  }

  return (
    <div className="App">
      <h1>File List</h1>
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index} onClick={() => handleFileClick(file)}>
            {file.name}
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div className="modal">
          {selectedFile.type.substr(0,5) === 'image' ? (
            <img src={selectedFile.url} alt={selectedFile.name} />
          ) : (
            <iframe src={`${selectedFile.url}#view=fitH`} type="application/pdf" title={selectedFile.name} height="100%" width="100%" />
          )}
          <button onClick={handleCloseModal}>X</button>
        </div>
      )}
      <br/>
    </div>
  );
};

export default DisplayFiles;
