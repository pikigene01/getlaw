import React from 'react'
import Header from '../../assets/components/header/header';
import './Meet.css';
import { ContextProvider } from './SocketContext';
import VideoPlayer from './VideoPlayer';
import Options from './Options';
import Footer from '../../assets/components/footer/footer';

export default function meet() {
  document.title = "GenePic Room Space For Meetings | GenePic";
  
  return (
    <>
    <ContextProvider>
    <Header/>

    <div className='meeting_roomvv'>
      <VideoPlayer/>
      <Footer/>
    </div>
    </ContextProvider>
    </>
  )
}
