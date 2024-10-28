import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin: 4px 0;
  max-width: 60%;
  padding: 8px 12px;
  border-radius: 22px;
  font-size: 14px;
  line-height: 1.4;
  align-self: ${props => props.isSent ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isSent ? '#0095f6' : '#efefef'};
  color: ${props => props.isSent ? 'white' : 'black'};
`;

const SystemMessage = styled.div`
  text-align: center;
  color: #8e8e8e;
  font-size: 12px;
  margin: 10px 0;
`;

const MessageList = ({ messages, currentUserId }) => {
    return (
        <Container>
            {messages.map((message, index) => (
                message.type === 'CHAT' ? (
                    <Message
                        key={index}
                        isSent={message.senderId === currentUserId}
                    >
                        {message.content}
                    </Message>
                ) : (
                    <SystemMessage key={index}>
                        {message.content}
                    </SystemMessage>
                )
            ))}
        </Container>
    );
};

export default MessageList;