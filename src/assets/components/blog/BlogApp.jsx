import React from 'react'
import { ContextProvider } from '../lawfirms/HomeContext';
import Blog from './blog';


export default function BlogApp() {
  return (
    <ContextProvider>
     <div>
        <Blog/>
    </div>
    </ContextProvider>
   
  )
}
