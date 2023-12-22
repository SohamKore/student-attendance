import Home from './Pages/Home/Home';
import Student from './Pages/Student/Student';
import Error from './Pages/Error/Error';
import Header from './Components/Header/Header';
import Attendence from './Pages/Attendence/Attendence';
import Update from "./Pages/Update/Update"
import AttendanceMark from "./Components/AttendenceMark/AttendenceMark";
import AttendanceView from "./Components/AttendenceView/AttendenceView";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from "./Components/StudentList/StudentList"
        // Inside the App component in App.jsx
        import MarkAttendance from "./Components/MarkAttendance/MarkAttendance.jsx";
import "./index.css";
function App() {
  return (
    <>
    <div className='main'>
      <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<StudentList />}></Route>
        <Route path='/add' element={<Student/>}></Route>
        <Route path='/student/:id' Component={Update} element={<Update/>}></Route>
        <Route path='/attendances' element={<Attendence/>}></Route>
        <Route path="/mark-attendance" element={<AttendanceMark />}></Route>
        <Route path="/view-attendance" element={<AttendanceView />}></Route>
        <Route path='*' element={<Error/>}></Route>


<Route path="/mark-attendance" element={<MarkAttendance />} />

      </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
