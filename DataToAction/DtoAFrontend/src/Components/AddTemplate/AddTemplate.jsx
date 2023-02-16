import React from 'react'
import './AddTemplate.css'
import axios from 'axios';

const AddTemplate = () => {

  const [selectedFile,setSelectedFile] = React.useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const submitHandler = async (e) => {
    // console.log(e.target.files[0]);
    e.preventDefault();

    const formData = new FormData();
    formData.append("selectedFile", selectedFile);

    try{
      const response = await axios({
        method : "post",
        url : "http://localhost:3000/add-template",
        data : formData,
        headers : {"Content-Type" : "multipart/form-data"},
      });
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="file" name="WordFile" onChange = {handleFileSelect}/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddTemplate;