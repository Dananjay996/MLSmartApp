import React from 'react'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import CreateTemplate from '../Hero/CreateTemplate';
import './AddTemplate.css'
import axios from 'axios';

const AddTemplate = () => {

  const [selectedFile,setSelectedFile] = React.useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log('selected file : ', e.target.files[0]);
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    // console.log(e.target.files[0]);
    if(!selectedFile){
      console.log("No file selected")
      return
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile)
    reader.onload = (e) => {
      const content = e.target.result;
    var doc = new Docxtemplater(new PizZip(content), {delimiters: {start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j'}});
    var text = doc.getFullText();
    console.log(text)
    }

    reader.onerror = (error) => {
      console.error('Error parsing file', error);
    }
  }  

  return (
    <>
    <CreateTemplate />
    <form onSubmit={submitHandler}>
      <input type="file" name="WordFile" onChange = {handleFileSelect}/>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default AddTemplate;