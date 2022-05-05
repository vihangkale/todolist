import React, { useState, useEffect } from 'react';

function App() {
  const [fieldData, setFieldData] = useState([]);
  const [updateFieldData, setUpdateFieldData] = useState([]);
  let [fieldsData, setFieldsData] = useState([]);

  useEffect(()=>{
     fieldsData = [
      {
        name:"Name",
        type:"text"
      },
      {
        name:"Date",
        type:"date"
      },
    ]

    setFieldsData(fieldsData) 

  },[])

  return (
    <div className="table">

      <h1>Add Task</h1>
      <form>
        <div className="display-flex flex-direction-column">
          {fieldsData && fieldsData.map((field)=> (
            <div key={field.name} className="display-flex flex-direction-column">
              <label>{field.name}</label>
              <input name={field.name} type={field.type}/> 
            </div>
            )
          )}
        </div>
        <button className="m-t-10" type="submit" onClick={(e)=> e.preventDefault()}>Add Task</button>
      </form>

      <h1>Tasks</h1>
        <table>
          <thead>
               <tr>
                 <th>Task Done </th>
                 <th>Name</th>
                 <th>Date</th>
               </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
              <td>thtrhtr</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}

export default App;
