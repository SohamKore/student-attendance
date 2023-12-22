import { useState } from 'react';
import axios from 'axios';
import './Student.css';

axios.defaults.baseURL = 'http://localhost:3000/';

const Student = () => {
  const [student, setStudent] = useState({
    Name: '',
    Course: '',
    Phone: '',
    Batch: '',
  });

  const InputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();

    // Validation
    if (!student.Name || !student.Course || !student.Phone || !student.Batch) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/add', student);
      console.log('Response from server:', response.data);
      alert('Student added successfully');

      // Reset form
      setStudent({
        Name: '',
        Course: '',
        Phone: '',
        Batch: '',
      });
    }catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error status:', error.response.status);
        console.error('Server error details:', error.response.data);
        alert('Failed to add student. ' + error.response.data.message); // Adjust this based on your server response format
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
        alert('Failed to add student. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        alert('Failed to add student. Please try again.');
      }
    }
    
  };
  

  return (
    <div className="main relative h-screen overflow-hidden bg-purple-400 flex justify-center items-center">
      {/* ... (existing styling) */}
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-left mb-4 cursor-pointer">
            Add <span className="text-purple-300 drop-shadow-lg">Student</span>
          </h1>
        </div>
        <div className="space-y-4">
          <input
            name="Name"
            onChange={InputChange}
            value={student.name}
            autoComplete="true"
            type="text"
            placeholder="Name"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            name="Course"
            onChange={InputChange}
            value={student.Course}
            autoComplete="true"
            type="text"
            placeholder="Course"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            name="Phone"
            onChange={InputChange}
            value={student.Phone}
            autoComplete="true"
            type="text"
            placeholder="Phone"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            name="Batch"
            onChange={InputChange}
            value={student.Batch}
            autoComplete="true"
            type="text"
            placeholder="Batch"
            className="block text-lg py-3 px-4 rounded-lg w-full border outline-none"
          />
        </div>
        <div className="text-center mt-6">
          <button
            onClick={postData}
            className="py-3 w-64 text-xl text-white bg-purple-400 transition ease-in-out duration-500  hover:bg-purple-500  rounded-2xl"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
