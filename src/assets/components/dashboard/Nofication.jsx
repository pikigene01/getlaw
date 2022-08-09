import React,{useEffect,useState} from 'react'
import Header from '../header/header'
import Sidebar from './Sidebar'
import './Notification.css'
import { DataUsage, StayCurrentLandscapeOutlined } from '@material-ui/icons'
import { ContextProvider } from './SideContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios'



export default function Nofication() {
  document.title = "View Notifications | GetLaw";

  const navigate = useNavigate();
  const [loggedIn,setLoggedIn] = useState(false);
  const [notifications,setNotifications] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);

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
      user_id: localStorage.getItem('auth_user_id')
    }
    axios.post("/api/notifications/get", data).then((res) => {
  
    if(res.data.status === 200){
      setNotifications(res.data.notifications);
      setSkeletonLoader(true);
    }
    
    });
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
        {notifications.length > 0 ? (
          <>
        {notifications.map((data)=>{
          return (
            <div className='notification_wrapper'>
            <h3>{data.notification} </h3>
            <p><DataUsage/>{data.created_at}</p>
            <p><StayCurrentLandscapeOutlined/>{data.status}</p>
          </div>
          )
        })}
        </>

        ):(
          <p>No Notifications Found..</p>
        )}
       
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
