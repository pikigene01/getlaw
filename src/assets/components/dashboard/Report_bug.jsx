import { ContactSupport } from '@material-ui/icons'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/header'
import Sidebar from './Sidebar'
import { ContextProvider } from './SideContext';
import { useNavigate } from "react-router-dom";



export default function Report_bug() {
  const navigate = useNavigate();
  const [loggedIn,setLoggedIn] = useState(false);
  useEffect(()=>{
    const logged_in = localStorage.getItem('auth_token');
    document.title = "Report Bug | GenePiki";

  if(logged_in){
    setLoggedIn(true)
  }else{
    setLoggedIn(false)
    navigate('/auth');
  }
  },[]);
  return (
    <ContextProvider>
    <div>
         <Header />
      <div className="dashboard">
        <Sidebar/>
        <div className="dashboard_body">
        <div className='header_dash'>
        <h2>Report a bug and give us a feedback</h2>
      </div>
      <Link to="/contact"><button className='report_bug_btn'>Help <ContactSupport/></button></Link>
      <div>
     
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
