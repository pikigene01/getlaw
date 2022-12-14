import { Email, Message, WhatsApp } from '@material-ui/icons'
import React,{useRef,useState,useEffect} from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import './Contact.css'
import emailjs from 'emailjs-com'
import swal from 'sweetalert'

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState({
    isLoading: false,
  });
  const [userForm, setUserForm] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    readyOnly: false
  });
  document.title = "Welcome to GrinIt | Contact Us";

  const sentEmail = (e) => {
    e.preventDefault();
  const form_current = form.current;
  alert(form_current);

  }
  const dataChange = (e) =>{
    e.preventDefault();
    setUserForm({...userForm,[e.target.name]:e.target.value});
  }
  useEffect(()=>{
    const profiless = JSON.parse(localStorage.getItem('user_profile'));
 
    profiless?.map((data)=>{
      setUserForm({...userForm, name: data.name,surname: data.surname,phone: data.phone,email: data.email,readyOnly: true});
    });
    
   },[]);
  return (
    <>
    <Header/>
    <div
          className={
            loading.isLoading ? "auth-body page-loading" : "page-loading-false"
          }
        >
          <div
            className={
              loading.isLoading
                ? "auth-body page-loading-content"
                : "page-loading-content-false"
            }
          ></div>
        </div>
    <div className='contact_wrapper'>
      <div className='contact_body'>
        <div className='contact_header'>
          <h2 className='contact_title'>Contact Us</h2>
          
        </div>
        <div className='contact_body grid_contact'>
          <div>
<div className='card_contact'>
  <div className='card_header'>
  <Email className='card_icon'/> <div className="title">Email</div>
  </div>
  <div className='card_body'>
    <small className='card_title'>pikigene01@gmail.com</small>
    <a href="mailto:pikigene01@gmail.com" target="_blank">Sent a message</a>
  </div>
</div>
<div className='card_contact'>
  <div className='card_header'>
  <Message className='card_icon'/> <div className="title">Messenger</div>
  </div>
  <div className='card_body'>
    <small className='card_title'>GeneLaw</small>
    <a href="/" target="_blank">Sent a message</a>
  </div>
</div>
<div className='card_contact'>
  <div className='card_header'>
  <WhatsApp className='card_icon'/> <div className="title">Whatsapp</div>
  </div>
  <div className='card_body'>
    <small className='card_title'>+263 719 718 583</small>
    <a href="https://wa.me/+263719718583" target="_blank">Sent a message</a>
 </div>
</div>
</div>
<div>
  <form ref={form} onSubmit={sentEmail} className='contact_form'>
    <input type="text" disabled={userForm.readyOnly} onChange={dataChange} name="name" value={userForm.name} required className='input_contact' placeholder="Enter your name" />
    <input type="email" disabled={userForm.readyOnly} onChange={dataChange}  name="email" value={userForm.email} required className='input_contact' placeholder="Enter your email" />
    <textarea rows="7" onChange={dataChange} name="message" required className='message_input input_contact' placeholder="Enter your message here" />
    <button type="submit" className='btn_contact'>Send Your Message</button>
  </form>
</div>
          </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
