import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'https://localhost:3000/';


const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className='container'>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Batch</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((student) => (
                <tr key={student._id}>
                  <td>{student.Name}</td>
                  <td>{student.Course}</td>
                  <td>{student.Phone}</td>
                  <td>{student.Batch}</td>
                  <td><button onClick={()=>{navigate(`./student/${student._id}`)
}}>Edit</button></td>
                  <td><button>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
