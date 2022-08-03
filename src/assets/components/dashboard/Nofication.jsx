import React,{useEffect,useState} from 'react'
import Header from '../header/header'
import Sidebar from './Sidebar'
import './Notification.css'
import { DataUsage } from '@material-ui/icons'
import { ContextProvider } from './SideContext';
import { useNavigate } from "react-router-dom";



export default function Nofication() {
  document.title = "View Notifications | GetLaw";

  const navigate = useNavigate();
  const [loggedIn,setLoggedIn] = useState(false);
  useEffect(()=>{
    const logged_in = localStorage.getItem('auth_token');
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
        <h2>Notifications</h2>
      </div>
      <div className='not_body'>
        <div className='notification_wrapper'>
          <h3>Someone Booked A lesson </h3>
          <p><DataUsage/>2022/12/01</p>
        </div>
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
