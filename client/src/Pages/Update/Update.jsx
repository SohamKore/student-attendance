
import React, { useEffect, } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const Update = () => {
  const { id } = useParams();
const [student, setStudent] = useState({
  Name: '',
  Course: '',
  Phone: '',
  Batch: '',
});

useEffect(() => {
  let isMounted = true;

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`/student/${id}`);
      if (isMounted) {
        setStudent(response.data);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  fetchStudentDetails();

  return () => {
    isMounted = false;
  };
}, [id]);

const handleUpdateStudent = async () => {
  try {
    // Make a PUT request to update the student details
    await axios.put(`/student/${id}`, student);
    console.log('Student updated successfully!');
    setStudent({
      Name:"",
      Course:"",
      Phone:"",
      Batch:""
    })
    alert("Update Success..");
    // You can redirect the user to another page or take any other action upon successful update
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setStudent((prevStudent) => ({
    ...prevStudent,
    [name]: value,
  }));
  

};


    return (

      <div className="main relative h-screen overflow-hidden bg-purple-400 flex justify-center items-center">
      {/* ... (existing styling) */}
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-left mb-4 cursor-pointer">
            Update <span className="text-purple-300 drop-shadow-lg">Student</span>
          </h1>
        </div>
        <div className="space-y-4">
          <input
            name="Name"
            onChange={handleInputChange}
            value={student.Name}
            autoComplete="true"
            type="text"
            placeholder="Name"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            name="Course"
            onChange={handleInputChange}
            value={student.Course}
            autoComplete="true"
            type="text"
            placeholder="Course"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            name="Phone"
            onChange={handleInputChange}
            value={student.Phone}
            autoComplete="true"
            type="text"
            placeholder="Phone"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            name="Batch"
            onChange={handleInputChange}
            value={student.Batch}
            autoComplete="true"
            type="text"
            placeholder="Batch"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handleUpdateStudent}
            className="py-3 w-64 text-xl text-white bg-purple-400 transition ease-in-out duration-500  hover:bg-purple-500  rounded-2xl"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>

    )
  }

export default Update