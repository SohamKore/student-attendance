import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://student-attendance-ten.vercel.app/')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsList;
