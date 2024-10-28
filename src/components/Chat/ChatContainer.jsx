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

const ChatContainer = ({ currentRoom, messages = [], userId, onSendMessage }) => {  // props 추가 및 기본값 설정
    return (
        <Container>
            <ChatHeader currentRoom={currentRoom} />
            <MessageList messages={messages} currentUserId={userId} />
            <MessageInput onSendMessage={onSendMessage} />
        </Container>
    );
};

export default ChatContainer;