import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../header/header'
import Sidebar from './Sidebar'
import './Notes.css'
import swal from 'sweetalert'
import axios from 'axios'
import { Delete } from '@material-ui/icons'
import { ContextProvider } from './SideContext';


export default function Notes() {
  document.title = "Add / Edit Notes | GetLaw";

  const navigate = useNavigate();
  const [loggedIn,setLoggedIn] = useState(false);
  const [notes_user,setNotes] = useState([]);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [editor,setEditor] = useState({
    editing: false,
    value: '',
    post_id: ''
  })
  const [loading,setLoading] = useState({
    isLoading: false
  });
  const [note,setNote] = useState({
    user_id: '',
    note: ''
  });

  useEffect(()=>{
    const logged_in = localStorage.getItem('auth_token');
  if(logged_in){
    setLoggedIn(true)
    setNote({...note,user_id: localStorage.getItem('auth_user_id')});
  }else{
    setLoggedIn(false)
    navigate('/auth');
  }
  },[]);

  
  useEffect(()=>{
    const data = {
      user_id: localStorage.getItem('auth_user_id')
    }
    axios.post("/api/note/get", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
  
      setNotes(res.data.notes);
      setSkeletonLoader(true);
    });
  },[]);

  const getNotes=()=>{
    const data = {
      user_id: localStorage.getItem('auth_user_id')
    }
    axios.post("/api/note/get", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
  
      setNotes(res.data.notes);
     
    });
  }
  
  const noteHandler = (e) => {
    setNote({...note,[e.target.name]:e.target.value});
    setEditor({...editor,value: e.target.value});
  }
  const deleteNote = (id) => {
    setLoading({ ...loading, isLoading: true });

    const data = {
      id: id,
    }
    axios.post("/api/note/delete", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
      setNote({...note,note:""});
      if(res.data.status == 200){
      getNotes();
      swal("Success", res.data.message, "success");
      }else{
      swal("Warning", res.data.message, "warning");

      }
    });
  }
  const noteSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, isLoading: true });

    if(editor.editing){
      const data = {
        user_id: note.user_id,
        note: editor.value,
        post_id: editor.post_id
      }
      axios.post("/api/note/update", data).then((res) => {
        setLoading({ ...loading, isLoading: false });
    
        setNote({...note,note:""});
        getNotes();
        if(res.data.status == 200){
        swal("Success", res.data.message, "success");
        }else{
        swal("Warning", res.data.message, "warning");
        }
      });
    }else{
    const data = {
      user_id: note.user_id,
      note: note.note
    }
    axios.post("/api/note/add", data).then((res) => {
      setLoading({ ...loading, isLoading: false });
  
      setNote({...note,note:""});
      getNotes();
      if(res.data.status == 200){
      swal("Success", res.data.message, "success");
      }else{
      swal("Warning", res.data.message, "warning");

      }
    });
  }
  }
  return (
    <ContextProvider>
    <div>
        <Header/>
        <div className={loading.isLoading ? "auth-body page-loading" : "page-loading-false"}>
        <div className={loading.isLoading ? "auth-body page-loading-content" : "page-loading-content-false"}>

        </div>
    </div>
    <div className='dashboard'>
        <Sidebar/>

        <div className='dashboard_body'>
        <div className='header_dash'>
        <h2>View Your Notes Here</h2>
      </div>

      <div className='notes_wrapper notes_grid'>
      <form onSubmit={noteSubmit}>
        <div className='note_add'>
        {editor.editing ? (
          <textarea value={editor.value} name="note" title='update note' onChange={noteHandler} rows="12" placeholder="Update note here" />
        ):(
          <textarea value={note.note} name="note" onChange={noteHandler} rows="12" placeholder="Add A note text here" />

        )}
          {editor.editing ? (
          <button type='submit'>Update Note</button>
          ):(
            <button type='submit'>Note Add</button>
          )}
        </div>
        </form>
        <div className='note_all'><h2>Notes all</h2>
        {skeletonLoader ? (
                    <>
        {notes_user.map((note)=>{
          return (
            <>
            <div className='note'>
            <p onClick={()=>setEditor({...editor,value:note.note,editing:!editor.editing,post_id:note.id})}>{note.note.substr(0,100)}</p><span>{note.created_at}</span><Delete onClick={()=>deleteNote(note.id)} style={{"fontSize": "16px"}}/>
          </div>
          </>
          );
        })}
       </>
        ):(
          <>
          {[...Array(5)].map(() =>{
            return (
          <div className='note skeleton' style={{"marginBottom": "10px"}}>
          
        </div>
            );
      })}
      </>
        )}
        </div>
      </div>
        </div>
    </div>
    </div>
    </ContextProvider>
  )
}
