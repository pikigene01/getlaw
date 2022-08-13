import React,{useEffect,useState,useContext} from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import './Blog.css'
import img from '../../imgs/gene_law.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { HomeContext } from '../lawfirms/HomeContext'
import { Refresh } from '@material-ui/icons'


export default function Blog() {
  const {refresh,setRefresh} = useContext(HomeContext);

  document.title = "Welcome to GetLaw Blogs | GetLaw";

   const [url,setUrl] = useState('');
   const [page,setPage] = useState('');
   const [blogs,setBlogs] = useState([])
   const [blogsLatest,setBlogsLatest] = useState([])
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [skeletonLoaderBlogs, setSkeletonLoaderBlogs] = useState(false);
  const [localStorageData,setLocalStorageData] = useState(localStorage.getItem('user_blogs'));
let i = 0;

    const updatePage = () => {
       var update_url = window.location.pathname;
        setUrl(update_url)
        // let page = url.substring(url.lastIndexOf('/') + 1);
        // url = window.location.pathname;
        // page = url.substring(url.lastIndexOf('/') + 1);
    }

   
    useEffect(()=>{
        let urlss = window.location.pathname;
        let pagess = url.substring(url.lastIndexOf('/') + 1);
    
        setUrl(urlss);
        setPage(pagess);
        },[url]);
  //       useEffect(()=>{
  // localStorage.removeItem('user_blogs');
  // if(localStorageData){
  //   setLocalStorageData(null);
  // }
  //       },[page]);
      useEffect(()=>{
    
        const blog_get = () =>{
            const data = {
              category: page
            }

            axios.post("api/blog/get/all", data).then((res) => {
            setSkeletonLoaderBlogs(true);
            setBlogs(res.data.blogs);
            });
           
          }
        blog_get();
        if(refresh){
          setLocalStorageData(null);
         }
         else{
          setLocalStorageData(blogsLatest);
         
         }
        
          if(page){
    
        const links  = document.querySelectorAll('button');
        links.forEach((link)=>{
          link.classList.remove('active');
          setPage('');
          const pages = document.querySelectorAll(`#${page}`);
          pages.forEach((pg)=>{
            pg.classList.add('active');
           
          });
       
      });
    };
      },[url,page])

      useEffect(()=>{
        const blog_get_lat = () =>{
          const data = {
            category: page
          }
          

            axios.post("api/blog/get/all/latest", data).then((res) => {
              setSkeletonLoader(true);
              setRefresh(false)
              setBlogsLatest(res.data.blogs);
         });
          }
          
          if(!localStorageData){
            blog_get_lat();
          }else{
            setSkeletonLoader(true);
            setBlogsLatest(JSON.parse(localStorage.getItem('user_blogs')))
  
            }
        
      },[localStorageData]);

      useEffect(()=>{
        
        if(!localStorageData){
          localStorage.setItem("user_blogs", JSON.stringify(blogsLatest));
         
        }else{
          localStorage.removeItem("user_blogs");

        }

      },[blogsLatest])
  return (
    <div>
        <Header/>
  {/* <div className='refresh' onClick={()=>setRefresh(true)}>
  <span title='Refresh....'><Refresh className={refresh?'icon active':'icon'} /></span>
 </div> */}
        <div className='blog_wrapper'>
         <div className='blog_header'>
            <h2 className='blog_header_text'>Our Blog Posts</h2>
         </div>
        <div className='blog_categories' onClick={updatePage}>
            <Link to="/blog/news"><button id="news">News</button></Link>
            <Link to="/blog/latest"><button id='latest'>latest</button></Link>
            <Link to="/blog/fraud"><button id="fraud">Fraud</button></Link>
            <Link to="/blog/crimes"><button id='crimes'>Crimes</button></Link>
            <Link to="/blog/advertisement"><button id="advertisement">Advertisement</button></Link>
        </div>
        <div className='centered_blogs'>
         <div className='blog_body_app'>
            <div className='blog_grid'>
            {skeletonLoaderBlogs && (
                  <>
                {blogs.length > 0 ? (
                    <>
                {blogs.map((data)=>{
                    return (
                    <div className='blog_post' key={data.id}>
                        <div className='blog_img'>
                            <img src={data.image} style={{width:"100%",height: "50%"}} alt="blog image" />
                        </div>
                        <div className='blog_body'>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                            <span>By Gene</span><span>Date</span>
                        </div>
                    </div>
                    );
                 })}
                 </>
                 ):(
                    <>
                    <p>No Posts Found at the moment...</p>
                    </>
                 )}
                 </>
            )}
            {!skeletonLoaderBlogs && (
              <>
              {[...Array(8)].map(()=>{
                i++;
                return (
                  <div className='blog_post' key={i}>
                  <div className='blog_img skeleton' style={{width:"100%",height: "150px"}}>
                  </div>
                  <div className='blog_body'>
                      <h2 className='skeleton' style={{width:"100%",height:"10px",margin: "8px 0px"}}></h2>
                      <p className='skeleton' style={{width:"100%",height:"20px",margin: "8px 0px"}}></p>
                      <span className='skeleton' style={{width:"100%",height:"10px",margin: "8px 0px"}}></span>
                  </div>
              </div>
                )
                
              })}
</>
            )}


            </div>
            <div className='gene_piki'>
               <div className='lat_header'>
                Latest Posts
               </div>
               {skeletonLoader && (
                <>
                 {blogsLatest.map((data)=>{
               return (
                <div className='blog_post_lat' key={data.id}>
                <div className='lat_body'>
                 <div>
                <img src={data.image} style={{width:"60px",height: "60px"}} alt="blog image" />
                </div>
                <div>
                 <h4>{data.title}</h4>
                 <p>{data.description.substring(0,50)}</p>
                 <p>20/12/2022 20:13 by Gene</p>
                 </div>
                 </div>
                </div>
               );
               })}
                </>
               )}
               {!skeletonLoader && (
                <>
                {[...Array(6)].map(()=>{
                  i++;
                  return (
                    <div className='blog_post_lat' key={i}>
                    <div className='lat_body'>
                     <div>
                    <div className='skeleton' style={{width:"60px",height: "60px"}} />
                    </div>
                    <div>
                     <h4 className='skeleton' style={{width:"100%",height:"10px",margin: "8px 0px"}}></h4>
                     <p className='skeleton' style={{width:"100%",height:"10px",margin: "8px 0px"}}></p>
                     <p className='skeleton' style={{width:"100%",height:"10px",margin: "8px 0px"}}></p>
                     </div>
                     </div>
                    </div>
                  );
                })}
                
                </>
               )}
              
            </div>
         </div>
         </div>
        </div>
        <Footer/>
    </div>
  )
}
