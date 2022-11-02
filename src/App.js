import './App.css';
import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from './providers/SocketProvider';
import useIntro from './hooks/useIntro';
import ChatContainer from './components/Chat/ChatContainer';
import Home from './components/Home';
import TheTeam from './components/TheTeam';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App({ navPages }) {

  const { hidden } = useIntro();
  const { socketUser } = useContext(SocketContext);
  const [ introActive, setIntroActive ] = useState(true);
  const [ socketConnected, setSocketConnected ] = useState(false);

  useEffect(() => {
    socketUser.on('connect', () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    if (introActive && hidden) {
      setIntroActive(false);
    }
  }, [hidden]);

  useEffect(() => {
    if(socketUser.connected) {
      setSocketConnected(true);
    }
  }, []);


  return (
    <div className="App">
      { socketConnected && !introActive && <ChatContainer socket={ socketUser } /> }
      <main className="Page-wrapper">
        <div ref={el => navPages.current[0] = el} className="Page-Home"><Home /></div>
        <div ref={el => navPages.current[1] = el} className="Page-About"><About /></div>
        <div ref={el => navPages.current[2] = el} className="Page-TheTeam"><TheTeam /></div>
        <div ref={el => navPages.current[3] = el} className="Page-Contact"><Contact /></div>
        <div className="Page-Footer"><Footer /></div>
      </main>
    </div>
  );
}

export default App;
