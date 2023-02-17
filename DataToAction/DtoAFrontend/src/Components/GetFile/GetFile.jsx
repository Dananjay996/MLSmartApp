import React, { useState, useEffect } from 'react'
import UseTemplate from '../Hero/UseTemplate';
import axios from 'axios';

const GetFile = () => {

  const [data, setData] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [valueSelected, setValueSelected] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});
  const [valueObject, setValueObject] = useState({})

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


  const handleSelect = (event) => {
    setSelectedTitle(event.target.value);
    setValueSelected(true);
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/template/${event.target.value}`);
      console.log(response.data)
      setSelectedObject(response.data);
      var arr = response.data.inputFields;
      console.log(arr)
      var obj = {}
      arr.forEach((item) => {
          obj[item.name] = ""
          
      })
      setValueObject(obj)
    }
    fetchData();
  }

  useEffect(() => {
    console.log(valueObject)
  },[valueObject])

  return (
    <div>
      <UseTemplate />
      <select value={selectedTitle} onChange={handleSelect}>
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
              <div key={obj._id}>
                {obj.inputFields.map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name}>{field.name} : </label>
                    <input type={field.type}/>
                  </div>
                ))}
              </div>
            ))}
        </>
      )}



    </div>
  )
}

export default GetFile;