// ChatHeader.jsx
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

const ChatHeader = ({ currentRoom, userId }) => {
    const getOtherUserName = () => {
        if (currentRoom && currentRoom.participants) {
            const otherUser = currentRoom.participants.find(
                participant => participant.id !== Number(userId)
            );
            return otherUser ? `user${otherUser.id}` : '';
        }
        return '';
    };

    return (
        <Header>
            <ProfileImage />
            <RoomName>
                {getOtherUserName()}
            </RoomName>
        </Header>
    );
};

export default ChatHeader;