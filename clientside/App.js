import './App.css';
import {React,useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [data,setData]=useState([]);
  const [msg,setMsg]=useState("");
  const [nodata,setNodata]=useState("");


  const useradded=()=>{
    if(!username&&!password)
    {
      setMsg("fill the fields");
    }
    else
    {
      axios.post("http://localhost:3001/adduser",{
      username,
      password,
    }).then(response=>{
      console.log(response.data.message);
      setMsg(response.data.message);
    }).catch(error=>{
      console.log(error);
    })
    }
   
  }

  useEffect(() => {
    axios.get("http://localhost:3001/fetchdata")
     .then((response) => {
      if(response.data.length>0)
      {
        setData(response.data);
      }
      else{
        setNodata("no data found...");
      }
     })
     .catch(() => {
      console.log("error");
     });
   },[]);


   const deleteuser=(id)=>{
    console.log(id);
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
    .then(response => {
      setMsg(response.data.message);
    }).catch((err) => {
       console.log(err);
    })
   }

   const updateuser=(id)=>{
   const newusername=window.prompt("ENTER NEW USERNAME");
   axios.put("http://localhost:3001/updateuser",{
    newusername:newusername,
    id:id,
   }).then((response)=>
   setMsg(response.data.message)
   ).catch((err)=>{
    console.log(err);
   })
   }

  return (
    <div className="main-container">
    <div className="heading">
    <h1>PRACTICE THE CURD OPERATION IN MERN APP</h1>
    </div>
    <div className="container">
    <h3>ADMIN</h3>
    <label>username</label><br/><br/>
    <input type="text" placeholder="Username...." onChange={(e)=>{setUsername(e.target.value)}}/><br/><br/>
    <label>password</label><br/><br/>
    <input type="text" placeholder="password...." onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
    <p>{msg}</p>
    <button onClick={useradded}>ADD</button>
    
    </div>
    <div className="data-container">
    <h2>USER DATA</h2>
    <h4>{nodata}</h4>
    <div className='data'>
     {data.map((d)=>{
      return <article key={d._id}>
      <p>USERNAME:<span>{d.username}</span></p>
      <p>PASSWORD:<span>{d.password}</span></p>
      <button onClick={()=>deleteuser(d._id)}>DELETE</button>
      <button onClick={()=>updateuser(d._id)}>UPDATE</button>
      </article>
     })
     }
    </div>
    </div>
    </div>
  );
}

export default App;
