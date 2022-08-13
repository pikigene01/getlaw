import React,{useContext} from 'react';
import Header from '../header/header';
import Cards from '../lawfirms/cards';
import Footer from '../footer/footer';
import Featured from '../lawfirms/Featured';
import Lawyers from '../lawfirms/Lawyers';
import Welcome from '../lawfirms/Welcome';
import { Refresh } from '@material-ui/icons';
import { HomeContext } from '../lawfirms/HomeContext';
import './Home.css';

export default function Home() {
  const {refresh,setRefresh} = useContext(HomeContext);

  document.title = "GetLaw Home Page | GetLaw";

  return (
    <>
 <Header/>
 {/* <div className='refresh' onClick={()=>setRefresh(true)}>
  <span title='Refresh....'><Refresh className={refresh?'icon active':'icon'} /></span>
 </div> */}
 <Welcome/>
 <Cards/>
 <Featured/>
 <Lawyers/>
 <Footer/>
    </>
  )
}
