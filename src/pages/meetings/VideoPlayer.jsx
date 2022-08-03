import React, {useContext,useState} from 'react';
import { SocketContext } from './SocketContext';
import { CallEnd, Camera, Message, MicNone, NetworkCell, Note, Notifications, Phone, Redo, RingVolume } from '@material-ui/icons';
import ringtone from '../../assets/ring.mp3';
import notification_music from '../../assets/notification.mp3';
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';


export default function VideoPlayer() {
  const {me,userMe,messagesUser, callAccepted, myVideo, userVideo, callEnded, answerCall, call,camera,setCamera,setAudio,audio,userToken,setUserToken,msg,setMsg,tabletHome,toggleMode,loggedIn,idToCall,user} = useContext(SocketContext);
  const {leaveCall, callUser,sentMessage, token_submit } = useContext(SocketContext);
 

  return (


<div className='meeting_rooms'>
<div className='main_video rel'>
    <div className={camera?'abs notch active':'abs notch'} />
    <div className='abs hbtn offline' id={'user_'+idToCall} onClick={toggleMode} title="Home"/>
    <div className='abs btns'>
      <button className={camera? 'active': ''}><Camera onClick={()=>setCamera(!camera)}/></button>
      <button className={audio? 'active': ''}><MicNone onClick={()=>setAudio(!audio)}/></button>
      {loggedIn.status && (
      <a href='/dashboard/notes' target="_blank"><button><Note/>Notes</button></a>
      )}
      <audio style={{"display":"none"}} id="user_ringtone" src={ringtone} />
      <audio style={{"display":"none"}} id="user_ringtone_not" src={notification_music} />
      
    { !callAccepted && call.isReceivedCall &&(
    <button onClick={answerCall}>
    <RingVolume/>  Answer
    </button>

)}
    {callAccepted && !callEnded ? (
 <button onClick={leaveCall}><CallEnd/> Hangup</button>
        ): (
          <>
          { !loggedIn.status && userToken.response && (
      <>
<button id="call_user_btn" onClick={()=> callUser(idToCall)}><Phone/> <span>Call</span></button>
        </> )}</>
         )}
          { !userToken.response && (
      <>
      <button id="call_user_btn"><Redo/> <span>Verify</span></button>
              </>
          )}
    </div>
    <div className='abs header_phone' onClick={toggleMode} ><div><Notifications/>{messagesUser.length}</div><div><Message/>{messagesUser.length}</div><div><NetworkCell/><small>GetLaw</small></div></div>
    {!tabletHome && userToken.response && (
      <>
    <div className='abs phone_notificats'>
      <div className='messages_dis abs'>
      <>
     {messagesUser.length > 0?(
      <>
{messagesUser.map((msgss,i)=>{

  let user_id = "";
  if(loggedIn.status){
    user_id =  localStorage.getItem('auth_user_id');
    
  }else{
    user_id = userToken.token;
  }
  if(msgss.sender_id === user){
  
  if(msgss.sender_id === user_id){
        return (
          <div className='fromMe  mr'>
         <span className='fromMeMsg' key={i} style={{"display": "block"}}>
        <p> {msgss.message}</p>
         <p>{msgss.time}</p>

         </span>
         
         </div>
        )
      }else{
        return (
          <div className='fromOtherMsg  mr'>
          <span className='fromOther' key={i} style={{"display": "block"}}>
          <p> {msgss.message}</p>
         <p>{msgss.time}</p>

          </span>

          </div>
         )
      } }else if(msgss.receiver_id === user){

        if(msgss.sender_id === user_id){
          return (
            <div className='fromMe  mr'>
           <span className='fromMeMsg' key={i} style={{"display": "block"}}>
           <p> {msgss.message}</p>
         <p>{msgss.time}</p>

           </span>
           </div>
          )
        }else{
          return (
            <div className='fromOtherMsg  mr'>
            <span className='fromOther' key={i} style={{"display": "block"}}>
            <p> {msgss.message}</p>
         <p>{msgss.time}</p>

            </span>

            </div>
           )
        }
      }else{
        if(msgss.sender_id === user_id){
          return (
            <div className='fromMe  mr'>
           <span className='fromMeMsg' key={i} style={{"display": "block"}}>
           <p> {msgss.message}</p>
         <p>{msgss.time}</p>

           </span>

           </div>
          )
        }else{
        // return null;
        if(msgss.sender_id === user_id){
          return (
            <div className='fromMe  mr'>
           <span className='fromMeMsg' key={i} style={{"display": "block"}}>
           <p> {msgss.message}</p>
           <p>{msgss.time}</p>
           </span>
        

           </div>
          )
        }else{
          return (
            <div className='fromOtherMsg  mr'>
            <span className='fromOther' key={i} style={{"display": "block"}}>
            <p> {msgss.message}</p>
         <p>{msgss.time}</p>

            </span>

            </div>
           )
        }

        }
      }
      })} 
      </>
     ):(
      <>No messages available</>
     )}
      </>
      </div>
      <div className='sent_text_input abs'>
        <form onSubmit={sentMessage}>
  <textarea type="text" name="message" value={msg.message} onChange={(e)=>setMsg({...msg,message:e.target.value})} placeholder='type here to sent message'></textarea>
  <button>Send Message</button>
  </form>
      </div>
    </div>
    </>
    )}
    { userToken.response? (
      <>
    <video playsInline muted ref={myVideo} id={'vid_'+me} autoPlay className='abs my_video' />
    <video playsInline ref={userVideo}  id={'vid_'+userMe} autoPlay className='abs user_video' />
    </>
    ):(
      <>
      <video playsInline muted ref={myVideo}  className='abs my_video is-hidden' />
      <video playsInline muted ref={userVideo} className='abs user_video is-hidden' />
      </>
    )}
    <div className='phone_screen'>
      {userToken.response && (
        <>
     {tabletHome && (
<></>
)}
 
</>
)}
      {!userToken.response && ( 
      <div className='get_use_token'>
     <form onSubmit={token_submit}>
      <input type="text" name="token" id="msginput" onBlur={(e)=> setUserToken({...userToken,token:e.target.value})}  placeholder="Please enter token" className="user_token_input" />
      <button>Verify</button>
     </form>
        </div>
      )}

    
</div>
</div>
{/* <div className='vids'>
 { callAccepted && !callEnded && (
    <>
    <h3>{call.name || 'Name' }</h3>
<video playsInline muted ref={userVideo} autoPlay className='user_video' />
    <video playsInline muted ref={myVideo} autoPlay className='abs my_video' />

</>
  )}
   {stream && (
    <>
    <h3>{name || 'Name'}</h3>
</>
   )}
</div> */}





























</div>


  )
}
