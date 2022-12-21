import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import { ArrowDownward, ArrowForwardIos, Dashboard, ExitToApp, LayersTwoTone, MeetingRoom, Mic, More } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Search, Cancel } from "@material-ui/icons";
import Logo from '../../imgs/logo.png';
import { getfundsapi, logoutapi, searchapi } from "../../../apis/api";

function Header() {
  const [loading, setLoading] = useState({
    isLoading: false,
  });
  const [money, setMoney] = useState({
    user_funds: "...",
  });
  const [isSearch, setIsSearch] = useState(false);
  const [currency, setCurrency] = useState('usd');

  const [withdrawmoneyform, setWithdrawmoneyform] = useState({
    name: '',
    surname: '',
    phone: '',
    currency: currency,
    received_token: ''
  });
  const [search, setSearch] = useState({
    search: "",
    searching: false,
    show_dialog: false
  });
  const [ searchMic,setSearchMic] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  useEffect(()=>{
    const logged_in = localStorage.getItem('auth_token');
  if(logged_in){
    setLoggedIn(true)
  }else{
    setLoggedIn(false)
  }
  },[]);
  const [toggle,setToggle] = useState(false);
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      var day = now.getDay();
  const [time,setTime] = useState({
    time_html: `${hour}:${minute}:${second}`,
    hour: hour,
    minute: minute,
    second: second,
    day: weekday[day],
  });

  useEffect(()=>{
   const profiless = JSON.parse(localStorage.getItem('user_profile'));

   profiless?.map((data)=>{
    setWithdrawmoneyform({...withdrawMoneyForm, name: data.name,surname: data.surname,currency: currency,phone: data.phone});
   });
   
  },[currency]);

  const [cookieStatus,setCookieStatus] = useState(false);
  useEffect(()=>{
    const getCookie = localStorage.getItem('cookieStatus');
     if(getCookie){
      setCookieStatus(true);
     }
  },[cookieStatus]);
  const setCookie =()=> {
   const getCookie = localStorage.getItem('cookieStatus');
   if(getCookie){
setCookieStatus(true);
   }else{
    localStorage.setItem('cookieStatus', true);
setCookieStatus(true);

   }
  }
 var cookie_div = "";
 if(!cookieStatus){
  cookie_div = (
    <div style={{zIndex: '99999',display: 'flex',width:'100%',background: 'rgb(231, 210, 210)',justifyContent: 'space-around',left:'0px',padding:'20px 30px',position:'fixed',bottom:'0px'}}>
  <p style={{width:'70%'}}>This website uses cookies to enhance site navigation and improve 
    functionality, analyze site usage, and assist in our marketing and 
    advertising efforts. Please click "I accept cookies" to let us know 
    you're okay with our use of all cookies. For more information please 
    see the cookies section of our Privacy Policy.</p>
    <button onClick={setCookie} style={{background: 'grey',padding: '10px 30px'}}>i accept cookies</button>
    </div>
   );
 };
   // clock render start
   const drawTime =() =>{
    var now = new Date();
    var hour = now.getHours();
    let new_hour = hour;

    if(hour == '00'){
     new_hour = '23';
    }
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var day = now.getDay();
    //days are like this 0 up to 6; when its 0 its Sunday
    const get_calendar_btn = document.querySelectorAll(`button[data-day="${day}"][data-event="${hour}"].scheduled-btn`);
    let ext = 'AM';
    if(hour > 12){
      ext = 'PM';
    }else{
     ext = 'AM';
    }
    for(var i = 0; i<get_calendar_btn.length;i++){

    var onmeeting = get_calendar_btn[i].dataset.event;
      if(onmeeting == time.hour){
   get_calendar_btn[i].disabled = false
   get_calendar_btn[i].innerHTML = 'Current';
   get_calendar_btn[i].setAttribute("data-meeting", "yes");
        }else{
     get_calendar_btn[i].disabled = true
     get_calendar_btn[i].innerHTML = `${new_hour}-${hour} ${ext}`;
     get_calendar_btn[i].setAttribute("data-meeting", "no");


        }
    };
    setTime({...time,time_html: `${hour}:${minute}:${second}`,hour:hour,minute:minute,second:second,day: weekday[day]});
  
  }
  useEffect(()=>{
    if(searchMic){
     window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

     const recognition = new window.SpeechRecognition();
     recognition.interimResults = true;
     recognition.start();

     recognition.addEventListener('result', (e)=>{
      const text = Array.from(e.results).map(result => result[0])
      .map(result => result.transcript).join('');
if(e.results[0].isFinal){
  searchLawfirms(text);
  setSearchMic(false);
}

     
     });

    }
  },[searchMic])
const startMoveFunction = () => {
  const draggable = document.querySelectorAll(".draggable");


  draggable.forEach((drag)=>{
    drag.addEventListener("mousedown", mousedown);
    
    function mousedown(e){

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

       let prevX = e.clientX;
       let prevY = e.clientY;


       function mousemove(e){
    

      let newX =  prevX -e.clientX;
      let newY = prevY -  e.clientY;

      const rect = drag.getBoundingClientRect();
      drag.style.cursor = 'move';
      drag.style.left = `${rect.left - newX}px`;
      drag.style.top = `${rect.top - newY}px`;

      prevX = e.clientX;
      prevY = e.clientY;
      
       }
       function mouseup(){
         window.removeEventListener("mousemove", mousemove);
         window.removeEventListener("mouseup", mouseup);
         

       }
      }
  
 });
};
useEffect(()=>{
  startMoveFunction();
},[]);


  useEffect(()=>{
  
  const interval= setInterval(()=>{
     drawTime();
   },1000);
   
  return ()=>{
    clearInterval(interval);
  }

   //end of clock render
  },[drawTime,time]);
const ecocashHandle = (e) => {
  setWithdrawmoneyform({...withdrawmoneyform,[e.target.name]: e.target.value});
}
  const [withdrawMoney , setWithdrawMoney] = useState(false);
  const getSearch = () => {
    
    if(!isSearch){
      setIsSearch(true)
    }else{
      setIsSearch(false)
    }
  }
  const currencyInput = {};
  useEffect(()=>{
    // function to get money
  getMoney();
  function getMoney(){
    const data_funds = {
      user_id: localStorage.getItem("auth_user_id"),
      currency: 'usd'
    };
    axios.post(getfundsapi, data_funds).then((res) => {
     
        setLoading({ ...loading, isLoading: false });
        //  swal("Success", res.data.message,"success");
        setMoney({...money,user_funds: res.data.funds});
         
     
    });
  }
  },[]);
const withdrawMoneyForm = (e) => {
  e.preventDefault();
  alert('trying withdraw money');
}


var menu_toggle = "";
menu_toggle = (
<>
<div className={toggle?"toggle active":"toggle"} onClick={() => setToggle(!toggle)}>
  <span className="first"></span>
  <span className="middle"></span>
  <span className="last"></span>
</div>
</>
);
  var Withdraw_money = "";
  Withdraw_money = (
<>
<div className="modal">
  <div className="modal_container">
<div className="modal_header">
  <h3>You want to withdraw ({money.user_funds}) 💕 <button className="close_modal_btn" onClick={()=> setWithdrawMoney(false)}>&times;</button></h3>
</div>
<div className="modal_body" style={{padding: "15px"}}>
<form onSubmit={withdrawMoneyForm}>
<div className="grid">
  <input type="text" name="name" value={withdrawmoneyform.name} onChange={ecocashHandle} className="name_input input" placeholder="Your Name"/>
  <input type="text" name="surname" value={withdrawmoneyform.surname} onChange={ecocashHandle} className="surname_input input" placeholder="Your Surname"/>
</div>
<div className="phone_wrapper">
  <label>If its <b>PayPal</b> enter your email or <b>Ecocash</b> enter your ecocash number</label>
  <input type="phone" name="phone" value={withdrawmoneyform.phone} onChange={ecocashHandle} className="phone_input input" placeholder="Enter you number / email"/>
  <input type="number" maxlength="6" name="otp" className="phone_input input" placeholder="Enter your OTP" />
  <button type="submit" className="btn buy_hours">Withdraw Your Money</button>
 
</div>
</form>
</div>
</div>
</div>
</>
  );

  const calculateMoney = (e) => {
    

    const data_funds = {
      user_id: localStorage.getItem("auth_user_id"),
      currency: e.target.value
    };
setCurrency(e.target.value);

    axios.post(getfundsapi, data_funds).then((res) => {
      if (res.status === 200) {
        setLoading({ ...loading, isLoading: false });
        //  swal("Success", res.data.message,"success");
        setMoney({...money,user_funds: res.data.funds});
         
      }
    });
  };

  const hideDialog = (e) => {
    setSearch({ show_dialog:false });
  };
  const onFocus = (e) => {
    setSearch({...search, show_dialog:true });
  }
  const [searched, setSearched] = useState([]);
 
  // Search Lawfirms by Gene Piki

  const searchLawfirms = (e) => {
    let value = e;
  if(searchMic){
value = e;
  }else{
value = e.target.value;
  }
    setSearch({ search: value,searching: true,show_dialog:true });
    if(value === ''){
      setSearch({ searching: false,show_dialog:false });
    }
    const data_search = {
      search: value,
    };
    axios.post(searchapi, data_search).then((res) => {
      if (res.status === 200) {
        setSearch({ searching: false,show_dialog:true });
       

        setSearched(res.data.posts);
       
      }
    });
  };

  const navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });
try{
  localStorage.removeItem('user_profile');
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_name");
  localStorage.removeItem("auth_user_id");
  setLoading({ ...loading, isLoading: false });
  axios.post(logoutapi).then((res) => {
    if (res.status === 200) {
      localStorage.removeItem('user_profile');
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      localStorage.removeItem("auth_user_id");
      navigate("/");
      setLoading({ ...loading, isLoading: false });
    } else if (res.data.status === 401) {
      setLoading({ ...loading, isLoading: false });
      // swal("Warning", res.data.message,"warning");
    } else {
      setLoading({ ...loading, isLoading: false });
    }
  });
}catch(e){
  localStorage.removeItem('user_profile');
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_name");
  localStorage.removeItem("auth_user_id");
  setLoading({ ...loading, isLoading: false });

}
    
  };
 

  var AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <>
        <div className="clients_auth">
          {/* <Link
            to="/auth"
            title="This page its for auth use only.."
            className="lawfirm_auth title-color"
          >
            Login/Signup
          </Link>
        </div>
        <div className="lawfirm_auth">
          <Link
            to="/lawfirm/auth"
            title="This page its for lawfirms.."
            className="lawfirm_auth title-color"
          >
            Register Lawfirm
          </Link> */}
        </div>
      </>
    );
  } else {
    var auth_name = localStorage.getItem('auth_name');
    AuthButtons = (
      <div className="clients_logout">
        <button title="log out" onClick={logoutSubmit} className="logout_btn last_btn" style={{"display":"flex","justifyContent":"center","alignItems":"center"}}>
          <ExitToApp style={{"fontSize": "13px", "color": "white","marginRight":"4px"}}/> {auth_name?auth_name:''}
        </button>
      </div>
    );
  }

  var Gene_menu = "";
Gene_menu = (
  <>
  <div className="side_menu draggable" onMouseDown={startMoveFunction}>
    <div className="menu_header">
      <h2>Gene<LayersTwoTone/>Piki</h2>
    </div>
    <div className="menu_body">
     <ul>
      <Link to="/dashboard"><li>Dashboard <ArrowForwardIos/></li></Link>
      <Link to="/meetings"><li>Meetings <ArrowForwardIos/></li></Link>
      <li  onClick={()=> setWithdrawMoney(true)}>Withdraw Funds <ArrowForwardIos/></li>
      <Link to="/about"><li>About <ArrowForwardIos/></li></Link>
      <Link to="/contact"><li>Contact <ArrowForwardIos/></li></Link>
      <Link to="/blog/"><li>Blog <ArrowForwardIos/></li></Link>
      {loggedIn && (
         <li  onClick={logoutSubmit}>Log Out <ArrowForwardIos/></li>
         )}
         {!loggedIn && (
          <><Link
          to="/lawfirm/auth"
          title="This page its for lawfirms.."
          className="lawfirm_auth title-color"
        ><li>Register Lawfirm <ArrowForwardIos/></li></Link>
            <Link
            to="/auth"
            title="This page its for auth use only.."
            className="lawfirm_auth title-color"
          >
           <li> Login/Signup <ArrowForwardIos/></li></Link></>

         )}
     </ul>
    </div>
  </div>
  </>
);
  return (
    <>
    <div
        className={
          loading.isLoading ? "auth-body page-loading" : "page-loading-false"
        }
      >
        <div
          className={
            loading.isLoading
              ? "auth-body page-loading-content"
              : "page-loading-content-false"
          }
        ></div>
      </div>
    <div className="header">
        <div className="head_logo mg">
          <div className="logo_wrapper">
            <Link to="/">
              {" "}
              <span><span className="logo_bold">Gene</span><><LayersTwoTone/></><span className="logo_italic">Piki</span></span>
              {/* <h1 >title="gene law">GL</h1> */}
              {/* <img src={Logo} alt="GeneLaw logo" style={{height: "100%"}} /> */}
            </Link>
          </div>
        </div>
        <div className="head_search mg">
          <div className="flex_search">
          {isSearch?(
            <Cancel className="search_icon" onClick={()=> getSearch()} style={{"cursor": "pointer","fontSize": "30px","color": "var(--first-color)","marginLeft": "10px"}}/>
          ):(
         <Search className="search_icon" onClick={()=> getSearch()} style={{"cursor": "pointer","fontSize": "40px","color": "var(--first-color)"}}/>
          )}
         {isSearch&&(
          <>
 <input
 onChange={searchLawfirms}
 onFocus={onFocus}
 type="search"
 value={search.search}
 placeholder="Search GenePiki..."
 className="search"
/>
<span className={searchMic?"search_icon":''} onClick={()=> setSearchMic(!searchMic)}>
<Mic style={{cursor:'pointer'}} title='Search using your mic' />

      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/></span>
</>
         )}
         
         {!isSearch&&(

          <div className="other_links">
          <Link to="/dashboard">
              <button className="withdrawal_btn link"><Dashboard className="icon" style={{fontSize: '20px'}}/></button>
            </Link>
            <Link to="/meetings">
              <button className="withdrawal_btn link"><MeetingRoom className="icon" style={{fontSize: '20px'}}/></button>
            </Link>
            <Link to="/about">
              <button className="withdrawal_btn link"><More className="icon" style={{fontSize: '20px'}}/></button>
            </Link>
          </div>
         )}
         
        
          </div>
        
          <div className={search.show_dialog? 'search_results active': 'search_results'}>
            <div className="search_triangle"><span></span></div>
            <div className={search.searching? 'searching': 'searching-none'}>
              <div className="searching-content">

              </div>
            </div>
           <div className="gene"> Gene<LayersTwoTone/>Piki Results <span onClick={hideDialog}>&times;</span></div>
            {searched.map((post) => {
              if(post.role == '1'){
              return (
                <>
                  <div className="search_card">
                    <div className="head"> {post.name}</div>
                    <div className="body">
                      <div className="flex_wrap">
                        <img src={post.picture} className="search_img" alt="img" />
                        <div className="right_info">{post.description}...
                        <br/><Link to={"/lawfirm/"+post.id}><button style={{"width":"200px"}} onClick={()=> navigate("/lawfirm/"+post.id)} className="app-btn schedule-sent">View Lawyers Available</button></Link>
                        </div>
                      </div>
                      <div className="price_footer">
                      Consultation fee <b style={{"marginLeft":"5px"}}> $ {post.price}</b>
                      </div>
                    </div>
                  </div>
                </>
              );
            }else{
              return (
              <>
              <div className="search_card">
                <div className="head"> {post.name}</div>
                <div className="body">
                  <div className="flex_wrap_lawyer">
                    <img src={post.picture} className="search_img" alt="img" />
                    <div className="right_info">{post.description}...
                    <br/><Link to={"/lawfirm/"+post.name.toLowerCase()+"/"+post.belongs}><button style={{"width":"200px"}} onClick={()=> navigate("/lawfirm/"+post.belongs)} className="app-btn schedule-sent">View More Info</button></Link>
                    </div>
                  </div>
                  <div className="price_footer">
                  Consultation fee <b style={{"marginLeft":"5px"}}> $ {post.price}</b>
                  </div>
                </div>
              </div>
            </>
            );
            }
            })}
          </div>
        </div>
        
        <div className="lawyer_funds">
          <span title="here is your money" className="money">
            <button className="money-btn first_btn" type="text">
              {money.user_funds? money.user_funds : "0.00"}
            </button>
          </span>
          <div className="inline">
            <select
              name="currency"
              value={currencyInput.currency}
              onChange={calculateMoney}
              className="btn_gene"
            >
              <option value={"usd"}>USD</option>
              <option value={"rtgs"}>RTGS</option>
            </select>
              <button className="withdrawal_btn" onClick={()=> setWithdrawMoney(true)}>Withdraw Funds</button>
           
          </div>
        </div>
        <div className="withdrawal_btn" id="canvas">
        {time.time_html}
        </div>
        <div className="app_auth" style={{"marginLeft": "5px"}}>{AuthButtons}</div>
      {withdrawMoney && (
      <>
     {Withdraw_money}
      </>
      )}
      {menu_toggle}
      {toggle && (
        <>
       {Gene_menu}
       </>
      )}
    </div>
    {cookie_div}
   </>
  );
}

export default Header;
