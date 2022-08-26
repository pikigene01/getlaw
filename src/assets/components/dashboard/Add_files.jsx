import React,{useState,useEffect} from 'react'
import Header from '../header/header'
import Sidebar from './Sidebar'
import { ContextProvider } from './SideContext';
import './Add_files.css';

export default function Add_files() {
  const documentType = /(pdf|docx|file)/i;
  const [files, setFiles] = useState(null);

  const [documentForm,setDocumentForm] = useState({
    belongs: localStorage.getItem('auth_user_id'),
    files: files
  });

  const documentFormHandler = (e)=>{
    const file_validate = e.target.files;
    for(var i =0;i < file_validate.length;i++){
      if (!file_validate[i].type.match(documentType)) {
        alert('not match')
         return;
       }
    }
   
    
    setDocumentForm({...documentForm,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    document.querySelectorAll('.btn-upload').forEach((btn)=>{
      btn.onclick=()=>{
       document.querySelector('.upload_files_input').click();
      }
    })
  },[])

  
  return (
    <ContextProvider>
   <div>
         <Header />
      <div className="dashboard">
        <Sidebar/>
        <div className="dashboard_body">
        <div className='header_dash'>
        <h2>Add Files</h2>
      </div>
      <div className='support_wrapper'>
        <div className='grid'>
          <div className='choose_files a-c'>
            <div className='upload_area a-c'>
              <button className='btn-upload'>Choose Files</button>
              <input className="upload_files_input is-hidden" type='file' name="files[]" onChange={documentFormHandler} value={documentForm.files}/>
            </div>
          </div>
          <div className='uploaded_files'>
            Uploaded Files

            <div className='uploads'>
              <div className='file_name'>
                <h3>Gene Piki.docs</h3>
              </div>
            </div>
            <div className='uploads'>
              <div className='file_name'>
                <h3>Gene Piki.docs</h3>
              </div>
            </div>
            <div className='uploads'>
              <div className='file_name'>
                <h3>Gene Piki.docs</h3>
              </div>
            </div>
            <div className='uploads'>
              <div className='file_name'>
                <h3>Gene Piki.docs</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    </ContextProvider>
  )
}
