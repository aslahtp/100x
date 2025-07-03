import './App.css'
import { useState } from 'react'


function App() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  function handleSubmit(){
    console.log(name,email,password);
  }
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
     <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
     <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
     <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
     <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
