import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/header'
import './Dashboard.css';
import Sidebar from './Sidebar';
import { BookOutlined, BugReport, Comment, DataUsage } from '@material-ui/icons';
import axios from 'axios';
import { ContextProvider } from './SideContext';


export default function Dashboard() {
    document.title = "Dashboard | GivLaw By Gene Piki";
    
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false);
    const [dashboardCount,setDashboardCount] = useState({
      bookings: '0',
      reports: '0',
      reviews: '0'
    })
    useEffect(()=>{
      const logged_in = localStorage.getItem('auth_token');
    if(logged_in){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
      navigate('/auth');
    }
    },[]);

    useEffect(()=>{
     
      const data = {
        lawyer_id: localStorage.getItem('auth_user_id')
      }
      axios.post("/api/dashboard/all", data).then((res) => {
      
        setDashboardCount({...dashboardCount,bookings:res.data.bookings,reports:res.data.reports,reviews:res.data.reviews});
  
      });
    },[])
   

   const tabs = [
       'password', 'settings', 'add_lawyer'
   ];

  return (
    <>
    <ContextProvider>
    <Header/>
    <div className='dashboard'>
 <Sidebar/>

      <div className="dashboard_body">
      <div className='header_dash'>
        <h2>Welcome to givlaw.com</h2>
      </div>
      <div className='dash_body_icon'>
       <DataUsage className='icon'/>
      </div>
      <div className='dash_body_cards'>
       <div className='dash_card'><BookOutlined/> Total Bookings <p>{dashboardCount.bookings}</p></div>
       <div className='dash_card'><Comment/> Total Reviews <p>{dashboardCount.reviews}</p></div>
       <div className='dash_card'><BugReport/>Reports <p>{dashboardCount.reports}</p></div>
      </div>
      </div>
       
    </div>
    </ContextProvider>
    </>
  )
}
