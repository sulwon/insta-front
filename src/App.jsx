import React, { useState } from 'react';
import styled from 'styled-components';
import NavSidebar from './components/Navigation/NavSidebar';
import ChatSidebar from './components/Sidebar/ChatSidebar';
import ChatContainer from './components/Chat/ChatContainer';
import useWebSocket from './hooks/useWebSocket';

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

function App() {
  const [userId, setUserId] = useState('');
  const {
    isConnected,
    currentRoom,
    messages,
    error,
    joinRoom,
    leaveRoom,
    sendMessage
  } = useWebSocket(userId);

  return (
    <MainContainer>
      <NavSidebar />
      <ChatSidebar 
        userId={userId}
        onUserIdSubmit={setUserId}
        onRoomSelect={joinRoom}
        currentRoom={currentRoom}
      />
      <ChatContainer
        currentRoom={currentRoom}
        messages={messages || []}
        userId={userId}
        onSendMessage={sendMessage}
      />
    </MainContainer>
  );
}

export default App;