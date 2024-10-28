import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  border-top: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dbdbdb;
  border-radius: 22px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #a8a8a8;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #0095f6;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 12px;

  &:disabled {
    color: #b3dbff;
    cursor: default;
  }
`;

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <Container>
            <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력..."
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />
            <SendButton
                onClick={handleSubmit}
                disabled={!message.trim()}
            >
                보내기
            </SendButton>
        </Container>
    );
};

export default MessageInput;