import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceView() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleViewAttendance = () => {
    axios.get(`http://localhost:3000/attendances/${selectedStudent}`)
      .then(response => {
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
      });
  };

  return (
    <div>
      <h2>View Attendance</h2>
      <label>Select Student:</label>
      <select onChange={(e) => setSelectedStudent(e.target.value)}>
        <option value="">Select</option>
        {students.map(student => (
          <option key={student._id} value={student._id}>{student.Name}</option>
        ))}
      </select>
      <br />
      <button onClick={handleViewAttendance}>View Attendance</button>

      {attendanceRecords.length > 0 && (
        <div>
          <h3>Attendance Records</h3>
          <ul>
            {attendanceRecords.map(record => (
              <li key={record._id}>
                Date: {new Date(record.date).toLocaleDateString()}, Status: {record.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AttendanceView;
