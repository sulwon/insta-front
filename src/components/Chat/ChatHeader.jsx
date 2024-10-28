import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #dbdbdb;
  margin-right: 12px;
`;

const RoomName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const ChatHeader = ({ currentRoom }) => {
    return (
        <Header>
            <ProfileImage />
            <RoomName>
                {currentRoom ? currentRoom : '메시지 대상 user'}
            </RoomName>
        </Header>
    );
};

export default ChatHeader;