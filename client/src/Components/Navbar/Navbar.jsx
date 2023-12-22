import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className='sidebar'>
        <nav>
           <NavLink className="link" to="/">Students</NavLink>
           <NavLink className="link" to="/add">Add Students</NavLink>
           <NavLink className="link" to="/attendences">Attendence Report</NavLink>
        </nav>
    </div>
  )
}

export default Navbar