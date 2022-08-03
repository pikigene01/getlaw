import { Search } from '@material-ui/icons'
import React,{useEffect,useState} from 'react'
import Header from '../../assets/components/header/header'
import axios from 'axios';
import swal from 'sweetalert';

export default function Welcome_Meet() {
  document.title = "Choose Lawyer Which You Want to have talks with | GetLaw";

   const [lawyers,setLawyers] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);

   useEffect(()=>{
    const data = {
    //role 2 thats for fetching lawyers available
 role: '2'
    };
    axios.post("/api/lawyers/get/all", data).then((res) => {
        setSkeletonLoader(true)
         if (res.data.status === 200) {
           setLawyers(res.data.posts);
         } else if (res.data.status === 401) {
          setSkeletonLoader(true)
           swal("Warning", res.data.message, "warning");
         } else {
          setSkeletonLoader(true)
           swal(
             "Warning",
             "Something Went Wrong Check Your Internet Access Please",
             "warning"
           );
         }
       });
   },[]);
   let i = 0;
   const liveSearch=(e)=> {
    // Locate the card elements
    let cards = document.querySelectorAll('.lawyer_profile')
    // Locate the search input
    let search_query = e.target.value;
    // Loop through the cards
    for (var i = 0; i < cards.length; i++) {
    // If the text is within the card...
    if(cards[i].innerText.toLowerCase()
    // ...and the text matches the search query...
    .includes(search_query.toLowerCase())) {
    // ...remove the `.is-hidden` class.
    cards[i].classList.remove("is-hidden");
    } else {
    // Otherwise, add the class.
    cards[i].classList.add("is-hidden");
    }
    }
    }
   var lawyers_ske = "";
   lawyers_ske = (
    <div className='lawyer_profile'>
    <div className="lawyer_pic skeleton" style={{"marginBottom": "10px"}}></div>
    <p className='skeleton' style={{width: "100px",height: "10px","marginBottom": "10px"}}></p>
    <p className='skeleton' style={{width: "100px",height: "10px", "marginBottom": "5px"}}></p>
    <button className='enter_meeting_btn skeleton'>Enter Meeting</button>
  </div>
   );
  return (
    <div>
    <Header/>
       <div className='meetings_body'>
        <div className='meet_header'>
            <div className='search_lawyers'>
                <input type="search" className="search_input" onChange={liveSearch} placeholder='Search lawyer here using your token'/><Search className="icon search_icon"/> 
            </div>
            <div className='right_header'>
                Welcome to GetLaw meeting Rooms
            </div>
        </div>

        <div className='lawyers_all_wrapper'>
            {skeletonLoader? (
                <>
            {lawyers.map((data)=>{
                return ( 
            <div key={data.id.toString()} className='lawyer_profile'>
              <img src={data.picture} alt={data.description.substr(0,120)} className="lawyer_pic"/>
              <h2>{data.name}</h2>
              <p>{data.description.substr(0,200)}</p>
              <a href={"/meetings/"+data.id}><button className='enter_meeting_btn'>Enter Meeting</button></a>
            </div>
                );
            })}
            </>
            ): (
                <>
            {[...Array(15)].map(() => {
              i++;
                return (
                <div key={i.toString()}>
                        {lawyers_ske}
              </div>
              );
                      })}
                </>
            )}
        </div>
       </div>
        
    </div>
  )
}
