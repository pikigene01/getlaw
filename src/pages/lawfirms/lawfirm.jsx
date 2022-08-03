import React, { useState, useEffect } from "react";
import Header from "../../assets/components/header/header";
import Logo from "../../assets/imgs/logo.jfif";
import { AiOutlineStar, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Lawfirm.css";
import axios from "axios";
import swal from "sweetalert";
import Footer from "../../assets/components/footer/footer";
import { Email, FileCopy, LocationCity, MeetingRoom, Phone, Share } from "@material-ui/icons";
import './Visa.css';
import Chip from '../../assets/imgs/chip.png';
import Visa from '../../assets/imgs/visa.png';

export default function Lawfirm(props) {
  const [loading, setLoading] = useState({
    isLoading: false,
  });
  const [available_user,setAvailable_user] =useState([]);
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [buyMoney, setBuyMoney] = useState({
    ecocash: false,
    paypal: false
  });
  const [userreceivedtoken,setUserReceivedToken] = useState({
    token: ''
  })
  const [bookingsResults, setBookingsResults] = useState([]);
  const [lawyertoview,setLawyerToView] = useState({
    view: false,
     id: '',
     name: ''
  });
  const [ecocashform, setEcocashform] = useState({
    name: '',
    surname: '',
    phone: '',
    received_token: ''
  })
  
  const [bookingdiv, setBookingdiv] = useState({
    isbookingdiv: true,
  });
  const url = window.location.pathname;
  const param_id = url.substring(url.lastIndexOf("/") + 1);

  const [bookingsForm,setBookingsForm] = useState({
    data_week: '',
    data_event: '',
    lawyer_id: lawyertoview.id,
    token: '',
  });
  let i =0;
 
  const [loggedInUser,setloggedInUser] = useState({
status: false,
user_id: ''
  });
  
  const [loadReviews, setLoadReviews] = useState({
    load: true,
  });

  const [reviewsRatings, setReviewsRatings] = useState({
    one_perc: "",
    two_perc: "",
    three_perc: "",
    four_perc: "",
    five_perc: "",
    total_ratings: "",
  });

  const [reviewInput, setReviewInput] = useState({
    token: "",
    review: "",
    rated_index: "",
  });
  const [lawyerviewing,setLawyerViewing] = useState('');
const [isYourBookings, setIsYourBookings] = useState(false);
const [lawyers, setLawyers] = useState([]);
const [visaForm,setVisaForm] = useState({
  card_number: '',
  card_holder: '',
  month: '',
  year_input: '',
  cvv_value: '',
  });

//   end of Gene useState

  const percentage_one =
    (reviewsRatings.one_perc / reviewsRatings.total_ratings) * 100;
  const percentage_two =
    (reviewsRatings.two_perc / reviewsRatings.total_ratings) * 100;
  const percentage_three =
    (reviewsRatings.three_perc / reviewsRatings.total_ratings) * 100;
  const percentage_four =
    (reviewsRatings.four_perc / reviewsRatings.total_ratings) * 100;
  const percentage_five =
    (reviewsRatings.five_perc / reviewsRatings.total_ratings) * 100;

 


  const getLawyer = (idtoview) => {
    return lawyers.find(user => user.id === idtoview) || lawyers.find(user => user.name.toLowerCase() === idtoview);
}
// useEffect(()=>{
// // Function to remove all spaces
//       // from a given string
//       function removeSpaces(str) {
//         // To keep track of non-space
//         // character count
//         var count = 0;
 
//         // Traverse the given string. If current
//         // character is not space, then place
//         // it at index 'count++'
//         for (var i = 0; i < str.length; i++)
//           if (str[i] !== " ") str[count++] = str[i];
//          // here count is
//         // incremented
 
//         return count;
//       }
 
//       // Driver code
//       var str = lawyertoview?.name.split("");
//       var i = removeSpaces(str);

//       document.write(str?.join("").substring(0, i));
//       alert(
//       document.write(str?.join("").substring(0, i))
//       )
//     },[lawyertoview.name]);//substistute string removing space
useEffect(()=>{
  if(lawyertoview.view){
const lawyersss = getLawyer(lawyertoview.name.toLowerCase());

  setLawyerViewing(lawyersss);
// console.log(lawyer)
  }
},[lawyertoview]);
  useEffect(()=>{
    if(localStorage.getItem('auth_token')){
      var user_id = localStorage.getItem('auth_user_id');
      setloggedInUser({status: true,user_id: user_id});
    }

  },[]);
  const load_lawyer_bokings = (id,lawyername) => {
    setBookingsResults(null);
  
    setLawyerToView({...lawyertoview,view:true,id: id,name:lawyername});
   navigate(`/lawfirm/${lawyername.toLowerCase()}/${param_id}`);
    const btnsall = document.querySelectorAll('tr button');
    for(var i = 0; i< btnsall.length;i++){
        btnsall[i].classList.remove('scheduled-btn')
        btnsall[i].classList.add('schedule-btn')
        btnsall[i].disabled = false
  
  
    }
    setLoading({isLoading:true});
    const data = {
      lawyer_id: id,
    
    };
    axios.post("/api/schedule/get", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
  
      setBookingsForm({...bookingsForm, token: ""});
      setBookingsResults(res.data.bookings);
    setLoading({isLoading:false});   
    });
    
    if(loggedInUser.user_id == id){
      setIsYourBookings(true);
    }else{
  
      setIsYourBookings(false);
  
    }
  }

 const setAvailability = (e) => {
  e.preventDefault();
  setLoading({ ...loading, isLoading: true });

  const data = {
    times_available: available_user,
    lawyer_id: lawyertoview.id,
    type: '1'
  }
 
  axios.post("/api/set/availability", data).then((res) => {
    setLoading({ ...loading, isLoading: false });
    if(res.data.status == 200){
      swal('Success',res.data.message,'success');

    }else{
      swal('Warning',res.data.message,'warning');
    }

  });

 }

const ecocashHandle = (e) => {
  setEcocashform({...ecocashform,[e.target.name]: e.target.value});
};
const Schedule_handler = (e) => {
  setBookingsForm({...bookingsForm,token:e.target.value});
}


useEffect(()=>{

  const Schedule_get = (id) => {
    const data = {
      lawyer_id: id,
    
    };
    axios.post("/api/schedule/get", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
  
      setBookingsForm({...bookingsForm, token: ""});
      setBookingsResults(res.data.bookings);
    });
  };
  Schedule_get(lawyertoview.id);
}, []);

useEffect(()=>{
  var count = (window.location.pathname.split('/').length - 1) - (window.location.pathname[window.location.pathname.length - 1] == '/' ? 1 : 0);
  
  switch(count.toString()){
    
    case '3':
      var lawyer_name_by_url = window.location.pathname.split('/')[2];

      setLawyerToView({...lawyertoview,view:true,name:lawyer_name_by_url});
     
  const lawyer_view_by_url =  getLawyer(lawyertoview?.name?.toLowerCase());
  if(lawyer_view_by_url){
   
     load_lawyer_bokings(lawyer_view_by_url.id,lawyer_view_by_url.name);

  }
  setLawyerViewing(lawyer_view_by_url);
    break;
    case '2':
      setLawyerToView({...lawyertoview,view:false});

    break;
  };
  
 },[url,lawyers,lawyertoview.name]);
 useEffect(()=>{
 
    var count = (window.location.pathname.split('/').length - 1) - (window.location.pathname[window.location.pathname.length - 1] == '/' ? 1 : 0);
  
 
  switch(count.toString()){
    
    case '2':
      setLawyerToView({...lawyertoview,view:false});

      navigate(`/lawfirm/${param_id}`);

    break;
  }
  
  },[url]);



const resetAvailability = (e) => {
  e.preventDefault();
  setLoading({ ...loading, isLoading: true });

  const data = {
    lawyer_id: lawyertoview.id,
    type: '1'
  }
 
  axios.post("/api/reset/availability", data).then((res) => {
    setLoading({ ...loading, isLoading: false });
    if(res.data.status == 200){
      swal('Success',res.data.message,'success');
      load_lawyer_bokings(lawyertoview.id,lawyertoview.name);
      setLawyerToView({...lawyertoview,view:true});
    }else{
      swal('Warning',res.data.message,'warning');
    }

  });

 }

const Schedule_sent = (e)=> {
  e.preventDefault();
  const data = {
    lawyer_id: lawyertoview.id,
    data_event: bookingsForm.data_event,
    data_week: bookingsForm.data_week,
    token: bookingsForm.token,
    type: '0',
    //when type = 0 which means we are booking otherwise we are setting availability
  };
  setLoading({ ...loading, isLoading: true });

  axios.post("/api/schedule/sent", data).then((res) => {
    setLoading({ ...loading, isLoading: false });
 if(res.data.status == 200){
    setBookingsForm({...bookingsForm, token: ""});
    swal("Success", res.data.message, "success");
 }else{
  swal("Warning", res.data.message, "warning");

 }
  });
  // alert(bookingsForm.data_event+"/"+bookingsForm.data_week+"/"+bookingsForm.lawyer_id+"/"+bookingsForm.token);
};



  const buyUsingEco = (e) => {
    e.preventDefault();
    const data = {
      ecocashname: ecocashform.name,
      ecocashsurname: ecocashform.surname,
      ecocashnumber: ecocashform.phone,
      lawfirm_id: param_id,
      lawfirm_price: posts.price
    }
    
    axios.post("/api/get/token/eco", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
      if(res.data.status == '200'){
      setUserReceivedToken({token:res.data.token})
      }else{
        swal('Warning', 'Something Went Wrong', 'warning');
      }
    });
   
  }
  const copyToken = (e) => {
    let copyText = document.querySelector(".token_input");
    let input = copyText.querySelector("input.token");
    input.select();
    document.execCommand("copy");
    copyText.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(()=>{
  copyText.classList.remove("active");
    },2500);
  };
const copyLawyerUrl = (e) => {
  let copyText = document.querySelector(".lawyer_url_btn");
  let lawyer_url_input = document.querySelectorAll("#lawyer_url_input");
  lawyer_url_input.forEach((input_url)=>{
    input_url.select();
    document.execCommand("copy");
    copyText.classList.add("active");
    // window.getSelection().removeAllRanges();
    setTimeout(()=>{
    input_url.style.display = "none";
    copyText.classList.remove("active");
        },2500);
  });
 
 
};


  const updateVisa = (e) => {
  if(buyMoney.paypal){

 const cvv_input = document.querySelectorAll('.cvv-input');
 cvv_input.forEach((cvv)=>{
  cvv.onmouseenter = () =>{
    const front = document.querySelectorAll('.front');
    front.forEach((fr)=>{
      fr.style.transform = 'perspective(1000px) rotateY(-180deg)';
    })
    const back = document.querySelectorAll('.back');
    back.forEach((bk)=>{
      bk.style.transform = 'perspective(1000px) rotateY(0deg)';
    })

    cvv.onmouseleave = () =>{
      const front = document.querySelectorAll('.front');
      front.forEach((fr)=>{
        fr.style.transform = 'perspective(1000px) rotateY(0deg)';
      })
      const back =  document.querySelectorAll('.back');
      back.forEach((bk)=>{
        bk.style.transform = 'perspective(1000px) rotateY(180deg)';
      })
  }



}
 });
};
};
const BuyTokenVisa = (e) => {
  e.preventDefault();
  const data = {
    visa_holder: visaForm.card_holder,
    visa_number: visaForm.card_number,
    
  }
  alert('Visa still working on it');
}

  var Ecocash_div = "";
  Ecocash_div = (
<>
<div className="modal">
  <div className="modal_container">
<div className="modal_header">
  <h3>PayMoney with ecocash and get a token <button className="close_modal_btn" onClick={()=> setBuyMoney({ecocash:false})}>&times;</button></h3>
</div>
<div className="modal_body" style={{"padding": "20px"}}>
<h1>Price Per Hour = USD {posts.price}</h1>
<form onSubmit={buyUsingEco}>
<div className="grid">
  <input type="text" name="name" value={ecocashform.name} onChange={ecocashHandle} className="name_input input" placeholder="Name"/>
  <input type="text" name="surname" value={ecocashform.surname} onChange={ecocashHandle} className="surname_input input" placeholder="Surname"/>
</div>
<div className="phone_wrapper">
  <input type="phone" name="phone" value={ecocashform.phone} onChange={ecocashHandle} className="phone_input input" placeholder="Enter you ecocash number" style={{width: "80%"}}/>
  <button type="submit" className="btn buy_hours">Buy Now</button>
  <div className="token_input">
    <input type="text" className="token" value=
  {userreceivedtoken.token?userreceivedtoken.token:'Pay and get your track token here'} />
  <span onClick={copyToken}><FileCopy/></span>
  </div>
</div>
</form>
</div>
</div>
</div>
</>
  );

    
  var Lawyer_div = "";
  Lawyer_div = (
  
<>
<div className="modal lawyer_modal">
  <div className="modal_container">
{/* <div className="modal_header">
  <h3>View lawyer<button className="close_modal_btn" onClick={()=>  navigate(`/lawfirm/${param_id}`)}>&times;</button></h3>
</div> */}
<div className="modal_body">
  <div className="profile" style={{marginTop:"-20px"}}>
    {skeletonLoader && (
    <img draggable={false} src={lawyerviewing?.picture} alt={lawyerviewing?.description} className="gene_profile" />

    )}
    {!skeletonLoader && (
    <div draggable={false} className="gene_profile" />
 
    )}
  <button className="close_modal_btn" onClick={()=>  navigate(`/lawfirm/${param_id}`)}>&times;</button>
  {skeletonLoader && (
    
    <h3>{lawyerviewing?.name} {lawyerviewing?.surname}</h3>
  )}
    {!skeletonLoader && (
    <h3 className="skeleton" style={{width: "150px",height:"20px",margin: "10px 0"}}></h3>

    )}
    <div className="grid_lawyer_btns" style={{padding:"10px"}}>
      <a href={"/meetings/"+lawyerviewing?.id}><button className="law_prof_btn">room <MeetingRoom/> </button></a>
      <button className="law_prof_btn lawyer_url_btn" onClick={(e)=> copyLawyerUrl(e)}>share <Share/></button>
    </div>
  </div>
  <div className="law_profile_body">
  <input type="text" id="lawyer_url_input" className="lawyer_url_input" value=
  {window.location} readonly/>
   {skeletonLoader && (
    <>
  <p className="justify_center">{lawyerviewing?.description}</p>
  <p className="justify_center"><Phone/> {lawyerviewing?.phone}</p>
  <p className="justify_center"><Email/> {lawyerviewing?.email}</p>
  <p className="justify_center"><LocationCity/> {lawyerviewing?.location}</p>

  </>
   )}
  
      {!skeletonLoader && (
        <p className="skeleton" style={{width: "150px",height:"20px",margin: "10px 0"}}></p>

        )}
      {!skeletonLoader && (
        <p className="skeleton" style={{width: "150px",height:"20px",margin: "10px 0"}}></p>

        )}
      {!skeletonLoader && (
        <p className="skeleton" style={{width: "150px",height:"20px",margin: "10px 0"}}></p>

        )}
      {!skeletonLoader && (
        <p className="skeleton" style={{width: "150px",height:"20px",margin: "10px 0"}}></p>

        )}

  </div>

</div>
</div>
</div>
</>
  );
  
  var Paynow_div = "";
  Paynow_div = (
    <>
<div className="visa_modal">
<div className="visa_modal_container">
<div className="container">

    <div className="card-container">

        <div className="front">
            <div className="image">
                <img src={Chip} alt="" />
                <img src={Visa} alt="" />
                <button className="close_modal_btn" onClick={()=> setBuyMoney({paypal:false})}>&times;</button>
            </div>
            <div className="card-number-box">{visaForm.card_number_box?visaForm.card_number_box:'################'}</div>
            <div className="flexbox">
                <div className="box">
                    <span>card holder</span>
                    <div className="card-holder-name">{visaForm.card_holder?visaForm.card_holder:'full name'}</div>
                </div>
                <div className="box">
                    <span>expires</span>
                    <div className="expiration">
                        <span className="exp-month">{visaForm.month?visaForm.month:'mm'}</span>
                        <span className="exp-year">{visaForm.year_input?visaForm.year_input:'yy'}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="back">
            <div className="stripe"></div>
            <div className="box">
                <span>cvv</span>
                <div className="cvv-box">{visaForm.cvv_value}</div>
                <img src={Visa} alt=""/>
            </div>
        </div>

    </div>

    <form onSubmit={BuyTokenVisa}>
        <div className="inputBox">
            <span>card number</span>
            <input type="text" maxlength="16" value={visaForm.card_number_box} onChange={(e)=>setVisaForm({...visaForm,card_number_box:e.target.value})} className="card-number-input"/>
        </div>
        <div className="inputBox">
            <span>card holder</span>
            <input type="text" name="card_holder" value={visaForm.card_holder} onChange={(e)=>setVisaForm({...visaForm,card_holder:e.target.value})} className="card-holder-input"/>
        </div>
        <div className="flexbox">
            <div className="inputBox">
                <span>expiration mm</span>
                <select name="month" value={visaForm.month} onChange={(e)=>setVisaForm({...visaForm,month:e.target.value})} className="month-input">
                    <option value="month" selected disabled>month</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div className="inputBox">
                <span>expiration yy</span>
                <select name="year_input" value={visaForm.year_input} onChange={(e)=>setVisaForm({...visaForm,year_input:e.target.value})} id="" className="year-input">
                    <option value="year" selected disabled>year</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
            </div>
            <div className="inputBox">
                <span>cvv</span>
                <input type="text" maxlength="4" value={visaForm.cvv_value} onMouseEnter={updateVisa} onChange={(e)=>setVisaForm({...visaForm,cvv_value:e.target.value})} className="cvv-input"/>
            </div>
        </div>
        <input type="submit" value="Buy Token" className="submit-btn"/>
    </form>

</div>  
</div>
</div>
    </>
  );

  // var date = new Date();
  // var hours = date.getHours();
  // var minutes = date.getMinutes();
  // var seconds = date.getSeconds();
  // setGetTime({hours: hours,minutes: minutes,seconds:seconds})

  const reviewHandleInput = (e) => {
    setReviewInput({ ...reviewInput, [e.target.name]: e.target.value });
  };
  //function to post reviews

  const postReview = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });

    const data = {
      post_id: param_id,
      rated_index: rating,
      token: reviewInput.token,
      review: reviewInput.review,
    };
    axios.post("/api/post/review", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
      if(res.data.status == 200){
      setLoadReviews({ load: true });
      setReviewInput({ token: "", rated_index: "", review: "" });
      swal("Success", res.data.message, "success");
      }else{
      swal("Warning", res.data.message, "warning");

      }
    });
  };
  if (loadReviews.load) {
    getReviews();
    // function to get all reviews from the api

    function getReviews() {
      let data = {
        post_id: param_id,
      };
      axios.post("/api/get/reviews", data).then((res) => {
        const reviews_count = res.data.count;
        setLoadReviews({ load: false });

        const one = res.data.one_perc;
        const two = res.data.two_perc;
        const three = res.data.three_perc;
        const four = res.data.four_perc;
        const five = res.data.five_perc;
        setReviewsRatings({
          one_perc: one,
          two_perc: two,
          three_perc: three,
          four_perc: four,
          five_perc: five,
          total_ratings: reviews_count,
        });

        if (res.data.posts) {
          setReviews(res.data.posts);
        } else {
        }

        setLoading({ ...loading, isLoading: false });
      });
    }
  } else {
  }
  if(bookingsResults){
  bookingsResults.map((data)=> {
    var button = document.querySelectorAll(`button[data-week="${data.data_date}"][data-event="${data.data_event}"]`);
    button.forEach((btn)=>{
        btn.classList.add('scheduled-btn');
        btn.classList.remove('schedule-btn');
      btn.setAttribute("data-meeting", "yes");

        btn.disabled = true
    })
    // document.querySelectorAll(`button[data-week="${data.data_date}"][data-event="${data.data_event}"]`).classList.remove('schedule-btn');

  });

  };
  const schedule_time = (e) => {
    var week_day = e.target.dataset.week,
    scheduled_time = e.target.dataset.event;
 
   available_user.push({week_day: week_day,schedule_time: scheduled_time});
   
    var button = document.querySelector(`button[data-week="${week_day}"][data-event="${scheduled_time}"]`).classList.toggle('scheduled-btn');
    var buttons = document.querySelector(`button[data-week="${week_day}"][data-event="${scheduled_time}"]`).classList.toggle('schedule-btn');
    
    setBookingsForm({...bookingsForm,data_week: week_day,data_event:scheduled_time});
    // var button = document.querySelector(`button[data-week="${week_day}"][data-event="${scheduled_time}"]`).classList.remove('schedule-btn');

  }


  const toggleDivs = () => {
    if (bookingdiv.isbookingdiv) {
      setBookingdiv({ isbookingdiv: false });
    } else {
      setBookingdiv({ isbookingdiv: true });
    }
  };
  var Buttons = "";
  // functions to retrieve btns of sidediv
  if (bookingdiv.isbookingdiv) {
    Buttons = (
      <>
        <button
          onClick={toggleDivs}
          style={{ width: "40%" }}
          className="app-btn review-sent"
        >
          Show All Reviews ({reviewsRatings.total_ratings})
        </button>
      </>
    );
  } else {
    Buttons = (
      <button
        onClick={toggleDivs}
        style={{ width: "40%" }}
        className="app-btn review-sent"
      >
        Start Bookings
      </button>
    );
  }
  const scheduled_btn = document.querySelectorAll('button[data-meeting="yes"]');
scheduled_btn.forEach((btn)=>{
  btn.onclick = () => {
    navigate("/meetings/"+lawyertoview.id);
  }
});

 
  var Right_div = "";

  if (bookingdiv.isbookingdiv) {
    Right_div = (
      <>
        <div className="right-side">
          <div className="head-title">Start Bookings {lawyertoview.name?lawyertoview.name:': Select any lawyer'}</div>

          <div className="calenda available-time">
 
            <div className="schedule-time">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="nine_ten">
                    <td>
                      <button data-day="1" data-week="mon" data-event="9" onClick={schedule_time} className="schedule-btn">9-10 AM</button>
                    </td>
                    <td>
                      <button data-day="2" data-week="tue" data-event="9" onClick={schedule_time} className="schedule-btn">9-10 AM</button>
                    </td>
                    <td>
                      <button data-day="3" data-week="wed" data-event="9" onClick={schedule_time} className="schedule-btn">9-10 AM</button>
                    </td>
                    <td>
                      <button data-day="4" data-week="thur" data-event="9" onClick={schedule_time} className="schedule-btn">9-10 AM</button>
                    </td>
                    <td>
                      <button data-day="5" data-week="fri" data-event="9" onClick={schedule_time} className="schedule-btn">9-10 AM</button>
                    </td>
                  </tr>
                  <tr className="ten_eleven">
                    <td>
                      <button data-day="1" data-week="mon" data-event="10" onClick={schedule_time} className="schedule-btn">10-11 AM</button>
                    </td>
                    <td>
                      <button data-day="2" data-week="tue" data-event="10" onClick={schedule_time} className="schedule-btn">10-11 AM</button>
                    </td>
                    <td>
                      
                        <button data-day="3" data-week="wed" data-event="10" onClick={schedule_time} className="schedule-btn">10-11 AM</button>
                    
                    </td>
                    <td>
                      <button data-day="4" data-week="thur" data-event="10" onClick={schedule_time} className="schedule-btn">10-11 AM</button>
                    </td>
                    <td>
                      <button data-day="5" data-week="fri" data-event="10" onClick={schedule_time} className="schedule-btn">10-11 AM</button>
                    </td>
                  </tr>
                  <tr className="eleven_twelve">
                    <td>
                      <button data-day="1" data-week="mon" data-event="11" onClick={schedule_time} className="schedule-btn">11:12 AM</button>
                    </td>
                    <td>
                      <button data-day="2" data-week="tue" data-event="11" onClick={schedule_time} className="schedule-btn">11:12 AM</button>
                    </td>
                    <td>
                      <button data-day="3" data-week="wed" data-event="11" onClick={schedule_time} className="schedule-btn">11:12 AM</button>
                    </td>
                    <td>
                      <button data-day="4" data-week="thur" data-event="11" onClick={schedule_time} className="schedule-btn">11:12 AM</button>
                    </td>
                    <td>
                      <button data-day="5" data-week="fri" data-event="11" onClick={schedule_time} className="schedule-btn">11:12 AM</button>
                    </td>
                  </tr>
                  <tr className="twelve_thirteen">
                    <td>
                      <button data-day="1" data-week="mon" data-event="12" onClick={schedule_time} className="schedule-btn">12-1 PM</button>
                    </td>
                    <td>
                      <button data-day="2" data-week="tue" data-event="12" onClick={schedule_time} className="schedule-btn">12-1 PM</button>
                    </td>
                    <td>
                      <button data-day="3" data-week="wed" data-event="12" onClick={schedule_time} className="schedule-btn">12-1 PM</button>
                    </td>
                    <td>
                      <button data-day="4" data-week="thur" data-event="12" onClick={schedule_time} className="schedule-btn">12-1 PM</button>
                    </td>
                    <td>
                      <button data-day="5" data-week="fri" data-event="12" onClick={schedule_time} className="schedule-btn">12-1 PM</button>
                    </td>
                  </tr>
                  <tr className="fourteen">
                    <td>
                      <button data-day="1" data-week="mon" data-event="14" onClick={schedule_time} className="schedule-btn">2-3 PM</button>
                    </td>
                    <td>
                      <button data-day="2" data-week="tue" data-event="14" onClick={schedule_time} className="schedule-btn">2-3 PM</button>
                    </td>
                    <td>
                      <button data-day="3" data-week="wed" data-event="14" onClick={schedule_time} className="schedule-btn">2-3 PM</button>
                    </td>
                    <td>
                      <button data-day="4" data-week="thur" data-event="14" onClick={schedule_time} className="schedule-btn">2-3 PM</button>
                    </td>
                    <td>
                      <button data-day="5" data-week="fri" data-event="14" onClick={schedule_time} className="schedule-btn">2-3 PM</button>
                    </td>
                  </tr>

                  <tr className="sixteen_seventeen">
                    <td>
                      <button data-day="1" data-week="mon" data-event="16" onClick={schedule_time} className="schedule-btn">4-5 PM</button>
                    </td>
                    <td>
                      <button data-day="2" data-week="tue" data-event="16" onClick={schedule_time} className="schedule-btn">4-5 PM</button>
                    </td>
                    <td>
                      <button data-day="3" data-week="wed" data-event="16" onClick={schedule_time} className="schedule-btn">4-5 PM</button>
                    </td>
                    <td>
                      <button data-day="4" data-week="thur" data-event="16" onClick={schedule_time} className="schedule-btn">4-5 PM</button>
                    </td>
                    <td>
                      <button data-day="5" data-week="fri" data-event="16" onClick={schedule_time} className="schedule-btn">4-5 PM</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="schedule_description">
                 <span className="scheduled_dis"></span>
                 <span className="scheduled_text">Scheduled</span>
                 <span className="schedule_dis"></span>
                 <span className="schedule_text">Not Scheduled</span>
                 <span className="available_dis"></span>
                 <span className="available_text">Available</span>
                </div>
              <br/>
              <div className="schedule_selected_times">
                {!loggedInUser.status && (
   <form onSubmit={Schedule_sent}>
   <input
   className="token-input inputs"
   required
   style={{ width: "100%" }}
   type="text"
   value={bookingsForm.token}
   onChange={Schedule_handler}
   placeholder="please enter a valid token to schedule selected time.."
 />

 <button type="submit" className="app-btn schedule-sent">
   Schedule Selected Time
 </button>
 </form>
                )}
                {loggedInUser.status && isYourBookings && (
                  <>
   <form onSubmit={setAvailability}>

 <button type="submit" className="app-btn schedule-sent">
   Select Times Not Availability
 </button>
 </form>
  <form onSubmit={resetAvailability}>

  <button type="submit" className="app-btn schedule-sent" style={{marginTop: "8px"}}>
    Reset Availability
  </button>
  </form>
  </>
                )}
               
             
            </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    Right_div = (
      <>
        <div className="right-side">
          <div className="head-title">View All ({posts.name}) Reviews</div>
          <div className="twogrid">
            <div className="ratings">
              <div className="fiveratings rating">
                <div className="perc" style={{ width: `${percentage_five}%` }}>
                  <p>5</p>
                </div>
              </div>
              <div className="fourratings rating">
                <div className="perc" style={{ width: `${percentage_four}%` }}>
                  <p>4</p>
                </div>
              </div>
              <div className="threeratings rating">
                <div className="perc" style={{ width: `${percentage_three}%` }}>
                  <p>3</p>
                </div>
              </div>
              <div className="tworatings rating">
                <div className="perc" style={{ width: `${percentage_two}%` }}>
                  <p>2</p>
                </div>
              </div>
              <div className="oneratings rating">
                <div className="perc" style={{ width: `${percentage_one}%` }}>
                  <p>1</p>
                </div>
              </div>

              {/* <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />  */}
              <h4 className="reviews">
                {reviewsRatings.total_ratings} Reviews
              </h4>
            </div>

            <div className="reviews_all">
              {reviews.map((review) => {
                return (
                  <>
                    <div className="user-ratings" key={review.id}>
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label key={i}>
                            <input
                              className="is-hidden"
                              type="radio"
                              name="rating"
                              value={ratingValue}
                            />
                            <AiOutlineStar
                              className="reviews-star"
                              title={`user rated this Lawfirm ${review.rated_index} Stars`}
                              size={20}
                              color={
                                ratingValue <= review.rated_index
                                  ? "#ffc107"
                                  : "#333"
                              }
                            />
                          </label>
                        );
                      })}
                      <span style={{ "marginLeft": "5px" }}>
                        {review.created_at.substr(0, 10)}{" "}
                        {review.created_at.substr(12, 14)}
                      </span>
                    </div>
                    <div className="review">
                      <p>{review.review}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    const data = {
      post_id: param_id,
    };
    // function to retrieve all lawfirms
    getLawfirms(data);
    function getLawfirms(data) {
      axios.post("/api/lawfirms/view", data).then((res) => {
        if (res.data.posts[0]) {
          setPosts(res.data.posts[0]);
          document.title = res.data.posts[0].name + " Lawfirm | GetLaw";
        } else {
          navigate("/");
        }

        setSkeletonLoader(true);
      });
    }

    // function to retrieve all lawfirms

    getLawyers();
    function getLawyers() {
      let data = {
        post_id: param_id,
      };
      axios.post("/api/lawyers/get", data).then((res) => {
        if (res.data.posts) {
          setLawyers(res.data.posts);
        } else {
          navigate("/");
        }

        setSkeletonLoader(true);
      });
    }
  }, []);
  return (
    <>
      <Header />
      {buyMoney.ecocash && (
      <>
     {Ecocash_div}
      </>
      )}
      {lawyertoview.view && (
      <>
     {Lawyer_div}
      </>
      )}
      {buyMoney.paypal && (
        <>
        {Paynow_div}
        </>
      )}
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
      <div className="body-wrapper">
        <div className="left-side">
        {skeletonLoader ? (
          <div className="head-title"> {posts.name ? posts.name : ""} </div>
        ) : (
          <div className="head-title skeleton"></div>
        )}
          <div className="body-info">
            <div className="card_img_wrapper">
              <div className="grid">
                {skeletonLoader ? (
                  <div>
                    <img
                      src={posts.picture ? posts.picture : ""}
                      className=""
                      alt="lawfirm-logo"
                      style={{ width: "300px", height: "200px" }}
                    />
                    <p>{posts.description?posts.description: ''}</p>
                  </div>
                ) : (
                  <div
                    className="skeleton"
                    style={{ width: "300px", height: "200px" }}
                  ></div>
                )}
                <div className="available-lawyers" style={{ height: "300px" }}>
                  <h1 className="count-lawyers">Lawyers available</h1>
                  {skeletonLoader ? (
                    <>
                      { lawyers.length !== null ? lawyers.map((lawyer) => {
                        
                        var lawyername = lawyer.name;
                        var description = lawyer.description;
                        if(description.length > 100){
                        description = `${description.substr(0, 100)} _Read More_`
                        }else{
                          description = lawyer.description;
                        }
                        if (lawyername.length > 4) {
                          lawyername = `${lawyername.substr(0, 8)}..`;
                        } else {
                          lawyername = lawyer.name;
                        }
                        return (
                          <div
                          key={lawyer.id}
                          onClick={()=> load_lawyer_bokings(lawyer.id,lawyer.name)}
                            className="lawyer-wrapppers story"
                            title={
                              "Click Here To Schedule Meeting with " +
                              lawyer.name
                            }
    style={{"backgroundImage": `linear-gradient(transparent, rgba(0,0,0,1.9)),  url(${lawyer.picture})`}}
                          >
                           
                              <img
                                src={lawyer.picture}
                                className="lawyer-imgs"
                                alt="lawfirm-logo"
                                style={{ width: "40px", height: "40px" }}
                              />                               
                               <p className="lawyer-tag">{lawyername}</p>
                                <br />
                               <p className="lawyer-descr">{description}</p>

                                {/* <div className="liked-heart" title="give a like"><AiFillHeart className="like"/> <span>2 likes</span></div> */}
                            
                          </div>
                        );
                      }) : alert(null) }
                    </>
                  ) : (
                    <>
                    {[...Array(5)].map(() => {
                      i++;
                      return (
                        <div
                     key={i}
                          className="lawyer-wrapppers story skeleton"
                          title={
                            "Click Here To Schedule Meeting with "
                          }
                        >
                         
                        </div>
                    );
                  })}</>
                  )}

                  {/* lawfirm wrapper */}
                  {/* <div className="lawyer-wrappper" title="Click Here To Schedule Meeting">
                    <div className="lawyer-wrappper-body">
                      <img
                        src={Logo}
                        className="lawyer-imgs"
                        alt="lawfirm-logo"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <div class="lawyer-wrappper-title">
                        <span className="lawyer-tag">Patrick Tererai</span>
                        <br/>
                        <div className="like-heart" title="give a like"><AiFillHeart className="like"/> <span>2 likes</span></div>
                      </div>
                    </div>
                  </div> */}
                  {/* lawfirm wrapper */}
                </div>
              </div>
              <div className="lawfirm_extented">
              {skeletonLoader ? (
                <div className="grid" style={{height: "20px"}}>
                  <div>
                <h3>$ {posts.price} per 1 hour</h3>
                </div>
                <div>
                  <h1 className="buy_btn_title">Buy Hours using</h1>
                  <div className="btns_flex">
                  <button className="btn paypal_btn" onClick={()=> setBuyMoney({paypal:true})} data-value={posts.price}>Visa Card</button>
                  <button className="btn ecocash_btn" onClick={()=> setBuyMoney({ecocash:true})} data-value={posts.price}>Ecocash</button>
                  </div>
                  </div>
                </div>
              ) : (
                <div className="grid" style={{height: "45px"}}>
                <div>
                <h3 className="skeleton" style={{margin: "20px 0", width: '40%',height: '20px'}}></h3>
                </div>
                <div>
                  <h1 className="buy_btn_title">Buy Hours using</h1>
                  <div className="btns_flex">
                  <button className="btn paypal_btn skeleton" style={{height: "30px",width:"200px","marginTop":"20px"}}></button>
                  <button className="btn ecocash_btn skeleton" style={{height: "30px",width:"200px","marginTop":"20px"}}></button>
                  </div>
                  </div>
                </div>
              )}
                <form onSubmit={postReview}>
                  <div className="user-ratings">
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <label key={i}>
                          <input
                            className="is-hidden"
                            type="radio"
                            name="rating"
                            value={reviewInput.rated_index}
                            onClick={() => setRating(ratingValue)}
                          />
                          <AiOutlineStar
                            className="reviews-star"
                            size={20}
                            color={
                              ratingValue <= (hover || rating)
                                ? "#ffc107"
                                : "#333"
                            }
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <input
                    name="token"
                    onChange={reviewHandleInput}
                    value={reviewInput.token}
                    className="token-input inputs"
                    type="text"
                    placeholder="please enter a valid token.."
                  />
                  <br />
                  <textarea
                    name="review"
                    onChange={reviewHandleInput}
                    value={reviewInput.review}
                    className="textarea-review inputs"
                    placeholder="type your review and hit enter...."
                  ></textarea>
                  <button
                    type="submit"
                    style={{ width: "40%" }}
                    className="app-btn review-sent"
                  >
                    Post Your Review
                  </button>
                </form>
                <div className="users-reviews">{Buttons}</div>
              </div>
              {/* Lawfirm closing extended div  */}
            </div>
          </div>
        </div>

        {Right_div}
      </div>
      <Footer />
    </>
  );
}
