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


// App.jsx
function App() {
  const [userId, setUserId] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);  // 선택된 방 정보를 저장할 상태 추가
  
  const {
    isConnected,
    currentRoom,
    messages,
    error,
    joinRoom,
    leaveRoom,
    sendMessage
  } = useWebSocket(userId);

  const handleRoomSelect = async (roomId) => {
    try {
      const response = await fetch(`/api/dm/rooms/${roomId}?userId=${userId}`);
      if (response.ok) {
        const roomData = await response.json();
        setSelectedRoom(roomData);
        joinRoom(roomId);
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  return (
    <MainContainer>
      <NavSidebar />
      <ChatSidebar 
        userId={userId}
        onUserIdSubmit={setUserId}
        onRoomSelect={handleRoomSelect}
        currentRoom={selectedRoom}
      />
      <ChatContainer
        currentRoom={selectedRoom}
        messages={messages || []}
        userId={userId}
        onSendMessage={sendMessage}
      />
    </MainContainer>
  );
}

export default App;
