import React, { useState, useEffect } from 'react'
import UseTemplate from '../Hero/UseTemplate';
import axios from 'axios';
import './GetFile.css';

const GetFile = () => {

  const [data, setData] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [valueSelected, setValueSelected] = useState(false);
  const [selectedObject, setSelectedObject] = useState({})

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
    return (
      <div></div>
    )
  }


  const handleSelect = (event) => {
    setSelectedTitle(event.target.value);
    setValueSelected(true);
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/template/${event.target.value}`);
      console.log(response.data)
      setSelectedObject(response.data);
    }
    fetchData();
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
                    <input type={field.type}/>
                  </div>
                ))}
              </div>
              <button onClick={submitHandler}>Submit Values</button>
              </>
            ))}
        </>
      )}



    </div>
  )
}

export default GetFile;