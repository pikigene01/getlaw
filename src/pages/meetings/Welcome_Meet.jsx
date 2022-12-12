import { Search } from '@material-ui/icons'
import React,{useEffect,useState} from 'react'
import Header from '../../assets/components/header/header'
import axios from 'axios';
import swal from 'sweetalert';

export default function Welcome_Meet() {
  document.title = "Choose Lawyer Which You Want to have talks with | GenePiki";

   const [lawyers,setLawyers] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [load,setLoad] = useState({
    querySet: lawyers,
    page: 1,
    rows: 8,
    window: 5,

  });
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
    const cards = document.querySelectorAll('.lawyer_profile')
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

     
   const getPageData = (querySet, page, rows)=>{
  
    var trimStart = (page - 1) * rows;
    var trimEnd  = trimStart + rows;
 
    var trimedData = lawyers.slice(trimStart, trimEnd);
    var pages = Math.ceil(querySet.length /rows);
 
    return {
     querySet: trimedData,
     pages: pages
    }
   }
  

   const paginationBtns =(pages)=>{
   var wrapper = document.querySelector('.pagination_btns');
   wrapper.innerHTML = '';
   var maxLeft = (load.page - Math.floor(load.window / 2))
   var maxRight = (load.page + Math.floor(load.window / 2))
   if(maxLeft < 2){
    maxLeft = 1;
    maxRight = (load.window - 1);

   }
   if(maxRight > pages){
    maxLeft = pages - (load.window);

    maxRight = pages;

    if(maxLeft < 1){
      maxLeft = 1;
    }
   }

   
   for(var page=maxLeft; page <= maxRight; page++){

   wrapper.innerHTML +=  `<button data-value=${page} class='btns-pagination'>${page}</button> `;
   }
   if(load.page != 1){
    wrapper.innerHTML = `<button data-value=${1} class='btns-pagination'> First</button>` + wrapper.innerHTML;
   }
   if(load.page != pages){
    wrapper.innerHTML += `<button data-value=${pages} class='btns-pagination'> Last</button>`;
   }
   }
 
   const buildData = () => {
 
     var data = getPageData(lawyers, load.page, load.rows);
     paginationBtns(data.pages);
     setLoad({...load,querySet: data.querySet});

     const btns = document.querySelectorAll('.btns-pagination');
     btns.forEach((btn)=>{
      btn.onclick = ()=>{
       
      setLoad({...load, page: btn.dataset.value,querySet: data.querySet});
         
      }
     });
  

   }
 
  

  useEffect(()=>{
    buildData();
    
  }, [lawyers,load.page]);
  return (
    <div>
    <Header/>
       <div className='meetings_body'>
        <div className='meet_header'>
            <div className='search_lawyers'>
                <input type="search" className="search_input" onChange={liveSearch} placeholder='Search lawyer here using your token'/><Search className="icon search_icon"/> 
            </div>
            <div className='right_header'>
                Welcome to GenePiki meeting Rooms
            </div>
        </div>

        <div className='lawyers_all_wrapper'>
            {skeletonLoader? (
                <>
            {load.querySet.map((data)=>{
                return ( 
            <div key={data.id.toString()} className='lawyer_profile'>
              <div className='lawyer_avatar'>
              <img src={data.picture} alt={data.description.substr(0,120)} className="lawyer_pic"/>

              </div>
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
        <div className='pagination_btns' style={{width: '100%', display: 'flex',justifyContent: 'center',margin: '20px 0'}}>
      <button>Next</button>
      <button>1</button>
      <button>Prev</button>
     </div>
       </div>
        
    </div>
  )
}
