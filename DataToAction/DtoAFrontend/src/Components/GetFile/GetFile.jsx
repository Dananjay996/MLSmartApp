import React, { useState, useEffect } from 'react'
import UseTemplate from '../Hero/UseTemplate';
import axios from 'axios';
import './GetFile.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const generatePDF = (text) => {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');

  // Add text to the PDF document
  doc.text(text, 10, 10);

  // Save the PDF document and allow the user to download it
  doc.save('my-document.pdf');
}

const GetFile = () => {

  const [data, setData] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [valueSelected, setValueSelected] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});
  const [valueObject, setValueObject] = useState({})
  let [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/all-template');
      //console.log(result);
      setData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const titles = data.map((object) => object.title);
    setFilteredTitles(titles.filter((title) => title));
  }, [data]);

  const submitHandler = () => {
    //console.log(text);
    let newText = text;
    for (const key in valueObject) {
      newText = newText.replace("(" + key.toString() + ")", ` ${valueObject[key]} `);
      //console.log(newText);
      //console.log(valueObject[key]);
      //console.log(key);
    }
    setText(newText);
  }

  const pdfHandler = () => {
    generatePDF(text);
  }




  const handleSelect = (event) => {
    setSelectedTitle(event.target.value);
    setValueSelected(true);
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/template/${event.target.value}`);
      //console.log(response.data)
      setSelectedObject(response.data);
      setText(response.data.content);
      var arr = response.data.inputFields;
      //console.log(arr)
      var obj = {}
      arr.forEach((item) => {
        obj[item.name] = ""

      })
      setValueObject(obj)
    }
    fetchData();
  }

  useEffect(() => {
    console.log(text);

  }, [text])

  const handleChange = (e, field) => {
    var obj = valueObject;
    //console.log(field.type);
    obj[field.name] = e.target.value;
    setValueObject(obj)
    //console.log(valueObject);

  }

  return (
    <div className="DTA__fileGet_container">
      <UseTemplate />
      <select value={selectedTitle} onChange={handleSelect} className="DTA__select_container">
        {filteredTitles.map((title, index) => (
          <option key={index} value={title}>
            {title}
          </option>
        ))}
      </select>

      {valueSelected && (
        <>
          {data
            .filter((obj) => obj.title === selectedTitle)
            .map((obj) => (
              <>
                <div key={obj._id} className="DTA__dropdown_container">
                  {obj.inputFields.map((field) => (
                    <div key={field.name} className="DTA__dropdown_container_item">
                      <label htmlFor={field.name}>{field.name} : </label>
                      <input type={field.type} onChange={(e) => handleChange(e, field)} />
                    </div>
                  ))}
                </div>
                <button onClick={submitHandler}>Submit Values</button>
              </>
            ))}
        </>
      )}

      <button onClick={pdfHandler}>Generate PDF</button>



    </div>
  )
}

export default GetFile;