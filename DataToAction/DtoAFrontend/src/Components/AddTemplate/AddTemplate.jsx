import React from 'react'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import CreateTemplate from '../Hero/CreateTemplate';
import './AddTemplate.css'
import axios from 'axios';

const AddTemplate = () => {
  const [selectedFile,setSelectedFile] = React.useState(null);
  const varArray = [];
  const [parsedText, setText] = React.useState('')
  const appendVar = (value) => {
    varArray.push(value);
  }
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const Parse = async (e) => {
    e.preventDefault()
    if(!selectedFile){
      window.alert("No file selected")
      return
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile)
    reader.onload = (e) => {
      const content = e.target.result;
      var doc = new Docxtemplater(new PizZip(content), {delimiters: {start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j'}});
      var text = doc.getFullText();
      setText(text)
      const regex = /\((.*?)\)/g;

      let match;
      while((match = regex.exec(text)) !== null){
        appendVar(match[1]);
      }
    }

    reader.onerror = (error) => {
      console.error('Error parsing file', error);
    }
  }  

  return (
    <>
    <CreateTemplate />
    <form>
      <input type="file" name="WordFile" onChange = {handleFileSelect}/>
      <button type="button" onClick={Parse}>Parse</button>
    </form>
    </>
  )
}

export default AddTemplate;