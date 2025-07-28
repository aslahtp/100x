import { useEffect,useState } from 'react'
import './App.css'

function App() {

  const [webSocket,setWebSocket]=useState(null);

  useEffect(()=>{
    const ws=new WebSocket('ws://localhost:4000');
    setWebSocket(ws);
    ws.onopen=()=>{
      console.log('Connected to server');
    }
    ws.onmessage=(event)=>{
      console.log(event.data);
    }
    ws.onclose=()=>{
      console.log('Disconnected from server');
    }
    ws.onerror=(event)=>{
      console.log('Error:',event);
    }

    return ()=>{
      console.log('Disconnected from server');
      ws.close();
    }
  },[]);

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
