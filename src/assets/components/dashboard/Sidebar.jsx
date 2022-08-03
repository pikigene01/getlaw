import React,{useContext,useState,useEffect} from 'react'


import { Link } from "react-router-dom";
import { NotInterestedSharp,ContactSupport,BookmarkBorderTwoTone,AddAPhoto,Money,Notifications,Security,EditRounded,DashboardOutlined, BlockOutlined, NewReleases, NoteAdd, Help, ArrowBack, Message } from '@material-ui/icons';
import "./Dashboard.css";
import { SidebarContext } from './SideContext';



export default function Sidebar() {
  const { setChatOpener,chatOpener,notification,user,skeletonLoader,dashboardGet,loading, switchPages,sendText,msg,setMsg,lawyers_msg,deleteMsg } = useContext(SidebarContext);
  // const [getMsg,setGetMsg] = useState([]);

const [toggleNav,setToggleNav] = useState(localStorage.getItem('toggleNav'));

  useEffect(()=>{
  if(toggleNav){
    localStorage.setItem('toggleNav', toggleNav);
     setToggleNav(toggleNav);
  }else{
    setToggleNav(false);
    localStorage.removeItem('toggleNav');
  }
  },[toggleNav]);


  return (
   <>
   <div className={chatOpener?'chat_modal active':'chat_modal'}>
    <div className='chat_header'>
    {msg.idGoing !== "" && (
      <ArrowBack className='chat_icon' onClick={()=>setMsg({...msg,idGoing:""})}/>
    )}
      Gene Chat
    </div>
    <div className='chat_body'>
    <div className='message'>
      {msg.idGoing !== "" ? (
<>
{notification.map((msgss,i)=>{
  const user_id = localStorage.getItem('auth_user_id');
  if(msgss.sender_id == msg.idGoing){
  if(msgss.sender_id == user_id){
        return (
          <div key={i} className='fromMe  mr'>
         <span className='fromMeMsg' onClick={()=>deleteMsg(msgss.id)} key={i} style={{"display": "block"}}>
         {msgss.message}
         </span>
         </div>
        )
      }else{
        return (
          <div key={i} className='fromOtherMsg  mr'>
          <span className='fromOther' key={i} style={{"display": "block"}}>
          {msgss.message}
          </span>
          </div>
         )
      }}else if(msgss.receiver_id == msg.idGoing){
        if(msgss.sender_id == user_id){
          return (
            <div key={i} className='fromMe  mr'>
           <span title='clicking this post will delete' className='fromMeMsg' onClick={()=>deleteMsg(msgss.id)} key={i} style={{"display": "block"}}>
           {msgss.message}
           </span>
           </div>
          )
        }else{
          return (
            <div key={i} className='fromOtherMsg  mr'>
            <span className='fromOther' key={i} style={{"display": "block"}}>
            {msgss.message}
            </span>
            </div>
           )
        }
      }
      })}</>


      ):(
        <>
        {skeletonLoader ? (
          <>
        <div style={{"display":"flex","flexDirection":"column",marginLeft:"15px",width:"100%","justifyContent":"center"}}>
      {lawyers_msg.map((data)=>{
        return ( 
          <div key={data.id} className='lawyer_select' onClick={()=>setMsg({...msg,idGoing:data.id})}>
 {data.picture ? (
     <img src={data.picture} alt={data.description} className="profile_pic" style={{width: "30px",height: "30px"}} />
     ): (
    <AddAPhoto/> 
     )}

    
    {data.name.substr(0, 6)}
            </div>
        )
      })}
        </div>
         </>
         ):(
            <>
            <div style={{"display":"flex","flexDirection":"column",marginLeft:"15px",width:"100%","justifyContent":"center"}}>
      {[...Array(4)].map((i)=>{
        return ( 
          <div key={i} className='lawyer_select skeleton'>
            </div>
        )
      })}
        </div>
            </>
         )}
         </>
      )}
     
     
      </div>
      {msg.idGoing !== "" && (
      <div className='bottom_inputs'>
      <textarea value={msg.message} onChange={(e)=> setMsg({...msg,message: e.target.value})} name='message' placeholder='write a message'/>
      <button onClick={() => sendText(msg.idFrom,msg.idGoing,msg.message)}>Sent</button>
      </div>
      )}
    </div>
   </div>
   <div className={chatOpener?'chat_opener active':'chat_opener'}  onClick={()=>setChatOpener(!chatOpener)}>
    <Message/>
    <span className='messages_badge'>{notification.length > 9? (<>9+</>):(<>{notification.length}</>)}</span>
   </div>
    <div className={toggleNav?'dashboard_sidebar active':'dashboard_sidebar'}>
      <div className='toggle_sidebar' onClick={()=> setToggleNav(!toggleNav)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
<div className='sidebar_links'>
{skeletonLoader && (
  <>
  {
  user?.map((data)=>{
  return (
    <>
  <div className='user_profile' key={data.id}>
    {data.picture ? (
     <img src={data.picture} alt={data.description} className="profile_pic" style={{width: "30px",height: "30px"}} />
     ): (
    <AddAPhoto/> 
     )}

    
    {data.name.substr(0, 6)}</div>
    </>
  )
})}

</>
)}
{!skeletonLoader && (
  <>
   <div className='user_profile'>
   
     <div className="profile_pic skeleton" style={{width: "30px",height: "30px"}} />
     <div className="skeleton" style={{width: "60px",height: "10px","marginTop": "5px"}} />
  </div>
  </> )}

<div className='user_links'>
  <ul>
    <Link data-href="/dashboard/" to="/dashboard/" onClick={switchPages}><li key="dash" className='dashboard_link /dashboard/ /dashboard'><DashboardOutlined className='dash_icon'/> <span>Dashboard</span></li></Link>
    <Link data-href="/dashboard/password" to="/dashboard/password" onClick={switchPages}><li key="dash1" className='dashboard_link /dashboard/password'><Security className='dash_icon'/> <span>Password</span></li></Link>
    <Link data-href="/dashboard/notification" to="/dashboard/notification" onClick={switchPages}><li key="dash2" className='dashboard_link /dashboard/notification'><Notifications className='dash_icon'/><span className="badge">{notification.length}</span> <span className="nottt">Notification </span></li></Link>
    <Link data-href="/dashboard/notes" to="/dashboard/notes" onClick={switchPages}><li key="dash3" className='dashboard_link /dashboard/notes'><NoteAdd className='dash_icon'/> <span>Notes</span></li></Link>
    <Link data-href="/dashboard/lawfirm_info" to="/dashboard/lawfirm_info" onClick={switchPages}><li key="dash3" className='dashboard_link /dashboard/lawfirm_info'><BookmarkBorderTwoTone className='dash_icon'/> <span>Account Info</span></li></Link>
    <Link data-href="/dashboard/add_lawyer" to="/dashboard/add_lawyer"  onClick={switchPages}><li key="dash4" className='dashboard_link /dashboard/add_lawyer'><EditRounded className='dash_icon'/> <span>Add Lawyer</span></li></Link>
    <Link data-href="/dashboard/money" to="/dashboard/money"  onClick={switchPages}><li key="dash5" className='dashboard_link /dashboard/money'><Money className='dash_icon'/> <span>Money Stats</span></li></Link>
    <Link data-href="/dashboard/add/blog" to="/dashboard/add/blog"  onClick={switchPages}><li key="dash6" className='dashboard_link /dashboard/add/blog'><NewReleases className='dash_icon'/><span>Add Blog</span></li></Link>
    <Link data-href="/dashboard/developers_support" to="/dashboard/developers_support"  onClick={switchPages}><li key="dash7" className='dashboard_link /dashboard/developers_support'><ContactSupport className='dash_icon'/><span> Support</span></li></Link>
    <Link data-href="/dashboard/report_bug" to="/dashboard/report_bug"  onClick={switchPages}><li key="dash8" className='dashboard_link /dashboard/report_bug'><NotInterestedSharp className='dash_icon'/><span> Report Bug</span></li></Link>
  </ul>
  </div>
</div>
      </div>
      </>
     
  );
}
