import React from 'react'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import CreateTemplate from '../Hero/CreateTemplate';
import './AddTemplate.css'
import axios from 'axios';


const Inputcomponent = (value) => {
  console.log(value);
  return (
    <div>      
      <label htmlFor={`${value}`}>{value.value} : </label>
      <select name={value} id={`${value}`}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="email">Email</option>
      </select>
    </div>

  )
}

const AddTemplate = () => {
  const [selectedFile,setSelectedFile] = React.useState(null);
  const [varArray,setVarArray] = React.useState([]);
  const [valDataType,setValDataType] = React.useState([]);
  const [parsedText, setText] = React.useState('')
  const [showDropDown,setShowDropDown] = React.useState(false);
  const [title,setTitle] = React.useState("");

  const submitHandler = (e) => {

  }

  const appendVar = (value) => {
    setShowDropDown(true);
    setVarArray(varArray => [...varArray,value])
    setValDataType(valDataType => [...valDataType,"text"]);

  }
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    //console.log(selectedFile);
  }

  const Parse = (e) => {
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
    {showDropDown &&
    <div className="template__div">
      <label htmlFor="title">Title : </label>
      <input type="text" name="title" id="title" onChange={(e) => {setTitle(e.target.value)}}/>
      {
        //console.log(title)
      }
      {varArray &&
        varArray.map((element,index) => {
          return (
            <Inputcomponent value={element}/>
          )
        })
      }
      <button onClick={submitHandler}>Submit</button>
    </div>
    }
    </>
  )
}

export default AddTemplate;