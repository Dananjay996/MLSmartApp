import React from 'react'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import CreateTemplate from '../Hero/CreateTemplate';
import './AddTemplate.css'
import axios from 'axios';


const AddTemplate = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [varArray, setVarArray] = React.useState([]);
  let [valDataType, setValDataType] = React.useState([]);
  //const valDataType = [];
  const [parsedText, setText] = React.useState('')
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const inputChangeHandler = (index) => (e) => {
    let newArray = valDataType;
    //console.log(index);
    //console.log(e.target.value);
    newArray[index] = e.target.value;
    //console.log(newArray);
    setValDataType(newArray);
    //console.log(valDataType);
  }

  
  const submitHandler = (e) => {
    const sendArray = varArray.map((value, index) => {
      return {
        name: value,
        type: valDataType[index]
      };
    });
    var response = axios.post('http://localhost:3000/add-template', {
      title: title,
      content: parsedText,
      inputFields: sendArray
    }).then(res => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

  }

  const appendVar = (value) => {
    setShowDropDown(true);
    setVarArray(varArray => [...varArray, value])
    setValDataType(valDataType => [...valDataType, "text"]);
    //valDataType.push('text');

  }
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    //console.log(selectedFile);
  }

  const Parse = (e) => {
    e.preventDefault()
    if (!selectedFile) {
      window.alert("No file selected")
      return
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile)
    reader.onload = (e) => {
      const content = e.target.result;
      var doc = new Docxtemplater(new PizZip(content), { delimiters: { start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j' } });
      var text = doc.getFullText();
      setText(text)
      const regex = /\((.*?)\)/g;

      let match;
      while ((match = regex.exec(text)) !== null) {

        appendVar(match[1]);
      }
    }

    reader.onerror = (error) => {
      console.error('Error parsing file', error);
    }
  }



  //console.log(sendArray);


  return (
    <div className="template__div">
    <CreateTemplate />
    <form>
      <input type="file" name="WordFile" onChange = {handleFileSelect}/>
      <button type="button" onClick={Parse}>Parse</button>
    </form>
    {showDropDown &&
    <div className="template__div_items">
      <label htmlFor="title">Title : </label>
      <input type="text" name="title" id="title" onChange={(e) => {setTitle(e.target.value)}}/>
      {
        //console.log(title)
      }
      {varArray &&
        varArray.map((element,index) => {
          //console.log(valDataType);
          return (
            <div className-="template__div_items">      
              <label htmlFor={element}>{element} : </label>
              <select name={element} id={`${element}`} onChange={inputChangeHandler(index)}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
              </select>
            </div>
          )
        })
      }
      <button onClick={submitHandler}>Submit</button>
    </div>
    }
    </div>
  )
}

export default AddTemplate;