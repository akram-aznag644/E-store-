import React from 'react';
import "../styles/headerstyle.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const get_token=useSelector(state=>state.user.token)

  return (
    <div>
      <nav>
        <h3>website</h3>
        <ul>
          <li><Link to="/">home</Link></li>
         
          {
            get_token?<li><Link to="/logout">logout</Link></li>
            :
            <>
             <li><Link to="/login">login</Link></li>
             <li><Link to="/signup">signup</Link></li>
            </>

          }
        </ul>
      </nav>
    </div>
  );
}
