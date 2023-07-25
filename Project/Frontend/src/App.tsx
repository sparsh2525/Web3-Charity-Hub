import {useState} from 'react';
import Home from './Home/Home';
import Login from './login/login';
import SignUp from './signup/signup';
import Add from './Add/add';
import { onAuthStateChanged } from 'firebase/auth';
import Donate from './Donate/Donate';

import {
  BrowserRouter,
  Routes, 
  Route,
  redirect
} from "react-router-dom";
import {Auth,db} from './firebase/firebase';

function App() {
  const [uid , setUid]  = useState();
  const [user,setUser] = useState({});
  onAuthStateChanged(Auth,
    (u)=>{
      console.log(u);
      setUser(u as any);
    }
  )

  return (
    
   <BrowserRouter>
     <Routes>
     {/* <Route path="/" element={<h1>test</h1>} /> */}
     <Route path="/" Component={Home} />
     <Route path="/login" Component={user?Home :()=><Login {...user}/>  } />
     <Route path="/signup" Component={user?Home :()=><SignUp user={user}/>  } />
     <Route path="/add" Component={user?()=><Add {...user}/> :()=><Login {...user}/>  } />
     <Route path="/donate" Component={user?Donate :()=><Login {...user}/>  } />
     {/* <Route path="/add" element={<Add/>} /> */}
     </Routes>
   </BrowserRouter>
  );
}

export default App;
