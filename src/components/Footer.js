import React from 'react';
import { 
    FaGithubSquare, 
    FaLinkedin,
    FaMedium,
    FaDribbbleSquare,
} from 'react-icons/fa';
import './components.css';

function Footer() {
    return (
      <footer>
        <h3 className='Footer-title'>ONE SOURCE</h3>
        <h4 className='Footer-text'>For your web and mobile development.</h4>
        <ul className='Footer-icons'>
        <FaGithubSquare />
        <FaLinkedin />
        <FaMedium />
        <FaDribbbleSquare />
        </ul>
      </footer>
    );
  }
  
  export default Footer;
  