import React from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

// ChatContainer.jsx
const ChatContainer = ({ currentRoom, messages = [], userId, onSendMessage }) => {
    return (
        <Container>
            <ChatHeader currentRoom={currentRoom} userId={userId} />
            <MessageList 
                messages={messages} 
                currentUserId={Number(userId)}
            />
            <MessageInput onSendMessage={onSendMessage} />
        </Container>
    );
};

export default ChatContainer;