import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../ChatComponents/Chat';
import "./Home.css";

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
      <div className='sidebar'>
            <Sidebar />
          </div>
           <div className='chat'>
            <Chat />
           </div>
            
      </div>
    </div>
  )
}

export default Home