import React from 'react'

const UseTemplate = () => {
  return (
    <div className='DTA__hero_row'>
        <div className="DTA__hero_content_container">
        <div className='DTA__hero_content_title'>
            Using a Template
          </div>
          <div className='DTA__hero_content_desc'>
          the users will be able to type in their own values for the variables that were provided by the admins that uploaded the template. Finally, the User will be able to download a .pdf file with the values entered by the user replacing the variable vallues provided by the User.
          In the user side, once they select a title, all the parsed varibales that are mapped to that particular title in the database. The user then is able to type in the values based on the data type provided by the admin.these values are saved in the file text that was parsed and replaces the variables in parethesis and the user will be able to download a pdf file with the entered values in place of the variables.
          </div>
        </div>
        <div className="DTA__hero_image_container">
          <img src='https://dummyimage.com/500x500/000/fff'/>
        </div>
    </div>
  )
}

export default UseTemplate
