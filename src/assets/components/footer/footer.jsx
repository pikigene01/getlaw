import { LayersTwoTone } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className="head_logo mg">
          <div className="logo_wrapper">
            <Link to="/">
              {" "}
              <span><span className="logo_bold">Grin</span><><LayersTwoTone className='logo_color'/></><span className="logo_italic">It</span></span>
              {/* <h1 >title="gene law">GL</h1> */}
              {/* <img src={Logo} alt="GeneLaw logo" style={{height: "100%"}} /> */}
            </Link>
          </div>
        </div>
      <div className='footer_links'>
        <Link to="/about" className='footer_link'>
          About
        </Link>
        <Link to="/contact" className='footer_link'>
          Contact Us
        </Link>
      
        <Link to="/blog/" className='footer_link'>
          Blog
        </Link>
        <Link to="/privacy/policy" className='footer_link'>
         Privacy Policy
        </Link>
      </div>
    </div>
  )
}
