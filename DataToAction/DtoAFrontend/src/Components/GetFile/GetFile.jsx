import React, {useState,useEffect} from 'react'
import UseTemplate from '../Hero/UseTemplate';
import axios from 'axios';

const GetFile = () => {

  const [data,setData] = useState([]);
  const [filteredTitles,setFilteredTitles] = useState([]);
  const [selectedTitle,setSelectedTitle] = useState("");

  return (
    <div>
      <UseTemplate />

    </div>
  )
}

export default GetFile;