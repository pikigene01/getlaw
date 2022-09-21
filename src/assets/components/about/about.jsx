import React,{useEffect,useState} from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import './About.css'
import { ArchiveRounded, ConfirmationNumber, RemoveRedEye, ViewStream } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import about_img from '../../imgs/msg.svg';
import about_img_2 from '../../imgs/video-creation.jpg';
import video_img from '../../imgs/build-audience.jpg'
import axios from 'axios'

export default function About() {
  const [about,setAbout] = useState({
lawyers: '0',
lawfirms: '0',
experience:'1'
  });

  useEffect(()=>{

    const more_info = () =>{
      const data = {
        gene: 'genepiki'
      }

      axios.post("api/lawfirms/more_info", data).then((res) => {
         if(res.data.status === 200){
          setAbout({...about,lawyers:res.data.lawyers,lawfirms:res.data.lawfirms})
         }
      });
     
    }
    more_info();
  },[])
  return (
    <>
    <Header/>
    <section className='about'>
      <div className='about_head'>
      <h5>Get to know</h5>
      <h2>GivLaw</h2>

      <div className='about_info'>
          <p>GivLaw is where you will find lawyers and create rooms with them.
          GivLaw is an interactive online platform that makes it faster and easier to find and hire the best Lawyers in any city / court in All Countries.

We are not a law firm, do not provide any legal services, legal advice or "Lawyer referral services" and do not provide or participate in any legal representation.
          </p>
          <div className='four_grid'>
            <div className='inner inner_img'> <img draggable={false} src={video_img} alt="" style={{"width": "200px"}} /></div>
            <div className='inner inner_text'>GivLaw allows clients to schedule meetings with available lawyers and secure your video and chat we provide in our meeting space.</div>
            <div className='inner inner_img_2'><img draggable={false} src={about_img_2} alt="" style={{"width": "200px"}} /></div>
            <div className='inner inner_text_2'> 
            <p>GivLaw have rooms created for all lawyers available and if you have a token with specified scheduled time quickly jump and have a consultation meeting with your best lawyer.</p>
            <Link to="/meetings" title='browse our lawfirms available'><button>Enter Meetings</button></Link>
            
            </div>
         
       
        </div>
        </div>
      </div>
      <div className='about_container'>
        <div className='about_img'>
          <img draggable={false} src={about_img} alt="lawyers' site" />
        </div>

        <div className='about_cards'>

          <article className='about_card'>
          <ArchiveRounded className='about_card_icon'/>
       <h5>Experience</h5>
       <small>{about.experience}+ Years Experience</small>
       
          </article>
          <article className='about_card'>
          <ConfirmationNumber className='about_card_icon'/>
       <h5>Lawfirms</h5>
       <small>{about.lawfirms} lawfirms available</small>
       
          </article>
          <article className='about_card'>
          <RemoveRedEye className='about_card_icon'/>
       <h5>Lawyers</h5>
       <small>{about.lawyers} Lawyers Available</small>
       
          </article>
         
        </div>
        </div>
    </section>
    <Footer/>
    </>
  )
}
