import React,{useState,useEffect} from 'react'
import Header from '../header/header'
import Sidebar from './Sidebar'
import './Support.css'
import { ContextProvider } from './SideContext';
import { useNavigate } from "react-router-dom";



export default function Support_dev() {
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
        <h2>Support Developers</h2>
      </div>
      <div className='support_wrapper'>
        
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
