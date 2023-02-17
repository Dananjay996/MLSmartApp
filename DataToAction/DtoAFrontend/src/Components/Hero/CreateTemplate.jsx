import React from 'react'

const CreateTemplate = () => {
  return (
    <div className='DTA__hero_row'>
      <div className='DTA__hero_image_container'>
        <img src='https://dummyimage.com/500x500/000/fff' />
      </div>
      <div className="DTA__hero_content_container">
        <div className='DTA__hero_content_title'>
          Creating a Template
          </div>
        <div className='DTA__hero_content_desc'>
          We help Admins of an organisation to upload template word files and provide them with variable names. The word file is parsed and the admin can select the particular data type that would be matched with the variable. The uploaded word document is parsed as a string and the values that are enclosed within parenthesis are identified by an asynchrounous javascript function and those values are shown to the admin to enter the data type of those variables.
          In the user side, once they select a title, all the parsed varibales that are mapped to that particular title in the database.
          </div>
      </div>
    </div>
  )
}

export default CreateTemplate
