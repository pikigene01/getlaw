import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import './About.css'
import { ArchiveRounded, ConfirmationNumber, RemoveRedEye, ViewStream } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import about_img from '../../imgs/gene_law.svg';
import about_img_2 from '../../imgs/video-creation.jpg';
import video_img from '../../imgs/build-audience.jpg'

export default function About() {
  return (
    <>
    <Header/>
    <section className='about'>
      <div className='about_head'>
      <h5>Get to know</h5>
      <h2>GetLaw</h2>

      <div className='about_info'>
          <p>GetLaw is where you will find lawyers and create rooms with them.</p>
          <div className='four_grid'>
            <div className='inner inner_img'> <img draggable={false} src={video_img} alt="" style={{"width": "200px"}} /></div>
            <div className='inner inner_text'>GetLaw allows clients to schedule meetings with available lawyers and secure your video and chat we provide you in our meeting space.</div>
            <div className='inner inner_img_2'><img draggable={false} src={about_img_2} alt="" style={{"width": "200px"}} /></div>
            <div className='inner inner_text_2'> 
            <p>GetLaw have rooms created for all lawyers available and if you have a token with specified schedule time quickly jump and have a consultation meeting with your best lawyer.</p>
            <Link to="/meetings" title='browse our lawfirms available'><button>Enter Meetings</button></Link>
            
            </div>
         
       
        </div>
        </div>
      </div>
      <div className='about_container'>
        <div className='about_img'>
          <img src={about_img} alt="lawyers' site" />
        </div>

        <div className='about_cards'>

          <article className='about_card'>
          <ArchiveRounded className='about_card_icon'/>
       <h5>Experience</h5>
       <small>3+ Years Experience</small>
       
          </article>
          <article className='about_card'>
          <ConfirmationNumber className='about_card_icon'/>
       <h5>Lawfirms</h5>
       <small>3+ lawfirms available</small>
       
          </article>
          <article className='about_card'>
          <RemoveRedEye className='about_card_icon'/>
       <h5>Lawyers</h5>
       <small>3k Lawyers Available</small>
       
          </article>
         
        </div>
        </div>
    </section>
    <Footer/>
    </>
  )
}
