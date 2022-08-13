import React, { createContext, useEffect,useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import axios from "axios";


const SidebarContext = createContext();

const ContextProvider = ({ children }) => {
  // const [socket,setSocket] = useState(io('http://localhost:5000'));
  const [socket,setSocket] = useState(io('https://getlaw.herokuapp.com'));
    const [user,setUser] = useState([]);
    const [chatOpener,setChatOpener] = useState(false);
    const [dashboardGet, setDashboardGet] = useState({
      getpage: 'dashboard'
    });
    const [loggedIn,setLoggedIn] = useState(false);
  useEffect(()=>{
    const logged_in = localStorage.getItem('auth_token');
  if(logged_in){
    setLoggedIn(true)
  }else{
    setLoggedIn(false)
   
  }
  },[]);
    const [loadUser,setLoadUser] = useState(localStorage.getItem('user_profile'));
    const [loading,setLoading] = useState({
      isLoading: false
    });
    const [msg,setMsg] = useState({
      idGoing: '',
      idFrom: localStorage.getItem('auth_user_id'),
      message: ''
  });
    const [skeletonLoader, setSkeletonLoader] = useState(false);
  
    const [notification,setNotification] = useState([]);
    const [lawyers_msg,setLawyersMsg] = useState([]);

   const connectSocket = () => {

    socket.on("me", (data) => console.log(data));

  socket.emit('newUser', localStorage.getItem('auth_user_id'));
   }
  useEffect(() => {
    connectSocket();
     
  }, [socket]);
  useEffect(()=>{
 const data = {
        user_id: localStorage.getItem('auth_user_id')
      }
      if(!loadUser){
        axios.post("/api/user_profile/get", data).then((res) => {
          setLoading({ ...loading, isLoading: false });
    
          setUser(res.data.user_profile);
        
          setSkeletonLoader(true);
        
        });
      }else{
     setSkeletonLoader(true);
   
     setUser(JSON.parse(localStorage.getItem('user_profile')));
      }
      
  },[]);
  useEffect(()=>{
    if(loggedIn){
      if(!loadUser){
        localStorage.setItem('user_profile', JSON.stringify(user));
       }
    }
  
  },[user,loggedIn]);

  useEffect(()=>{
   
      const data = {
        user_id: localStorage.getItem('auth_user_id')
      }
      axios.post("/api/lawyers/get/gene/dash", data).then((res) => {
        setSkeletonLoader(true);
  
        setLawyersMsg(res.data.posts);
       
      });
  
  },[]);
 
  const UserMsgs = () => {
   
    const data = {user_id:msg.idFrom };
    axios.post("/api/message/get", data).then((res) => {
      setMsg({...msg,message: ""});
      const msgsdata = res.data.messages;
      setNotification(msgsdata);
      msgsdata.map((data)=>{
        // notification.push(data);
        
      });

    });
  };
  const deleteMsg = (id) => {
    const data = {
      id: id
    }
    axios.post("/api/message/delete", data).then((res) => {
      setMsg({...msg,message: ""});
      UserMsgs();
    });
  }
  

  useEffect(()=>{
    const msgDiv = document.querySelectorAll(".message");
  const scrollToBottomUI =() => {
    msgDiv.forEach((div)=>{
    msgDiv.forEach((div)=>{
      const scrollToBottom=()=> {
        div.scrollTop = div.scrollHeight;
      };
      scrollToBottom();
    })
    });
  };
  socket.on('getNotification', (data) => notification.push(data));
  socket.on('getNotification', (data) => scrollToBottomUI(data));
  return () => socket.off('getNotification')
   
  },[connectSocket]);
  let url = window.location.pathname;

  useEffect(()=>{
  url = window.location.pathname;

    const links  = document.querySelectorAll('.user_links .dashboard_link');
    links.forEach((link)=>{
      link.classList.remove('active');
    switch(url){
      case '/dashboard/':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }
      break;
      case '/dashboard':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }
      break;
      case '/dashboard/add_lawyer':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/notification':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/password':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }
    
      break;
      case '/dashboard/notes':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/money':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/lawfirm_info':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/add/blog':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/developers_support':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }

    
      break;
      case '/dashboard/report_bug':
        if(link.classList.contains(url)){
          link.classList.add('active');
        }
    
      break;
    }
  });
  },[url])
  const switchPages = (e) => {

   let page = url.substring(url.lastIndexOf('/') + 1);
  
  setDashboardGet({getpage: page});

  
  socket.emit('newUser', localStorage.getItem('auth_user_id'));
  
  };
 
  useEffect(()=>{
    UserMsgs();
  },[]);

  const sendText = (senderName,idGoing,text) => {
   connectSocket();

    const msgDiv = document.querySelectorAll(".message");
   
    socket.emit("sendMessage", {
      senderName: senderName,idGoing: msg.idGoing,text:text
    });
    
   const data = {sender_id:senderName,receiver_id:idGoing,message:text };
  axios.post("/api/message/save", data).then((res) => {
    setMsg({...msg,message: ""});
  });
  UserMsgs();
  msgDiv.forEach((div)=>{
    //       const message = document.createElement('div');
    //       message.classList.add('fromMe');
    //       message.classList.add('mr');
    //       const message_span = document.createElement('span');
    //       message_span.classList.add('fromMeMsg');
    //       message_span.style.display = 'block';
    //       message_span.innerHTML = "Gene Piki";
    //       message.innerHTML = message_span;
    //       div.appendChild(message);
    // console.log(message)
          const scrollToBottom=()=> {
            div.scrollTop = div.scrollHeight;
          };
          scrollToBottom();
        });
 
    // socket.emit('sendText', senderName,receiverName,text);
  };



  return (
    <SidebarContext.Provider value={{
        notification,user,skeletonLoader,dashboardGet,loading,
        switchPages,
    sendText,
    setChatOpener,chatOpener,msg,setMsg,lawyers_msg,connectSocket,deleteMsg
    }} >
      {children}
    </SidebarContext.Provider>
  );
};
export {ContextProvider, SidebarContext};