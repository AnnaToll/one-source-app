import './components.css';
import { useState } from 'react';
import DiscordService from '../services/DiscordService';

function Contact() {
  let a = 1;
  const [formData, setFormData] = useState({
    data: {
      name: '',
      email: '',
      message: ''
    },
    error: {},
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postToDiscord();
    setFormData({
      data: {
        name: '',
        email: '',
        message: ''
      },
      error: {},
    });
  };

  const setDynamicFormData = (name, value) => {
    setFormData({
      data: {
        ...formData.data,
        [name]: value,
      },
      error: {},
    });
  };

  const {Send} = DiscordService();

  const postToDiscord = () => {
    const description = Object.entries(formData.data)
    .map((d) => `${d[0]} : ${d[1]}`).join('\n');
    Send(description);

  };

  return (
    <section className='contact-container'>
      <div className='inner-container'>
        <h1>Contact</h1>

        <div className='adress'>
        <p>Address:</p>
        <p>One Sourcevägen 1</p>
        <p>111 11 Stockholm</p>
        <p>Phone: +4611-111 11 11</p>
        </div>
        
        <form className='contactForm' onSubmit={handleSubmit}>
          <input placeholder='Name' value={formData.data.name} name='name' type='text' 
            onChange={(e) => {
            const {name, value} = e.target;
            setDynamicFormData(name, value);
          }} />

          <input placeholder='Email' value={formData.data.email} name='email' type='email' 
            onChange={(e) => {
            const {name, value} = e.target;
            setDynamicFormData(name, value);
          }} />

          <textarea placeholder='Enter message here' value={formData.data.message} name='message' rows="5" cols="40" type='text' 
          onChange={(e) => {
            const {name, value} = e.target;
            setDynamicFormData(name, value);
          }} />
          
          <button>Send</button>
        </form>
        </div>
    </section>
  );
}

export default Contact;