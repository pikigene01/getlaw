import React, { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { io } from "socket.io-client";
import Peer from "simple-peer";
import axios from "axios";
import swal from "sweetalert";
const SocketContext = createContext();


const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [socket,setSocket] = useState(io('http://localhost:5000'));
  const [messagesUser,setMessagesUser] = useState([]);

  const user_id = localStorage.getItem('auth_user_id');
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [userMe, setUserMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [camera,setCamera] = useState(true);
  const [audio,setAudio] = useState(true);
const [userValue,setUserValue] = useState('');

  const [userToken,setUserToken] = useState({
    token: '',
    response: false
  });
  const [user,setUser] = useState('');

  const [msg,setMsg] = useState({
    idGoing: '',
    idFrom: localStorage.getItem('auth_user_id'),
    message: ''
});
const [idToCall, setIdToCall] = useState('');
const [loggedIn,setLoggedIn] = useState({
  status: false,
  id: ''
});
let getMessages = () => {
  return messagesUser.find(msg => msg.sender_id === user);
}

if(getMessages){
getMessages = getMessages;
}else{
getMessages = [{sender_id:'',receiver_id:'',message:'' }];
}

  const [tabletHome,setTabletHome] = useState(true);
const toggleMode = () => {
  if(tabletHome){
    setTabletHome(false);
  }else{
    setTabletHome(true);
  }
};

useEffect(()=>{
  const url = window.location.pathname;
  const param_id = url.substring(url.lastIndexOf("/") + 1);

  if(param_id){
    setIdToCall(param_id);
    setName(param_id);
  }
 
 
},[idToCall])


useEffect(()=>{
  if(user_id){
    setLoggedIn({...loggedIn,status:true,id: user_id});
    setUserToken({...userToken,response:true});
    setUserToken({...userToken,response:true});
    navigate('/meetings/'+user_id);
  }else{
    setLoggedIn({...loggedIn,status:false,id: ""});
  };


},[]);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(()=>{
if(loggedIn.status){
 
setUser(user_id)
}else{
  setUser(userToken.token);
}
},[loggedIn,userToken]);

useEffect(()=>{
  socket.on("me", (id) => setMe(id));
  socket.emit('newUser', user_id?user_id:userToken.token);
 
},[userToken]);

const notify = () => {
const user_ringtone_not = document.querySelectorAll('#user_ringtone_not');
user_ringtone_not.forEach((ring)=>{
 ring?.play();
});
};
useEffect(()=>{
  const msgDiv = document.querySelectorAll(".messages_dis");
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
  var gene = 'getlaw';

  socket.on('getNotification', (data) => 

 setMessagesUser(data),
 setMsg({...msg,message:""}),notify(),scrollToBottomUI()
  //  messagesUser.push(data)
 
  );
  socket.on('getNotification', (data) => scrollToBottomUI());
 
},[messagesUser]);
useEffect(()=>{
  socket.on('getHide', (data)=>{
   
    const myVid = document.querySelectorAll('#vid_'+data.hideCamera);
    myVid.forEach((vid)=>{
      vid.classList.add("is-hidden");

    })
  })
  socket.on('getShow', (data)=>{
    const myVid = document.querySelectorAll('#vid_'+data.showCamera);
    myVid.forEach((vid)=>{
      vid.classList.remove("is-hidden");

    })
  })
  socket.on('cammute', (data)=>{
    if(me !== data.muteCam){

    const myVid = document.querySelectorAll('#vid_'+data.muteCam);
    myVid.forEach((vid)=>{
      vid.muted = true;
      vid.classList.add('active');


    })
  };
  });
  socket.on('camunmute', (data)=>{
    if(me !== data.unmuteCam){
    const myVid = document.querySelectorAll('#vid_'+data.unmuteCam);
    myVid.forEach((vid)=>{
      vid.muted = false;
      vid.classList.remove('active');
    })
  };
  });
},[])
useEffect(()=>{
  socket.on('online_users', (data)=>{
    const hbtn = document.querySelectorAll('.hbtn');
    for(var i = 0; i < hbtn.length; i++){
      hbtn[i].classList.add('offline')
      hbtn[i].classList.remove('online')
      hbtn[i].setAttribute('title', 'the host is offline at the mean time');
    }
    if(data.length > 0){
    data.map((user)=>{
     
      const users = document.querySelectorAll('#user_'+user.username);
      users.forEach((id)=>{
        id.classList.add('online');
        id.setAttribute('title', 'The host is online sent a message or direct call to start meeting.');
        id.classList.remove('offline');
      })
    })
  }else{

  }
  });
},[])
  
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: audio })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setUserMe(from);
      setCall({ isReceivedCall: true, from, name: callerName, signal });
      const ringTone = document.querySelectorAll('#user_ringtone');
      ringTone.forEach((ring)=>{
       ring.play();
      });
     
    });
  }, []);
 
  useEffect(()=>{
  
   
  },[socket]);
useEffect(()=>{
  const disableCamera= () => {
   
    const myVid = document.querySelectorAll('#vid_'+me);
    myVid.forEach((vid)=>{
      vid.classList.add("is-hidden");
    })
    const data = {
      cameratoshide: me,
      userMe: userMe

    }
    socket.emit('hideCamera', data);
    // navigator.mediaDevices
    // .getUserMedia({ video: false, audio: true })
    // .then((currentStream) => {
    //   setStream(currentStream);
    //   myVideo.current.srcObject = currentStream;
    //  const video =  currentStream.getTracks().map(t => t.kind == 'video');
    //  video.enabled = false;
    // });
  }
  const showCamera= () => {
  
    const myVid = document.querySelectorAll('#vid_'+me);
    myVid.forEach((vid)=>{
      vid.classList.remove("is-hidden");

    })
    const data = {
      cameratoshow: me,
      userMe: userMe
    }
    socket.emit('showCamera', data);
   
    // navigator.mediaDevices
    // .getUserMedia({ video: true, audio: audio })
    // .then((currentStream) => {
    //   setStream(currentStream);
    //   myVideo.current.srcObject = currentStream;
    //   const video =  currentStream.getTracks().map(t => t.kind == 'video');
    //   video.enabled = true;
    // });

  }
  if(camera){
    showCamera();
  }else{
    disableCamera();
  }

},[camera,userToken])
useEffect(()=>{
  const disableAudio= () => {
    const data = {
      muteCam: me,
      userMe: userMe

    }
    socket.emit('muteCam', data);

    navigator.mediaDevices
    .getUserMedia({ video: camera, audio: false })
    .then((currentStream) => {
      myVideo.current.srcObject = currentStream;
    myVideo.current.srcObject.getTracks().map(t => t.kind == 'audio' && t.stop());
    setStream(currentStream);

    });

  }
  const showAdudio= () => {
    const data = {
      unmuteCam: me,
      userMe: userMe

    }
    socket.emit('unmuteCam', data);
   
    navigator.mediaDevices
    .getUserMedia({ video: camera, audio: true })
    .then((currentStream) => {
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;

    });

  }
  if(audio){
    showAdudio();
  }else{
    disableAudio();
  }

},[audio,userToken]);

const token_submit = (e) => {
  e.preventDefault();
  const data = {
    token: userToken.token,
    lawyer_id: idToCall
  }
  axios.post("/api/check/token", data).then((res) => {
       if(res.data.status == 200){
        setUserToken({...userToken,response:true});
       }else{
        swal('Warning', res.data.message, 'warning');
        setUserToken({...userToken,response:false});
       }
   });
 
  setUserValue(userToken.token);
};


  
  const sentMessage = (e) => {
    e.preventDefault();
    
    socket.emit('sendMessageVid', {  senderName: user,idGoing: 'all',text:msg.message });

  };
 
  const tokenHandle = (e) => {
    setUserToken({...userToken,token:e.target.value});
  }
  useEffect(()=>{
    const inputs = document.querySelectorAll('#msginput');
  inputs.forEach((inp)=>{
    inp.onmouseleave = (e) => {
      
      tokenHandle(e);
    }

  })
  },[tokenHandle]);
  const answerCall = () => {
    setCallAccepted(true);
    const ringTone = document.querySelectorAll('#user_ringtone');
    ringTone.forEach((ring)=>{
     ring.pause();
    });
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { userToAnswer:me,signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };
  const callUser = (id) => {
    const call_btns = document.querySelectorAll('#call_user_btn span');
    call_btns.forEach((btn)=>{
      btn.innerText = "Calling";
      setTimeout(()=>{
      btn.innerText = "Call";
      },28000)
    })
    const peer = new Peer({ initiator: true, trickle: false, stream });// initiator is set to true because you are the person calling
    peer.on('signal', (data) => {
      socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      
    });
    socket.on('callaccepted', (data)=> {
      setCallAccepted(true);
      setUserMe(
        data.userToAnswer
      )
      peer.signal(data.signal);
    });
    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      messagesUser,
      call, callAccepted,
      myVideo,
      userVideo,
      stream,
      name, setName,
      callEnded,
      me,userMe,
      callUser,token_submit,
      leaveCall,
      answerCall,camera,setCamera,audio,setAudio,userToken,setUserToken,msg,setMsg,sentMessage,
      loggedIn,tabletHome,toggleMode,loggedIn,idToCall,getMessages,user
    }} >
      {children}
    </SocketContext.Provider>
  );
};
export {ContextProvider, SocketContext};