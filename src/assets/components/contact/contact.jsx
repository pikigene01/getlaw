import { Email, Message, WhatsApp } from '@material-ui/icons'
import React,{useRef} from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import './Contact.css'
import emailjs from 'emailjs-com'
import swal from 'sweetalert'

export default function Contact() {
  const form = useRef();

  const sentEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_g69iq3f', 'template_n4wgrlu', form.current, 'mR69KpPUPXOU0bVdM')
    .then((result) => {
      swal("Success", result.text+" Message have been sent successfully","success");
        console.log(result.text);
        e.target.reset();
    }, (error) => {
      swal("Warning", error.text+" Message not sent...","warning");
      
        console.log(error.text);
      
    });

  }
  return (
    <>
    <Header/>
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
    <small className='card_title'>info@gene.com</small>
    <a href="info@gene.com" target="_blank">Sent a message</a>
  </div>
</div>
<div className='card_contact'>
  <div className='card_header'>
  <Message className='card_icon'/> <div className="title">Messenger</div>
  </div>
  <div className='card_body'>
    <small className='card_title'>genelaw</small>
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
    <input type="text" name="name" required className='input_contact' placeholder="Enter your name" />
    <input type="email" name="email" required className='input_contact' placeholder="Enter your name" />
    <textarea rows="7" name="message" required className='message_input input_contact' placeholder="Enter your message here" />
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
