import React, { useState, useEffect } from 'react'
import UseTemplate from '../Hero/UseTemplate';
import axios from 'axios';

const GetFile = () => {

  const [data, setData] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [valueSelected, setValueSelected] = useState(false);

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
    //console.log('changed');
    //console.log(selectedTitle)
  }

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