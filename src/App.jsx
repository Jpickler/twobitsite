import { useState } from 'react'
import './App.css'
import Weather from "./Components/weatherFolder/Weather"
import Flags from "./Components/flagsFolder/Flags"

function App() {

  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoggedIn, setIsLoggedIn] =useState(false);


  const handleSubmit= (event)=>{
    event.preventDefault();
    console.log(`${username} is logged in`);
    console.log(`the password is ${password}`);
    setIsLoggedIn(true);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
  }

  return (
    <>
      <div id="topFull">
        <h1> Welcome to 2 Bit's World</h1>

        {
          isLoggedIn ? 
              <div>
                <h2> Welcome, {username} </h2>
                <button id="logout" onClick={handleLogout}> Logout </button>
              </div>
            :
        <form id="login" onSubmit={handleSubmit}>
            <label > User Name: <input type = "text" name ="username" onChange={(event)=> {setUserName(event.target.value)}}/> </label>
            <label > Password: <input type = "text" name ="password" onChange={(event)=> {setPassword(event.target.value)}}/> </label>
            <button> submit </button>
        </form>
        }   

      </div>
      <div id="mainSection">

        <div id="topLeft" className="quarterScreen">
          <h1> WEATHER </h1>
          <Weather />

        </div>

        <div id="topRight" className="quarterScreen">
        <h1> Flag Quiz</h1>
        <Flags />

        </div>

        <div id="bottomLeft" className="quarterScreen">
        <p> box 3</p>

        </div>

        <div id="bottomRight" className="quarterScreen">
        <p> box 4</p>

        </div>

      </div>      
              <div id="bottomFull">
        <p> Footer</p>

        </div>
    </>
  )
}

export default App
