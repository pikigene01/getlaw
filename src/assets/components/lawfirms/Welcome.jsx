import React from 'react'
import { Link } from 'react-router-dom'
import gene_law from '../../imgs/gene_law.svg'
import { ContactSupport } from '@material-ui/icons'
import './Card.css'

export default function Welcome() {
  return (
    <div className='welcome_container'>
        <div className='welcome_left'>
<h1>You got into trouble for no reason get in touch with our best lawfirms</h1>
<p>GetLaw will help you with instant meetings with our best lawyers available</p>
<Link to="/contact"><button>Help <ContactSupport/></button></Link>
        </div>
        <div className='welcome_right'>
<img className='responsive_img' src={gene_law} style={{height: "400px"}}/>
        </div>
    </div>
  )
}
